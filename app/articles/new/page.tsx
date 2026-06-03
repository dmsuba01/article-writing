// app/articles/new/page.tsx
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSession } from "@/lib/auth";
import ArticleForm from "../ArticleForm";

export const metadata = {
  title: "Create Article — Article Writer",
};

export default function NewArticlePage() {
  const session = getSession();
  if (!session) redirect("/articles");

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display text-3xl font-bold text-gray-900 mb-8">
          Create New Article
        </h1>
        <ArticleForm mode="create" authorName={session.name} />
      </main>
      <Footer />
    </>
  );
}
