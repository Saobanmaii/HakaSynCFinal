"use client";

import type { Competition } from "@/lib/types";
import { Calendar, Users, Trophy, ChevronRight } from "lucide-react";

interface Props {
  competition: Competition;
  onViewDetail: (competition: Competition) => void;
}

const CATEGORY_STYLE: Record<string, { bg: string; text: string; dot: string }> = {
  "Artificial Intelligence": { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
  "Startup":                 { bg: "bg-violet-100", text: "text-violet-700", dot: "bg-violet-500" },
  "Hackathon":               { bg: "bg-orange-100", text: "text-orange-700", dot: "bg-orange-500" },
  "Design":                  { bg: "bg-pink-100", text: "text-pink-700", dot: "bg-pink-500" },
};

function deadlineBadge(deadline: string) {
  const diff = Math.ceil((new Date(deadline).getTime() - Date.now()) / 86_400_000);
  if (diff <= 0) return { label: "Closed", cls: "bg-gray-100 text-gray-500" };
  if (diff <= 14) return { label: `${diff}d left`, cls: "bg-[#FF6B6B]/15 text-[#C93B3B] font-semibold" };
  if (diff <= 30) return { label: `${diff}d left`, cls: "bg-[#FFD034]/25 text-[#7A6000] font-semibold" };
  return { label: `${diff}d left`, cls: "bg-emerald-100 text-emerald-700" };
}

export default function CompetitionCard({ competition, onViewDetail }: Props) {
  const style = CATEGORY_STYLE[competition.category] ?? { bg: "bg-gray-100", text: "text-gray-600", dot: "bg-gray-400" };
  const badge = deadlineBadge(competition.deadline);
  const dateFormatted = new Date(competition.deadline).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });

  return (
    <div className="bg-white rounded-[28px] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.09)] transition-shadow flex flex-col gap-4">
      {/* Category + deadline */}
      <div className="flex items-center justify-between gap-2">
        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-[99px] ${style.bg} ${style.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
          {competition.category}
        </span>
        <span className={`text-xs px-2.5 py-0.5 rounded-[99px] ${badge.cls}`}>
          {badge.label}
        </span>
      </div>

      {/* Title + organizer */}
      <div>
        <p className="font-bold text-[#25262B] text-base leading-snug">{competition.title}</p>
        <p className="text-[#8B8B8B] text-sm mt-0.5">{competition.organizer}</p>
      </div>

      {/* Description */}
      <p className="text-[#8B8B8B] text-sm leading-relaxed line-clamp-2">{competition.description}</p>

      {/* Prize */}
      <div className="flex items-center gap-2 bg-[#FFD034]/15 rounded-[14px] px-4 py-2.5">
        <Trophy size={16} className="text-[#7A6000] shrink-0" />
        <span className="font-semibold text-[#25262B] text-sm">{competition.prize}</span>
      </div>

      {/* Meta row */}
      <div className="flex items-center justify-between text-xs text-[#8B8B8B]">
        <span className="flex items-center gap-1">
          <Calendar size={12} />
          Deadline: {dateFormatted}
        </span>
        <span className="flex items-center gap-1">
          <Users size={12} />
          {competition.participantsCount.toLocaleString()} registered
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {competition.tags.map((t) => (
          <span key={t} className="text-xs bg-[#F4F0EB] text-[#25262B] px-2.5 py-0.5 rounded-[99px]">{t}</span>
        ))}
        {competition.registered && (
          <span className="text-xs bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-[99px] font-medium">✓ Registered</span>
        )}
      </div>

      {/* View detail button */}
      <button
        onClick={() => onViewDetail(competition)}
        className="mt-auto w-full h-9 rounded-[99px] border-2 border-[#25262B] text-[#25262B] text-sm font-semibold hover:bg-[#25262B] hover:text-white transition-colors flex items-center justify-center gap-1"
      >
        View Details
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
