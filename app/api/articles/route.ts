// app/api/articles/route.ts
// ─────────────────────────────────────────────────────────────────────────────
// GET  /api/articles  → fetch all articles from Neon database
// POST /api/articles  → create a new article (admin only)
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import { getAllArticles, createArticle } from "@/lib/db/articles";
import { getSession } from "@/lib/auth";

// GET /api/articles
export async function GET() {
  try {
    const articles = await getAllArticles();
    return NextResponse.json(articles);
  } catch (error) {
    console.error("GET /api/articles error:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}

// POST /api/articles — admin only
export async function POST(req: NextRequest) {
  try {
    const session = getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, topic, excerpt, content, author } = body;

    if (!title || !topic || !excerpt || !content || !author) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const article = await createArticle({ title, topic, excerpt, content, author });
    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error("POST /api/articles error:", error);
    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 }
    );
  }
}