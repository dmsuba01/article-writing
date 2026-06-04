// lib/db/articles.ts
// ─────────────────────────────────────────────────────────────────────────────
// All database operations for articles.
// Import these in your API routes instead of using store.articles directly.
//
// Usage example in an API route:
//   import { getAllArticles } from "@/lib/db/articles";
//   const articles = await getAllArticles();
// ─────────────────────────────────────────────────────────────────────────────

import { prisma } from "@/lib/prisma";

// ── Get all articles (newest first, with comments) ────────────────────────────
export async function getAllArticles() {
  return prisma.article.findMany({
    include: {
      comments: {
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

// ── Get a single article by ID ────────────────────────────────────────────────
export async function getArticleById(id: string) {
  return prisma.article.findUnique({
    where: { id },
    include: {
      comments: {
        orderBy: { createdAt: "asc" },
      },
    },
  });
}

// ── Create a new article ──────────────────────────────────────────────────────
export async function createArticle(data: {
  title: string;
  topic: string;
  excerpt: string;
  content: string;
  author: string;
}) {
  return prisma.article.create({
    data,
    include: { comments: true },
  });
}

// ── Update an existing article ────────────────────────────────────────────────
export async function updateArticle(
  id: string,
  data: {
    title?: string;
    topic?: string;
    excerpt?: string;
    content?: string;
    author?: string;
  }
) {
  return prisma.article.update({
    where: { id },
    data,
    include: { comments: true },
  });
}

// ── Delete an article (cascade deletes its comments too) ──────────────────────
export async function deleteArticle(id: string) {
  return prisma.article.delete({
    where: { id },
  });
}

// ── Toggle like on an article ─────────────────────────────────────────────────
// sessionId is stored in a cookie on the user's browser.
// We store sessionIds in the likedBy array to prevent double-liking.
export async function toggleLike(articleId: string, sessionId: string) {
  const article = await prisma.article.findUnique({
    where: { id: articleId },
    select: { likedBy: true, likes: true },
  });

  if (!article) throw new Error("Article not found");

  const hasLiked = article.likedBy.includes(sessionId);

  const likedBy = hasLiked
    ? article.likedBy.filter((id) => id !== sessionId) // remove like
    : [...article.likedBy, sessionId];                 // add like

  return prisma.article.update({
    where: { id: articleId },
    data: {
      likes: likedBy.length,
      likedBy,
    },
  });
}

// ── Search articles by topic or title ────────────────────────────────────────
export async function searchArticles(query: string) {
  return prisma.article.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { topic: { contains: query, mode: "insensitive" } },
        { excerpt: { contains: query, mode: "insensitive" } },
      ],
    },
    include: { comments: true },
    orderBy: { createdAt: "desc" },
  });
}