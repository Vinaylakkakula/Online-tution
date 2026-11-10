"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Radio,
  Calendar,
  Clock,
  Video,
  User,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Users,
  AlertCircle,
  Play,
} from "lucide-react";
import { useLMSData, LMSLiveClass } from "@/lib/lms-store";

interface LiveClassItem {
  id: string;
  title: string;
  course: string;
  batch: string;
  faculty: string;
  facultyTitle: string;
  scheduledAt: string;
  duration: string;
  status: "live" | "upcoming" | "completed";
  meetingProvider: "zoom" | "google_meet";
  meetingUrl: string;
  description: string;
  enrolledStudentsCount: number;
}

const liveClassesData: LiveClassItem[] = [
  {
    id: "lc-1",
    title: "Advanced Problem Solving: Magnetism & Biot-Savart Law Numerical Drill",
    course: "IIT-JEE Comprehensive Mastery 2026-27",
    batch: "Pratham Batch (Morning)",
    faculty: "Dr. Rahul Sharma",
    facultyTitle: "Senior Physics Faculty, Ex-IIT Bombay",
    scheduledAt: "Today, 5:00 PM - 6:30 PM IST",
    duration: "90 Minutes",
    status: "live",
    meetingProvider: "zoom",
    meetingUrl: "https://zoom.us/j/9876543210?pwd=deepsiddhisecret",
    description: "In-depth derivation and shortcut techniques for magnetic fields of non-standard wire bends, toroidal solenoids, and magnetic dipoles.",
    enrolledStudentsCount: 142,
  },
  {
    id: "lc-2",
    title: "Organic Reaction Mechanisms: Carbocation Rearrangements & Ring Expansions",
    course: "IIT-JEE Comprehensive Mastery 2026-27",
    batch: "Pratham Batch (Morning)",
    faculty: "Prof. Priya Saxena",
    facultyTitle: "Head of Chemistry, M.Tech IIT Delhi",
    scheduledAt: "Tomorrow, 7:00 AM - 8:30 AM IST",
    duration: "90 Minutes",
    status: "upcoming",
    meetingProvider: "zoom",
    meetingUrl: "https://zoom.us/j/9876543211",
    description: "Mastering Wagner-Meerwein shifts, pinacol-pinacolone rearrangements, and ring contraction tricks frequently tested in JEE Advanced.",
    enrolledStudentsCount: 138,
  },
  {
    id: "lc-3",
    title: "Olympiad Math: Modular Arithmetic & Diophantine Equations",
    course: "Physics Olympiad Advanced Sprint (NSEP & INPhO)",
    batch: "Aryabhata Olympiad Batch",
    faculty: "Er. Amit Verma",
    facultyTitle: "Head of Mathematics, B.Tech IIT Kanpur",
    scheduledAt: "Wednesday, 6:00 PM - 7:30 PM IST",
    duration: "90 Minutes",
    status: "upcoming",
    meetingProvider: "google_meet",
    meetingUrl: "https://meet.google.com/xyz-abcd-efg",
    description: "Foundations of elementary number theory, Chinese Remainder Theorem, and Olympiad proof-writing methodologies.",
    enrolledStudentsCount: 64,
  },
  {
    id: "lc-4",
    title: "Kinematics 2D: Projectile Motion on Inclined Planes & Relative Velocity",
    course: "IIT-JEE Comprehensive Mastery 2026-27",
    batch: "Pratham Batch (Morning)",
    faculty: "Dr. Rahul Sharma",
    facultyTitle: "Senior Physics Faculty, Ex-IIT Bombay",
    scheduledAt: "Yesterday, 5:00 PM - 6:30 PM IST",
    duration: "90 Minutes",
    status: "completed",
    meetingProvider: "zoom",
    meetingUrl: "",
    description: "Completed session on projectile collisions and coordinate rotation methods.",
    enrolledStudentsCount: 148,
  },
];

export default function LiveClassesPage() {
  const { liveClasses } = useLMSData();
  const [selectedMeeting, setSelectedMeeting] = useState<LMSLiveClass | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "live" | "upcoming" | "completed">("all");

  const filtered = liveClasses.filter((item) => {
    if (activeFilter === "all") return true;
    return item.status === activeFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#163B65]">Live Interactive Classes</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Attend live interactive webinars, ask doubts live to master educators, and engage with your peer batch.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          {(["all", "live", "upcoming", "completed"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3 py-1.5 rounded-xl capitalize transition-all ${
                activeFilter === tab
                  ? "bg-[#163B65] text-white shadow-sm"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {tab === "live" ? "🔴 Live Now" : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Classes List */}
      <div className="grid grid-cols-1 gap-6">
        {filtered.map((session) => {
          const isLive = session.status === "live";
          const isUpcoming = session.status === "upcoming";

          return (
            <Card
              key={session.id}
              className={`rounded-3xl border shadow-md bg-white overflow-hidden transition-all ${
                isLive
                  ? "border-red-300 ring-2 ring-red-400/20 shadow-red-100"
                  : "border-gray-100"
              }`}
            >
              <div className="p-6 sm:p-8 space-y-5">
                {/* Status Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {isLive && (
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                        Class Is Live Right Now
                      </span>
                    )}
                    {isUpcoming && (
                      <Badge variant="outline" className="border-teal-500 text-teal-800 bg-teal-50 text-xs">
                        Upcoming Class
                      </Badge>
                    )}
                    {session.status === "completed" && (
                      <Badge variant="outline" className="border-gray-300 text-gray-600 bg-gray-50 text-xs">
                        Completed
                      </Badge>
                    )}
                    <span className="text-xs text-gray-500 font-medium">
                      {session.course} • {session.batch}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{session.enrolledStudentsCount} Students Registered</span>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                    {session.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {session.description}
                  </p>
                </div>

                {/* Faculty & Schedule Info Footer */}
                <div className="pt-4 border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-6 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#EAF4FF] text-[#163B65] font-bold flex items-center justify-center text-xs">
                        {session.faculty.charAt(0)}
                      </div>
                      <div>
                        <span className="font-bold text-gray-900 block">{session.faculty}</span>
                        <span className="text-[10px] text-gray-500">{session.facultyTitle || "Senior Faculty"}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-teal-600" />
                      <span>{session.scheduledAt}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-blue-600" />
                      <span className="capitalize">{session.meetingProvider} Interactive Room</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div>
                    {isLive && (
                      <Button
                        onClick={() => setSelectedMeeting(session)}
                        className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold text-xs h-11 px-6 rounded-xl shadow-lg flex items-center gap-2 animate-pulse"
                      >
                        <Radio className="w-4 h-4" />
                        Join Live Class Now
                      </Button>
                    )}

                    {isUpcoming && (
                      <Button
                        onClick={() => setSelectedMeeting(session)}
                        variant="outline"
                        className="w-full sm:w-auto border-teal-600 text-teal-800 hover:bg-teal-50 text-xs font-semibold h-10 px-5 rounded-xl"
                      >
                        View Meeting Passcode & Link
                      </Button>
                    )}

                    {session.status === "completed" && (
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto border-gray-200 text-gray-600 text-xs h-10 px-4 rounded-xl flex items-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5" />
                        Watch Session Recording
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Meeting Launch & Details Dialog */}
      <Dialog open={!!selectedMeeting} onOpenChange={(open) => !open && setSelectedMeeting(null)}>
        <DialogContent className="sm:max-w-[500px] p-6 rounded-3xl bg-white border-0 shadow-2xl space-y-4">
          <DialogHeader>
            <div className="flex items-center gap-2 text-red-600 text-xs font-bold uppercase tracking-wider mb-1">
              <Radio className="w-4 h-4 animate-pulse" />
              <span>Live Interactive Session</span>
            </div>
            <DialogTitle className="text-lg font-bold text-[#163B65]">
              {selectedMeeting?.title}
            </DialogTitle>
            <DialogDescription className="text-xs text-gray-600">
              DeepSiddhi Foundation Secure Verified Meeting Room
            </DialogDescription>
          </DialogHeader>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-xs space-y-2.5">
            <div className="flex justify-between">
              <span className="text-gray-500">Instructor:</span>
              <span className="font-bold text-gray-900">{selectedMeeting?.faculty}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Schedule:</span>
              <span className="font-bold text-gray-900">{selectedMeeting?.scheduledAt}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Provider:</span>
              <span className="font-bold text-gray-900 capitalize">{selectedMeeting?.meetingProvider}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Student Passcode:</span>
              <span className="font-mono font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
                DEEPSIDDHI-2026
              </span>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>Keep your microphone muted upon entry. You can raise hands for verbal doubt resolution during Q&A.</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              onClick={() => setSelectedMeeting(null)}
              variant="outline"
              className="flex-1 border-gray-300 text-gray-700 rounded-xl"
            >
              Cancel
            </Button>
            <a
              href={selectedMeeting?.meetingUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button className="w-full bg-[#163B65] hover:bg-[#122e50] text-white rounded-xl flex items-center justify-center gap-2">
                Launch Live Room
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
