"use client";

import { useAuth } from "@/context/auth-context";
import {
  Bell,
  Search,
  Menu,
  ShieldCheck,
  Radio,
  ExternalLink,
  ChevronDown,
  User,
  LogOut,
  Settings,
  Sparkles,
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

export function AdminHeader({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-2xs">
      {/* Left: Mobile Menu & Environment Badge */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-black px-3 py-1 bg-amber-50 text-amber-900 rounded-lg border border-amber-200/80 shadow-2xs flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            Control Center
          </span>
          <span className="hidden sm:inline-block text-xs font-medium text-gray-500">
            DeepSiddhi Academic Engine
          </span>
        </div>
      </div>

      {/* Middle: Universal Search */}
      <div className="hidden md:block flex-1 max-w-md mx-6">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search student, batch, course ID, or test..."
            className="pl-10 h-9.5 text-xs bg-gray-50/90 hover:bg-white focus:bg-white border-gray-200 rounded-full transition-all focus:ring-1 focus:ring-[#004B87]"
          />
        </div>
      </div>

      {/* Right Controls: Switch to Student Portal, Live indicator, User */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <Link href="/dashboard" className="inline-block">
          <Button
            size="sm"
            className="h-8.5 sm:h-9 text-xs font-bold gap-1.5 bg-[#004B87] hover:bg-[#003866] text-white rounded-xl shadow-xs px-2.5 sm:px-3.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Switch to Student Portal</span>
            <span className="sm:hidden">Student</span>
          </Button>
        </Link>

        {/* Live Broadcast trigger */}
        <Link
          href="/admin/live-classes"
          className="relative p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          title="Live Sessions"
        >
          <Radio className="w-5 h-5 animate-pulse" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </Link>

        {/* Admin Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#004B87] to-[#16A6A1] text-white text-xs font-black flex items-center justify-center shadow-xs">
                {user?.full_name?.charAt(0) || "A"}
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500 hidden sm:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl shadow-xl border border-gray-100">
            <DropdownMenuLabel className="p-2">
              <p className="text-xs font-bold text-gray-900">{user?.full_name || "Academic Director"}</p>
              <p className="text-[11px] text-amber-700 font-bold">Super Administrator</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard" className="flex items-center gap-2 text-xs py-2 cursor-pointer font-bold text-[#004B87]">
                <ExternalLink className="w-4 h-4 text-[#004B87]" />
                Student Portal View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/courses" className="flex items-center gap-2 text-xs py-2 cursor-pointer">
                Manage Courses
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/materials" className="flex items-center gap-2 text-xs py-2 cursor-pointer">
                Upload Materials
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="text-red-600 flex items-center gap-2 text-xs py-2 cursor-pointer font-medium"
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
