// lib/auth.ts
import { cookies } from "next/headers";
import { store, simpleHash } from "./store";

export const SESSION_COOKIE = "aw_session";

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

export function isAdmin(email: string): boolean {
  return store.admins.some((a) => a.email === email);
}

export function verifyLogin(
  email: string,
  password: string
): { email: string; name: string } | null {
  const admin = store.admins.find(
    (a) =>
      a.email.toLowerCase() === email.toLowerCase() &&
      a.passwordHash === simpleHash(password)
  );
  if (!admin) return null;
  return { email: admin.email, name: admin.name };
}
