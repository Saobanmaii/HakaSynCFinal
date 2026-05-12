"use client";

import { useState, useRef } from "react";
import { Mic2, Zap, Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface Section {
  index: number;
  title: string;
  minutes: number;
  bullets: string[];
}

function buildScript(duration: number, topic: string, presenters: number): Section[] {
  const t = Math.max(3, duration);
  const opening = Math.max(1, Math.round(t * 0.13));
  const problem = Math.max(1, Math.round(t * 0.20));
  const solution = Math.max(1, Math.round(t * 0.27));
  const tech = Math.max(1, Math.round(t * 0.20));
  const conclusion = t - opening - problem - solution - tech;

  const projectName = topic.trim() || "Your Project";

  return [
    {
      index: 1,
      title: "Opening",
      minutes: opening,
      bullets: [
        `Introduce ${presenters > 1 ? "your team" : "yourself"} and the project: "${projectName}"`,
        "Hook: what problem are you solving and why does it matter?",
        "Briefly outline the structure of the presentation",
      ],
    },
    {
      index: 2,
      title: "Problem & Context",
      minutes: problem,
      bullets: [
        "Describe the specific pain point with concrete examples or data",
        "Who is affected? What is the scale of the problem?",
        "Why haven't existing solutions addressed this adequately?",
      ],
    },
    {
      index: 3,
      title: "Solution",
      minutes: solution,
      bullets: [
        `Present your solution for "${projectName}" — live demo if available`,
        "Key differentiators vs. existing alternatives",
        "Walk through the core user flow or main feature",
      ],
    },
    {
      index: 4,
      title: "Tech & Implementation",
      minutes: tech,
      bullets: [
        "High-level architecture — keep it visual and brief",
        "Real results: prototype metrics, beta users, or test data",
        "Technical challenges overcome during development",
      ],
    },
    {
      index: 5,
      title: "Conclusion & Q&A",
      minutes: conclusion,
      bullets: [
        "Recap the 3 key takeaways from this presentation",
        "Short roadmap: what comes next?",
        "Open the floor for questions",
      ],
    },
  ];
}

function scriptToText(sections: Section[], duration: number, presenters: number): string {
  const lines = [
    `Total: ${duration} min — ${presenters} presenter${presenters > 1 ? "s" : ""}\n`,
  ];
  const nums = ["①", "②", "③", "④", "⑤"];
  sections.forEach((s, i) => {
    lines.push(`${nums[i]} ${s.title} (${s.minutes} min)`);
    s.bullets.forEach((b) => lines.push(`   - ${b}`));
    lines.push("");
  });
  return lines.join("\n").trim();
}

export default function PresCoach() {
  const [duration, setDuration] = useState(15);
  const [topic, setTopic] = useState("");
  const [presenters, setPresenters] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState<Section[] | null>(null);
  const [copied, setCopied] = useState(false);
  const topicRef = useRef<HTMLTextAreaElement>(null);

  async function handleGenerate() {
    setLoading(true);
    setSections(null);
    await new Promise((r) => setTimeout(r, 1500));
    setSections(buildScript(duration, topic, presenters));
    setLoading(false);
  }

  async function handleUseInSlideMaker() {
    if (!sections) return;
    const text = scriptToText(sections, duration, presenters);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Content copied — paste it in Slide Maker!");
    } catch {
      toast.error("Could not copy to clipboard.");
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-28 gap-5">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-[#FFD034]/20" />
          <div className="absolute inset-0 rounded-full border-4 border-[#FFD034] border-t-transparent animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Mic2 size={20} className="text-[#FFD034]" />
          </div>
        </div>
        <div className="text-center">
          <p className="font-bold text-[#25262B] text-lg">Building your script…</p>
          <p className="text-[#8B8B8B] text-sm mt-1">Structuring sections to fit {duration} minutes</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl flex flex-col gap-6">
      {/* Input card */}
      <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
        <p className="font-semibold text-[#25262B] mb-4">Presentation details</p>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-xs font-medium text-[#8B8B8B]">Duration (minutes)</label>
            <input
              type="number"
              min={3}
              max={120}
              value={duration}
              onChange={(e) => setDuration(Math.max(3, Number(e.target.value)))}
              className="h-10 px-4 rounded-[12px] bg-[#F4F0EB] border border-[#E0D9D2] text-sm text-[#25262B] outline-none focus:ring-2 focus:ring-[#FFD034] transition"
            />
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-xs font-medium text-[#8B8B8B]">Number of presenters</label>
            <input
              type="number"
              min={1}
              max={10}
              value={presenters}
              onChange={(e) => setPresenters(Math.max(1, Number(e.target.value)))}
              className="h-10 px-4 rounded-[12px] bg-[#F4F0EB] border border-[#E0D9D2] text-sm text-[#25262B] outline-none focus:ring-2 focus:ring-[#FFD034] transition"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#8B8B8B]">Project / topic description</label>
          <textarea
            ref={topicRef}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            rows={4}
            placeholder="Briefly describe your project or presentation topic…"
            className="w-full border border-[#E0D9D2] rounded-[12px] px-3 py-2 text-sm text-[#25262B] resize-none focus:outline-none focus:ring-2 focus:ring-[#FFD034] bg-[#F4F0EB] transition"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={handleGenerate}
          className="self-start h-11 px-6 rounded-[99px] bg-[#FFD034] text-[#25262B] font-semibold text-sm flex items-center gap-2 hover:bg-[#FFD034]/90 transition-colors"
        >
          <Zap size={15} />
          Generate Script
        </button>
        <p className="text-[#8B8B8B] text-xs">AI will structure your presentation into timed sections.</p>
      </div>

      {/* Output */}
      {sections && (
        <div className="bg-[#25262B] rounded-[28px] p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-bold">Presentation Script</p>
              <p className="text-white/40 text-xs mt-0.5">
                {duration} min · {presenters} presenter{presenters > 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={handleUseInSlideMaker}
              className="h-9 px-4 rounded-[99px] bg-white text-[#25262B] text-sm font-semibold flex items-center gap-2 hover:bg-white/90 transition-colors"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied!" : "Use in Slide Maker"}
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {sections.map((section) => (
              <div key={section.index} className="bg-white/5 rounded-[16px] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[#FFD034] font-bold text-lg leading-none">
                    {["①", "②", "③", "④", "⑤"][section.index - 1]}
                  </span>
                  <p className="text-white font-semibold text-sm">{section.title}</p>
                  <span className="ml-auto text-[#FFD034] text-xs font-medium bg-[#FFD034]/10 px-2 py-0.5 rounded-[99px]">
                    {section.minutes} min
                  </span>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {section.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-2 text-xs text-white/70">
                      <span className="text-[#FFD034] shrink-0 mt-0.5">▸</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
