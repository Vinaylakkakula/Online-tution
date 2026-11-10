"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Video,
  Clock,
  Play,
  Calendar,
  CheckCircle2,
  FileText,
  Award,
  ArrowRight,
} from "lucide-react";

const enrolledCourses = [
  {
    id: "1",
    title: "IIT-JEE Comprehensive Mastery 2026-27",
    category: "IIT-JEE",
    batch: "Pratham Batch (Morning)",
    batchTiming: "7:00 AM - 10:00 AM IST",
    faculty: "Dr. Rahul Sharma & Er. Amit Verma",
    totalLessons: 240,
    completedLessons: 172,
    progressPercentage: 72,
    hoursWatched: "148 hrs",
    nextClass: "Rotational Dynamics Part 5",
    color: "from-blue-600 to-indigo-700",
  },
  {
    id: "2",
    title: "Physics Olympiad Advanced Sprint (NSEP & INPhO)",
    category: "Olympiad",
    batch: "Aryabhata Olympiad Batch",
    batchTiming: "6:00 PM - 8:00 PM IST (Mon, Wed, Fri)",
    faculty: "Dr. Rahul Sharma",
    totalLessons: 80,
    completedLessons: 36,
    progressPercentage: 45,
    hoursWatched: "32 hrs",
    nextClass: "Special Relativity & Non-Inertial Frames",
    color: "from-teal-600 to-emerald-700",
  },
  {
    id: "3",
    title: "National Talent Search (NTSE) & Aptitude Mastery",
    category: "NTSE",
    batch: "Vidyarthi Foundation Batch",
    batchTiming: "4:00 PM - 5:30 PM IST (Tue, Thu, Sat)",
    faculty: "Er. Vivek Rathore",
    totalLessons: 60,
    completedLessons: 52,
    progressPercentage: 86,
    hoursWatched: "40 hrs",
    nextClass: "Advanced Number Logic & Syllogisms",
    color: "from-purple-600 to-violet-700",
  },
];

export default function MyCoursesPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#163B65]">My Enrolled Courses</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Track syllabus completion, batch schedules, and assigned faculty for your active programs.
          </p>
        </div>
        <Link href="/courses">
          <Button variant="outline" className="border-teal-600 text-[#163B65] hover:bg-teal-50 text-xs font-semibold">
            Explore More Programs
          </Button>
        </Link>
      </div>

      {/* Courses List */}
      <div className="grid grid-cols-1 gap-6">
        {enrolledCourses.map((course) => (
          <Card
            key={course.id}
            className="rounded-3xl border-gray-100 shadow-md bg-white overflow-hidden hover:shadow-lg transition-all"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Banner Left */}
              <div className={`lg:col-span-4 bg-gradient-to-br ${course.color} p-6 sm:p-8 text-white flex flex-col justify-between`}>
                <div className="space-y-3">
                  <Badge className="bg-white/20 text-white border-0 text-xs backdrop-blur-md">
                    {course.category}
                  </Badge>
                  <h3 className="text-xl font-bold leading-snug">{course.title}</h3>
                  <p className="text-xs text-white/80">
                    Lead Faculty: <strong>{course.faculty}</strong>
                  </p>
                </div>

                <div className="pt-6 border-t border-white/20 text-xs text-white/90 space-y-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{course.batch}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{course.batchTiming}</span>
                  </div>
                </div>
              </div>

              {/* Progress & Content Right */}
              <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="font-semibold text-gray-700">Course Progress</span>
                    <span className="font-bold text-[#16A6A1] text-sm">{course.progressPercentage}%</span>
                  </div>
                  <Progress value={course.progressPercentage} className="h-3 bg-gray-100" />

                  <div className="grid grid-cols-3 gap-4 pt-4 mt-4 border-t border-gray-100 text-center">
                    <div>
                      <span className="text-xs text-gray-500 block">Lessons Completed</span>
                      <span className="font-bold text-gray-800 text-sm">
                        {course.completedLessons} / {course.totalLessons}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 block">Watch Hours</span>
                      <span className="font-bold text-gray-800 text-sm">{course.hoursWatched}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 block">Status</span>
                      <span className="font-bold text-emerald-600 text-sm">Active Enrolled</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-wider">Next Lecture Up:</span>
                    <span className="font-semibold text-gray-900">{course.nextClass}</span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Link href="/dashboard/recorded-classes" className="flex-1 sm:flex-none">
                      <Button className="w-full sm:w-auto bg-[#163B65] hover:bg-[#122e50] text-white text-xs font-semibold h-9 rounded-xl flex items-center gap-2">
                        <Play className="w-3.5 h-3.5 fill-white" />
                        Watch Lessons
                      </Button>
                    </Link>
                    <Link href="/dashboard/materials">
                      <Button variant="outline" className="text-xs h-9 rounded-xl border-gray-200">
                        Notes & DPP
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
