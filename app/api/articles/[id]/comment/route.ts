// app/api/articles/[id]/comments/route.ts
// ─────────────────────────────────────────────────────────────────────────────
// GET    /api/articles/:id/comments  → fetch all comments for an article
// POST   /api/articles/:id/comments  → add a new comment to an article
// DELETE /api/articles/:id/comments  → delete a comment (admin only)
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import {
  addComment,
  deleteComment,
  getCommentsByArticle,
} from "@/lib/db/comments";
import { getSession } from "@/lib/auth";

// GET /api/articles/:id/comments
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const comments = await getCommentsByArticle(params.id);
    return NextResponse.json(comments);
  } catch (error) {
    console.error("GET /api/articles/[id]/comments error:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

// POST /api/articles/:id/comments — anyone can comment
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { name, text } = body;

    if (!name || !text) {
      return NextResponse.json(
        { error: "Name and comment text are required" },
        { status: 400 }
      );
    }

    if (text.trim().length < 2) {
      return NextResponse.json(
        { error: "Comment is too short" },
        { status: 400 }
      );
    }

    const comment = await addComment(params.id, {
      name: name.trim(),
      text: text.trim(),
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("POST /api/articles/[id]/comments error:", error);
    return NextResponse.json(
      { error: "Failed to add comment" },
      { status: 500 }
    );
  }
}

// DELETE /api/articles/:id/comments?commentId=xxx — admin only
export async function DELETE(
  req: NextRequest,
  { params: _params }: { params: { id: string } }
) {
  try {
    const session = getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const commentId = searchParams.get("commentId");

    if (!commentId) {
      return NextResponse.json(
        { error: "commentId query param is required" },
        { status: 400 }
      );
    }

    await deleteComment(commentId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/articles/[id]/comments error:", error);
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 }
    );
  }
}