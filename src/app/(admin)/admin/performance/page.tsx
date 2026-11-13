"use client";

import { useState } from "react";
import { useLMSData, LMSStore, StudentPerformanceRecord } from "@/lib/lms-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Trophy,
  Download,
  Search,
  CheckCircle2,
  AlertTriangle,
  Award,
  BookOpen,
} from "lucide-react";

export default function AdminPerformancePage() {
  const { students, performance, refreshAll } = useLMSData();
  const [selectedStudentId, setSelectedStudentId] = useState("STD-1001");
  const [currentPerf, setCurrentPerf] = useState<StudentPerformanceRecord>(performance);
  const [message, setMessage] = useState("");

  const handleUpdateMarks = (subjectIdx: number, newMarks: number) => {
    const updatedScores = [...currentPerf.subjectScores];
    updatedScores[subjectIdx] = {
      ...updatedScores[subjectIdx],
      marks: newMarks,
    };

    const totalObtained = updatedScores.reduce((acc, curr) => acc + curr.marks, 0);
    const totalMax = updatedScores.reduce((acc, curr) => acc + curr.maxMarks, 0);
    const percentage = Math.round((totalObtained / totalMax) * 1000) / 10;

    const updatedPerf: StudentPerformanceRecord = {
      ...currentPerf,
      totalMarksObtained: totalObtained,
      totalMaxMarks: totalMax,
      overallPercentage: percentage,
      subjectScores: updatedScores,
    };

    setCurrentPerf(updatedPerf);
    LMSStore.updatePerformance(updatedPerf);
    setMessage("Marks saved and student report card updated!");
    refreshAll();
    setTimeout(() => setMessage(""), 2000);
  };

  const handleExportPerformance = () => {
    const rows = [
      ["Subject", "Marks Obtained", "Max Marks", "Percentage", "Grade"],
      ...currentPerf.subjectScores.map((s) => [
        s.subject,
        s.marks,
        s.maxMarks,
        `${Math.round((s.marks / s.maxMarks) * 100)}%`,
        s.grade,
      ]),
    ];
    const csvContent =
      "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `student_performance_${currentPerf.studentId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-200/90 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-purple-100 text-purple-900 text-xs font-black">
              Academics & Evaluations
            </span>
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Automated Grade Calculator
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Student Performance & Marks Entry 📊
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-2xl font-medium">
            Enter test and assignment scores, analyze weak areas, identify students needing practice, and generate official report cards.
          </p>
        </div>

        <Button
          onClick={handleExportPerformance}
          size="sm"
          className="rounded-xl text-xs font-black bg-[#004B87] hover:bg-[#003866] text-white gap-2 h-10 px-5 shadow-xs shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export Student Report CSV</span>
        </Button>
      </div>

      {message && (
        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 animate-slide-down">
          ✓ {message}
        </div>
      )}

      {/* Student Selector Card */}
      <Card className="p-6 rounded-3xl border border-gray-200 bg-white shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-black text-gray-900">
              Active Evaluation: {currentPerf.studentName} ({currentPerf.classLevel})
            </h3>
            <p className="text-xs text-gray-500 font-medium">
              Overall Score: <span className="font-bold text-indigo-700">{currentPerf.overallPercentage}%</span> • Total: {currentPerf.totalMarksObtained} / {currentPerf.totalMaxMarks} Marks
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500">Student:</span>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="h-9 px-3 rounded-xl border border-gray-200 text-xs font-bold bg-gray-50"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.classLevel})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Subject-Wise Marks Input Table */}
        <div className="overflow-x-auto pt-2 border-t border-gray-100">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-600 font-black">
                <th className="py-2.5 px-3">Subject Track</th>
                <th className="py-2.5 px-3 text-center">Current Marks</th>
                <th className="py-2.5 px-3 text-center">Max Marks</th>
                <th className="py-2.5 px-3 text-center">Grade</th>
                <th className="py-2.5 px-3 text-right">Update Marks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentPerf.subjectScores.map((sub, idx) => (
                <tr key={idx} className="hover:bg-gray-50/60">
                  <td className="py-3 px-3 font-black text-gray-900 flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{sub.subject}</span>
                  </td>
                  <td className="py-3 px-3 text-center font-bold text-indigo-700">
                    {sub.marks}
                  </td>
                  <td className="py-3 px-3 text-center text-gray-500">
                    {sub.maxMarks}
                  </td>
                  <td className="py-3 px-3 text-center font-black text-emerald-600">
                    {sub.grade}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Input
                        type="number"
                        min="0"
                        max={sub.maxMarks}
                        defaultValue={sub.marks}
                        onBlur={(e) =>
                          handleUpdateMarks(idx, Number(e.target.value) || sub.marks)
                        }
                        className="w-20 h-8 rounded-lg text-xs font-bold text-center border-gray-300"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
