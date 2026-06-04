// lib/prisma.ts
// ─────────────────────────────────────────────────────────────────────────────
// Creates a single shared Prisma client instance.
//
// WHY: In Next.js dev mode, every file save hot-reloads the server.
// Without this singleton, each reload creates a NEW database connection,
// quickly exhausting Neon's connection limit.
//
// This file attaches the client to Node's `global` object so it survives
// hot reloads in development, while in production it creates one instance.
// ─────────────────────────────────────────────────────────────────────────────

import { PrismaClient } from "@prisma/client";

// Extend the global type so TypeScript knows about our custom property
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
  });

// In development: attach to global so hot reloads reuse same connection
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}