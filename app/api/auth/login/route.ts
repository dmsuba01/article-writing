 // app/api/login/route.ts
// ─────────────────────────────────────────────────────────────────────────────
// POST   /api/login  → verify admin credentials, set session cookie
// DELETE /api/login  → logout, clear session cookie
//
// KEY CHANGE from old version:
//   verifyLogin() is now ASYNC — you must add "await" before it.
//   Everything else (cookie logic, session format) stays the same.
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import { verifyLogin, SESSION_COOKIE } from "@/lib/auth";

// POST /api/login
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // ⚠️ IMPORTANT: verifyLogin is now async — must await
    const user = await verifyLogin(email, password);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Encode session as base64 JSON and store in a cookie
    const sessionValue = Buffer.from(JSON.stringify(user)).toString("base64");

    const response = NextResponse.json({ success: true, user });

    response.cookies.set(SESSION_COOKIE, sessionValue, {
      httpOnly: true,                                        // not accessible by JS
      secure: process.env.NODE_ENV === "production",        // HTTPS only in prod
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,                            // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("POST /api/login error:", error);
    return NextResponse.json(
      { error: "Login failed. Please try again." },
      { status: 500 }
    );
  }
}

// DELETE /api/login — logout by clearing the session cookie
export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(SESSION_COOKIE);
  return response;
}