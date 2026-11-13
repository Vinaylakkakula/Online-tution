"use client";

import { useState, useMemo } from "react";
import { useLMSData, AttendanceRecord } from "@/lib/lms-store";
import { useAuth } from "@/context/auth-context";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Award,
  ChevronLeft,
  ChevronRight,
  Flame,
} from "lucide-react";

export default function StudentAttendancePage() {
  const { user } = useAuth();
  const studentId = user?.id || "STD-1001";
  const { attendance } = useLMSData();

  const [currentMonth, setCurrentMonth] = useState("November 2026");

  // Filter attendance for student
  const studentAttendance = attendance.filter(
    (a) => !a.studentId || a.studentId === studentId
  );

  const totalWorkingDays = 22;
  const presentCount = studentAttendance.filter((a) => a.status === "present").length || 19;
  const absentCount = studentAttendance.filter((a) => a.status === "absent").length || 2;
  const holidayCount = 4;
  const attendanceRate = Math.round((presentCount / totalWorkingDays) * 100);

  // Generate 30 days grid for current month
  const calendarDays = useMemo(() => {
    const days = [];
    for (let i = 1; i <= 30; i++) {
      const dateStr = `2026-11-${i < 10 ? "0" + i : i}`;
      const rec = studentAttendance.find((a) => a.date === dateStr);
      const isSunday = (i + 5) % 7 === 0; // November 2026 day calculation
      let status: "present" | "absent" | "holiday" | "special_class" | "future" =
        "present";

      if (i > 13) {
        status = isSunday ? "holiday" : "future";
      } else if (isSunday) {
        status = "holiday";
      } else if (rec) {
        status = rec.status;
      } else if (i === 5) {
        status = "absent";
      }
      days.push({ dayNumber: i, dateStr, status, remarks: rec?.remarks });
    }
    return days;
  }, [studentAttendance]);

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 space-y-2">
          <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1.5 w-fit">
            <Flame className="w-3.5 h-3.5 text-amber-300 fill-current" />
            <span>Attendance Streak: 8 Consecutive Days!</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            My Attendance Calendar 📅
          </h1>
          <p className="text-xs sm:text-sm text-white/80 max-w-xl font-medium">
            Regular attendance helps you unlock monthly cartoon medals, bonus XP, and top rank badges in your batch!
          </p>
        </div>
        <div className="absolute -right-4 -bottom-6 text-8xl sm:text-9xl opacity-20 select-none pointer-events-none">
          📅
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-5 rounded-3xl border-2 border-emerald-100 bg-white shadow-md space-y-1">
          <span className="text-[11px] font-bold text-gray-500 uppercase">
            Attendance Rate
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-600">
              {attendanceRate}%
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              Target: 75%
            </span>
          </div>
          <p className="text-[11px] text-gray-500 font-medium">
            Eligible for exams & bonus quiz stars
          </p>
        </Card>

        <Card className="p-5 rounded-3xl border-2 border-indigo-100 bg-white shadow-md space-y-1">
          <span className="text-[11px] font-bold text-gray-500 uppercase">
            Total Working Days
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-indigo-700">
              {totalWorkingDays}
            </span>
            <span className="text-xs font-semibold text-gray-500">Days</span>
          </div>
          <p className="text-[11px] text-gray-500 font-medium">
            In Academic Month: {currentMonth}
          </p>
        </Card>

        <Card className="p-5 rounded-3xl border-2 border-blue-100 bg-white shadow-md space-y-1">
          <span className="text-[11px] font-bold text-gray-500 uppercase">
            Present Days
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-blue-600">
              {presentCount}
            </span>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
              🟢 Attended
            </span>
          </div>
          <p className="text-[11px] text-gray-500 font-medium">
            Includes live classes & watched recordings
          </p>
        </Card>

        <Card className="p-5 rounded-3xl border-2 border-rose-100 bg-white shadow-md space-y-1">
          <span className="text-[11px] font-bold text-gray-500 uppercase">
            Absent Days
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-rose-600">
              {absentCount}
            </span>
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
              🔴 Missed
            </span>
          </div>
          <p className="text-[11px] text-gray-500 font-medium">
            Watch recorded classes to make up lessons
          </p>
        </Card>
      </div>

      {/* Monthly Interactive Calendar */}
      <Card className="p-6 sm:p-8 rounded-3xl border-2 border-indigo-100 bg-white shadow-lg space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-black text-gray-900">
              Monthly Attendance Grid — {currentMonth}
            </h3>
          </div>

          {/* Color-Coded Status Legend */}
          <div className="hidden sm:flex items-center gap-3 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-emerald-700">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span>Present</span>
            </span>
            <span className="flex items-center gap-1.5 text-rose-700">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span>Absent</span>
            </span>
            <span className="flex items-center gap-1.5 text-amber-700">
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span>Holiday</span>
            </span>
            <span className="flex items-center gap-1.5 text-gray-400">
              <span className="w-3 h-3 rounded-full bg-gray-200" />
              <span>Upcoming</span>
            </span>
          </div>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-black text-gray-500">
          <span>MON</span>
          <span>TUE</span>
          <span>WED</span>
          <span>THU</span>
          <span>FRI</span>
          <span>SAT</span>
          <span className="text-rose-500">SUN</span>
        </div>

        {/* Calendar Days Matrix */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((d) => {
            let colorClasses = "bg-emerald-50 border-emerald-300 text-emerald-950";
            let badgeText = "Present";

            if (d.status === "absent") {
              colorClasses = "bg-rose-50 border-rose-300 text-rose-950";
              badgeText = "Absent";
            } else if (d.status === "holiday") {
              colorClasses = "bg-amber-50 border-amber-300 text-amber-950";
              badgeText = "Holiday";
            } else if (d.status === "future") {
              colorClasses = "bg-gray-50 border-gray-200 text-gray-400";
              badgeText = "Scheduled";
            }

            return (
              <div
                key={d.dayNumber}
                className={`p-2.5 sm:p-3 rounded-2xl border-2 transition-all flex flex-col justify-between aspect-square group ${colorClasses}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-black">{d.dayNumber}</span>
                  {d.status === "present" && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  )}
                  {d.status === "absent" && (
                    <XCircle className="w-3.5 h-3.5 text-rose-500" />
                  )}
                  {d.status === "holiday" && (
                    <span className="text-[10px]">🏖️</span>
                  )}
                </div>

                <span className="text-[9px] font-bold truncate block">
                  {badgeText}
                </span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
