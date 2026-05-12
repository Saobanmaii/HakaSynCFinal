"use client";

import { useMemo, useState } from "react";
import { CheckSquare, TrendingUp, Users, Trophy, Upload } from "lucide-react";
import {
  MOCK_TASKS,
  MOCK_ACTIVITY,
  MOCK_COMPETITIONS,
  CURRENT_USER,
  MOCK_MEMBERS,
} from "@/lib/mockData";
import { toast } from "sonner";

const TEAM = [CURRENT_USER, MOCK_MEMBERS[0], MOCK_MEMBERS[1], MOCK_MEMBERS[2]];

const MOCK_FILES = [
  { id: 1, name: "Project Brief.pdf",        size: "1.2 MB", type: "pdf",   uploadedBy: "Alex",     date: "May 11" },
  { id: 2, name: "Design System.fig",        size: "8.4 MB", type: "figma", uploadedBy: "Thu Ha",   date: "May 10" },
  { id: 3, name: "Tech Specification.docx",  size: "456 KB", type: "doc",   uploadedBy: "Minh Duc", date: "May 9"  },
  { id: 4, name: "Meeting Notes.md",         size: "12 KB",  type: "md",    uploadedBy: "Alex",     date: "May 8"  },
];

const FILE_STYLE: Record<string, { bg: string; text: string; label: string }> = {
  pdf:   { bg: "bg-red-100",    text: "text-red-600",    label: "PDF" },
  figma: { bg: "bg-purple-100", text: "text-purple-600", label: "FIG" },
  doc:   { bg: "bg-blue-100",   text: "text-blue-600",   label: "DOC" },
  md:    { bg: "bg-gray-100",   text: "text-gray-600",   label: "MD"  },
};

const ACTION_DOT: Record<string, string> = {
  completed: "bg-emerald-500",
  moved:     "bg-[#FFD034]",
  added:     "bg-blue-400",
  started:   "bg-orange-400",
};

const SIMULATED_NOW = new Date("2026-05-12T16:00:00Z");

function timeAgo(iso: string) {
  const diff = SIMULATED_NOW.getTime() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const DEFAULT_NOTES =
  "Sprint goals:\n• Complete auth flow by Wed\n• AI pipeline demo ready by Fri\n• Design review scheduled Thu 2pm\n\nReminder: presentation on May 15 at 13:00!";

export default function DashboardPage() {
  const [notes, setNotes] = useState(DEFAULT_NOTES);

  const totalTasks    = MOCK_TASKS.length;
  const doneTasks     = MOCK_TASKS.filter((t) => t.status === "Done").length;
  const inProgress    = MOCK_TASKS.filter((t) => t.status === "In Progress").length;
  const progressPct   = Math.round((doneTasks / totalTasks) * 100);
  const registeredComps = MOCK_COMPETITIONS.filter((c) => c.registered).length;

  const memberProgress = useMemo(
    () =>
      TEAM.map((member) => {
        const assigned = MOCK_TASKS.filter((t) => t.assigneeId === member.id);
        const done = assigned.filter((t) => t.status === "Done").length;
        const pct = assigned.length > 0 ? Math.round((done / assigned.length) * 100) : 0;
        return { member, total: assigned.length, done, pct };
      }),
    []
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#25262B]">Dashboard</h1>
        <p className="text-[#8B8B8B] text-sm mt-1">Track your team's progress and activity</p>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
          <div className="w-10 h-10 rounded-[12px] bg-[#FFD034]/20 flex items-center justify-center mb-3">
            <CheckSquare size={18} className="text-[#7A6000]" />
          </div>
          <p className="text-2xl font-bold text-[#25262B]">{totalTasks}</p>
          <p className="text-xs text-[#8B8B8B] mt-0.5">Total Tasks</p>
          <p className="text-xs text-[#8B8B8B] mt-1">{inProgress} in progress</p>
        </div>

        <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
          <div className="w-10 h-10 rounded-[12px] bg-emerald-100 flex items-center justify-center mb-3">
            <TrendingUp size={18} className="text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-[#25262B]">{progressPct}%</p>
          <p className="text-xs text-[#8B8B8B] mt-0.5">Progress</p>
          <div className="mt-2 h-1.5 bg-[#F4F0EB] rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
          <div className="w-10 h-10 rounded-[12px] bg-blue-100 flex items-center justify-center mb-3">
            <Users size={18} className="text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-[#25262B]">{TEAM.length}</p>
          <p className="text-xs text-[#8B8B8B] mt-0.5">Team Members</p>
          <div className="flex -space-x-1.5 mt-2">
            {TEAM.map((m) => (
              <img
                key={m.id}
                src={m.avatar}
                alt={m.name}
                title={m.name}
                className="w-5 h-5 rounded-full border border-white bg-[#F4F0EB]"
              />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
          <div className="w-10 h-10 rounded-[12px] bg-[#FF6B6B]/10 flex items-center justify-center mb-3">
            <Trophy size={18} className="text-[#C93B3B]" />
          </div>
          <p className="text-2xl font-bold text-[#25262B]">{registeredComps}</p>
          <p className="text-xs text-[#8B8B8B] mt-0.5">Competitions</p>
          <p className="text-xs text-[#8B8B8B] mt-1">of {MOCK_COMPETITIONS.length} active</p>
        </div>
      </div>

      {/* ── Activity + Member Progress ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
          <h2 className="font-bold text-[#25262B] mb-5">Recent Activity</h2>
          <div className="flex flex-col gap-4">
            {MOCK_ACTIVITY.map((log) => (
              <div key={log.id} className="flex items-start gap-3">
                <img
                  src={log.userAvatar}
                  alt={log.userName}
                  className="w-8 h-8 rounded-full bg-[#F4F0EB] shrink-0 mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#25262B]">
                    <span className="font-semibold">{log.userName}</span>{" "}
                    <span className="text-[#8B8B8B]">{log.action}</span>{" "}
                    {log.target}
                  </p>
                  <p className="text-xs text-[#C4C4C4] mt-0.5">{timeAgo(log.timestamp)}</p>
                </div>
                <div
                  className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                    ACTION_DOT[log.action] ?? "bg-gray-400"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Member Progress */}
        <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
          <h2 className="font-bold text-[#25262B] mb-5">Member Progress</h2>
          <div className="flex flex-col gap-5">
            {memberProgress.map(({ member, total, done, pct }) => (
              <div key={member.id}>
                <div className="flex items-center gap-2.5 mb-2">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-7 h-7 rounded-full bg-[#F4F0EB] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#25262B] truncate leading-tight">
                      {member.name}
                    </p>
                    <p className="text-xs text-[#8B8B8B] truncate">{member.role}</p>
                  </div>
                  <span className="text-xs font-medium text-[#25262B] shrink-0">
                    {done}/{total}
                  </span>
                </div>
                <div className="h-1.5 bg-[#F4F0EB] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FFD034] rounded-full transition-all"
                    style={{ width: total > 0 ? `${pct}%` : "0%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Files + Notes ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Files */}
        <div className="lg:col-span-2 bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-[#25262B]">Files</h2>
            <button
              onClick={() =>
                toast.info("File upload coming in Phase 2", {
                  description: "Cloud storage integration coming soon.",
                })
              }
              className="h-9 px-4 rounded-[99px] bg-[#25262B] text-white text-sm font-medium flex items-center gap-2 hover:bg-[#25262B]/85 transition-colors"
            >
              <Upload size={14} />
              Upload
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MOCK_FILES.map((file) => {
              const style = FILE_STYLE[file.type] ?? FILE_STYLE.md;
              return (
                <div
                  key={file.id}
                  onClick={() => toast.info("Download available in Phase 2")}
                  className="flex items-center gap-3 p-3 rounded-[16px] bg-[#F4F0EB]/60 hover:bg-[#F4F0EB] transition-colors cursor-pointer"
                >
                  <div
                    className={`w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 ${style.bg}`}
                  >
                    <span className={`text-[10px] font-bold ${style.text}`}>{style.label}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#25262B] truncate">{file.name}</p>
                    <p className="text-xs text-[#8B8B8B]">
                      {file.size} · {file.uploadedBy} · {file.date}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team Notes */}
        <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
          <h2 className="font-bold text-[#25262B] mb-5">Team Notes</h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={10}
            className="w-full px-4 py-3 rounded-[16px] bg-[#F4F0EB] border border-[#E0D9D2] text-sm text-[#25262B] outline-none focus:ring-2 focus:ring-[#FFD034] resize-none transition leading-relaxed"
          />
          <p className="text-xs text-[#C4C4C4] mt-2">Changes are saved locally.</p>
        </div>
      </div>
    </div>
  );
}
