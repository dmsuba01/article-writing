// app/api/articles/[id]/comment/route.ts
import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";
import { v4 as uuidv4 } from "uuid";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const article = store.articles.find((a) => a.id === params.id);
  if (!article) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  const { name, text } = await req.json();

  if (!name?.trim() || !text?.trim()) {
    return NextResponse.json(
      { ok: false, error: "Name and comment text required" },
      { status: 400 }
    );
  }

  const comment = {
    id: uuidv4(),
    name: name.trim(),
    text: text.trim(),
    date: new Date().toISOString().split("T")[0],
  };

  article.comments.push(comment);

  return NextResponse.json({ ok: true, comments: article.comments });
}
