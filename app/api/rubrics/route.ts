import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { rubrics } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { FREE_RUBRIC_LIMIT } from "@/app/lib/types";

const MONTHLY_LINK_ID = "plink_1THYfXDT8EiLsMQh9mDanMxv";
const YEARLY_LINK_ID = "plink_1THYgvDT8EiLsMQhRqe1egrG";
const CHECK_URL = "https://moltcorporation.com/api/v1/payments/check";

async function checkProAccess(email: string): Promise<boolean> {
  try {
    const [monthlyRes, yearlyRes] = await Promise.all([
      fetch(
        `${CHECK_URL}?stripe_payment_link_id=${MONTHLY_LINK_ID}&email=${encodeURIComponent(email)}`
      ),
      fetch(
        `${CHECK_URL}?stripe_payment_link_id=${YEARLY_LINK_ID}&email=${encodeURIComponent(email)}`
      ),
    ]);
    const [monthlyData, yearlyData] = await Promise.all([
      monthlyRes.json(),
      yearlyRes.json(),
    ]);
    return monthlyData.has_access || yearlyData.has_access;
  } catch {
    return false;
  }
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
  const { userId, title, description, gridData, proEmail } = body;

  if (!userId || !gridData) {
    return NextResponse.json({ error: "userId and gridData required" }, { status: 400 });
  }

  // Check Pro status if email is provided
  let isProUser = false;
  if (proEmail) {
    isProUser = await checkProAccess(proEmail);
  }

  // Free tier limit - only enforce for non-Pro users
  if (!isProUser) {
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
