"use client";

import Link from "next/link";
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Sparkles,
  BookOpen,
  FolderOpen,
  ShieldCheck,
  Heart,
} from "lucide-react";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

const footerLinks = {
  classes: [
    { href: "/courses?class=Class+6", label: "Class 6th Junior Champs 🚀" },
    { href: "/courses?class=Class+7", label: "Class 7th Junior Prodigy 🦖" },
    { href: "/courses?class=Class+8", label: "Class 8th Foundation 🤖" },
    { href: "/courses?class=Class+9", label: "Class 9th Board Champions 🦉" },
    { href: "/courses?class=Class+10", label: "Class 10th Board Toppers 🥷" },
  ],
  subjects: [
    { href: "/courses#subjects", label: "Mathematics & Logic 📐" },
    { href: "/courses#subjects", label: "General Science (Phy/Chem/Bio) 🔬" },
    { href: "/courses#subjects", label: "English Grammar & Reading 📖" },
    { href: "/courses#subjects", label: "Social Science & Civics 🌍" },
    { href: "/courses#subjects", label: "Chapter & Video Subfolders 📁" },
  ],
  features: [
    { href: "/demo", label: "7-Day Free Trial (No Card) 🎁" },
    { href: "/pricing", label: "Monthly Pricing & Coupons 🏷️" },
    { href: "/dashboard/subfolders", label: "Interactive Subfolder Explorer 📂" },
    { href: "/about", label: "About DeepSiddhi Foundation" },
    { href: "/contact", label: "Contact Us & Support" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/honor-code", label: "Student Honor Code" },
    { href: "/refund", label: "7-Day Refund Policy" },
  ],
};

const socialLinks = [
  { href: "#", icon: FacebookIcon, label: "Facebook" },
  { href: "#", icon: TwitterIcon, label: "Twitter" },
  { href: "#", icon: InstagramIcon, label: "Instagram" },
  { href: "#", icon: YoutubeIcon, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-[#102C50] text-white">
      {/* Pre-Footer Action Card */}
      <div className="bg-gradient-to-r from-[#1769AA] via-[#0284C7] to-[#102C50] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-cyan-200 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Loved by 50,000+ Young Scholars & Parents</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Start Your 7-Day Free Trial Today!
              </h3>
              <p className="text-white/80 text-sm mt-1 max-w-xl font-normal">
                No credit card required. Experience chapter-wise video classes, interactive subfolders, quizzes, and cartoon avatars.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 bg-[#FFD447] text-slate-950 font-black px-6 py-3.5 rounded-xl hover:bg-amber-300 transition-all shadow-lg hover:scale-105 text-sm"
              >
                <span>Claim Free Demo 🎁</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3.5 rounded-xl transition-all border border-white/20 text-sm"
              >
                <span>Browse Classes 6-10</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#38D9E6] to-[#1769AA] flex items-center justify-center shadow-md">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black leading-tight text-white tracking-tight">
                  DeepSiddhi
                </span>
                <span className="text-[10px] font-bold text-[#38D9E6] tracking-wider uppercase -mt-0.5">
                  Foundation • Classes 6-10
                </span>
              </div>
            </Link>
            <p className="mt-4 text-white/70 text-sm leading-relaxed max-w-sm font-normal">
              DeepSiddhi Foundation makes learning an exciting adventure for Classes 6th to 10th. Combining structured curriculum with animated videos, chapter subfolders, quizzes, and friendly cartoon mentors.
            </p>

            <div className="mt-6 space-y-2.5 text-sm text-white/75 font-normal">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#38D9E6]" />
                <span>+91 98765 43210 (Toll Free Demo Line)</span>
              </a>
              <a
                href="mailto:learn@deepsiddhi.org"
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-[#38D9E6]" />
                <span>learn@deepsiddhi.org</span>
              </a>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#38D9E6] mt-0.5 shrink-0" />
                <span>DeepSiddhi Learning Hub, New Delhi, India</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((s, i) => {
                const Icon = s.icon;
                return (
                  <a
                    key={i}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#1769AA] text-white flex items-center justify-center transition-all hover:scale-110"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Classes Column */}
          <div>
            <h4 className="text-xs font-black text-[#38D9E6] uppercase tracking-wider mb-4">
              Classes 6th to 10th
            </h4>
            <ul className="space-y-2.5 text-sm">
              {footerLinks.classes.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subjects Column */}
          <div>
            <h4 className="text-xs font-black text-[#38D9E6] uppercase tracking-wider mb-4">
              Subjects & Folders
            </h4>
            <ul className="space-y-2.5 text-sm">
              {footerLinks.subjects.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform & Legal */}
          <div>
            <h4 className="text-xs font-black text-[#38D9E6] uppercase tracking-wider mb-4">
              Quick Links & Policy
            </h4>
            <ul className="space-y-2.5 text-sm mb-6">
              {footerLinks.features.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-xs font-black text-white/50 uppercase tracking-wider mb-2">
              Legal & Trust
            </h4>
            <ul className="space-y-1.5 text-xs">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white/80 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 font-normal">
          <p>© 2026 DeepSiddhi Foundation. All rights reserved. Built for young leaders & classroom champions.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-white/60">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Safe & Verified for Children</span>
            </span>
            <span>•</span>
            <span>ISO 9001:2015 Certified EdTech</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
