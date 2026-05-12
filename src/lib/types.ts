export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  major: string;
  role: string;
  bio: string;
  skills: string[];
  status: "Looking" | "Open" | "Busy";
  teamId?: string;
  github?: string;
  linkedin?: string;
  projects?: PortfolioEntry[];
}

export interface Team {
  id: string;
  name: string;
  description: string;
  members: User[];
  openRoles: string[];
  projectType: string;
  competitionId?: string;
}

export interface Competition {
  id: string;
  title: string;
  organizer: string;
  description: string;
  prize: string;
  deadline: string;
  category: string;
  tags: string[];
  participantsCount: number;
  registered: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  status: "Todo" | "In Progress" | "Done";
  assigneeId?: string;
  estimatedHours: number;
  role: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  action: string;
  target: string;
  timestamp: string;
}

export interface SlideContent {
  id: number;
  title: string;
  subtitle?: string;
  bullets: string[];
  type: "cover" | "overview" | "progress" | "team" | "conclusion";
}

export interface TimelineDay {
  date: string;
  dayLabel: string;
  tasks: {
    memberId: string;
    memberName: string;
    task: string;
    hours: number;
    timeSlot: string;
  }[];
}

export interface PortfolioEntry {
  id: string;
  projectTitle: string;
  role: string;
  duration: string;
  teamSize: number;
  description: string;
  achievements: string[];
  techStack: string[];
  skills: string[];
}

export interface TeamApplication {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userMajor: string;
  role: string;
  message: string;
  appliedAt: string;
  status: "Pending" | "Approved" | "Rejected";
}
