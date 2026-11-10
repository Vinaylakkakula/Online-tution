"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  FileCheck2,
  Plus,
  Clock,
  Award,
  Users,
  CheckCircle2,
  Trash2,
  Share2,
  GraduationCap,
} from "lucide-react";
import { useLMSData, LMSTest } from "@/lib/lms-store";

export default function AdminTestsPage() {
  const { tests, courses, store } = useLMSData();
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [courseTitle, setCourseTitle] = useState(
    courses[0]?.title || "IIT-JEE Comprehensive Mastery 2026-27"
  );
  const [category, setCategory] = useState<"Mock" | "Sectional" | "Topic" | "Grand">("Mock");
  const [duration, setDuration] = useState("180");
  const [marks, setMarks] = useState("300");
  const [questions, setQuestions] = useState("75");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTest: LMSTest = {
      id: `test-${Date.now()}`,
      title: title.trim(),
      courseTitle: courseTitle || courses[0]?.title || "General",
      category,
      questionsCount: Number(questions) || 50,
      duration: `${duration} Mins`,
      totalMarks: Number(marks) || 100,
      status: "Available",
      questions: [],
    };

    store.addTest(newTest);
    setModalOpen(false);
    setTitle("");
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this examination?")) {
      store.deleteTest(id);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-[#004B87] text-white text-[10px] font-bold">
              Assessment Engine
            </Badge>
            <span className="text-xs text-gray-500 font-semibold">
              NTA CBT Architecture
            </span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Examinations & Test Builder
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            Author national mock tests, configure negative marking rules, set timing limits, and publish answer keys.
          </p>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          className="bg-[#004B87] hover:bg-[#003866] text-white font-extrabold text-xs h-10 px-5 rounded-xl shadow-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          Create New Examination
        </Button>
      </div>

      {/* Tests List */}
      <div className="space-y-4">
        {tests.map((test) => (
          <Card
            key={test.id}
            className="rounded-2xl border-gray-200/90 shadow-2xs hover:shadow-md transition-shadow bg-white p-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                    Published Exam
                  </Badge>
                  <Badge className="bg-blue-50 text-[#004B87] border border-blue-200 text-[10px] font-bold">
                    {test.category} Test
                  </Badge>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs font-bold text-gray-600 truncate max-w-xs">
                    {test.courseTitle}
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-gray-900">
                  {test.title}
                </h3>

                <div className="flex items-center gap-4 text-xs text-gray-500 font-medium flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>{test.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-gray-400" />
                    <span>
                      {test.questionsCount} Questions ({test.totalMarks} Marks)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alert(`Opening Question Bank for ${test.title}`)}
                  className="text-xs font-bold rounded-xl h-9 px-4 border-gray-200 text-gray-700"
                >
                  Question Bank
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(test.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs rounded-xl h-9 px-3"
                  title="Delete Exam"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Test Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-gray-900 flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-[#004B87]" />
              Create New Examination
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreate} className="space-y-4 pt-2">
            <div>
              <Label className="text-xs font-bold text-gray-700">Exam Title *</Label>
              <Input
                required
                placeholder="e.g. All India JEE Mock Test #09 (Full Syllabus)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 text-xs rounded-xl h-10"
              />
            </div>

            <div>
              <Label className="text-xs font-bold text-gray-700">Tied to Course *</Label>
              <Select value={courseTitle} onValueChange={setCourseTitle}>
                <SelectTrigger className="mt-1 text-xs rounded-xl h-10">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((c) => (
                    <SelectItem key={c.id} value={c.title} className="text-xs font-medium">
                      {c.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-bold text-gray-700">Category *</Label>
                <Select
                  value={category}
                  onValueChange={(v: "Mock" | "Sectional" | "Topic" | "Grand") => setCategory(v)}
                >
                  <SelectTrigger className="mt-1 text-xs rounded-xl h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mock" className="text-xs">Mock Test</SelectItem>
                    <SelectItem value="Sectional" className="text-xs">Sectional Test</SelectItem>
                    <SelectItem value="Topic" className="text-xs">Topic Test</SelectItem>
                    <SelectItem value="Grand" className="text-xs">Grand Test</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs font-bold text-gray-700">Duration (Minutes)</Label>
                <Input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="180"
                  className="mt-1 text-xs rounded-xl h-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-bold text-gray-700">Questions Count</Label>
                <Input
                  type="number"
                  value={questions}
                  onChange={(e) => setQuestions(e.target.value)}
                  placeholder="75"
                  className="mt-1 text-xs rounded-xl h-10"
                />
              </div>

              <div>
                <Label className="text-xs font-bold text-gray-700">Total Marks</Label>
                <Input
                  type="number"
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                  placeholder="300"
                  className="mt-1 text-xs rounded-xl h-10"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
              <Button
                type="button"
                variant="outline"
                onClick={() => setModalOpen(false)}
                className="text-xs rounded-xl h-10 px-4"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#004B87] hover:bg-[#003866] text-white text-xs font-extrabold rounded-xl h-10 px-5 shadow-sm"
              >
                Publish Examination
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
