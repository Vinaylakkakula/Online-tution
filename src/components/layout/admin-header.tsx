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
    <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8">
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
          <span className="text-xs font-bold px-2.5 py-1 bg-amber-50 text-amber-800 rounded-lg border border-amber-200">
            Control Center
          </span>
          <span className="hidden sm:inline-block text-xs text-gray-500">
            DeepSiddhi Academic Engine
          </span>
        </div>
      </div>

      {/* Middle: Universal Search */}
      <div className="hidden md:block flex-1 max-w-md mx-6">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search student name, batch, course ID, or test..."
            className="pl-9 h-9 text-xs bg-gray-50 border-gray-200 rounded-xl focus:bg-white"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard" className="hidden sm:inline-block">
          <Button variant="outline" size="sm" className="h-9 text-xs gap-1.5 border-teal-300 text-teal-800 hover:bg-teal-50 rounded-xl">
            <ExternalLink className="w-3.5 h-3.5" />
            Switch to Student View
          </Button>
        </Link>

        {/* Live Broadcast trigger */}
        <Link href="/admin/live-classes" className="relative p-2 text-red-600 hover:bg-red-50 rounded-xl">
          <Radio className="w-5 h-5 animate-pulse" />
        </Link>

        {/* Admin Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#163B65] to-amber-600 text-white text-xs font-bold flex items-center justify-center shadow-xs">
                {user?.full_name?.charAt(0) || "A"}
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500 hidden sm:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl shadow-xl">
            <DropdownMenuLabel className="p-2">
              <p className="text-xs font-bold text-gray-900">{user?.full_name || "Academic Director"}</p>
              <p className="text-[11px] text-amber-700 font-semibold">Super Administrator</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/admin/settings" className="flex items-center gap-2 text-xs py-2 cursor-pointer">
                <Settings className="w-4 h-4 text-gray-500" />
                System Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard" className="flex items-center gap-2 text-xs py-2 cursor-pointer">
                <ExternalLink className="w-4 h-4 text-teal-600" />
                Student Portal
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
