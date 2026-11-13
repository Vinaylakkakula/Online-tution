"use client";

import { useState } from "react";
import { useLMSData, LMSStore, AttendanceRecord } from "@/lib/lms-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CalendarDays,
  CheckCircle2,
  XCircle,
  Download,
  Search,
  Filter,
  Check,
  Printer,
  Sparkles,
} from "lucide-react";

export default function AdminAttendancePage() {
  const { students, attendance, refreshAll } = useLMSData();
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedDate, setSelectedDate] = useState("2026-11-13");
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");

  const filteredStudents = students.filter((s) => {
    const matchClass = selectedClass === "all" || s.classLevel === selectedClass;
    const matchSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchClass && matchSearch;
  });

  const getStudentStatusForDate = (studentId: string, date: string) => {
    const rec = attendance.find((a) => a.studentId === studentId && a.date === date);
    return rec ? rec.status : "present";
  };

  const handleMarkAttendance = (
    student: any,
    status: "present" | "absent" | "special_class"
  ) => {
    LMSStore.markAttendance({
      id: `att-${student.id}-${selectedDate}`,
      studentId: student.id,
      studentName: student.name,
      classLevel: student.classLevel,
      date: selectedDate,
      status,
    });
    setMessage(`Updated ${student.name} as ${status.toUpperCase()}`);
    refreshAll();
    setTimeout(() => setMessage(""), 2000);
  };

  const handleDownloadReport = () => {
    const rows = [
      ["Student ID", "Name", "Class", "Date", "Status"],
      ...filteredStudents.map((s) => [
        s.id,
        s.name,
        s.classLevel,
        selectedDate,
        getStudentStatusForDate(s.id, selectedDate),
      ]),
    ];
    const csvContent =
      "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `attendance_report_${selectedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-200/90 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-blue-100 text-[#004B87] text-xs font-black">
              Operations Center
            </span>
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Attendance Registry
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Student Attendance Management 📅
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-2xl font-medium">
            Mark daily attendance for Classes 6th to 10th, review attendance records, and export CSV reports.
          </p>
        </div>

        <Button
          onClick={handleDownloadReport}
          size="sm"
          className="rounded-xl text-xs font-black bg-[#004B87] hover:bg-[#003866] text-white gap-2 h-10 px-5 shadow-xs shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Download Attendance CSV</span>
        </Button>
      </div>

      {message && (
        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 animate-slide-down">
          ✓ {message}
        </div>
      )}

      {/* Filter and Date Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white p-4 rounded-3xl border border-gray-200 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search student by name or email..."
            className="pl-10 h-10 text-xs rounded-xl border-gray-200"
          />
        </div>

        <div className="flex items-center gap-2">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-36 h-10 rounded-xl text-xs border-gray-200">
              <SelectValue placeholder="All Classes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Grades</SelectItem>
              <SelectItem value="Class 6">Class 6th</SelectItem>
              <SelectItem value="Class 7">Class 7th</SelectItem>
              <SelectItem value="Class 8">Class 8th</SelectItem>
              <SelectItem value="Class 9">Class 9th</SelectItem>
              <SelectItem value="Class 10">Class 10th</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-40 h-10 rounded-xl text-xs border-gray-200"
          />
        </div>
      </div>

      {/* Attendance Table */}
      <Card className="rounded-3xl border border-gray-200/90 bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-600 font-black">
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Class</th>
                <th className="py-3 px-4">Enrolled Course</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Quick Mark Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStudents.map((s) => {
                const currentStatus = getStudentStatusForDate(s.id, selectedDate);
                return (
                  <tr key={s.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-black text-gray-900">
                      <div>
                        <span>{s.name}</span>
                        <span className="block text-[10px] text-gray-400 font-normal">
                          {s.email}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-gray-700">
                      {s.classLevel}
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 max-w-xs truncate">
                      {s.enrolledCourses?.[0] || "Full Curriculum"}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-gray-500">
                      {selectedDate}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                          currentStatus === "present"
                            ? "bg-emerald-100 text-emerald-800"
                            : currentStatus === "absent"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {currentStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          size="sm"
                          onClick={() => handleMarkAttendance(s, "present")}
                          className={`h-7 px-2.5 rounded-lg text-[10px] font-black transition-all ${
                            currentStatus === "present"
                              ? "bg-emerald-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-emerald-100 hover:text-emerald-800"
                          }`}
                        >
                          Present
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleMarkAttendance(s, "absent")}
                          className={`h-7 px-2.5 rounded-lg text-[10px] font-black transition-all ${
                            currentStatus === "absent"
                              ? "bg-rose-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-rose-100 hover:text-rose-800"
                          }`}
                        >
                          Absent
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
