"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
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

const recentRegistrations = [
  {
    id: "REG-901",
    name: "Aryan Sharma",
    phone: "+91 9876543210",
    course: "IIT-JEE Comprehensive",
    class: "Class 11",
    date: "10 mins ago",
    status: "Verified",
  },
  {
    id: "REG-902",
    name: "Meera Nair",
    phone: "+91 9811223344",
    course: "Olympiad Sprint",
    class: "Class 10",
    date: "35 mins ago",
    status: "Verified",
  },
  {
    id: "REG-903",
    name: "Tanmay Roy",
    phone: "+91 9988771122",
    course: "NTSE & Aptitude",
    class: "Class 9",
    date: "1 hour ago",
    status: "Pending Call",
  },
  {
    id: "REG-904",
    name: "Kavya Iyer",
    phone: "+91 9765432109",
    course: "IIT-JEE Crash Course",
    class: "Class 12",
    date: "2 hours ago",
    status: "Verified",
  },
];

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8 pb-12">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-black flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Super Admin Console
            </span>
            <span className="text-xs text-gray-400">• DeepSiddhi Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Academic Management & Operations
          </h1>
          <p className="text-xs text-gray-500">
            Upload study materials, manage courses, broadcast live classrooms, and monitor student intake.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link href="/dashboard">
            <Button variant="outline" className="text-xs font-bold text-[#004B87] border-gray-200 h-10 px-4 rounded-xl gap-1.5 shadow-2xs">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Student Portal View</span>
            </Button>
          </Link>
          <Link href="/admin/courses">
            <Button className="bg-[#004B87] hover:bg-[#003866] text-white text-xs font-black rounded-xl h-10 px-4 gap-1.5 shadow-sm">
              <Plus className="w-4 h-4" />
              <span>Create Course</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* QUICK UPLOAD & MANAGEMENT ACTION TILES (What the user specifically requested) */}
      <div className="space-y-3">
        <h2 className="text-base font-black text-gray-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#16A6A1]" />
          <span>Content Upload & Quick Operations</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {/* Tile 1: Upload Study Material */}
          <Link
            href="/admin/materials"
            className="p-4 rounded-2xl bg-white hover:bg-[#EAF4FF] border border-gray-200/80 hover:border-[#004B87]/30 transition-all shadow-2xs hover:shadow-md flex flex-col items-center text-center justify-center gap-2 group"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#004B87] flex items-center justify-center group-hover:scale-110 transition-transform">
              <UploadCloud className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="font-extrabold text-xs text-gray-900 block leading-tight">
                Upload Material
              </span>
              <span className="text-[10px] text-gray-400">PDFs, DPPs & Notes</span>
            </div>
          </Link>

          {/* Tile 2: Create Course */}
          <Link
            href="/admin/courses"
            className="p-4 rounded-2xl bg-white hover:bg-emerald-50 border border-gray-200/80 hover:border-emerald-300 transition-all shadow-2xs hover:shadow-md flex flex-col items-center text-center justify-center gap-2 group"
          >
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="font-extrabold text-xs text-gray-900 block leading-tight">
                Manage Courses
              </span>
              <span className="text-[10px] text-gray-400">Add & Edit Curricula</span>
            </div>
          </Link>

          {/* Tile 3: Schedule Live Class */}
          <Link
            href="/admin/live-classes"
            className="p-4 rounded-2xl bg-white hover:bg-red-50 border border-gray-200/80 hover:border-red-300 transition-all shadow-2xs hover:shadow-md flex flex-col items-center text-center justify-center gap-2 group"
          >
            <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Radio className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="font-extrabold text-xs text-gray-900 block leading-tight">
                Schedule Live
              </span>
              <span className="text-[10px] text-gray-400">Zoom / Meet Class</span>
            </div>
          </Link>

          {/* Tile 4: Upload Recorded Video */}
          <Link
            href="/admin/recorded-classes"
            className="p-4 rounded-2xl bg-white hover:bg-purple-50 border border-gray-200/80 hover:border-purple-300 transition-all shadow-2xs hover:shadow-md flex flex-col items-center text-center justify-center gap-2 group"
          >
            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Video className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="font-extrabold text-xs text-gray-900 block leading-tight">
                Recorded Video
              </span>
              <span className="text-[10px] text-gray-400">Upload Lectures</span>
            </div>
          </Link>

          {/* Tile 5: Build Tests & Exams */}
          <Link
            href="/admin/tests"
            className="p-4 rounded-2xl bg-white hover:bg-amber-50 border border-gray-200/80 hover:border-amber-300 transition-all shadow-2xs hover:shadow-md flex flex-col items-center text-center justify-center gap-2 group"
          >
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileCheck2 className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="font-extrabold text-xs text-gray-900 block leading-tight">
                Tests & Exams
              </span>
              <span className="text-[10px] text-gray-400">CBT Mock Tests</span>
            </div>
          </Link>

          {/* Tile 6: Academic Batches */}
          <Link
            href="/admin/batches"
            className="p-4 rounded-2xl bg-white hover:bg-teal-50 border border-gray-200/80 hover:border-teal-300 transition-all shadow-2xs hover:shadow-md flex flex-col items-center text-center justify-center gap-2 group"
          >
            <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CalendarDays className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="font-extrabold text-xs text-gray-900 block leading-tight">
                Batches & Timing
              </span>
              <span className="text-[10px] text-gray-400">Assign Schedules</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Top 8 Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="rounded-2xl border-gray-200/80 shadow-2xs bg-white p-5 space-y-1">
          <div className="flex justify-between items-start">
            <span className="text-xs text-gray-500 font-bold">Registered Students</span>
            <Users className="w-4 h-4 text-[#004B87]" />
          </div>
          <span className="text-2xl font-black text-[#004B87]">842</span>
          <span className="text-[11px] text-teal-600 font-bold block">780 Active Accounts</span>
        </Card>

        <Card className="rounded-2xl border-gray-200/80 shadow-2xs bg-white p-5 space-y-1">
          <div className="flex justify-between items-start">
            <span className="text-xs text-gray-500 font-bold">New This Week</span>
            <UserPlus className="w-4 h-4 text-teal-600" />
          </div>
          <span className="text-2xl font-black text-teal-700">+64</span>
          <span className="text-[11px] text-emerald-600 font-bold block">+22% vs last week</span>
        </Card>

        <Card className="rounded-2xl border-gray-200/80 shadow-2xs bg-white p-5 space-y-1">
          <div className="flex justify-between items-start">
            <span className="text-xs text-gray-500 font-bold">Live Classes Today</span>
            <Radio className="w-4 h-4 text-red-500 animate-pulse" />
          </div>
          <span className="text-2xl font-black text-red-600">4 Scheduled</span>
          <span className="text-[11px] text-red-500 font-bold block">1 Live Now</span>
        </Card>

        <Card className="rounded-2xl border-gray-200/80 shadow-2xs bg-white p-5 space-y-1">
          <div className="flex justify-between items-start">
            <span className="text-xs text-gray-500 font-bold">Gross Course Revenue</span>
            <CreditCard className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-2xl font-black text-emerald-700">₹2.48 Cr</span>
          <span className="text-[11px] text-gray-500 block">FY 2026-27</span>
        </Card>
      </div>

      {/* Revenue & Growth Chart (Recharts) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 rounded-2xl border-gray-200/80 shadow-2xs bg-white p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-black text-gray-900">Enrollment Growth & Revenue Run-Rate</h3>
              <p className="text-xs text-gray-400">Monthly student intake and fee collections in Lakhs (INR)</p>
            </div>
            <Badge className="bg-[#EAF4FF] text-[#004B87] font-bold text-xs">Last 6 Months</Badge>
          </div>

          <div className="h-72 w-full pt-4">
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

        {/* Recent Registrations Table */}
        <Card className="rounded-2xl border-gray-200/80 shadow-2xs bg-white p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-black text-gray-900">Recent Registrations</h3>
            <Link href="/admin/students" className="text-xs font-bold text-[#004B87] hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {recentRegistrations.map((student) => (
              <div
                key={student.id}
                className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-gray-900 block">{student.name}</span>
                  <span className="text-[11px] text-gray-500">
                    {student.course} • {student.class}
                  </span>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="border-emerald-300 text-emerald-700 bg-emerald-50 text-[10px] font-bold">
                    {student.status}
                  </Badge>
                  <span className="text-[10px] text-gray-400 block mt-0.5">{student.date}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
