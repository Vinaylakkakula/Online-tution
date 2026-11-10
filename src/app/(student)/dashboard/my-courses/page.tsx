"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Video,
  Play,
  Calendar,
  Clock,
  CheckCircle2,
  Trophy,
  FileText,
  Lightbulb,
  Atom,
  ArrowRight,
  Layers,
  Sparkles,
  Check,
  ChevronRight,
  GraduationCap,
} from "lucide-react";

export default function MyCoursesPage() {
  const [activeTab, setActiveTab] = useState<"continue" | "all" | "upcoming">("continue");
  const [language, setLanguage] = useState<"all" | "english" | "hinglish">("all");
  const [activeSubTab, setActiveSubTab] = useState("about");

  return (
    <div className="space-y-8 pb-12">
      {/* Top Main Navigation Tabs (Matches Oliveboard Screenshot 5) */}
      <div className="border-b border-gray-200">
        <div className="flex items-center gap-8 text-sm font-extrabold">
          <button
            onClick={() => setActiveTab("continue")}
            className={`pb-3 relative transition-colors ${
              activeTab === "continue"
                ? "text-[#004B87] font-black"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Continue Learning
            {activeTab === "continue" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#004B87] rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("all")}
            className={`pb-3 relative transition-colors ${
              activeTab === "all"
                ? "text-[#004B87] font-black"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            All Courses
            {activeTab === "all" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#004B87] rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`pb-3 relative transition-colors ${
              activeTab === "upcoming"
                ? "text-[#004B87] font-black"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Upcoming Live Classes
            {activeTab === "upcoming" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#004B87] rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* Language filter pills (Matches Oliveboard Screenshot 5) */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setLanguage("all")}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-2xs ${
            language === "all"
              ? "bg-[#E2F0FE] text-[#004B87] ring-1 ring-[#004B87]/30"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setLanguage("english")}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-2xs ${
            language === "english"
              ? "bg-[#E2F0FE] text-[#004B87] ring-1 ring-[#004B87]/30"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          English
        </button>
        <button
          onClick={() => setLanguage("hinglish")}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-2xs ${
            language === "hinglish"
              ? "bg-[#E2F0FE] text-[#004B87] ring-1 ring-[#004B87]/30"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          Hinglish
        </button>
      </div>

      {/* SECTION 1: IIT - JEE (Matches Oliveboard Screenshot 5) */}
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
          IIT - JEE
        </h2>

        {/* Large IIT - JEE Banner Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0C335C] via-[#104375] to-[#0A2A4D] p-6 sm:p-8 text-white shadow-md border border-blue-400/20">
          <div className="absolute right-0 bottom-0 w-80 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                IIT - JEE Foundation & Advanced
              </h3>

              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#FDB813] text-gray-950 text-xs font-black px-3 py-1 rounded-full shadow-xs">
                  Complete Course (Class 6 – 12)
                </span>
                <span className="bg-white/15 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-xs">
                  Pratham Batch 2026-27
                </span>
              </div>

              <p className="text-xs sm:text-sm text-cyan-100/90 leading-relaxed pt-1">
                Comprehensive conceptual coverage for Physics, Chemistry & Mathematics led by Top Ranker IITian faculty with complete printed study material.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <Link href="/dashboard/recorded-classes" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-[#16A6A1] hover:bg-[#128f8b] text-white font-extrabold text-xs h-11 px-6 rounded-xl shadow-md flex items-center justify-center gap-2">
                  <Play className="w-4 h-4 fill-white" />
                  <span>Resume Learning</span>
                </Button>
              </Link>
              <Link href="/dashboard/materials" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs h-11 px-5 rounded-xl">
                  <span>Books & DPPs</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Other Competitive Exams (Matches Oliveboard Screenshot 5) */}
      <div className="space-y-4 pt-2">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
          Other Competitive Exams
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Olympiad Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#4E146E] via-[#6B1F96] to-[#3B0E54] p-6 text-white shadow-md border border-purple-400/20 hover:shadow-lg transition-all">
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                <Trophy className="w-9 h-9 text-amber-300" />
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="text-2xl font-black tracking-tight leading-none text-white">
                  Olympiad
                </h3>
                <span className="inline-block bg-[#FDB813] text-gray-950 text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                  Classes 6 – 12
                </span>
                <p className="text-xs font-medium text-purple-100/90">
                  Maths | Science | AI | Commerce
                </p>
              </div>
              <Link href="/dashboard/recorded-classes">
                <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold rounded-xl border border-white/20">
                  Open →
                </Button>
              </Link>
            </div>
          </div>

          {/* NTSE Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#094A44] via-[#0E635C] to-[#073632] p-6 text-white shadow-md border border-teal-400/20 hover:shadow-lg transition-all">
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                <Lightbulb className="w-9 h-9 text-amber-300" />
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="text-2xl font-black tracking-tight leading-none text-white">
                  NTSE
                </h3>
                <span className="inline-block bg-[#FDB813] text-gray-950 text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                  Class 8 – 10
                </span>
                <p className="text-xs font-medium text-teal-100/90">
                  Stage 1 & Stage 2 Preparation
                </p>
              </div>
              <Link href="/dashboard/recorded-classes">
                <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold rounded-xl border border-white/20">
                  Open →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Detailed Course View & Course Highlights (Matches Oliveboard Screenshot 3) */}
      <div className="space-y-6 pt-4">
        {/* Sub-nav Tabs like Screenshot 3 */}
        <div className="flex items-center gap-6 overflow-x-auto pb-2 border-b border-gray-200 text-xs font-bold text-gray-600 scrollbar-none">
          <button
            onClick={() => setActiveSubTab("about")}
            className={`pb-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeSubTab === "about"
                ? "text-[#004B87] font-black border-b-2 border-[#004B87]"
                : "hover:text-gray-900"
            }`}
          >
            <span>+ About</span>
          </button>
          <button
            onClick={() => setActiveSubTab("progress")}
            className={`pb-2 whitespace-nowrap transition-colors ${
              activeSubTab === "progress"
                ? "text-[#004B87] font-black border-b-2 border-[#004B87]"
                : "hover:text-gray-900"
            }`}
          >
            Track Progress
          </button>
          <button
            onClick={() => setActiveSubTab("learning")}
            className={`pb-2 whitespace-nowrap transition-colors ${
              activeSubTab === "learning"
                ? "text-[#004B87] font-black border-b-2 border-[#004B87]"
                : "hover:text-gray-900"
            }`}
          >
            Continue Learning
          </button>
          <button
            onClick={() => setActiveSubTab("ebooks")}
            className={`pb-2 whitespace-nowrap transition-colors ${
              activeSubTab === "ebooks"
                ? "text-[#004B87] font-black border-b-2 border-[#004B87]"
                : "hover:text-gray-900"
            }`}
          >
            EBooks
          </button>
          <button
            onClick={() => setActiveSubTab("tests")}
            className={`pb-2 whitespace-nowrap transition-colors ${
              activeSubTab === "tests"
                ? "text-[#004B87] font-black border-b-2 border-[#004B87]"
                : "hover:text-gray-900"
            }`}
          >
            Tests and Notes
          </button>
          <button
            onClick={() => setActiveSubTab("community")}
            className={`pb-2 whitespace-nowrap transition-colors ${
              activeSubTab === "community"
                ? "text-[#004B87] font-black border-b-2 border-[#004B87]"
                : "hover:text-gray-900"
            }`}
          >
            Community
          </button>
        </div>

        {/* Course Header Banner (Screenshot 3 style) */}
        <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#EAF4FF] text-[#004B87] flex items-center justify-center shrink-0 border border-blue-200">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-black text-gray-900">
                IIT-JEE Class 6th with Books
              </h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-[#004B87]" />
                  170+ Live Classes
                </span>
                <span>|</span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#004B87]" />
                  Complete Study Material (Books)
                </span>
                <span>|</span>
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#004B87]" />
                  Books & PDFs
                </span>
              </div>
            </div>
          </div>

          <Badge className="bg-[#D9EFFC] hover:bg-[#D9EFFC] text-[#004B87] font-black text-xs px-4 py-1.5 rounded-full border border-blue-200">
            Enrolled
          </Badge>
        </div>

        {/* Course Highlights Header with Red Vertical Bar (Screenshot 3 style) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#D32F2F] rounded-full inline-block" />
            <h3 className="text-lg font-black text-gray-900 tracking-tight">
              Course Highlights
            </h3>
          </div>

          {/* 6 Cards in a 3x2 Grid (Screenshot 3 style) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 1. 170+ Live Classes */}
            <div className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs hover:shadow-md transition-shadow flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#EA580C] flex items-center justify-center shrink-0 border border-orange-100">
                <Play className="w-6 h-6 fill-[#EA580C]" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm text-gray-900">170+ Live Classes</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Concept-based, Interactive & Practice-oriented Classes for Class 6th (IIT-JEE Foundation)
                </p>
              </div>
            </div>

            {/* 2. Full-Length Mock Tests */}
            <div className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs hover:shadow-md transition-shadow flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center shrink-0 border border-emerald-100">
                <CheckCircle2 className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm text-gray-900">Full-Length Mock Tests</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Exam-level Mock Tests to strengthen concepts and build accuracy
                </p>
              </div>
            </div>

            {/* 3. Daily Tests */}
            <div className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs hover:shadow-md transition-shadow flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0284C7] flex items-center justify-center shrink-0 border border-blue-100">
                <Calendar className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm text-gray-900">Daily Tests</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Short, topic-wise practice tests to ensure regular revision
                </p>
              </div>
            </div>

            {/* 4. Grand Tests */}
            <div className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs hover:shadow-md transition-shadow flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#9333EA] flex items-center justify-center shrink-0 border border-purple-100">
                <Trophy className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm text-gray-900">Grand Tests</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Comprehensive tests covering multiple topics for complete evaluation
                </p>
              </div>
            </div>

            {/* 5. Sectional Tests */}
            <div className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs hover:shadow-md transition-shadow flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#D97706] flex items-center justify-center shrink-0 border border-amber-100">
                <Layers className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm text-gray-900">Sectional Tests</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Subject-wise and unit-wise tests for targeted practice and concept clarity
                </p>
              </div>
            </div>

            {/* 6. Books & PDFs */}
            <div className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs hover:shadow-md transition-shadow flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-[#E11D48] flex items-center justify-center shrink-0 border border-rose-100">
                <BookOpen className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm text-gray-900">Books & PDFs</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Complete Study Material (Books) + Chapter-wise Notes & Practice PDFs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
