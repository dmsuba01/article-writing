// app/contact/page.tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact — Article Writer",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero banner */}
        <section className="bg-primary py-16 text-white text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-white/80 text-lg">
            Have questions? We&apos;d love to hear from you
          </p>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left: Contact info */}
            <div>
              <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">
                Get In Touch
              </h2>
              <p className="text-text-muted leading-relaxed mb-8">
                Whether you have questions about the app, need help getting
                started, or want to provide feedback, we&apos;re here to help.
                Send us a message and we&apos;ll respond as soon as possible.
              </p>

              <div className="space-y-5">
                {[
                  {
                    emoji: "✉️",
                    title: "Email",
                    line1: "support@articlewriter.com",
                    line2: "We'll respond within 24 hours",
                  },
                  {
                    emoji: "📞",
                    title: "Support",
                    line1: "Available Mon–Fri",
                    line2: "9:00 AM – 5:00 PM IST",
                  },
                  {
                    emoji: "📍",
                    title: "Community",
                    line1: "Join our growing community",
                    line2: "Share and learn with fellow writers",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-primary/10 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                      {item.emoji}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {item.title}
                      </p>
                      <p className="text-sm text-text-muted">{item.line1}</p>
                      <p className="text-sm text-text-light">{item.line2}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick tips */}
              <div className="mt-8 bg-primary/5 border border-primary/20 rounded-2xl p-5">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Quick Tips
                </h3>
                <ul className="space-y-2 text-sm text-text-muted">
                  {[
                    "New to writing? Check our About page for guidance",
                    "No login needed to read, like, and comment on articles",
                    "Admin login required only to create/edit articles",
                    "Use the search feature to find articles quickly",
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">◆</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Demo credentials */}
              {/* <div className="mt-4 bg-white border border-gray-200 rounded-2xl p-5 shadow-card">
                <h3 className="font-semibold text-primary mb-2">
                  Demo Admin Access
                </h3>
                <p className="text-sm text-text-muted">
                  Email: admin@articlewriter.com
                </p>
                <p className="text-sm text-text-muted">Password: admin123</p>
              </div> */}
            </div> 

            {/* Right: Contact form */}
            <div className="bg-white rounded-2xl shadow-card p-8">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                Send a Message
              </h2>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
