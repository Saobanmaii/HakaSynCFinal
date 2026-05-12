"use client";

import { useState } from "react";
import { Brain, BarChart2, FileText, Sparkles, Download, Globe, CheckCircle2 } from "lucide-react";
import { MOCK_PORTFOLIO, MOCK_TASKS, CURRENT_USER } from "@/lib/mockData";
import { toast } from "sonner";

type Tab = "contribution" | "summary" | "portfolio";

const TABS: { id: Tab; label: string; icon: typeof Brain }[] = [
  { id: "contribution", label: "Contribution",     icon: Brain     },
  { id: "summary",      label: "Project Summary",  icon: BarChart2 },
  { id: "portfolio",    label: "Portfolio Preview", icon: FileText  },
];

const MOCK_CONTRIBUTION = {
  score: 78,
  tasksCompleted: 2,
  tasksTotal: 4,
  activityCount: 2,
  skills: ["React", "TypeScript", "Next.js", "Authentication", "Responsive UI"],
  summary:
    "Alex led the full-stack development track, completing the authentication flow and responsive UI implementation. Demonstrated strong TypeScript and React expertise throughout the sprint. Activity logs show consistent engagement with 2 key contributions to team milestones.",
};

const taskDone       = MOCK_TASKS.filter((t) => t.status === "Done").length;
const taskInProgress = MOCK_TASKS.filter((t) => t.status === "In Progress").length;
const taskTodo       = MOCK_TASKS.filter((t) => t.status === "Todo").length;
const taskTotal      = MOCK_TASKS.length;

export default function ArchivePage() {
  const [tab, setTab] = useState<Tab>("contribution");
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  async function handleAnalyze() {
    setAnalyzing(true);
    await new Promise((r) => setTimeout(r, 1500));
    setAnalyzed(true);
    setAnalyzing(false);
    toast.success("Contribution analyzed!", {
      description: "AI has processed your activity log and task history.",
    });
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#25262B]">AI Archiving</h1>
        <p className="text-[#8B8B8B] text-sm mt-1">
          Analyze contributions, summarize your project, and build your portfolio
        </p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 bg-white rounded-[99px] p-1.5 w-fit shadow-[0_4px_20px_rgba(0,0,0,0.05)] mb-8">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-[99px] text-sm font-medium transition-all ${
              tab === id
                ? "bg-[#25262B] text-white shadow-sm"
                : "text-[#8B8B8B] hover:text-[#25262B] hover:bg-[#F4F0EB]"
            }`}
          >
            <Icon size={15} />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* ── Contribution ── */}
      {tab === "contribution" && (
        <>
          {analyzing && (
            <div className="flex flex-col items-center justify-center py-28 gap-5">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-[#FFD034]/20" />
                <div className="absolute inset-0 rounded-full border-4 border-[#FFD034] border-t-transparent animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Brain size={20} className="text-[#FFD034]" />
                </div>
              </div>
              <div className="text-center">
                <p className="font-bold text-[#25262B] text-lg">AI is analyzing your contributions…</p>
                <p className="text-[#8B8B8B] text-sm mt-1">Reading activity log and task history</p>
              </div>
            </div>
          )}

          {!analyzing && !analyzed && (
            <div className="max-w-2xl flex flex-col gap-4">
              <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <div className="w-12 h-12 rounded-[14px] bg-[#25262B] flex items-center justify-center mb-4">
                  <Brain size={22} className="text-[#FFD034]" />
                </div>
                <h3 className="font-bold text-[#25262B] text-lg mb-2">Contribution Analysis</h3>
                <p className="text-[#8B8B8B] text-sm leading-relaxed mb-5">
                  AI reads your activity log and task history to identify your personal contribution,
                  extract skills actually used, and generate a score for your portfolio.
                </p>
                <div className="bg-[#F4F0EB] rounded-[18px] p-4 mb-5">
                  <p className="text-xs font-semibold text-[#25262B] uppercase tracking-wide mb-3">
                    What AI will extract
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Contribution score",  sub: "based on task weight & activity" },
                      { label: "Skills detected",      sub: "from tasks and role context" },
                      { label: "Tasks breakdown",      sub: "done vs assigned vs in progress" },
                      { label: "AI written summary",   sub: "paragraph for your portfolio" },
                    ].map(({ label, sub }) => (
                      <div key={label} className="bg-white rounded-[12px] p-3">
                        <p className="text-sm font-semibold text-[#25262B]">{label}</p>
                        <p className="text-xs text-[#8B8B8B] mt-0.5">{sub}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-[#8B8B8B] mb-4">
                  Analyzing as{" "}
                  <span className="font-semibold text-[#25262B]">{CURRENT_USER.name}</span> ·{" "}
                  {CURRENT_USER.role}
                </p>
                <button
                  onClick={handleAnalyze}
                  className="h-11 px-6 rounded-[99px] bg-[#FFD034] text-[#25262B] font-semibold text-sm flex items-center gap-2 hover:bg-[#FFD034]/90 transition-colors"
                >
                  <Sparkles size={15} />
                  Analyze Now
                </button>
              </div>
            </div>
          )}

          {!analyzing && analyzed && (
            <div className="max-w-2xl flex flex-col gap-5">
              {/* Score + metrics */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] text-center">
                  <p className="text-3xl font-bold text-[#25262B]">{MOCK_CONTRIBUTION.score}%</p>
                  <p className="text-xs text-[#8B8B8B] mt-1">Contribution Score</p>
                  <div className="mt-2 h-1.5 bg-[#F4F0EB] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FFD034] rounded-full"
                      style={{ width: `${MOCK_CONTRIBUTION.score}%` }}
                    />
                  </div>
                </div>
                <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] text-center">
                  <p className="text-3xl font-bold text-[#25262B]">
                    {MOCK_CONTRIBUTION.tasksCompleted}
                    <span className="text-base font-medium text-[#8B8B8B]">
                      /{MOCK_CONTRIBUTION.tasksTotal}
                    </span>
                  </p>
                  <p className="text-xs text-[#8B8B8B] mt-1">Tasks Completed</p>
                </div>
                <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] text-center">
                  <p className="text-3xl font-bold text-[#25262B]">
                    {MOCK_CONTRIBUTION.activityCount}
                  </p>
                  <p className="text-xs text-[#8B8B8B] mt-1">Activities Logged</p>
                </div>
              </div>

              {/* Skills */}
              <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <p className="text-sm font-semibold text-[#25262B] mb-3">Skills Extracted by AI</p>
                <div className="flex flex-wrap gap-2">
                  {MOCK_CONTRIBUTION.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-[99px] bg-[#FFD034]/20 text-[#7A6000] text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Summary */}
              <div className="bg-[#25262B] rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={14} className="text-[#FFD034]" />
                  <p className="text-xs font-semibold text-[#FFD034] uppercase tracking-wide">
                    AI Summary
                  </p>
                </div>
                <p className="text-[#E0D9D2] text-sm leading-relaxed">
                  {MOCK_CONTRIBUTION.summary}
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {/* ── Project Summary ── */}
      {tab === "summary" && (
        <div className="max-w-3xl flex flex-col gap-5">
          {/* Project info */}
          <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <h3 className="font-bold text-[#25262B] text-lg leading-tight">
                  {MOCK_PORTFOLIO.projectTitle}
                </h3>
                <p className="text-[#8B8B8B] text-sm mt-1">{MOCK_PORTFOLIO.duration}</p>
              </div>
              <span className="shrink-0 px-3 py-1 rounded-[99px] bg-emerald-100 text-emerald-700 text-xs font-semibold">
                Completed
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Team Size",   value: `${MOCK_PORTFOLIO.teamSize} members` },
                { label: "Role",        value: "Full-stack Dev" },
                { label: "Competition", value: "Vietnam AI Challenge" },
                { label: "Outcome",     value: "Top 10 finalist" },
              ].map(({ label, value }) => (
                <div key={label} className="bg-[#F4F0EB] rounded-[16px] p-3">
                  <p className="text-xs text-[#8B8B8B]">{label}</p>
                  <p className="text-sm font-semibold text-[#25262B] mt-0.5">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Task breakdown */}
          <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <p className="font-semibold text-[#25262B] mb-4">Task Breakdown</p>
            <div className="flex gap-6 mb-4">
              {[
                { label: "Total",       count: taskTotal,      color: "text-[#25262B]"  },
                { label: "Done",        count: taskDone,       color: "text-emerald-600" },
                { label: "In Progress", count: taskInProgress, color: "text-[#7A6000]"  },
                { label: "Todo",        count: taskTodo,       color: "text-[#8B8B8B]"  },
              ].map(({ label, count, color }) => (
                <div key={label} className="text-center">
                  <p className={`text-2xl font-bold ${color}`}>{count}</p>
                  <p className="text-xs text-[#8B8B8B] mt-0.5">{label}</p>
                </div>
              ))}
            </div>
            <div className="h-2.5 bg-[#F4F0EB] rounded-full overflow-hidden flex">
              <div
                className="h-full bg-emerald-500"
                style={{ width: `${(taskDone / taskTotal) * 100}%` }}
              />
              <div
                className="h-full bg-[#FFD034]"
                style={{ width: `${(taskInProgress / taskTotal) * 100}%` }}
              />
            </div>
            <div className="flex gap-4 mt-2">
              {[
                { label: "Done",        color: "bg-emerald-500" },
                { label: "In Progress", color: "bg-[#FFD034]"  },
                { label: "Todo",        color: "bg-[#F4F0EB]"  },
              ].map(({ label, color }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${color} border border-[#E0D9D2]`} />
                  <span className="text-xs text-[#8B8B8B]">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech stack */}
          <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <p className="font-semibold text-[#25262B] mb-3">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {MOCK_PORTFOLIO.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-[10px] bg-[#25262B] text-white text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Portfolio Preview ── */}
      {tab === "portfolio" && (
        <div className="max-w-2xl">
          {/* Action buttons */}
          <div className="flex gap-3 mb-5">
            <button
              onClick={() =>
                toast.info("PDF export coming in Phase 2", {
                  description: "Full headless PDF generation coming soon.",
                })
              }
              className="h-9 px-4 rounded-[99px] bg-[#25262B] text-white text-sm font-medium flex items-center gap-2 hover:bg-[#25262B]/85 transition-colors"
            >
              <Download size={14} />
              Export PDF
            </button>
            <button
              onClick={() => {
                toast.success("Link copied!", {
                  description: "portfolio.hakasyncc.app/alex-nguyen",
                });
              }}
              className="h-9 px-4 rounded-[99px] border border-[#E0D9D2] text-[#25262B] text-sm font-medium flex items-center gap-2 hover:border-[#25262B] transition-colors"
            >
              <Globe size={14} />
              Copy Public Link
            </button>
          </div>

          {/* CV card */}
          <div className="bg-white rounded-[28px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
            {/* Header */}
            <div className="bg-[#25262B] px-7 py-6">
              <h2 className="text-white font-bold text-xl leading-tight">
                {MOCK_PORTFOLIO.projectTitle}
              </h2>
              <p className="text-[#FFD034] font-medium mt-1">{MOCK_PORTFOLIO.role}</p>
              <p className="text-[#8B8B8B] text-sm mt-1">
                {MOCK_PORTFOLIO.duration} · Team of {MOCK_PORTFOLIO.teamSize}
              </p>
            </div>

            <div className="px-7 py-6 flex flex-col gap-6">
              {/* Description */}
              <div>
                <p className="text-xs font-semibold text-[#8B8B8B] uppercase tracking-wide mb-2">
                  About
                </p>
                <p className="text-sm text-[#25262B] leading-relaxed">
                  {MOCK_PORTFOLIO.description}
                </p>
              </div>

              {/* Achievements */}
              <div>
                <p className="text-xs font-semibold text-[#8B8B8B] uppercase tracking-wide mb-3">
                  Key Achievements
                </p>
                <div className="flex flex-col gap-2">
                  {MOCK_PORTFOLIO.achievements.map((ach) => (
                    <div key={ach} className="flex items-start gap-2.5">
                      <CheckCircle2
                        size={15}
                        className="text-emerald-500 shrink-0 mt-0.5"
                      />
                      <p className="text-sm text-[#25262B] leading-snug">{ach}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech stack */}
              <div>
                <p className="text-xs font-semibold text-[#8B8B8B] uppercase tracking-wide mb-2">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {MOCK_PORTFOLIO.techStack.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-[8px] bg-[#F4F0EB] text-[#25262B] text-xs font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <p className="text-xs font-semibold text-[#8B8B8B] uppercase tracking-wide mb-2">
                  Skills Demonstrated
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {MOCK_PORTFOLIO.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-[8px] bg-[#FFD034]/20 text-[#7A6000] text-xs font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
