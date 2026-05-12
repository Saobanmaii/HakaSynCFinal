"use client";

import { useEffect, useState } from "react";
import type { Team } from "@/lib/types";
import { X, Send } from "lucide-react";
import { toast } from "sonner";

interface Props {
  team: Team | null;
  onClose: () => void;
}

export default function TeamApplyModal({ team, onClose }: Props) {
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!team) return;
    setRole(team.openRoles[0] ?? "");
    setMessage("");
    setSubmitting(false);
  }, [team]);

  useEffect(() => {
    if (!team) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [team, onClose]);

  if (!team) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success(`Application sent to ${team!.name}!`, {
      description: `Role: ${role}. The team will review your application soon.`,
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      <div
        className="relative bg-white rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] w-full max-w-md p-7 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F4F0EB] flex items-center justify-center text-[#8B8B8B] hover:text-[#25262B] transition-colors"
        >
          <X size={16} />
        </button>

        {/* Team info */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-[14px] bg-[#25262B] flex items-center justify-center shrink-0">
            <span className="text-[#FFD034] font-bold text-lg">{team.name[0]}</span>
          </div>
          <div>
            <h2 className="font-bold text-[#25262B] text-lg">Apply to {team.name}</h2>
            <p className="text-[#8B8B8B] text-sm">{team.projectType}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Role selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#25262B]">Applying for</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="h-11 px-4 rounded-[14px] bg-[#F4F0EB] border border-[#E0D9D2] text-sm text-[#25262B] outline-none focus:ring-2 focus:ring-[#FFD034] appearance-none"
            >
              {team.openRoles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#25262B]">
              Message <span className="text-[#8B8B8B] font-normal">(optional)</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell the team why you'd be a great fit…"
              rows={3}
              className="px-4 py-3 rounded-[14px] bg-[#F4F0EB] border border-[#E0D9D2] text-sm text-[#25262B] placeholder:text-[#C4C4C4] outline-none focus:ring-2 focus:ring-[#FFD034] resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="h-11 rounded-[99px] bg-[#25262B] text-white font-semibold text-sm hover:bg-[#25262B]/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            <Send size={15} />
            {submitting ? "Sending…" : "Send Application"}
          </button>
        </form>
      </div>
    </div>
  );
}
