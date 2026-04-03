import { NextRequest, NextResponse } from "next/server";
import { checkProAccess } from "@/app/lib/pro";

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "email required" }, { status: 400 });
  }

  const hasAccess = await checkProAccess(email);
  return NextResponse.json({ isProUser: hasAccess });
}
