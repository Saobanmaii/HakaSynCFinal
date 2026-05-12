"use client";

import { useState } from "react";
import { Clock, RotateCcw, Calendar, Zap } from "lucide-react";
import { MOCK_TIMELINE, CURRENT_USER, MOCK_MEMBERS } from "@/lib/mockData";
import type { TimelineDay } from "@/lib/types";
import { toast } from "sonner";

const TEAM = [CURRENT_USER, MOCK_MEMBERS[0], MOCK_MEMBERS[1], MOCK_MEMBERS[2]];

const MEMBER_AVATAR: Record<string, string> = Object.fromEntries(
  TEAM.map((m) => [m.id, m.avatar])
);

export default function TimeSplitter() {
  const [startDate, setStartDate] = useState("2026-05-13");
  const [presentationDate, setPresentationDate] = useState("2026-05-15");
  const [hoursPerDay, setHoursPerDay] = useState("4");
  const [presentationSlot, setPresentationSlot] = useState("13:00");
  const [selectedMembers, setSelectedMembers] = useState<Set<string>>(
    new Set(TEAM.map((m) => m.id))
  );
  const [loading, setLoading] = useState(false);
  const [timeline, setTimeline] = useState<TimelineDay[]>([]);
  const [generated, setGenerated] = useState(false);

  function toggleMember(id: string) {
    setSelectedMembers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size > 1) next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setTimeline(MOCK_TIMELINE);
    setGenerated(true);
    setLoading(false);
    toast.success("Schedule generated!", {
      description: `${MOCK_TIMELINE.length} days planned across ${selectedMembers.size} team members.`,
    });
  }

  function handleReset() {
    setGenerated(false);
    setTimeline([]);
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-28 gap-5">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-[#FFD034]/20" />
          <div className="absolute inset-0 rounded-full border-4 border-[#FFD034] border-t-transparent animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Clock size={20} className="text-[#FFD034]" />
          </div>
        </div>
        <div className="text-center">
          <p className="font-bold text-[#25262B] text-lg">AI is building your schedule…</p>
          <p className="text-[#8B8B8B] text-sm mt-1">Balancing workload across team members</p>
        </div>
      </div>
    );
  }

  if (!generated) {
    return (
      <div className="max-w-2xl">
        <form onSubmit={handleGenerate} className="flex flex-col gap-4">
          <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <p className="text-sm font-semibold text-[#25262B] mb-4">Schedule settings</p>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div>
                <label className="block text-xs font-medium text-[#8B8B8B] mb-1.5">
                  Start working from
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full h-10 px-3 rounded-[12px] bg-[#F4F0EB] border border-[#E0D9D2] text-sm text-[#25262B] outline-none focus:ring-2 focus:ring-[#FFD034] transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#8B8B8B] mb-1.5">
                  Presentation date
                </label>
                <input
                  type="date"
                  value={presentationDate}
                  onChange={(e) => setPresentationDate(e.target.value)}
                  className="w-full h-10 px-3 rounded-[12px] bg-[#F4F0EB] border border-[#E0D9D2] text-sm text-[#25262B] outline-none focus:ring-2 focus:ring-[#FFD034] transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#8B8B8B] mb-1.5">
                  Hours per person / day
                </label>
                <input
                  type="number"
                  min={1}
                  max={12}
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(e.target.value)}
                  className="w-full h-10 px-3 rounded-[12px] bg-[#F4F0EB] border border-[#E0D9D2] text-sm text-[#25262B] outline-none focus:ring-2 focus:ring-[#FFD034] transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#8B8B8B] mb-1.5">
                  Presentation time slot
                </label>
                <input
                  type="time"
                  value={presentationSlot}
                  onChange={(e) => setPresentationSlot(e.target.value)}
                  className="w-full h-10 px-3 rounded-[12px] bg-[#F4F0EB] border border-[#E0D9D2] text-sm text-[#25262B] outline-none focus:ring-2 focus:ring-[#FFD034] transition"
                />
              </div>
            </div>

            <p className="text-xs font-medium text-[#8B8B8B] mb-2">Team members</p>
            <div className="flex flex-wrap gap-2">
              {TEAM.map((member) => {
                const selected = selectedMembers.has(member.id);
                return (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => toggleMember(member.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-[99px] border text-sm font-medium transition-all ${
                      selected
                        ? "bg-[#25262B] text-white border-[#25262B]"
                        : "bg-white text-[#8B8B8B] border-[#E0D9D2] hover:border-[#25262B] hover:text-[#25262B]"
                    }`}
                  >
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-5 h-5 rounded-full"
                    />
                    {member.name.split(" ")[0]}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="self-start h-11 px-6 rounded-[99px] bg-[#FFD034] text-[#25262B] font-semibold text-sm flex items-center gap-2 hover:bg-[#FFD034]/90 transition-colors"
          >
            <Zap size={15} />
            Generate Schedule
          </button>
        </form>
      </div>
    );
  }

  const totalHours = timeline
    .flatMap((d) => d.tasks)
    .reduce((s, t) => s + t.hours, 0);

  return (
    <div className="flex flex-col gap-6">
      {/* Stats + reset */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div>
            <p className="text-2xl font-bold text-[#25262B]">{timeline.length}</p>
            <p className="text-[#8B8B8B] text-xs">Days planned</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[#25262B]">{totalHours}h</p>
            <p className="text-[#8B8B8B] text-xs">Total work hours</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[#25262B]">{selectedMembers.size}</p>
            <p className="text-[#8B8B8B] text-xs">Members</p>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="self-start sm:self-auto h-9 px-4 rounded-[99px] border border-[#E0D9D2] text-[#8B8B8B] text-sm font-medium flex items-center gap-2 hover:text-[#25262B] hover:border-[#25262B] transition-colors"
        >
          <RotateCcw size={14} />
          Reset
        </button>
      </div>

      {/* Day cards */}
      <div className="flex flex-col gap-4">
        {timeline.map((day, dayIdx) => {
          const isLastDay = dayIdx === timeline.length - 1;
          return (
            <div
              key={day.date}
              className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden"
            >
              {/* Day header */}
              <div
                className={`px-5 py-3 flex items-center justify-between ${
                  isLastDay ? "bg-[#25262B]" : "bg-[#F4F0EB]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Calendar
                    size={14}
                    className={isLastDay ? "text-[#FFD034]" : "text-[#8B8B8B]"}
                  />
                  <span
                    className={`text-sm font-semibold ${
                      isLastDay ? "text-white" : "text-[#25262B]"
                    }`}
                  >
                    {day.dayLabel}
                  </span>
                </div>
                <span
                  className={`text-xs font-medium ${
                    isLastDay ? "text-[#FFD034]" : "text-[#8B8B8B]"
                  }`}
                >
                  {day.date}
                </span>
              </div>

              {/* Member task rows */}
              <div className="divide-y divide-[#F4F0EB]">
                {day.tasks.map((task) => (
                  <div
                    key={`${day.date}-${task.memberId}`}
                    className="px-5 py-3 flex items-center gap-3"
                  >
                    <img
                      src={
                        MEMBER_AVATAR[task.memberId] ??
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${task.memberName}`
                      }
                      alt={task.memberName}
                      className="w-8 h-8 rounded-full bg-[#F4F0EB] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#25262B] truncate">
                        {task.task}
                      </p>
                      <p className="text-xs text-[#8B8B8B] mt-0.5">{task.memberName}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-[#8B8B8B] hidden sm:block">
                        {task.timeSlot}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-[99px] bg-[#FFD034]/20 text-[#7A6000]">
                        {task.hours}h
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
