"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { useLMSData } from "@/lib/lms-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Atom,
  Trophy,
  Lightbulb,
  ClipboardList,
  BookOpen,
  Tv2,
  Medal,
  ChevronRight,
  Play,
  Radio,
  Clock,
  Sparkles,
  CheckCircle2,
  FileCheck2,
  Flame,
  ArrowRight,
  GraduationCap,
  AlertCircle,
} from "lucide-react";

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const studentName = user?.full_name || "Aryan Sharma";
  const { courses, materials, liveClasses, tests, announcements } = useLMSData();
  const [selectedLanguage, setSelectedLanguage] = useState<"all" | "english" | "hinglish">("all");

  const activeLiveClass = liveClasses.find((l) => l.status === "live") || liveClasses[0];

  return (
    <div className="space-y-6 pb-10">
      {/* Welcome & Sync Bar */}
      <div className="bg-gradient-to-r from-[#004B87] via-[#104375] to-[#16A6A1] text-white p-5 sm:p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-bold backdrop-blur-xs">
              {user?.class_level || "Class 11"}
            </span>
            <span className="text-cyan-200 text-xs font-semibold">
              • Academic Session 2026-27
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight">
            Welcome back, {studentName}!
          </h1>
          <p className="text-xs text-white/80 max-w-xl">
            Your personalized learning track is active. Access your courses, test series, and live classes below.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 text-white">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Learning Portal • Online</span>
          </div>
        </div>
      </div>

      {/* Top Language Filter Bar (Matches Oliveboard Screenshot 4) */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setSelectedLanguage("all")}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-2xs ${
            selectedLanguage === "all"
              ? "bg-[#E2F0FE] text-[#004B87] ring-1 ring-[#004B87]/30"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setSelectedLanguage("english")}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-2xs ${
            selectedLanguage === "english"
              ? "bg-[#E2F0FE] text-[#004B87] ring-1 ring-[#004B87]/30"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          English
        </button>
        <button
          onClick={() => setSelectedLanguage("hinglish")}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-2xs ${
            selectedLanguage === "hinglish"
              ? "bg-[#E2F0FE] text-[#004B87] ring-1 ring-[#004B87]/30"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          Hinglish
        </button>
      </div>

      {/* SECTION: IIT JEE, Olympiad & NTSE Courses (Matches Oliveboard Screenshot 4) */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            IIT JEE, Olympiad & NTSE Courses
          </h2>
          <Link
            href="/dashboard/my-courses"
            className="text-xs font-bold text-[#004B87] hover:underline flex items-center gap-1"
          >
            <span>View All Programs ({courses.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* The 3 Iconic Oliveboard-Style Wide Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: IIT JEE */}
          <Link
            href="/dashboard/my-courses"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0D3B66] via-[#124B82] to-[#0A2E52] p-6 text-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-blue-400/20"
          >
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-blue-500/15 blur-xl group-hover:scale-125 transition-transform" />
            <div className="absolute bottom-0 right-0 w-36 h-36 border-t-2 border-l-2 border-amber-400/40 rounded-tl-full opacity-60 pointer-events-none" />

            <div className="relative z-10 flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0 shadow-inner group-hover:rotate-12 transition-transform">
                <Atom className="w-9 h-9 text-cyan-300 animate-[spin_12s_linear_infinite]" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-2xl font-black tracking-tight leading-none text-white">
                  IIT JEE
                </h3>
                <span className="inline-block bg-[#FDB813] text-gray-950 text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                  Class 6 – 12
                </span>
                <p className="text-xs font-medium text-cyan-100/90 pt-0.5">
                  Foundation | Main | Advanced
                </p>
              </div>
            </div>
          </Link>

          {/* Card 2: Olympiad */}
          <Link
            href="/dashboard/my-courses"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#5E1A84] via-[#7B249C] to-[#4A146C] p-6 text-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-purple-400/20"
          >
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-purple-400/20 blur-xl group-hover:scale-125 transition-transform" />
            <div className="absolute bottom-0 right-0 w-36 h-36 border-t-2 border-l-2 border-amber-300/40 rounded-tl-full opacity-60 pointer-events-none" />

            <div className="relative z-10 flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                <Trophy className="w-9 h-9 text-amber-300" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-2xl font-black tracking-tight leading-none text-white">
                  Olympiad
                </h3>
                <span className="inline-block bg-[#FDB813] text-gray-950 text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                  Classes 6 – 12
                </span>
                <p className="text-xs font-medium text-purple-100/90 pt-0.5 truncate">
                  Maths | Science | AI | Commerce
                </p>
              </div>
            </div>
          </Link>

          {/* Card 3: NTSE */}
          <Link
            href="/dashboard/my-courses"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0B5A53] via-[#0E7067] to-[#08453F] p-6 text-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-teal-400/20"
          >
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-teal-400/20 blur-xl group-hover:scale-125 transition-transform" />
            <div className="absolute bottom-0 right-0 w-36 h-36 border-t-2 border-l-2 border-amber-300/40 rounded-tl-full opacity-60 pointer-events-none" />

            <div className="relative z-10 flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                <Lightbulb className="w-9 h-9 text-amber-300" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-2xl font-black tracking-tight leading-none text-white">
                  NTSE
                </h3>
                <span className="inline-block bg-[#FDB813] text-gray-950 text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                  Class 8 – 10
                </span>
                <p className="text-xs font-medium text-teal-100/90 pt-0.5">
                  Stage 1 & Stage 2 Preparation
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* SECTION: Test Categories (Matches Oliveboard Screenshot 1 & 4) */}
      <div className="space-y-3.5 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Test Categories
          </h2>
          <Link
            href="/dashboard/tests"
            className="text-xs font-bold text-[#004B87] hover:underline flex items-center gap-1"
          >
            <span>Practice Tests ({tests.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 Pastel Category Cards matching Oliveboard */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/dashboard/tests"
            className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#EAF5FE] hover:bg-[#D9EDFD] border border-[#CDE5FC] transition-all hover:shadow-md group"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-xs text-[#0066CC] group-hover:scale-105 transition-transform">
                <ClipboardList className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span className="font-extrabold text-sm text-gray-900">
                Sectional Test
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-700 group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            href="/dashboard/tests"
            className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#E8F8F2] hover:bg-[#D4F4E6] border border-[#CAEDE0] transition-all hover:shadow-md group"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-xs text-[#107C41] group-hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span className="font-extrabold text-sm text-gray-900">
                Topic Test
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-700 group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            href="/dashboard/tests"
            className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#F3ECFB] hover:bg-[#E8DCF7] border border-[#DFCEF2] transition-all hover:shadow-md group"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-xs text-[#6B3FA0] group-hover:scale-105 transition-transform">
                <Tv2 className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span className="font-extrabold text-sm text-gray-900">
                Mock Test
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-700 group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            href="/dashboard/tests"
            className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#FDF0E6] hover:bg-[#FCE3D2] border border-[#FAD4BA] transition-all hover:shadow-md group"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-xs text-[#C65D28] group-hover:scale-105 transition-transform">
                <Medal className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span className="font-extrabold text-sm text-gray-900">
                Grand Test
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-700 group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>
      </div>

      {/* Main Grid: Continue Learning + Live Session Alerts & Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
        {/* Left Column: Continue Learning Card (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="rounded-2xl border-gray-200/90 shadow-sm bg-white overflow-hidden p-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#EAF4FF] text-[#004B87] flex items-center justify-center">
                  <Play className="w-4 h-4 fill-[#004B87]" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-gray-900 leading-none">
                    Continue Learning
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Pick up right where you left off
                  </p>
                </div>
              </div>

              <Link
                href="/dashboard/recorded-classes"
                className="text-xs font-bold text-[#004B87] hover:underline flex items-center gap-1"
              >
                <span>Full Playlist</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <div className="relative w-full sm:w-52 h-32 rounded-xl bg-gradient-to-br from-gray-900 via-[#0D3B66] to-gray-800 flex items-center justify-center shrink-0 overflow-hidden group cursor-pointer shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#16A6A1] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] text-white font-mono font-semibold">
                  32:40 / 48:00
                </span>
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#004B87] text-[10px] text-white font-bold">
                  Physics
                </span>
              </div>

              <div className="flex-1 space-y-2 w-full">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-teal-500 text-teal-800 bg-teal-50 text-[10px] font-bold">
                    Class 11 • Chapter 4
                  </Badge>
                  <span className="text-xs text-gray-500 font-semibold">68% Watched</span>
                </div>

                <h4 className="text-base font-black text-gray-900 leading-snug">
                  Rotational Dynamics: Moment of Inertia & Parallel Axis Theorem
                </h4>

                <p className="text-xs text-gray-500">
                  Lead Faculty: <strong>Dr. Rahul Sharma</strong> • IIT-JEE Comprehensive Track
                </p>

                <div className="space-y-1 pt-1.5">
                  <Progress value={68} className="h-2.5 bg-gray-100" />
                  <div className="flex justify-between text-[11px] text-gray-400 font-medium">
                    <span>Current timestamp: 32m 40s</span>
                    <span className="text-[#004B87] font-semibold">15m remaining</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-2xs">
              <span className="text-[11px] text-gray-500 font-bold block">Active Programs</span>
              <span className="text-xl font-black text-[#004B87]">{courses.length} Courses</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-2xs">
              <span className="text-[11px] text-gray-500 font-bold block">Materials Available</span>
              <span className="text-xl font-black text-emerald-600">{materials.length} PDFs</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-2xs">
              <span className="text-[11px] text-gray-500 font-bold block">Mock Tests</span>
              <span className="text-xl font-black text-gray-800">{tests.length} CBTs</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-2xs">
              <span className="text-[11px] text-gray-500 font-bold block">Learning Streak</span>
              <span className="text-xl font-black text-rose-500 flex items-center gap-1">
                <Flame className="w-5 h-5 fill-rose-500 text-rose-500" />
                12 Days
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Class Spotlight & Today's Schedule (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Urgent Live Class Spotlight Card */}
          {activeLiveClass && (
            <Card className="rounded-2xl border-2 border-red-200 bg-gradient-to-br from-red-50/70 to-rose-50/40 p-5 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-black text-red-600 tracking-wide uppercase">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  {activeLiveClass.status === "live" ? "Live Right Now" : "Live Session"}
                </span>
                <Badge className="bg-red-600 text-white text-[10px] font-bold">Today</Badge>
              </div>

              <div>
                <h4 className="text-base font-black text-gray-900 leading-snug">
                  {activeLiveClass.title}
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  Faculty: <strong>{activeLiveClass.faculty}</strong>
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-2 font-medium">
                  <Clock className="w-4 h-4 text-red-500" />
                  <span>{activeLiveClass.scheduledAt}</span>
                </div>
              </div>

              <Link href="/dashboard/live-classes" className="block pt-1">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs h-10 rounded-xl shadow-md flex items-center justify-center gap-2">
                  <Radio className="w-4 h-4" />
                  <span>Join Live Classroom</span>
                </Button>
              </Link>
            </Card>
          )}

          {/* Real-time Announcements from LMSStore */}
          <Card className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                Latest Announcements
              </h3>
              <Badge variant="outline" className="border-blue-300 text-blue-900 bg-blue-50 text-[10px] font-bold">
                Notice Board
              </Badge>
            </div>

            <div className="space-y-2.5">
              {announcements.slice(0, 3).map((ann) => (
                <div key={ann.id} className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">{ann.title}</span>
                    <span className="text-[10px] text-gray-400">{ann.date}</span>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-relaxed">{ann.message}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
