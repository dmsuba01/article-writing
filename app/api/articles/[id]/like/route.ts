// app/api/articles/[id]/like/route.ts
// ─────────────────────────────────────────────────────────────────────────────
// POST /api/articles/:id/like → toggle like/unlike using a visitor cookie
//
// How it works:
//   1. Browser sends request to this route
//   2. We read (or create) a "aw_visitor" cookie — a unique ID per browser
//   3. We check if that ID is in the article's likedBy array
//   4. If yes → remove it (unlike). If no → add it (like)
//   5. Return the new like count and whether the user has liked it
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import { toggleLike } from "@/lib/db/articles";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

export async function POST(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get or create a visitor session ID stored in a cookie
    const cookieStore = cookies();
    let sessionId = cookieStore.get("aw_visitor")?.value;

    if (!sessionId) {
      sessionId = uuidv4(); // generate a new unique ID for this browser
    }

    const article = await toggleLike(params.id, sessionId);

    const response = NextResponse.json({
      likes: article.likes,
      liked: article.likedBy.includes(sessionId),
    });

    // Save the visitor ID cookie so they can't like twice
    response.cookies.set("aw_visitor", sessionId, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("POST /api/articles/[id]/like error:", error);
    return NextResponse.json(
      { error: "Failed to toggle like" },
      { status: 500 }
    );
  }
}