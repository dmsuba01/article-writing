// app/api/auth/add-admin/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { store, simpleHash } from "@/lib/store";

export async function POST(req: NextRequest) {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { email, password, name } = await req.json();

  if (!email || !password || !name) {
    return NextResponse.json({ ok: false, error: "All fields required" }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ ok: false, error: "Password must be at least 6 characters" }, { status: 400 });
  }

  if (store.admins.some((a) => a.email.toLowerCase() === email.toLowerCase())) {
    return NextResponse.json({ ok: false, error: "Admin with this email already exists" }, { status: 400 });
  }

  store.admins.push({
    email: email.toLowerCase(),
    passwordHash: simpleHash(password),
    name,
  });

  return NextResponse.json({ ok: true });
}
