// app/api/articles/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { store } from "@/lib/store";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const article = store.articles.find((a) => a.id === params.id);
  if (!article) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ article });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const idx = store.articles.findIndex((a) => a.id === params.id);
  if (idx === -1) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  const { title, topic, excerpt, content, author } = await req.json();

  store.articles[idx] = {
    ...store.articles[idx],
    title: title?.trim() || store.articles[idx].title,
    topic: topic?.trim() || store.articles[idx].topic,
    excerpt: excerpt?.trim() || store.articles[idx].excerpt,
    content: content?.trim() || store.articles[idx].content,
    author: author?.trim() || store.articles[idx].author,
  };

  return NextResponse.json({ ok: true, id: params.id });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const idx = store.articles.findIndex((a) => a.id === params.id);
  if (idx === -1) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  store.articles.splice(idx, 1);
  return NextResponse.json({ ok: true });
}
