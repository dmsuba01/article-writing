"use client";
// app/articles/[id]/ArticleActions.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Heart, Share2, Trash2, Pencil, MessageCircle, Send } from "lucide-react";
import type { Comment } from "@/lib/store";

type Props = {
  article: { id: string; likes: number; title: string };
  isAdmin: boolean;
  comments: Comment[];
};

export default function ArticleActions({ article, isAdmin, comments }: Props) {
  const router = useRouter();
  const [likes, setLikes] = useState(article.likes);
  const [liked, setLiked] = useState(false);
  const [commentList, setCommentList] = useState<Comment[]>(comments);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [shareMsg, setShareMsg] = useState("");

  const handleLike = async () => {
    if (liked) return;
    const res = await fetch(`/api/articles/${article.id}/like`, {
      method: "POST",
    });
    const data = await res.json();
    if (data.ok) {
      setLikes(data.likes);
      setLiked(true);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: article.title, url });
    } else {
      navigator.clipboard.writeText(url);
      setShareMsg("Link copied!");
      setTimeout(() => setShareMsg(""), 2000);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this article?")) return;
    await fetch(`/api/articles/${article.id}`, { method: "DELETE" });
    router.push("/articles");
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    setSubmitting(true);
    const res = await fetch(`/api/articles/${article.id}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), text: text.trim() }),
    });
    const data = await res.json();
    setSubmitting(false);
    if (data.ok) {
      setCommentList(data.comments);
      setName("");
      setText("");
    }
  };

  return (
    <div className="mt-10">
      {/* Action bar */}
      <div className="flex flex-wrap items-center gap-3 py-5 border-y border-gray-100">
        <button
          onClick={handleLike}
          disabled={liked}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            liked
              ? "bg-primary text-white"
              : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
          }`}
        >
          <Heart size={16} fill={liked ? "white" : "none"} />
          {likes} {liked ? "Liked!" : "Like"}
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          <Share2 size={16} />
          {shareMsg || "Share"}
        </button>

        {isAdmin && (
          <>
            <Link
              href={`/articles/${article.id}/edit`}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary/10 text-primary rounded-xl text-sm font-medium hover:bg-primary hover:text-white transition-colors"
            >
              <Pencil size={16} />
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-500 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </>
        )}
      </div>

      {/* Comments */}
      <div className="mt-10">
        <h3 className="font-display text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <MessageCircle size={22} className="text-primary" />
          Comments ({commentList.length})
        </h3>

        {/* Comment form */}
        <form
          onSubmit={handleComment}
          className="bg-bg-muted rounded-2xl p-6 mb-8"
        >
          <h4 className="font-medium text-gray-900 mb-4">Leave a Comment</h4>
          <div className="space-y-3">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
            />
            <textarea
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your comment..."
              rows={3}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors resize-none"
            />
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-60"
            >
              <Send size={14} />
              {submitting ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </form>

        {/* Comment list */}
        {commentList.length === 0 ? (
          <p className="text-text-muted text-sm text-center py-6">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          <div className="space-y-4">
            {commentList.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-2xl p-5 shadow-card animate-fade-in"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900 text-sm">
                    {c.name}
                  </span>
                  <span className="text-xs text-text-light">{c.date}</span>
                </div>
                <p className="text-sm text-text-muted leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
