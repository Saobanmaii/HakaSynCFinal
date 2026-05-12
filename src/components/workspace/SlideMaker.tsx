"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Zap, RotateCcw } from "lucide-react";
import { MOCK_SLIDES, CURRENT_USER, MOCK_MEMBERS } from "@/lib/mockData";
import type { SlideContent } from "@/lib/types";
import { toast } from "sonner";

const TEAM_FOR_SLIDES = [CURRENT_USER, MOCK_MEMBERS[0], MOCK_MEMBERS[2], MOCK_MEMBERS[3]];

// ─── Slide type renderers ─────────────────────────────────────────────────────

function CoverSlide({ slide }: { slide: SlideContent }) {
  return (
    <div className="w-full aspect-video bg-[#25262B] rounded-[24px] p-8 flex flex-col overflow-hidden relative">
      <div
        className="absolute rounded-full bg-[#FFD034]"
        style={{ width: 280, height: 280, filter: "blur(110px)", opacity: 0.09, top: -80, right: -60 }}
      />
      <div
        className="absolute rounded-full bg-[#FF6B6B]"
        style={{ width: 200, height: 200, filter: "blur(80px)", opacity: 0.07, bottom: -40, left: -20 }}
      />
      <div className="relative z-10 flex-1 flex flex-col justify-center">
        <p className="text-[#FFD034] text-xs font-semibold uppercase tracking-[0.18em] mb-4">
          {slide.bullets[2]}
        </p>
        <h1 className="text-white text-3xl sm:text-4xl font-bold leading-tight mb-3">{slide.title}</h1>
        <p className="text-white/50 text-base">{slide.subtitle}</p>
      </div>
      <div className="relative z-10 flex items-center gap-2 pt-4 border-t border-white/10">
        <div className="w-7 h-7 rounded-full bg-[#FFD034] flex items-center justify-center shrink-0">
          <span className="text-[#25262B] font-bold text-xs">H</span>
        </div>
        <span className="text-white/40 text-xs">{slide.bullets[0]} · {slide.bullets[1]}</span>
      </div>
    </div>
  );
}

function OverviewSlide({ slide }: { slide: SlideContent }) {
  return (
    <div className="w-full aspect-video bg-white rounded-[24px] p-8 flex flex-col overflow-hidden">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-6 rounded-full bg-[#FFD034]" />
        <h2 className="text-xl font-bold text-[#25262B]">{slide.title}</h2>
      </div>
      <div className="flex flex-col gap-4 flex-1">
        {slide.bullets.map((bullet, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-[#FFD034]/20 text-[#7A6000] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              {i + 1}
            </span>
            <p className="text-[#25262B] text-sm leading-relaxed">{bullet}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressSlide({ slide }: { slide: SlideContent }) {
  function statusOf(b: string) {
    if (b.startsWith("✅")) return "done";
    if (b.startsWith("🔄")) return "progress";
    return "todo";
  }
  return (
    <div className="w-full aspect-video bg-[#F4F0EB] rounded-[24px] p-8 flex flex-col overflow-hidden">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-6 rounded-full bg-emerald-500" />
        <h2 className="text-xl font-bold text-[#25262B]">{slide.title}</h2>
      </div>
      <div className="flex flex-col gap-3 flex-1">
        {slide.bullets.map((bullet, i) => {
          const s = statusOf(bullet);
          const text = bullet.replace(/^[✅🔄📋]\s*/, "");
          return (
            <div key={i} className="flex items-center gap-3">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${
                  s === "done"
                    ? "bg-emerald-100 text-emerald-600"
                    : s === "progress"
                    ? "bg-[#FFD034]/30 text-[#7A6000]"
                    : "bg-white text-gray-400 border border-gray-200"
                }`}
              >
                {s === "done" ? "✓" : s === "progress" ? "→" : "·"}
              </span>
              <p
                className={`text-sm ${
                  s === "done"
                    ? "text-[#25262B]"
                    : s === "progress"
                    ? "text-[#25262B] font-medium"
                    : "text-[#8B8B8B]"
                }`}
              >
                {text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TeamSlide({ slide }: { slide: SlideContent }) {
  return (
    <div className="w-full aspect-video bg-[#25262B] rounded-[24px] p-8 flex flex-col overflow-hidden relative">
      <div
        className="absolute rounded-full bg-[#FFD034]"
        style={{ width: 240, height: 240, filter: "blur(100px)", opacity: 0.07, bottom: -60, right: -40 }}
      />
      <div className="flex items-center gap-2 mb-6 relative z-10">
        <div className="w-1 h-6 rounded-full bg-[#FFD034]" />
        <h2 className="text-xl font-bold text-white">{slide.title}</h2>
      </div>
      <div className="grid grid-cols-2 gap-3 flex-1 relative z-10">
        {slide.bullets.map((member, i) => {
          const [name, ...rest] = member.split(" — ");
          const user = TEAM_FOR_SLIDES[i];
          return (
            <div key={i} className="flex items-center gap-3 bg-white/5 rounded-[16px] px-4 py-3">
              {user && (
                <img
                  src={user.avatar}
                  alt={name}
                  className="w-9 h-9 rounded-full bg-white/10 shrink-0"
                />
              )}
              <div className="min-w-0">
                <p className="text-white text-sm font-semibold truncate">{name}</p>
                <p className="text-white/50 text-xs truncate">{rest.join(" — ")}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ConclusionSlide({ slide }: { slide: SlideContent }) {
  return (
    <div className="w-full aspect-video bg-white rounded-[24px] p-8 flex flex-col overflow-hidden relative">
      <div className="absolute top-0 right-0 w-40 h-40 bg-[#FFD034] rounded-bl-[60px]" />
      <div className="relative z-10 flex-1 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-[#25262B] mb-2">{slide.title}</h2>
        {slide.subtitle && (
          <p className="text-[#8B8B8B] text-sm mb-6">{slide.subtitle}</p>
        )}
        <div className="flex flex-col gap-2">
          {slide.bullets.map((bullet, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FFD034] shrink-0" />
              <p className="text-[#25262B] text-sm">{bullet}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function renderSlide(slide: SlideContent) {
  switch (slide.type) {
    case "cover":      return <CoverSlide slide={slide} />;
    case "overview":   return <OverviewSlide slide={slide} />;
    case "progress":   return <ProgressSlide slide={slide} />;
    case "team":       return <TeamSlide slide={slide} />;
    case "conclusion": return <ConclusionSlide slide={slide} />;
  }
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function SlideMaker() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [current, setCurrent] = useState(0);

  async function handleGenerate() {
    if (!content.trim()) {
      toast.error("Please paste your presentation content first.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setGenerated(true);
    setCurrent(0);
    setLoading(false);
    toast.success("5 slides generated!", {
      description: "AI read your content and built the deck.",
    });
  }

  function handleReset() {
    setGenerated(false);
    setCurrent(0);
  }

  useEffect(() => {
    if (!generated) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  setCurrent((c) => Math.max(0, c - 1));
      if (e.key === "ArrowRight") setCurrent((c) => Math.min(MOCK_SLIDES.length - 1, c + 1));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [generated]);

  // Loading
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-28 gap-5">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-[#FFD034]/20" />
          <div className="absolute inset-0 rounded-full border-4 border-[#FFD034] border-t-transparent animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Zap size={20} className="text-[#FFD034]" />
          </div>
        </div>
        <div className="text-center">
          <p className="font-bold text-[#25262B] text-lg">Generating slides…</p>
          <p className="text-[#8B8B8B] text-sm mt-1">Reading completed tasks and building your deck</p>
        </div>
      </div>
    );
  }

  // Slides preview
  if (generated) {
    const slide = MOCK_SLIDES[current];
    return (
      <div className="flex flex-col gap-5 max-w-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-[#25262B]">Presentation Deck</p>
            <p className="text-[#8B8B8B] text-sm">Slide {current + 1} of {MOCK_SLIDES.length}</p>
          </div>
          <button
            onClick={handleReset}
            className="h-9 px-4 rounded-[99px] border border-[#E0D9D2] text-[#8B8B8B] text-sm font-medium flex items-center gap-2 hover:text-[#25262B] hover:border-[#25262B] transition-colors"
          >
            <RotateCcw size={14} />
            Reset
          </button>
        </div>

        {renderSlide(slide)}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className="w-10 h-10 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] flex items-center justify-center text-[#25262B] hover:bg-[#F4F0EB] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            {MOCK_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-200 ${
                  i === current
                    ? "w-6 h-2.5 bg-[#25262B]"
                    : "w-2.5 h-2.5 bg-[#E0D9D2] hover:bg-[#8B8B8B]"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrent((c) => Math.min(MOCK_SLIDES.length - 1, c + 1))}
            disabled={current === MOCK_SLIDES.length - 1}
            className="w-10 h-10 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] flex items-center justify-center text-[#25262B] hover:bg-[#F4F0EB] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <p className="hidden sm:block text-center text-xs text-[#8B8B8B] capitalize">
          {slide.type} slide · ← → keys to navigate
        </p>
      </div>
    );
  }

  // Setup
  return (
    <div className="max-w-2xl flex flex-col gap-6">
      <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
        <p className="font-semibold text-[#25262B] mb-4">Presentation content</p>

        <div className="flex flex-col gap-1.5">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            placeholder="Paste your presentation content here…"
            className="w-full border border-[#E0D9D2] rounded-[12px] px-3 py-2 text-sm text-[#25262B] resize-none focus:outline-none focus:ring-2 focus:ring-[#FFD034] transition"
          />
          <p className="text-xs text-[#8B8B8B]">Paste content from Pres Coach or write your own</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={handleGenerate}
          className="self-start h-11 px-6 rounded-[99px] bg-[#FFD034] text-[#25262B] font-semibold text-sm flex items-center gap-2 hover:bg-[#FFD034]/90 transition-colors"
        >
          <Zap size={15} />
          Generate Slides
        </button>
        <p className="text-[#8B8B8B] text-xs">
          AI will build your slide deck from the content above.
        </p>
      </div>
    </div>
  );
}
