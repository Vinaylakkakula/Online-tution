"use client";

import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import {
  Bell,
  Search,
  Menu,
  ChevronDown,
  User,
  LogOut,
  Sparkles,
  BookOpen,
  ShoppingBag,
  ShieldCheck,
  LayoutDashboard,
  Radio,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  const { user, role, logout } = useAuth();
  const router = useRouter();
  const [selectedExamCategory, setSelectedExamCategory] = useState("IIT-JEE & Foundation");

  const handleAdminClick = () => {
    router.push("/admin");
  };

  const displayName = user?.full_name || "Student Learner";
  const displayEmail = user?.email || "student@deepsiddhi.org";

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200/80 shadow-xs">
      <div className="h-16 px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle + Category Dropdown (Oliveboard Style) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Oliveboard-Style Category Selector Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300 bg-gray-50/80 hover:bg-white text-xs font-bold text-gray-800 transition-all shadow-2xs">
                <span>{selectedExamCategory}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-52 p-1.5 rounded-xl shadow-lg border border-gray-100">
              <DropdownMenuItem
                onClick={() => setSelectedExamCategory("IIT-JEE & Foundation")}
                className="text-xs font-medium cursor-pointer rounded-lg py-2"
              >
                IIT-JEE & Foundation
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSelectedExamCategory("Olympiad (Classes 6-12)")}
                className="text-xs font-medium cursor-pointer rounded-lg py-2"
              >
                Olympiad (Classes 6-12)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSelectedExamCategory("NTSE & Scholarship")}
                className="text-xs font-medium cursor-pointer rounded-lg py-2"
              >
                NTSE & Scholarship
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSelectedExamCategory("Class 6 - 10 Foundation")}
                className="text-xs font-medium cursor-pointer rounded-lg py-2"
              >
                Class 6 - 10 Foundation
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Real-time Sync Indicator Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Sync Active</span>
          </div>
        </div>

        {/* Center: Search Bar (Rounded Pill like Oliveboard) */}
        <div className="flex-1 max-w-lg hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Search courses, exams, tests or study materials..."
              className="pl-10 pr-4 h-9.5 text-xs bg-gray-50/90 hover:bg-white focus:bg-white border-gray-200 rounded-full transition-all focus:ring-1 focus:ring-[#004B87] shadow-inner"
            />
          </div>
        </div>

        {/* Right: Direct Admin Panel Button + Buy Now + Profile */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Celebrating banner badge */}
          <Link
            href="/courses"
            className="hidden xl:flex items-center gap-1.5 bg-[#D32F2F] hover:bg-[#B71C1C] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Celebrating Excellence</span>
            <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] font-mono">
              Offer
            </span>
          </Link>

          {/* Admin Panel Access Button */}
          <button
            onClick={handleAdminClick}
            className="h-8.5 px-2.5 sm:px-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-gray-950 font-black text-xs rounded-lg shadow-sm gap-1.5 border border-amber-400 flex items-center cursor-pointer transition-transform active:scale-95 shrink-0"
            title="Open Admin Management Portal"
          >
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-950 shrink-0" />
            <span className="hidden xs:inline">Admin Panel</span>
            <span className="inline xs:hidden">Admin</span>
          </button>

          {/* Explore Courses Button */}
          <Link href="/courses" className="hidden sm:inline-block">
            <Button
              size="sm"
              variant="outline"
              className="h-8.5 px-3 text-[#004B87] border-[#004B87]/30 hover:bg-[#EAF4FF] text-xs font-bold rounded-lg shadow-2xs"
            >
              <ShoppingBag className="w-3.5 h-3.5 mr-1" />
              <span>Courses</span>
            </Button>
          </Link>

          {/* Notifications */}
          <Link
            href="/dashboard/notifications"
            className="relative p-2 text-gray-600 hover:text-[#004B87] rounded-full hover:bg-gray-100 transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </Link>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-[#004B87]/20 transition-all">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#004B87] to-[#16A6A1] text-white text-xs font-bold flex items-center justify-center shadow-xs">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl shadow-xl border border-gray-100">
              <DropdownMenuLabel className="p-2">
                <p className="text-xs font-bold text-gray-900 truncate">
                  {displayName}
                </p>
                <p className="text-[11px] text-gray-500 truncate">
                  {displayEmail}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-700 rounded-md">
                    {user?.class_level || "Class 11"}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-blue-50 text-blue-700 rounded-md capitalize">
                    {user?.role || "Student"}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="flex items-center gap-2 text-xs py-2 cursor-pointer">
                  <LayoutDashboard className="w-4 h-4 text-gray-500" />
                  Student Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/my-courses" className="flex items-center gap-2 text-xs py-2 cursor-pointer">
                  <BookOpen className="w-4 h-4 text-gray-500" />
                  My Enrolled Courses
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile" className="flex items-center gap-2 text-xs py-2 cursor-pointer">
                  <User className="w-4 h-4 text-gray-500" />
                  My Profile & Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleAdminClick}
                className="flex items-center gap-2 text-xs py-2 cursor-pointer font-bold text-[#004B87]"
              >
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                Open Admin Console
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
      </div>
    </header>
  );
}
