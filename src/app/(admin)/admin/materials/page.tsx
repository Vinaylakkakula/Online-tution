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
  FileText,
  Plus,
  Download,
  Trash2,
  UploadCloud,
  CheckCircle2,
} from "lucide-react";

interface AdminMaterial {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  fileSize: string;
  downloadsCount: number;
}

const mockAdminMaterials: AdminMaterial[] = [
  {
    id: "mat-1",
    title: "Rotational Dynamics: Complete Comprehensive Formula Sheet & Shortcut Map",
    subject: "Physics",
    chapter: "Chapter 4: Rotational Mechanics",
    fileSize: "2.4 MB",
    downloadsCount: 1420,
  },
  {
    id: "mat-2",
    title: "Master Handwritten Notes: Parallel Axis Theorem & Rolling Bodies",
    subject: "Physics",
    chapter: "Chapter 4: Rotational Mechanics",
    fileSize: "6.8 MB",
    downloadsCount: 2190,
  },
  {
    id: "mat-3",
    title: "Organic Chemistry Reaction Mechanism Map (45 Conversions)",
    subject: "Chemistry",
    chapter: "Chapter 3: Reaction Mechanisms",
    fileSize: "4.1 MB",
    downloadsCount: 3840,
  },
  {
    id: "mat-4",
    title: "Calculus & Coordinate Geometry 200 Advanced Numerical Problem Bank",
    subject: "Mathematics",
    chapter: "Calculus Mastery",
    fileSize: "8.5 MB",
    downloadsCount: 1820,
  },
];

export default function AdminMaterialsPage() {
  const [materials, setMaterials] = useState<AdminMaterial[]>(mockAdminMaterials);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("Physics");
  const [chapter, setChapter] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newMat: AdminMaterial = {
      id: `mat-${Date.now()}`,
      title,
      subject,
      chapter: chapter || "General Chapter",
      fileSize: "3.2 MB",
      downloadsCount: 0,
    };

    setMaterials([newMat, ...materials]);
    setModalOpen(false);
    setTitle("");
    setChapter("");
  };

  const deleteMat = (id: string) => {
    setMaterials(materials.filter((m) => m.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#163B65]">Study Materials Repository</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Publish educator notes, formula sheets, practice DPPs, and problem banks to student library.
          </p>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          className="bg-[#163B65] hover:bg-[#122e50] text-white text-xs font-semibold rounded-xl h-10 px-4 gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Upload Study Material
        </Button>
      </div>

      {/* Grid */}
      <div className="space-y-4">
        {materials.map((mat) => (
          <Card key={mat.id} className="rounded-2xl border-gray-100 shadow-sm bg-white p-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-teal-400 text-teal-800 bg-teal-50 text-[10px]">
                    {mat.subject} • {mat.chapter}
                  </Badge>
                  <span className="text-[10px] text-gray-400">{mat.fileSize}</span>
                </div>

                <h3 className="text-base font-bold text-gray-900">{mat.title}</h3>

                <span className="text-xs text-gray-500 font-semibold text-teal-700">
                  {mat.downloadsCount.toLocaleString()} Total Student Downloads
                </span>
              </div>

              <Button
                size="sm"
                variant="ghost"
                onClick={() => deleteMat(mat.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 h-9 w-9 p-0 rounded-xl"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Upload Dialog */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[480px] p-6 rounded-3xl bg-white border-0 shadow-2xl space-y-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-[#163B65]">
              Upload Study Material
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreate} className="space-y-4 text-xs">
            <div>
              <Label className="text-xs font-semibold text-gray-700">Document Title *</Label>
              <Input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Thermodynamics Practice Problem Bank"
                className="mt-1 h-10 border-gray-200"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-semibold text-gray-700">Subject</Label>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="mt-1 h-10 border-gray-200"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold text-gray-700">Chapter</Label>
                <Input
                  value={chapter}
                  onChange={(e) => setChapter(e.target.value)}
                  placeholder="Chapter 2: Heat"
                  className="mt-1 h-10 border-gray-200"
                />
              </div>
            </div>

            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
              <UploadCloud className="w-7 h-7 text-[#16A6A1] mx-auto mb-1.5" />
              <span className="text-xs font-bold text-gray-700 block">Select PDF Document to Upload</span>
              <span className="text-[10px] text-gray-400 block">Max file size 25 MB</span>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="bg-[#163B65] text-white rounded-xl">
                Upload & Publish
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
