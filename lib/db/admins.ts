// lib/db/admins.ts
// ─────────────────────────────────────────────────────────────────────────────
// Admin authentication against the Neon database.
// Replaces the in-memory store.admins array used in lib/auth.ts
//
// Usage example in login API route:
//   import { verifyAdminLogin } from "@/lib/db/admins";
//   const user = await verifyAdminLogin(email, password);
// ─────────────────────────────────────────────────────────────────────────────

import { prisma } from "@/lib/prisma";
import { simpleHash } from "@/lib/store"; // reuse same hash function

// ── Verify admin login credentials ────────────────────────────────────────────
// Returns { email, name } if login is correct, or null if wrong.
export async function verifyAdminLogin(
  email: string,
  password: string
): Promise<{ email: string; name: string } | null> {
  const admin = await prisma.admin.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!admin) return null;
  if (admin.passwordHash !== simpleHash(password)) return null;

  return { email: admin.email, name: admin.name };
}

// ── Check if an email belongs to an admin ─────────────────────────────────────
export async function isAdminEmail(email: string): Promise<boolean> {
  const admin = await prisma.admin.findUnique({
    where: { email: email.toLowerCase() },
    select: { id: true }, // only fetch id, more efficient
  });
  return !!admin;
}

// ── Create a new admin (useful for adding more admins later) ──────────────────
export async function createAdmin(data: {
  email: string;
  password: string;
  name: string;
}) {
  return prisma.admin.create({
    data: {
      email: data.email.toLowerCase(),
      passwordHash: simpleHash(data.password),
      name: data.name,
    },
  });
}