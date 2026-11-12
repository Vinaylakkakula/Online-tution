"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  Video,
  List,
  Bell,
  Check,
  ChevronLeft,
  ChevronRight,
  Radio,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { useLMSData } from "@/lib/lms-store";

export default function UpcomingClassesPage() {
  const { liveClasses } = useLMSData();
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [reminders, setReminders] = useState<Record<string, boolean>>({});

  const toggleReminder = (id: string) => {
    setReminders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const events = liveClasses.map((lc, index) => ({
    id: lc.id,
    title: lc.title,
    subject: lc.course.includes("Physics") ? "Physics" : lc.course.includes("Chemistry") ? "Chemistry" : "Science & Math",
    course: lc.course,
    batch: lc.batch,
    faculty: lc.faculty,
    time: lc.scheduledAt,
    countdown: lc.status === "live" ? "Live Right Now" : "Starting soon",
    isToday: lc.status === "live" || index === 0,
    status: lc.status,
  }));

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-[#004B87] text-white text-[10px] font-bold">
              Live Schedule
            </Badge>
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Updates
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#163B65]">Upcoming Class Calendar</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Weekly live lecture schedule with real-time countdowns and session alerts.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === "list"
                ? "bg-white text-[#163B65] shadow-xs"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <List className="w-4 h-4" />
            <span>List View</span>
          </button>
          <button
            onClick={() => setViewMode("calendar")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === "calendar"
                ? "bg-white text-[#163B65] shadow-xs"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Calendar</span>
          </button>
        </div>
      </div>

      {viewMode === "list" ? (
        <div className="space-y-4">
          {events.length === 0 ? (
            <Card className="p-8 text-center text-gray-400 text-xs">
              No live classes scheduled right now. Check back soon.
            </Card>
          ) : (
            events.map((event) => (
              <Card
                key={event.id}
                className="rounded-3xl border-gray-100 shadow-sm bg-white p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className="bg-[#163B65] text-white text-[10px]">
                        {event.subject}
                      </Badge>
                      {event.isToday && (
                        <Badge className="bg-red-500 text-white text-[10px] animate-pulse">
                          {event.status === "live" ? "Live Right Now" : "Today's Class"}
                        </Badge>
                      )}
                      <span className="text-xs text-gray-500">{event.course}</span>
                    </div>

                    <h3 className="text-base font-bold text-gray-900">{event.title}</h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-1">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-teal-600" />
                        <span>{event.time}</span>
                      </div>
                      <span>•</span>
                      <div>Faculty: <strong className="text-gray-700">{event.faculty}</strong></div>
                      <span>•</span>
                      <span className="font-semibold text-teal-700">{event.countdown}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      onClick={() => toggleReminder(event.id)}
                      variant="outline"
                      size="sm"
                      className={`text-xs gap-1.5 rounded-xl h-10 ${
                        reminders[event.id]
                          ? "bg-emerald-50 text-emerald-700 border-emerald-300 font-bold"
                          : "border-gray-200 text-gray-600"
                      }`}
                    >
                      {reminders[event.id] ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          Reminder Set
                        </>
                      ) : (
                        <>
                          <Bell className="w-4 h-4" />
                          Remind Me
                        </>
                      )}
                    </Button>

                    <Link href="/dashboard/live-classes">
                      <Button className="bg-[#16A6A1] hover:bg-[#138e8a] text-white text-xs font-semibold rounded-xl h-10 px-4">
                        Join Classroom
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      ) : (
        /* Calendar View */
        <Card className="rounded-3xl border-gray-100 shadow-md bg-white p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <h3 className="font-bold text-base text-[#163B65]">November 2026 Schedule</h3>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-xl h-8 w-8 p-0">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-xs font-bold text-gray-800">Week View</span>
              <Button variant="outline" size="sm" className="rounded-xl h-8 w-8 p-0">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <div key={d} className="font-bold text-gray-400 uppercase tracking-wider py-1">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`min-h-[100px] p-2.5 rounded-2xl border text-left flex flex-col justify-between ${
                  i === 1
                    ? "bg-teal-50/50 border-teal-200"
                    : "bg-gray-50/50 border-gray-100"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className={`text-xs font-bold ${i === 1 ? "text-teal-700" : "text-gray-700"}`}>
                    Nov {i + 15}
                  </span>
                  {i === 1 && (
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  )}
                </div>

                {i < events.length && (
                  <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-xs space-y-1 mt-2">
                    <span className="text-[10px] font-bold text-[#163B65] block truncate">
                      {events[i].title}
                    </span>
                    <span className="text-[9px] text-gray-400 block">{events[i].time}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
