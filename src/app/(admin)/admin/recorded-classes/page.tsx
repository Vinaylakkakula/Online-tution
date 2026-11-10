"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  EyeOff,
  Clock,
  Trash2,
  UploadCloud,
  CheckCircle2,
} from "lucide-react";

interface RecordedItem {
  id: string;
  title: string;
  course: string;
  subject: string;
  chapter: string;
  duration: string;
  viewsCount: number;
  isPublished: boolean;
  muxPlaybackId: string;
}

const mockRecordings: RecordedItem[] = [
  {
    id: "rec-1",
    title: "Lecture 1: Rigid Body Rotation & Angular Kinematics",
    course: "IIT-JEE Comprehensive Mastery 2026-27",
    subject: "Physics",
    chapter: "Chapter 4: Rotational Mechanics",
    duration: "45 mins",
    viewsCount: 382,
    isPublished: true,
    muxPlaybackId: "mux_asset_89410a",
  },
  {
    id: "rec-2",
    title: "Lecture 2: Moment of Inertia for Continuous Bodies",
    course: "IIT-JEE Comprehensive Mastery 2026-27",
    subject: "Physics",
    chapter: "Chapter 4: Rotational Mechanics",
    duration: "50 mins",
    viewsCount: 341,
    isPublished: true,
    muxPlaybackId: "mux_asset_89410b",
  },
  {
    id: "rec-3",
    title: "Lecture 3: Parallel & Perpendicular Axes Theorems",
    course: "IIT-JEE Comprehensive Mastery 2026-27",
    subject: "Physics",
    chapter: "Chapter 4: Rotational Mechanics",
    duration: "48 mins",
    viewsCount: 310,
    isPublished: true,
    muxPlaybackId: "mux_asset_89410c",
  },
  {
    id: "rec-4",
    title: "SN1 vs SN2 Nucleophilic Substitution Mechanisms",
    course: "IIT-JEE Comprehensive Mastery 2026-27",
    subject: "Chemistry",
    chapter: "Chapter 3: Reaction Mechanisms",
    duration: "52 mins",
    viewsCount: 298,
    isPublished: true,
    muxPlaybackId: "mux_asset_89410d",
  },
];

export default function AdminRecordedClassesPage() {
  const [recordings, setRecordings] = useState<RecordedItem[]>(mockRecordings);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("Physics");
  const [chapter, setChapter] = useState("Chapter 4: Rotational Mechanics");
  const [duration, setDuration] = useState("45 mins");
  const [playbackId, setPlaybackId] = useState("mux_live_stream_991");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newRec: RecordedItem = {
      id: `rec-${Date.now()}`,
      title,
      course: "IIT-JEE Comprehensive Mastery 2026-27",
      subject,
      chapter,
      duration,
      viewsCount: 0,
      isPublished: true,
      muxPlaybackId: playbackId,
    };

    setRecordings([newRec, ...recordings]);
    setModalOpen(false);
    setTitle("");
  };

  const togglePublish = (id: string) => {
    setRecordings(
      recordings.map((r) => (r.id === id ? { ...r, isPublished: !r.isPublished } : r))
    );
  };

  const deleteRec = (id: string) => {
    setRecordings(recordings.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#163B65]">Recorded Classes & DRM Playback</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Register Mux / Cloudflare Stream playback IDs, assign chapter topics, and monitor student watch metrics.
          </p>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          className="bg-[#163B65] hover:bg-[#122e50] text-white text-xs font-semibold rounded-xl h-10 px-4 gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Video Lecture
        </Button>
      </div>

      {/* Grid */}
      <div className="space-y-4">
        {recordings.map((rec) => (
          <Card key={rec.id} className="rounded-2xl border-gray-100 shadow-sm bg-white p-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-teal-400 text-teal-800 bg-teal-50 text-[10px]">
                    {rec.subject} • {rec.chapter}
                  </Badge>
                  <span className="text-[10px] text-gray-400 font-mono">
                    Asset ID: {rec.muxPlaybackId}
                  </span>
                </div>

                <h3 className="text-base font-bold text-gray-900">{rec.title}</h3>

                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    <span>{rec.duration}</span>
                  </div>
                  <span>•</span>
                  <span>{rec.viewsCount} Total Student Views</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => togglePublish(rec.id)}
                  className={`text-xs h-9 rounded-xl ${
                    rec.isPublished ? "text-emerald-700 bg-emerald-50 border-emerald-200" : "text-gray-500"
                  }`}
                >
                  {rec.isPublished ? <Eye className="w-3.5 h-3.5 mr-1" /> : <EyeOff className="w-3.5 h-3.5 mr-1" />}
                  {rec.isPublished ? "Published" : "Hidden"}
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => deleteRec(rec.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 h-9 w-9 p-0 rounded-xl"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Dialog */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[480px] p-6 rounded-3xl bg-white border-0 shadow-2xl space-y-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-[#163B65]">
              Register Video Lecture
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreate} className="space-y-4 text-xs">
            <div>
              <Label className="text-xs font-semibold text-gray-700">Lecture Title *</Label>
              <Input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Lecture 4: Torque & Equilibrium"
                className="mt-1 h-10 border-gray-200"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-semibold text-gray-700">Subject</Label>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="mt-1 h-10 border-gray-200"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold text-gray-700">Duration</Label>
                <Input
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="50 mins"
                  className="mt-1 h-10 border-gray-200"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold text-gray-700">Chapter / Topic *</Label>
              <Input
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                className="mt-1 h-10 border-gray-200"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold text-gray-700">Provider Video / Asset Playback ID</Label>
              <Input
                value={playbackId}
                onChange={(e) => setPlaybackId(e.target.value)}
                placeholder="mux_stream_id or signed cloudflare token"
                className="mt-1 h-10 font-mono border-gray-200"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="bg-[#163B65] text-white rounded-xl">
                Add Recording
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
