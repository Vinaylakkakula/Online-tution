"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
  FileCheck2,
  Plus,
  Clock,
  Award,
  Users,
  CheckCircle2,
  Trash2,
  Share2,
} from "lucide-react";

interface AdminTest {
  id: string;
  title: string;
  course: string;
  durationMinutes: number;
  totalMarks: number;
  questionsCount: number;
  attemptsCount: number;
  status: "published" | "draft" | "completed";
}

const mockTests: AdminTest[] = [
  {
    id: "test-1",
    title: "All India JEE Mock Test #08 (Full Syllabus)",
    course: "IIT-JEE Comprehensive Mastery 2026-27",
    durationMinutes: 180,
    totalMarks: 300,
    questionsCount: 75,
    attemptsCount: 380,
    status: "published",
  },
  {
    id: "test-2",
    title: "Rotational Dynamics & Gravity Chapter Speed Test",
    course: "IIT-JEE Comprehensive Mastery 2026-27",
    durationMinutes: 45,
    totalMarks: 100,
    questionsCount: 25,
    attemptsCount: 245,
    status: "published",
  },
  {
    id: "test-3",
    title: "National Olympiad Stage 1 Screening Assessment",
    course: "Physics Olympiad Advanced Sprint",
    durationMinutes: 120,
    totalMarks: 200,
    questionsCount: 50,
    attemptsCount: 88,
    status: "published",
  },
];

export default function AdminTestsPage() {
  const [tests, setTests] = useState<AdminTest[]>(mockTests);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("180");
  const [marks, setMarks] = useState("300");
  const [questions, setQuestions] = useState("75");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newTest: AdminTest = {
      id: `test-${Date.now()}`,
      title,
      course: "IIT-JEE Comprehensive Mastery 2026-27",
      durationMinutes: Number(duration),
      totalMarks: Number(marks),
      questionsCount: Number(questions),
      attemptsCount: 0,
      status: "published",
    };

    setTests([newTest, ...tests]);
    setModalOpen(false);
    setTitle("");
  };

  const deleteTest = (id: string) => {
    setTests(tests.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#163B65]">Examinations & Test Builder</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Author national mock tests, configure negative marking rules, set timing limits, and publish answer keys.
          </p>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          className="bg-[#163B65] hover:bg-[#122e50] text-white text-xs font-semibold rounded-xl h-10 px-4 gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Create New Examination
        </Button>
      </div>

      {/* Grid */}
      <div className="space-y-4">
        {tests.map((test) => (
          <Card key={test.id} className="rounded-2xl border-gray-100 shadow-sm bg-white p-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-100 text-emerald-800 text-[10px]">
                    {test.status === "published" ? "Published Exam" : "Draft"}
                  </Badge>
                  <span className="text-xs text-gray-500">{test.course}</span>
                </div>

                <h3 className="text-base font-bold text-gray-900">{test.title}</h3>

                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    <span>{test.durationMinutes} Minutes</span>
                  </div>
                  <span>•</span>
                  <span>{test.questionsCount} Questions ({test.totalMarks} Marks)</span>
                  <span>•</span>
                  <span className="font-semibold text-teal-700">{test.attemptsCount} Student Attempts</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button size="sm" variant="outline" className="text-xs h-9 rounded-xl border-gray-200">
                  Question Bank
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => deleteTest(test.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 h-9 w-9 p-0 rounded-xl"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Dialog */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[480px] p-6 rounded-3xl bg-white border-0 shadow-2xl space-y-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-[#163B65]">
              Create New Examination
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreate} className="space-y-4 text-xs">
            <div>
              <Label className="text-xs font-semibold text-gray-700">Test Title *</Label>
              <Input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. All India JEE Main Mock Test #09"
                className="mt-1 h-10 border-gray-200"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label className="text-xs font-semibold text-gray-700">Duration (Mins)</Label>
                <Input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="mt-1 h-10 border-gray-200"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold text-gray-700">Total Marks</Label>
                <Input
                  type="number"
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                  className="mt-1 h-10 border-gray-200"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold text-gray-700">Questions</Label>
                <Input
                  type="number"
                  value={questions}
                  onChange={(e) => setQuestions(e.target.value)}
                  className="mt-1 h-10 border-gray-200"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="bg-[#163B65] text-white rounded-xl">
                Create & Publish
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
