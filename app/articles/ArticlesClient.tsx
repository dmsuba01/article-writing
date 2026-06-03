"use client";
// app/articles/ArticlesClient.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Heart, MessageCircle, Calendar, User } from "lucide-react";
import type { Article } from "@/lib/store";

type Props = {
  articles: Article[];
  topics: string[];
  currentTopic: string;
  currentQ: string;
  isAdmin: boolean;
};

export default function ArticlesClient({
  articles,
  topics,
  currentTopic,
  currentQ,
  isAdmin,
}: Props) {
  const router = useRouter();
  const [search, setSearch] = useState(currentQ);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (currentTopic !== "All") params.set("topic", currentTopic);
    router.push(`/articles?${params.toString()}`);
  };

  const handleTopicChange = (topic: string) => {
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (topic !== "All") params.set("topic", topic);
    router.push(`/articles?${params.toString()}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this article?")) return;
    await fetch(`/api/articles/${id}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Search */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex items-center bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden max-w-xl mx-auto focus-within:border-primary transition-colors">
          <svg
            className="ml-4 text-gray-400 flex-shrink-0"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles..."
            className="flex-1 px-4 py-3 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            className="mr-2 px-4 py-2 bg-primary text-white text-sm rounded-xl hover:bg-primary-dark transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {/* Topic filters */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => handleTopicChange(topic)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              currentTopic === topic
                ? "bg-primary text-white shadow-md"
                : "bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary"
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Article cards */}
      {articles.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">📝</p>
          <p className="text-text-muted text-lg">No articles found.</p>
          {isAdmin && (
            <Link
              href="/articles/new"
              className="mt-4 inline-block bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors"
            >
              Create the first article
            </Link>
          )}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl shadow-card article-card overflow-hidden flex flex-col"
            >
              {/* Card body - clickable */}
              <Link
                href={`/articles/${article.id}`}
                className="flex-1 p-6 block hover:no-underline group"
              >
                <div className="mb-3">
                  <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                    {article.topic}
                  </span>
                </div>
                <h2 className="font-display text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors leading-snug">
                  {article.title}
                </h2>
                <p className="text-sm text-text-muted leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </Link>

              {/* Card footer */}
              <div className="px-6 pb-5 border-t border-gray-50 pt-4">
                <div className="flex items-center justify-between text-xs text-text-light mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {article.date}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Heart size={12} /> {article.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={12} /> {article.comments.length}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-text-muted">
                    <User size={12} /> By {article.author}
                  </span>

                  {isAdmin && (
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/articles/${article.id}/edit`}
                        className="text-xs text-primary hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="text-xs text-red-400 hover:text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
