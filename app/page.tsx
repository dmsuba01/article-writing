// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Users, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { store } from "@/lib/store";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const totalLikes = store.articles.reduce((sum, a) => sum + a.likes, 0);
  const totalComments = store.articles.reduce(
    (sum, a) => sum + a.comments.length,
    0
  );

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="font-display text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Writing Is My{" "}
                <span className="text-primary">Passion</span>
              </h1>
              <p className="text-lg text-text-muted mb-8 leading-relaxed">
                Welcome to your article writing companion. Create, share, and
                discover amazing articles. Start your writing journey today!
              </p>

              {/* Search */}
              <form action="/articles" method="GET" className="mb-8">
                <div className="flex items-center bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden focus-within:border-primary transition-colors">
                  <svg
                    className="ml-4 text-gray-400 flex-shrink-0"
                    width="18"
                    height="18"
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
                    name="q"
                    placeholder="Search articles..."
                    className="flex-1 px-4 py-4 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="mr-2 px-4 py-2 bg-primary text-white text-sm rounded-xl hover:bg-primary-dark transition-colors"
                  >
                    Search
                  </button>
                </div>
              </form>

              <Link
                href="/articles"
                className="inline-block bg-primary text-white px-8 py-3.5 rounded-xl font-medium hover:bg-primary-dark transition-colors shadow-md"
              >
                Explore Articles
              </Link>
            </div>

            {/* Hero image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-80 md:h-96">
              <Image
                src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80"
                alt="Person writing in a notebook with coffee"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <section className="bg-primary text-white py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 gap-6 text-center">
              {[
                {
                  icon: <BookOpen size={28} />,
                  value: store.articles.length,
                  label: "Articles Published",
                },
                {
                  icon: <Users size={28} />,
                  value: totalComments,
                  label: "Community Comments",
                },
                {
                  icon: <Heart size={28} />,
                  value: totalLikes,
                  label: "Total Likes",
                },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="opacity-70">{stat.icon}</div>
                  <div className="text-left">
                    <div className="text-2xl md:text-3xl font-bold">
                      {stat.value}
                    </div>
                    <div className="text-white/70 text-sm">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Start Your Writing Journey
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Join our community of writers. Share your thoughts, learn from
              others, and improve your writing skills.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <BookOpen size={28} />,
                title: "Write Articles",
                desc: "Create and publish your articles with our easy-to-use editor",
              },
              {
                icon: <Users size={28} />,
                title: "Engage Community",
                desc: "Comment, like, and share articles with fellow writers",
              },
              {
                icon: <Heart size={28} />,
                title: "Get Feedback",
                desc: "Receive valuable feedback to improve your writing",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-card text-center article-card"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5 text-primary">
                  {card.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-3">
                  {card.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
