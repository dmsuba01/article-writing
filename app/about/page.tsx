// app/about/page.tsx
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About — Article Writer",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero banner */}
        <section className="bg-primary py-16 text-white text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            About Article Writer
          </h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Our mission is to empower every beginner to find their writing voice
          </p>
        </section>

        {/* Story */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-text-muted leading-relaxed mb-4">
                Article Writer was born from a simple idea: everyone has
                something worth saying. We built this platform to give beginner
                writers a safe, welcoming space to practice, share, and grow.
              </p>
              <p className="text-text-muted leading-relaxed mb-4">
                Writing can feel daunting at first. That&apos;s why we keep
                things simple — no algorithms, no clutter, just you and your
                words. Our community reads, comments, and encourages each other
                every step of the way.
              </p>
              <p className="text-text-muted leading-relaxed">
                Whether you want to write about technology, travel, personal
                experiences, or anything in between — this is your canvas.
              </p>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-80">
              <Image
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80"
                alt="Books on a library shelf"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-bg-muted py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-gray-900 text-center mb-12">
              What We Believe In
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                {
                  emoji: "✍️",
                  title: "Everyone Can Write",
                  desc: "You don't need a degree or years of experience. If you have an idea, you can write about it.",
                },
                {
                  emoji: "🤝",
                  title: "Community Matters",
                  desc: "Great writing improves through feedback and encouragement from a supportive community.",
                },
                {
                  emoji: "📚",
                  title: "Learning Never Stops",
                  desc: "Every article you write and read makes you a better communicator.",
                },
                {
                  emoji: "🌱",
                  title: "Growth Over Perfection",
                  desc: "We celebrate progress. Your tenth article will be better than your first — and that's the point.",
                },
                {
                  emoji: "🔓",
                  title: "Open to All",
                  desc: "No paywall for readers. Anyone can discover, like, and comment on articles for free.",
                },
                {
                  emoji: "💡",
                  title: "Ideas First",
                  desc: "We believe in the power of ideas. Good writing starts with having something meaningful to say.",
                },
              ].map((v, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 shadow-card article-card"
                >
                  <div className="text-3xl mb-3">{v.emoji}</div>
                  <h3 className="font-display font-bold text-gray-900 mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-display text-3xl font-bold text-gray-900 text-center mb-4">
            How It Works
          </h2>
          <p className="text-text-muted text-center mb-12 max-w-xl mx-auto">
            Getting started is easy. Here&apos;s how the platform works for
            readers and writers alike.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Viewers */}
            <div className="bg-white rounded-2xl p-8 shadow-card border-l-4 border-accent">
              <h3 className="font-display text-xl font-bold text-gray-900 mb-4">
                🔍 For Readers
              </h3>
              <ul className="space-y-3">
                {[
                  "Browse all articles without signing up",
                  "Search articles by title or keyword",
                  "Filter articles by topic",
                  "Like articles to show appreciation",
                  "Leave comments under any article",
                  "Share articles with others",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-muted">
                    <span className="text-primary mt-0.5">◆</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Admins */}
            <div className="bg-white rounded-2xl p-8 shadow-card border-l-4 border-primary">
              <h3 className="font-display text-xl font-bold text-gray-900 mb-4">
                ✏️ For Admins
              </h3>
              <ul className="space-y-3">
                {[
                  "Login with your admin credentials",
                  "Create new articles with a rich text editor",
                  "Edit or delete any existing article",
                  "Assign topics and author names",
                  "Add new admin users to the platform",
                  "All reader features included",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-muted">
                    <span className="text-primary mt-0.5">◆</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/articles"
              className="inline-block bg-primary text-white px-8 py-3.5 rounded-xl font-medium hover:bg-primary-dark transition-colors shadow-md"
            >
              Explore Articles
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
