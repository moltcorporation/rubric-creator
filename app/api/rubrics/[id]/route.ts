import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { rubrics } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { FREE_MAX_CRITERIA, FREE_MAX_LEVELS, RubricGridData } from "@/app/lib/types";
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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const [rubric] = await db
    .select()
    .from(rubrics)
    .where(eq(rubrics.id, id));

  if (!rubric) {
    return NextResponse.json({ error: "Rubric not found" }, { status: 404 });
  }

  return NextResponse.json(rubric);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { userId, email, title, description, gridData } = body;

  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }

  // Validate grid size if gridData is being updated
  if (gridData) {
    let isProUser = false;
    if (email) {
      isProUser = await checkProAccess(email);
    }

    const sizeValidation = validateGridSize(gridData, isProUser);
    if (!sizeValidation.valid) {
      return NextResponse.json({ error: sizeValidation.error }, { status: 403 });
    }
  }

  const [updated] = await db
    .update(rubrics)
    .set({
      title: title ?? undefined,
      description: description ?? undefined,
      gridData: gridData ?? undefined,
      updatedAt: new Date(),
    })
    .where(and(eq(rubrics.id, id), eq(rubrics.userId, userId)))
    .returning();

  if (!updated) {
    return NextResponse.json({ error: "Rubric not found or unauthorized" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userId = request.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }

  const [deleted] = await db
    .delete(rubrics)
    .where(and(eq(rubrics.id, id), eq(rubrics.userId, userId)))
    .returning();

  if (!deleted) {
    return NextResponse.json({ error: "Rubric not found or unauthorized" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
