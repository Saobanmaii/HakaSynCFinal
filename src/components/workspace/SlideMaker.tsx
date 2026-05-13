"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Zap, RotateCcw, Download, Clock } from "lucide-react";
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

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCountdown(s: number) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function buildSlidesHTML(slides: SlideContent[]): string {
  const slideDivs = slides.map((slide, i) => {
    let bg = "#ffffff";
    let inner = "";

    switch (slide.type) {
      case "cover":
        bg = "#25262B";
        inner = `
          <div style="display:flex;flex-direction:column;justify-content:center;flex:1;padding:2rem 2.5rem;">
            <p style="color:#FFD034;font-size:.7rem;font-weight:600;letter-spacing:.18em;text-transform:uppercase;margin-bottom:1rem;">${slide.bullets[2] ?? ""}</p>
            <h1 style="color:white;font-size:2.4rem;font-weight:700;line-height:1.2;margin-bottom:.75rem;">${slide.title}</h1>
            ${slide.subtitle ? `<p style="color:rgba(255,255,255,.5);font-size:1rem;">${slide.subtitle}</p>` : ""}
          </div>
          <div style="padding:.75rem 2.5rem;border-top:1px solid rgba(255,255,255,.1);">
            <span style="color:rgba(255,255,255,.4);font-size:.75rem;">${slide.bullets[0] ?? ""} · ${slide.bullets[1] ?? ""}</span>
          </div>`;
        break;
      case "overview":
        inner = `
          <div style="padding:2rem 2.5rem;">
            <h2 style="color:#25262B;font-size:1.4rem;font-weight:700;border-left:4px solid #FFD034;padding-left:.75rem;margin-bottom:1.5rem;">${slide.title}</h2>
            ${slide.bullets.map((b, j) => `
              <div style="display:flex;align-items:flex-start;gap:.75rem;margin-bottom:1rem;">
                <span style="width:1.4rem;height:1.4rem;border-radius:50%;background:#FFD034;color:#7A6000;font-size:.72rem;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${j + 1}</span>
                <p style="color:#25262B;font-size:.88rem;line-height:1.6;">${b}</p>
              </div>`).join("")}
          </div>`;
        break;
      case "progress":
        bg = "#F4F0EB";
        inner = `
          <div style="padding:2rem 2.5rem;">
            <h2 style="color:#25262B;font-size:1.4rem;font-weight:700;border-left:4px solid #22c55e;padding-left:.75rem;margin-bottom:1.5rem;">${slide.title}</h2>
            ${slide.bullets.map((b) => {
              const isDone = b.startsWith("✅");
              const isProg = b.startsWith("🔄");
              const text = b.replace(/^[✅🔄📋]\s*/, "");
              const icon = isDone ? "✓" : isProg ? "→" : "·";
              const bg2 = isDone ? "#dcfce7" : isProg ? "rgba(255,208,52,.3)" : "#fff";
              const col = isDone ? "#16a34a" : isProg ? "#7A6000" : "#9ca3af";
              return `
                <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.75rem;">
                  <span style="width:1.4rem;height:1.4rem;border-radius:50%;background:${bg2};color:${col};font-size:.72rem;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${icon}</span>
                  <p style="color:#25262B;font-size:.88rem;">${text}</p>
                </div>`;
            }).join("")}
          </div>`;
        break;
      case "team":
        bg = "#25262B";
        inner = `
          <div style="padding:2rem 2.5rem;">
            <h2 style="color:white;font-size:1.4rem;font-weight:700;border-left:4px solid #FFD034;padding-left:.75rem;margin-bottom:1.5rem;">${slide.title}</h2>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;">
              ${slide.bullets.map((m) => {
                const [name, ...rest] = m.split(" — ");
                return `
                  <div style="background:rgba(255,255,255,.05);border-radius:1rem;padding:.75rem 1rem;">
                    <p style="color:white;font-weight:600;font-size:.88rem;">${name}</p>
                    <p style="color:rgba(255,255,255,.5);font-size:.78rem;">${rest.join(" — ")}</p>
                  </div>`;
              }).join("")}
            </div>
          </div>`;
        break;
      case "conclusion":
        inner = `
          <div style="padding:2rem 2.5rem;position:relative;">
            <div style="position:absolute;top:0;right:0;width:7rem;height:7rem;background:#FFD034;border-radius:0 0 0 2.5rem;"></div>
            <div style="position:relative;">
              <h2 style="color:#25262B;font-size:2rem;font-weight:700;margin-bottom:.5rem;">${slide.title}</h2>
              ${slide.subtitle ? `<p style="color:#8B8B8B;font-size:.88rem;margin-bottom:1.25rem;">${slide.subtitle}</p>` : ""}
              ${slide.bullets.map((b) => `
                <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.5rem;">
                  <div style="width:.4rem;height:.4rem;border-radius:50%;background:#FFD034;flex-shrink:0;"></div>
                  <p style="color:#25262B;font-size:.88rem;">${b}</p>
                </div>`).join("")}
            </div>
          </div>`;
        break;
    }

    return `<div class="slide${i === 0 ? " active" : ""}" style="background:${bg};">${inner}</div>`;
  }).join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>Presentation Deck</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#111;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;gap:1rem;padding:1rem}
    .deck{width:min(780px,95vw)}
    .slide{display:none;border-radius:1.5rem;overflow:hidden;aspect-ratio:16/9;flex-direction:column}
    .slide.active{display:flex}
    nav{display:flex;align-items:center;gap:.75rem;justify-content:center}
    nav button{background:rgba(255,255,255,.1);border:none;color:white;width:2.2rem;height:2.2rem;border-radius:50%;cursor:pointer;font-size:.9rem;transition:background .15s}
    nav button:hover{background:rgba(255,255,255,.2)}
    nav button:disabled{opacity:.3;cursor:not-allowed}
    #counter{color:rgba(255,255,255,.5);font-size:.82rem;min-width:3.5rem;text-align:center}
    .dots{display:flex;gap:.4rem;align-items:center}
    .dot{width:.5rem;height:.5rem;border-radius:99px;background:rgba(255,255,255,.2);cursor:pointer;transition:all .2s;border:none}
    .dot.active{width:1.4rem;background:#FFD034}
  </style>
</head>
<body>
  <div class="deck">
${slideDivs}
  </div>
  <nav>
    <button id="prev" onclick="go(-1)">&#8592;</button>
    <span id="counter">1 / ${slides.length}</span>
    <div class="dots">${slides.map((_, i) => `<button class="dot${i === 0 ? " active" : ""}" onclick="goTo(${i})"></button>`).join("")}</div>
    <button id="next" onclick="go(1)">&#8594;</button>
  </nav>
  <script>
    let cur=0;
    const slides=document.querySelectorAll('.slide');
    const dots=document.querySelectorAll('.dot');
    function show(i){slides[cur].classList.remove('active');dots[cur].classList.remove('active');cur=i;slides[cur].classList.add('active');dots[cur].classList.add('active');document.getElementById('counter').textContent=(cur+1)+' / '+slides.length;document.getElementById('prev').disabled=cur===0;document.getElementById('next').disabled=cur===slides.length-1;}
    function go(d){if(cur+d>=0&&cur+d<slides.length)show(cur+d);}
    function goTo(i){show(i);}
    document.addEventListener('keydown',(e)=>{if(e.key==='ArrowLeft')go(-1);if(e.key==='ArrowRight')go(1);});
    document.getElementById('prev').disabled=true;
  </script>
</body>
</html>`;
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function SlideMaker() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [current, setCurrent] = useState(0);

  const [triggerEnabled, setTriggerEnabled] = useState(false);
  const [triggerDate, setTriggerDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [triggerTime, setTriggerTime] = useState("13:00");
  const [countdown, setCountdown] = useState<number | null>(null);

  async function doGenerate() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setGenerated(true);
    setCurrent(0);
    setLoading(false);
    toast.success("5 slides generated!", {
      description: "AI read your content and built the deck.",
    });
  }

  async function handleGenerate() {
    if (!content.trim()) {
      toast.error("Please paste your presentation content first.");
      return;
    }
    await doGenerate();
  }

  function handleReset() {
    setGenerated(false);
    setCurrent(0);
    setTriggerEnabled(false);
    setCountdown(null);
  }

  function handleDownload() {
    const html = buildSlidesHTML(MOCK_SLIDES);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `slides-${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded!", { description: "Open the .html file to edit and present." });
  }

  // Countdown timer
  useEffect(() => {
    if (!triggerEnabled || !triggerDate || !triggerTime) return;
    const target = new Date(`${triggerDate}T${triggerTime}:00`).getTime();
    const interval = setInterval(() => {
      const diff = Math.floor((target - Date.now()) / 1000);
      if (diff <= 0) {
        clearInterval(interval);
        setTriggerEnabled(false);
        setCountdown(null);
        doGenerate();
      } else {
        setCountdown(diff);
      }
    }, 1000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerEnabled, triggerDate, triggerTime]);

  // Keyboard navigation
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
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="h-9 px-4 rounded-[99px] bg-[#FFD034] text-[#25262B] text-sm font-semibold flex items-center gap-2 hover:bg-[#FFD034]/90 transition-colors"
            >
              <Download size={14} />
              Download
            </button>
            <button
              onClick={handleReset}
              className="h-9 px-4 rounded-[99px] border border-[#E0D9D2] text-[#8B8B8B] text-sm font-medium flex items-center gap-2 hover:text-[#25262B] hover:border-[#25262B] transition-colors"
            >
              <RotateCcw size={14} />
              Reset
            </button>
          </div>
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
      {/* Auto Trigger */}
      <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-[#FFD034]" />
            <p className="font-semibold text-[#25262B]">Auto-generate Trigger</p>
          </div>
          {triggerEnabled && (
            <button
              onClick={() => { setTriggerEnabled(false); setCountdown(null); }}
              className="h-8 px-3 rounded-[99px] bg-red-50 text-red-500 text-xs font-semibold hover:bg-red-100 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>

        {triggerEnabled && countdown !== null ? (
          <div className="flex flex-col items-center gap-2 py-3">
            <p className="text-[#8B8B8B] text-sm">Slides will auto-generate in</p>
            <p className={`font-mono text-3xl font-bold tracking-widest ${countdown < 600 ? "text-red-400" : "text-[#FFD034]"}`}>
              {formatCountdown(countdown)}
            </p>
            <p className="text-[#8B8B8B] text-xs">
              Triggered at {triggerTime} on {triggerDate}
            </p>
          </div>
        ) : (
          <div className="flex items-end gap-3 flex-wrap">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#8B8B8B]">Date</label>
              <input
                type="date"
                value={triggerDate}
                onChange={(e) => setTriggerDate(e.target.value)}
                className="border border-[#E0D9D2] rounded-[12px] px-3 py-2 text-sm text-[#25262B] focus:outline-none focus:ring-2 focus:ring-[#FFD034] transition"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#8B8B8B]">Time</label>
              <input
                type="time"
                value={triggerTime}
                onChange={(e) => setTriggerTime(e.target.value)}
                className="border border-[#E0D9D2] rounded-[12px] px-3 py-2 text-sm text-[#25262B] focus:outline-none focus:ring-2 focus:ring-[#FFD034] transition"
              />
            </div>
            <button
              onClick={() => setTriggerEnabled(true)}
              className="h-10 px-4 rounded-[99px] bg-[#25262B] text-white text-sm font-semibold flex items-center gap-2 hover:bg-[#25262B]/90 transition-colors"
            >
              <Clock size={14} />
              Enable Trigger
            </button>
          </div>
        )}
      </div>

      {/* Content */}
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
