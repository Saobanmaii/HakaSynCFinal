"use client";

import { useState, useEffect, useRef } from "react";
import { CURRENT_USER, MOCK_PROJECTS } from "@/lib/mockData";
import type { User } from "@/lib/types";
import { Pencil, X, Check, Plus, Mail } from "lucide-react";
import { toast } from "sonner";

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

export default function ProfilePage() {
  const [profile, setProfile] = useState<User>(CURRENT_USER);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<User>(CURRENT_USER);
  const [newSkill, setNewSkill] = useState("");
  const skillInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("user-profile");
    if (saved) {
      try {
        const p = JSON.parse(saved) as User;
        setProfile(p);
        setDraft(p);
      } catch {}
    }
  }, []);

  function startEdit() {
    setDraft({ ...profile });
    setEditing(true);
  }

  function cancelEdit() {
    setDraft({ ...profile });
    setNewSkill("");
    setEditing(false);
  }

  function saveEdit() {
    setProfile(draft);
    localStorage.setItem("user-profile", JSON.stringify(draft));
    toast.success("Profile updated!");
    setNewSkill("");
    setEditing(false);
  }

  function addSkill() {
    const s = newSkill.trim();
    if (s && !draft.skills.includes(s)) {
      setDraft({ ...draft, skills: [...draft.skills, s] });
    }
    setNewSkill("");
    skillInputRef.current?.focus();
  }

  function removeSkill(skill: string) {
    setDraft({ ...draft, skills: draft.skills.filter((s) => s !== skill) });
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#25262B]">My Profile</h1>
        <p className="text-[#8B8B8B] text-sm mt-1">View and edit your personal information</p>
      </div>

      {/* Profile card */}
      <div className="bg-white rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] p-8 mb-6">
        {/* Header row: avatar + info + edit button */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-6">
          <div className="flex items-start gap-5">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-24 h-24 rounded-full border-4 border-[#FFD034] bg-[#F4F0EB] flex-shrink-0"
            />
            <div className="flex flex-col gap-1.5 min-w-0">
              {editing ? (
                <input
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                  className="text-xl font-bold text-[#25262B] border border-[#E0D9D2] rounded-[12px] px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#FFD034]"
                />
              ) : (
                <h2 className="text-xl font-bold text-[#25262B]">{profile.name}</h2>
              )}

              {editing ? (
                <input
                  value={draft.role}
                  onChange={(e) => setDraft({ ...draft, role: e.target.value })}
                  placeholder="Role"
                  className="text-sm border border-[#E0D9D2] rounded-[12px] px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#FFD034]"
                />
              ) : (
                <p className="text-[#8B8B8B] text-sm">{profile.role}</p>
              )}

              {editing ? (
                <input
                  value={draft.major}
                  onChange={(e) => setDraft({ ...draft, major: e.target.value })}
                  placeholder="Major"
                  className="text-sm border border-[#E0D9D2] rounded-[12px] px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#FFD034]"
                />
              ) : (
                <p className="text-[#8B8B8B] text-xs">{profile.major}</p>
              )}

              {editing ? (
                <select
                  value={draft.status}
                  onChange={(e) => setDraft({ ...draft, status: e.target.value as User["status"] })}
                  className="text-xs border border-[#E0D9D2] rounded-[12px] px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#FFD034] w-fit"
                >
                  <option value="Looking">Looking for a team</option>
                  <option value="Open">Open to opportunities</option>
                  <option value="Busy">Currently busy</option>
                </select>
              ) : (
                <span className={`text-xs font-medium px-3 py-1 rounded-[99px] w-fit ${STATUS_STYLE[profile.status]}`}>
                  {STATUS_LABEL[profile.status]}
                </span>
              )}

              <div className="flex items-center gap-1.5 text-[#8B8B8B] text-xs mt-0.5">
                <Mail size={12} />
                <span>{profile.email}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 flex-shrink-0">
            {editing ? (
              <>
                <button
                  onClick={cancelEdit}
                  className="h-9 px-4 rounded-[99px] border border-[#E0D9D2] text-sm font-medium text-[#8B8B8B] hover:bg-[#F4F0EB] transition-colors flex items-center gap-1.5"
                >
                  <X size={14} /> Cancel
                </button>
                <button
                  onClick={saveEdit}
                  className="h-9 px-4 rounded-[99px] bg-[#25262B] text-white text-sm font-medium hover:bg-[#25262B]/90 transition-colors flex items-center gap-1.5"
                >
                  <Check size={14} /> Save
                </button>
              </>
            ) : (
              <button
                onClick={startEdit}
                className="h-9 px-4 rounded-[99px] bg-[#25262B] text-white text-sm font-medium hover:bg-[#25262B]/90 transition-colors flex items-center gap-1.5"
              >
                <Pencil size={14} /> Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Bio */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-[#25262B] uppercase tracking-wide mb-2">Bio</p>
          {editing ? (
            <textarea
              value={draft.bio}
              onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
              rows={3}
              className="w-full border border-[#E0D9D2] rounded-[12px] px-3 py-2 text-sm text-[#25262B] resize-none focus:outline-none focus:ring-2 focus:ring-[#FFD034]"
            />
          ) : (
            <p className="text-sm text-[#8B8B8B] leading-relaxed">{profile.bio}</p>
          )}
        </div>

        {/* Skills */}
        <div>
          <p className="text-xs font-semibold text-[#25262B] uppercase tracking-wide mb-3">Skills</p>
          <div className="flex flex-wrap gap-2">
            {(editing ? draft : profile).skills.map((s) => (
              <span
                key={s}
                className="flex items-center gap-1.5 text-xs bg-[#F4F0EB] text-[#25262B] px-3 py-1 rounded-[99px] font-medium"
              >
                {s}
                {editing && (
                  <button
                    onClick={() => removeSkill(s)}
                    className="text-[#8B8B8B] hover:text-[#FF6B6B] transition-colors"
                  >
                    <X size={11} />
                  </button>
                )}
              </span>
            ))}
            {editing && (
              <div className="flex items-center gap-1">
                <input
                  ref={skillInputRef}
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addSkill()}
                  placeholder="Add skill…"
                  className="text-xs border border-[#E0D9D2] rounded-[99px] px-3 py-1 w-28 focus:outline-none focus:ring-2 focus:ring-[#FFD034]"
                />
                <button
                  onClick={addSkill}
                  className="w-6 h-6 rounded-full bg-[#25262B] text-white flex items-center justify-center hover:bg-[#25262B]/80 transition-colors"
                >
                  <Plus size={12} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Past Projects */}
      <div>
        <h2 className="text-lg font-bold text-[#25262B] mb-4">Past Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {MOCK_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] p-6 flex flex-col gap-4"
            >
              <div>
                <h3 className="font-bold text-[#25262B] text-base leading-snug mb-1">{project.projectTitle}</h3>
                <p className="text-sm text-[#8B8B8B]">{project.role}</p>
                <p className="text-xs text-[#8B8B8B] mt-0.5">
                  {project.duration} · {project.teamSize} members
                </p>
              </div>

              <p className="text-sm text-[#25262B] leading-relaxed">{project.description}</p>

              <div>
                <p className="text-xs font-semibold text-[#25262B] uppercase tracking-wide mb-2">Achievements</p>
                <ul className="space-y-1">
                  {project.achievements.map((a, i) => (
                    <li key={i} className="text-xs text-[#8B8B8B] flex gap-2">
                      <span className="text-[#FFD034] flex-shrink-0 mt-0.5">▸</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-auto">
                {project.techStack.map((t) => (
                  <span key={t} className="text-xs bg-[#25262B] text-white px-2.5 py-0.5 rounded-[99px]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
