"use client";

import { useState } from "react";
import { useLMSData } from "@/lib/lms-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Download,
  Search,
  BookOpen,
  CheckCircle2,
  FileCheck2,
  Sparkles,
} from "lucide-react";

export default function MaterialsPage() {
  const { materials } = useLMSData();
  const [selectedSubject, setSelectedSubject] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const filteredMaterials = materials.filter((m) => {
    const matchSubject = selectedSubject === "All" || m.subject === selectedSubject;
    const matchSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.chapter.toLowerCase().includes(search.toLowerCase());
    return matchSubject && matchSearch;
  });

  const handleDownload = (id: string, title: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      alert(`Downloading "${title}"... In production this opens the secure PDF.`);
    }, 700);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Study Materials & Formula Sheets
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Download educator handwritten notes, chapter problem sets, and formula cheat-sheets.
          </p>
        </div>

        <div className="w-full sm:w-72">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search notes, chapters..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 h-9.5 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#004B87]"
            />
          </div>
        </div>
      </div>

      {/* Subject Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {["All", "Physics", "Chemistry", "Mathematics", "General"].map((sub) => (
          <button
            key={sub}
            onClick={() => setSelectedSubject(sub)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-2xs ${
              selectedSubject === sub
                ? "bg-[#004B87] text-white"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* Materials List */}
      <div className="space-y-3">
        {filteredMaterials.map((mat) => (
          <Card key={mat.id} className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <Badge className="bg-[#EAF4FF] text-[#004B87] text-[10px] font-bold">
                    {mat.subject}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] text-gray-500 font-medium">
                    {mat.chapter}
                  </Badge>
                  <span className="text-[10px] text-gray-400">{mat.fileSize}</span>
                </div>

                <h3 className="text-base font-black text-gray-900">{mat.title}</h3>

                <p className="text-xs text-gray-500">
                  {mat.fileType} • {mat.downloadsCount.toLocaleString()} downloads • Uploaded {mat.dateUploaded}
                </p>
              </div>

              <Button
                onClick={() => handleDownload(mat.id, mat.title)}
                disabled={downloadingId === mat.id}
                className="bg-[#004B87] hover:bg-[#003866] text-white text-xs font-black rounded-xl h-10 px-5 gap-1.5 shadow-sm shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>{downloadingId === mat.id ? "Preparing..." : "Download PDF"}</span>
              </Button>
            </div>
          </Card>
        ))}

        {filteredMaterials.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 p-8 space-y-2">
            <FileText className="w-10 h-10 text-gray-300 mx-auto" />
            <h4 className="font-bold text-gray-800">No materials found</h4>
            <p className="text-xs text-gray-400">Try adjusting your search query or subject filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
