"use client";

import { useState } from "react";
import Link from "next/link";
import { useLMSData, LMSCourse, LMSMaterial, LMSLiveClass, LMSTest, LMSAnnouncement, LMSStudent, LMSBatch } from "@/lib/lms-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Users,
  UserPlus,
  BookOpen,
  GraduationCap,
  Radio,
  Video,
  CreditCard,
  TrendingUp,
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Plus,
  UploadCloud,
  FileCheck2,
  FileText,
  CalendarDays,
  ShieldCheck,
  ExternalLink,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  RotateCcw,
  Search,
  Bell,
  Check,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const revenueData = [
  { month: "Jun", revenue: 18.5, students: 48 },
  { month: "Jul", revenue: 24.2, students: 72 },
  { month: "Aug", revenue: 32.0, students: 95 },
  { month: "Sep", revenue: 38.4, students: 110 },
  { month: "Oct", revenue: 44.8, students: 135 },
  { month: "Nov", revenue: 52.6, students: 160 },
];

export default function AdminOverviewPage() {
  const {
    courses,
    materials,
    liveClasses,
    tests,
    announcements,
    students,
    batches,
    store,
  } = useLMSData();

  // Active Main Tab
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals
  const [materialModal, setMaterialModal] = useState(false);
  const [courseModal, setCourseModal] = useState(false);
  const [liveModal, setLiveModal] = useState(false);
  const [testModal, setTestModal] = useState(false);
  const [announcementModal, setAnnouncementModal] = useState(false);

  // Form States: Material
  const [matTitle, setMatTitle] = useState("");
  const [matSubject, setMatSubject] = useState<"Physics" | "Chemistry" | "Mathematics" | "General">("Physics");
  const [matChapter, setMatChapter] = useState("");
  const [matType, setMatType] = useState<"PDF" | "Notes" | "Formula Sheet" | "DPP">("PDF");
  const [matSize, setMatSize] = useState("3.4 MB");

  // Form States: Course
  const [crsTitle, setCrsTitle] = useState("");
  const [crsCategory, setCrsCategory] = useState<"IIT-JEE" | "Olympiad" | "NTSE" | "Foundation">("IIT-JEE");
  const [crsClass, setCrsClass] = useState("Class 11 – 12");
  const [crsFaculty, setCrsFaculty] = useState("Dr. Rahul Sharma");
  const [crsPrice, setCrsPrice] = useState("34999");
  const [crsLessons, setCrsLessons] = useState("120");

  // Form States: Live Class
  const [liveTitle, setLiveTitle] = useState("");
  const [liveBatch, setLiveBatch] = useState("Pratham Batch (Morning)");
  const [liveFaculty, setLiveFaculty] = useState("Dr. Rahul Sharma");
  const [liveTime, setLiveTime] = useState("Today, 5:00 PM – 6:30 PM IST");
  const [liveUrl, setLiveUrl] = useState("https://zoom.us/j/9876543210?pwd=deepsiddhi");
  const [livePasscode, setLivePasscode] = useState("DEEPSIDDHI-2026");

  // Form States: Test
  const [testTitle, setTestTitle] = useState("");
  const [testCategory, setTestCategory] = useState<"Sectional" | "Topic" | "Mock" | "Grand">("Mock");
  const [testQuestions, setTestQuestions] = useState("50");
  const [testDuration, setTestDuration] = useState("90 Mins");
  const [testMarks, setTestMarks] = useState("200");

  // Form States: Announcement
  const [annTitle, setAnnTitle] = useState("");
  const [annCat, setAnnCat] = useState<"Academic Update" | "Study Material" | "Test Alert" | "General">("Academic Update");
  const [annMsg, setAnnMsg] = useState("");

  // Handlers
  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matTitle) return;
    store.addMaterial({
      id: `mat-${Date.now()}`,
      title: matTitle,
      subject: matSubject,
      chapter: matChapter || "Core Concepts",
      fileSize: matSize || "4.2 MB",
      fileType: matType,
      downloadsCount: 0,
      dateUploaded: "Just now",
    });
    setMatTitle("");
    setMatChapter("");
    setMaterialModal(false);
  };

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!crsTitle) return;
    store.addCourse({
      id: `crs-${Date.now()}`,
      title: crsTitle,
      category: crsCategory,
      targetClass: crsClass,
      faculty: crsFaculty,
      price: Number(crsPrice) * 1.3 || 45000,
      discountedPrice: Number(crsPrice) || 34999,
      totalLessons: Number(crsLessons) || 120,
      duration: "12 Months",
      isPublished: true,
      enrolledCount: 0,
      description: "Comprehensive structured curriculum with live classes and complete books.",
    });
    setCrsTitle("");
    setCourseModal(false);
  };

  const handleAddLiveClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!liveTitle) return;
    store.addLiveClass({
      id: `lc-${Date.now()}`,
      title: liveTitle,
      course: "IIT-JEE Comprehensive Mastery",
      batch: liveBatch,
      faculty: liveFaculty,
      scheduledAt: liveTime,
      duration: "90 Minutes",
      status: "live",
      meetingProvider: "zoom",
      meetingUrl: liveUrl,
      passcode: livePasscode,
      description: "Interactive problem-solving lecture.",
      enrolledStudentsCount: 45,
    });
    setLiveTitle("");
    setLiveModal(false);
  };

  const handleAddTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testTitle) return;
    store.addTest({
      id: `test-${Date.now()}`,
      title: testTitle,
      category: testCategory,
      questionsCount: Number(testQuestions) || 50,
      duration: testDuration,
      totalMarks: Number(testMarks) || 200,
      status: "Available",
      questions: [],
    });
    setTestTitle("");
    setTestModal(false);
  };

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle || !annMsg) return;
    store.addAnnouncement({
      id: `ann-${Date.now()}`,
      title: annTitle,
      category: annCat,
      message: annMsg,
      date: "Just now",
      priority: "high",
    });
    setAnnTitle("");
    setAnnMsg("");
    setAnnouncementModal(false);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Header with Quick Switch to Student View */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200/90 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black flex items-center gap-1.5 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-amber-800" />
              Master Control Center
            </span>
            <span className="text-xs text-gray-500 font-semibold">• DeepSiddhi Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Centralized LMS Management Portal
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Manage every course, material, live session, mock test, and student announcement from one unified screen.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="outline"
            onClick={() => store.resetAll()}
            className="text-xs font-bold text-gray-700 hover:text-red-700 border-gray-200 h-10 px-3.5 rounded-xl gap-1.5 shadow-2xs"
            title="Restore default sample materials and courses"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </Button>

          <Link href="/dashboard">
            <Button className="bg-[#004B87] hover:bg-[#003866] text-white text-xs font-black rounded-xl h-10 px-4 gap-1.5 shadow-sm">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Preview Student Portal</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="bg-white p-2 rounded-2xl border border-gray-200/90 shadow-2xs overflow-x-auto scrollbar-none">
          <TabsList className="bg-gray-100/80 p-1 rounded-xl flex items-center min-w-max gap-1">
            <TabsTrigger value="overview" className="text-xs font-black px-4 py-2 rounded-lg">
              📊 Overview & KPIs
            </TabsTrigger>
            <TabsTrigger value="materials" className="text-xs font-black px-4 py-2 rounded-lg gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#004B87]" />
              Study Materials ({materials.length})
            </TabsTrigger>
            <TabsTrigger value="courses" className="text-xs font-black px-4 py-2 rounded-lg gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
              Courses ({courses.length})
            </TabsTrigger>
            <TabsTrigger value="live" className="text-xs font-black px-4 py-2 rounded-lg gap-1.5">
              <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              Live Classes ({liveClasses.length})
            </TabsTrigger>
            <TabsTrigger value="tests" className="text-xs font-black px-4 py-2 rounded-lg gap-1.5">
              <FileCheck2 className="w-3.5 h-3.5 text-purple-600" />
              Tests & Exams ({tests.length})
            </TabsTrigger>
            <TabsTrigger value="announcements" className="text-xs font-black px-4 py-2 rounded-lg gap-1.5">
              <Bell className="w-3.5 h-3.5 text-amber-500" />
              Announcements ({announcements.length})
            </TabsTrigger>
            <TabsTrigger value="students" className="text-xs font-black px-4 py-2 rounded-lg gap-1.5">
              <Users className="w-3.5 h-3.5 text-blue-600" />
              Students ({students.length})
            </TabsTrigger>
          </TabsList>
        </div>

        {/* =========================================================================
            TAB 1: OVERVIEW & KEY PERFORMANCE METRICS
           ========================================================================= */}
        <TabsContent value="overview" className="space-y-6">
          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-1">
              <div className="flex justify-between items-start">
                <span className="text-xs text-gray-500 font-bold">Total Courses</span>
                <BookOpen className="w-4 h-4 text-[#004B87]" />
              </div>
              <span className="text-2xl font-black text-[#004B87]">{courses.length} Active</span>
              <span className="text-[11px] text-emerald-600 font-bold block">100% Published</span>
            </Card>

            <Card className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-1">
              <div className="flex justify-between items-start">
                <span className="text-xs text-gray-500 font-bold">Study Materials</span>
                <FileText className="w-4 h-4 text-teal-600" />
              </div>
              <span className="text-2xl font-black text-teal-700">{materials.length} Files</span>
              <span className="text-[11px] text-gray-400 block">PDFs, DPPs & Notes</span>
            </Card>

            <Card className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-1">
              <div className="flex justify-between items-start">
                <span className="text-xs text-gray-500 font-bold">Live Classes</span>
                <Radio className="w-4 h-4 text-red-500 animate-pulse" />
              </div>
              <span className="text-2xl font-black text-red-600">{liveClasses.length} Scheduled</span>
              <span className="text-[11px] text-red-500 font-bold block">
                {liveClasses.filter((l) => l.status === "live").length} Live Right Now
              </span>
            </Card>

            <Card className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-1">
              <div className="flex justify-between items-start">
                <span className="text-xs text-gray-500 font-bold">Total Students</span>
                <Users className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-2xl font-black text-purple-900">842 Students</span>
              <span className="text-[11px] text-purple-600 font-bold block">Pratham 2026 Batch</span>
            </Card>
          </div>

          {/* Quick Management Launchpad Tiles */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/90 shadow-xs space-y-3">
            <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>One-Click Content Creation</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <Button
                onClick={() => setMaterialModal(true)}
                className="h-12 bg-[#004B87] hover:bg-[#003866] text-white text-xs font-black rounded-xl shadow-xs gap-1.5"
              >
                <UploadCloud className="w-4 h-4" />
                Upload Material
              </Button>
              <Button
                onClick={() => setCourseModal(true)}
                className="h-12 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-xs gap-1.5"
              >
                <Plus className="w-4 h-4" />
                Create Course
              </Button>
              <Button
                onClick={() => setLiveModal(true)}
                className="h-12 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-xl shadow-xs gap-1.5"
              >
                <Radio className="w-4 h-4" />
                Schedule Live
              </Button>
              <Button
                onClick={() => setTestModal(true)}
                className="h-12 bg-purple-600 hover:bg-purple-700 text-white text-xs font-black rounded-xl shadow-xs gap-1.5"
              >
                <FileCheck2 className="w-4 h-4" />
                Add Mock Test
              </Button>
              <Button
                onClick={() => setAnnouncementModal(true)}
                className="h-12 bg-amber-500 hover:bg-amber-600 text-gray-950 font-black text-xs rounded-xl shadow-xs gap-1.5"
              >
                <Bell className="w-4 h-4" />
                Post Alert
              </Button>
            </div>
          </div>

          {/* Revenue Chart */}
          <Card className="rounded-2xl border-gray-200/90 shadow-2xs bg-white p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-black text-gray-900">Student Intake & Revenue Growth</h3>
                <p className="text-xs text-gray-400">Monthly gross fee run-rate (in Lakhs INR)</p>
              </div>
              <Badge className="bg-[#EAF4FF] text-[#004B87] font-bold text-xs">FY 2026-27</Badge>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16A6A1" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#16A6A1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#888888" fontSize={11} tickLine={false} />
                  <YAxis stroke="#888888" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#004B87",
                      borderRadius: "12px",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#004B87"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorRev)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        {/* =========================================================================
            TAB 2: STUDY MATERIALS MANAGEMENT (Upload, View, Delete)
           ========================================================================= */}
        <TabsContent value="materials" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs">
            <div>
              <h2 className="text-lg font-black text-gray-900">Study Materials Repository</h2>
              <p className="text-xs text-gray-500">
                Uploaded files immediately appear in the Student Portal under Materials & DPPs.
              </p>
            </div>

            <Button
              onClick={() => setMaterialModal(true)}
              className="bg-[#004B87] hover:bg-[#003866] text-white text-xs font-black rounded-xl h-10 px-4 gap-1.5 shadow-sm"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Upload New Material</span>
            </Button>
          </div>

          <div className="space-y-3">
            {materials.map((mat) => (
              <Card key={mat.id} className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-[#EAF4FF] text-[#004B87] text-[10px] font-bold">
                        {mat.subject} • {mat.chapter}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] text-gray-500 font-medium">
                        {mat.fileType} • {mat.fileSize}
                      </Badge>
                      <span className="text-[10px] text-gray-400">Uploaded: {mat.dateUploaded}</span>
                    </div>

                    <h3 className="text-base font-black text-gray-900">{mat.title}</h3>

                    <p className="text-xs text-emerald-700 font-semibold">
                      {mat.downloadsCount.toLocaleString()} total student downloads logged
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => store.deleteMaterial(mat.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 text-xs font-bold rounded-xl h-9 px-3 gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* =========================================================================
            TAB 3: COURSES & CURRICULUM MANAGEMENT
           ========================================================================= */}
        <TabsContent value="courses" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs">
            <div>
              <h2 className="text-lg font-black text-gray-900">Course Offerings & Pricing</h2>
              <p className="text-xs text-gray-500">
                Created courses immediately reflect on the public website and student course list.
              </p>
            </div>

            <Button
              onClick={() => setCourseModal(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl h-10 px-4 gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Course</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course) => (
              <Card key={course.id} className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-4">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <Badge className="bg-[#EAF4FF] text-[#004B87] font-black text-[10px] mb-1">
                      {course.category} • {course.targetClass}
                    </Badge>
                    <h3 className="text-base font-black text-gray-900 leading-snug">{course.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Faculty: {course.faculty}</p>
                  </div>

                  <Badge
                    className={
                      course.isPublished
                        ? "bg-emerald-100 text-emerald-800 font-bold text-[10px]"
                        : "bg-gray-100 text-gray-600 font-bold text-[10px]"
                    }
                  >
                    {course.isPublished ? "Published" : "Draft"}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-2 p-3 bg-gray-50 rounded-xl text-center text-xs">
                  <div>
                    <span className="text-[10px] text-gray-400 block">Fee</span>
                    <span className="font-black text-gray-900">₹{course.discountedPrice.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block">Lessons</span>
                    <span className="font-black text-gray-900">{course.totalLessons}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block">Enrolled</span>
                    <span className="font-black text-emerald-600">{course.enrolledCount} Students</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <button
                    onClick={() => store.togglePublishCourse(course.id)}
                    className="text-xs font-bold text-[#004B87] hover:underline flex items-center gap-1"
                  >
                    {course.isPublished ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{course.isPublished ? "Unpublish" : "Publish"}</span>
                  </button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => store.deleteCourse(course.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs font-bold h-8 px-2.5 gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* =========================================================================
            TAB 4: LIVE CLASSROOM SESSIONS
           ========================================================================= */}
        <TabsContent value="live" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs">
            <div>
              <h2 className="text-lg font-black text-gray-900">Live Virtual Classrooms</h2>
              <p className="text-xs text-gray-500">
                Scheduled live sessions trigger the red pulse indicator on the student dashboard.
              </p>
            </div>

            <Button
              onClick={() => setLiveModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-xl h-10 px-4 gap-1.5 shadow-sm"
            >
              <Radio className="w-4 h-4" />
              <span>Schedule Live Session</span>
            </Button>
          </div>

          <div className="space-y-3">
            {liveClasses.map((cls) => (
              <Card key={cls.id} className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-black uppercase px-2.5 py-0.5 rounded-full ${
                          cls.status === "live"
                            ? "bg-red-100 text-red-700 animate-pulse"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {cls.status === "live" && <span className="w-2 h-2 rounded-full bg-red-600" />}
                        {cls.status.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500 font-semibold">{cls.batch}</span>
                      <span className="text-xs text-gray-400">• {cls.scheduledAt}</span>
                    </div>

                    <h3 className="text-base font-black text-gray-900">{cls.title}</h3>
                    <p className="text-xs text-gray-600">
                      Instructor: <strong>{cls.faculty}</strong> • Zoom Meeting Passcode:{" "}
                      <code className="bg-gray-100 px-1 py-0.5 rounded font-mono font-bold text-gray-900">
                        {cls.passcode}
                      </code>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => store.toggleLiveStatus(cls.id)}
                      className={`text-xs font-bold rounded-xl h-9 px-3 ${
                        cls.status === "live"
                          ? "bg-gray-200 hover:bg-gray-300 text-gray-800"
                          : "bg-red-600 hover:bg-red-700 text-white"
                      }`}
                    >
                      {cls.status === "live" ? "End Live" : "Go Live Now"}
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => store.deleteLiveClass(cls.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 text-xs font-bold rounded-xl h-9 px-2.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* =========================================================================
            TAB 5: TESTS & EXAMINATIONS
           ========================================================================= */}
        <TabsContent value="tests" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs">
            <div>
              <h2 className="text-lg font-black text-gray-900">Examinations & Mock Tests</h2>
              <p className="text-xs text-gray-500">
                Created tests are instantly available on the Oliveboard-style student test portal.
              </p>
            </div>

            <Button
              onClick={() => setTestModal(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-black rounded-xl h-10 px-4 gap-1.5 shadow-sm"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Create New Test</span>
            </Button>
          </div>

          <div className="space-y-3">
            {tests.map((t) => (
              <Card key={t.id} className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <Badge className="bg-purple-100 text-purple-900 text-[10px] font-bold">
                    {t.category} Assessment
                  </Badge>
                  <h3 className="text-base font-black text-gray-900">{t.title}</h3>
                  <p className="text-xs text-gray-500">
                    {t.questionsCount} Questions • {t.duration} • Total Marks: {t.totalMarks}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link href="/dashboard/tests">
                    <Button variant="outline" size="sm" className="text-xs font-bold rounded-xl h-9 text-[#004B87]">
                      Preview Test
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => store.deleteTest(t.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs font-bold rounded-xl h-9 px-2.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* =========================================================================
            TAB 6: ANNOUNCEMENTS BROADCAST
           ========================================================================= */}
        <TabsContent value="announcements" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs">
            <div>
              <h2 className="text-lg font-black text-gray-900">Student Broadcasts & Notices</h2>
              <p className="text-xs text-gray-500">
                Announcements immediately display on the student dashboard notices widget.
              </p>
            </div>

            <Button
              onClick={() => setAnnouncementModal(true)}
              className="bg-amber-500 hover:bg-amber-600 text-gray-950 text-xs font-black rounded-xl h-10 px-4 gap-1.5 shadow-sm"
            >
              <Bell className="w-4 h-4" />
              <span>Post Announcement</span>
            </Button>
          </div>

          <div className="space-y-3">
            {announcements.map((ann) => (
              <Card key={ann.id} className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs flex items-start justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-amber-100 text-amber-900 text-[10px] font-bold">
                      {ann.category}
                    </Badge>
                    <span className="text-[10px] text-gray-400">• {ann.date}</span>
                  </div>
                  <h3 className="text-base font-black text-gray-900">{ann.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{ann.message}</p>
                </div>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => store.deleteAnnouncement(ann.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs font-bold rounded-xl h-9 px-2.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* =========================================================================
            TAB 7: STUDENTS & BATCHES
           ========================================================================= */}
        <TabsContent value="students" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs">
            <div>
              <h2 className="text-lg font-black text-gray-900">Student Enrollments & Batches</h2>
              <p className="text-xs text-gray-500">Active students and their batch schedules.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {batches.map((batch) => (
              <Card key={batch.id} className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-2">
                <Badge className="bg-blue-100 text-[#004B87] font-bold text-[10px]">{batch.days}</Badge>
                <h3 className="font-black text-base text-gray-900">{batch.name}</h3>
                <p className="text-xs text-gray-500">Timing: {batch.timing}</p>
                <div className="pt-2 border-t border-gray-100 flex justify-between text-xs font-bold">
                  <span className="text-gray-500">Instructor: {batch.faculty}</span>
                  <span className="text-emerald-600">{batch.studentsCount} Students</span>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* =========================================================================
          MODALS FOR UPLOADING & CREATING CONTENT
         ========================================================================= */}

      {/* 1. Upload Material Modal */}
      <Dialog open={materialModal} onOpenChange={setMaterialModal}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-gray-900 flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-[#004B87]" />
              Upload Study Material (PDF / DPP / Notes)
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleAddMaterial} className="space-y-4 pt-2">
            <div>
              <Label className="text-xs font-bold text-gray-700">Material Title *</Label>
              <Input
                required
                placeholder="e.g. Rotational Dynamics Comprehensive Notes"
                value={matTitle}
                onChange={(e) => setMatTitle(e.target.value)}
                className="mt-1 text-xs rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-bold text-gray-700">Subject</Label>
                <select
                  value={matSubject}
                  onChange={(e) => setMatSubject(e.target.value as any)}
                  className="w-full mt-1 h-9 px-3 text-xs bg-white border border-gray-200 rounded-xl"
                >
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <Label className="text-xs font-bold text-gray-700">Document Type</Label>
                <select
                  value={matType}
                  onChange={(e) => setMatType(e.target.value as any)}
                  className="w-full mt-1 h-9 px-3 text-xs bg-white border border-gray-200 rounded-xl"
                >
                  <option value="PDF">PDF eBook</option>
                  <option value="Notes">Handwritten Notes</option>
                  <option value="Formula Sheet">Formula Sheet</option>
                  <option value="DPP">Daily Practice Problem (DPP)</option>
                </select>
              </div>
            </div>

            <div>
              <Label className="text-xs font-bold text-gray-700">Chapter / Topic</Label>
              <Input
                placeholder="e.g. Chapter 4: Rotational Mechanics"
                value={matChapter}
                onChange={(e) => setMatChapter(e.target.value)}
                className="mt-1 text-xs rounded-xl"
              />
            </div>

            <div>
              <Label className="text-xs font-bold text-gray-700">File Size Simulation</Label>
              <Input
                placeholder="e.g. 4.8 MB"
                value={matSize}
                onChange={(e) => setMatSize(e.target.value)}
                className="mt-1 text-xs rounded-xl"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setMaterialModal(false)} className="text-xs rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="bg-[#004B87] hover:bg-[#003866] text-white text-xs font-black rounded-xl">
                Upload & Publish
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* 2. Create Course Modal */}
      <Dialog open={courseModal} onOpenChange={setCourseModal}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-gray-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              Create & Publish New Academic Course
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleAddCourse} className="space-y-4 pt-2">
            <div>
              <Label className="text-xs font-bold text-gray-700">Course Name *</Label>
              <Input
                required
                placeholder="e.g. IIT-JEE Sprint 2027 Mastery"
                value={crsTitle}
                onChange={(e) => setCrsTitle(e.target.value)}
                className="mt-1 text-xs rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-bold text-gray-700">Category</Label>
                <select
                  value={crsCategory}
                  onChange={(e) => setCrsCategory(e.target.value as any)}
                  className="w-full mt-1 h-9 px-3 text-xs bg-white border border-gray-200 rounded-xl"
                >
                  <option value="IIT-JEE">IIT-JEE</option>
                  <option value="Olympiad">Olympiad</option>
                  <option value="NTSE">NTSE</option>
                  <option value="Foundation">Foundation</option>
                </select>
              </div>

              <div>
                <Label className="text-xs font-bold text-gray-700">Target Class</Label>
                <Input
                  value={crsClass}
                  onChange={(e) => setCrsClass(e.target.value)}
                  placeholder="Class 11 – 12"
                  className="mt-1 text-xs rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-bold text-gray-700">Lead Faculty</Label>
                <Input
                  value={crsFaculty}
                  onChange={(e) => setCrsFaculty(e.target.value)}
                  placeholder="Dr. Rahul Sharma"
                  className="mt-1 text-xs rounded-xl"
                />
              </div>

              <div>
                <Label className="text-xs font-bold text-gray-700">Course Fee (₹)</Label>
                <Input
                  value={crsPrice}
                  onChange={(e) => setCrsPrice(e.target.value)}
                  placeholder="34999"
                  className="mt-1 text-xs rounded-xl"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setCourseModal(false)} className="text-xs rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl">
                Publish Course
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* 3. Schedule Live Class Modal */}
      <Dialog open={liveModal} onOpenChange={setLiveModal}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-gray-900 flex items-center gap-2">
              <Radio className="w-5 h-5 text-red-600" />
              Schedule Live Virtual Classroom
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleAddLiveClass} className="space-y-4 pt-2">
            <div>
              <Label className="text-xs font-bold text-gray-700">Session Topic *</Label>
              <Input
                required
                placeholder="e.g. Magnetism & Ampere's Law Practice"
                value={liveTitle}
                onChange={(e) => setLiveTitle(e.target.value)}
                className="mt-1 text-xs rounded-xl"
              />
            </div>

            <div>
              <Label className="text-xs font-bold text-gray-700">Batch</Label>
              <Input
                value={liveBatch}
                onChange={(e) => setLiveBatch(e.target.value)}
                className="mt-1 text-xs rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-bold text-gray-700">Faculty</Label>
                <Input
                  value={liveFaculty}
                  onChange={(e) => setLiveFaculty(e.target.value)}
                  className="mt-1 text-xs rounded-xl"
                />
              </div>

              <div>
                <Label className="text-xs font-bold text-gray-700">Timing</Label>
                <Input
                  value={liveTime}
                  onChange={(e) => setLiveTime(e.target.value)}
                  className="mt-1 text-xs rounded-xl"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-bold text-gray-700">Meeting Link (Zoom / Meet)</Label>
              <Input
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                className="mt-1 text-xs rounded-xl"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setLiveModal(false)} className="text-xs rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-xl">
                Broadcast Live Session
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* 4. Create Test Modal */}
      <Dialog open={testModal} onOpenChange={setTestModal}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-gray-900 flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-purple-600" />
              Build New CBT Examination
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleAddTest} className="space-y-4 pt-2">
            <div>
              <Label className="text-xs font-bold text-gray-700">Test Title *</Label>
              <Input
                required
                placeholder="e.g. All India JEE Speed Assessment #09"
                value={testTitle}
                onChange={(e) => setTestTitle(e.target.value)}
                className="mt-1 text-xs rounded-xl"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label className="text-xs font-bold text-gray-700">Category</Label>
                <select
                  value={testCategory}
                  onChange={(e) => setTestCategory(e.target.value as any)}
                  className="w-full mt-1 h-9 px-2 text-xs bg-white border border-gray-200 rounded-xl"
                >
                  <option value="Mock">Mock Test</option>
                  <option value="Sectional">Sectional</option>
                  <option value="Topic">Topic Test</option>
                  <option value="Grand">Grand Test</option>
                </select>
              </div>

              <div>
                <Label className="text-xs font-bold text-gray-700">Questions</Label>
                <Input
                  value={testQuestions}
                  onChange={(e) => setTestQuestions(e.target.value)}
                  className="mt-1 text-xs rounded-xl"
                />
              </div>

              <div>
                <Label className="text-xs font-bold text-gray-700">Marks</Label>
                <Input
                  value={testMarks}
                  onChange={(e) => setTestMarks(e.target.value)}
                  className="mt-1 text-xs rounded-xl"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setTestModal(false)} className="text-xs rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-black rounded-xl">
                Publish Examination
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* 5. Post Announcement Modal */}
      <Dialog open={announcementModal} onOpenChange={setAnnouncementModal}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-gray-900 flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-500" />
              Post Student Notice / Announcement
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleAddAnnouncement} className="space-y-4 pt-2">
            <div>
              <Label className="text-xs font-bold text-gray-700">Notice Heading *</Label>
              <Input
                required
                placeholder="e.g. Schedule Update for Sunday Mock Test"
                value={annTitle}
                onChange={(e) => setAnnTitle(e.target.value)}
                className="mt-1 text-xs rounded-xl"
              />
            </div>

            <div>
              <Label className="text-xs font-bold text-gray-700">Category</Label>
              <select
                value={annCat}
                onChange={(e) => setAnnCat(e.target.value as any)}
                className="w-full mt-1 h-9 px-3 text-xs bg-white border border-gray-200 rounded-xl"
              >
                <option value="Academic Update">Academic Update</option>
                <option value="Study Material">Study Material</option>
                <option value="Test Alert">Test Alert</option>
                <option value="General">General</option>
              </select>
            </div>

            <div>
              <Label className="text-xs font-bold text-gray-700">Notice Message *</Label>
              <textarea
                required
                rows={3}
                placeholder="Type your message to students..."
                value={annMsg}
                onChange={(e) => setAnnMsg(e.target.value)}
                className="w-full mt-1 p-2.5 text-xs bg-white border border-gray-200 rounded-xl"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setAnnouncementModal(false)} className="text-xs rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-gray-950 text-xs font-black rounded-xl">
                Broadcast Notice
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
