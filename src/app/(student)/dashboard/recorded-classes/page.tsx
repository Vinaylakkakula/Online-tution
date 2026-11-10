"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  CheckCircle2,
  Clock,
  BookOpen,
  Share2,
  Bookmark,
  FileText,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Video,
} from "lucide-react";
import { useLMSData, LMSRecordedClass } from "@/lib/lms-store";

function getYouTubeEmbedUrl(url: string) {
  if (!url) return "";
  try {
    if (url.includes("embed/")) return url;
    if (url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("watch?v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
  } catch {
    return url;
  }
  return url;
}

export default function StudentRecordedClassesPage() {
  const { recordedClasses } = useLMSData();
  const [selectedLectureId, setSelectedLectureId] = useState<string>(
    recordedClasses[0]?.id || ""
  );
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({
    "rec-1": true,
  });

  const activeLecture: LMSRecordedClass | undefined =
    recordedClasses.find((r) => r.id === selectedLectureId) ||
    recordedClasses[0];

  const isCompleted = activeLecture ? !!completedMap[activeLecture.id] : false;

  const toggleComplete = (id: string) => {
    setCompletedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const embedUrl = activeLecture
    ? getYouTubeEmbedUrl(activeLecture.videoUrl)
    : "";

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Breadcrumb & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-[#004B87] text-white text-[10px] font-bold">
              Video Player
            </Badge>
            <span className="text-xs text-gray-500 font-semibold">
              HD Chapter Recordings
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            {activeLecture?.course || "IIT-JEE Comprehensive Mastery"}
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            {activeLecture?.chapter} • {activeLecture?.faculty}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => activeLecture && toggleComplete(activeLecture.id)}
            className={`text-xs font-bold rounded-xl h-9 px-4 ${
              isCompleted
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "border-gray-200 text-gray-700"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
            {isCompleted ? "Completed" : "Mark as Watched"}
          </Button>
        </div>
      </div>

      {/* Main Grid: Video Player on Left, Playlist on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Video Player + Notes */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="rounded-2xl border-gray-200/90 shadow-md bg-black overflow-hidden">
            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              {embedUrl && embedUrl.includes("http") ? (
                <iframe
                  src={embedUrl}
                  title={activeLecture?.title || "Video lecture"}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="text-center text-white space-y-3 p-6">
                  <Video className="w-12 h-12 text-[#004B87] mx-auto" />
                  <p className="text-sm font-bold">
                    {activeLecture?.title || "Select a lecture from the playlist"}
                  </p>
                  <p className="text-xs text-gray-400">
                    Video link: {activeLecture?.videoUrl}
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Active Lecture Details */}
          {activeLecture && (
            <Card className="rounded-2xl border-gray-200/90 shadow-2xs bg-white p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#004B87] text-white text-[10px] font-bold">
                      {activeLecture.subject}
                    </Badge>
                    <span className="text-xs text-gray-500 font-bold">
                      {activeLecture.duration}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">
                      Uploaded {activeLecture.date}
                    </span>
                  </div>
                  <h2 className="text-lg font-black text-gray-900">
                    {activeLecture.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs rounded-xl h-8 text-gray-600"
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.href);
                      alert("Lecture link copied to clipboard!");
                    }}
                  >
                    <Share2 className="w-3.5 h-3.5 mr-1" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Tabs: Overview, Notes, Q&A */}
              <Tabs defaultValue="overview" className="pt-2">
                <TabsList className="bg-gray-100 p-1 rounded-xl">
                  <TabsTrigger value="overview" className="text-xs font-bold rounded-lg">
                    Lesson Overview
                  </TabsTrigger>
                  <TabsTrigger value="formula" className="text-xs font-bold rounded-lg">
                    Formula Cheat Sheet
                  </TabsTrigger>
                  <TabsTrigger value="qa" className="text-xs font-bold rounded-lg">
                    Ask Doubt (Faculty)
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="pt-4 space-y-3 text-xs text-gray-600 leading-relaxed">
                  <p>
                    In this session, <strong>{activeLecture.faculty}</strong> covers the fundamental principles of{" "}
                    <strong>{activeLecture.chapter}</strong>, walking through core definitions, derivations, and JEE Main / Advanced level problem-solving tricks.
                  </p>
                  <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 text-blue-900 text-xs space-y-1 font-medium">
                    <span className="font-bold block">Key Learning Goals:</span>
                    <ul className="list-disc list-inside space-y-0.5 text-[11px] text-blue-800">
                      <li>Mathematical formulation and standard textbook proofs</li>
                      <li>High-yield shortcuts to save 2-3 minutes per question in CBT exams</li>
                      <li>Common pitfalls and sign errors in numerical calculations</li>
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="formula" className="pt-4 space-y-2">
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono space-y-2 text-gray-800">
                    <div>1. Parallel Axis: <strong>I = I_cm + M * d^2</strong></div>
                    <div>2. Perpendicular Axis (Plane laminas): <strong>I_z = I_x + I_y</strong></div>
                    <div>3. Pure Rolling Condition: <strong>v_cm = omega * R</strong></div>
                    <div>4. Rolling Acceleration on incline: <strong>a = g*sin(theta) / (1 + I / (M*R^2))</strong></div>
                  </div>
                </TabsContent>

                <TabsContent value="qa" className="pt-4 space-y-3">
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs text-center space-y-2">
                    <MessageSquare className="w-8 h-8 text-[#004B87] mx-auto" />
                    <h4 className="font-bold text-gray-800">Have a doubt in this lecture?</h4>
                    <p className="text-[11px] text-gray-500">
                      Send your question directly to {activeLecture.faculty}. Answers are posted within 2 hours.
                    </p>
                    <Button
                      onClick={() => alert("Doubt cleared ticket created! Faculty notified.")}
                      className="bg-[#004B87] hover:bg-[#003866] text-white font-bold text-xs rounded-xl h-8 px-4"
                    >
                      Post Question to Teacher
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          )}
        </div>

        {/* Right: Course Playlist */}
        <div className="space-y-4">
          <Card className="rounded-2xl border-gray-200/90 shadow-2xs bg-white overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-black text-sm text-gray-900">
                  Course Video Playlist
                </h3>
                <span className="text-[11px] text-gray-500 font-medium">
                  {recordedClasses.length} Lectures Available
                </span>
              </div>
              <Badge className="bg-[#004B87] text-white text-[10px] font-bold">
                Live Synced
              </Badge>
            </div>

            <div className="divide-y divide-gray-100 max-h-[620px] overflow-y-auto">
              {recordedClasses.map((lecture, idx) => {
                const isSelected = lecture.id === (activeLecture?.id ?? "");
                const done = !!completedMap[lecture.id];

                return (
                  <div
                    key={lecture.id}
                    onClick={() => setSelectedLectureId(lecture.id)}
                    className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-blue-50/80 border-l-4 border-l-[#004B87]"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {done ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center text-[9px] font-bold ${
                            isSelected
                              ? "bg-[#004B87] text-white border-[#004B87]"
                              : "border-gray-300 text-gray-500"
                          }`}
                        >
                          {idx + 1}
                        </div>
                      )}
                    </div>

                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <Badge
                          variant="outline"
                          className="text-[9px] font-bold px-1.5 py-0 border-gray-300 text-gray-600"
                        >
                          {lecture.subject}
                        </Badge>
                        <span className="text-[10px] text-gray-400 font-medium shrink-0">
                          {lecture.duration}
                        </span>
                      </div>

                      <h4
                        className={`text-xs font-bold leading-snug line-clamp-2 ${
                          isSelected ? "text-[#004B87] font-extrabold" : "text-gray-800"
                        }`}
                      >
                        {lecture.title}
                      </h4>

                      <p className="text-[10px] text-gray-400 truncate">
                        {lecture.chapter}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
