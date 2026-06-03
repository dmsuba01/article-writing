// app/articles/page.tsx
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { store } from "@/lib/store";
import { getSession } from "@/lib/auth";
import ArticlesClient from "./ArticlesClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Articles — Article Writer",
};

export default function ArticlesPage({
  searchParams,
}: {
  searchParams: { q?: string; topic?: string };
}) {
  const session = getSession();
  const isAdmin = !!session;

  const q = searchParams.q?.toLowerCase() || "";
  const topic = searchParams.topic || "All";

  const topics = ["All", ...Array.from(new Set(store.articles.map((a) => a.topic)))];

  const filtered = store.articles.filter((a) => {
    const matchesTopic = topic === "All" || a.topic === topic;
    const matchesSearch =
      !q ||
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.topic.toLowerCase().includes(q);
    return matchesTopic && matchesSearch;
  });

  return (
    <>
      <Header />
      <main>
        {/* Hero banner */}
        <section className="bg-primary py-12 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="font-display text-4xl font-bold text-white mb-2">
                Articles
              </h1>
              <p className="text-white/70">Discover and share amazing content</p>
            </div>
            {isAdmin && (
              <Link
                href="/articles/new"
                className="flex items-center gap-2 bg-white text-primary font-semibold px-5 py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-lg text-sm"
              >
                + Create Article
              </Link>
            )}
          </div>
        </section>

        <ArticlesClient
          articles={filtered}
          topics={topics}
          currentTopic={topic}
          currentQ={q}
          isAdmin={isAdmin}
        />
      </main>
      <Footer />
    </>
  );
}
