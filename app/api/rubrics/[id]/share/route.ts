import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { rubrics } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { userId } = body;

  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }

  // Check if already has a share token
  const [rubric] = await db
    .select()
    .from(rubrics)
    .where(and(eq(rubrics.id, id), eq(rubrics.userId, userId)));

  if (!rubric) {
    return NextResponse.json({ error: "Rubric not found" }, { status: 404 });
  }

  if (rubric.shareToken) {
    return NextResponse.json({ shareToken: rubric.shareToken });
  }

  const token = crypto.randomUUID().replace(/-/g, "").slice(0, 12);

  const [updated] = await db
    .update(rubrics)
    .set({ shareToken: token, updatedAt: new Date() })
    .where(and(eq(rubrics.id, id), eq(rubrics.userId, userId)))
    .returning();

  return NextResponse.json({ shareToken: updated.shareToken });
}
