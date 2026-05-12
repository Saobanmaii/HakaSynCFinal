"use client";

import { useState } from "react";
import { CURRENT_USER, MOCK_MEMBERS, MOCK_APPLICATIONS } from "@/lib/mockData";
import type { TeamApplication } from "@/lib/types";
import { Check, X, Clock, Crown, Users } from "lucide-react";
import { toast } from "sonner";

const STATUS_STYLE = {
  Looking: "bg-emerald-100 text-emerald-700",
  Open:    "bg-[#FFD034]/30 text-[#7A6000]",
  Busy:    "bg-gray-100 text-gray-500",
};

// Simulate current user's team: Alex + Linh + Minh + Thu
const TEAM_MEMBERS = [CURRENT_USER, MOCK_MEMBERS[0], MOCK_MEMBERS[1], MOCK_MEMBERS[2]];

export default function MyTeam() {
  const [applications, setApplications] = useState<TeamApplication[]>(MOCK_APPLICATIONS);

  function handleApprove(id: string, name: string) {
    setApplications((prev) => prev.filter((a) => a.id !== id));
    toast.success(`${name} has been approved!`, {
      description: "They will receive a notification to join your team.",
    });
  }

  function handleReject(id: string, name: string) {
    setApplications((prev) => prev.filter((a) => a.id !== id));
    toast.error(`Application from ${name} rejected.`);
  }

  const pendingCount = applications.length;

  return (
    <div className="max-w-3xl flex flex-col gap-8">

      {/* Team overview header */}
      <div className="bg-[#25262B] rounded-[28px] p-6 flex items-center gap-5">
        <div className="flex -space-x-3">
          {TEAM_MEMBERS.map((m) => (
            <img
              key={m.id}
              src={m.avatar}
              alt={m.name}
              width={44}
              height={44}
              className="w-11 h-11 rounded-full border-2 border-[#25262B] bg-[#F4F0EB]"
            />
          ))}
        </div>
        <div className="flex-1">
          <p className="font-bold text-white text-lg">NeuroStack</p>
          <p className="text-white/50 text-sm">EdTech AI · {TEAM_MEMBERS.length} members</p>
        </div>
        {pendingCount > 0 && (
          <span className="bg-[#FF6B6B] text-white text-xs font-bold px-3 py-1 rounded-[99px]">
            {pendingCount} pending
          </span>
        )}
      </div>

      {/* Current members */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Users size={16} className="text-[#25262B]" />
          <h2 className="font-bold text-[#25262B]">Team Members</h2>
          <span className="text-xs text-[#8B8B8B] bg-[#F4F0EB] px-2 py-0.5 rounded-[99px]">{TEAM_MEMBERS.length}</span>
        </div>

        <div className="flex flex-col gap-3">
          {TEAM_MEMBERS.map((member, i) => (
            <div
              key={member.id}
              className="bg-white rounded-[20px] px-5 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex items-center gap-4"
            >
              <div className="relative">
                <img
                  src={member.avatar}
                  alt={member.name}
                  width={44}
                  height={44}
                  className="w-11 h-11 rounded-full bg-[#F4F0EB]"
                />
                {i === 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#FFD034] flex items-center justify-center">
                    <Crown size={10} className="text-[#25262B]" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-[#25262B] text-sm truncate">{member.name}</p>
                  {i === 0 && <span className="text-[10px] text-[#8B8B8B]">(you)</span>}
                </div>
                <p className="text-[#8B8B8B] text-xs truncate">{member.role} · {member.major}</p>
              </div>

              <span className={`text-xs font-medium px-3 py-1 rounded-[99px] shrink-0 ${STATUS_STYLE[member.status]}`}>
                {member.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Pending applications */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Clock size={16} className="text-[#25262B]" />
          <h2 className="font-bold text-[#25262B]">Pending Applications</h2>
          {pendingCount > 0 && (
            <span className="text-xs text-white bg-[#FF6B6B] px-2 py-0.5 rounded-[99px]">{pendingCount}</span>
          )}
        </div>

        {applications.length === 0 ? (
          <div className="bg-white rounded-[20px] p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
            <p className="text-[#8B8B8B] text-sm">No pending applications.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {applications.map((app) => {
              const timeAgo = (() => {
                const diff = Date.now() - new Date(app.appliedAt).getTime();
                const days = Math.floor(diff / 86_400_000);
                if (days === 0) return "today";
                if (days === 1) return "1 day ago";
                return `${days} days ago`;
              })();

              return (
                <div
                  key={app.id}
                  className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col gap-4"
                >
                  {/* Applicant info */}
                  <div className="flex items-center gap-3">
                    <img
                      src={app.userAvatar}
                      alt={app.userName}
                      width={44}
                      height={44}
                      className="w-11 h-11 rounded-full bg-[#F4F0EB] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#25262B] text-sm">{app.userName}</p>
                      <p className="text-[#8B8B8B] text-xs">{app.role} · {app.userMajor}</p>
                    </div>
                    <span className="text-xs text-[#8B8B8B] shrink-0">{timeAgo}</span>
                  </div>

                  {/* Message */}
                  {app.message && (
                    <p className="text-[#8B8B8B] text-sm leading-relaxed bg-[#F4F0EB] rounded-[14px] px-4 py-3 italic">
                      &ldquo;{app.message}&rdquo;
                    </p>
                  )}

                  {/* Action buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleApprove(app.id, app.userName)}
                      className="flex-1 h-9 rounded-[99px] bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Check size={14} />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(app.id, app.userName)}
                      className="flex-1 h-9 rounded-[99px] border-2 border-[#FF6B6B] text-[#FF6B6B] text-sm font-semibold hover:bg-[#FF6B6B] hover:text-white transition-colors flex items-center justify-center gap-1.5"
                    >
                      <X size={14} />
                      Reject
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
