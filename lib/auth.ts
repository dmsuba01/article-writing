// lib/auth.ts  ← REPLACE your existing lib/auth.ts with this file
// ─────────────────────────────────────────────────────────────────────────────
// Authentication helpers. The session cookie logic is unchanged.
// Only the verifyLogin and isAdmin functions now query the database
// instead of the in-memory store.
// ─────────────────────────────────────────────────────────────────────────────

import { cookies } from "next/headers";
import { verifyAdminLogin, isAdminEmail } from "./db/admins";

export const SESSION_COOKIE = "aw_session";

// ── Get the currently logged-in user from the session cookie ──────────────────
// Returns { email, name } or null if not logged in
export function getSession(): { email: string; name: string } | null {
  const cookieStore = cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  if (!session) return null;
  try {
    return JSON.parse(Buffer.from(session.value, "base64").toString());
  } catch {
    return null;
  }
}

// ── Check if an email belongs to an admin (now queries database) ──────────────
export async function isAdmin(email: string): Promise<boolean> {
  return isAdminEmail(email);
}

// ── Verify login credentials against database ─────────────────────────────────
// Used in your login API route
export async function verifyLogin(
  email: string,
  password: string
): Promise<{ email: string; name: string } | null> {
  return verifyAdminLogin(email, password);
}