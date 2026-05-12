"use client";

import { useState, useMemo } from "react";
import { MOCK_MEMBERS, CURRENT_USER, MOCK_TEAMS, MOCK_COMPETITIONS } from "@/lib/mockData";
import type { User, Team, Competition } from "@/lib/types";
import MemberCard from "@/components/feed/MemberCard";
import MemberProfileModal from "@/components/feed/MemberProfileModal";
import TeamCard from "@/components/feed/TeamCard";
import TeamApplyModal from "@/components/feed/TeamApplyModal";
import CompetitionCard from "@/components/feed/CompetitionCard";
import CompetitionDetailModal from "@/components/feed/CompetitionDetailModal";
import MyTeam from "@/components/feed/MyTeam";
import { Users, Building2, Trophy, UserCircle2, Search, ChevronDown } from "lucide-react";

type Tab = "members" | "teams" | "competitions" | "myteam";

const TABS: { id: Tab; label: string; icon: typeof Users }[] = [
  { id: "members",      label: "Find Members",  icon: Users },
  { id: "teams",        label: "Find Teams",    icon: Building2 },
  { id: "competitions", label: "Competitions",  icon: Trophy },
  { id: "myteam",       label: "My Team",       icon: UserCircle2 },
];

const ALL_MEMBERS = [CURRENT_USER, ...MOCK_MEMBERS];

export default function FeedPage() {
  const [tab, setTab] = useState<Tab>("members");

  // Members state
  const [skillFilter, setSkillFilter] = useState("All");
  const [majorFilter, setMajorFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [profileUser, setProfileUser] = useState<User | null>(null);

  // Teams state
  const [applyTeam, setApplyTeam] = useState<Team | null>(null);

  // Competitions state
  const [detailComp, setDetailComp] = useState<Competition | null>(null);

  const allSkills = useMemo(() => {
    const set = new Set<string>();
    ALL_MEMBERS.forEach((m) => m.skills.forEach((s) => set.add(s)));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const allMajors = useMemo(() => {
    const set = new Set<string>();
    ALL_MEMBERS.forEach((m) => set.add(m.major));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const filteredMembers = useMemo(() => {
    return ALL_MEMBERS.filter((m) => {
      if (skillFilter !== "All" && !m.skills.includes(skillFilter)) return false;
      if (majorFilter !== "All" && m.major !== majorFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          m.name.toLowerCase().includes(q) ||
          m.role.toLowerCase().includes(q) ||
          m.major.toLowerCase().includes(q) ||
          m.skills.some((s) => s.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [skillFilter, majorFilter, search]);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#25262B]">Feed</h1>
        <p className="text-[#8B8B8B] text-sm mt-1">Discover teammates, teams, and competitions</p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 bg-white rounded-[99px] p-1.5 w-fit shadow-[0_4px_20px_rgba(0,0,0,0.05)] mb-8">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-[99px] text-sm font-medium transition-all ${
              tab === id
                ? "bg-[#25262B] text-white shadow-sm"
                : "text-[#8B8B8B] hover:text-[#25262B] hover:bg-[#F4F0EB]"
            }`}
          >
            <Icon size={15} />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* ── Find Members ── */}
      {tab === "members" && (
        <div>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B8B8B]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, role, skill…"
                className="w-full h-10 pl-9 pr-4 rounded-[99px] bg-white border border-[#E0D9D2] text-sm text-[#25262B] placeholder:text-[#C4C4C4] outline-none focus:ring-2 focus:ring-[#FFD034] transition"
              />
            </div>
            <div className="relative">
              <select
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
                className="h-10 pl-4 pr-9 rounded-[99px] bg-white border border-[#E0D9D2] text-sm text-[#25262B] outline-none focus:ring-2 focus:ring-[#FFD034] appearance-none cursor-pointer"
              >
                {allSkills.map((s) => (
                  <option key={s} value={s}>{s === "All" ? "All Skills" : s}</option>
                ))}
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B8B8B] pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={majorFilter}
                onChange={(e) => setMajorFilter(e.target.value)}
                className="h-10 pl-4 pr-9 rounded-[99px] bg-white border border-[#E0D9D2] text-sm text-[#25262B] outline-none focus:ring-2 focus:ring-[#FFD034] appearance-none cursor-pointer"
              >
                {allMajors.map((m) => (
                  <option key={m} value={m}>{m === "All" ? "All Majors" : m}</option>
                ))}
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B8B8B] pointer-events-none" />
            </div>
          </div>

          <p className="text-[#8B8B8B] text-sm mb-4">
            {filteredMembers.length} member{filteredMembers.length !== 1 ? "s" : ""} found
          </p>

          {filteredMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredMembers.map((member) => (
                <MemberCard key={member.id} user={member} onOpenProfile={setProfileUser} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-[#8B8B8B] font-medium">No members match your filters.</p>
              <button
                onClick={() => { setSkillFilter("All"); setMajorFilter("All"); setSearch(""); }}
                className="mt-3 text-sm text-[#25262B] font-semibold underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Find Teams ── */}
      {tab === "teams" && (
        <div>
          <p className="text-[#8B8B8B] text-sm mb-6">{MOCK_TEAMS.length} teams looking for members</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MOCK_TEAMS.map((team) => (
              <TeamCard key={team.id} team={team} onApply={setApplyTeam} />
            ))}
          </div>
        </div>
      )}

      {/* ── Competitions ── */}
      {tab === "competitions" && (
        <div>
          <p className="text-[#8B8B8B] text-sm mb-6">{MOCK_COMPETITIONS.length} active competitions</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {MOCK_COMPETITIONS.map((comp) => (
              <CompetitionCard key={comp.id} competition={comp} onViewDetail={setDetailComp} />
            ))}
          </div>
        </div>
      )}

      {/* ── My Team ── */}
      {tab === "myteam" && <MyTeam />}

      {/* Modals */}
      <MemberProfileModal user={profileUser} onClose={() => setProfileUser(null)} />
      <TeamApplyModal team={applyTeam} onClose={() => setApplyTeam(null)} />
      <CompetitionDetailModal competition={detailComp} onClose={() => setDetailComp(null)} />
    </div>
  );
}
