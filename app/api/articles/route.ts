// app/api/articles/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { store } from "@/lib/store";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  return NextResponse.json({ articles: store.articles });
}

export async function POST(req: NextRequest) {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { title, topic, excerpt, content, author } = await req.json();

  if (!title || !topic || !excerpt || !content || !author) {
    return NextResponse.json({ ok: false, error: "All fields required" }, { status: 400 });
  }

  const newArticle = {
    id: uuidv4(),
    title: title.trim(),
    topic: topic.trim(),
    excerpt: excerpt.trim(),
    content: content.trim(),
    author: author.trim(),
    date: new Date().toISOString().split("T")[0],
    likes: 0,
    likedBy: [],
    comments: [],
  };

  store.articles.unshift(newArticle);

  return NextResponse.json({ ok: true, id: newArticle.id });
}
