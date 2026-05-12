"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Sparkles, Users, TrendingUp } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const e: typeof errors = {};
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Invalid email format";
    if (!password) e.password = "Password is required";
    return e;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    document.cookie = "mock-auth=true; path=/; max-age=604800";
    router.push("/feed");
  }

  return (
    <div className="min-h-screen flex font-[family-name:var(--font-poppins)]">
      {/* Left dark panel */}
      <div className="hidden md:flex md:w-[42%] bg-[#25262B] flex-col justify-between p-10 relative overflow-hidden">
        {/* Decorative blobs */}
        <div
          style={{
            position: "absolute", width: 280, height: 280, borderRadius: "50%",
            background: "#FFD034", filter: "blur(90px)", opacity: 0.07, top: -60, right: -60,
          }}
        />
        <div
          style={{
            position: "absolute", width: 200, height: 200, borderRadius: "50%",
            background: "#FF6B6B", filter: "blur(70px)", opacity: 0.07, bottom: -40, left: -40,
          }}
        />

        {/* Logo */}
        <div className="flex items-center gap-2 relative z-10">
          <div className="w-9 h-9 rounded-full bg-[#FFD034] flex items-center justify-center">
            <span className="text-[#25262B] font-bold text-sm">H</span>
          </div>
          <span className="font-bold text-white text-lg">HakaSynC</span>
        </div>

        {/* Tagline */}
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Welcome back.
            <br />
            <span className="text-[#FFD034]">Your team</span>
            <br />
            is waiting.
          </h2>
          <p className="text-white/50 text-sm leading-relaxed">
            Log in to continue collaborating, tracking tasks, and building your portfolio.
          </p>

          {/* Mini stat cards */}
          <div className="mt-10 flex flex-col gap-3">
            {[
              { icon: Users, label: "248 teams actively competing" },
              { icon: Sparkles, label: "AI workspace ready for you" },
              { icon: TrendingUp, label: "Auto portfolio on every project" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 bg-white/5 rounded-[14px] px-4 py-3">
                <Icon size={16} className="text-[#FFD034] shrink-0" />
                <span className="text-white/70 text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-white/25 text-xs relative z-10">© 2026 HakaSynC</p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 bg-[#F4F0EB] flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 md:hidden">
            <div className="w-8 h-8 rounded-full bg-[#25262B] flex items-center justify-center">
              <span className="text-[#FFD034] font-bold text-xs">H</span>
            </div>
            <span className="font-bold text-[#25262B]">HakaSynC</span>
          </div>

          <h1 className="text-3xl font-bold text-[#25262B] mb-1">Sign in</h1>
          <p className="text-[#8B8B8B] text-sm mb-8">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#25262B] font-semibold hover:underline">
              Create one
            </Link>
          </p>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#25262B]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: undefined })); }}
                placeholder="you@example.com"
                className={`h-11 px-4 rounded-[14px] bg-white border text-sm text-[#25262B] placeholder:text-[#C4C4C4] outline-none focus:ring-2 focus:ring-[#FFD034] transition ${errors.email ? "border-[#FF6B6B]" : "border-[#E0D9D2]"}`}
              />
              {errors.email && <p className="text-[#FF6B6B] text-xs">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#25262B]">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors((prev) => ({ ...prev, password: undefined })); }}
                  placeholder="••••••••"
                  className={`w-full h-11 px-4 pr-11 rounded-[14px] bg-white border text-sm text-[#25262B] placeholder:text-[#C4C4C4] outline-none focus:ring-2 focus:ring-[#FFD034] transition ${errors.password ? "border-[#FF6B6B]" : "border-[#E0D9D2]"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B8B8B] hover:text-[#25262B] transition"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-[#FF6B6B] text-xs">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="h-11 rounded-[99px] bg-[#25262B] text-white font-semibold text-sm hover:bg-[#25262B]/90 transition-colors disabled:opacity-60 mt-1"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
