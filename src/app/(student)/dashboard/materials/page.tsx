"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FileText,
  Download,
  Search,
  Filter,
  CheckCircle2,
  BookOpen,
  FileCheck,
  Sparkles,
} from "lucide-react";

interface MaterialItem {
  id: string;
  title: string;
  subject: "Physics" | "Chemistry" | "Mathematics" | "All";
  chapter: string;
  type: "Handwritten Notes" | "Formula Book" | "DPP Worksheet" | "Question Bank";
  fileSize: string;
  downloads: number;
  addedDate: string;
}

const materialsData: MaterialItem[] = [
  {
    id: "m-1",
    title: "Rotational Dynamics: Complete Comprehensive Formula Sheet & Shortcut Map",
    subject: "Physics",
    chapter: "Chapter 4: Rotational Mechanics",
    type: "Formula Book",
    fileSize: "2.4 MB",
    downloads: 1420,
    addedDate: "Nov 1, 2026",
  },
  {
    id: "m-2",
    title: "Master Handwritten Notes: Parallel Axis Theorem & Rolling Bodies (Dr. Rahul Sharma)",
    subject: "Physics",
    chapter: "Chapter 4: Rotational Mechanics",
    type: "Handwritten Notes",
    fileSize: "6.8 MB",
    downloads: 2190,
    addedDate: "Oct 28, 2026",
  },
  {
    id: "m-3",
    title: "Organic Chemistry Reaction Mechanism Map (All 45 Conversions on Single Chart)",
    subject: "Chemistry",
    chapter: "Chapter 3: Reaction Mechanisms",
    type: "Formula Book",
    fileSize: "4.1 MB",
    downloads: 3840,
    addedDate: "Oct 25, 2026",
  },
  {
    id: "m-4",
    title: "Calculus & Coordinate Geometry 200 Advanced Level Numerical Problem Bank",
    subject: "Mathematics",
    chapter: "Calculus Mastery",
    type: "Question Bank",
    fileSize: "8.5 MB",
    downloads: 1820,
    addedDate: "Oct 22, 2026",
  },
  {
    id: "m-5",
    title: "Daily Practice Problem (DPP) Set #14: Magnetism & Cyclotron Motion with Solutions",
    subject: "Physics",
    chapter: "Chapter 6: Magnetism",
    type: "DPP Worksheet",
    fileSize: "1.8 MB",
    downloads: 950,
    addedDate: "Yesterday",
  },
  {
    id: "m-6",
    title: "Thermodynamics & Heat Transfer Key Derivations for JEE Advanced & Olympiads",
    subject: "Physics",
    chapter: "Chapter 2: Thermodynamics",
    type: "Handwritten Notes",
    fileSize: "5.2 MB",
    downloads: 1610,
    addedDate: "Oct 19, 2026",
  },
];

export default function StudyMaterialsPage() {
  const [selectedSubject, setSelectedSubject] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [downloaded, setDownloaded] = useState<Record<string, boolean>>({});

  const filtered = materialsData.filter((item) => {
    const matchesSubject = selectedSubject === "All" || item.subject === selectedSubject;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.chapter.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const handleDownload = (id: string, title: string) => {
    setDownloaded((prev) => ({ ...prev, [id]: true }));
    // Simulate instantaneous secure file trigger
    const link = document.createElement("a");
    link.href = "#";
    link.setAttribute("download", `${title}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#163B65]">Digital Study Materials</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Download master handwritten educator notes, formula sheets, DPP workbooks, and past 15-year chapter question banks.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2 text-xs font-semibold w-full sm:w-auto">
          {["All", "Physics", "Chemistry", "Mathematics"].map((subj) => (
            <button
              key={subj}
              onClick={() => setSelectedSubject(subj)}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                selectedSubject === subj
                  ? "bg-[#163B65] text-white shadow-xs font-bold"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {subj}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search notes, chapters, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10 text-xs bg-white border-gray-200 rounded-xl"
          />
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <Card
            key={item.id}
            className="rounded-2xl border-gray-100 shadow-sm bg-white p-5 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge
                  variant="outline"
                  className={`text-[10px] ${
                    item.subject === "Physics"
                      ? "border-blue-400 text-blue-800 bg-blue-50"
                      : item.subject === "Chemistry"
                      ? "border-teal-400 text-teal-800 bg-teal-50"
                      : "border-purple-400 text-purple-800 bg-purple-50"
                  }`}
                >
                  {item.subject} • {item.type}
                </Badge>
                <span className="text-[11px] text-gray-400">{item.fileSize}</span>
              </div>

              <h3 className="text-sm font-bold text-gray-900 leading-snug">
                {item.title}
              </h3>

              <p className="text-xs text-gray-500 font-medium">
                {item.chapter}
              </p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-gray-400">
                {item.downloads} Downloads • Added {item.addedDate}
              </span>

              <Button
                size="sm"
                onClick={() => handleDownload(item.id, item.title)}
                className={`text-xs gap-1.5 rounded-xl h-9 px-4 ${
                  downloaded[item.id]
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "bg-[#163B65] hover:bg-[#122e50] text-white"
                }`}
              >
                {downloaded[item.id] ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Downloaded
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    Download PDF
                  </>
                )}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
