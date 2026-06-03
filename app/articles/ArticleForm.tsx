"use client";
// app/articles/ArticleForm.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type FormValues = {
  title: string;
  topic: string;
  excerpt: string;
  content: string;
  author: string;
};

type Props = {
  mode: "create" | "edit";
  articleId?: string;
  authorName: string;
  initial?: FormValues;
};

const TOPICS = [
  "Writing Tips",
  "Research",
  "Headlines",
  "Grammar",
  "Storytelling",
  "Opinion",
  "Technology",
  "Lifestyle",
  "Travel",
  "Health",
  "Other",
];

export default function ArticleForm({ mode, articleId, authorName, initial }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<FormValues>(
    initial || {
      title: "",
      topic: "Writing Tips",
      excerpt: "",
      content: "",
      author: authorName,
    }
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const url =
      mode === "create" ? "/api/articles" : `/api/articles/${articleId}`;
    const method = mode === "create" ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);

    if (data.ok) {
      router.push(`/articles/${data.id}`);
      router.refresh();
    } else {
      setError(data.error || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title *
        </label>
        <input
          type="text"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
          placeholder="Your article title..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Topic *
          </label>
          <select
            required
            value={form.topic}
            onChange={(e) => setForm({ ...form, topic: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors bg-white"
          >
            {TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Author Name *
          </label>
          <input
            type="text"
            required
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
            placeholder="Your name"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Excerpt * <span className="text-text-light">(short summary, 1–2 sentences)</span>
        </label>
        <textarea
          required
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          rows={2}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors resize-none"
          placeholder="A short summary of your article..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Content *{" "}
          <span className="text-text-light">
            (use ## for headings, - for bullet points, **bold** for emphasis)
          </span>
        </label>
        <textarea
          required
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          rows={16}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors resize-y font-mono"
          placeholder={`## Introduction\n\nWrite your introduction here...\n\n## Main Section\n\nYour content...\n\n- Bullet point one\n- Bullet point two\n\n## Conclusion\n\nWrap up your article...`}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white px-8 py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors disabled:opacity-60"
        >
          {loading
            ? "Saving..."
            : mode === "create"
            ? "Publish Article"
            : "Save Changes"}
        </button>
        <Link
          href="/articles"
          className="text-sm text-text-muted hover:text-primary transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
