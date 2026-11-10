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
  FolderTree,
  ListTree,
  CalendarDays,
  GraduationCap,
  Video,
  Radio,
  Calendar,
  FileCheck2,
  FileText,
  UploadCloud,
  CreditCard,
  Megaphone,
  Bell,
  MessageSquare,
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
      { href: "/admin", label: "Overview", icon: LayoutDashboard },
    ],
  },
  {
    groupName: "Students & Leads",
    items: [
      { href: "/admin/students", label: "Students", icon: Users, badge: "842" },
      { href: "/admin/enquiries", label: "Student Enquiries", icon: UserCheck, badge: "18 New" },
    ],
  },
  {
    groupName: "Academics & Batches",
    items: [
      { href: "/admin/courses", label: "Courses", icon: BookOpen },
      { href: "/admin/batches", label: "Batches", icon: CalendarDays },
      { href: "/admin/faculty", label: "Faculty", icon: GraduationCap },
    ],
  },
  {
    groupName: "Class Delivery",
    items: [
      { href: "/admin/live-classes", label: "Live Classes", icon: Radio, badge: "Live" },
      { href: "/admin/recorded-classes", label: "Recorded Classes", icon: Video },
    ],
  },
  {
    groupName: "Assessment & Materials",
    items: [
      { href: "/admin/tests", label: "Tests & Examinations", icon: FileCheck2 },
      { href: "/admin/materials", label: "Study Materials", icon: FileText },
    ],
  },
  {
    groupName: "Finance & Operations",
    items: [
      { href: "/admin/payments", label: "Payments & Revenue", icon: CreditCard },
      { href: "/admin/announcements", label: "Announcements", icon: Megaphone },
      { href: "/admin/reports", label: "Reports & Analytics", icon: BarChart3 },
    ],
  },
  {
    groupName: "Administration",
    items: [
      { href: "/admin/roles", label: "Roles & Permissions", icon: KeyRound },
      { href: "/admin/settings", label: "Website Settings", icon: Settings },
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
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0d233d] text-white flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Banner */}
        <div className="h-16 flex items-center px-6 border-b border-white/10 gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#16A6A1] to-[#EAF4FF] flex items-center justify-center text-[#163B65] shadow-md font-bold">
            <ShieldCheck className="w-5 h-5 text-[#163B65]" />
          </div>
          <div>
            <span className="font-bold text-sm tracking-wide block">DeepSiddhi</span>
            <span className="text-[10px] text-amber-400 font-semibold tracking-wider uppercase block">
              Admin Console
            </span>
          </div>
        </div>

        {/* Administrator Profile Card */}
        <div className="p-3.5 mx-3 my-2.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
            {user?.full_name?.charAt(0) || "A"}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-semibold text-white truncate">
              {user?.full_name || "Academic Director"}
            </h4>
            <p className="text-[10px] text-amber-300 font-semibold truncate">
              Super Admin Access
            </p>
          </div>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-4 text-xs">
          {adminNavGroups.map((group) => (
            <div key={group.groupName} className="space-y-1">
              <span className="px-3 text-[10px] font-bold text-white/40 uppercase tracking-wider block">
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
                    className={`flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all ${
                      isActive
                        ? "bg-[#16A6A1] text-white shadow-sm font-semibold"
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
                        className={`text-[10px] h-4 px-1.5 rounded-full font-bold ${
                          item.badge.includes("Live")
                            ? "bg-red-500 text-white"
                            : item.badge.includes("New")
                            ? "bg-amber-500 text-white"
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

        {/* Footer with switch to Student view and Logout */}
        <div className="p-3 border-t border-white/10 space-y-1">
          <Link
            href="/dashboard"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-teal-300 hover:bg-white/10 text-xs font-semibold"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              <span>Student Portal View</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-teal-300/60" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-red-300 hover:bg-red-500/20 text-xs font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Admin</span>
          </button>
        </div>
      </aside>
    </>
  );
}
