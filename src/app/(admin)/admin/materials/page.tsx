"use client";

import { useState } from "react";
import { useLMSData, LMSMaterial } from "@/lib/lms-store";
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
  FileText,
  Plus,
  Trash2,
  UploadCloud,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export default function AdminMaterialsPage() {
  const { materials, courses, store } = useLMSData();
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [courseTitle, setCourseTitle] = useState(
    courses[0]?.title || "IIT-JEE Comprehensive Mastery 2026-27"
  );
  const [subject, setSubject] = useState<"Physics" | "Chemistry" | "Mathematics" | "General">("Physics");
  const [chapter, setChapter] = useState("");
  const [fileType, setFileType] = useState<"PDF" | "Notes" | "Formula Sheet" | "DPP">("PDF");
  const [fileSize, setFileSize] = useState("3.8 MB");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    store.addMaterial({
      id: `mat-${Date.now()}`,
      title,
      courseTitle: courseTitle || courses[0]?.title || "IIT-JEE Comprehensive Mastery 2026-27",
      subject,
      chapter: chapter || "General Mechanics",
      fileSize: fileSize || "3.2 MB",
      fileType,
      downloadsCount: 0,
      dateUploaded: "Just now",
    });

    setModalOpen(false);
    setTitle("");
    setChapter("");
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 text-xs font-black">
              Repository
            </span>
            <span className="text-xs text-gray-500 font-medium">• Study Materials & Notes</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Study Materials Repository ({materials.length})
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Uploaded materials immediately sync to the student library and course pages.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/dashboard/materials">
            <Button variant="outline" size="sm" className="h-10 text-xs font-bold text-[#004B87] rounded-xl gap-1.5">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Student View</span>
            </Button>
          </Link>

          <Button
            onClick={() => setModalOpen(true)}
            className="h-10 bg-[#004B87] hover:bg-[#003866] text-white text-xs font-black rounded-xl gap-1.5 shadow-sm"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Material</span>
          </Button>
        </div>
      </div>

      {/* Materials List */}
      <div className="space-y-3">
        {materials.map((mat) => (
          <Card key={mat.id} className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <Badge className="bg-[#EAF4FF] text-[#004B87] text-[10px] font-bold">
                    {mat.subject} • {mat.chapter}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] text-gray-500 font-medium">
                    {mat.fileType} • {mat.fileSize}
                  </Badge>
                  <span className="text-[10px] text-gray-400">Uploaded: {mat.dateUploaded}</span>
                </div>

                <h3 className="text-base font-black text-gray-900">{mat.title}</h3>

                <span className="text-xs text-emerald-700 font-bold block">
                  {mat.downloadsCount.toLocaleString()} Total Student Downloads Logged
                </span>
              </div>

              <Button
                size="sm"
                variant="outline"
                onClick={() => store.deleteMaterial(mat.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 text-xs font-bold rounded-xl h-9 px-3 gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Upload Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-gray-900 flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-[#004B87]" />
              Upload Study Material (PDF / DPP / Notes)
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreate} className="space-y-4 pt-2">
            <div>
              <Label className="text-xs font-bold text-gray-700">Material Title *</Label>
              <Input
                required
                placeholder="e.g. Master Handwritten Notes: Optics & Lens Formula"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 text-xs rounded-xl"
              />
            </div>

            <div>
              <Label className="text-xs font-bold text-gray-700">Tied to Course *</Label>
              <select
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                className="w-full mt-1 h-9 px-3 text-xs bg-white border border-gray-200 rounded-xl"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.title}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-bold text-gray-700">Subject</Label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value as any)}
                  className="w-full mt-1 h-9 px-3 text-xs bg-white border border-gray-200 rounded-xl"
                >
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <Label className="text-xs font-bold text-gray-700">Document Type</Label>
                <select
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value as any)}
                  className="w-full mt-1 h-9 px-3 text-xs bg-white border border-gray-200 rounded-xl"
                >
                  <option value="PDF">PDF eBook</option>
                  <option value="Notes">Handwritten Notes</option>
                  <option value="Formula Sheet">Formula Sheet</option>
                  <option value="DPP">Daily Practice Problem (DPP)</option>
                </select>
              </div>
            </div>

            <div>
              <Label className="text-xs font-bold text-gray-700">Chapter / Topic</Label>
              <Input
                placeholder="e.g. Chapter 4: Ray Optics"
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                className="mt-1 text-xs rounded-xl"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)} className="text-xs rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="bg-[#004B87] hover:bg-[#003866] text-white text-xs font-black rounded-xl">
                Upload & Publish
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
