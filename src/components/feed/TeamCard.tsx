"use client";

import { useState } from "react";
import type { Team } from "@/lib/types";
import { Users, Layers } from "lucide-react";

interface Props {
  team: Team;
  onApply: (team: Team) => void;
}

const PROJECT_TYPE_COLOR: Record<string, string> = {
  "EdTech AI": "bg-blue-100 text-blue-700",
  "Sustainability Web3": "bg-emerald-100 text-emerald-700",
  "HealthTech": "bg-pink-100 text-pink-700",
  "AgriTech IoT": "bg-lime-100 text-lime-700",
  "HR Platform": "bg-violet-100 text-violet-700",
  "FinTech": "bg-amber-100 text-amber-700",
};

export default function TeamCard({ team, onApply }: Props) {
  const colorClass = PROJECT_TYPE_COLOR[team.projectType] ?? "bg-gray-100 text-gray-600";

  return (
    <div className="bg-white rounded-[28px] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.09)] transition-shadow flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="w-12 h-12 rounded-[14px] bg-[#25262B] flex items-center justify-center shrink-0">
          <span className="text-[#FFD034] font-bold text-lg">{team.name[0]}</span>
        </div>
        <span className={`text-xs font-medium px-3 py-1 rounded-[99px] whitespace-nowrap ${colorClass}`}>
          {team.projectType}
        </span>
      </div>

      {/* Name + description */}
      <div>
        <p className="font-bold text-[#25262B] text-base">{team.name}</p>
        <p className="text-[#8B8B8B] text-sm mt-1 leading-relaxed line-clamp-2">{team.description}</p>
      </div>

      {/* Member avatars */}
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {team.members.slice(0, 4).map((m) => (
            <img
              key={m.id}
              src={m.avatar}
              alt={m.name}
              title={m.name}
              width={28}
              height={28}
              className="w-7 h-7 rounded-full border-2 border-white bg-[#F4F0EB]"
            />
          ))}
          {team.members.length > 4 && (
            <div className="w-7 h-7 rounded-full border-2 border-white bg-[#F4F0EB] flex items-center justify-center text-[10px] font-semibold text-[#8B8B8B]">
              +{team.members.length - 4}
            </div>
          )}
        </div>
        <span className="text-[#8B8B8B] text-xs flex items-center gap-1">
          <Users size={12} />
          {team.members.length} member{team.members.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Open roles */}
      <div>
        <p className="text-xs font-semibold text-[#25262B] mb-2 flex items-center gap-1">
          <Layers size={12} />
          Open roles
        </p>
        <div className="flex flex-wrap gap-1.5">
          {team.openRoles.map((r) => (
            <span key={r} className="text-xs bg-[#FFD034]/20 text-[#7A6000] px-2.5 py-0.5 rounded-[99px] font-medium">
              {r}
            </span>
          ))}
        </div>
      </div>

      {/* Apply button */}
      <button
        onClick={() => onApply(team)}
        className="mt-auto w-full h-9 rounded-[99px] bg-[#25262B] text-white text-sm font-semibold hover:bg-[#25262B]/90 transition-colors"
      >
        Apply to Join
      </button>
    </div>
  );
}
