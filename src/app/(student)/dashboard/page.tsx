"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { useLMSData, VideoItem } from "@/lib/lms-store";
import { getAvatarById, getFrameById, STUDENT_TITLES } from "@/lib/cartoon-avatars";
import { CartoonAvatarModal } from "@/components/modals/cartoon-avatar-modal";
import { CartoonVideoPlayer } from "@/components/media/cartoon-video-player";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  BookOpen,
  Play,
  Clock,
  Sparkles,
  CheckCircle2,
  Flame,
  ArrowRight,
  FolderOpen,
  Bookmark,
  Calendar,
  Star,
  Award,
  Video,
  FileText,
  AlertTriangle,
  Gift,
  Palette,
  Compass,
} from "lucide-react";

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const studentName = user?.full_name || "Aryan Sharma";
  const studentId = user?.id || "STD-1001";
  const classLevel = user?.class_level || "Class 8";

  const {
    cartoonCourses,
    bookmarks,
    attendance,
    emergencyAlert,
    performance,
    profileExtras,
    refreshAll,
  } = useLMSData();

  // Avatar Modal State
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);

  // Video Player Modal
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const currentAvatar = getAvatarById(profileExtras.avatarId || "astro-leo");
  const currentFrame = getFrameById(profileExtras.frameId || "frame-gold");
  const currentTitle =
    STUDENT_TITLES.find((t) => t.id === profileExtras.titleId) || STUDENT_TITLES[1];

  // Current enrolled course for the student's class
  const studentCourse =
    cartoonCourses.find((c) => c.classLevel.toLowerCase() === classLevel.toLowerCase()) ||
    cartoonCourses[0];

  const presentDays = attendance.filter((a) => a.status === "present").length || 19;
  const attendanceRate = Math.round((presentDays / 22) * 100);

  const handlePlayRecentlyWatched = () => {
    const firstVid = studentCourse?.subjects[0]?.chapters[0]?.videos[0];
    if (firstVid) {
      setActiveVideo(firstVid);
      setVideoModalOpen(true);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Cartoon Welcome & Gamified Hero HUD */}
      <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6 sm:p-8 rounded-3xl shadow-xl overflow-hidden">
        {/* Playful background stars */}
        <div className="absolute top-2 right-12 text-3xl opacity-30 select-none animate-bounce">
          ✨
        </div>
        <div className="absolute bottom-2 right-4 text-7xl sm:text-8xl opacity-15 select-none pointer-events-none">
          {currentAvatar.emoji}
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Avatar & Greetings */}
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <div
                onClick={() => setAvatarModalOpen(true)}
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-4xl sm:text-5xl bg-gradient-to-tr ${currentAvatar.bgColor} text-white cursor-pointer hover:scale-105 transition-transform shadow-lg ${currentFrame.borderClass} ${currentFrame.glowClass}`}
                title="Click to change your cartoon avatar!"
              >
                <span>{currentAvatar.emoji}</span>
              </div>
              <button
                onClick={() => setAvatarModalOpen(true)}
                className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-amber-400 text-gray-950 hover:bg-amber-300 shadow-md transition-transform hover:scale-110"
                title="Customize Avatar & Frame"
              >
                <Palette className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-white/20 text-xs font-black backdrop-blur-xs">
                  {classLevel}
                </span>
                <span className="text-amber-300 text-xs font-bold flex items-center gap-1">
                  <span>{currentTitle.icon}</span>
                  <span>{currentTitle.title}</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Hey, {studentName}! 🚀
              </h1>

              <p className="text-xs sm:text-sm text-white/80 max-w-lg font-medium">
                Hero <span className="font-bold text-amber-300">{currentAvatar.name}</span> is ready! You have completed 82% of this week's science quests.
              </p>
            </div>
          </div>

          {/* Gamification Counters HUD */}
          <div className="flex items-center gap-3 bg-black/25 backdrop-blur-md p-3 rounded-2xl border border-white/10 shrink-0">
            <div className="text-center px-3 border-r border-white/15">
              <div className="flex items-center justify-center gap-1 text-amber-300 font-black text-sm">
                <span>⭐</span>
                <span>{profileExtras.xp || 1250}</span>
              </div>
              <span className="text-[10px] text-white/70 font-semibold uppercase">Scholar XP</span>
            </div>

            <div className="text-center px-3 border-r border-white/15">
              <div className="flex items-center justify-center gap-1 text-orange-400 font-black text-sm">
                <span>🔥</span>
                <span>{profileExtras.streakDays || 5}</span>
              </div>
              <span className="text-[10px] text-white/70 font-semibold uppercase">Day Streak</span>
            </div>

            <div className="text-center px-3">
              <div className="text-emerald-400 font-black text-sm">
                Lv.{profileExtras.level || 7}
              </div>
              <span className="text-[10px] text-white/70 font-semibold uppercase">Badge Level</span>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Holiday Alert Banner (Requirement 9) */}
      {emergencyAlert && emergencyAlert.isActive && (
        <div className="p-4 rounded-3xl bg-gradient-to-r from-red-500 via-rose-500 to-orange-500 text-white shadow-md flex items-center justify-between gap-4 border-2 border-red-300">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🚨</span>
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-amber-200">
                Notice: {emergencyAlert.title}
              </p>
              <p className="text-xs text-white/95 line-clamp-1 font-medium">
                {emergencyAlert.message}
              </p>
            </div>
          </div>
          <Link href="/dashboard/calendar" className="shrink-0">
            <Button
              size="sm"
              variant="outline"
              className="text-xs font-bold text-gray-950 bg-white hover:bg-gray-100 border-none rounded-xl"
            >
              View Calendar
            </Button>
          </Link>
        </div>
      )}

      {/* 2. Subfolders Quick Access Banner (Requirement 3: "Clicking a course should display its subjects as subfolders") */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900 via-blue-900 to-indigo-950 text-white shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-5 border-2 border-indigo-500/30">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[11px] font-black uppercase text-amber-400 tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
            <Compass className="w-4 h-4" />
            <span>Folder-Style Subject Navigation (Classes 6th to 10th)</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Explore {classLevel} Subject Subfolders 📁
          </h2>
          <p className="text-xs text-white/70 max-w-xl font-medium">
            Click into Mathematics, Science, English, or Social Studies to browse chapters, recorded lessons, formula cards, assignments, and CBT tests.
          </p>
        </div>

        <Link href="/dashboard/subfolders" className="shrink-0 w-full sm:w-auto">
          <Button className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-gray-950 font-black text-xs h-11 px-6 rounded-2xl shadow-lg gap-2">
            <FolderOpen className="w-4 h-4 text-gray-950" />
            <span>Open Subfolder Explorer</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      {/* 3. Stats Overview Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 rounded-3xl border-2 border-blue-100 bg-white shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-gray-500 uppercase">
            Completed Lessons
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-blue-600">68</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              +6 this week
            </span>
          </div>
          <p className="text-[11px] text-gray-500 font-medium">
            Chapters 1 & 2 fully completed!
          </p>
        </Card>

        <Card className="p-5 rounded-3xl border-2 border-amber-100 bg-white shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-gray-500 uppercase">
            Pending Lessons
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-500">14</span>
            <span className="text-xs font-bold text-gray-500">lessons left</span>
          </div>
          <p className="text-[11px] text-gray-500 font-medium">
            Next: Number Line & Fractions
          </p>
        </Card>

        <Card className="p-5 rounded-3xl border-2 border-emerald-100 bg-white shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-gray-500 uppercase">
            Attendance Rate
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-600">{attendanceRate}%</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              Regular
            </span>
          </div>
          <p className="text-[11px] text-gray-500 font-medium">
            {presentDays} / 22 Working Days Attended
          </p>
        </Card>

        <Card className="p-5 rounded-3xl border-2 border-purple-100 bg-white shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-gray-500 uppercase">
            Bookmarked Lessons
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-purple-600">{bookmarks.length}</span>
            <Link href="/dashboard/bookmarks" className="text-xs font-bold text-indigo-600 hover:underline">
              View All →
            </Link>
          </div>
          <p className="text-[11px] text-gray-500 font-medium">
            Saved for quick revision
          </p>
        </Card>
      </div>

      {/* 4. Main Section: Enrolled Course & Subjects Progress */}
      {studentCourse && (
        <Card className="p-6 sm:p-8 rounded-3xl border-2 border-indigo-100 bg-white shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
            <div className="flex items-center gap-3">
              <span className="text-3xl p-2 rounded-2xl bg-indigo-50">
                {studentCourse.mascot}
              </span>
              <div>
                <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                  Active Course Enrollment
                </span>
                <h3 className="text-xl font-black text-gray-900 mt-0.5">
                  {studentCourse.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-500">Course Progress:</span>
              <div className="w-28 bg-gray-100 h-3 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-emerald-500 h-full rounded-full" style={{ width: "72%" }} />
              </div>
              <span className="text-xs font-black text-emerald-600">72%</span>
            </div>
          </div>

          {/* Subjects Cards in Course */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {studentCourse.subjects.map((sub) => (
              <div
                key={sub.id}
                className="p-5 rounded-2xl border-2 border-gray-100 hover:border-indigo-300 bg-gradient-to-b from-white to-gray-50/70 hover:shadow-md transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl text-white shadow-xs"
                    style={{ backgroundColor: sub.accentColor }}
                  >
                    {sub.icon}
                  </span>
                  <span className="text-[11px] font-bold text-gray-500">
                    {sub.chapters.length} Chapters
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-black text-gray-900">{sub.name}</h4>
                  <p className="text-[11px] text-gray-500 font-medium">
                    {sub.teacherAvatar} {sub.teacherName}
                  </p>
                </div>

                <Link
                  href="/dashboard/subfolders"
                  className="text-xs font-black text-indigo-600 hover:text-indigo-800 flex items-center gap-1 pt-1"
                >
                  <span>Open Folder</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* 5. Recently Watched Recorded Classes & Upcoming Live Lecture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Recently Watched */}
        <Card className="lg:col-span-7 p-6 rounded-3xl border-2 border-indigo-100 bg-white shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
              <Video className="w-4 h-4 text-rose-500" />
              <span>Recently Watched Recorded Class</span>
            </h3>
            <span className="text-xs font-bold text-gray-400">Resume playback</span>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/70 to-purple-50/40 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-orange-500 text-white flex items-center justify-center text-xl shrink-0 shadow-xs">
                ▶
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded-md">
                  Mathematics • Class 6th
                </span>
                <h4 className="text-sm font-black text-gray-900">
                  Fun with Large Numbers & Comparing Digits
                </h4>
                <p className="text-[11px] text-gray-500 font-medium">
                  Paused at 14:20 of 24 mins
                </p>
              </div>
            </div>

            <Button
              size="sm"
              onClick={handlePlayRecentlyWatched}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs h-9 px-5 rounded-xl shadow-xs shrink-0 gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Resume Lesson</span>
            </Button>
          </div>
        </Card>

        {/* Upcoming Live Lecture */}
        <Card className="lg:col-span-5 p-6 rounded-3xl border-2 border-indigo-100 bg-white shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-500" />
              <span>Upcoming Live Lecture</span>
            </h3>
            <Badge className="bg-emerald-500 text-white text-[10px] font-bold">
              Today
            </Badge>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
            <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider">
              Today, 5:00 PM – 6:30 PM IST
            </span>
            <h4 className="text-sm font-black text-gray-900">
              Science Explorer: Components of Food & Lab Demonstrations
            </h4>
            <p className="text-xs text-gray-600 font-medium">
              Mentor: Dr. Neha Sen 🦉 (Interactive Live Zoom Room)
            </p>

            <div className="pt-2">
              <Link href="/dashboard/live-classes">
                <Button
                  size="sm"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-xs gap-1.5"
                >
                  <span>Join Live Lecture Room</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>

      {/* 6. Quick Launchers: Bookmarks, Attendance, Report Card, Feedback */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link href="/dashboard/bookmarks">
          <Card className="p-4 rounded-2xl border-2 border-amber-200 bg-amber-50/40 hover:bg-amber-100/50 hover:shadow-md transition-all flex items-center gap-3">
            <span className="text-2xl">⭐</span>
            <div>
              <h4 className="text-xs font-black text-gray-900">My Bookmarks</h4>
              <p className="text-[10px] text-gray-500">Saved videos & PDFs</p>
            </div>
          </Card>
        </Link>

        <Link href="/dashboard/attendance">
          <Card className="p-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50/40 hover:bg-emerald-100/50 hover:shadow-md transition-all flex items-center gap-3">
            <span className="text-2xl">📅</span>
            <div>
              <h4 className="text-xs font-black text-gray-900">Attendance Grid</h4>
              <p className="text-[10px] text-gray-500">Monthly calendar</p>
            </div>
          </Card>
        </Link>

        <Link href="/dashboard/performance">
          <Card className="p-4 rounded-2xl border-2 border-purple-200 bg-purple-50/40 hover:bg-purple-100/50 hover:shadow-md transition-all flex items-center gap-3">
            <span className="text-2xl">📊</span>
            <div>
              <h4 className="text-xs font-black text-gray-900">Report Card</h4>
              <p className="text-[10px] text-gray-500">Scores & badges</p>
            </div>
          </Card>
        </Link>

        <Link href="/dashboard/feedback">
          <Card className="p-4 rounded-2xl border-2 border-pink-200 bg-pink-50/40 hover:bg-pink-100/50 hover:shadow-md transition-all flex items-center gap-3">
            <span className="text-2xl">💬</span>
            <div>
              <h4 className="text-xs font-black text-gray-900">Rate & Review</h4>
              <p className="text-[10px] text-gray-500">Share your thoughts</p>
            </div>
          </Card>
        </Link>
      </div>

      {/* Avatar Customization Modal */}
      <CartoonAvatarModal
        open={avatarModalOpen}
        onOpenChange={setAvatarModalOpen}
        studentId={studentId}
        studentName={studentName}
        currentExtras={profileExtras}
        onSave={refreshAll}
      />

      {/* Video Player Modal */}
      <CartoonVideoPlayer
        open={videoModalOpen}
        onOpenChange={setVideoModalOpen}
        video={activeVideo}
        courseTitle={studentCourse?.title || "Class Course"}
        subjectName={studentCourse?.subjects[0]?.name || "Mathematics"}
        chapterTitle="Chapter 1: Knowing Our Numbers"
        studentId={studentId}
        onBookmarkChange={refreshAll}
      />
    </div>
  );
}
