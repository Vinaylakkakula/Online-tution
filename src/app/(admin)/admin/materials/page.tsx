"use client";

import { useState, useRef } from "react";
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
  CheckCircle2,
  FileCheck,
  X,
  File,
} from "lucide-react";
import Link from "next/link";

export default function AdminMaterialsPage() {
  const { materials, courses, store } = useLMSData();
  const [modalOpen, setModalOpen] = useState(false);

  // Form States
  const [title, setTitle] = useState("");
  const [courseTitle, setCourseTitle] = useState(
    courses[0]?.title || "IIT-JEE Comprehensive Mastery 2026-27"
  );
  const [subject, setSubject] = useState<"Physics" | "Chemistry" | "Mathematics" | "General">("Physics");
  const [chapter, setChapter] = useState("");
  const [fileType, setFileType] = useState<"PDF" | "Notes" | "Formula Sheet" | "DPP">("PDF");
  const [fileSize, setFileSize] = useState("3.8 MB");

  // Local File Upload States
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedFileDataUrl, setSelectedFileDataUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProcessFile = (file: File) => {
    setSelectedFileName(file.name);

    // Calculate readable file size
    const sizeInMB = file.size / (1024 * 1024);
    if (sizeInMB < 1) {
      setFileSize(`${Math.max(1, Math.round(file.size / 1024))} KB`);
    } else {
      setFileSize(`${sizeInMB.toFixed(1)} MB`);
    }

    // Auto-fill title if blank
    if (!title.trim()) {
      const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
    }

    // Auto-detect document type
    const lowerName = file.name.toLowerCase();
    if (lowerName.endsWith(".pdf")) {
      setFileType("PDF");
    } else if (lowerName.includes("formula")) {
      setFileType("Formula Sheet");
    } else if (lowerName.includes("dpp") || lowerName.includes("practice")) {
      setFileType("DPP");
    } else {
      setFileType("Notes");
    }

    // Read file into Data URL for offline / local downloads
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setSelectedFileDataUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleProcessFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClearFile = () => {
    setSelectedFileName("");
    setSelectedFileDataUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    store.addMaterial({
      id: `mat-${Date.now()}`,
      title: title.trim(),
      courseTitle: courseTitle || courses[0]?.title || "IIT-JEE Comprehensive Mastery 2026-27",
      subject,
      chapter: chapter.trim() || "General Topic",
      fileSize: fileSize || "3.2 MB",
      fileType,
      downloadUrl: selectedFileDataUrl || undefined,
      downloadsCount: 0,
      dateUploaded: "Just now",
    });

    setModalOpen(false);
    setTitle("");
    setChapter("");
    handleClearFile();
  };

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200/90 shadow-2xs">
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
            Upload PDFs, handwritten notes, and DPPs from your local device. They sync instantly to the student portal.
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
            <span>Upload Material from Computer</span>
          </Button>
        </div>
      </div>

      {/* Materials List */}
      <div className="space-y-3">
        {materials.map((mat) => (
          <Card key={mat.id} className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className="bg-[#EAF4FF] text-[#004B87] text-[10px] font-bold">
                    {mat.subject} • {mat.chapter}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] font-bold text-gray-600">
                    {mat.fileType}
                  </Badge>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs font-semibold text-gray-500">{mat.courseTitle}</span>
                </div>

                <h3 className="font-extrabold text-base text-gray-900 leading-snug">
                  {mat.title}
                </h3>

                <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                  <span>File Size: {mat.fileSize}</span>
                  <span>•</span>
                  <span>Uploaded: {mat.dateUploaded}</span>
                  <span>•</span>
                  <span>{mat.downloadsCount} Student Downloads</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
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
            </div>
          </Card>
        ))}
      </div>

      {/* Upload Modal with REAL Local File Browser & Dropzone */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-lg rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-gray-900 flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-[#004B87]" />
              Upload Study Material (PDF / DPP / Notes)
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreate} className="space-y-4 pt-2">
            {/* 1. LOCAL FILE UPLOAD DROPZONE */}
            <div>
              <Label className="text-xs font-bold text-gray-700 block mb-1">
                Select File from Local Computer *
              </Label>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInputChange}
                accept=".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg,.txt"
                className="hidden"
              />

              {!selectedFileName ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                    isDragging
                      ? "border-[#004B87] bg-blue-50/80 scale-[0.99]"
                      : "border-gray-300 hover:border-[#004B87] hover:bg-gray-50/70 bg-gray-50/30"
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-[#004B87] flex items-center justify-center mx-auto mb-2">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-black text-[#004B87] block">
                    Click to browse files or drag & drop here
                  </span>
                  <span className="text-[11px] text-gray-500 block mt-0.5 font-medium">
                    Supports PDF, Word (.docx), PPT, DPPs, and Images (up to 50 MB)
                  </span>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-xs font-black text-gray-900 block truncate">
                        {selectedFileName}
                      </span>
                      <span className="text-[11px] text-emerald-700 font-bold block">
                        {fileSize} • Ready to Publish
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs font-bold text-[#004B87] hover:bg-white h-8 px-2.5 rounded-lg"
                    >
                      Change
                    </Button>
                    <button
                      type="button"
                      onClick={handleClearFile}
                      className="p-1 text-gray-400 hover:text-red-600 rounded-md"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 2. TITLE */}
            <div>
              <Label className="text-xs font-bold text-gray-700">Material Title *</Label>
              <Input
                required
                placeholder="e.g. Master Handwritten Notes: Optics & Lens Formula"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 text-xs rounded-xl h-10"
              />
            </div>

            {/* 3. TIED COURSE */}
            <div>
              <Label className="text-xs font-bold text-gray-700">Tied to Course *</Label>
              <select
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                className="w-full mt-1 h-10 px-3 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#004B87]"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.title}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. SUBJECT & DOCUMENT TYPE */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-bold text-gray-700">Subject</Label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value as any)}
                  className="w-full mt-1 h-10 px-3 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#004B87]"
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
                  className="w-full mt-1 h-10 px-3 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#004B87]"
                >
                  <option value="PDF">PDF eBook</option>
                  <option value="Notes">Handwritten Notes</option>
                  <option value="Formula Sheet">Formula Sheet</option>
                  <option value="DPP">Daily Practice Problem (DPP)</option>
                </select>
              </div>
            </div>

            {/* 5. CHAPTER / TOPIC */}
            <div>
              <Label className="text-xs font-bold text-gray-700">Chapter / Topic</Label>
              <Input
                placeholder="e.g. Chapter 4: Ray Optics"
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                className="mt-1 text-xs rounded-xl h-10"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-gray-100">
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
                className="bg-[#004B87] hover:bg-[#003866] text-white text-xs font-black rounded-xl h-10 px-5 shadow-sm"
              >
                Upload & Publish to Students
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
