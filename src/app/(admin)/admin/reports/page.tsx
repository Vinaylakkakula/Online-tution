"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Download,
  Calendar,
  Users,
  CreditCard,
  Video,
  FileCheck2,
  TrendingUp,
} from "lucide-react";

interface ReportCardItem {
  id: string;
  title: string;
  description: string;
  recordsCount: string;
  updated: string;
  type: string;
}

const reportsCatalog: ReportCardItem[] = [
  {
    id: "rep-1",
    title: "Student Cohort Registration & Profile Master Ledger",
    description: "Full directory of all 842 registered students with contact details, target exams, class levels, and batch allocations.",
    recordsCount: "842 Records",
    updated: "Updated 10 mins ago",
    type: "student",
  },
  {
    id: "rep-2",
    title: "Course Revenue & Fee Gateway Audit Report",
    description: "Itemized transaction audit including payment methods (UPI/Cards/Netbanking), transaction IDs, gross receipts, and refunds.",
    recordsCount: "624 Transactions",
    updated: "Updated Today",
    type: "revenue",
  },
  {
    id: "rep-3",
    title: "Live Class Attendance & Zoom Room Logs",
    description: "Timestamped logs of student join times, dwell durations, and attendance percentages across all morning and evening cohorts.",
    recordsCount: "4,820 Attendance Entries",
    updated: "Updated 1 hr ago",
    type: "attendance",
  },
  {
    id: "rep-4",
    title: "National Mock Examination Performance & Percentile Distribution",
    description: "Question-by-question response matrix, negative mark counts, chapter accuracy breakdowns, and All India percentile rankings.",
    recordsCount: "1,240 Test Submissions",
    updated: "Updated Yesterday",
    type: "tests",
  },
  {
    id: "rep-5",
    title: "Mux Video Streaming & Lesson Watch Retention Analytics",
    description: "Total streaming minutes, drop-off curves, playback speeds selected, and chapter completion rates per student.",
    recordsCount: "18,400 Playback Sessions",
    updated: "Updated 2 hrs ago",
    type: "video",
  },
];

export default function AdminReportsPage() {
  const [downloading, setDownloading] = useState<Record<string, boolean>>({});

  const handleDownload = (rep: ReportCardItem) => {
    setDownloading((prev) => ({ ...prev, [rep.id]: true }));
    setTimeout(() => {
      const csv = `Report Name,${rep.title}\nGenerated At,${new Date().toISOString()}\nTotal Records,${rep.recordsCount}\nStatus,Verified System Extract\n`;
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${rep.title.replace(/\s+/g, "_")}.csv`;
      a.click();
      setDownloading((prev) => ({ ...prev, [rep.id]: false }));
    }, 700);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#163B65]">Institutional Analytics & Export Center</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Download institutional compliance records, attendance logs, exam marksheets, and revenue ledger CSVs.
          </p>
        </div>
      </div>

      {/* Reports List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportsCatalog.map((rep) => (
          <Card
            key={rep.id}
            className="rounded-3xl border-gray-100 shadow-md bg-white p-6 space-y-4 hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="border-teal-400 text-teal-800 bg-teal-50 text-[10px]">
                  {rep.recordsCount}
                </Badge>
                <span className="text-[11px] text-gray-400">{rep.updated}</span>
              </div>

              <h3 className="text-base font-bold text-gray-900 leading-snug">{rep.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{rep.description}</p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="text-[11px] text-gray-400">CSV Export Format (RFC 4180)</span>
              <Button
                size="sm"
                onClick={() => handleDownload(rep)}
                className="bg-[#163B65] hover:bg-[#122e50] text-white text-xs h-9 px-4 rounded-xl gap-2 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                {downloading[rep.id] ? "Preparing CSV..." : "Download CSV"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
