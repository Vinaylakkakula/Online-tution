"use client";

import { useState, useMemo } from "react";
import {
  CartoonCourse,
  SubjectItem,
  ChapterItem,
  VideoItem,
  MaterialItem,
  AssignmentItem,
  TestItem,
  useLMSData,
} from "@/lib/lms-store";
import { CartoonVideoPlayer } from "@/components/media/cartoon-video-player";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Folder,
  FolderOpen,
  ChevronRight,
  BookOpen,
  Video,
  FileText,
  FileCheck2,
  Trophy,
  Play,
  Download,
  Bookmark,
  CheckCircle2,
  Search,
  Sparkles,
  ArrowLeft,
  Clock,
  Layers,
  Check,
  AlertCircle,
} from "lucide-react";

interface SubfolderExplorerProps {
  initialClass?: string;
  studentId?: string;
}

export function SubfolderExplorer({
  initialClass = "Class 6",
  studentId = "STD-1001",
}: SubfolderExplorerProps) {
  const { cartoonCourses, store, refreshAll } = useLMSData();

  // Navigation State
  const [selectedClass, setSelectedClass] = useState<string>(initialClass);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [activeResourceTab, setActiveResourceTab] = useState<
    "videos" | "materials" | "assignments" | "tests"
  >("videos");

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");

  // Video Player Modal
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // CBT Quiz Active Test State
  const [activeTest, setActiveTest] = useState<TestItem | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Find Current Course
  const currentCourse = useMemo(() => {
    return (
      cartoonCourses.find(
        (c) => c.classLevel.toLowerCase() === selectedClass.toLowerCase()
      ) || cartoonCourses[0]
    );
  }, [cartoonCourses, selectedClass]);

  // Find Current Subject
  const currentSubject = useMemo(() => {
    if (!currentCourse || !selectedSubjectId) return null;
    return currentCourse.subjects.find((s) => s.id === selectedSubjectId) || null;
  }, [currentCourse, selectedSubjectId]);

  // Find Current Chapter
  const currentChapter = useMemo(() => {
    if (!currentSubject || !selectedChapterId) return null;
    return (
      currentSubject.chapters.find((ch) => ch.id === selectedChapterId) || null
    );
  }, [currentSubject, selectedChapterId]);

  // Handle Play Video
  const handleOpenVideo = (v: VideoItem) => {
    setActiveVideo(v);
    setVideoModalOpen(true);
  };

  // Handle Quick Bookmark
  const handleToggleBookmark = (v: VideoItem, e: React.MouseEvent) => {
    e.stopPropagation();
    store.toggleBookmark({
      studentId,
      targetId: v.id,
      type: "video",
      title: v.title,
      courseTitle: currentCourse?.title || "Class Course",
      subject: currentSubject?.name || "Subject",
      chapter: currentChapter?.title || "Chapter",
      teacher: v.teacher,
      duration: v.duration,
      videoUrl: v.videoUrl,
    });
    refreshAll();
  };

  // Start CBT Quiz
  const handleStartQuiz = (test: TestItem) => {
    setActiveTest(test);
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const handleSelectQuizAnswer = (qId: number, optionIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateQuizScore = () => {
    if (!activeTest) return 0;
    let score = 0;
    activeTest.questions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        score += Math.round(activeTest.totalMarks / activeTest.questions.length);
      }
    });
    return score;
  };

  // Breadcrumbs Generator
  const resetToCourses = () => {
    setSelectedSubjectId(null);
    setSelectedChapterId(null);
  };

  const resetToSubjects = () => {
    setSelectedChapterId(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Class Tabs Bar (Class 6th to 10th) */}
      <div className="flex flex-wrap items-center gap-2 p-2 bg-white rounded-3xl border-2 border-indigo-100 shadow-sm">
        <span className="text-xs font-black text-indigo-900 px-3 py-1 flex items-center gap-1.5">
          <span>🎒</span>
          <span>Select Grade:</span>
        </span>
        {["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"].map((cls) => {
          const isSelected = selectedClass === cls;
          return (
            <button
              key={cls}
              onClick={() => {
                setSelectedClass(cls);
                resetToCourses();
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                isSelected
                  ? "bg-[#004B87] text-white shadow-xs scale-102"
                  : "bg-gray-100/80 text-gray-700 hover:bg-blue-50 hover:text-[#004B87]"
              }`}
            >
              <span>{cls === "Class 6" ? "🚀" : cls === "Class 7" ? "🦖" : cls === "Class 8" ? "🤖" : cls === "Class 9" ? "🦉" : "🥷"}</span>
              <span>{cls}</span>
            </button>
          );
        })}
      </div>

      {/* Breadcrumbs Navigation Bar */}
      <div className="flex items-center gap-2 text-xs font-bold bg-indigo-50/70 border border-indigo-200/60 p-3.5 rounded-2xl overflow-x-auto shadow-2xs">
        <button
          onClick={resetToCourses}
          className="text-indigo-700 hover:text-indigo-900 hover:underline flex items-center gap-1 shrink-0"
        >
          <span>📁 {selectedClass} Subjects</span>
        </button>

        {currentSubject && (
          <>
            <ChevronRight className="w-4 h-4 text-indigo-400 shrink-0" />
            <button
              onClick={resetToSubjects}
              className="text-indigo-700 hover:text-indigo-900 hover:underline flex items-center gap-1 shrink-0"
            >
              <span>{currentSubject.icon}</span>
              <span>{currentSubject.name}</span>
            </button>
          </>
        )}

        {currentChapter && (
          <>
            <ChevronRight className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="text-gray-900 font-black flex items-center gap-1 shrink-0">
              <span>📖</span>
              <span>Chapter {currentChapter.chapterNumber}: {currentChapter.title}</span>
            </span>
          </>
        )}
      </div>

      {/* LEVEL 1: SUBJECT SUBFOLDERS VIEW (When no subject is clicked yet) */}
      {!selectedSubjectId && currentCourse && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-white via-blue-50/40 to-slate-50 border border-gray-200/90 rounded-3xl p-6 sm:p-8 text-gray-900 relative overflow-hidden shadow-xs">
            <div className="relative z-10 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-blue-100 text-[#004B87] px-3 py-1 rounded-full">
                {currentCourse.badgeTitle}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#163B65] tracking-tight">
                {currentCourse.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 max-w-2xl font-normal">
                {currentCourse.subtitle} Click any subject subfolder below to explore its chapters, recorded videos, formula sheets & CBT tests!
              </p>
            </div>
            <div className="absolute -right-4 -bottom-6 text-8xl sm:text-9xl opacity-10 select-none pointer-events-none">
              {currentCourse.mascot}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentCourse.subjects.map((sub) => (
              <Card
                key={sub.id}
                onClick={() => setSelectedSubjectId(sub.id)}
                className="group relative p-6 rounded-3xl border-2 border-indigo-100 hover:border-indigo-400 bg-white hover:bg-gradient-to-br hover:from-white hover:to-indigo-50/50 shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-md text-white"
                    style={{ backgroundColor: sub.accentColor }}
                  >
                    {sub.icon}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:translate-x-1 transition-transform">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-black text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {sub.name}
                </h3>
                <p className="text-xs text-gray-500 font-medium mt-1">
                  Mentor: <span className="font-bold text-gray-800">{sub.teacherName}</span> {sub.teacherAvatar}
                </p>

                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-100 text-[11px] font-bold text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                    <span>{sub.chapters.length || sub.chaptersCount} Chapters</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-rose-500" />
                    <span>{sub.totalVideos} Videos</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* LEVEL 2: CHAPTERS VIEW (When a subject is selected, but chapter is not) */}
      {selectedSubjectId && !selectedChapterId && currentSubject && (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4 bg-white p-5 rounded-3xl border-2 border-indigo-100 shadow-sm">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={resetToCourses}
                className="rounded-xl text-xs font-bold gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>All Subjects</span>
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{currentSubject.icon}</span>
                <div>
                  <h3 className="text-lg font-black text-gray-900">
                    {currentSubject.name} — Subfolders
                  </h3>
                  <p className="text-xs text-gray-500 font-semibold">
                    Teacher: {currentSubject.teacherName} {currentSubject.teacherAvatar}
                  </p>
                </div>
              </div>
            </div>

            <Badge className="bg-indigo-600 text-white font-bold text-xs px-3 py-1 rounded-full">
              {currentSubject.chapters.length} Chapters
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentSubject.chapters.map((ch) => (
              <Card
                key={ch.id}
                onClick={() => setSelectedChapterId(ch.id)}
                className="p-5 rounded-3xl border-2 border-indigo-100 hover:border-indigo-400 bg-white hover:bg-gradient-to-br hover:from-white hover:to-indigo-50/50 shadow-md hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-2xl bg-indigo-100 text-indigo-700 font-black text-sm flex items-center justify-center shrink-0">
                      #{ch.chapterNumber}
                    </span>
                    <div>
                      <h4 className="text-base font-black text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {ch.title}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                        {ch.summary}
                      </p>
                    </div>
                  </div>
                  {ch.isCompleted ? (
                    <span className="shrink-0 p-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  ) : (
                    <span className="shrink-0 text-xs text-indigo-600 font-bold bg-indigo-50 px-2 py-1 rounded-lg">
                      {ch.progressPercent}%
                    </span>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600 font-bold">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-rose-600">
                      <Video className="w-3.5 h-3.5" />
                      {ch.videos.length} Videos
                    </span>
                    <span className="flex items-center gap-1 text-blue-600">
                      <FileText className="w-3.5 h-3.5" />
                      {ch.materials.length} PDFs
                    </span>
                    <span className="flex items-center gap-1 text-amber-600">
                      <Trophy className="w-3.5 h-3.5" />
                      {ch.tests.length} Quizzes
                    </span>
                  </div>
                  <span className="text-indigo-600 group-hover:translate-x-1 transition-transform flex items-center gap-1 text-[11px] font-black">
                    Open Folder <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* LEVEL 3: CHAPTER CONTENT VIEW (Recorded Videos, Study Materials, Assignments, Tests) */}
      {selectedSubjectId && selectedChapterId && currentSubject && currentChapter && (
        <div className="space-y-6">
          {/* Chapter Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border-2 border-indigo-100 shadow-sm">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={resetToSubjects}
                className="rounded-xl text-xs font-bold gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Chapters</span>
              </Button>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                  Chapter {currentChapter.chapterNumber}
                </span>
                <h3 className="text-lg font-black text-gray-900 mt-0.5">
                  {currentChapter.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-600">Chapter Progress:</span>
              <div className="w-24 bg-gray-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full"
                  style={{ width: `${currentChapter.progressPercent}%` }}
                />
              </div>
              <span className="text-xs font-black text-emerald-600">
                {currentChapter.progressPercent}%
              </span>
            </div>
          </div>

          {/* Subfolder Resource Tabs: Videos, Materials, Assignments, Tests */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-gray-100 rounded-2xl">
            <button
              onClick={() => setActiveResourceTab("videos")}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                activeResourceTab === "videos"
                  ? "bg-rose-500 text-white shadow-md scale-102"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              <Video className="w-4 h-4" />
              <span>🎥 Recorded Videos ({currentChapter.videos.length})</span>
            </button>

            <button
              onClick={() => setActiveResourceTab("materials")}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                activeResourceTab === "materials"
                  ? "bg-blue-600 text-white shadow-md scale-102"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>📚 Study Materials ({currentChapter.materials.length})</span>
            </button>

            <button
              onClick={() => setActiveResourceTab("assignments")}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                activeResourceTab === "assignments"
                  ? "bg-amber-500 text-gray-950 shadow-md scale-102 font-black"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              <span>📝 Assignments ({currentChapter.assignments.length})</span>
            </button>

            <button
              onClick={() => setActiveResourceTab("tests")}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                activeResourceTab === "tests"
                  ? "bg-purple-600 text-white shadow-md scale-102"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>🏆 Tests & Quizzes ({currentChapter.tests.length})</span>
            </button>
          </div>

          {/* TAB 1: RECORDED VIDEOS */}
          {activeResourceTab === "videos" && (
            <div className="space-y-4">
              {currentChapter.videos.length === 0 ? (
                <Card className="p-8 text-center rounded-3xl border-2 border-dashed border-gray-200">
                  <p className="text-sm font-bold text-gray-500">
                    No recorded lectures added yet for this chapter. Check back soon!
                  </p>
                </Card>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentChapter.videos.map((vid) => {
                    const isBmk = store.isBookmarked(vid.id, studentId);
                    return (
                      <Card
                        key={vid.id}
                        onClick={() => handleOpenVideo(vid)}
                        className="overflow-hidden rounded-3xl border-2 border-indigo-100 hover:border-indigo-400 bg-white hover:shadow-xl transition-all cursor-pointer group"
                      >
                        <div className="relative aspect-video bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center">
                          <button className="w-12 h-12 rounded-full bg-amber-400 text-gray-950 flex items-center justify-center group-hover:scale-115 transition-transform shadow-lg">
                            <Play className="w-5 h-5 ml-0.5 fill-current" />
                          </button>
                          <span className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-xs text-[10px] font-bold text-white px-2 py-0.5 rounded-md">
                            {vid.duration}
                          </span>
                          <button
                            onClick={(e) => handleToggleBookmark(vid, e)}
                            className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md border ${
                              isBmk
                                ? "bg-amber-400 text-gray-950 border-amber-300"
                                : "bg-black/50 text-white border-white/20 hover:text-amber-300"
                            }`}
                            title={isBmk ? "Bookmarked" : "Bookmark this video"}
                          >
                            <Bookmark className="w-3.5 h-3.5 fill-current" />
                          </button>
                        </div>

                        <div className="p-4 space-y-2">
                          <h4 className="text-sm font-black text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                            {vid.title}
                          </h4>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span className="font-semibold text-gray-700">
                              {vid.teacherAvatar} {vid.teacher}
                            </span>
                            <span className="text-[11px] font-bold text-indigo-600">
                              ▶ Watch Class
                            </span>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: STUDY MATERIALS */}
          {activeResourceTab === "materials" && (
            <div className="space-y-4">
              {currentChapter.materials.length === 0 ? (
                <Card className="p-8 text-center rounded-3xl border-2 border-dashed border-gray-200">
                  <p className="text-sm font-bold text-gray-500">
                    No notes or formula sheets uploaded for this chapter yet.
                  </p>
                </Card>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentChapter.materials.map((mat) => (
                    <Card
                      key={mat.id}
                      className="p-5 rounded-3xl border-2 border-indigo-100 hover:border-indigo-400 bg-white hover:shadow-lg transition-all flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                          PDF
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-gray-900 line-clamp-1">
                            {mat.title}
                          </h4>
                          <p className="text-xs text-gray-500 font-semibold mt-0.5">
                            {mat.fileType} • {mat.fileSize} • {mat.pagesCount} Pages
                          </p>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        onClick={() =>
                          alert(`Downloading "${mat.title}"... Sample study material preview ready!`)
                        }
                        className="rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shrink-0 gap-1.5 shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </Button>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ASSIGNMENTS */}
          {activeResourceTab === "assignments" && (
            <div className="space-y-4">
              {currentChapter.assignments.length === 0 ? (
                <Card className="p-8 text-center rounded-3xl border-2 border-dashed border-gray-200">
                  <p className="text-sm font-bold text-gray-500">
                    No pending homework assignments for this chapter. You are all caught up! ✨
                  </p>
                </Card>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {currentChapter.assignments.map((asg) => (
                    <Card
                      key={asg.id}
                      className="p-5 rounded-3xl border-2 border-amber-200 bg-amber-50/30 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-400 text-gray-950">
                            Due: {asg.dueDate}
                          </span>
                          <span className="text-xs font-bold text-gray-600">
                            Max Marks: {asg.totalMarks}
                          </span>
                        </div>
                        <h4 className="text-base font-black text-gray-900">
                          {asg.title}
                        </h4>
                        <p className="text-xs text-gray-600 font-medium">
                          {asg.description}
                        </p>
                      </div>

                      <Button
                        size="sm"
                        onClick={() =>
                          alert(`Submitting "${asg.title}"... Homework uploaded successfully! 🎉`)
                        }
                        className="rounded-xl text-xs font-black bg-amber-500 hover:bg-amber-600 text-gray-950 shrink-0 gap-1.5 shadow-sm"
                      >
                        <FileCheck2 className="w-4 h-4" />
                        <span>Submit Homework</span>
                      </Button>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CBT TESTS & QUIZZES */}
          {activeResourceTab === "tests" && (
            <div className="space-y-4">
              {currentChapter.tests.length === 0 ? (
                <Card className="p-8 text-center rounded-3xl border-2 border-dashed border-gray-200">
                  <p className="text-sm font-bold text-gray-500">
                    No CBT tests scheduled for this chapter right now.
                  </p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {/* Active Quiz Card */}
                  {activeTest ? (
                    <Card className="p-6 rounded-3xl border-2 border-purple-300 bg-white shadow-xl space-y-6">
                      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 bg-purple-100 px-2.5 py-1 rounded-full">
                            Interactive Quiz
                          </span>
                          <h3 className="text-xl font-black text-gray-900 mt-1">
                            {activeTest.title}
                          </h3>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setActiveTest(null)}
                          className="text-xs font-bold text-gray-500"
                        >
                          ✕ Close Quiz
                        </Button>
                      </div>

                      {/* Questions List */}
                      <div className="space-y-6">
                        {activeTest.questions.map((q, idx) => (
                          <div
                            key={q.id}
                            className="p-5 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-3"
                          >
                            <p className="text-sm font-black text-gray-900">
                              Q{idx + 1}. {q.question}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {q.options.map((opt, optIdx) => {
                                const isSelected = quizAnswers[q.id] === optIdx;
                                const isCorrect = q.correctAnswer === optIdx;
                                let btnStyle = "bg-white border-gray-200 text-gray-800 hover:border-purple-300";
                                if (quizSubmitted) {
                                  if (isCorrect) btnStyle = "bg-emerald-500 text-white border-emerald-600 font-bold";
                                  else if (isSelected && !isCorrect)
                                    btnStyle = "bg-rose-500 text-white border-rose-600";
                                } else if (isSelected) {
                                  btnStyle = "bg-purple-600 text-white border-purple-700 font-bold";
                                }

                                return (
                                  <button
                                    key={optIdx}
                                    onClick={() => handleSelectQuizAnswer(q.id, optIdx)}
                                    className={`p-3 rounded-xl border-2 text-xs font-semibold text-left transition-all ${btnStyle}`}
                                  >
                                    <span className="font-mono font-bold mr-2">
                                      {String.fromCharCode(65 + optIdx)}.
                                    </span>
                                    <span>{opt}</span>
                                  </button>
                                );
                              })}
                            </div>

                            {quizSubmitted && (
                              <p className="text-xs text-indigo-700 bg-indigo-50 p-2.5 rounded-xl font-medium mt-2">
                                💡 <span className="font-bold">Explanation:</span> {q.explanation}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Submit / Score Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        {quizSubmitted ? (
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">🎉</span>
                            <div>
                              <p className="text-sm font-black text-gray-900">
                                Your Score: {calculateQuizScore()} / {activeTest.totalMarks} Marks!
                              </p>
                              <p className="text-xs text-emerald-600 font-bold">
                                Awesome job! Points added to your profile XP! ⭐
                              </p>
                            </div>
                          </div>
                        ) : (
                          <p className="text-xs text-gray-500 font-medium">
                            Select an option for each question before submitting.
                          </p>
                        )}

                        {!quizSubmitted ? (
                          <Button
                            onClick={() => setQuizSubmitted(true)}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-black text-xs rounded-xl px-6"
                          >
                            Submit & Check Answers
                          </Button>
                        ) : (
                          <Button
                            onClick={() => {
                              setQuizAnswers({});
                              setQuizSubmitted(false);
                            }}
                            variant="outline"
                            className="rounded-xl text-xs font-bold"
                          >
                            Retake Quiz
                          </Button>
                        )}
                      </div>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {currentChapter.tests.map((test) => (
                        <Card
                          key={test.id}
                          className="p-5 rounded-3xl border-2 border-purple-200 bg-purple-50/20 hover:shadow-lg transition-all flex flex-col justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-purple-600 text-white text-[10px] font-bold">
                                CBT Quiz
                              </Badge>
                              <span className="text-xs text-gray-500 font-bold">
                                {test.duration} • {test.totalMarks} Marks
                              </span>
                            </div>
                            <h4 className="text-base font-black text-gray-900">
                              {test.title}
                            </h4>
                            <p className="text-xs text-gray-600">
                              {test.questions.length || test.questionsCount} Multiple Choice Questions
                            </p>
                          </div>

                          <Button
                            onClick={() => handleStartQuiz(test)}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-black rounded-xl gap-1.5 shadow-sm"
                          >
                            <Trophy className="w-4 h-4 text-amber-300" />
                            <span>Start Interactive Quiz</span>
                          </Button>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Video Player Modal */}
      <CartoonVideoPlayer
        open={videoModalOpen}
        onOpenChange={setVideoModalOpen}
        video={activeVideo}
        courseTitle={currentCourse?.title || "Class Course"}
        subjectName={currentSubject?.name || "Subject"}
        chapterTitle={currentChapter?.title || "Chapter"}
        studentId={studentId}
        onBookmarkChange={refreshAll}
      />
    </div>
  );
}
