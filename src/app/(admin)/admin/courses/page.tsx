"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  Eye,
  EyeOff,
  Users,
  Clock,
  Sparkles,
} from "lucide-react";

interface AdminCourse {
  id: string;
  title: string;
  category: string;
  targetClass: string;
  faculty: string;
  price: number;
  discountedPrice: number;
  totalLessons: number;
  duration: string;
  isPublished: boolean;
  enrolledCount: number;
}

const mockCourses: AdminCourse[] = [
  {
    id: "c-1",
    title: "IIT-JEE Comprehensive Mastery 2026-27",
    category: "IIT-JEE",
    targetClass: "Class 11 & 12",
    faculty: "Dr. Rahul Sharma & Er. Amit Verma",
    price: 49999,
    discountedPrice: 34999,
    totalLessons: 240,
    duration: "24 Months",
    isPublished: true,
    enrolledCount: 420,
  },
  {
    id: "c-2",
    title: "JEE Fast-Track Revision & Crash Course",
    category: "IIT-JEE",
    targetClass: "Class 12 & Dropper",
    faculty: "Dr. Rahul Sharma",
    price: 19999,
    discountedPrice: 14999,
    totalLessons: 80,
    duration: "3 Months",
    isPublished: true,
    enrolledCount: 185,
  },
  {
    id: "c-3",
    title: "Physics Olympiad Advanced Sprint (NSEP & INPhO)",
    category: "Olympiad",
    targetClass: "Class 10 & 11",
    faculty: "Dr. Rahul Sharma",
    price: 24999,
    discountedPrice: 18999,
    totalLessons: 80,
    duration: "6 Months",
    isPublished: true,
    enrolledCount: 94,
  },
  {
    id: "c-4",
    title: "National Talent Search (NTSE) Stage 1 & 2 Prep",
    category: "NTSE",
    targetClass: "Class 9 & 10",
    faculty: "Er. Vivek Rathore",
    price: 15999,
    discountedPrice: 11999,
    totalLessons: 60,
    duration: "6 Months",
    isPublished: true,
    enrolledCount: 143,
  },
];

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<AdminCourse[]>(mockCourses);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<AdminCourse | null>(null);

  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("IIT-JEE");
  const [formClass, setFormClass] = useState("Class 11");
  const [formFaculty, setFormFaculty] = useState("Dr. Rahul Sharma");
  const [formPrice, setFormPrice] = useState("34999");
  const [formLessons, setFormLessons] = useState("120");

  const openCreateModal = () => {
    setEditingCourse(null);
    setFormTitle("");
    setFormCategory("IIT-JEE");
    setFormClass("Class 11");
    setFormFaculty("Dr. Rahul Sharma");
    setFormPrice("29999");
    setFormLessons("100");
    setModalOpen(true);
  };

  const openEditModal = (c: AdminCourse) => {
    setEditingCourse(c);
    setFormTitle(c.title);
    setFormCategory(c.category);
    setFormClass(c.targetClass);
    setFormFaculty(c.faculty);
    setFormPrice(c.discountedPrice.toString());
    setFormLessons(c.totalLessons.toString());
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle) return;

    if (editingCourse) {
      setCourses(
        courses.map((c) =>
          c.id === editingCourse.id
            ? {
                ...c,
                title: formTitle,
                category: formCategory,
                targetClass: formClass,
                faculty: formFaculty,
                discountedPrice: Number(formPrice),
                totalLessons: Number(formLessons),
              }
            : c
        )
      );
    } else {
      const newCourse: AdminCourse = {
        id: `c-${Date.now()}`,
        title: formTitle,
        category: formCategory,
        targetClass: formClass,
        faculty: formFaculty,
        price: Number(formPrice) * 1.3,
        discountedPrice: Number(formPrice),
        totalLessons: Number(formLessons),
        duration: "12 Months",
        isPublished: true,
        enrolledCount: 0,
      };
      setCourses([newCourse, ...courses]);
    }
    setModalOpen(false);
  };

  const togglePublish = (id: string) => {
    setCourses(
      courses.map((c) => (c.id === id ? { ...c, isPublished: !c.isPublished } : c))
    );
  };

  const deleteCourse = (id: string) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#163B65]">Course Curriculum & Catalog</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Create structured courses, configure pricing, manage curriculum subjects, and publish programs to public portal.
          </p>
        </div>

        <Button
          onClick={openCreateModal}
          className="bg-[#163B65] hover:bg-[#122e50] text-white text-xs font-semibold rounded-xl h-10 px-4 gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Create New Course
        </Button>
      </div>

      {/* Courses List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((c) => (
          <Card
            key={c.id}
            className="rounded-3xl border-gray-100 shadow-md bg-white p-6 space-y-4 hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge className="bg-[#163B65] text-white text-[10px]">
                  {c.category}
                </Badge>
                <button
                  onClick={() => togglePublish(c.id)}
                  className={`flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                    c.isPublished
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {c.isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{c.isPublished ? "Live Published" : "Draft Hidden"}</span>
                </button>
              </div>

              <h3 className="text-base font-bold text-gray-900 leading-snug">{c.title}</h3>

              <div className="space-y-1 text-xs text-gray-500">
                <p>Lead Faculty: <strong className="text-gray-800">{c.faculty}</strong></p>
                <p>Target: <strong className="text-gray-800">{c.targetClass}</strong> • Duration: {c.duration}</p>
                <p>Total Curriculum: <strong className="text-gray-800">{c.totalLessons} Lessons</strong></p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400 block line-through">₹{Math.round(c.price).toLocaleString()}</span>
                <span className="text-lg font-black text-[#16A6A1]">₹{c.discountedPrice.toLocaleString()}</span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditModal(c)}
                  className="h-9 text-xs rounded-xl border-gray-200"
                >
                  <Edit className="w-3.5 h-3.5 text-gray-600 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteCourse(c.id)}
                  className="h-9 text-xs rounded-xl border-red-200 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Course Edit/Create Dialog */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[560px] p-6 rounded-3xl bg-white border-0 shadow-2xl space-y-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-[#163B65]">
              {editingCourse ? "Edit Course Details" : "Create New Course"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div>
              <Label className="text-xs font-semibold text-gray-700">Course Title *</Label>
              <Input
                required
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="e.g. IIT-JEE Main & Advanced 2-Year Program"
                className="mt-1 h-10 border-gray-200"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-semibold text-gray-700">Category *</Label>
                <Select value={formCategory} onValueChange={setFormCategory}>
                  <SelectTrigger className="mt-1 h-10 border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IIT-JEE">IIT-JEE</SelectItem>
                    <SelectItem value="Olympiad">Olympiad</SelectItem>
                    <SelectItem value="NTSE">NTSE</SelectItem>
                    <SelectItem value="Foundation">Foundation</SelectItem>
                    <SelectItem value="Other Courses">Other Courses</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs font-semibold text-gray-700">Target Class *</Label>
                <Input
                  value={formClass}
                  onChange={(e) => setFormClass(e.target.value)}
                  placeholder="e.g. Class 11-12"
                  className="mt-1 h-10 border-gray-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-semibold text-gray-700">Lead Faculty</Label>
                <Input
                  value={formFaculty}
                  onChange={(e) => setFormFaculty(e.target.value)}
                  placeholder="Dr. Rahul Sharma"
                  className="mt-1 h-10 border-gray-200"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold text-gray-700">Offer Price (₹) *</Label>
                <Input
                  type="number"
                  value={formPrice}
                  onChange={(e) => setFormPrice(e.target.value)}
                  placeholder="34999"
                  className="mt-1 h-10 border-gray-200"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setModalOpen(false)}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-[#163B65] text-white rounded-xl">
                {editingCourse ? "Save Changes" : "Create Course"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
