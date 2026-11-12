"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Radio,
  FileCheck2,
  FileText,
  AlertCircle,
  CheckCircle2,
  Trash2,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { useLMSData } from "@/lib/lms-store";

export default function NotificationsPage() {
  const { announcements, liveClasses, materials, tests } = useLMSData();
  const [readMap, setReadMap] = useState<Record<string, boolean>>({});

  const markAllAsRead = () => {
    const newMap: Record<string, boolean> = {};
    announcements.forEach((a) => (newMap[a.id] = true));
    setReadMap(newMap);
  };

  const toggleRead = (id: string) => {
    setReadMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-8 max-w-4xl pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-[#004B87] text-white text-[10px] font-bold">
              Activity & Notices
            </Badge>
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Sync with Admin
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#163B65]">Notifications & Announcements</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Official announcements, schedule changes, live class reminders, and new study material alerts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={markAllAsRead}
            variant="outline"
            size="sm"
            className="text-xs text-[#004B87] border-[#004B87]/30 hover:bg-[#EAF4FF] rounded-xl"
          >
            Mark all read
          </Button>
        </div>
      </div>

      {/* Admin Broadcast Announcements Section */}
      <div className="space-y-4">
        <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-500" />
          <span>Official Admin Notices ({announcements.length})</span>
        </h2>

        {announcements.length === 0 ? (
          <Card className="p-6 text-center text-xs text-gray-400">
            No active announcements.
          </Card>
        ) : (
          announcements.map((ann) => (
            <Card
              key={ann.id}
              className={`rounded-2xl border transition-all p-5 shadow-2xs ${
                ann.priority === "high"
                  ? "border-amber-300 bg-gradient-to-r from-amber-50/60 to-white"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      ann.priority === "high"
                        ? "bg-amber-500 text-white shadow-xs"
                        : "bg-blue-100 text-[#004B87]"
                    }`}
                  >
                    <AlertCircle className="w-5 h-5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-sm text-gray-900">{ann.title}</span>
                      <Badge className="bg-amber-100 text-amber-900 border-amber-300 text-[10px] font-bold">
                        {ann.category}
                      </Badge>
                      <span className="text-[11px] text-gray-400 font-medium">{ann.date}</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{ann.message}</p>
                  </div>
                </div>

                <button
                  onClick={() => toggleRead(ann.id)}
                  className="text-xs text-gray-400 hover:text-gray-700 shrink-0 font-medium"
                >
                  {readMap[ann.id] ? "Mark Unread" : "Mark Read"}
                </button>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Auto-synced Academic Activity Reminders */}
      <div className="space-y-4 pt-4">
        <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#004B87]" />
          <span>Live Academic Feed</span>
        </h2>

        <div className="space-y-3">
          {liveClasses.slice(0, 2).map((lc) => (
            <Card key={lc.id} className="rounded-2xl border-gray-200 bg-white p-4 shadow-2xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <Radio className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-gray-900">{lc.title}</span>
                    <Badge className="bg-red-50 text-red-700 border-red-200 text-[9px] font-bold">
                      {lc.status.toUpperCase()}
                    </Badge>
                  </div>
                  <span className="text-[11px] text-gray-500">{lc.scheduledAt} • {lc.faculty}</span>
                </div>
              </div>
              <Link href="/dashboard/live-classes">
                <Button size="sm" className="h-8 text-xs font-bold bg-[#004B87] hover:bg-[#003866] text-white rounded-lg">
                  Join
                </Button>
              </Link>
            </Card>
          ))}

          {materials.slice(0, 2).map((mat) => (
            <Card key={mat.id} className="rounded-2xl border-gray-200 bg-white p-4 shadow-2xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-xs text-gray-900 block truncate max-w-md">{mat.title}</span>
                  <span className="text-[11px] text-gray-500">{mat.subject} • {mat.fileType} • {mat.dateUploaded}</span>
                </div>
              </div>
              <Link href="/dashboard/materials">
                <Button size="sm" variant="outline" className="h-8 text-xs font-bold text-[#004B87] rounded-lg">
                  View
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
