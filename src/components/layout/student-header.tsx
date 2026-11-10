"use client";

import { useAuth } from "@/context/auth-context";
import {
  Bell,
  Search,
  Menu,
  Radio,
  BookOpen,
  Calendar,
  Sparkles,
  ChevronDown,
  User,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function StudentHeader({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      {/* Left: Mobile Menu Button + Quick Info */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden md:flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 bg-[#EAF4FF] text-[#163B65] rounded-lg">
            Batch: Pratham 2026
          </span>
          <span className="text-xs text-gray-500">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Middle: Search bar */}
      <div className="hidden sm:block flex-1 max-w-md mx-4">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search lessons, tests, faculty notes..."
            className="pl-9 h-9 text-xs bg-gray-50 border-gray-200 rounded-xl focus:bg-white"
          />
        </div>
      </div>

      {/* Right: Live Notification + Bell + Profile */}
      <div className="flex items-center gap-3">
        {/* Live Class alert badge */}
        <Link href="/dashboard/live-classes" className="hidden sm:flex">
          <div className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-full border border-red-200 text-xs font-semibold cursor-pointer transition-colors">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>Physics Live (Join Now)</span>
          </div>
        </Link>

        {/* Notifications */}
        <Link href="/dashboard/notifications" className="relative p-2 text-gray-600 hover:text-[#163B65] rounded-xl hover:bg-gray-100">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </Link>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#163B65] to-[#16A6A1] text-white text-xs font-bold flex items-center justify-center">
                {user?.full_name?.charAt(0) || "A"}
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500 hidden sm:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl shadow-xl">
            <DropdownMenuLabel className="p-2">
              <p className="text-xs font-bold text-gray-900">{user?.full_name || "Student"}</p>
              <p className="text-[11px] text-gray-500 truncate">{user?.email || "student@deepsiddhi.org"}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile" className="flex items-center gap-2 text-xs py-2 cursor-pointer">
                <User className="w-4 h-4 text-gray-500" />
                My Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/my-courses" className="flex items-center gap-2 text-xs py-2 cursor-pointer">
                <BookOpen className="w-4 h-4 text-gray-500" />
                My Enrolled Courses
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="text-red-600 flex items-center gap-2 text-xs py-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
