// app/not-found.tsx
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-8xl mb-6">📄</p>
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-text-muted mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors"
            >
              Go Home
            </Link>
            <Link
              href="/articles"
              className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium hover:border-primary hover:text-primary transition-colors"
            >
              Browse Articles
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
