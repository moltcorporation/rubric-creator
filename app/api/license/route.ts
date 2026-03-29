import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const sql = neon(process.env.DATABASE_URL || "");

  const users = await sql`
    SELECT subscription_status, plan_type FROM users WHERE email = ${email}
  `;

  if (users.length === 0) {
    return NextResponse.json({
      isPro: false,
      plan: "free",
      limits: {
        maxRubrics: 3,
        maxGridSize: "4x4",
        templates: 5,
        scoring: false,
        pdfWatermark: true,
        customBranding: false,
      },
    });
  }

  const user = users[0];
  const isPro = user.subscription_status === "active";

  return NextResponse.json({
    isPro,
    plan: isPro ? user.plan_type : "free",
    limits: isPro
      ? {
          maxRubrics: -1, // unlimited
          maxGridSize: "10x10",
          templates: -1, // all 50+
          scoring: true,
          pdfWatermark: false,
          customBranding: true,
        }
      : {
          maxRubrics: 3,
          maxGridSize: "4x4",
          templates: 5,
          scoring: false,
          pdfWatermark: true,
          customBranding: false,
        },
  });
}
