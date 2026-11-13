"use client";

import { useState } from "react";
import Link from "next/link";
import { useLMSData, CartoonCourse } from "@/lib/lms-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  Clock,
  Users,
  Play,
  Star,
  Search,
  Sparkles,
  ArrowRight,
  FolderOpen,
  Gift,
  CheckCircle2,
} from "lucide-react";

export default function CoursesPage() {
  const { cartoonCourses } = useLMSData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");

  const filteredCourses = cartoonCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.classLevel.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGrade =
      selectedGrade === "all" || course.classLevel.toLowerCase() === selectedGrade.toLowerCase();

    return matchesSearch && matchesGrade;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 via-white to-purple-50/40 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Hero Header */}
        <div className="text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-900 font-black text-xs">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Cartoon-Based Learning Management System (LMS)</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
            Classes 6th to 10th Curriculum 🎒
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-medium">
            Explore complete syllabus tracks with subject subfolders, recorded video lessons, animated formula sheets, homework tasks, and interactive CBT quizzes!
          </p>

          {/* Grade Selector Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[
              { id: "all", label: "All Classes 🌟" },
              { id: "Class 6", label: "Class 6th 🚀" },
              { id: "Class 7", label: "Class 7th 🦖" },
              { id: "Class 8", label: "Class 8th 🤖" },
              { id: "Class 9", label: "Class 9th 🦉" },
              { id: "Class 10", label: "Class 10th 🥷" },
            ].map((grade) => (
              <button
                key={grade.id}
                onClick={() => setSelectedGrade(grade.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                  selectedGrade === grade.id
                    ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {grade.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search subjects, topics, or classes..."
            className="pl-10 h-11 rounded-2xl bg-white border-2 border-indigo-100 shadow-sm text-xs"
          />
        </div>

        {/* Courses Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((crs) => (
            <Card
              key={crs.id}
              className="p-6 rounded-3xl border-2 border-indigo-100 hover:border-indigo-400 bg-white hover:shadow-2xl transition-all flex flex-col justify-between group transform hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Discount Badge */}
              <div className="absolute top-0 right-0 bg-gradient-to-l from-rose-500 to-pink-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl shadow-xs">
                {crs.discountPercent}% OFF
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-3xl shadow-xs group-hover:scale-110 transition-transform">
                    {crs.mascot}
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                      {crs.classLevel} Full Course
                    </span>
                    <h3 className="text-lg font-black text-gray-900 mt-0.5">
                      {crs.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  {crs.subtitle}
                </p>

                {/* Subfolder Subjects Pill Badges (Requirement 3) */}
                <div className="space-y-1.5 pt-2 border-t border-gray-100">
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">
                    Included Subject Subfolders:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {crs.subjects.map((sub) => (
                      <span
                        key={sub.id}
                        className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 flex items-center gap-1"
                      >
                        <span>{sub.icon}</span>
                        <span>{sub.name}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing & Duration */}
                <div className="pt-2 border-t border-gray-100 flex items-baseline justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-gray-900">
                        ₹{crs.monthlyPrice}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        ₹{crs.originalPrice}
                      </span>
                      <span className="text-[10px] font-bold text-gray-500">/ month</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 block">
                      {crs.activeOffer}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                    {crs.totalChapters} Chapters
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 grid grid-cols-2 gap-2 border-t border-gray-100 mt-4">
                <Link href="/dashboard/subfolders" className="block">
                  <Button
                    variant="outline"
                    className="w-full rounded-xl text-xs font-bold border-indigo-200 text-indigo-700 hover:bg-indigo-50 h-10 gap-1"
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>Subfolders</span>
                  </Button>
                </Link>

                <Link href="/demo" className="block">
                  <Button className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs rounded-xl h-10 shadow-md gap-1">
                    <Gift className="w-3.5 h-3.5" />
                    <span>Free Trial</span>
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
