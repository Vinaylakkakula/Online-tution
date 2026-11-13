"use client";

import { useState } from "react";
import { useLMSData, StudentBookmark, VideoItem } from "@/lib/lms-store";
import { useAuth } from "@/context/auth-context";
import { CartoonVideoPlayer } from "@/components/media/cartoon-video-player";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Bookmark,
  Play,
  Trash2,
  Search,
  Sparkles,
  BookOpen,
  Clock,
  ArrowRight,
} from "lucide-react";

export default function BookmarksPage() {
  const { user } = useAuth();
  const studentId = user?.id || "STD-1001";
  const { bookmarks, store, refreshAll } = useLMSData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");

  // Video Player state
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeMeta, setActiveMeta] = useState({ course: "", subject: "", chapter: "" });

  // Filter bookmarks for current student
  const studentBookmarks = bookmarks.filter((b) => !b.studentId || b.studentId === studentId);

  const subjects = Array.from(new Set(studentBookmarks.map((b) => b.subject)));

  const filteredBookmarks = studentBookmarks.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.chapter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === "all" || b.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const handlePlayBookmark = (b: StudentBookmark) => {
    setActiveVideo({
      id: b.targetId,
      title: b.title,
      teacher: b.teacher,
      teacherAvatar: "🤖",
      duration: b.duration || "24 mins",
      durationMinutes: 24,
      videoUrl: b.videoUrl || "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnail: "/thumbnails/math1.jpg",
      views: 500,
      isBookmarked: true,
      resumeSeconds: 240,
      totalSeconds: 1440,
    });
    setActiveMeta({ course: b.courseTitle, subject: b.subject, chapter: b.chapter });
    setVideoModalOpen(true);
  };

  const handleRemoveBookmark = (b: StudentBookmark, e: React.MouseEvent) => {
    e.stopPropagation();
    store.toggleBookmark({
      studentId,
      targetId: b.targetId,
      type: b.type,
      title: b.title,
      courseTitle: b.courseTitle,
      subject: b.subject,
      chapter: b.chapter,
      teacher: b.teacher,
    });
    refreshAll();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-6 sm:p-8 text-gray-950 relative overflow-hidden shadow-xl">
        <div className="relative z-10 space-y-2">
          <span className="text-xs font-black uppercase tracking-wider bg-black/10 px-3 py-1 rounded-full backdrop-blur-md">
            ⭐ Your Saved Library
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            My Bookmarked Lessons 📚
          </h1>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl font-medium">
            Quickly jump back into the tricky video derivations and study topics you saved for revision!
          </p>
        </div>
        <div className="absolute -right-4 -bottom-6 text-8xl sm:text-9xl opacity-20 select-none pointer-events-none">
          ⭐
        </div>
      </div>

      {/* Search and Subject Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-3xl border-2 border-indigo-100 shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search bookmarked lessons by title, chapter or teacher..."
            className="pl-10 h-10 text-xs rounded-2xl border-gray-200 focus:ring-indigo-500"
          />
        </div>

        {subjects.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedSubject("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedSubject === "all"
                  ? "bg-amber-400 text-gray-950 shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All ({studentBookmarks.length})
            </button>
            {subjects.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                  selectedSubject === sub
                    ? "bg-amber-400 text-gray-950 shadow-xs"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bookmarks Grid */}
      {filteredBookmarks.length === 0 ? (
        <Card className="p-12 text-center rounded-3xl border-2 border-dashed border-gray-200 bg-white space-y-3">
          <span className="text-5xl">🔖</span>
          <h3 className="text-base font-black text-gray-900">No Bookmarks Found</h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto font-medium">
            Whenever you are watching a video in your Courses or Subfolders, click the Star or Bookmark icon to save it here for fast revision!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBookmarks.map((b) => (
            <Card
              key={b.id}
              onClick={() => handlePlayBookmark(b)}
              className="p-5 rounded-3xl border-2 border-amber-200 hover:border-amber-400 bg-white hover:bg-gradient-to-br hover:from-white hover:to-amber-50/50 shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge className="bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[10px]">
                    {b.subject}
                  </Badge>
                  <button
                    onClick={(e) => handleRemoveBookmark(b, e)}
                    className="p-1.5 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                    title="Remove from bookmarks"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h4 className="text-sm font-black text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-2">
                  {b.title}
                </h4>

                <p className="text-xs text-gray-500 font-medium">
                  {b.chapter}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-gray-600 font-semibold">
                  <span>👨‍🏫 {b.teacher}</span>
                  {b.duration && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        {b.duration}
                      </span>
                    </>
                  )}
                </div>

                <Button
                  size="sm"
                  className="rounded-xl text-xs font-black bg-amber-400 hover:bg-amber-500 text-gray-950 gap-1 shadow-xs"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Resume</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Video Player Modal */}
      <CartoonVideoPlayer
        open={videoModalOpen}
        onOpenChange={setVideoModalOpen}
        video={activeVideo}
        courseTitle={activeMeta.course}
        subjectName={activeMeta.subject}
        chapterTitle={activeMeta.chapter}
        studentId={studentId}
        onBookmarkChange={refreshAll}
      />
    </div>
  );
}
