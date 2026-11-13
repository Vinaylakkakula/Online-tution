"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import {
  LayoutDashboard,
  BookOpen,
  FileCheck2,
  Users2,
  Bookmark,
  CreditCard,
  Radio,
  Video,
  FileText,
  BarChart3,
  Trophy,
  Users,
  Bell,
  User,
  HelpCircle,
  LogOut,
  ShieldCheck,
  Sparkles,
  FolderOpen,
  CalendarDays,
  Calendar,
  Star,
} from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  isLive?: boolean;
}

const mainNavItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/subfolders", label: "Subfolders", icon: FolderOpen },
  { href: "/dashboard/my-courses", label: "Courses", icon: BookOpen },
  { href: "/dashboard/bookmarks", label: "Bookmarks", icon: Bookmark },
  { href: "/dashboard/live-classes", label: "Live", icon: Radio, isLive: true },
  { href: "/dashboard/recorded-classes", label: "Recorded", icon: Video },
  { href: "/dashboard/attendance", label: "Attendance", icon: CalendarDays },
  { href: "/dashboard/performance", label: "Report Card", icon: Trophy },
  { href: "/dashboard/calendar", label: "Calendar", icon: Calendar },
  { href: "/dashboard/feedback", label: "Reviews", icon: Star },
  { href: "/dashboard/tests", label: "Tests", icon: FileCheck2 },
  { href: "/dashboard/materials", label: "Materials", icon: FileText },
  { href: "/dashboard/notifications", label: "Alerts", icon: Bell, badge: "3" },
  { href: "/dashboard/support", label: "Help & FAQ", icon: HelpCircle },
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
  const { user, loginWithDemo, logout } = useAuth();

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
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Clean Modern Professional Light Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-24 sm:w-28 lg:w-28 bg-white text-gray-700 flex flex-col justify-between transition-transform duration-300 ease-in-out border-r border-gray-200/90 shadow-sm lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top: Logo */}
        <div className="flex flex-col items-center pt-4 pb-3 border-b border-gray-100 px-2 text-center bg-gray-50/40">
          <Link
            href="/dashboard"
            onClick={() => setMobileOpen?.(false)}
            className="flex flex-col items-center group"
          >
            {/* Gradient Logo Icon */}
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#16A6A1] via-[#004B87] to-[#0099FF] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform p-0.5">
              <div className="w-full h-full bg-[#163B65] rounded-[14px] flex items-center justify-center">
                <span className="font-black text-white text-base tracking-tighter">DS</span>
              </div>
            </div>
            <span className="text-[11px] font-extrabold text-[#163B65] mt-1.5 tracking-tight leading-none">
              DeepSiddhi
            </span>
            <span className="text-[9px] font-bold text-[#16A6A1] tracking-wider uppercase mt-0.5">
              LMS Portal
            </span>
          </Link>
        </div>

        {/* Middle Navigation - Stack of Icon + Label Buttons */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1 scrollbar-none flex flex-col items-center">
          {mainNavItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen?.(false)}
                className={`w-full py-2.5 px-1 rounded-xl flex flex-col items-center justify-center text-center transition-all group relative ${
                  isActive
                    ? "bg-[#EAF4FF] text-[#004B87] font-bold shadow-2xs border border-blue-200/80"
                    : "text-gray-600 hover:bg-gray-100/80 hover:text-gray-950 font-medium"
                }`}
              >
                {/* Live pulsing dot */}
                {item.isLive && (
                  <span className="absolute top-1.5 right-2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                )}

                {/* Badge count */}
                {item.badge && !isActive && (
                  <span className="absolute top-1 right-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                    {item.badge}
                  </span>
                )}

                <item.icon
                  className={`w-5 h-5 mb-1 transition-transform group-hover:scale-110 ${
                    isActive ? "text-[#004B87]" : "text-gray-500 group-hover:text-gray-900"
                  }`}
                />
                <span className="text-[10px] leading-tight line-clamp-1">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Bottom Actions: Profile, Logout */}
        <div className="p-2 border-t border-gray-100 space-y-1 flex flex-col items-center w-full bg-gray-50/40">
          <Link
            href="/dashboard/profile"
            onClick={() => setMobileOpen?.(false)}
            className="w-full py-2 rounded-xl text-gray-600 hover:bg-gray-200/60 hover:text-gray-900 flex flex-col items-center text-[10px] font-medium transition-colors"
          >
            <User className="w-4 h-4 mb-0.5 text-gray-500" />
            <span>Profile</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full py-2 rounded-xl text-red-600 hover:bg-red-50 flex flex-col items-center text-[10px] font-medium transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 mb-0.5 text-red-500" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
