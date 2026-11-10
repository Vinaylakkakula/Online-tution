"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Video,
  Clock,
  Flame,
  Radio,
  Play,
  Calendar,
  CheckCircle2,
  FileCheck2,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  Award,
  Sparkles,
} from "lucide-react";

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const studentName = user?.full_name || "Aryan Sharma";

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#163B65] via-[#1a477b] to-[#16A6A1] p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Target: IIT-JEE Main & Advanced 2027</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {studentName}! 👋
            </h1>
            <p className="text-[#EAF4FF]/85 text-xs sm:text-sm max-w-xl">
              You are on a <strong className="text-white">12-Day Learning Streak</strong>. You have 1 upcoming live session today at 5:00 PM IST and 1 scheduled mock test.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/dashboard/live-classes">
              <Button className="bg-[#16A6A1] hover:bg-[#138e8a] text-white font-semibold text-xs px-5 py-5 rounded-xl shadow-md flex items-center gap-2">
                <Radio className="w-4 h-4 animate-pulse" />
                Join Live Class
              </Button>
            </Link>
            <Link href="/dashboard/recorded-classes">
              <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs px-5 py-5 rounded-xl backdrop-blur-xs">
                Resume Lecture
              </Button>
            </Link>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Top 4 Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-2xl border-gray-100 shadow-sm bg-white p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6 text-[#163B65]" />
          </div>
          <div>
            <span className="text-xs text-gray-500 font-medium block">Enrolled Courses</span>
            <span className="text-xl font-bold text-[#163B65]">3 Programs</span>
          </div>
        </Card>

        <Card className="rounded-2xl border-gray-100 shadow-sm bg-white p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6 text-[#16A6A1]" />
          </div>
          <div>
            <span className="text-xs text-gray-500 font-medium block">Completed Lessons</span>
            <span className="text-xl font-bold text-gray-800">84 Lessons</span>
          </div>
        </Card>

        <Card className="rounded-2xl border-gray-100 shadow-sm bg-white p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <span className="text-xs text-gray-500 font-medium block">Watch Hours</span>
            <span className="text-xl font-bold text-gray-800">46.5 Hours</span>
          </div>
        </Card>

        <Card className="rounded-2xl border-gray-100 shadow-sm bg-white p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6 text-rose-500 animate-bounce" />
          </div>
          <div>
            <span className="text-xs text-gray-500 font-medium block">Active Streak</span>
            <span className="text-xl font-bold text-rose-600">12 Days 🔥</span>
          </div>
        </Card>
      </div>

      {/* Main Grid: 2 Columns for Live & Continue Learning */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 space-y-8">
          {/* Continue Learning Card */}
          <Card className="rounded-3xl border-gray-100 shadow-md bg-white overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Play className="w-5 h-5 text-[#16A6A1] fill-[#16A6A1]" />
                <h3 className="text-base font-bold text-[#163B65]">Continue Learning</h3>
              </div>
              <Link
                href="/dashboard/recorded-classes"
                className="text-xs font-semibold text-[#16A6A1] hover:underline flex items-center gap-1"
              >
                All Recordings <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6">
              <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                {/* Thumbnail with overlay play */}
                <div className="relative w-full sm:w-48 h-28 rounded-2xl bg-gradient-to-br from-slate-800 to-indigo-950 flex items-center justify-center shrink-0 overflow-hidden group shadow-md cursor-pointer">
                  <div className="absolute inset-0 bg-cover bg-center opacity-40" />
                  <div className="w-12 h-12 rounded-full bg-[#16A6A1] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/70 text-[10px] text-white font-mono">
                    32:40 / 48:00
                  </span>
                </div>

                <div className="flex-1 space-y-2 w-full">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-teal-500 text-teal-800 bg-teal-50 text-[10px]">
                      Physics • Chapter 4
                    </Badge>
                    <span className="text-xs text-gray-500">68% Watched</span>
                  </div>

                  <h4 className="text-base font-bold text-gray-900 leading-snug">
                    Rotational Dynamics: Moment of Inertia & Parallel Axis Theorem
                  </h4>

                  <p className="text-xs text-gray-500">
                    Faculty: Dr. Rahul Sharma • IIT-JEE Comprehensive Track
                  </p>

                  <div className="space-y-1 pt-1">
                    <Progress value={68} className="h-2 bg-gray-100" />
                    <div className="flex justify-between text-[10px] text-gray-400">
                      <span>Resume at 32 min</span>
                      <span>15 min remaining</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Enrolled Courses Progress */}
          <Card className="rounded-3xl border-gray-100 shadow-md bg-white p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#163B65] flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#16A6A1]" />
                Course Progress & Syllabus Completion
              </h3>
              <Link href="/dashboard/my-courses" className="text-xs font-semibold text-[#16A6A1] hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-900">IIT-JEE Comprehensive Mastery 2026-27</span>
                  <span className="font-semibold text-teal-700">72% Completed</span>
                </div>
                <Progress value={72} className="h-2.5 bg-gray-200" />
                <div className="flex justify-between text-[11px] text-gray-500">
                  <span>172 of 240 Lessons Finished</span>
                  <span>Batch: Pratham 2026</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-900">Physics Olympiad Advanced Sprint (NSEP & INPhO)</span>
                  <span className="font-semibold text-teal-700">45% Completed</span>
                </div>
                <Progress value={45} className="h-2.5 bg-gray-200" />
                <div className="flex justify-between text-[11px] text-gray-500">
                  <span>36 of 80 Lessons Finished</span>
                  <span>Batch: Aryabhata Olympiad</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Recent Recorded Lectures List */}
          <Card className="rounded-3xl border-gray-100 shadow-md bg-white p-6 space-y-4">
            <h3 className="text-base font-bold text-[#163B65] flex items-center gap-2">
              <Video className="w-5 h-5 text-[#16A6A1]" />
              Recent Class Recordings
            </h3>

            <div className="divide-y divide-gray-100">
              {[
                {
                  title: "Thermodynamics: Carnot Engine & Entropy Calculations",
                  subject: "Physics",
                  faculty: "Dr. Rahul Sharma",
                  duration: "52 mins",
                  date: "Yesterday",
                },
                {
                  title: "Organic Chemistry: SN1 vs SN2 Nucleophilic Substitution",
                  subject: "Chemistry",
                  faculty: "Prof. Priya Saxena",
                  duration: "45 mins",
                  date: "2 days ago",
                },
                {
                  title: "Calculus: Maxima & Minima Optimization Problems",
                  subject: "Mathematics",
                  faculty: "Er. Amit Verma",
                  duration: "58 mins",
                  date: "3 days ago",
                },
              ].map((rec, i) => (
                <div key={i} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#EAF4FF] text-[#163B65] flex items-center justify-center shrink-0">
                      <Play className="w-4 h-4 fill-[#163B65]" />
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900">{rec.title}</h5>
                      <p className="text-[11px] text-gray-500">
                        {rec.subject} • {rec.faculty} • {rec.duration}
                      </p>
                    </div>
                  </div>
                  <Link href="/dashboard/recorded-classes">
                    <Button variant="ghost" size="sm" className="text-xs text-[#16A6A1] hover:bg-teal-50">
                      Watch
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right 1 Column: Live Classes, Tests, Announcements */}
        <div className="space-y-6">
          {/* Upcoming Live Class Spotlight Card */}
          <Card className="rounded-3xl border-2 border-red-200 bg-red-50/40 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                Live in 2h 20m
              </span>
              <Badge className="bg-red-500 text-white text-[10px]">Today</Badge>
            </div>

            <div>
              <h4 className="text-base font-bold text-gray-900 leading-snug">
                Advanced Problem Solving: Magnetism & Biot-Savart Law
              </h4>
              <p className="text-xs text-gray-600 mt-1">
                Faculty: <strong>Dr. Rahul Sharma</strong>
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                <Clock className="w-4 h-4 text-red-500" />
                <span>5:00 PM - 6:30 PM IST (Zoom Meeting)</span>
              </div>
            </div>

            <Link href="/dashboard/live-classes" className="block pt-1">
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-xl shadow-md flex items-center justify-center gap-2">
                <Radio className="w-4 h-4" />
                Join Live Classroom
              </Button>
            </Link>
          </Card>

          {/* Upcoming Tests Alert */}
          <Card className="rounded-3xl border-gray-100 shadow-sm bg-white p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#163B65] flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-[#16A6A1]" />
                Upcoming Examinations
              </h3>
              <Link href="/dashboard/tests" className="text-xs text-[#16A6A1] hover:underline font-semibold">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 text-xs space-y-1.5">
                <div className="flex justify-between items-center font-bold text-gray-900">
                  <span>All India JEE Mock Test #08</span>
                  <Badge variant="outline" className="border-teal-500 text-teal-800 text-[10px]">
                    300 Marks
                  </Badge>
                </div>
                <p className="text-gray-500 text-[11px]">Physics, Chemistry, Maths • 180 Minutes</p>
                <div className="flex justify-between items-center text-[11px] text-gray-500 pt-1">
                  <span>Starts: Sunday, 9:00 AM</span>
                  <Link href="/dashboard/tests" className="text-[#16A6A1] font-bold hover:underline">
                    Prepare
                  </Link>
                </div>
              </div>
            </div>
          </Card>

          {/* Announcements Board */}
          <Card className="rounded-3xl border-gray-100 shadow-sm bg-white p-6 space-y-4">
            <h3 className="text-sm font-bold text-[#163B65] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              Latest Announcements
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-200/60 space-y-1">
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                  Academic Update
                </span>
                <p className="font-semibold text-gray-800">
                  Special Doubt Clearing Session with Er. Amit Verma scheduled for Saturday.
                </p>
                <span className="text-[10px] text-gray-400 block">Posted 4 hours ago</span>
              </div>

              <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-200/60 space-y-1">
                <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block">
                  Study Material Released
                </span>
                <p className="font-semibold text-gray-800">
                  New 200-Question Chemistry Problem Sheet uploaded to Study Materials.
                </p>
                <span className="text-[10px] text-gray-400 block">Yesterday</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
