"use client";

import { useState } from "react";
import { useLMSData, AcademicHoliday } from "@/lib/lms-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  AlertTriangle,
  Gift,
  Flag,
  Sparkles,
  Clock,
  Bell,
  CheckCircle2,
} from "lucide-react";

export default function StudentCalendarPage() {
  const { holidays, emergencyAlert } = useLMSData();
  const [filterType, setFilterType] = useState<string>("all");

  const filteredHolidays = holidays.filter((h) => {
    if (filterType === "all") return true;
    return h.type === filterType;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-white via-blue-50/30 to-slate-50 rounded-3xl p-6 sm:p-8 text-[#102C50] relative overflow-hidden border border-gray-200/90 shadow-xs">
        <div className="relative z-10 space-y-2">
          <span className="text-xs font-black uppercase tracking-wider bg-blue-100/80 text-[#102C50] border border-blue-200/80 px-3 py-1 rounded-full w-fit block">
            Academic Year 2026-27
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#102C50]">
            Academic Calendar & Holiday Schedules 🗓️
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl font-normal">
            Stay prepared with exam dates, festival breaks, special weekend marathons, and urgent weather advisories.
          </p>
        </div>
        <div className="absolute -right-4 -bottom-6 text-8xl sm:text-9xl opacity-10 select-none pointer-events-none">
          🗓️
        </div>
      </div>

      {/* Emergency Holiday Alert Banner (Requirement 9: "Emergency holidays should be clearly highlighted") */}
      {emergencyAlert && emergencyAlert.isActive && (
        <div className="p-5 rounded-3xl bg-gradient-to-r from-red-500 via-rose-500 to-orange-500 text-white shadow-xl flex items-start gap-4 border-2 border-red-300 animate-pulse">
          <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-md text-2xl shrink-0">
            🚨
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <span className="bg-white text-red-600 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                EMERGENCY HOLIDAY NOTICE
              </span>
              <span className="text-xs text-white/90 font-bold">{emergencyAlert.date}</span>
            </div>
            <h3 className="text-base sm:text-lg font-black tracking-tight">
              {emergencyAlert.title}
            </h3>
            <p className="text-xs text-white/90 leading-relaxed font-medium">
              {emergencyAlert.message}
            </p>
          </div>
        </div>
      )}

      {/* Type Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 bg-white p-3 rounded-2xl border border-gray-200/90 shadow-xs">
        {["all", "Festival", "Government", "Emergency", "Special Class", "Exam Day"].map(
          (type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                filterType === type
                  ? "bg-[#1769AA] text-white shadow-xs"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {type === "all" ? "All Dates" : type}
            </button>
          )
        )}
      </div>

      {/* Holidays List Cards */}
      <div className="space-y-4">
        {filteredHolidays.map((h) => {
          let badgeColor = "bg-blue-100 text-blue-800 border-blue-200";
          let icon = "🏖️";

          if (h.type === "Festival") {
            badgeColor = "bg-amber-100 text-amber-900 border-amber-300";
            icon = "🪔";
          } else if (h.type === "Emergency") {
            badgeColor = "bg-red-100 text-red-900 border-red-300";
            icon = "🚨";
          } else if (h.type === "Exam Day") {
            badgeColor = "bg-purple-100 text-purple-900 border-purple-300";
            icon = "📝";
          } else if (h.type === "Special Class") {
            badgeColor = "bg-emerald-100 text-emerald-900 border-emerald-300";
            icon = "🚀";
          }

          return (
            <Card
              key={h.id}
              className={`p-5 sm:p-6 rounded-3xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:shadow-md ${
                h.type === "Emergency"
                  ? "border-red-300 bg-red-50/40"
                  : "border-indigo-100 bg-white"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-2xl shrink-0">
                  {icon}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${badgeColor}`}>
                      {h.type}
                    </span>
                    <span className="text-xs text-gray-400 font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {h.date}
                    </span>
                  </div>
                  <h4 className="text-base font-black text-gray-900">
                    {h.title}
                  </h4>
                  <p className="text-xs text-gray-600 font-medium">
                    {h.description}
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-xl">
                  {h.date}
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
