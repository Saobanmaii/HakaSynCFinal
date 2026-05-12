import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import Link from "next/link";
import {
  Users,
  Briefcase,
  LayoutGrid,
  Archive,
  ArrowRight,
  Sparkles,
  TrendingUp,
  FolderOpen,
} from "lucide-react";

export default async function LandingPage() {
  const authed = await isAuthed();
  if (authed) redirect("/feed");

  return (
    <main className="min-h-screen bg-[#F4F0EB] font-[family-name:var(--font-poppins)]">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-[#25262B] flex items-center justify-center">
            <span className="text-[#FFD034] font-bold text-sm">H</span>
          </div>
          <span className="font-bold text-[#25262B] text-lg">HakaSynC</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-5 py-2 rounded-[99px] text-sm font-medium text-[#25262B] hover:bg-[#25262B]/5 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="px-5 py-2 rounded-[99px] text-sm font-medium bg-[#25262B] text-white hover:bg-[#25262B]/90 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-8 pt-16 pb-24 text-center relative overflow-hidden">
        {/* Gradient blobs */}
        <div
          className="blob w-64 h-64 bg-[#FFD034] -top-10 -left-10 opacity-30"
          style={{ position: "absolute", borderRadius: "50%", filter: "blur(60px)" }}
        />
        <div
          className="blob w-48 h-48 bg-[#FF6B6B] top-10 -right-10 opacity-20"
          style={{ position: "absolute", borderRadius: "50%", filter: "blur(60px)" }}
        />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#FFD034] text-[#25262B] px-4 py-1.5 rounded-[99px] text-sm font-medium mb-6">
            <Sparkles size={14} />
            AI-powered team collaboration
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#25262B] leading-tight mb-6">
            Find your team.
            <br />
            <span className="text-[#FF6B6B]">Win together.</span>
          </h1>
          <p className="text-[#8B8B8B] text-lg max-w-xl mx-auto mb-10">
            The platform for students and professionals competing in academic, tech, and startup
            competitions. Connect, collaborate, and build your portfolio automatically.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[99px] bg-[#25262B] text-white font-semibold hover:bg-[#25262B]/90 transition-colors"
            >
              Get Started Free
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[99px] border-2 border-[#25262B] text-[#25262B] font-semibold hover:bg-[#25262B] hover:text-white transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Hero card preview */}
        <div className="relative z-10 mt-16 flex justify-center gap-4 flex-wrap">
          <div className="bg-white rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] p-5 text-left w-56">
            <div className="w-10 h-10 rounded-full bg-[#FFD034]/20 flex items-center justify-center mb-3">
              <Users size={18} className="text-[#25262B]" />
            </div>
            <p className="font-semibold text-[#25262B] text-sm">248 teams</p>
            <p className="text-[#8B8B8B] text-xs">actively competing</p>
          </div>
          <div className="bg-[#25262B] rounded-[28px] p-5 text-left w-56">
            <div className="w-10 h-10 rounded-full bg-[#FFD034]/20 flex items-center justify-center mb-3">
              <Sparkles size={18} className="text-[#FFD034]" />
            </div>
            <p className="font-semibold text-white text-sm">AI Workspace</p>
            <p className="text-white/60 text-xs">Tasks, slides & schedules</p>
          </div>
          <div className="bg-white rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] p-5 text-left w-56">
            <div className="w-10 h-10 rounded-full bg-[#FF6B6B]/20 flex items-center justify-center mb-3">
              <TrendingUp size={18} className="text-[#FF6B6B]" />
            </div>
            <p className="font-semibold text-[#25262B] text-sm">Auto Portfolio</p>
            <p className="text-[#8B8B8B] text-xs">Generated from your work</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-8 py-20">
        <h2 className="text-3xl font-bold text-[#25262B] text-center mb-4">How it works</h2>
        <p className="text-[#8B8B8B] text-center mb-14">Five steps from signup to portfolio</p>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-7 left-[10%] right-[10%] h-0.5 bg-[#D1C7BD]" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              {
                step: 1,
                icon: Users,
                title: "Register",
                desc: "Create your profile with skills and major",
              },
              {
                step: 2,
                icon: Users,
                title: "Find Team",
                desc: "Browse members and open teams in Feed",
              },
              {
                step: 3,
                icon: Briefcase,
                title: "AI Workspace",
                desc: "Split tasks, make slides, plan timeline",
              },
              {
                step: 4,
                icon: LayoutGrid,
                title: "Dashboard",
                desc: "Track progress and activity in real-time",
              },
              {
                step: 5,
                icon: Archive,
                title: "Portfolio",
                desc: "AI generates your achievement portfolio",
              },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center relative">
                <div className="w-14 h-14 rounded-full bg-[#FFD034] flex items-center justify-center mb-4 z-10 relative">
                  <span className="font-bold text-[#25262B]">{step}</span>
                </div>
                <h3 className="font-semibold text-[#25262B] mb-1">{title}</h3>
                <p className="text-[#8B8B8B] text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-8 py-20">
        <h2 className="text-3xl font-bold text-[#25262B] text-center mb-4">Everything you need</h2>
        <p className="text-[#8B8B8B] text-center mb-14">Built for competition teams, from first meeting to final pitch</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: Users,
              color: "#FFD034",
              title: "Find Members",
              desc: "Discover teammates by skill, major, and availability. Filter by role and connect instantly.",
            },
            {
              icon: Sparkles,
              color: "#FF6B6B",
              title: "AI Workspace",
              desc: "Let AI split your project into tasks, generate slide decks, and build team schedules.",
            },
            {
              icon: TrendingUp,
              color: "#FFD034",
              title: "Track Progress",
              desc: "Kanban boards, member progress bars, and activity feeds keep everyone aligned.",
            },
            {
              icon: FolderOpen,
              color: "#FF6B6B",
              title: "Auto Portfolio",
              desc: "AI analyzes your contributions and generates a CV-ready portfolio entry automatically.",
            },
          ].map(({ icon: Icon, color, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-[28px] p-7 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-shadow"
            >
              <div
                className="w-12 h-12 rounded-[14px] flex items-center justify-center mb-5"
                style={{ backgroundColor: `${color}25` }}
              >
                <Icon size={22} style={{ color }} />
              </div>
              <h3 className="font-bold text-[#25262B] text-lg mb-2">{title}</h3>
              <p className="text-[#8B8B8B] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-4 md:mx-8 mb-12 rounded-[32px] bg-[#25262B] overflow-hidden relative">
        <div
          style={{
            position: "absolute",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "#FFD034",
            filter: "blur(80px)",
            opacity: 0.08,
            top: -80,
            right: -60,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "#FF6B6B",
            filter: "blur(60px)",
            opacity: 0.08,
            bottom: -60,
            left: -40,
          }}
        />
        <div className="relative z-10 py-16 px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to build something great?
          </h2>
          <p className="text-white/60 mb-8 text-lg">
            Join hundreds of students already competing smarter.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[99px] bg-[#FFD034] text-[#25262B] font-bold hover:bg-[#FFD034]/90 transition-colors"
          >
            Start for free
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-[#8B8B8B] text-sm py-8 px-8">
        <p>© 2026 HakaSynC — Find your team. Win together.</p>
      </footer>
    </main>
  );
}
