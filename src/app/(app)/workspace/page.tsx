"use client";

import { useState } from "react";
import { Zap, Layers, Clock, Mic2 } from "lucide-react";
import TaskSplitter from "@/components/workspace/TaskSplitter";
import SlideMaker from "@/components/workspace/SlideMaker";
import TimeSplitter from "@/components/workspace/TimeSplitter";
import PresCoach from "@/components/workspace/PresCoach";

type Tab = "tasks" | "slides" | "timeline" | "coach";

const TABS: { id: Tab; label: string; icon: typeof Zap }[] = [
  { id: "tasks",    label: "Task Splitter", icon: Zap },
  { id: "slides",   label: "Slide Maker",   icon: Layers },
  { id: "timeline", label: "Time Splitter", icon: Clock },
  { id: "coach",    label: "Pres Coach",    icon: Mic2 },
];

export default function WorkspacePage() {
  const [tab, setTab] = useState<Tab>("tasks");

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#25262B]">AI Workspace</h1>
        <p className="text-[#8B8B8B] text-sm mt-1">
          Let AI handle the planning so your team can focus on building
        </p>
      </div>

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

      {tab === "tasks"    && <TaskSplitter />}
      {tab === "slides"   && <SlideMaker />}
      {tab === "timeline" && <TimeSplitter />}
      {tab === "coach"    && <PresCoach />}
    </div>
  );
}
