// app/articles/[id]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { store } from "@/lib/store";
import { getSession } from "@/lib/auth";
import ArticleActions from "./ArticleActions";

export const dynamic = "force-dynamic";

export default function ArticlePage({ params }: { params: { id: string } }) {
  const article = store.articles.find((a) => a.id === params.id);
  if (!article) notFound();

  const session = getSession();
  const isAdmin = !!session;

  // Render content (simple markdown-like)
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: JSX.Element[] = [];
    let key = 0;

    for (const line of lines) {
      if (line.startsWith("## ")) {
        elements.push(
          <h2 key={key++}>{line.slice(3)}</h2>
        );
      } else if (line.startsWith("- **")) {
        const match = line.match(/^- \*\*(.+?)\*\*:?\s*(.*)/);
        if (match) {
          elements.push(
            <ul key={key++}>
              <li>
                <strong>{match[1]}</strong>
                {match[2] ? ": " + match[2] : ""}
              </li>
            </ul>
          );
        }
      } else if (line.startsWith("- ")) {
        elements.push(
          <ul key={key++}>
            <li>{line.slice(2)}</li>
          </ul>
        );
      } else if (line.trim() === "") {
        // skip blank lines
      } else {
        // Handle inline bold **text**
        const parts = line.split(/\*\*(.+?)\*\*/g);
        const rendered = parts.map((part, i) =>
          i % 2 === 1 ? <strong key={i}>{part}</strong> : part
        );
        elements.push(<p key={key++}>{rendered}</p>);
      }
    }
    return elements;
  };

  return (
    <>
      <Header />
      <main>
        {/* Back button */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors mb-6"
          >
            ← Back to Articles
          </Link>
        </div>

        {/* Article */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Meta */}
          <div className="mb-3">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full">
              {article.topic}
            </span>
          </div>

          <h1 className="font-display text-4xl font-bold text-gray-900 leading-tight mb-4">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-8 pb-6 border-b border-gray-100">
            <span>By <strong className="text-gray-700">{article.author}</strong></span>
            <span>{article.date}</span>
            <span>{article.likes} likes</span>
            <span>{article.comments.length} comments</span>
          </div>

          {/* Content */}
          <div className="prose-article">
            {renderContent(article.content)}
          </div>

          {/* Actions: Like, Share, Admin controls */}
          <ArticleActions
            article={{
              id: article.id,
              likes: article.likes,
              title: article.title,
            }}
            isAdmin={isAdmin}
            comments={article.comments}
          />
        </article>
      </main>
      <Footer />
    </>
  );
}
