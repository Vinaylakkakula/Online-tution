"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import {
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  Video,
  Radio,
  Calendar,
  FileCheck2,
  FileText,
  BarChart3,
  Trophy,
  Users,
  Bell,
  User,
  HelpCircle,
  LogOut,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/my-courses", label: "My Courses", icon: BookOpen },
  { href: "/dashboard/recorded-classes", label: "Recorded Classes", icon: Video },
  { href: "/dashboard/live-classes", label: "Live Classes", icon: Radio, live: true },
  { href: "/dashboard/upcoming-classes", label: "Upcoming Classes", icon: Calendar },
  { href: "/dashboard/tests", label: "Tests & Assignments", icon: FileCheck2 },
  { href: "/dashboard/materials", label: "Study Materials", icon: FileText },
  { href: "/dashboard/progress", label: "Learning Progress", icon: BarChart3 },
  { href: "/dashboard/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/dashboard/community", label: "Community", icon: Users },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell, badge: "3" },
  { href: "/dashboard/profile", label: "My Profile", icon: User },
  { href: "/dashboard/support", label: "Help & Support", icon: HelpCircle },
];

export function StudentSidebar({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen?.(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#163B65] text-white flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-white/10 gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#16A6A1] to-[#EAF4FF] flex items-center justify-center text-[#163B65] shadow-md font-bold">
            <GraduationCap className="w-5 h-5 text-[#163B65]" />
          </div>
          <div>
            <span className="font-bold text-sm tracking-wide block">DeepSiddhi</span>
            <span className="text-[10px] text-[#16A6A1] font-semibold tracking-wider uppercase block">
              Student Portal
            </span>
          </div>
        </div>

        {/* User Card */}
        <div className="p-4 mx-3 my-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#16A6A1] to-[#243247] flex items-center justify-center text-white font-bold text-sm shrink-0">
            {user?.full_name?.charAt(0) || "S"}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-semibold text-white truncate">
              {user?.full_name || "Enrolled Student"}
            </h4>
            <p className="text-[10px] text-white/60 truncate">
              {user?.class_level || "Class 11"} • {user?.role || "Student"}
            </p>
          </div>
        </div>

        {/* Navigation Items (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 text-xs">
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen?.(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                  isActive
                    ? "bg-[#16A6A1] text-white shadow-sm font-semibold"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    className={`w-4 h-4 ${
                      isActive ? "text-white" : "text-white/70"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.live && (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                  )}
                  {item.badge && (
                    <Badge className="bg-red-500 text-white text-[10px] h-4 px-1.5 rounded-full font-bold">
                      {item.badge}
                    </Badge>
                  )}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/70" />}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Admin Quick Switch (if applicable) & Logout */}
        <div className="p-3 border-t border-white/10 space-y-1">
          {(user?.role === "admin" || user?.role === "super_admin" || user?.role === "faculty") && (
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-amber-300 hover:bg-white/10 text-xs font-semibold"
            >
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Switch to Admin Panel</span>
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-red-300 hover:bg-red-500/20 text-xs font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
