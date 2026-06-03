// app/api/articles/[id]/like/route.ts
import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const article = store.articles.find((a) => a.id === params.id);
  if (!article) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  // Use IP or a simple session to prevent double-liking (basic approach)
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (article.likedBy.includes(ip)) {
    return NextResponse.json({ ok: false, error: "Already liked" });
  }

  article.likes += 1;
  article.likedBy.push(ip);

  return NextResponse.json({ ok: true, likes: article.likes });
}
