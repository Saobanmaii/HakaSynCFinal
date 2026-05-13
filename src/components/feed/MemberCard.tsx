"use client";

import type { User } from "@/lib/types";
import { useState } from "react";
import { Send, Check } from "lucide-react";

const STATUS_STYLE: Record<User["status"], string> = {
  Looking: "bg-emerald-100 text-emerald-700",
  Open: "bg-[#FFD034]/30 text-[#7A6000]",
  Busy: "bg-gray-100 text-gray-500",
};

interface Props {
  user: User;
  onOpenProfile: (user: User) => void;
}

export default function MemberCard({ user, onOpenProfile }: Props) {
  const [invited, setInvited] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpenProfile(user)}
      onKeyDown={(e) => e.key === "Enter" && onOpenProfile(user)}
      className="bg-white rounded-[28px] p-5 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.09)] transition-shadow cursor-pointer flex flex-col gap-4 outline-none focus-visible:ring-2 focus-visible:ring-[#FFD034]"
    >
      {/* Avatar + status */}
      <div className="flex items-start justify-between">
        <img
          src={user.avatar}
          alt={user.name}
          width={56}
          height={56}
          className="w-14 h-14 rounded-full bg-[#F4F0EB]"
        />
        <span className={`text-xs font-medium px-3 py-1 rounded-[99px] ${STATUS_STYLE[user.status]}`}>
          {user.status}
        </span>
      </div>

      {/* Name + role + major */}
      <div>
        <p className="font-bold text-[#25262B]">{user.name}</p>
        <p className="text-[#8B8B8B] text-sm">{user.role}</p>
        <p className="text-[#8B8B8B] text-xs mt-0.5">{user.major}</p>
      </div>

      {/* Bio */}
      <p className="text-[#8B8B8B] text-xs leading-relaxed line-clamp-2">{user.bio}</p>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {user.skills.slice(0, 3).map((s) => (
          <span key={s} className="text-xs bg-[#F4F0EB] text-[#25262B] px-2.5 py-0.5 rounded-[99px]">
            {s}
          </span>
        ))}
        {user.skills.length > 3 && (
          <span className="text-xs bg-[#F4F0EB] text-[#8B8B8B] px-2.5 py-0.5 rounded-[99px]">
            +{user.skills.length - 3}
          </span>
        )}
      </div>

      {/* Invite button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setInvited((v) => !v);
        }}
        className={`mt-auto w-full h-9 rounded-[99px] text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 ${
          invited
            ? "bg-[#FFD034]/20 text-[#b8960a] border-2 border-[#FFD034]/40"
            : "border-2 border-[#25262B] text-[#25262B] hover:bg-[#25262B] hover:text-white"
        }`}
      >
        {invited ? (
          <>
            <Check size={14} />
            Invited
          </>
        ) : (
          <>
            <Send size={14} />
            Invite
          </>
        )}
      </button>
    </div>
  );
}
