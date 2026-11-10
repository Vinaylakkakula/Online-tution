"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Megaphone,
  Plus,
  Trash2,
  AlertCircle,
  Bell,
  CheckCircle2,
} from "lucide-react";

interface AnnouncementItem {
  id: string;
  title: string;
  content: string;
  audience: string;
  priority: "high" | "medium" | "low";
  date: string;
}

const mockAnnouncements: AnnouncementItem[] = [
  {
    id: "ann-1",
    title: "Special Weekend Doubt Clearing Session with Er. Amit Verma",
    content: "All JEE 2026-27 students can join a dedicated interactive live doubt clearing session focusing on Advanced Calculus this Saturday at 4:00 PM IST.",
    audience: "IIT-JEE Students",
    priority: "high",
    date: "Today, 10:00 AM",
  },
  {
    id: "ann-2",
    title: "New 200-Question Chemistry Problem Sheet Uploaded",
    content: "Prof. Priya Saxena has uploaded the updated Organic Synthesis worksheet in the Study Materials section.",
    audience: "All Enrolled Students",
    priority: "medium",
    date: "Yesterday",
  },
  {
    id: "ann-3",
    title: "NTA JEE Main 2027 Official Notification & Registration Open",
    content: "Students are advised to review the NTA eligibility criteria before filing candidate details.",
    audience: "Class 12 & Droppers",
    priority: "high",
    date: "3 days ago",
  },
];

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(mockAnnouncements);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [audience, setAudience] = useState("All Enrolled Students");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const newAnn: AnnouncementItem = {
      id: `ann-${Date.now()}`,
      title,
      content,
      audience,
      priority,
      date: "Just now",
    };

    setAnnouncements([newAnn, ...announcements]);
    setModalOpen(false);
    setTitle("");
    setContent("");
  };

  const deleteAnn = (id: string) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#163B65]">Announcements Broadcast Manager</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Dispatch high-priority notifications, exam alerts, and schedule alterations directly to student dashboards.
          </p>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          className="bg-[#163B65] hover:bg-[#122e50] text-white text-xs font-semibold rounded-xl h-10 px-4 gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Broadcast Announcement
        </Button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {announcements.map((ann) => (
          <Card key={ann.id} className="rounded-2xl border-gray-100 shadow-sm bg-white p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge
                  className={`text-[10px] uppercase font-bold ${
                    ann.priority === "high"
                      ? "bg-red-500 text-white"
                      : ann.priority === "medium"
                      ? "bg-amber-500 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {ann.priority} Priority
                </Badge>
                <span className="text-xs text-gray-500 font-semibold">Target: {ann.audience}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-gray-400">{ann.date}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => deleteAnn(ann.id)}
                  className="text-red-500 hover:text-red-700 h-8 w-8 p-0 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <h3 className="text-base font-bold text-gray-900 leading-snug">{ann.title}</h3>
            <p className="text-xs text-gray-600 leading-relaxed">{ann.content}</p>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[480px] p-6 rounded-3xl bg-white border-0 shadow-2xl space-y-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-[#163B65]">
              Broadcast Platform Announcement
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreate} className="space-y-4 text-xs">
            <div>
              <Label className="text-xs font-semibold text-gray-700">Headline *</Label>
              <Input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Schedule Change for Sunday Physics Class"
                className="mt-1 h-10 border-gray-200"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-semibold text-gray-700">Target Audience</Label>
                <Input
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="mt-1 h-10 border-gray-200"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold text-gray-700">Priority Level</Label>
                <Select value={priority} onValueChange={(val) => setPriority(val as "high" | "medium" | "low")}>
                  <SelectTrigger className="mt-1 h-10 border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="low">Standard / Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold text-gray-700">Announcement Body *</Label>
              <Textarea
                required
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Provide complete instructions, links, or rescheduled timings..."
                className="mt-1 resize-none border-gray-200"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="bg-[#163B65] text-white rounded-xl">
                Send Broadcast
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
