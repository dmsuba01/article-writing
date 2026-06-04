// lib/db/comments.ts
// ─────────────────────────────────────────────────────────────────────────────
// All database operations for comments.
// Import these in your API routes instead of pushing to store.articles[].comments
//
// Usage example:
//   import { addComment } from "@/lib/db/comments";
//   const comment = await addComment(articleId, { name, text });
// ─────────────────────────────────────────────────────────────────────────────

import { prisma } from "@/lib/prisma";

// ── Add a comment to an article ───────────────────────────────────────────────
export async function addComment(
  articleId: string,
  data: {
    name: string;
    text: string;
  }
) {
  return prisma.comment.create({
    data: {
      ...data,
      articleId,
    },
  });
}

// ── Delete a comment by ID ────────────────────────────────────────────────────
export async function deleteComment(commentId: string) {
  return prisma.comment.delete({
    where: { id: commentId },
  });
}

// ── Get all comments for a specific article ───────────────────────────────────
export async function getCommentsByArticle(articleId: string) {
  return prisma.comment.findMany({
    where: { articleId },
    orderBy: { createdAt: "asc" },
  });
}

// ── Get total comment count for an article ────────────────────────────────────
export async function getCommentCount(articleId: string) {
  return prisma.comment.count({
    where: { articleId },
  });
}