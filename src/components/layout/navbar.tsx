"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Menu,
  X,
  GraduationCap,
  ChevronDown,
  ShieldCheck,
  User,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  {
    href: "/courses",
    label: "Courses",
    children: [
      { href: "/courses?category=IIT-JEE", label: "IIT-JEE" },
      { href: "/courses?category=Olympiad", label: "Olympiad" },
      { href: "/courses?category=NTSE", label: "NTSE" },
      { href: "/courses?category=Foundation", label: "Foundation" },
    ],
  },
  { href: "/faculty", label: "Faculty" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

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

          {/* Desktop CTAs: Student Portal, Admin Panel, Login */}
          <div className="hidden lg:flex items-center gap-2.5">
            <Link href="/admin">
              <Button
                size="sm"
                className="h-9 px-3.5 bg-amber-500 hover:bg-amber-600 text-gray-950 font-black text-xs rounded-xl shadow-sm gap-1.5 border border-amber-400"
              >
                <ShieldCheck className="w-4 h-4 text-gray-950" />
                <span>Admin Panel</span>
              </Button>
            </Link>

            <Link href="/dashboard">
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-3.5 text-[#004B87] border-[#004B87]/30 hover:bg-[#EAF4FF] text-xs font-bold rounded-xl"
              >
                Student Portal
              </Button>
            </Link>

            <Link href="/login">
              <Button
                size="sm"
                className="h-9 px-4 bg-[#004B87] hover:bg-[#003866] text-white text-xs font-bold rounded-xl shadow-sm"
              >
                Sign In
              </Button>
            </Link>
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
              <Link href="/admin" className="block">
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-gray-950 font-black text-xs rounded-xl shadow-xs gap-1.5 h-10">
                  <ShieldCheck className="w-4 h-4 text-gray-950" />
                  <span>Open Admin Panel</span>
                </Button>
              </Link>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full text-xs font-bold text-[#004B87] border-gray-200 h-10 rounded-xl">
                    Student Portal
                  </Button>
                </Link>
                <Link href="/login">
                  <Button className="w-full bg-[#004B87] text-white text-xs font-bold h-10 rounded-xl">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
