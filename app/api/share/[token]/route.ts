import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { rubrics } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  const [rubric] = await db
    .select({
      id: rubrics.id,
      title: rubrics.title,
      description: rubrics.description,
      gridData: rubrics.gridData,
      createdAt: rubrics.createdAt,
    })
    .from(rubrics)
    .where(eq(rubrics.shareToken, token));

  if (!rubric) {
    return NextResponse.json({ error: "Rubric not found" }, { status: 404 });
  }

  return NextResponse.json(rubric);
}
