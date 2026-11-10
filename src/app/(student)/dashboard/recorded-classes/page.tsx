"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  RotateCcw,
  CheckCircle2,
  Clock,
  BookOpen,
  Download,
  Share2,
  Bookmark,
  ChevronDown,
  ChevronUp,
  FileText,
  MessageSquare,
  Sparkles,
} from "lucide-react";

interface LessonItem {
  id: string;
  title: string;
  duration: string;
  durationMinutes: number;
  completed: boolean;
  active?: boolean;
}

interface ChapterGroup {
  name: string;
  subject: string;
  lessons: LessonItem[];
}

const curriculumData: ChapterGroup[] = [
  {
    name: "Chapter 4: Rotational Dynamics & Moment of Inertia",
    subject: "Physics",
    lessons: [
      {
        id: "l-1",
        title: "Lecture 1: Rigid Body Rotation & Angular Kinematics",
        duration: "45 mins",
        durationMinutes: 45,
        completed: true,
      },
      {
        id: "l-2",
        title: "Lecture 2: Moment of Inertia for Continuous Bodies",
        duration: "50 mins",
        durationMinutes: 50,
        completed: true,
      },
      {
        id: "l-3",
        title: "Lecture 3: Parallel & Perpendicular Axes Theorems",
        duration: "48 mins",
        durationMinutes: 48,
        completed: false,
        active: true,
      },
      {
        id: "l-4",
        title: "Lecture 4: Torque, Angular Momentum & Conservation Laws",
        duration: "55 mins",
        durationMinutes: 55,
        completed: false,
      },
      {
        id: "l-5",
        title: "Lecture 5: Pure Rolling Dynamics & Work-Energy on Incline",
        duration: "52 mins",
        durationMinutes: 52,
        completed: false,
      },
    ],
  },
  {
    name: "Chapter 5: Gravitation & Planetary Orbital Mechanics",
    subject: "Physics",
    lessons: [
      {
        id: "l-6",
        title: "Lecture 1: Newton's Universal Law & Gravitational Potential",
        duration: "42 mins",
        durationMinutes: 42,
        completed: false,
      },
      {
        id: "l-7",
        title: "Lecture 2: Kepler's Laws & Escape Velocity Calculations",
        duration: "46 mins",
        durationMinutes: 46,
        completed: false,
      },
    ],
  },
  {
    name: "Chapter 3: Thermodynamics & Reaction Kinetics",
    subject: "Chemistry",
    lessons: [
      {
        id: "l-8",
        title: "Lecture 1: First Law, Enthalpy & Hess's Law",
        duration: "49 mins",
        durationMinutes: 49,
        completed: true,
      },
      {
        id: "l-9",
        title: "Lecture 2: Second Law, Entropy & Gibbs Free Energy",
        duration: "54 mins",
        durationMinutes: 54,
        completed: false,
      },
    ],
  },
];

export default function RecordedClassesPage() {
  const [selectedLesson, setSelectedLesson] = useState<LessonItem>(
    curriculumData[0].lessons[2]
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<number>(1960); // 32m 40s
  const totalSeconds = selectedLesson.durationMinutes * 60;
  const [isMuted, setIsMuted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(selectedLesson.completed);
  const [activeTab, setActiveTab] = useState<"overview" | "notes" | "dpp">("overview");

  const speeds = [0.75, 1, 1.25, 1.5, 2];

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainderSec = Math.floor(sec % 60);
    return `${mins}:${remainderSec < 10 ? "0" : ""}${remainderSec}`;
  };

  const handleToggleComplete = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Badge className="bg-[#163B65] text-white">IIT-JEE Comprehensive</Badge>
            <Badge variant="outline" className="border-teal-500 text-teal-800 bg-teal-50">Physics</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#163B65] mt-1">
            {selectedLesson.title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleToggleComplete}
            className={`text-xs gap-1.5 h-9 rounded-xl ${
              isCompleted
                ? "bg-emerald-50 text-emerald-700 border-emerald-300 font-bold"
                : "text-gray-700 border-gray-300"
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {isCompleted ? "Marked Completed" : "Mark as Completed"}
          </Button>
        </div>
      </div>

      {/* Main Grid: Video Player + Playlist Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Video Player Column (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <Card className="rounded-3xl border-gray-200 shadow-xl bg-black overflow-hidden relative group">
            {/* Screen Area */}
            <div className="aspect-video w-full bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 relative flex items-center justify-center">
              {/* Educational Chalkboard Canvas Mock */}
              <div className="absolute inset-4 sm:inset-8 border border-white/10 rounded-2xl p-6 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-between select-none">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-mono text-teal-400">
                    DeepSiddhi Foundation • Secure Playback DRM
                  </span>
                  <span className="text-xs font-mono text-white/50">
                    STUDENT ID: STD-001 (WATERMARKED)
                  </span>
                </div>

                <div className="text-center space-y-2 py-6">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-wider font-mono">
                    I = I_cm + Md²
                  </span>
                  <p className="text-xs text-white/70 max-w-md mx-auto">
                    Parallel Axis Theorem: Calculating moment of inertia about an arbitrary parallel axis at perpendicular distance d from center of mass.
                  </p>
                </div>

                <div className="flex justify-between text-[11px] text-white/40 font-mono">
                  <span>Faculty: Dr. Rahul Sharma</span>
                  <span>Stream Quality: 1080p 60fps</span>
                </div>
              </div>

              {/* Big Center Play/Pause button */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-[#16A6A1]/90 hover:bg-[#16A6A1] text-white flex items-center justify-center shadow-2xl z-10 transition-transform transform group-hover:scale-110"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 fill-white" />
                ) : (
                  <Play className="w-8 h-8 fill-white ml-1" />
                )}
              </button>
            </div>

            {/* Video Controls Bar */}
            <div className="bg-slate-950 p-4 text-white space-y-2 border-t border-white/10">
              {/* Progress Slider */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-white/80 w-12 text-right">
                  {formatSeconds(currentTime)}
                </span>
                <input
                  type="range"
                  min={0}
                  max={totalSeconds}
                  value={currentTime}
                  onChange={(e) => setCurrentTime(Number(e.target.value))}
                  className="flex-1 h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#16A6A1]"
                />
                <span className="text-xs font-mono text-white/80 w-12">
                  {formatSeconds(totalSeconds)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-white"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>

                  <button
                    onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-white flex items-center gap-1 text-xs"
                    title="Rewind 10s"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>10s</span>
                  </button>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-white"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  {/* Speed Selector */}
                  <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg">
                    <span className="text-white/60">Speed:</span>
                    {speeds.map((s) => (
                      <button
                        key={s}
                        onClick={() => setPlaybackSpeed(s)}
                        className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                          playbackSpeed === s
                            ? "bg-[#16A6A1] text-white"
                            : "text-white/70 hover:text-white"
                        }`}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>

                  <button className="p-1.5 rounded-lg hover:bg-white/10 text-white">
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Tabbed Info: Overview, Lecture Notes, DPP */}
          <Card className="rounded-3xl border-gray-100 shadow-sm bg-white p-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="bg-gray-100 p-1 rounded-xl">
                <TabsTrigger value="overview" className="text-xs font-semibold rounded-lg">
                  Lesson Overview
                </TabsTrigger>
                <TabsTrigger value="notes" className="text-xs font-semibold rounded-lg">
                  Handwritten Notes (PDF)
                </TabsTrigger>
                <TabsTrigger value="dpp" className="text-xs font-semibold rounded-lg">
                  Practice DPP Sheet (15 Qs)
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="pt-4 text-xs space-y-3 text-gray-700">
                <h4 className="text-sm font-bold text-[#163B65]">Topics Covered in this Session:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Physical derivation of Parallel Axis Theorem using calculus summation</li>
                  <li>Limitation & scope of Perpendicular Axis Theorem for planar laminar plates</li>
                  <li>Calculating moment of inertia of semicircular discs, hollow cones, and composite rings</li>
                  <li>Past 10-year JEE Advanced tricky problem patterns and shortcut integration techniques</li>
                </ul>
              </TabsContent>

              <TabsContent value="notes" className="pt-4">
                <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-teal-700" />
                    <div>
                      <h5 className="font-bold text-xs text-teal-900">
                        Lecture_03_Parallel_Axis_Dr_Rahul_Sharma.pdf
                      </h5>
                      <span className="text-[10px] text-teal-700">4.2 MB • High Resolution Notes</span>
                    </div>
                  </div>
                  <Button size="sm" className="bg-[#163B65] text-white text-xs gap-1.5 rounded-xl">
                    <Download className="w-3.5 h-3.5" />
                    Download PDF
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="dpp" className="pt-4">
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-blue-700" />
                    <div>
                      <h5 className="font-bold text-xs text-blue-900">
                        DPP_Sheet_Rotational_Dynamics_03.pdf
                      </h5>
                      <span className="text-[10px] text-blue-700">15 MCQ + Numerical Questions with Key</span>
                    </div>
                  </div>
                  <Button size="sm" className="bg-[#16A6A1] text-white text-xs gap-1.5 rounded-xl">
                    <Download className="w-3.5 h-3.5" />
                    Download DPP
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Playlist & Chapter Accordion Sidebar (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="rounded-3xl border-gray-100 shadow-md bg-white p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-bold text-sm text-[#163B65]">Course Curriculum</h3>
                <span className="text-[11px] text-gray-500">240 Lessons Total</span>
              </div>
              <Badge variant="outline" className="text-teal-700 border-teal-300 text-[10px]">
                72% Completed
              </Badge>
            </div>

            {/* Chapters list */}
            <div className="space-y-4 max-h-[640px] overflow-y-auto pr-1">
              {curriculumData.map((chap, cIdx) => (
                <div key={cIdx} className="space-y-2">
                  <span className="text-xs font-bold text-gray-700 block px-1">
                    {chap.name}
                  </span>

                  <div className="space-y-1.5">
                    {chap.lessons.map((lesson) => {
                      const isCurrent = selectedLesson.id === lesson.id;
                      return (
                        <div
                          key={lesson.id}
                          onClick={() => {
                            setSelectedLesson(lesson);
                            setIsCompleted(lesson.completed);
                            setCurrentTime(0);
                          }}
                          className={`p-3 rounded-xl cursor-pointer text-xs transition-all flex items-start gap-2.5 ${
                            isCurrent
                              ? "bg-[#163B65] text-white shadow-md font-semibold"
                              : "bg-gray-50 hover:bg-gray-100 text-gray-800"
                          }`}
                        >
                          {lesson.completed ? (
                            <CheckCircle2
                              className={`w-4 h-4 shrink-0 mt-0.5 ${
                                isCurrent ? "text-emerald-300" : "text-emerald-600"
                              }`}
                            />
                          ) : (
                            <Play
                              className={`w-4 h-4 shrink-0 mt-0.5 ${
                                isCurrent ? "fill-white text-white" : "text-gray-400"
                              }`}
                            />
                          )}

                          <div className="flex-1">
                            <p className="line-clamp-2 leading-snug">{lesson.title}</p>
                            <span
                              className={`text-[10px] mt-1 block ${
                                isCurrent ? "text-white/70" : "text-gray-400"
                              }`}
                            >
                              {lesson.duration}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
