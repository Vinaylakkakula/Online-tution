"use client";

import { useState } from "react";
import { LMSStore, VideoItem, useLMSData } from "@/lib/lms-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  Bookmark,
  CheckCircle2,
  Clock,
  User,
  Sparkles,
  Share2,
  Volume2,
  Gauge,
  RotateCcw,
} from "lucide-react";

interface CartoonVideoPlayerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  video: VideoItem | null;
  courseTitle: string;
  subjectName: string;
  chapterTitle: string;
  studentId?: string;
  onBookmarkChange?: () => void;
}

export function CartoonVideoPlayer({
  open,
  onOpenChange,
  video,
  courseTitle,
  subjectName,
  chapterTitle,
  studentId = "STD-1001",
  onBookmarkChange,
}: CartoonVideoPlayerProps) {
  const { bookmarks } = useLMSData();
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<number>(1);
  const [isCompleted, setIsCompleted] = useState(video?.isCompleted || false);
  const [progressSec, setProgressSec] = useState(video?.resumeSeconds || 140);
  const totalSec = video?.totalSeconds || 1440; // 24 mins default

  if (!video) return null;

  const isBookmarked = LMSStore.isBookmarked(video.id, studentId);

  const handleToggleBookmark = () => {
    LMSStore.toggleBookmark({
      studentId,
      targetId: video.id,
      type: "video",
      title: video.title,
      courseTitle,
      subject: subjectName,
      chapter: chapterTitle,
      teacher: video.teacher,
      duration: video.duration,
      videoUrl: video.videoUrl,
    });
    onBookmarkChange?.();
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
  };

  const toggleCompleted = () => {
    setIsCompleted(!isCompleted);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden rounded-3xl border-2 border-indigo-200 bg-gray-950 text-white shadow-2xl">
        {/* Video Canvas Header */}
        <div className="relative aspect-video bg-gradient-to-tr from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center overflow-hidden group">
          {/* Mock Video Canvas Animation */}
          <div className="absolute inset-0 bg-radial from-indigo-500/10 via-transparent to-black/80 pointer-events-none" />

          {/* Teacher Cartoon Mascot Overlay in corner */}
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 z-10">
            <span className="text-xl">{video.teacherAvatar || "🤖"}</span>
            <span className="text-xs font-bold text-white/90">{video.teacher}</span>
          </div>

          {/* Right Action: Bookmark & Share */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <button
              onClick={handleToggleBookmark}
              className={`p-2.5 rounded-full backdrop-blur-md border transition-all cursor-pointer ${
                isBookmarked
                  ? "bg-amber-400 text-gray-950 border-amber-300 shadow-md scale-105"
                  : "bg-black/60 text-white hover:text-amber-300 border-white/20"
              }`}
              title={isBookmarked ? "Remove Bookmark" : "Bookmark this lesson"}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
          </div>

          {/* Big Play / Pause Overlay */}
          <div className="flex flex-col items-center justify-center gap-3 z-10">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-gray-950 flex items-center justify-center shadow-xl transition-transform hover:scale-110 active:scale-95 cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 fill-current" />
              ) : (
                <Play className="w-8 h-8 ml-1 fill-current" />
              )}
            </button>
            <p className="text-xs font-bold text-white/80 bg-black/40 px-3 py-1 rounded-full backdrop-blur-xs">
              {isPlaying ? "Playing Lesson • 1080p HD" : "Click to Resume Lesson"}
            </p>
          </div>

          {/* Bottom Video Controls Overlay */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-2 z-10">
            {/* Progress bar */}
            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden cursor-pointer relative group/bar">
              <div
                className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full transition-all"
                style={{ width: `${Math.min(100, (progressSec / totalSec) * 100)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-white/80 pt-1">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] text-amber-300 font-bold">
                  {formatTime(progressSec)} / {formatTime(totalSec)}
                </span>
                <span className="text-white/40">•</span>
                <span className="text-[11px] font-semibold text-white/70">
                  Speed: {speed}x
                </span>
              </div>

              {/* Speed Buttons */}
              <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl">
                {[0.75, 1, 1.25, 1.5, 2].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSpeedChange(s)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all ${
                      speed === s
                        ? "bg-amber-400 text-gray-950 font-black shadow-xs"
                        : "text-white/80 hover:bg-white/10"
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Video Information & Meta Card */}
        <div className="p-6 bg-slate-900 border-t border-white/10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                  {subjectName}
                </span>
                <span className="text-[10px] text-white/50">{chapterTitle}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                {video.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                onClick={toggleCompleted}
                variant="outline"
                size="sm"
                className={`rounded-xl text-xs font-bold gap-1.5 transition-all ${
                  isCompleted
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                    : "border-white/20 text-white hover:bg-white/10"
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 ${isCompleted ? "text-emerald-400" : "text-white/40"}`} />
                <span>{isCompleted ? "Completed 🎉" : "Mark Complete"}</span>
              </Button>

              <Button
                onClick={handleToggleBookmark}
                size="sm"
                className={`rounded-xl text-xs font-black gap-1.5 shadow-md ${
                  isBookmarked
                    ? "bg-amber-400 text-gray-950 hover:bg-amber-300"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                }`}
              >
                <Bookmark className="w-3.5 h-3.5 fill-current" />
                <span>{isBookmarked ? "Bookmarked" : "Bookmark Lesson"}</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/10 text-xs">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-0.5">
              <span className="text-[10px] text-white/40">Teacher</span>
              <p className="font-bold text-white flex items-center gap-1">
                <span>{video.teacherAvatar}</span>
                <span className="truncate">{video.teacher}</span>
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-0.5">
              <span className="text-[10px] text-white/40">Total Duration</span>
              <p className="font-bold text-white">{video.duration}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-0.5">
              <span className="text-[10px] text-white/40">Views</span>
              <p className="font-bold text-white">{video.views.toLocaleString()} learners</p>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-0.5">
              <span className="text-[10px] text-white/40">Course Track</span>
              <p className="font-bold text-white truncate">{courseTitle}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
