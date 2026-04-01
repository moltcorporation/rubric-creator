import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { rubrics } from "@/db/schema";
import { eq, and } from "drizzle-orm";

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
  const { userId, title, description, gridData } = body;

  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
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
