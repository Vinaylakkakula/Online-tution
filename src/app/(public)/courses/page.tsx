"use client";

import { useState } from "react";
import Link from "next/link";
import { useLMSData } from "@/lib/lms-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpen,
  Clock,
  Users,
  Play,
  Star,
  Search,
  GraduationCap,
  ChevronRight,
  Filter,
  Sparkles,
} from "lucide-react";

export default function CoursesPage() {
  const { courses } = useLMSData();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [classFilter, setClassFilter] = useState("all");

  const publishedCourses = courses.filter((c) => c.isPublished);

  const filteredCourses = publishedCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.faculty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || course.category === categoryFilter;

    const matchesClass =
      classFilter === "all" ||
      (course.targetClass && course.targetClass.toLowerCase().includes(classFilter.toLowerCase()));

    return matchesSearch && matchesCategory && matchesClass;
  });

  return (
    <div>
      {/* Page Header */}
      <section className="pt-28 pb-12 bg-gradient-to-br from-[#163B65] via-[#104375] to-[#16A6A1] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-20 w-64 h-64 bg-[#16A6A1]/15 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-20 w-48 h-48 bg-[#16A6A1]/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-md mb-4 border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Real-Time Academic Catalog</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Explore Our Academic Programs
            </h1>
            <p className="mt-3 text-white/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Live interactive and structured foundational courses for IIT-JEE, Olympiads, and NTSE. All curriculums are synchronized live with the Academic Control Center.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-white border-b border-gray-100 sticky top-16 lg:top-20 z-30 backdrop-blur-sm bg-white/95 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search courses, instructors, subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 border-gray-200 focus:border-[#004B87] rounded-xl text-xs"
              />
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[160px] h-10 text-xs rounded-xl border-gray-200">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="IIT-JEE">IIT-JEE</SelectItem>
                  <SelectItem value="Olympiad">Olympiad</SelectItem>
                  <SelectItem value="NTSE">NTSE</SelectItem>
                  <SelectItem value="Foundation">Foundation</SelectItem>
                </SelectContent>
              </Select>

              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger className="w-full sm:w-[160px] h-10 text-xs rounded-xl border-gray-200">
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="6">Class 6–8</SelectItem>
                  <SelectItem value="9">Class 9–10</SelectItem>
                  <SelectItem value="11">Class 11–12</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12 bg-[#F6F8FC] min-h-[500px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
              Showing <span className="font-black text-[#004B87]">{filteredCourses.length}</span> Active Programs
            </p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Admin Sync Active</span>
            </div>
          </div>

          {filteredCourses.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-gray-200 shadow-sm space-y-3">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="text-base font-bold text-gray-800">No courses match your filter</h3>
              <p className="text-xs text-gray-500">Try adjusting your category search or clear filters.</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("all");
                  setClassFilter("all");
                }}
                className="text-xs rounded-xl"
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, idx) => (
                <Card
                  key={course.id}
                  className="group overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200/80 shadow-xs bg-white rounded-3xl flex flex-col justify-between"
                >
                  <div>
                    {/* Course Header Banner */}
                    <div
                      className={`h-44 bg-gradient-to-br ${
                        course.color ||
                        (idx % 2 === 0
                          ? "from-[#0C335C] via-[#104375] to-[#0A2A4D]"
                          : "from-[#4E146E] via-[#6B1F96] to-[#3B0E54]")
                      } relative overflow-hidden p-4 text-white flex flex-col justify-between`}
                    >
                      <div className="flex justify-between items-start">
                        <Badge className="bg-white/20 text-white backdrop-blur-md border-0 text-[10px] font-bold">
                          {course.category}
                        </Badge>
                        <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md rounded-full px-2.5 py-0.5 text-xs font-bold">
                          <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                          <span>4.9</span>
                        </div>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                        <GraduationCap className="w-32 h-32" />
                      </div>

                      <div className="relative z-10">
                        <span className="inline-block bg-[#FDB813] text-gray-950 font-black text-[10px] px-2 py-0.5 rounded-full shadow-xs">
                          {course.targetClass}
                        </span>
                      </div>
                    </div>

                    <CardContent className="p-5 space-y-3">
                      <h3 className="font-extrabold text-[#163B65] text-lg leading-snug group-hover:text-[#004B87] transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                        {course.description || "Comprehensive syllabus coverage with problem sets and live lectures."}
                      </p>

                      <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                        <Users className="w-3.5 h-3.5 text-[#16A6A1]" />
                        <span>Lead: <strong>{course.faculty}</strong></span>
                      </div>

                      <div className="flex items-center gap-4 text-[11px] text-gray-400 font-medium pt-1">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3 text-teal-600" /> {course.totalLessons} lessons
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-blue-600" /> {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-amber-600" /> {course.enrolledCount} enrolled
                        </span>
                      </div>
                    </CardContent>
                  </div>

                  <div className="p-5 pt-0">
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-black text-[#163B65]">
                          ₹{course.discountedPrice.toLocaleString("en-IN")}
                        </span>
                        {course.price > course.discountedPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            ₹{course.price.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                      <Link href="/dashboard/my-courses">
                        <Button size="sm" className="bg-[#004B87] hover:bg-[#003866] text-white text-xs font-bold rounded-xl h-9 px-3 gap-1 shadow-sm">
                          <span>Enroll</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
