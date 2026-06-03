"use client";
// components/Header.tsx
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  LogIn,
  LogOut,
  UserPlus,
  User,
  ChevronDown,
} from "lucide-react";

type AdminSession = { email: string; name: string } | null;

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [addAdminOpen, setAddAdminOpen] = useState(false);
  const [session, setSession] = useState<AdminSession>(null);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [newAdmin, setNewAdmin] = useState({ email: "", password: "", name: "" });
  const [adminMsg, setAdminMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/articles", label: "Articles" },
    { href: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.session) setSession(d.session);
      })
      .catch(() => {});
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginForm),
    });
    const data = await res.json();
    setLoading(false);
    if (data.ok) {
      setSession(data.session);
      setLoginOpen(false);
      setLoginForm({ email: "", password: "" });
      router.refresh();
    } else {
      setLoginError(data.error || "Invalid credentials");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setSession(null);
    router.refresh();
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminMsg("");
    const res = await fetch("/api/auth/add-admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAdmin),
    });
    const data = await res.json();
    if (data.ok) {
      setAdminMsg("Admin added successfully!");
      setNewAdmin({ email: "", password: "", name: "" });
    } else {
      setAdminMsg(data.error || "Failed to add admin");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-primary text-xl">◆</span>
              <span
                className="font-display text-xl font-bold text-gray-900 group-hover:text-primary transition-colors"
              >
                Article Writer
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === link.href
                      ? "text-primary border-b-2 border-primary pb-0.5"
                      : "text-gray-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Admin controls */}
            <div className="hidden md:flex items-center gap-3">
              {session ? (
                <>
                  <span className="flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-3 py-1.5 rounded-full">
                    <User size={15} />
                    {session.name}
                  </span>
                  <button
                    onClick={() => setAddAdminOpen(true)}
                    className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    <UserPlus size={15} />
                    Add Admin
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <LogOut size={15} />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setLoginOpen(true)}
                  className="flex items-center gap-2 bg-primary text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  <LogIn size={15} />
                  Admin Login
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white animate-slide-down">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                    pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-100 mt-2">
                {session ? (
                  <div className="space-y-1">
                    <div className="px-3 py-2 text-sm text-primary font-medium flex items-center gap-2">
                      <User size={14} /> {session.name}
                    </div>
                    <button
                      onClick={() => { setAddAdminOpen(true); setMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-2"
                    >
                      <UserPlus size={14} /> Add Admin
                    </button>
                    <button
                      onClick={() => { handleLogout(); setMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2"
                    >
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setLoginOpen(true); setMenuOpen(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 bg-primary text-white text-sm rounded-lg"
                  >
                    <LogIn size={14} /> Admin Login
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Login Modal */}
      {loginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-bold text-gray-900">
                  Admin Login
                </h2>
                <button
                  onClick={() => { setLoginOpen(false); setLoginError(""); }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              {/* <div className="mb-4 p-3 bg-primary/5 border border-primary/20 rounded-lg text-sm">
                <p className="font-medium text-primary mb-1">Demo credentials:</p>
                <p className="text-gray-600">Email: admin@articlewriter.com</p>
                <p className="text-gray-600">Password: admin123</p>
              </div> */}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={loginForm.email}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, email: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="admin@articlewriter.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="••••••••"
                  />
                </div>
                {loginError && (
                  <p className="text-red-500 text-sm">{loginError}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white py-2.5 rounded-xl font-medium text-sm hover:bg-primary-dark transition-colors disabled:opacity-60"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Admin Modal */}
      {addAdminOpen && session && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-bold text-gray-900">
                  Add New Admin
                </h2>
                <button
                  onClick={() => { setAddAdminOpen(false); setAdminMsg(""); }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddAdmin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newAdmin.name}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, name: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={newAdmin.email}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, email: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary"
                    placeholder="newadmin@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={newAdmin.password}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, password: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary"
                    placeholder="Min. 6 characters"
                  />
                </div>
                {adminMsg && (
                  <p
                    className={`text-sm ${
                      adminMsg.includes("success")
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {adminMsg}
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2.5 rounded-xl font-medium text-sm hover:bg-primary-dark transition-colors"
                >
                  Add Admin
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
