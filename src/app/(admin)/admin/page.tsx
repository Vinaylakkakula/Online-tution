"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useLMSData, LMSCourse } from "@/lib/lms-store";
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
  Eye,
  EyeOff,
  RotateCcw,
  Bell,
  Check,
  FileCheck,
  X,
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

  // Success Feedback Message banner
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  // Modals
  const [materialModal, setMaterialModal] = useState(false);
  const [courseModal, setCourseModal] = useState(false);
  const [liveModal, setLiveModal] = useState(false);
  const [testModal, setTestModal] = useState(false);
  const [announcementModal, setAnnouncementModal] = useState(false);

  // Form States: Material
  const [matTitle, setMatTitle] = useState("");
  const [matCourse, setMatCourse] = useState("");
  const [matSubject, setMatSubject] = useState<"Physics" | "Chemistry" | "Mathematics" | "General">("Physics");
  const [matChapter, setMatChapter] = useState("");
  const [matType, setMatType] = useState<"PDF" | "Notes" | "Formula Sheet" | "DPP">("PDF");
  const [matSize, setMatSize] = useState("3.4 MB");
  const [matFileName, setMatFileName] = useState("");
  const [matFileDataUrl, setMatFileDataUrl] = useState("");
  const [matDragging, setMatDragging] = useState(false);
  const matFileInputRef = useRef<HTMLInputElement>(null);

  const handleProcessAdminMaterialFile = (file: File) => {
    setMatFileName(file.name);
    const sizeInMB = file.size / (1024 * 1024);
    if (sizeInMB < 1) {
      setMatSize(`${Math.max(1, Math.round(file.size / 1024))} KB`);
    } else {
      setMatSize(`${sizeInMB.toFixed(1)} MB`);
    }

    if (!matTitle.trim()) {
      const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      setMatTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
    }

    const lowerName = file.name.toLowerCase();
    if (lowerName.endsWith(".pdf")) {
      setMatType("PDF");
    } else if (lowerName.includes("formula")) {
      setMatType("Formula Sheet");
    } else if (lowerName.includes("dpp") || lowerName.includes("practice")) {
      setMatType("DPP");
    } else {
      setMatType("Notes");
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setMatFileDataUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleClearMatFile = () => {
    setMatFileName("");
    setMatFileDataUrl("");
    if (matFileInputRef.current) matFileInputRef.current.value = "";
  };

  // Form States: Course
  const [crsTitle, setCrsTitle] = useState("");
  const [crsCategory, setCrsCategory] = useState<"IIT-JEE" | "Olympiad" | "NTSE" | "Foundation">("IIT-JEE");
  const [crsClass, setCrsClass] = useState("Class 11 – 12");
  const [crsFaculty, setCrsFaculty] = useState("Dr. Rahul Sharma");
  const [crsPrice, setCrsPrice] = useState("34999");
  const [crsLessons, setCrsLessons] = useState("120");
  const [crsDesc, setCrsDesc] = useState("");

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
      courseTitle: matCourse || courses[0]?.title || "IIT-JEE Comprehensive Mastery 2026-27",
      subject: matSubject,
      chapter: matChapter || "Core Mechanics",
      fileSize: matSize || "4.2 MB",
      fileType: matType,
      downloadUrl: matFileDataUrl || undefined,
      downloadsCount: 0,
      dateUploaded: "Just now",
    });
    setMatTitle("");
    setMatChapter("");
    handleClearMatFile();
    setMaterialModal(false);
    showSuccess("Material uploaded successfully! It is now live in the Student Library.");
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
      price: Math.round(Number(crsPrice) * 1.3),
      discountedPrice: Number(crsPrice) || 34999,
      totalLessons: Number(crsLessons) || 120,
      duration: "12 Months",
      isPublished: true,
      enrolledCount: 0,
      description: crsDesc || "Structured comprehensive course with live classes and study books.",
    });
    setCrsTitle("");
    setCrsDesc("");
    setCourseModal(false);
    showSuccess(`Course "${crsTitle}" created successfully! Check the Courses tab or Student Portal.`);
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
      description: "Interactive lecture and live problem-solving.",
      enrolledStudentsCount: 45,
    });
    setLiveTitle("");
    setLiveModal(false);
    showSuccess("Live class scheduled! The Live indicator is now pulsing for students.");
  };

  const handleAddTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testTitle) return;
    store.addTest({
      id: `test-${Date.now()}`,
      title: testTitle,
      courseTitle: courses[0]?.title || "IIT-JEE Comprehensive Mastery 2026-27",
      category: testCategory,
      questionsCount: Number(testQuestions) || 50,
      duration: testDuration,
      totalMarks: Number(testMarks) || 200,
      status: "Available",
      questions: [],
    });
    setTestTitle("");
    setTestModal(false);
    showSuccess("CBT Examination created! It is now playable by students.");
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
    showSuccess("Announcement broadcasted! It is now showing on all student dashboards.");
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Toast Alert Banner */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-between shadow-lg animate-slide-down">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-200" />
            <span>{successMessage}</span>
          </div>
          <Link href="/dashboard/my-courses">
            <Button size="sm" className="bg-white text-emerald-800 hover:bg-emerald-50 text-xs font-black h-8 px-3 rounded-lg">
              View in Student Portal →
            </Button>
          </Link>
        </div>
      )}

      {/* Top Banner with Clean Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200/90 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-[#004B87] text-xs font-black flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#004B87]" />
              Super Admin Console
            </span>
            <span className="text-xs text-gray-400 font-semibold">• DeepSiddhi Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Admin Management Portal
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Create courses, upload PDFs, schedule live classes, and manage student enrollments in real time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="outline"
            onClick={() => {
              store.resetAll();
              showSuccess("Reset to initial sample data completed!");
            }}
            className="text-xs font-bold text-gray-600 hover:text-red-700 border-gray-200 h-10 px-3.5 rounded-xl gap-1.5 shadow-2xs"
            title="Restore default sample data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </Button>

          <Link href="/dashboard/my-courses">
            <Button className="bg-[#004B87] hover:bg-[#003866] text-white text-xs font-black rounded-xl h-10 px-4 gap-1.5 shadow-sm">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Preview Student Courses</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="bg-white p-2 rounded-2xl border border-gray-200/90 shadow-2xs overflow-x-auto scrollbar-none">
          <TabsList className="bg-gray-100/80 p-1 rounded-xl flex items-center min-w-max gap-1">
            <TabsTrigger value="overview" className="text-xs font-black px-4 py-2 rounded-lg">
              📊 Master Dashboard
            </TabsTrigger>
            <TabsTrigger value="courses" className="text-xs font-black px-4 py-2 rounded-lg gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#004B87]" />
              Courses ({courses.length})
            </TabsTrigger>
            <TabsTrigger value="materials" className="text-xs font-black px-4 py-2 rounded-lg gap-1.5">
              <FileText className="w-3.5 h-3.5 text-teal-600" />
              Study Materials ({materials.length})
            </TabsTrigger>
            <TabsTrigger value="live" className="text-xs font-black px-4 py-2 rounded-lg gap-1.5">
              <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              Live Classes ({liveClasses.length})
            </TabsTrigger>
            <TabsTrigger value="tests" className="text-xs font-black px-4 py-2 rounded-lg gap-1.5">
              <FileCheck2 className="w-3.5 h-3.5 text-purple-600" />
              Tests ({tests.length})
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
          {/* 4 Professional Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div
              onClick={() => setActiveTab("courses")}
              className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-1 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <span className="text-xs text-gray-500 font-bold">Total Courses</span>
                <BookOpen className="w-4 h-4 text-[#004B87]" />
              </div>
              <span className="text-2xl font-black text-[#004B87]">{courses.length} Active</span>
              <span className="text-[11px] text-emerald-600 font-bold block">
                {courses.filter((c) => c.isPublished).length} Published to Students
              </span>
            </div>

            <div
              onClick={() => setActiveTab("materials")}
              className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-1 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <span className="text-xs text-gray-500 font-bold">Study Materials</span>
                <FileText className="w-4 h-4 text-teal-600" />
              </div>
              <span className="text-2xl font-black text-teal-700">{materials.length} Files</span>
              <span className="text-[11px] text-gray-400 block">Notes, Formulae & DPPs</span>
            </div>

            <div
              onClick={() => setActiveTab("live")}
              className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-1 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <span className="text-xs text-gray-500 font-bold">Live Sessions</span>
                <Radio className="w-4 h-4 text-red-500 animate-pulse" />
              </div>
              <span className="text-2xl font-black text-red-600">{liveClasses.length} Scheduled</span>
              <span className="text-[11px] text-red-600 font-bold block">
                {liveClasses.filter((l) => l.status === "live").length} Live Right Now
              </span>
            </div>

            <div
              onClick={() => setActiveTab("students")}
              className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-1 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <span className="text-xs text-gray-500 font-bold">Enrolled Students</span>
                <Users className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-2xl font-black text-purple-900">842 Students</span>
              <span className="text-[11px] text-purple-600 font-bold block">Pratham 2026 Batch</span>
            </div>
          </div>

          {/* Clean Unified Action Strip */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#004B87]" />
                <span>Quick Actions</span>
              </h3>
              <p className="text-xs text-gray-500">Add content directly to your LMS with one click.</p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Button
                onClick={() => setCourseModal(true)}
                className="bg-[#004B87] hover:bg-[#003866] text-white text-xs font-black h-10 px-4 rounded-xl shadow-xs gap-1.5"
              >
                <Plus className="w-4 h-4" />
                Add Course
              </Button>
              <Button
                onClick={() => setMaterialModal(true)}
                variant="outline"
                className="text-[#004B87] border-[#004B87]/30 hover:bg-[#EAF4FF] text-xs font-bold h-10 px-4 rounded-xl gap-1.5"
              >
                <UploadCloud className="w-4 h-4" />
                Upload PDF
              </Button>
              <Button
                onClick={() => setLiveModal(true)}
                variant="outline"
                className="text-red-600 border-red-200 hover:bg-red-50 text-xs font-bold h-10 px-4 rounded-xl gap-1.5"
              >
                <Radio className="w-4 h-4" />
                Schedule Live
              </Button>
              <Button
                onClick={() => setAnnouncementModal(true)}
                variant="outline"
                className="text-amber-800 border-amber-300 hover:bg-amber-50 text-xs font-bold h-10 px-4 rounded-xl gap-1.5"
              >
                <Bell className="w-4 h-4" />
                Post Notice
              </Button>
            </div>
          </div>

          {/* Revenue Chart */}
          <Card className="rounded-2xl border-gray-200/90 shadow-2xs bg-white p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-black text-gray-900">Student Intake & Revenue Run-Rate</h3>
                <p className="text-xs text-gray-400">Monthly gross fee run-rate (in Lakhs INR)</p>
              </div>
              <Badge className="bg-[#EAF4FF] text-[#004B87] font-bold text-xs">FY 2026-27</Badge>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#004B87" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#004B87" stopOpacity={0} />
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

          {/* Real-time Inbound Feed: Students & Admissions Leads */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Column 1: Recent Student Registrations */}
            <Card className="rounded-2xl border-gray-200/90 shadow-2xs bg-white p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#004B87] flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-gray-900 leading-none">
                      Recent Student Registrations
                    </h3>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      Live sync from website & registration portal ({students.length} total)
                    </p>
                  </div>
                </div>

                <Link
                  href="/admin/students"
                  className="text-xs font-bold text-[#004B87] hover:underline flex items-center gap-1"
                >
                  <span>Manage All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-2.5">
                {students.slice(0, 5).map((s) => (
                  <div
                    key={s.id}
                    className="p-3 rounded-xl bg-gray-50/80 hover:bg-blue-50/40 border border-gray-100 transition-colors flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#004B87] text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {s.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 flex items-center gap-1.5">
                          <span>{s.name}</span>
                          <span className="text-[10px] font-mono text-gray-400">({s.id})</span>
                        </div>
                        <div className="text-[11px] text-gray-500">
                          {s.email} • {s.phone}
                        </div>
                        <div className="text-[10px] text-teal-700 font-medium">
                          {s.enrolledCourses[0] || "No course assigned"}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <Badge
                        className={`text-[10px] font-bold ${
                          s.status === "Active"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {s.status}
                      </Badge>
                      <span className="block text-[10px] text-gray-400 mt-1">
                        {s.joinedDate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Column 2: Recent Admissions Inquiries */}
            <Card className="rounded-2xl border-gray-200/90 shadow-2xs bg-white p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-gray-900 leading-none">
                      Admissions Leads & Queries
                    </h3>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      Submitted via Contact Form & Welcome Popups
                    </p>
                  </div>
                </div>

                <Link
                  href="/admin/enquiries"
                  className="text-xs font-bold text-[#004B87] hover:underline flex items-center gap-1"
                >
                  <span>View All Leads</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-2.5">
                {store.getEnquiries().slice(0, 5).map((enq) => (
                  <div
                    key={enq.id}
                    className="p-3 rounded-xl bg-gray-50/80 hover:bg-emerald-50/30 border border-gray-100 transition-colors flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-gray-900 flex items-center gap-1.5">
                        <span>{enq.name}</span>
                        <span className="text-[10px] font-mono text-gray-400">({enq.id})</span>
                      </div>
                      <div className="text-[11px] text-gray-500">
                        {enq.phone} • {enq.email}
                      </div>
                      <div className="text-[10px] text-gray-600 italic">
                        {enq.course} • {enq.source}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <Badge
                        className={`text-[10px] font-bold capitalize ${
                          enq.status === "new"
                            ? "bg-amber-100 text-amber-800"
                            : enq.status === "enrolled"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {enq.status}
                      </Badge>
                      <span className="block text-[10px] text-gray-400 mt-1">
                        {enq.createdAt}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* =========================================================================
            TAB 2: COURSES & CURRICULUM MANAGEMENT
           ========================================================================= */}
        <TabsContent value="courses" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs">
            <div>
              <h2 className="text-lg font-black text-gray-900">Academic Courses ({courses.length})</h2>
              <p className="text-xs text-gray-500">
                Newly created courses appear in the student portal (<code className="font-mono text-[#004B87]">/dashboard/my-courses</code>) instantly.
              </p>
            </div>

            <Button
              onClick={() => setCourseModal(true)}
              className="bg-[#004B87] hover:bg-[#003866] text-white text-xs font-black rounded-xl h-10 px-4 gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Course</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => (
              <Card
                key={course.id}
                className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="bg-[#FDB813] text-gray-950 font-black text-[10px] px-2 py-0.5 rounded-full">
                        {course.category}
                      </span>
                      <span className="bg-gray-100 text-gray-700 font-bold text-[10px] px-2 py-0.5 rounded-full">
                        {course.targetClass}
                      </span>
                    </div>

                    <Badge
                      className={
                        course.isPublished
                          ? "bg-emerald-100 text-emerald-800 font-bold text-[10px]"
                          : "bg-gray-100 text-gray-600 font-bold text-[10px]"
                      }
                    >
                      {course.isPublished ? "Live" : "Draft"}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-base font-black text-gray-900 leading-snug">{course.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Faculty: <strong>{course.faculty}</strong></p>
                    {course.description && (
                      <p className="text-xs text-gray-600 line-clamp-2 mt-1.5">{course.description}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-gray-100">
                  <div className="grid grid-cols-3 gap-2 p-2.5 bg-gray-50 rounded-xl text-center text-xs">
                    <div>
                      <span className="text-[10px] text-gray-400 block font-medium">Price</span>
                      <span className="font-black text-gray-900">₹{course.discountedPrice.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block font-medium">Lessons</span>
                      <span className="font-black text-gray-900">{course.totalLessons}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block font-medium">Enrolled</span>
                      <span className="font-black text-emerald-600">{course.enrolledCount}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        store.togglePublishCourse(course.id);
                        showSuccess(`Course status toggled for "${course.title}".`);
                      }}
                      className="text-xs font-bold text-[#004B87] hover:underline flex items-center gap-1.5"
                    >
                      {course.isPublished ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{course.isPublished ? "Unpublish" : "Publish Live"}</span>
                    </button>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        store.deleteCourse(course.id);
                        showSuccess(`Course "${course.title}" removed.`);
                      }}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs font-bold h-8 px-2.5 gap-1"
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
            TAB 3: STUDY MATERIALS MANAGEMENT
           ========================================================= */}
        <TabsContent value="materials" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs">
            <div>
              <h2 className="text-lg font-black text-gray-900">Study Materials Repository ({materials.length})</h2>
              <p className="text-xs text-gray-500">
                Uploaded PDFs and notes sync to <code className="font-mono text-[#004B87]">/dashboard/materials</code>.
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

                    <p className="text-xs text-emerald-700 font-bold">
                      {mat.downloadsCount.toLocaleString()} Total Student Downloads
                    </p>
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      store.deleteMaterial(mat.id);
                      showSuccess(`Deleted "${mat.title}".`);
                    }}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 text-xs font-bold rounded-xl h-9 px-3 gap-1"
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
            TAB 4: LIVE CLASSROOMS
           ========================================================================= */}
        <TabsContent value="live" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs">
            <div>
              <h2 className="text-lg font-black text-gray-900">Live Virtual Classrooms ({liveClasses.length})</h2>
              <p className="text-xs text-gray-500">
                Toggle "Go Live Now" to broadcast live indicators directly to students.
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
                      Instructor: <strong>{cls.faculty}</strong> • Zoom Passcode:{" "}
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono font-bold text-gray-900">
                        {cls.passcode}
                      </code>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        store.toggleLiveStatus(cls.id);
                        showSuccess(`Live status updated for "${cls.title}".`);
                      }}
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
            TAB 5: TESTS & EXAMS
           ========================================================================= */}
        <TabsContent value="tests" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs">
            <div>
              <h2 className="text-lg font-black text-gray-900">Tests & CBT Examinations ({tests.length})</h2>
              <p className="text-xs text-gray-500">Exams immediately load into the student exam portal.</p>
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
                    onClick={() => {
                      store.deleteTest(t.id);
                      showSuccess(`Deleted test "${t.title}".`);
                    }}
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
            TAB 6: ANNOUNCEMENTS
           ========================================================================= */}
        <TabsContent value="announcements" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs">
            <div>
              <h2 className="text-lg font-black text-gray-900">Broadcast Notices ({announcements.length})</h2>
              <p className="text-xs text-gray-500">
                Notices immediately appear on all student dashboards.
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
                  onClick={() => {
                    store.deleteAnnouncement(ann.id);
                    showSuccess(`Announcement deleted.`);
                  }}
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
                  <span className="text-gray-500">Faculty: {batch.faculty}</span>
                  <span className="text-emerald-600">{(batch.currentEnrolled ?? batch.studentsCount ?? 0)} Students</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Active Student Roster */}
          <Card className="rounded-2xl border-gray-200/90 shadow-2xs bg-white p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-black text-gray-900">Enrolled Students ({students.length})</h3>
                <p className="text-xs text-gray-400">Live roster of students registered via student portal & welcome popup.</p>
              </div>

              <Link href="/admin/students">
                <Button size="sm" variant="outline" className="text-xs font-bold text-[#004B87] rounded-xl">
                  Full Student Console →
                </Button>
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-bold border-b border-gray-100">
                  <tr>
                    <th className="py-2.5 px-3">Student</th>
                    <th className="py-2.5 px-3">Contact</th>
                    <th className="py-2.5 px-3">Enrolled Course</th>
                    <th className="py-2.5 px-3">Batch</th>
                    <th className="py-2.5 px-3">Class</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {students.map((st) => (
                    <tr key={st.id} className="hover:bg-gray-50/50">
                      <td className="py-2.5 px-3">
                        <span className="font-bold text-gray-900 block">{st.name}</span>
                        <span className="text-[10px] text-gray-400 font-mono">{st.id}</span>
                      </td>
                      <td className="py-2.5 px-3 text-gray-600">
                        <span className="block font-medium">{st.phone}</span>
                        <span className="text-[10px] text-gray-400">{st.email}</span>
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-gray-800">
                        {st.enrolledCourses[0] || "—"}
                      </td>
                      <td className="py-2.5 px-3 text-gray-600">{st.batchName}</td>
                      <td className="py-2.5 px-3 text-gray-500">{st.classLevel}</td>
                      <td className="py-2.5 px-3">
                        <Badge
                          className={`text-[10px] font-bold ${
                            st.status === "Active"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {st.status}
                        </Badge>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            store.toggleStudentStatus(st.id);
                            showSuccess(`Status toggled for student "${st.name}".`);
                          }}
                          className="text-[11px] h-7 px-2 font-bold text-gray-600 hover:text-gray-900"
                        >
                          Toggle Status
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* =========================================================================
          MODALS FOR CREATING & UPLOADING CONTENT
         ========================================================================= */}

      {/* 1. Create Course Modal */}
      <Dialog open={courseModal} onOpenChange={setCourseModal}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-gray-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#004B87]" />
              Create & Publish New Course
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleAddCourse} className="space-y-4 pt-2">
            <div>
              <Label className="text-xs font-bold text-gray-700">Course Title *</Label>
              <Input
                required
                placeholder="e.g. IIT-JEE Foundation & Advanced Sprint 2027"
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

            <div>
              <Label className="text-xs font-bold text-gray-700">Course Description</Label>
              <textarea
                rows={2}
                value={crsDesc}
                onChange={(e) => setCrsDesc(e.target.value)}
                placeholder="Brief course curriculum overview..."
                className="w-full mt-1 p-2.5 text-xs bg-white border border-gray-200 rounded-xl"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setCourseModal(false)} className="text-xs rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="bg-[#004B87] hover:bg-[#003866] text-white text-xs font-black rounded-xl">
                Create & Publish Live
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* 2. Upload Material Modal */}
      <Dialog open={materialModal} onOpenChange={setMaterialModal}>
        <DialogContent className="sm:max-w-lg rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-gray-900 flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-[#004B87]" />
              Upload Study Material (PDF / DPP / Notes)
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleAddMaterial} className="space-y-4 pt-2">
            {/* LOCAL FILE DROPZONE */}
            <div>
              <Label className="text-xs font-bold text-gray-700 block mb-1">
                Select File from Local Computer *
              </Label>

              <input
                type="file"
                ref={matFileInputRef}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleProcessAdminMaterialFile(e.target.files[0]);
                  }
                }}
                accept=".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg,.txt"
                className="hidden"
              />

              {!matFileName ? (
                <div
                  onClick={() => matFileInputRef.current?.click()}
                  onDrop={(e) => {
                    e.preventDefault();
                    setMatDragging(false);
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleProcessAdminMaterialFile(e.dataTransfer.files[0]);
                    }
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setMatDragging(true);
                  }}
                  onDragLeave={() => setMatDragging(false)}
                  className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                    matDragging
                      ? "border-[#004B87] bg-blue-50"
                      : "border-gray-300 hover:border-[#004B87] hover:bg-gray-50/70 bg-gray-50/40"
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-[#004B87] flex items-center justify-center mx-auto mb-1.5">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black text-[#004B87] block">
                    Click to browse files or drag & drop here
                  </span>
                  <span className="text-[11px] text-gray-500 block mt-0.5">
                    Supports PDF, Word (.docx), PPT, DPPs, and Images (up to 50 MB)
                  </span>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-xs font-black text-gray-900 block truncate">
                        {matFileName}
                      </span>
                      <span className="text-[11px] text-emerald-700 font-bold block">
                        {matSize} • Ready to Publish
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => matFileInputRef.current?.click()}
                      className="text-xs font-bold text-[#004B87] hover:bg-white h-8 px-2.5 rounded-lg"
                    >
                      Change
                    </Button>
                    <button
                      type="button"
                      onClick={handleClearMatFile}
                      className="p-1 text-gray-400 hover:text-red-600 rounded-md"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div>
              <Label className="text-xs font-bold text-gray-700">Material Title *</Label>
              <Input
                required
                placeholder="e.g. Rotational Dynamics Comprehensive Formula Map"
                value={matTitle}
                onChange={(e) => setMatTitle(e.target.value)}
                className="mt-1 text-xs rounded-xl h-10"
              />
            </div>

            <div>
              <Label className="text-xs font-bold text-gray-700">Tied to Course *</Label>
              <select
                value={matCourse}
                onChange={(e) => setMatCourse(e.target.value)}
                className="w-full mt-1 h-10 px-3 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#004B87]"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.title}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-bold text-gray-700">Subject</Label>
                <select
                  value={matSubject}
                  onChange={(e) => setMatSubject(e.target.value as any)}
                  className="w-full mt-1 h-10 px-3 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#004B87]"
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
                  className="w-full mt-1 h-10 px-3 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#004B87]"
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
                className="mt-1 text-xs rounded-xl h-10"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-gray-100">
              <Button type="button" variant="outline" onClick={() => setMaterialModal(false)} className="text-xs rounded-xl h-10 px-4">
                Cancel
              </Button>
              <Button type="submit" className="bg-[#004B87] hover:bg-[#003866] text-white text-xs font-black rounded-xl h-10 px-5 shadow-sm">
                Upload & Publish to Students
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
                placeholder="e.g. Magnetism & Ampere's Law Practice Drill"
                value={liveTitle}
                onChange={(e) => setLiveTitle(e.target.value)}
                className="mt-1 text-xs rounded-xl"
              />
            </div>

            <div>
              <Label className="text-xs font-bold text-gray-700">Batch Name</Label>
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
              <Label className="text-xs font-bold text-gray-700">Zoom / Meet Link</Label>
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
