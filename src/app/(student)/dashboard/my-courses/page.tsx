"use client";

import { useState } from "react";
import Link from "next/link";
import { useLMSData } from "@/lib/lms-store";
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
  Plus,
} from "lucide-react";

export default function MyCoursesPage() {
  const { courses } = useLMSData();
  const [activeTab, setActiveTab] = useState<"continue" | "all" | "upcoming">("continue");
  const [language, setLanguage] = useState<"all" | "english" | "hinglish">("all");
  const [activeSubTab, setActiveSubTab] = useState("about");

  const publishedCourses = courses.filter((c) => c.isPublished);

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
            All Courses ({publishedCourses.length})
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
          All ({publishedCourses.length})
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

      {/* DYNAMIC COURSES LIST (Reflects courses added from Admin in real-time) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Enrolled Academic Programs
          </h2>
          <span className="text-xs text-gray-500 font-semibold">
            {publishedCourses.length} Active Courses Available
          </span>
        </div>

        {/* Dynamic Grid of All Published Courses */}
        <div className="grid grid-cols-1 gap-6">
          {publishedCourses.map((course, idx) => (
            <Card
              key={course.id}
              className="rounded-2xl border-gray-200/90 shadow-sm bg-white overflow-hidden hover:shadow-md transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Banner Left */}
                <div
                  className={`lg:col-span-4 bg-gradient-to-br ${
                    course.color || (idx % 2 === 0 ? "from-[#0C335C] via-[#104375] to-[#0A2A4D]" : "from-[#4E146E] via-[#6B1F96] to-[#3B0E54]")
                  } p-6 sm:p-7 text-white flex flex-col justify-between`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#FDB813] text-gray-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                        {course.category}
                      </span>
                      <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs">
                        {course.targetClass}
                      </span>
                    </div>

                    <h3 className="text-xl font-black leading-snug">{course.title}</h3>
                    <p className="text-xs text-white/80">
                      Lead Faculty: <strong>{course.faculty}</strong>
                    </p>
                    {course.description && (
                      <p className="text-[11px] text-white/70 line-clamp-2 pt-1">{course.description}</p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-white/20 text-xs text-white/90 flex items-center justify-between">
                    <span className="font-bold">Fee: ₹{course.discountedPrice.toLocaleString()}</span>
                    <span>{course.duration || "12 Months"}</span>
                  </div>
                </div>

                {/* Progress & Content Right */}
                <div className="lg:col-span-8 p-6 flex flex-col justify-between space-y-5">
                  <div>
                    <div className="flex justify-between items-center text-xs mb-2">
                      <span className="font-extrabold text-gray-700">Course Syllabus Progress</span>
                      <span className="font-black text-[#004B87] text-sm">72% Completed</span>
                    </div>
                    <Progress value={72} className="h-2.5 bg-gray-100" />

                    <div className="grid grid-cols-3 gap-3 pt-4 mt-4 border-t border-gray-100 text-center">
                      <div>
                        <span className="text-[11px] text-gray-400 block font-medium">Curriculum</span>
                        <span className="font-black text-gray-800 text-sm">
                          {course.totalLessons} Lessons
                        </span>
                      </div>
                      <div>
                        <span className="text-[11px] text-gray-400 block font-medium">Students Enrolled</span>
                        <span className="font-black text-[#004B87] text-sm">{course.enrolledCount || 142} Students</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-gray-400 block font-medium">Status</span>
                        <span className="font-black text-emerald-600 text-sm">Enrolled & Active</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-wider">
                        Next Lesson Available:
                      </span>
                      <span className="font-bold text-gray-900">
                        {course.category} Practice Module #05
                      </span>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <Link href="/dashboard/recorded-classes" className="flex-1 sm:flex-none">
                        <Button className="w-full sm:w-auto bg-[#004B87] hover:bg-[#003866] text-white text-xs font-black h-9 rounded-xl flex items-center gap-2">
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>Watch Lessons</span>
                        </Button>
                      </Link>
                      <Link href="/dashboard/materials">
                        <Button variant="outline" className="text-xs h-9 rounded-xl border-gray-200 font-bold">
                          Study Notes
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

      {/* SECTION 2: Course Highlights (Oliveboard Screenshot 3 Style) */}
      <div className="space-y-6 pt-4">
        {/* Course Highlights Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#D32F2F] rounded-full inline-block" />
            <h3 className="text-lg font-black text-gray-900 tracking-tight">
              Course Highlights & Learning Assets
            </h3>
          </div>

          {/* 6 Cards in a 3x2 Grid (Screenshot 3 style) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs hover:shadow-md transition-shadow flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#EA580C] flex items-center justify-center shrink-0 border border-orange-100">
                <Play className="w-6 h-6 fill-[#EA580C]" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm text-gray-900">170+ Live Classes</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Concept-based, Interactive & Practice-oriented Classes with Top Faculty
                </p>
              </div>
            </div>

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

            <div className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs hover:shadow-md transition-shadow flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0284C7] flex items-center justify-center shrink-0 border border-blue-100">
                <Calendar className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm text-gray-900">Daily Practice Tests</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Short, topic-wise practice tests to ensure regular revision
                </p>
              </div>
            </div>

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
