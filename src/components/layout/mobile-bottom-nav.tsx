"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  FileCheck2,
  Radio,
  FileText,
  ShieldCheck,
  Video,
} from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { useLMSData } from "@/lib/lms-store";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { liveClasses } = useLMSData();
  const hasLiveClass = liveClasses.some((l) => l.status === "live");

  const navItems = [
    {
      href: "/dashboard",
      label: "Home",
      icon: LayoutDashboard,
      active: pathname === "/dashboard",
    },
    {
      href: "/dashboard/my-courses",
      label: "Courses",
      icon: BookOpen,
      active: pathname.startsWith("/dashboard/my-courses"),
    },
    {
      href: "/dashboard/tests",
      label: "Tests",
      icon: FileCheck2,
      active: pathname.startsWith("/dashboard/tests"),
    },
    {
      href: "/dashboard/live-classes",
      label: "Live",
      icon: Radio,
      active: pathname.startsWith("/dashboard/live-classes"),
      isLive: hasLiveClass,
    },
    {
      href: "/dashboard/materials",
      label: "Materials",
      icon: FileText,
      active: pathname.startsWith("/dashboard/materials"),
    },
    {
      href: "/dashboard/recorded-classes",
      label: "Videos",
      icon: Video,
      active: pathname.startsWith("/dashboard/recorded-classes"),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200/90 lg:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around px-1 py-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative ${
                item.active
                  ? "text-[#004B87] font-black"
                  : "text-gray-500 hover:text-gray-800 font-medium"
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    item.active ? "scale-110 stroke-[2.5]" : "stroke-[1.8]"
                  }`}
                />
                {item.isLive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse ring-2 ring-white" />
                )}
              </div>
              <span
                className={`text-[10px] mt-0.5 tracking-tight ${
                  item.active ? "font-extrabold text-[#004B87]" : "text-gray-500"
                }`}
              >
                {item.label}
              </span>
              {item.active && (
                <span className="w-1 h-1 rounded-full bg-[#004B87] mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
