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
  Video,
  Plus,
  Play,
  Eye,
  Clock,
  Trash2,
  CheckCircle2,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { useLMSData, LMSRecordedClass } from "@/lib/lms-store";

export default function AdminRecordedClassesPage() {
  const { recordedClasses, courses, store } = useLMSData();
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [courseTitle, setCourseTitle] = useState(
    courses[0]?.title || "IIT-JEE Comprehensive Mastery 2026-27"
  );
  const [subject, setSubject] = useState("Physics");
  const [chapter, setChapter] = useState("Chapter 4: Rotational Mechanics");
  const [faculty, setFaculty] = useState("Dr. Rahul Sharma");
  const [duration, setDuration] = useState("45 mins");
  const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/watch?v=dQw4w9WgXcQ");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newClass: LMSRecordedClass = {
      id: `rec-${Date.now()}`,
      title: title.trim(),
      course: courseTitle || courses[0]?.title || "General",
      subject,
      chapter: chapter.trim() || "General Topic",
      faculty,
      duration,
      videoUrl: videoUrl.trim() || "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      viewsCount: 0,
      isPublished: true,
      date: "Just now",
    };

    store.addRecordedClass(newClass);
    setModalOpen(false);
    setTitle("");
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this recorded class?")) {
      store.deleteRecordedClass(id);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-[#004B87] text-white text-[10px] font-bold">
              Video Lectures Hub
            </Badge>
            <span className="text-xs text-gray-500 font-semibold">
              HD Video On Demand
            </span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Recorded Video Lectures
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            Upload chapter-wise video classes and lecture recordings. Students can view them immediately on their portal.
          </p>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          className="bg-[#004B87] hover:bg-[#003866] text-white font-extrabold text-xs h-10 px-5 rounded-xl shadow-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          Upload New Lecture
        </Button>
      </div>

      {/* Recordings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {recordedClasses.map((item) => (
          <Card
            key={item.id}
            className="rounded-2xl border-gray-200/90 shadow-2xs hover:shadow-md transition-shadow bg-white flex flex-col justify-between overflow-hidden"
          >
            {/* Thumbnail Preview Area */}
            <div className="relative aspect-video bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4 text-white group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 fill-white text-white translate-x-0.5" />
              </div>

              <Badge className="absolute top-3 left-3 bg-[#004B87] text-white text-[10px] font-bold border-0">
                {item.subject}
              </Badge>

              <Badge className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-[10px] font-medium border-0 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {item.duration}
              </Badge>
            </div>

            <CardContent className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-[#004B87] uppercase tracking-wide truncate">
                    {item.course}
                  </span>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1 text-gray-400 hover:text-red-600 rounded-md transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h3 className="font-extrabold text-sm text-gray-900 leading-snug line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-500 font-medium">
                  {item.chapter} • {item.faculty}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-gray-400" />
                  <span>{item.viewsCount} Views</span>
                </div>

                <a
                  href={item.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-[#004B87] hover:underline font-bold"
                >
                  <span>Watch</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Lecture Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-gray-900 flex items-center gap-2">
              <Video className="w-5 h-5 text-[#004B87]" />
              Add Recorded Lecture
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreate} className="space-y-4 pt-2">
            <div>
              <Label className="text-xs font-bold text-gray-700">Lecture Title *</Label>
              <Input
                required
                placeholder="e.g. Lecture 4: Rotational Dynamics & Rolling Motion"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 text-xs rounded-xl h-10"
              />
            </div>

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

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-bold text-gray-700">Subject *</Label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger className="mt-1 text-xs rounded-xl h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Physics" className="text-xs">Physics</SelectItem>
                    <SelectItem value="Chemistry" className="text-xs">Chemistry</SelectItem>
                    <SelectItem value="Mathematics" className="text-xs">Mathematics</SelectItem>
                    <SelectItem value="General" className="text-xs">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs font-bold text-gray-700">Duration *</Label>
                <Input
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 45 mins"
                  className="mt-1 text-xs rounded-xl h-10"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-bold text-gray-700">Chapter / Topic *</Label>
              <Input
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                placeholder="e.g. Chapter 4: Rotational Mechanics"
                className="mt-1 text-xs rounded-xl h-10"
              />
            </div>

            <div>
              <Label className="text-xs font-bold text-gray-700">Video Link / Embed URL *</Label>
              <Input
                required
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=... or direct MP4/Mux"
                className="mt-1 text-xs rounded-xl h-10"
              />
            </div>

            <div>
              <Label className="text-xs font-bold text-gray-700">Faculty / Instructor</Label>
              <Input
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                placeholder="e.g. Dr. Rahul Sharma"
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
                Publish Lecture
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
