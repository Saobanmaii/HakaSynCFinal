"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Users, Briefcase, Archive, LogOut } from "lucide-react";
import { useAuth } from "@/lib/authContext";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/feed", icon: Users, label: "Feed" },
  { href: "/workspace", icon: Briefcase, label: "Workspace" },
  { href: "/dashboard", icon: LayoutGrid, label: "Dashboard" },
  { href: "/archive", icon: Archive, label: "Archive" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="fixed left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3 bg-white rounded-[99px] px-3 py-5 shadow-floating">
      {/* Logo */}
      <Link href="/feed" className="w-10 h-10 rounded-full bg-[#25262B] flex items-center justify-center mb-2">
        <span className="text-[#FFD034] font-bold text-sm">H</span>
      </Link>

      {/* Nav items */}
      <nav className="flex flex-col gap-2">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              title={label}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                active
                  ? "bg-[#25262B] text-[#FFD034]"
                  : "text-[#8B8B8B] hover:bg-[#F4F0EB] hover:text-[#25262B]"
              )}
            >
              <Icon size={18} strokeWidth={1.8} />
            </Link>
          );
        })}
      </nav>

      {/* Spacer */}
      <div className="flex-1 min-h-4" />

      {/* Logout */}
      <button
        onClick={logout}
        title="Logout"
        className="w-10 h-10 rounded-full flex items-center justify-center text-[#8B8B8B] hover:bg-[#FF6B6B]/10 hover:text-[#FF6B6B] transition-colors"
      >
        <LogOut size={18} strokeWidth={1.8} />
      </button>

      {/* User avatar */}
      {user && (
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#FFD034]">
          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
        </div>
      )}
    </aside>
  );
}
