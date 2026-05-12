"use client";

import { useEffect, useState } from "react";
import type { Competition } from "@/lib/types";
import { X, Trophy, Calendar, Users, Building, Tag } from "lucide-react";
import { toast } from "sonner";

interface Props {
  competition: Competition | null;
  onClose: () => void;
}

export default function CompetitionDetailModal({ competition, onClose }: Props) {
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    if (competition) setRegistered(competition.registered);
  }, [competition]);

  useEffect(() => {
    if (!competition) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [competition, onClose]);

  if (!competition) return null;

  const dateFormatted = new Date(competition.deadline).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });

  function handleRegister() {
    if (registered) {
      toast.info("Already registered for this competition.");
      return;
    }
    setRegistered(true);
    toast.success(`Registered for ${competition!.title}!`, {
      description: "Good luck! Check your team workspace to start preparing.",
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      <div
        className="relative bg-white rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] w-full max-w-lg max-h-[90vh] overflow-y-auto flex flex-col gap-6 p-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F4F0EB] flex items-center justify-center text-[#8B8B8B] hover:text-[#25262B] transition-colors z-10"
        >
          <X size={16} />
        </button>

        {/* Title area */}
        <div className="pr-8">
          <span className="text-xs font-medium text-[#8B8B8B] uppercase tracking-wide">{competition.category}</span>
          <h2 className="text-xl font-bold text-[#25262B] mt-1 leading-snug">{competition.title}</h2>
          <div className="flex items-center gap-1.5 mt-1.5 text-[#8B8B8B] text-sm">
            <Building size={13} />
            {competition.organizer}
          </div>
        </div>

        {/* Prize banner */}
        <div className="flex items-center gap-3 bg-[#25262B] rounded-[18px] px-5 py-4">
          <div className="w-10 h-10 rounded-full bg-[#FFD034]/20 flex items-center justify-center shrink-0">
            <Trophy size={20} className="text-[#FFD034]" />
          </div>
          <div>
            <p className="text-white/60 text-xs">Total Prize</p>
            <p className="text-white font-bold text-lg">{competition.prize}</p>
          </div>
        </div>

        {/* Description */}
        <div>
          <p className="text-xs font-semibold text-[#25262B] uppercase tracking-wide mb-2">About</p>
          <p className="text-[#8B8B8B] text-sm leading-relaxed">{competition.description}</p>
        </div>

        {/* Key info grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#F4F0EB] rounded-[18px] p-4">
            <div className="flex items-center gap-1.5 text-[#8B8B8B] text-xs mb-1">
              <Calendar size={12} />
              Deadline
            </div>
            <p className="font-semibold text-[#25262B] text-sm">{dateFormatted}</p>
          </div>
          <div className="bg-[#F4F0EB] rounded-[18px] p-4">
            <div className="flex items-center gap-1.5 text-[#8B8B8B] text-xs mb-1">
              <Users size={12} />
              Participants
            </div>
            <p className="font-semibold text-[#25262B] text-sm">{competition.participantsCount.toLocaleString()} teams</p>
          </div>
        </div>

        {/* Tags */}
        <div>
          <p className="text-xs font-semibold text-[#25262B] uppercase tracking-wide mb-2 flex items-center gap-1">
            <Tag size={12} />
            Tags
          </p>
          <div className="flex flex-wrap gap-2">
            {competition.tags.map((t) => (
              <span key={t} className="text-xs bg-[#F4F0EB] text-[#25262B] px-3 py-1 rounded-[99px] font-medium">{t}</span>
            ))}
          </div>
        </div>

        {/* Register */}
        <button
          onClick={handleRegister}
          className={`w-full h-11 rounded-[99px] text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
            registered
              ? "bg-emerald-100 text-emerald-700 cursor-default"
              : "bg-[#FFD034] text-[#25262B] hover:bg-[#FFD034]/90"
          }`}
        >
          {registered ? "✓ Registered" : "Register Now"}
        </button>
      </div>
    </div>
  );
}
