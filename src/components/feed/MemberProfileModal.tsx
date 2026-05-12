"use client";

import { useEffect, useState } from "react";
import type { User } from "@/lib/types";
import { X, MessageCircle, UserPlus, Check } from "lucide-react";

const STATUS_STYLE: Record<User["status"], string> = {
  Looking: "bg-emerald-100 text-emerald-700",
  Open: "bg-[#FFD034]/30 text-[#7A6000]",
  Busy: "bg-gray-100 text-gray-500",
};

interface Props {
  user: User | null;
  onClose: () => void;
}

export default function MemberProfileModal({ user, onClose }: Props) {
  const [connected, setConnected] = useState(false);

  // Reset connected state when modal opens for a different user
  useEffect(() => { setConnected(false); }, [user?.id]);

  // Trap Escape key
  useEffect(() => {
    if (!user) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [user, onClose]);

  if (!user) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Modal card */}
      <div
        className="relative bg-white rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] w-full max-w-sm p-7 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F4F0EB] flex items-center justify-center text-[#8B8B8B] hover:text-[#25262B] transition-colors"
        >
          <X size={16} />
        </button>

        {/* Avatar + status */}
        <div className="flex flex-col items-center gap-3 text-center">
          <img
            src={user.avatar}
            alt={user.name}
            width={80}
            height={80}
            className="w-20 h-20 rounded-full bg-[#F4F0EB] border-4 border-[#FFD034]"
          />
          <div>
            <h2 className="text-xl font-bold text-[#25262B]">{user.name}</h2>
            <p className="text-[#8B8B8B] text-sm">{user.role}</p>
            <p className="text-[#8B8B8B] text-xs">{user.major}</p>
          </div>
          <span className={`text-xs font-medium px-3 py-1 rounded-[99px] ${STATUS_STYLE[user.status]}`}>
            {user.status === "Looking"
              ? "Looking for a team"
              : user.status === "Open"
              ? "Open to opportunities"
              : "Currently busy"}
          </span>
        </div>

        {/* Bio */}
        <p className="text-[#8B8B8B] text-sm leading-relaxed text-center">{user.bio}</p>

        {/* Skills */}
        <div>
          <p className="text-xs font-semibold text-[#25262B] mb-2 uppercase tracking-wide">Skills</p>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((s) => (
              <span
                key={s}
                className="text-xs bg-[#F4F0EB] text-[#25262B] px-3 py-1 rounded-[99px] font-medium"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-1">
          <button
            onClick={() => setConnected((v) => !v)}
            className={`flex-1 h-10 rounded-[99px] text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
              connected
                ? "bg-emerald-100 text-emerald-700"
                : "bg-[#25262B] text-white hover:bg-[#25262B]/90"
            }`}
          >
            {connected ? <Check size={15} /> : <UserPlus size={15} />}
            {connected ? "Connected" : "Connect"}
          </button>
          <button className="flex-1 h-10 rounded-[99px] border-2 border-[#25262B] text-[#25262B] text-sm font-semibold hover:bg-[#25262B] hover:text-white transition-colors flex items-center justify-center gap-2">
            <MessageCircle size={15} />
            Message
          </button>
        </div>
      </div>
    </div>
  );
}
