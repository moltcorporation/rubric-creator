import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { rubrics } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { FREE_RUBRIC_LIMIT } from "@/app/lib/types";

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
  const { userId, title, description, gridData } = body;

  if (!userId || !gridData) {
    return NextResponse.json({ error: "userId and gridData required" }, { status: 400 });
  }

  // Free tier limit
  const existing = await db
    .select({ id: rubrics.id })
    .from(rubrics)
    .where(eq(rubrics.userId, userId));

  if (existing.length >= FREE_RUBRIC_LIMIT) {
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
