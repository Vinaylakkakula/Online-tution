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
  Trash2,
  ExternalLink,
  GraduationCap,
} from "lucide-react";
import { useLMSData, LMSLiveClass } from "@/lib/lms-store";

export default function AdminLiveClassesPage() {
  const { liveClasses, courses, batches, store } = useLMSData();
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [courseTitle, setCourseTitle] = useState(
    courses[0]?.title || "IIT-JEE Comprehensive Mastery 2026-27"
  );
  const [batchName, setBatchName] = useState(
    batches[0]?.name || "Pratham Batch (Morning)"
  );
  const [faculty, setFaculty] = useState("Dr. Rahul Sharma");
  const [scheduledAt, setScheduledAt] = useState("Today, 5:00 PM – 6:30 PM IST");
  const [duration, setDuration] = useState("90 Minutes");
  const [meetingProvider, setMeetingProvider] = useState<"zoom" | "google_meet">("zoom");
  const [meetingUrl, setMeetingUrl] = useState("https://zoom.us/j/9876543210");
  const [passcode, setPasscode] = useState("DEEPSIDDHI-2026");
  const [description, setDescription] = useState(
    "Interactive problem solving and doubt clearing session."
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newClass: LMSLiveClass = {
      id: `lc-${Date.now()}`,
      title: title.trim(),
      course: courseTitle || courses[0]?.title || "General",
      batch: batchName || batches[0]?.name || "General Batch",
      faculty,
      scheduledAt,
      duration,
      status: "upcoming",
      meetingProvider,
      meetingUrl: meetingUrl.trim() || "https://zoom.us",
      passcode,
      description,
      enrolledStudentsCount: 120,
    };

    store.addLiveClass(newClass);
    setModalOpen(false);
    setTitle("");
  };

  const handleDelete = (id: string) => {
    if (confirm("Cancel and remove this live class?")) {
      store.deleteLiveClass(id);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-red-500 text-white text-[10px] font-bold animate-pulse">
              ● Live Studio
            </Badge>
            <span className="text-xs text-gray-500 font-semibold">
              HD Interactive Classes
            </span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Live Interactive Classes
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            Schedule live Zoom & Google Meet sessions for specific batches. Students get 1-click classroom entry.
          </p>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          className="bg-[#004B87] hover:bg-[#003866] text-white font-extrabold text-xs h-10 px-5 rounded-xl shadow-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          Schedule Live Class
        </Button>
      </div>

      {/* Live Classes Grid */}
      <div className="space-y-4">
        {liveClasses.map((item) => (
          <Card
            key={item.id}
            className="rounded-2xl border-gray-200/90 shadow-2xs hover:shadow-md transition-shadow bg-white p-5"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge
                    className={`text-[10px] font-bold ${
                      item.status === "live"
                        ? "bg-red-500 text-white"
                        : item.status === "upcoming"
                        ? "bg-blue-50 text-[#004B87] border border-blue-200"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item.status === "live" ? "● LIVE NOW" : "Upcoming Session"}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] font-bold border-gray-300">
                    {item.meetingProvider === "zoom" ? "Zoom Video" : "Google Meet"}
                  </Badge>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs font-bold text-[#004B87]">{item.course}</span>
                </div>

                <h3 className="font-extrabold text-base text-gray-900">
                  {item.title}
                </h3>

                <div className="flex items-center gap-4 text-xs text-gray-500 font-medium flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>{item.scheduledAt}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>{item.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-gray-400" />
                    <span>Faculty: {item.faculty}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-blue-700 font-bold">
                    <span>Batch: {item.batch}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => store.toggleLiveStatus(item.id)}
                  className="text-xs font-bold rounded-xl h-9 px-3"
                >
                  {item.status === "live" ? "End Class" : "Go Live Now"}
                </Button>

                <a
                  href={item.meetingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#004B87] hover:bg-[#003866] text-white text-xs font-extrabold rounded-xl h-9 px-4 shadow-xs"
                >
                  <span>Launch Studio</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs rounded-xl h-9 px-3"
                  title="Delete Session"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Schedule Live Class Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-gray-900 flex items-center gap-2">
              <Radio className="w-5 h-5 text-red-500" />
              Schedule Live Classroom
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreate} className="space-y-4 pt-2">
            <div>
              <Label className="text-xs font-bold text-gray-700">Class Title *</Label>
              <Input
                required
                placeholder="e.g. Advanced Problem Solving: Magnetism & Biot-Savart Law"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 text-xs rounded-xl h-10"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-bold text-gray-700">Tied to Course *</Label>
                <Select value={courseTitle} onValueChange={setCourseTitle}>
                  <SelectTrigger className="mt-1 text-xs rounded-xl h-10">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((c) => (
                      <SelectItem key={c.id} value={c.title} className="text-xs font-medium">
                        {c.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs font-bold text-gray-700">Target Batch *</Label>
                <Select value={batchName} onValueChange={setBatchName}>
                  <SelectTrigger className="mt-1 text-xs rounded-xl h-10">
                    <SelectValue placeholder="Select batch" />
                  </SelectTrigger>
                  <SelectContent>
                    {batches.map((b) => (
                      <SelectItem key={b.id} value={b.name} className="text-xs font-medium">
                        {b.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-bold text-gray-700">Date & Time *</Label>
                <Input
                  required
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  placeholder="Today, 5:00 PM – 6:30 PM IST"
                  className="mt-1 text-xs rounded-xl h-10"
                />
              </div>

              <div>
                <Label className="text-xs font-bold text-gray-700">Duration</Label>
                <Input
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="90 Minutes"
                  className="mt-1 text-xs rounded-xl h-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-bold text-gray-700">Meeting Provider</Label>
                <Select
                  value={meetingProvider}
                  onValueChange={(v: "zoom" | "google_meet") => setMeetingProvider(v)}
                >
                  <SelectTrigger className="mt-1 text-xs rounded-xl h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zoom" className="text-xs">Zoom Video</SelectItem>
                    <SelectItem value="google_meet" className="text-xs">Google Meet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs font-bold text-gray-700">Faculty</Label>
                <Input
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                  placeholder="Dr. Rahul Sharma"
                  className="mt-1 text-xs rounded-xl h-10"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-bold text-gray-700">Meeting Link *</Label>
              <Input
                required
                value={meetingUrl}
                onChange={(e) => setMeetingUrl(e.target.value)}
                placeholder="https://zoom.us/j/9876543210?pwd=..."
                className="mt-1 text-xs rounded-xl h-10"
              />
            </div>

            <div>
              <Label className="text-xs font-bold text-gray-700">Passcode</Label>
              <Input
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="DEEPSIDDHI-2026"
                className="mt-1 text-xs rounded-xl h-10"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
              <Button
                type="button"
                variant="outline"
                onClick={() => setModalOpen(false)}
                className="text-xs rounded-xl h-10 px-4"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#004B87] hover:bg-[#003866] text-white text-xs font-extrabold rounded-xl h-10 px-5 shadow-sm"
              >
                Schedule & Notify Cohort
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
