// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-primary">◆</span>
              <span className="font-display text-lg font-bold text-gray-900">
                Article Writer
              </span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              Empowering beginners to become confident writers. Create, share,
              and discover amazing articles.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-gray-900 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["Home", "About", "Articles", "Contact"].map((page) => (
                <li key={page}>
                  <Link
                    href={page === "Home" ? "/" : `/${page.toLowerCase()}`}
                    className="text-sm text-text-muted hover:text-primary transition-colors"
                  >
                    {page}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-display font-bold text-gray-900 mb-4">
              Features
            </h3>
            <ul className="space-y-2">
              {[
                "Create & Edit Articles",
                "Comment & Engage",
                "Like & Share",
                "Search Articles",
              ].map((f) => (
                <li key={f} className="text-sm text-text-muted">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-10 pt-6 text-center">
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} Article Writer. Made for aspiring
            writers.
          </p>
        </div>
      </div>
    </footer>
  );
}
