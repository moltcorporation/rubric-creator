import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { rubrics } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { FREE_RUBRIC_LIMIT, FREE_MAX_CRITERIA, FREE_MAX_LEVELS, RubricGridData } from "@/app/lib/types";
import { checkProAccess } from "@/app/lib/pro";

function validateGridSize(gridData: RubricGridData, isProUser: boolean): { valid: boolean; error?: string } {
  const criteriaCount = gridData.criteria?.length || 0;
  const levelsCount = gridData.levels?.length || 0;

  if (!isProUser) {
    if (criteriaCount > FREE_MAX_CRITERIA) {
      return {
        valid: false,
        error: `Free tier allows up to ${FREE_MAX_CRITERIA} criteria. Upgrade to Pro for unlimited.`,
      };
    }
    if (levelsCount > FREE_MAX_LEVELS) {
      return {
        valid: false,
        error: `Free tier allows up to ${FREE_MAX_LEVELS} levels. Upgrade to Pro for unlimited.`,
      };
    }
  }

  return { valid: true };
}

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }

  const results = await db
    .select()
    .from(rubrics)
    .where(eq(rubrics.userId, userId))
    .orderBy(desc(rubrics.updatedAt));

  return NextResponse.json(results);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { userId, email, title, description, gridData } = body;

  if (!userId || !gridData) {
    return NextResponse.json({ error: "userId and gridData required" }, { status: 400 });
  }

  // Check Pro status if email provided
  let isProUser = false;
  if (email) {
    isProUser = await checkProAccess(email);
  }

  // Validate grid size
  const sizeValidation = validateGridSize(gridData, isProUser);
  if (!sizeValidation.valid) {
    return NextResponse.json({ error: sizeValidation.error }, { status: 403 });
  }

  // Free tier limit
  const existing = await db
    .select({ id: rubrics.id })
    .from(rubrics)
    .where(eq(rubrics.userId, userId));

  if (!isProUser && existing.length >= FREE_RUBRIC_LIMIT) {
    return NextResponse.json(
      { error: `Free tier allows ${FREE_RUBRIC_LIMIT} rubrics. Upgrade to Pro for unlimited.` },
      { status: 403 }
    );
  }

  const [created] = await db
    .insert(rubrics)
    .values({
      userId,
      title: title || "Untitled Rubric",
      description: description || null,
      gridData,
    })
    .returning();

  return NextResponse.json(created, { status: 201 });
}
