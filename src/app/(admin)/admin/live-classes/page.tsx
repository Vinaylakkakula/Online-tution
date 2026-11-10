"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Radio,
  Plus,
  Clock,
  Video,
  Calendar,
  Users,
  Bell,
  Trash2,
  ExternalLink,
} from "lucide-react";

interface ScheduledLiveClass {
  id: string;
  title: string;
  course: string;
  batch: string;
  faculty: string;
  dateTime: string;
  durationMinutes: number;
  provider: "zoom" | "google_meet";
  meetingUrl: string;
  status: "live" | "scheduled" | "completed";
}

const initialSchedule: ScheduledLiveClass[] = [
  {
    id: "lc-101",
    title: "Advanced Problem Solving: Magnetism & Biot-Savart Law",
    course: "IIT-JEE Comprehensive Mastery 2026-27",
    batch: "Pratham Batch (Morning)",
    faculty: "Dr. Rahul Sharma",
    dateTime: "Today, 5:00 PM - 6:30 PM",
    durationMinutes: 90,
    provider: "zoom",
    meetingUrl: "https://zoom.us/j/9876543210",
    status: "live",
  },
  {
    id: "lc-102",
    title: "Carbocation Rearrangements & Ring Expansions",
    course: "IIT-JEE Comprehensive Mastery 2026-27",
    batch: "Pratham Batch (Morning)",
    faculty: "Prof. Priya Saxena",
    dateTime: "Tomorrow, 7:00 AM - 8:30 AM",
    durationMinutes: 90,
    provider: "zoom",
    meetingUrl: "https://zoom.us/j/9876543211",
    status: "scheduled",
  },
  {
    id: "lc-103",
    title: "Olympiad Math: Modular Arithmetic & Diophantine Equations",
    course: "Physics Olympiad Advanced Sprint",
    batch: "Aryabhata Batch",
    faculty: "Er. Amit Verma",
    dateTime: "Wednesday, 6:00 PM - 7:30 PM",
    durationMinutes: 90,
    provider: "google_meet",
    meetingUrl: "https://meet.google.com/abc-defg-hij",
    status: "scheduled",
  },
];

export default function AdminLiveClassesPage() {
  const [classes, setClasses] = useState<ScheduledLiveClass[]>(initialSchedule);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("IIT-JEE Comprehensive Mastery 2026-27");
  const [batch, setBatch] = useState("Pratham Batch (Morning)");
  const [faculty, setFaculty] = useState("Dr. Rahul Sharma");
  const [dateTime, setDateTime] = useState("Friday, 5:00 PM - 6:30 PM");
  const [provider, setProvider] = useState<"zoom" | "google_meet">("zoom");
  const [meetingUrl, setMeetingUrl] = useState("https://zoom.us/j/9988776655");
  const [notified, setNotified] = useState<Record<string, boolean>>({});

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newClass: ScheduledLiveClass = {
      id: `lc-${Date.now()}`,
      title,
      course,
      batch,
      faculty,
      dateTime,
      durationMinutes: 90,
      provider,
      meetingUrl,
      status: "scheduled",
    };

    setClasses([newClass, ...classes]);
    setModalOpen(false);
    setTitle("");
  };

  const handleNotify = (id: string) => {
    setNotified((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setNotified((prev) => ({ ...prev, [id]: false }));
    }, 2500);
  };

  const cancelClass = (id: string) => {
    setClasses(classes.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#163B65]">Live Classroom Scheduler</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Schedule live webinars, configure Zoom/Google Meet integrations, and broadcast instant push alerts to enrolled students.
          </p>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl h-10 px-4 gap-2 shadow-sm"
        >
          <Radio className="w-4 h-4 animate-pulse" />
          Schedule Live Class
        </Button>
      </div>

      {/* Classes List */}
      <div className="space-y-4">
        {classes.map((cls) => (
          <Card key={cls.id} className="rounded-3xl border-gray-100 shadow-md bg-white p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {cls.status === "live" ? (
                    <Badge className="bg-red-600 text-white text-[10px] animate-pulse">
                      🔴 Live Streaming Now
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-teal-500 text-teal-800 bg-teal-50 text-[10px]">
                      Scheduled
                    </Badge>
                  )}
                  <span className="text-xs text-gray-500">{cls.course} • {cls.batch}</span>
                </div>

                <h3 className="text-base font-bold text-gray-900 leading-snug">{cls.title}</h3>

                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    <span>{cls.dateTime}</span>
                  </div>
                  <span>•</span>
                  <div>Faculty: <strong className="text-gray-700">{cls.faculty}</strong></div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Video className="w-3.5 h-3.5 text-blue-600" />
                    <span className="capitalize">{cls.provider} Room</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleNotify(cls.id)}
                  className={`text-xs h-9 rounded-xl gap-1.5 ${
                    notified[cls.id] ? "bg-emerald-50 text-emerald-700 border-emerald-300 font-bold" : "border-gray-200"
                  }`}
                >
                  <Bell className="w-3.5 h-3.5 text-amber-500" />
                  {notified[cls.id] ? "Alert Dispatched!" : "Notify Enrolled"}
                </Button>

                <a href={cls.meetingUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" className="bg-[#163B65] text-white text-xs h-9 rounded-xl gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5" />
                    Launch
                  </Button>
                </a>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => cancelClass(cls.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 h-9 w-9 p-0 rounded-xl"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Schedule Dialog */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[500px] p-6 rounded-3xl bg-white border-0 shadow-2xl space-y-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-[#163B65]">
              Schedule New Live Class
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreate} className="space-y-4 text-xs">
            <div>
              <Label className="text-xs font-semibold text-gray-700">Lecture Topic Title *</Label>
              <Input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Advanced Optics Numerical Drill"
                className="mt-1 h-10 border-gray-200"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-semibold text-gray-700">Course *</Label>
                <Input
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="mt-1 h-10 border-gray-200"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold text-gray-700">Cohort / Batch *</Label>
                <Input
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  className="mt-1 h-10 border-gray-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-semibold text-gray-700">Lead Faculty</Label>
                <Input
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                  className="mt-1 h-10 border-gray-200"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold text-gray-700">Date & Time *</Label>
                <Input
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  className="mt-1 h-10 border-gray-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-semibold text-gray-700">Meeting Provider *</Label>
                <Select value={provider} onValueChange={(val) => setProvider(val as "zoom" | "google_meet")}>
                  <SelectTrigger className="mt-1 h-10 border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zoom">Zoom Video</SelectItem>
                    <SelectItem value="google_meet">Google Meet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs font-semibold text-gray-700">Meeting URL *</Label>
                <Input
                  value={meetingUrl}
                  onChange={(e) => setMeetingUrl(e.target.value)}
                  className="mt-1 h-10 border-gray-200"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="bg-[#163B65] text-white rounded-xl">
                Schedule & Broadcast
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
