"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Sparkles, Trophy, Zap } from "lucide-react";

const MAJORS = [
  "Computer Science", "Information Technology", "Software Engineering",
  "Data Science", "AI / Machine Learning", "Electrical Engineering",
  "Business / Management", "Design / UX", "Marketing", "Finance", "Other",
];

const ROLES = [
  "Full-stack Developer", "Frontend Developer", "Backend Developer",
  "Mobile Developer", "UI/UX Designer", "Data Scientist / ML Engineer",
  "Project Manager", "Marketing / Growth", "Finance / Business", "Other",
];

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({ name: "", email: "", password: "", major: "", role: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [loading, setLoading] = useState(false);

  function set(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate() {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email format";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Minimum 6 characters";
    if (!form.major) e.major = "Please select your major";
    if (!form.role) e.role = "Please select your role";
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
        <div
          style={{
            position: "absolute", width: 300, height: 300, borderRadius: "50%",
            background: "#FFD034", filter: "blur(90px)", opacity: 0.07, top: -80, left: -60,
          }}
        />
        <div
          style={{
            position: "absolute", width: 220, height: 220, borderRadius: "50%",
            background: "#FF6B6B", filter: "blur(70px)", opacity: 0.07, bottom: -50, right: -50,
          }}
        />

        <div className="flex items-center gap-2 relative z-10">
          <div className="w-9 h-9 rounded-full bg-[#FFD034] flex items-center justify-center">
            <span className="text-[#25262B] font-bold text-sm">H</span>
          </div>
          <span className="font-bold text-white text-lg">HakaSynC</span>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Join the best
            <br />
            competition
            <br />
            <span className="text-[#FFD034]">community.</span>
          </h2>
          <p className="text-white/50 text-sm leading-relaxed">
            Create your profile in seconds and start connecting with teammates for your next big win.
          </p>

          <div className="mt-10 flex flex-col gap-3">
            {[
              { icon: Trophy, label: "Compete in 50+ competitions" },
              { icon: Sparkles, label: "AI-powered task & slide tools" },
              { icon: Zap, label: "Auto portfolio from every project" },
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
      <div className="flex-1 bg-[#F4F0EB] flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md py-6">
          <div className="flex items-center gap-2 mb-8 md:hidden">
            <div className="w-8 h-8 rounded-full bg-[#25262B] flex items-center justify-center">
              <span className="text-[#FFD034] font-bold text-xs">H</span>
            </div>
            <span className="font-bold text-[#25262B]">HakaSynC</span>
          </div>

          <h1 className="text-3xl font-bold text-[#25262B] mb-1">Create account</h1>
          <p className="text-[#8B8B8B] text-sm mb-8">
            Already have an account?{" "}
            <Link href="/login" className="text-[#25262B] font-semibold hover:underline">
              Sign in
            </Link>
          </p>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#25262B]">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Alex Nguyen"
                className={`h-11 px-4 rounded-[14px] bg-white border text-sm text-[#25262B] placeholder:text-[#C4C4C4] outline-none focus:ring-2 focus:ring-[#FFD034] transition ${errors.name ? "border-[#FF6B6B]" : "border-[#E0D9D2]"}`}
              />
              {errors.name && <p className="text-[#FF6B6B] text-xs">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#25262B]">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
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
                  value={form.password}
                  onChange={(e) => set("password", e.target.value)}
                  placeholder="Min. 6 characters"
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

            {/* Major */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#25262B]">Major / Field</label>
              <select
                value={form.major}
                onChange={(e) => set("major", e.target.value)}
                className={`h-11 px-4 rounded-[14px] bg-white border text-sm text-[#25262B] outline-none focus:ring-2 focus:ring-[#FFD034] transition appearance-none ${errors.major ? "border-[#FF6B6B]" : "border-[#E0D9D2]"} ${!form.major ? "text-[#C4C4C4]" : ""}`}
              >
                <option value="" disabled>Select your major</option>
                {MAJORS.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
              {errors.major && <p className="text-[#FF6B6B] text-xs">{errors.major}</p>}
            </div>

            {/* Role */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#25262B]">Primary Role</label>
              <select
                value={form.role}
                onChange={(e) => set("role", e.target.value)}
                className={`h-11 px-4 rounded-[14px] bg-white border text-sm text-[#25262B] outline-none focus:ring-2 focus:ring-[#FFD034] transition appearance-none ${errors.role ? "border-[#FF6B6B]" : "border-[#E0D9D2]"} ${!form.role ? "text-[#C4C4C4]" : ""}`}
              >
                <option value="" disabled>Select your role</option>
                {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
              {errors.role && <p className="text-[#FF6B6B] text-xs">{errors.role}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="h-11 rounded-[99px] bg-[#25262B] text-white font-semibold text-sm hover:bg-[#25262B]/90 transition-colors disabled:opacity-60 mt-1"
            >
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
