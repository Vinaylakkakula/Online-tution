"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  Menu,
  X,
  GraduationCap,
  ChevronDown,
  ShieldCheck,
  User,
  LogOut,
  LayoutDashboard,
  BookOpen,
  Settings,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  {
    href: "/courses",
    label: "Courses (6th–10th)",
    children: [
      { href: "/courses?class=Class+6", label: "Class 6th Junior Champs 🚀" },
      { href: "/courses?class=Class+7", label: "Class 7th Junior Prodigy 🦖" },
      { href: "/courses?class=Class+8", label: "Class 8th Foundation 🤖" },
      { href: "/courses?class=Class+9", label: "Class 9th Board Champions 🦉" },
      { href: "/courses?class=Class+10", label: "Class 10th Board Toppers 🥷" },
    ],
  },
  { href: "/courses#subjects", label: "Subjects" },
  { href: "/demo", label: "Free Demo (7-Day Trial) 🎁" },
  { href: "/pricing", label: "Monthly Pricing & Discounts" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { user, role, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-white/90 backdrop-blur-xs border-b border-gray-100/50"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#004B87] to-[#16A6A1] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black leading-tight text-[#004B87]">
                DeepSiddhi
              </span>
              <span className="text-[10px] font-bold text-[#16A6A1] tracking-wider uppercase -mt-0.5">
                Foundation
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() =>
                  link.children && setOpenDropdown(link.label)
                }
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-1",
                    pathname === link.href
                      ? "text-[#004B87] bg-[#EAF4FF]"
                      : "text-gray-700 hover:text-[#004B87] hover:bg-gray-50"
                  )}
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown className="w-3.5 h-3.5 opacity-50" />
                  )}
                </Link>

                {/* Dropdown */}
                {link.children && openDropdown === link.label && (
                  <div className="absolute top-full left-0 pt-2 animate-slide-down">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[180px]">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:text-[#004B87] hover:bg-[#EAF4FF] transition-colors font-medium"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTAs: User State Aware */}
          <div className="hidden lg:flex items-center gap-2.5">
            {isAuthenticated && user ? (
              <>
                {/* Admin Quick Jump if Admin */}
                {(role === "admin" || role === "super_admin") && (
                  <Link href="/admin">
                    <Button
                      size="sm"
                      className="h-9 px-3.5 bg-amber-500 hover:bg-amber-600 text-gray-950 font-black text-xs rounded-xl shadow-sm gap-1.5 border border-amber-400"
                    >
                      <ShieldCheck className="w-4 h-4 text-gray-950" />
                      <span>Admin Console</span>
                    </Button>
                  </Link>
                )}

                {/* Student Portal Jump */}
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 px-3.5 text-[#004B87] border-[#004B87]/30 hover:bg-[#EAF4FF] text-xs font-bold rounded-xl"
                  >
                    Student Portal
                  </Button>
                </Link>

                {/* Authenticated User Menu Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#004B87] to-[#16A6A1] text-white text-xs font-bold flex items-center justify-center">
                        {user.full_name?.charAt(0) || "U"}
                      </div>
                      <div className="text-left leading-none hidden xl:block">
                        <span className="text-xs font-bold text-gray-900 block truncate max-w-[110px]">
                          {user.full_name}
                        </span>
                        <span className="text-[10px] text-gray-500 capitalize">
                          {user.role}
                        </span>
                      </div>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 p-1.5 rounded-xl shadow-xl border border-gray-100">
                    <DropdownMenuLabel className="p-2">
                      <div className="font-bold text-xs text-gray-900">{user.full_name}</div>
                      <div className="text-[11px] text-gray-500 truncate">{user.email}</div>
                      <Badge className="mt-1 bg-blue-50 text-[#004B87] border border-blue-200 text-[10px] font-bold">
                        {user.role.toUpperCase()}
                      </Badge>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center gap-2 text-xs font-medium cursor-pointer p-2 rounded-lg">
                        <LayoutDashboard className="w-4 h-4 text-[#004B87]" />
                        <span>Student Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/my-courses" className="flex items-center gap-2 text-xs font-medium cursor-pointer p-2 rounded-lg">
                        <BookOpen className="w-4 h-4 text-emerald-600" />
                        <span>My Enrolled Courses</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/profile" className="flex items-center gap-2 text-xs font-medium cursor-pointer p-2 rounded-lg">
                        <User className="w-4 h-4 text-gray-600" />
                        <span>Profile & Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    {(role === "admin" || role === "super_admin") && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="flex items-center gap-2 text-xs font-bold text-amber-900 bg-amber-50 cursor-pointer p-2 rounded-lg">
                          <ShieldCheck className="w-4 h-4 text-amber-600" />
                          <span>Admin Control Center</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-xs font-bold text-red-600 cursor-pointer p-2 rounded-lg hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 text-red-600" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 px-3.5 text-[#004B87] border-[#004B87]/30 hover:bg-[#EAF4FF] text-xs font-bold rounded-xl"
                  >
                    Sign In
                  </Button>
                </Link>

                <Link href="/register">
                  <Button
                    size="sm"
                    className="h-9 px-4 bg-[#004B87] hover:bg-[#003866] text-white text-xs font-bold rounded-xl shadow-sm"
                  >
                    Register Free
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-gray-800" />
            ) : (
              <Menu className="w-5 h-5 text-gray-800" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-4 space-y-2 animate-slide-down">
            {/* Authenticated user banner on mobile */}
            {isAuthenticated && user && (
              <div className="mx-4 p-3 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#004B87] text-white font-bold text-xs flex items-center justify-center">
                    {user.full_name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <span className="font-bold text-xs text-gray-900 block">{user.full_name}</span>
                    <span className="text-[10px] text-gray-500 capitalize">{user.role}</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleLogout}
                  className="h-8 text-xs text-red-600 hover:bg-red-50 p-1"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            )}

            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "block px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors",
                    pathname === link.href
                      ? "text-[#004B87] bg-[#EAF4FF]"
                      : "text-gray-700 hover:text-[#004B87] hover:bg-gray-50"
                  )}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="ml-4 space-y-1 mt-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-xs text-gray-600 hover:text-[#004B87] hover:bg-[#EAF4FF] rounded-lg transition-colors font-medium"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-3 border-t border-gray-100 px-4 space-y-2">
              {(role === "admin" || role === "super_admin") && (
                <Link href="/admin" className="block">
                  <Button className="w-full bg-[#163B65] hover:bg-[#122e50] text-white font-bold text-xs rounded-xl shadow-xs gap-1.5 h-10">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Admin Console</span>
                  </Button>
                </Link>
              )}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full text-xs font-bold text-[#004B87] border-gray-200 h-10 rounded-xl">
                    Student Portal
                  </Button>
                </Link>
                {isAuthenticated ? (
                  <Button
                    onClick={handleLogout}
                    className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold h-10 rounded-xl"
                  >
                    Sign Out
                  </Button>
                ) : (
                  <Link href="/login">
                    <Button className="w-full bg-[#004B87] text-white text-xs font-bold h-10 rounded-xl">
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
