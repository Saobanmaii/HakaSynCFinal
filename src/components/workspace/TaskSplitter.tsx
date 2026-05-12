"use client";

import { useState } from "react";
import { Zap, Users, RotateCcw } from "lucide-react";
import { MOCK_TASKS, CURRENT_USER, MOCK_MEMBERS } from "@/lib/mockData";
import type { Task } from "@/lib/types";
import KanbanBoard from "./KanbanBoard";
import { toast } from "sonner";

const TEAM = [CURRENT_USER, MOCK_MEMBERS[0], MOCK_MEMBERS[1], MOCK_MEMBERS[2]];

const EXAMPLE_PROMPTS = [
  "AI-powered study assistant for university students with personalized learning paths, Gemini API integration, and performance analytics.",
  "Carbon footprint tracker using blockchain and IoT sensors, with gamification elements to encourage sustainable behavior.",
  "Hospital workflow management system with smart scheduling, patient tracking, and staff coordination features.",
];

export default function TaskSplitter() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!description.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setTasks(MOCK_TASKS.map((t) => ({ ...t })));
    setGenerated(true);
    setLoading(false);
    toast.success("Tasks generated!", {
      description: `${MOCK_TASKS.length} tasks created from your project description.`,
    });
  }

  function handleAutoAssign() {
    setTasks((prev) =>
      prev.map((task, i) => ({ ...task, assigneeId: TEAM[i % TEAM.length].id }))
    );
    toast.success("Tasks auto-assigned!", {
      description: "Each task has been assigned based on roles.",
    });
  }

  function handleReset() {
    setGenerated(false);
    setDescription("");
    setTasks([]);
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-28 gap-5">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-[#FFD034]/20" />
          <div className="absolute inset-0 rounded-full border-4 border-[#FFD034] border-t-transparent animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Zap size={20} className="text-[#FFD034]" />
          </div>
        </div>
        <div className="text-center">
          <p className="font-bold text-[#25262B] text-lg">AI is splitting your tasks…</p>
          <p className="text-[#8B8B8B] text-sm mt-1">Analyzing scope, assigning priorities and estimates</p>
        </div>
      </div>
    );
  }

  if (!generated) {
    return (
      <div className="max-w-2xl flex flex-col gap-6">
        <form onSubmit={handleGenerate} className="flex flex-col gap-4">
          <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <label className="block text-sm font-semibold text-[#25262B] mb-3">
              Describe your project
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="We're building an AI-powered study assistant for university students. The app includes authentication, a personalized dashboard, AI chat interface, and performance analytics..."
              rows={5}
              className="w-full px-4 py-3 rounded-[16px] bg-[#F4F0EB] border border-[#E0D9D2] text-sm text-[#25262B] placeholder:text-[#C4C4C4] outline-none focus:ring-2 focus:ring-[#FFD034] resize-none transition"
            />
            <p className="text-[#8B8B8B] text-xs mt-2">
              Include features, tech stack, and team size for better task breakdown.
            </p>
          </div>

          <button
            type="submit"
            disabled={!description.trim()}
            className="self-start h-11 px-6 rounded-[99px] bg-[#FFD034] text-[#25262B] font-semibold text-sm flex items-center gap-2 hover:bg-[#FFD034]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Zap size={15} />
            Generate Tasks
          </button>
        </form>

        {/* Example prompts */}
        <div>
          <p className="text-xs font-semibold text-[#8B8B8B] uppercase tracking-wide mb-3">
            Try an example
          </p>
          <div className="flex flex-col gap-2">
            {EXAMPLE_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => setDescription(prompt)}
                className="text-left px-4 py-3 rounded-[16px] bg-white border border-[#E0D9D2] text-sm text-[#25262B] hover:border-[#FFD034] hover:bg-[#FFD034]/5 transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const totalHours = tasks.reduce((sum, t) => sum + t.estimatedHours, 0);
  const doneCount = tasks.filter((t) => t.status === "Done").length;

  return (
    <div className="flex flex-col gap-6">
      {/* Stats + actions bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div>
            <p className="text-2xl font-bold text-[#25262B]">{tasks.length}</p>
            <p className="text-[#8B8B8B] text-xs">Total tasks</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[#25262B]">{totalHours}h</p>
            <p className="text-[#8B8B8B] text-xs">Estimated</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-600">{doneCount}</p>
            <p className="text-[#8B8B8B] text-xs">Done</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleAutoAssign}
            className="h-9 px-4 rounded-[99px] bg-[#25262B] text-white text-sm font-medium flex items-center gap-2 hover:bg-[#25262B]/85 transition-colors"
          >
            <Users size={14} />
            Auto Assign
          </button>
          <button
            onClick={handleReset}
            className="h-9 px-4 rounded-[99px] border border-[#E0D9D2] text-[#8B8B8B] text-sm font-medium flex items-center gap-2 hover:text-[#25262B] hover:border-[#25262B] transition-colors"
          >
            <RotateCcw size={14} />
            Reset
          </button>
        </div>
      </div>

      <KanbanBoard tasks={tasks} onTasksChange={setTasks} />
    </div>
  );
}
