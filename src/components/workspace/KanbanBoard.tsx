"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  useDroppable,
  useDraggable,
  closestCenter,
} from "@dnd-kit/core";
import type { Task } from "@/lib/types";
import { CURRENT_USER, MOCK_MEMBERS } from "@/lib/mockData";

const TEAM_MAP: Record<string, { id: string; name: string; avatar: string }> = {
  [CURRENT_USER.id]: CURRENT_USER,
  [MOCK_MEMBERS[0].id]: MOCK_MEMBERS[0],
  [MOCK_MEMBERS[1].id]: MOCK_MEMBERS[1],
  [MOCK_MEMBERS[2].id]: MOCK_MEMBERS[2],
  [MOCK_MEMBERS[3].id]: MOCK_MEMBERS[3],
};

const PRIORITY_STYLE: Record<Task["priority"], string> = {
  High: "bg-[#FF6B6B]/15 text-[#C93B3B]",
  Medium: "bg-[#FFD034]/25 text-[#7A6000]",
  Low: "bg-gray-100 text-gray-500",
};

const COLUMNS: { status: Task["status"]; dot: string; countCls: string }[] = [
  { status: "Todo", dot: "bg-gray-400", countCls: "bg-gray-100 text-gray-600" },
  { status: "In Progress", dot: "bg-[#FFD034]", countCls: "bg-[#FFD034]/20 text-[#7A6000]" },
  { status: "Done", dot: "bg-emerald-500", countCls: "bg-emerald-100 text-emerald-700" },
];

interface TaskCardProps {
  task: Task;
  overlay?: boolean;
}

function TaskCard({ task, overlay = false }: TaskCardProps) {
  const assignee = task.assigneeId ? TEAM_MAP[task.assigneeId] : null;
  return (
    <div
      className={`bg-white rounded-[16px] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.06)] select-none ${
        overlay ? "rotate-2 scale-[1.03] shadow-[0_12px_40px_rgba(0,0,0,0.18)]" : ""
      }`}
    >
      <p className="text-[#25262B] text-sm font-semibold leading-snug mb-3">{task.title}</p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-[99px] ${PRIORITY_STYLE[task.priority]}`}>
          {task.priority}
        </span>
        <span className="text-[11px] font-medium px-2 py-0.5 rounded-[99px] bg-[#F4F0EB] text-[#25262B]">
          {task.role}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[#8B8B8B] text-xs">{task.estimatedHours}h estimated</span>
        {assignee ? (
          <img
            src={assignee.avatar}
            alt={assignee.name}
            title={assignee.name}
            className="w-6 h-6 rounded-full bg-[#F4F0EB]"
          />
        ) : (
          <div className="w-6 h-6 rounded-full bg-[#F4F0EB] border-2 border-dashed border-[#C4C4C4]" />
        )}
      </div>
    </div>
  );
}

function DraggableCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined}
      className={`cursor-grab active:cursor-grabbing touch-none ${isDragging ? "opacity-30" : ""}`}
    >
      <TaskCard task={task} />
    </div>
  );
}

interface ColumnProps {
  status: Task["status"];
  dot: string;
  countCls: string;
  tasks: Task[];
}

function KanbanColumn({ status, dot, countCls, tasks }: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div className="flex flex-col min-w-0">
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-2 h-2 rounded-full ${dot}`} />
        <span className="font-semibold text-[#25262B] text-sm">{status}</span>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-[99px] ${countCls}`}>
          {tasks.length}
        </span>
      </div>

      <div
        ref={setNodeRef}
        className={`flex flex-col gap-3 min-h-[200px] p-3 rounded-[20px] transition-colors ${
          isOver
            ? "bg-[#FFD034]/15 ring-2 ring-[#FFD034]/50"
            : "bg-[#F4F0EB]/60"
        }`}
      >
        {tasks.map((task) => (
          <DraggableCard key={task.id} task={task} />
        ))}
        {tasks.length === 0 && (
          <div className="flex-1 flex items-center justify-center min-h-[120px]">
            <p className="text-[#C4C4C4] text-xs">Drop tasks here</p>
          </div>
        )}
      </div>
    </div>
  );
}

interface Props {
  tasks: Task[];
  onTasksChange: (tasks: Task[]) => void;
}

export default function KanbanBoard({ tasks, onTasksChange }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeTask = activeId ? tasks.find((t) => t.id === activeId) ?? null : null;

  function handleDragStart(e: DragStartEvent) {
    setActiveId(e.active.id as string);
  }

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    setActiveId(null);
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];
    if (!COLUMNS.some((c) => c.status === newStatus)) return;

    onTasksChange(
      tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {COLUMNS.map((col) => (
          <KanbanColumn
            key={col.status}
            {...col}
            tasks={tasks.filter((t) => t.status === col.status)}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask && <TaskCard task={activeTask} overlay />}
      </DragOverlay>
    </DndContext>
  );
}
