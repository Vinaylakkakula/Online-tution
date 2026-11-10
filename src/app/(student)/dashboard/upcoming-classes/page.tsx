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

interface UpcomingEvent {
  id: string;
  title: string;
  subject: string;
  course: string;
  batch: string;
  faculty: string;
  date: string;
  time: string;
  countdown: string;
  isToday?: boolean;
}

const upcomingEvents: UpcomingEvent[] = [
  {
    id: "up-1",
    title: "Advanced Problem Solving: Magnetism & Biot-Savart Law",
    subject: "Physics",
    course: "IIT-JEE Comprehensive Mastery 2026-27",
    batch: "Pratham Batch",
    faculty: "Dr. Rahul Sharma",
    date: "2026-11-03",
    time: "5:00 PM - 6:30 PM IST",
    countdown: "Starts in 2 hrs 20 mins",
    isToday: true,
  },
  {
    id: "up-2",
    title: "Organic Reaction Mechanisms: Carbocation Rearrangements",
    subject: "Chemistry",
    course: "IIT-JEE Comprehensive Mastery 2026-27",
    batch: "Pratham Batch",
    faculty: "Prof. Priya Saxena",
    date: "2026-11-04",
    time: "7:00 AM - 8:30 AM IST",
    countdown: "Starts Tomorrow morning",
  },
  {
    id: "up-3",
    title: "Olympiad Math: Modular Arithmetic & Diophantine Equations",
    subject: "Mathematics",
    course: "Physics Olympiad Advanced Sprint",
    batch: "Aryabhata Batch",
    faculty: "Er. Amit Verma",
    date: "2026-11-05",
    time: "6:00 PM - 7:30 PM IST",
    countdown: "In 2 days",
  },
  {
    id: "up-4",
    title: "Thermodynamics & Carnot Cycle Heat Calculations",
    subject: "Physics",
    course: "IIT-JEE Comprehensive Mastery 2026-27",
    batch: "Pratham Batch",
    faculty: "Dr. Rahul Sharma",
    date: "2026-11-06",
    time: "5:00 PM - 6:30 PM IST",
    countdown: "In 3 days",
  },
  {
    id: "up-5",
    title: "NTSE Aptitude: Non-Verbal Pattern Logic & Matrix Series",
    subject: "Mental Ability",
    course: "NTSE & Aptitude Mastery",
    batch: "Vidyarthi Batch",
    faculty: "Er. Vivek Rathore",
    date: "2026-11-07",
    time: "4:00 PM - 5:30 PM IST",
    countdown: "In 4 days",
  },
];

export default function UpcomingClassesPage() {
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [reminders, setReminders] = useState<Record<string, boolean>>({});

  const toggleReminder = (id: string) => {
    setReminders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#163B65]">Upcoming Class Calendar</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Weekly live lecture schedule with real-time countdowns and session alerts.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-gray-200 shadow-xs">
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              viewMode === "list"
                ? "bg-[#163B65] text-white shadow-xs"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>List View</span>
          </button>
          <button
            onClick={() => setViewMode("calendar")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              viewMode === "calendar"
                ? "bg-[#163B65] text-white shadow-xs"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Weekly Calendar</span>
          </button>
        </div>
      </div>

      {viewMode === "list" ? (
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <Card
              key={event.id}
              className={`rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-all ${
                event.isToday
                  ? "border-teal-400 bg-teal-50/20 ring-1 ring-teal-400/30"
                  : "border-gray-100"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="bg-[#163B65] text-white text-[10px]">
                      {event.subject}
                    </Badge>
                    {event.isToday && (
                      <Badge className="bg-red-500 text-white text-[10px] animate-pulse">
                        Today&apos;s Class
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

                  {event.isToday ? (
                    <Link href="/dashboard/live-classes">
                      <Button className="bg-[#16A6A1] hover:bg-[#138e8a] text-white text-xs font-semibold rounded-xl h-10 px-4">
                        Join Classroom
                      </Button>
                    </Link>
                  ) : (
                    <Button variant="outline" disabled className="text-xs rounded-xl h-10 text-gray-400">
                      Not Live Yet
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
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
              <span className="text-xs font-bold text-gray-800">Week 1 (Nov 2 - Nov 8)</span>
              <Button variant="outline" size="sm" className="rounded-xl h-8 w-8 p-0">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
              <div key={d} className="font-bold text-gray-400 uppercase tracking-wider py-1">
                {d}
              </div>
            ))}

            {/* Days with classes */}
            {[
              { day: "2", active: false, label: "Kinematics 2D" },
              { day: "3", active: true, label: "Magnetism Live (5PM)" },
              { day: "4", active: true, label: "Carbocations (7AM)" },
              { day: "5", active: true, label: "Olympiad Math (6PM)" },
              { day: "6", active: true, label: "Thermodynamics (5PM)" },
              { day: "7", active: true, label: "NTSE Aptitude (4PM)" },
              { day: "8", active: true, label: "All India Mock Test" },
            ].map((slot) => (
              <div
                key={slot.day}
                className={`p-3 rounded-2xl min-h-[110px] text-left border flex flex-col justify-between transition-all ${
                  slot.day === "3"
                    ? "bg-[#163B65] text-white border-[#163B65] shadow-md"
                    : slot.active
                    ? "bg-teal-50/50 border-teal-200 text-gray-800"
                    : "bg-gray-50 border-gray-100 text-gray-400"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm">{slot.day}</span>
                  {slot.day === "3" && (
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                  )}
                </div>
                <p className="text-[10px] font-semibold line-clamp-2 leading-tight">
                  {slot.label}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
