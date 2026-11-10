"use client";

import { useState } from "react";
import { useLMSData, LMSCourse } from "@/lib/lms-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  BookOpen,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Users,
  Clock,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function AdminCoursesPage() {
  const { courses, store } = useLMSData();
  const [modalOpen, setModalOpen] = useState(false);

  // Form States
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<"IIT-JEE" | "Olympiad" | "NTSE" | "Foundation">("IIT-JEE");
  const [targetClass, setTargetClass] = useState("Class 11 – 12");
  const [faculty, setFaculty] = useState("Dr. Rahul Sharma");
  const [price, setPrice] = useState("34999");
  const [totalLessons, setTotalLessons] = useState("120");
  const [duration, setDuration] = useState("12 Months");
  const [description, setDescription] = useState("");

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    store.addCourse({
      id: `crs-${Date.now()}`,
      title,
      category,
      targetClass,
      faculty,
      price: Math.round(Number(price) * 1.3),
      discountedPrice: Number(price) || 34999,
      totalLessons: Number(totalLessons) || 120,
      duration: duration || "12 Months",
      isPublished: true,
      enrolledCount: 0,
      description: description || "Complete structured syllabus covering foundational and advanced concepts.",
    });

    setTitle("");
    setDescription("");
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#004B87] text-xs font-black">
              Academics
            </span>
            <span className="text-xs text-gray-500 font-medium">• Curriculum Manager</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Academic Courses & Programs ({courses.length})
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Any course created or updated here instantly reflects in the Student Portal and website.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/dashboard/my-courses">
            <Button variant="outline" size="sm" className="h-10 text-xs font-bold text-[#004B87] rounded-xl gap-1.5">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Student View</span>
            </Button>
          </Link>

          <Button
            onClick={() => setModalOpen(true)}
            className="h-10 bg-[#004B87] hover:bg-[#003866] text-white text-xs font-black rounded-xl gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Course</span>
          </Button>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map((course) => (
          <Card
            key={course.id}
            className="rounded-2xl border-gray-200/90 bg-white shadow-2xs hover:shadow-md transition-shadow p-5 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start gap-2">
                <Badge className="bg-[#EAF4FF] text-[#004B87] font-black text-[10px]">
                  {course.category} • {course.targetClass}
                </Badge>
                <Badge
                  className={
                    course.isPublished
                      ? "bg-emerald-100 text-emerald-800 font-bold text-[10px]"
                      : "bg-gray-100 text-gray-600 font-bold text-[10px]"
                  }
                >
                  {course.isPublished ? "Published" : "Draft"}
                </Badge>
              </div>

              <div>
                <h3 className="text-base font-black text-gray-900 leading-snug">{course.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">Faculty: {course.faculty}</p>
                {course.description && (
                  <p className="text-xs text-gray-600 line-clamp-2 mt-2 leading-relaxed">
                    {course.description}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-gray-100">
              <div className="grid grid-cols-3 gap-2 p-2.5 bg-gray-50 rounded-xl text-center text-xs">
                <div>
                  <span className="text-[10px] text-gray-400 block font-medium">Price</span>
                  <span className="font-black text-gray-900">₹{course.discountedPrice.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block font-medium">Lessons</span>
                  <span className="font-black text-gray-900">{course.totalLessons}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block font-medium">Enrolled</span>
                  <span className="font-black text-emerald-600">{course.enrolledCount}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => store.togglePublishCourse(course.id)}
                  className="text-xs font-bold text-[#004B87] hover:underline flex items-center gap-1.5"
                >
                  {course.isPublished ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{course.isPublished ? "Unpublish" : "Publish"}</span>
                </button>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => store.deleteCourse(course.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs font-bold h-8 px-2.5 gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Course Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-gray-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#004B87]" />
              Create & Publish New Course
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreateCourse} className="space-y-4 pt-2">
            <div>
              <Label className="text-xs font-bold text-gray-700">Course Title *</Label>
              <Input
                required
                placeholder="e.g. IIT-JEE Sprint 2027 Comprehensive"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 text-xs rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-bold text-gray-700">Category</Label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full mt-1 h-9 px-3 text-xs bg-white border border-gray-200 rounded-xl"
                >
                  <option value="IIT-JEE">IIT-JEE</option>
                  <option value="Olympiad">Olympiad</option>
                  <option value="NTSE">NTSE</option>
                  <option value="Foundation">Foundation</option>
                </select>
              </div>

              <div>
                <Label className="text-xs font-bold text-gray-700">Target Class</Label>
                <Input
                  value={targetClass}
                  onChange={(e) => setTargetClass(e.target.value)}
                  placeholder="Class 11 – 12"
                  className="mt-1 text-xs rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-bold text-gray-700">Lead Faculty</Label>
                <Input
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                  placeholder="Dr. Rahul Sharma"
                  className="mt-1 text-xs rounded-xl"
                />
              </div>

              <div>
                <Label className="text-xs font-bold text-gray-700">Fee (₹)</Label>
                <Input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="34999"
                  className="mt-1 text-xs rounded-xl"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-bold text-gray-700">Course Description</Label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief curriculum overview..."
                className="w-full mt-1 p-2.5 text-xs bg-white border border-gray-200 rounded-xl"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)} className="text-xs rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="bg-[#004B87] hover:bg-[#003866] text-white text-xs font-black rounded-xl">
                Create & Publish
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
