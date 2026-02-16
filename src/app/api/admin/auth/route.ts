import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

function makeToken(password: string): string {
  return crypto.createHmac("sha256", "courtrenter").update(password).digest("hex");
}

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json(
      { error: "Admin password not configured" },
      { status: 500 }
    );
  }

  if (password === adminPassword) {
    const token = makeToken(adminPassword);
    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });
    return res;
  }

  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}

export async function GET(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json({ authenticated: false });
  }

  const token = req.cookies.get("admin_token")?.value;
  const expected = makeToken(adminPassword);
  return NextResponse.json({ authenticated: token === expected });
}
