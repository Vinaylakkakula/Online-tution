"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import {
  ShieldCheck,
  LayoutDashboard,
  Users,
  UserCheck,
  BookOpen,
  CalendarDays,
  GraduationCap,
  Video,
  Radio,
  FileCheck2,
  FileText,
  CreditCard,
  Megaphone,
  BarChart3,
  KeyRound,
  Settings,
  LogOut,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface NavGroup {
  groupName: string;
  items: {
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }[];
}

const adminNavGroups: NavGroup[] = [
  {
    groupName: "Main",
    items: [
      { href: "/admin", label: "Master Overview", icon: LayoutDashboard },
    ],
  },
  {
    groupName: "Academics & Content",
    items: [
      { href: "/admin/courses", label: "Courses", icon: BookOpen },
      { href: "/admin/materials", label: "Study Materials", icon: FileText },
      { href: "/admin/live-classes", label: "Live Classes", icon: Radio, badge: "Live" },
      { href: "/admin/recorded-classes", label: "Recorded Lectures", icon: Video },
      { href: "/admin/tests", label: "Tests & CBT Exams", icon: FileCheck2 },
    ],
  },
  {
    groupName: "Students & Batches",
    items: [
      { href: "/admin/students", label: "Students", icon: Users, badge: "842" },
      { href: "/admin/batches", label: "Batches", icon: CalendarDays },
      { href: "/admin/enquiries", label: "Enquiries & Leads", icon: UserCheck, badge: "18 New" },
      { href: "/admin/faculty", label: "Faculty Mentors", icon: GraduationCap },
    ],
  },
  {
    groupName: "Communications & Reports",
    items: [
      { href: "/admin/announcements", label: "Announcements", icon: Megaphone },
      { href: "/admin/payments", label: "Payments & Revenue", icon: CreditCard },
      { href: "/admin/reports", label: "Reports & Analytics", icon: BarChart3 },
    ],
  },
];

export function AdminSidebar({
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
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen?.(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0B2545] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out border-r border-[#133E6E] shadow-2xl lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="h-16 flex items-center px-6 border-b border-white/10 gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#16A6A1] via-[#0099FF] to-[#EAF4FF] flex items-center justify-center text-[#0B2545] shadow-md font-black">
              <ShieldCheck className="w-5 h-5 text-[#0B2545]" />
            </div>
            <div>
              <span className="font-black text-sm tracking-tight text-white block">
                DeepSiddhi
              </span>
              <span className="text-[10px] text-amber-400 font-extrabold tracking-wider uppercase block">
                Admin Console
              </span>
            </div>
          </div>

          {/* Administrator Profile Card */}
          <div className="p-3.5 mx-3.5 my-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-[#16A6A1] flex items-center justify-center text-gray-950 font-black text-xs shrink-0 shadow-sm">
              {user?.full_name?.charAt(0) || "A"}
            </div>
            <div className="overflow-hidden">
              <h4 className="text-xs font-bold text-white truncate">
                {user?.full_name || "Academic Director"}
              </h4>
              <p className="text-[10px] text-amber-300 font-bold truncate">
                Super Admin Access
              </p>
            </div>
          </div>

          {/* Navigation Groups (Scrollable) */}
          <div className="overflow-y-auto max-h-[calc(100vh-250px)] px-3 py-1 space-y-4 text-xs scrollbar-none">
            {adminNavGroups.map((group) => (
              <div key={group.groupName} className="space-y-1">
                <span className="px-3 text-[10px] font-black text-white/40 uppercase tracking-wider block">
                  {group.groupName}
                </span>

                {group.items.map((item) => {
                  const isActive =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen?.(false)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl font-semibold transition-all ${
                        isActive
                          ? "bg-[#16A6A1] text-white shadow-md font-bold"
                          : "text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <item.icon
                          className={`w-4 h-4 ${
                            isActive ? "text-white" : "text-white/60"
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>

                      {item.badge && (
                        <Badge
                          className={`text-[9px] h-4 px-1.5 rounded-full font-bold ${
                            item.badge.includes("Live")
                              ? "bg-red-500 text-white animate-pulse"
                              : item.badge.includes("New")
                              ? "bg-amber-500 text-gray-950"
                              : "bg-white/15 text-white"
                          }`}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Footer: Preview Student Portal & Sign Out */}
        <div className="p-3 border-t border-white/10 space-y-1 bg-[#081B33]">
          <Link
            href="/dashboard"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-cyan-300 hover:bg-white/10 text-xs font-bold"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              <span>Student Portal View</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-cyan-300/60" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-red-300 hover:bg-red-500/20 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Admin</span>
          </button>
        </div>
      </aside>
    </>
  );
}
