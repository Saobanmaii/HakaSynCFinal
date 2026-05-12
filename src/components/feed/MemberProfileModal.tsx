"use client";

import { useEffect, useState } from "react";
import type { User } from "@/lib/types";
import { X, MessageCircle, UserPlus, Check, Mail, Code2, ExternalLink, Briefcase, Star } from "lucide-react";

const STATUS_STYLE: Record<User["status"], string> = {
  Looking: "bg-emerald-100 text-emerald-700",
  Open: "bg-[#FFD034]/30 text-[#7A6000]",
  Busy: "bg-gray-100 text-gray-500",
};

const STATUS_LABEL: Record<User["status"], string> = {
  Looking: "Looking for a team",
  Open: "Open to opportunities",
  Busy: "Currently busy",
};

interface Props {
  user: User | null;
  onClose: () => void;
}

export default function MemberProfileModal({ user, onClose }: Props) {
  const [connected, setConnected] = useState(false);

  useEffect(() => { setConnected(false); }, [user?.id]);

  useEffect(() => {
    if (!user) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [user, onClose]);

  if (!user) return null;

  const projectCount = user.projects?.length ?? 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      <div
        className="relative bg-white rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] w-full max-w-lg flex flex-col overflow-y-auto max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-8 h-8 rounded-full bg-[#F4F0EB] flex items-center justify-center text-[#8B8B8B] hover:text-[#25262B] transition-colors"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div className="p-7 pb-5 flex items-start gap-5">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 rounded-full border-4 border-[#FFD034] bg-[#F4F0EB] flex-shrink-0"
          />
          <div className="flex-1 min-w-0 pt-1">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <h2 className="text-xl font-bold text-[#25262B] leading-tight">{user.name}</h2>
                <p className="text-[#8B8B8B] text-sm mt-0.5">{user.role}</p>
                <p className="text-[#8B8B8B] text-xs">{user.major}</p>
              </div>
              <span className={`text-xs font-medium px-3 py-1 rounded-[99px] shrink-0 ${STATUS_STYLE[user.status]}`}>
                {STATUS_LABEL[user.status]}
              </span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="px-7 pb-5 flex gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 bg-[#F4F0EB] rounded-[99px] px-3 py-1.5">
            <Briefcase size={12} className="text-[#8B8B8B]" />
            <span className="text-xs font-semibold text-[#25262B]">{projectCount}</span>
            <span className="text-xs text-[#8B8B8B]">{projectCount === 1 ? "Project" : "Projects"}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#F4F0EB] rounded-[99px] px-3 py-1.5">
            <Star size={12} className="text-[#8B8B8B]" />
            <span className="text-xs font-semibold text-[#25262B]">{user.skills.length}</span>
            <span className="text-xs text-[#8B8B8B]">Skills</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#F4F0EB] rounded-[99px] px-3 py-1.5">
            <span className={`w-2 h-2 rounded-full ${user.teamId ? "bg-emerald-400" : "bg-gray-300"}`} />
            <span className="text-xs text-[#8B8B8B]">{user.teamId ? "Has team" : "No team"}</span>
          </div>
        </div>

        <div className="px-7 flex flex-col gap-6 pb-7">
          {/* Bio */}
          <p className="text-[#8B8B8B] text-sm leading-relaxed">{user.bio}</p>

          {/* Skills */}
          <div>
            <p className="text-xs font-semibold text-[#25262B] uppercase tracking-wide mb-2.5">Skills</p>
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

          {/* Past Projects */}
          <div>
            <p className="text-xs font-semibold text-[#25262B] uppercase tracking-wide mb-3">Past Projects</p>
            {projectCount > 0 ? (
              <div className="flex flex-col gap-3">
                {user.projects!.map((project) => (
                  <div key={project.id} className="bg-[#25262B] rounded-[20px] p-4 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <p className="text-white font-semibold text-sm leading-snug">{project.projectTitle}</p>
                        <p className="text-white/50 text-xs mt-0.5">{project.duration} · {project.teamSize} members</p>
                      </div>
                      <span className="text-[#FFD034] text-xs font-medium bg-[#FFD034]/10 px-2.5 py-0.5 rounded-[99px] shrink-0">
                        {project.role}
                      </span>
                    </div>
                    <ul className="flex flex-col gap-1">
                      {project.achievements.slice(0, 2).map((a, i) => (
                        <li key={i} className="flex gap-2 text-xs text-white/70">
                          <span className="text-[#FFD034] shrink-0 mt-0.5">▸</span>
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((t) => (
                        <span key={t} className="text-[10px] bg-white/10 text-white/80 px-2 py-0.5 rounded-[99px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#8B8B8B] text-sm">No projects shared yet.</p>
            )}
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold text-[#25262B] uppercase tracking-wide mb-2.5">Contact</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[#8B8B8B] text-xs">
                <Mail size={13} />
                <span>{user.email}</span>
              </div>
              {(user.github || user.linkedin) && (
                <div className="flex items-center gap-4">
                  {user.github && (
                    <a
                      href={`https://${user.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-[#25262B] font-medium hover:text-[#8B8B8B] transition-colors"
                    >
                      <Code2 size={13} />
                      GitHub
                    </a>
                  )}
                  {user.linkedin && (
                    <a
                      href={`https://${user.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-[#25262B] font-medium hover:text-[#8B8B8B] transition-colors"
                    >
                      <ExternalLink size={13} />
                      LinkedIn
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
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
    </div>
  );
}
