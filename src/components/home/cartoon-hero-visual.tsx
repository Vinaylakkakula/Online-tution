"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Star, Trophy, Play, BookOpen, Rocket } from "lucide-react";

export function CartoonHeroVisual() {
  const [activeBubble, setActiveBubble] = useState<string | null>("rocket");

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none select-none">
      {/* Background Soft Glow & Orbit Ring */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <div className="w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] rounded-full bg-gradient-to-tr from-cyan-300/30 via-blue-400/20 to-amber-200/30 blur-3xl animate-pulse" />
        <div className="absolute w-[320px] sm:w-[460px] h-[320px] sm:h-[460px] rounded-full border border-dashed border-blue-200/60 animate-[spin_60s_linear_infinite]" />
      </div>

      {/* Main Illustration Container - Light Premium 3D Glass Card */}
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-4 sm:p-6 lg:p-8 border-2 border-blue-100 shadow-2xl shadow-blue-900/10 overflow-hidden">
        {/* Playful Floating Speech Bubble / Interactive Banner */}
        <div className="absolute top-3 left-4 right-4 z-20 flex justify-between items-center pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFD447] text-slate-950 font-extrabold text-xs shadow-md shadow-amber-400/30 animate-bounce">
            <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
            <span>Classes 6th - 10th Super LMS!</span>
          </div>

          {activeBubble && (
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-cyan-300 border border-cyan-400/40 text-xs font-semibold backdrop-blur-sm animate-fade-in shadow-md">
              {activeBubble === "rocket" && "🚀 Paper Rocket Soaring High!"}
              {activeBubble === "book" && "📖 Magic Book: Chapter 1 Ready!"}
              {activeBubble === "pencil" && "✏️ Pencil Champ: A+ in Maths!"}
              {activeBubble === "subfolders" && "📂 Subfolders: Videos & PDFs Inside!"}
            </div>
          )}
        </div>

        {/* Central Graphic Scene */}
        <div className="relative h-[340px] sm:h-[400px] w-full flex items-center justify-center mt-6">
          {/* SVG Flight Trail & Orbit Paths */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 500 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Curved dashed trail for the paper rocket */}
            <path
              d="M 60 360 C 130 320, 180 260, 240 220 C 310 170, 370 140, 420 80"
              stroke="#FDE047"
              strokeWidth="3"
              strokeDasharray="8 8"
              strokeLinecap="round"
              className="animate-dash-move opacity-80"
            />
            {/* Secondary trail for mini paper plane */}
            <path
              d="M 120 180 C 180 110, 260 130, 210 60"
              stroke="#38BDF8"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              strokeLinecap="round"
              className="opacity-70"
            />

            {/* Floating Sparkle Stars along the trails */}
            <circle cx="160" cy="275" r="3" fill="#67E8F9" className="animate-ping" />
            <circle cx="280" cy="180" r="4" fill="#FDE047" className="animate-pulse" />
            <circle cx="360" cy="120" r="3" fill="#F472B6" />
            <circle cx="90" cy="220" r="3" fill="#A78BFA" />
            <circle cx="430" cy="200" r="4" fill="#34D399" className="animate-pulse" />

            {/* Little Puffy Cartoon Cloud Puff at rocket launch origin */}
            <g transform="translate(45, 340) scale(0.7)" opacity="0.85">
              <ellipse cx="25" cy="20" rx="16" ry="12" fill="white" />
              <ellipse cx="40" cy="15" rx="18" ry="14" fill="white" />
              <ellipse cx="55" cy="22" rx="14" ry="10" fill="white" />
              <circle cx="20" cy="32" r="5" fill="#E2E8F0" />
              <circle cx="48" cy="30" r="6" fill="#CBD5E1" />
            </g>
          </svg>

          {/* ======================================================== */}
          {/* 1. FLYING PAPER ROCKET (HERO ITEM) */}
          {/* ======================================================== */}
          <div
            onClick={() => setActiveBubble("rocket")}
            onMouseEnter={() => setActiveBubble("rocket")}
            className="absolute top-10 right-8 sm:top-12 sm:right-14 z-30 cursor-pointer group transform transition-all duration-300 hover:scale-110 animate-rocket-swoop"
            title="Click to zoom the paper rocket!"
          >
            {/* Booster Flame Glow */}
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-amber-400/40 rounded-full blur-md group-hover:scale-125 transition-transform" />

            {/* SVG Paper Rocket */}
            <svg
              className="w-28 h-28 sm:w-36 sm:h-36 drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)]"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Rocket Exhaust Jet Stream */}
              <path
                d="M 28 88 L 12 108 L 36 94 Z"
                fill="url(#flameGradient)"
                className="animate-pulse"
              />
              <path
                d="M 25 85 L 18 100 L 32 90 Z"
                fill="#FEF08A"
              />

              {/* Origami Paper Rocket Wing Left (Shaded) */}
              <path
                d="M 68 18 L 22 76 L 56 68 Z"
                fill="#38BDF8"
              />
              {/* Origami Paper Rocket Body Left */}
              <path
                d="M 68 18 L 56 68 L 52 84 L 40 82 Z"
                fill="#0284C7"
              />
              {/* Origami Paper Rocket Main Spine (Center Fold) */}
              <path
                d="M 68 18 L 68 84 L 52 84 Z"
                fill="#F0F9FF"
              />
              {/* Origami Paper Rocket Right Wing */}
              <path
                d="M 68 18 L 112 56 L 68 76 Z"
                fill="#BAE6FD"
              />
              {/* Right Lower Fold */}
              <path
                d="M 68 76 L 112 56 L 86 86 L 68 84 Z"
                fill="#7DD3FC"
              />

              {/* Cartoon Window / Bubble with Astro Leo waving */}
              <circle
                cx="68"
                cy="46"
                r="11"
                fill="#1E293B"
                stroke="#FACC15"
                strokeWidth="2"
              />
              <circle
                cx="68"
                cy="46"
                r="8"
                fill="#0284C7"
              />
              {/* Cute smiling mascot inside */}
              <text x="63" y="50" fontSize="11">🚀</text>

              {/* Cute Sticker on the wing */}
              <g transform="translate(80, 52) rotate(15)">
                <circle cx="6" cy="6" r="7" fill="#F43F5E" />
                <text x="3" y="9" fontSize="7" fill="white" fontWeight="bold">A+</text>
              </g>

              {/* Gradient Definitions */}
              <defs>
                <linearGradient id="flameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F97316" />
                  <stop offset="50%" stopColor="#FBBF24" />
                  <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            {/* Playful Floating Tag */}
            <div className="absolute -top-3 -right-2 bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 border border-white">
              <span>🚀 100% Fun</span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* 2. SECOND MINI PAPER AIRPLANE (LOOPING) */}
          {/* ======================================================== */}
          <div
            className="absolute top-16 left-6 sm:left-12 z-20 cursor-pointer animate-float-slow group"
            onClick={() => setActiveBubble("rocket")}
          >
            <svg
              className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-lg -rotate-12 group-hover:rotate-6 transition-transform"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Paper Plane Silhouette */}
              <path d="M 68 12 L 14 38 L 38 48 Z" fill="#F8FAFC" />
              <path d="M 68 12 L 38 48 L 44 64 L 52 50 Z" fill="#CBD5E1" />
              <path d="M 68 12 L 52 50 L 58 38 Z" fill="#E2E8F0" />
              <path d="M 38 48 L 44 64 L 46 54 Z" fill="#94A3B8" />
              {/* Red Tip Doodle */}
              <path d="M 68 12 L 54 18 L 60 24 Z" fill="#EF4444" />
            </svg>
            <div className="absolute -bottom-1 left-2 bg-cyan-400 text-slate-950 font-bold text-[9px] px-1.5 py-0.5 rounded-full border border-white shadow">
              Math Paper ✈️
            </div>
          </div>

          {/* ======================================================== */}
          {/* 3. MAGICAL OPEN BOOK WITH RISING FORMULAS & SPARKLES */}
          {/* ======================================================== */}
          <div
            onClick={() => setActiveBubble("book")}
            onMouseEnter={() => setActiveBubble("book")}
            className="relative z-20 cursor-pointer group animate-book-float mt-12"
            title="Magical Learning Book - Click to explore!"
          >
            {/* Book Glow behind */}
            <div className="absolute inset-0 bg-cyan-400/25 rounded-full blur-xl group-hover:bg-cyan-400/40 transition-colors" />

            {/* 3D Magical Open Book SVG */}
            <svg
              className="w-56 h-36 sm:w-72 sm:h-44 drop-shadow-[0_16px_28px_rgba(0,0,0,0.4)]"
              viewBox="0 0 280 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Hardcover Spine Base */}
              <path
                d="M 20 145 C 70 155, 120 152, 140 162 C 160 152, 210 155, 260 145 L 262 135 C 212 145, 160 142, 140 152 C 120 142, 68 145, 18 135 Z"
                fill="#0F172A"
              />
              <path
                d="M 18 135 C 68 145, 120 142, 140 152 C 160 142, 212 145, 262 135 L 258 122 C 208 132, 160 128, 140 138 C 120 128, 72 132, 22 122 Z"
                fill="#0369A1"
              />

              {/* Pages Left Side (Golden Tinted White) */}
              <path
                d="M 25 118 C 72 128, 118 124, 138 134 L 138 64 C 118 54, 72 58, 25 48 Z"
                fill="#FEFCE8"
              />
              {/* Left Page Shadow Curves */}
              <path
                d="M 30 112 C 72 120, 115 118, 134 128 L 134 68 C 115 58, 72 62, 30 54 Z"
                fill="#FFFFFF"
              />
              {/* Page Content / Doodles on Left Page */}
              <path d="M 45 68 L 115 76" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 45 80 L 105 87" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
              <path d="M 45 92 L 95 98" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
              <path d="M 45 104 L 110 110" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />

              {/* Cute Atom Sketch on Left Page */}
              <circle cx="102" cy="94" r="9" stroke="#818CF8" strokeWidth="1.5" strokeDasharray="3 2" />
              <circle cx="102" cy="94" r="2.5" fill="#6366F1" />

              {/* Pages Right Side */}
              <path
                d="M 142 134 C 162 124, 208 128, 255 118 L 255 48 C 208 58, 162 54, 142 64 Z"
                fill="#FEFCE8"
              />
              <path
                d="M 146 128 C 165 118, 208 120, 250 112 L 250 54 C 208 62, 165 58, 146 68 Z"
                fill="#FFFFFF"
              />
              {/* Page Content on Right Page */}
              <path d="M 165 76 L 235 68" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 165 87 L 225 80" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
              <path d="M 165 98 L 215 92" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
              <path d="M 165 110 L 230 104" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />

              {/* Golden Ribbon Bookmark hanging from center */}
              <path
                d="M 138 136 C 138 152, 134 165, 130 176 L 140 170 L 150 176 C 146 165, 142 152, 142 136 Z"
                fill="#F59E0B"
                stroke="#D97706"
                strokeWidth="1"
              />

              {/* Center Spine Glow Beam */}
              <ellipse cx="140" cy="132" rx="8" ry="4" fill="#38BDF8" className="animate-ping" />
            </svg>

            {/* Rising Magic Glyphs & Knowledge Sparks */}
            <div className="absolute -top-6 left-6 px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-mono font-bold text-xs shadow-lg border border-indigo-400/50 transform -rotate-6 animate-pulse">
              E = mc² ⚛️
            </div>

            <div className="absolute -top-10 right-10 px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-mono font-bold text-xs shadow-lg border border-emerald-400/50 transform rotate-6 animate-bounce">
              π = 3.14 📐
            </div>

            <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-900 font-extrabold text-[11px] shadow-lg border border-white flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-slate-900" />
              <span>Chapter 1: Matter & Motion</span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* 4. STACK OF COLORFUL SUBJECT TEXTBOOKS (BOTTOM LEFT) */}
          {/* ======================================================== */}
          <div
            className="absolute bottom-2 left-4 sm:left-8 z-20 cursor-pointer group"
            onClick={() => setActiveBubble("book")}
          >
            <div className="flex flex-col -space-y-2 group-hover:-space-y-1 transition-all">
              {/* Top Book - Mathematics (Cyan/Blue) */}
              <div className="w-28 sm:w-36 h-6 rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 border border-cyan-300 shadow-md flex items-center justify-between px-2 text-white font-bold text-[10px] transform -rotate-2">
                <span>📘 Maths (6th-10th)</span>
                <span className="text-[9px]">📐</span>
              </div>
              {/* Middle Book - Science (Purple/Indigo) */}
              <div className="w-30 sm:w-40 h-6 rounded-md bg-gradient-to-r from-purple-500 to-indigo-600 border border-purple-300 shadow-md flex items-center justify-between px-2 text-white font-bold text-[10px] transform rotate-1">
                <span>🔬 Science (Physics)</span>
                <span className="text-[9px]">⚡</span>
              </div>
              {/* Bottom Book - English & Social (Amber/Orange) */}
              <div className="w-32 sm:w-44 h-7 rounded-md bg-gradient-to-r from-amber-500 to-orange-600 border border-amber-300 shadow-lg flex items-center justify-between px-2 text-white font-bold text-[10px]">
                <span>📙 English & Social</span>
                <span className="text-[9px]">🌍</span>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* 5. KAWAII CARTOON PENCIL (RIGHT BOTTOM) */}
          {/* ======================================================== */}
          <div
            onClick={() => setActiveBubble("pencil")}
            onMouseEnter={() => setActiveBubble("pencil")}
            className="absolute bottom-2 right-4 sm:right-10 z-20 cursor-pointer group transform transition-all duration-300 hover:rotate-12 animate-float"
            title="Smiling Pencil Buddy"
          >
            <svg
              className="w-16 h-28 sm:w-20 sm:h-32 drop-shadow-xl transform rotate-12"
              viewBox="0 0 60 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Eraser Top (Pink) */}
              <rect x="15" y="8" width="30" height="16" rx="6" fill="#F472B6" />
              {/* Metal Ferrule (Silver) */}
              <rect x="15" y="22" width="30" height="8" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1" />

              {/* Wooden Body (Yellow Honey) */}
              <rect x="15" y="30" width="30" height="52" fill="#FBBF24" />
              {/* Shading stripe */}
              <rect x="15" y="30" width="10" height="52" fill="#F59E0B" />
              <rect x="35" y="30" width="10" height="52" fill="#FDE68A" />

              {/* Kawaii Face on Pencil Body */}
              {/* Eyes */}
              <circle cx="25" cy="52" r="2.5" fill="#1E293B" />
              <circle cx="35" cy="52" r="2.5" fill="#1E293B" />
              <circle cx="26" cy="51" r="0.8" fill="white" />
              <circle cx="36" cy="51" r="0.8" fill="white" />
              {/* Blushing cheeks */}
              <circle cx="21" cy="56" r="2" fill="#FB7185" opacity="0.6" />
              <circle cx="39" cy="56" r="2" fill="#FB7185" opacity="0.6" />
              {/* Big Smile */}
              <path d="M 27 57 Q 30 62 33 57" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" fill="none" />

              {/* Sharpened Wood Cone (Light Cream) */}
              <polygon points="15,82 45,82 30,110" fill="#FEF3C7" />
              {/* Graphite Tip (Graphite Gray) */}
              <polygon points="26,102 34,102 30,110" fill="#1E293B" />
            </svg>

            <div className="absolute -bottom-2 right-1 bg-amber-400 text-slate-900 font-extrabold text-[9px] px-1.5 py-0.5 rounded-full border border-white shadow">
              A+ Ready ✏️
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* FOUR KID-ATTRACTIVE FLOATING STAT & FEATURE BADGES */}
        {/* ======================================================== */}
        <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          {/* Card 1: 50,000+ Young Learners with Avatars */}
          <div className="bg-gray-50/80 hover:bg-white rounded-2xl p-2.5 sm:p-3 border border-gray-200/90 shadow-2xs transition-all hover:-translate-y-0.5 group">
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="text-base sm:text-lg">🎒</span>
              <div className="flex -space-x-1.5">
                <span className="w-5 h-5 rounded-full bg-blue-500 border border-white flex items-center justify-center text-[10px]">🚀</span>
                <span className="w-5 h-5 rounded-full bg-emerald-500 border border-white flex items-center justify-center text-[10px]">🦖</span>
                <span className="w-5 h-5 rounded-full bg-purple-500 border border-white flex items-center justify-center text-[10px]">🤖</span>
              </div>
            </div>
            <p className="text-base sm:text-lg font-black text-[#102C50] leading-tight">50,000+</p>
            <p className="text-[11px] text-gray-500 font-medium">Students Enrolled</p>
          </div>

          {/* Card 2: 5,000+ Video Lessons */}
          <div className="bg-gray-50/80 hover:bg-white rounded-2xl p-2.5 sm:p-3 border border-gray-200/90 shadow-2xs transition-all hover:-translate-y-0.5 group">
            <div className="w-7 h-7 rounded-xl bg-amber-100 flex items-center justify-center mb-1.5 text-amber-600">
              <Play className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            </div>
            <p className="text-base sm:text-lg font-black text-[#102C50] leading-tight">5,000+</p>
            <p className="text-[11px] text-gray-500 font-medium">Recorded Lessons</p>
          </div>

          {/* Card 3: 95%+ Top Grades */}
          <div className="bg-gray-50/80 hover:bg-white rounded-2xl p-2.5 sm:p-3 border border-gray-200/90 shadow-2xs transition-all hover:-translate-y-0.5 group">
            <div className="w-7 h-7 rounded-xl bg-emerald-100 flex items-center justify-center mb-1.5 text-emerald-600">
              <Trophy className="w-3.5 h-3.5" />
            </div>
            <p className="text-base sm:text-lg font-black text-[#102C50] leading-tight">95%+</p>
            <p className="text-[11px] text-gray-500 font-medium">Score Improvement</p>
          </div>

          {/* Card 4: Chapter Subfolders */}
          <Link
            href="/courses"
            className="bg-blue-50/80 hover:bg-blue-50 rounded-2xl p-2.5 sm:p-3 border border-blue-200 transition-all hover:-translate-y-0.5 block group shadow-2xs"
          >
            <div className="w-7 h-7 rounded-xl bg-[#1769AA]/15 flex items-center justify-center mb-1.5 text-[#1769AA]">
              <BookOpen className="w-3.5 h-3.5" />
            </div>
            <p className="text-base sm:text-lg font-black text-[#102C50] leading-tight">Classes 6-10</p>
            <p className="text-[11px] text-[#1769AA] font-bold group-hover:underline">Subfolder Explorer →</p>
          </Link>
        </div>

        {/* Free Trial Banner Pill at bottom */}
        <div className="mt-3 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-50 via-sky-50 to-blue-50 border border-blue-200/70 flex items-center justify-between text-xs text-gray-800">
          <div className="flex items-center gap-1.5">
            <span className="text-sm">🎁</span>
            <span className="font-bold text-[#102C50]">7-Day Free Trial Available!</span>
            <span className="hidden sm:inline text-gray-600 font-normal">Select your class & attend demo live!</span>
          </div>
          <Link
            href="/demo"
            className="text-[11px] font-bold bg-[#FFD447] hover:bg-amber-300 text-slate-950 px-2.5 py-1 rounded-lg transition-colors shadow-xs"
          >
            Claim Free Demo →
          </Link>
        </div>
      </div>
    </div>
  );
}
