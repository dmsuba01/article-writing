// app/articles/[id]/edit/page.tsx
import { redirect, notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSession } from "@/lib/auth";
import { store } from "@/lib/store";
import ArticleForm from "../../ArticleForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Edit Article — Article Writer",
};

export default function EditArticlePage({ params }: { params: { id: string } }) {
  const session = getSession();
  if (!session) redirect("/articles");

  const article = store.articles.find((a) => a.id === params.id);
  if (!article) notFound();

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display text-3xl font-bold text-gray-900 mb-8">
          Edit Article
        </h1>
        <ArticleForm
          mode="edit"
          articleId={article.id}
          authorName={session.name}
          initial={{
            title: article.title,
            topic: article.topic,
            excerpt: article.excerpt,
            content: article.content,
            author: article.author,
          }}
        />
      </main>
      <Footer />
    </>
  );
}
