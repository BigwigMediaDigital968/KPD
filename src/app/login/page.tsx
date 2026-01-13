"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Cookies from "js-cookie";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const ADMIN_EMAIL = "kpd@gmail.com";
  const ADMIN_PASSWORD = "Kpd@2025";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        Cookies.set("adminAuth", "true", { expires: 1, sameSite: "strict" });
        router.push("/admin");
      } else {
        setError("Invalid email or password");
      }
      setLoading(false);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Nav />

      <main className="flex-1 flex items-center justify-center px-4 mt-36 mb-20">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              Admin Login
            </h1>
            <p className="text-gray-400 text-sm mt-2">
              Secure access to dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* Email */}
            <div>
              <label className="text-sm text-gray-300 mb-1 block">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@email.com"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-black/40 border border-white/10 focus:border-white/30 focus:outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-300 mb-1 block">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-lg bg-black/40 border border-white/10 focus:border-white/30 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-400 text-center">{error}</p>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition disabled:opacity-60"
            >
              {loading ? "Checking..." : "Login"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-xs text-gray-500 text-center mt-6">
            © {new Date().getFullYear()} Admin Panel
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
