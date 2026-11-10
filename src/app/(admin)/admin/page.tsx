"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="space-y-8">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#163B65]">Admin Overview & Control</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Real-time enrollment metrics, classroom broadcasts, revenue reconciliation, and student lifecycle management.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/live-classes">
            <Button className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl h-10 px-4 gap-2 shadow-sm">
              <Radio className="w-4 h-4 animate-pulse" />
              Schedule Live Class
            </Button>
          </Link>
          <Link href="/admin/courses">
            <Button className="bg-[#163B65] hover:bg-[#122e50] text-white text-xs font-semibold rounded-xl h-10 px-4 gap-2 shadow-sm">
              <Plus className="w-4 h-4" />
              Add New Course
            </Button>
          </Link>
        </div>
      </div>

      {/* Top 8 Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="rounded-2xl border-gray-100 shadow-sm bg-white p-5 space-y-1">
          <div className="flex justify-between items-start">
            <span className="text-xs text-gray-500 font-semibold">Registered Students</span>
            <Users className="w-4 h-4 text-[#163B65]" />
          </div>
          <span className="text-2xl font-black text-[#163B65]">842</span>
          <span className="text-[11px] text-teal-600 font-semibold block">780 Active Accounts</span>
        </Card>

        <Card className="rounded-2xl border-gray-100 shadow-sm bg-white p-5 space-y-1">
          <div className="flex justify-between items-start">
            <span className="text-xs text-gray-500 font-semibold">New This Week</span>
            <UserPlus className="w-4 h-4 text-teal-600" />
          </div>
          <span className="text-2xl font-black text-teal-700">+64</span>
          <span className="text-[11px] text-emerald-600 font-semibold block">+22% vs last week</span>
        </Card>

        <Card className="rounded-2xl border-gray-100 shadow-sm bg-white p-5 space-y-1">
          <div className="flex justify-between items-start">
            <span className="text-xs text-gray-500 font-semibold">Live Classes Today</span>
            <Radio className="w-4 h-4 text-red-500 animate-pulse" />
          </div>
          <span className="text-2xl font-black text-red-600">4 Scheduled</span>
          <span className="text-[11px] text-red-500 font-semibold block">1 Live Now</span>
        </Card>

        <Card className="rounded-2xl border-gray-100 shadow-sm bg-white p-5 space-y-1">
          <div className="flex justify-between items-start">
            <span className="text-xs text-gray-500 font-semibold">Gross Course Revenue</span>
            <CreditCard className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-2xl font-black text-emerald-700">₹2.48 Cr</span>
          <span className="text-[11px] text-gray-500 block">FY 2026-27</span>
        </Card>

        <Card className="rounded-2xl border-gray-100 shadow-sm bg-white p-5 space-y-1">
          <div className="flex justify-between items-start">
            <span className="text-xs text-gray-500 font-semibold">Total Courses</span>
            <BookOpen className="w-4 h-4 text-[#163B65]" />
          </div>
          <span className="text-2xl font-black text-gray-900">12 Programs</span>
          <span className="text-[11px] text-teal-600 font-semibold block">All Batches Active</span>
        </Card>

        <Card className="rounded-2xl border-gray-100 shadow-sm bg-white p-5 space-y-1">
          <div className="flex justify-between items-start">
            <span className="text-xs text-gray-500 font-semibold">Faculty Educators</span>
            <GraduationCap className="w-4 h-4 text-purple-600" />
          </div>
          <span className="text-2xl font-black text-purple-900">18 Master Faculty</span>
          <span className="text-[11px] text-gray-500 block">Ex-IIT/AIIMS Mentors</span>
        </Card>

        <Card className="rounded-2xl border-gray-100 shadow-sm bg-white p-5 space-y-1">
          <div className="flex justify-between items-start">
            <span className="text-xs text-gray-500 font-semibold">Recorded Lectures</span>
            <Video className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-2xl font-black text-blue-900">540+ Lessons</span>
          <span className="text-[11px] text-blue-600 font-semibold block">Mux Streaming DRM</span>
        </Card>

        <Card className="rounded-2xl border-gray-100 shadow-sm bg-white p-5 space-y-1">
          <div className="flex justify-between items-start">
            <span className="text-xs text-gray-500 font-semibold">New Enquiries</span>
            <AlertCircle className="w-4 h-4 text-amber-500" />
          </div>
          <span className="text-2xl font-black text-amber-600">18 Leads</span>
          <span className="text-[11px] text-amber-700 font-semibold block">Requires Counselor Call</span>
        </Card>
      </div>

      {/* Revenue & Growth Chart (Recharts) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 rounded-3xl border-gray-100 shadow-md bg-white p-6 sm:p-8 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-[#163B65]">Enrollment Growth & Revenue Run-Rate</h3>
              <p className="text-xs text-gray-400">Monthly student intake and fee collections in Lakhs (INR)</p>
            </div>
            <Badge className="bg-[#EAF4FF] text-[#163B65] text-xs">Last 6 Months</Badge>
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
                    backgroundColor: "#163B65",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#163B65"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRev)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Live Operations Widget */}
        <Card className="rounded-3xl border-gray-100 shadow-md bg-white p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-bold text-sm text-[#163B65]">Classroom Schedule Today</h3>
            <span className="text-[10px] text-gray-400">4 Sessions</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-2xl bg-red-50 border border-red-200 space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-bold text-red-700">🔴 Live Streaming</span>
                <span className="font-mono text-[10px] text-red-600">Zoom Room 1</span>
              </div>
              <p className="font-semibold text-gray-900">Physics: Magnetism & Biot-Savart</p>
              <span className="text-[11px] text-gray-500">Dr. Rahul Sharma • 142 Active Attendees</span>
            </div>

            <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
              <span className="text-[10px] text-teal-700 font-bold uppercase">7:00 AM Tomorrow</span>
              <p className="font-semibold text-gray-900">Chemistry: Carbocation Mechanisms</p>
              <span className="text-[11px] text-gray-500">Prof. Priya Saxena • Pratham Batch</span>
            </div>

            <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
              <span className="text-[10px] text-teal-700 font-bold uppercase">6:00 PM Wednesday</span>
              <p className="font-semibold text-gray-900">Olympiad Math: Diophantine Proofs</p>
              <span className="text-[11px] text-gray-500">Er. Amit Verma • Aryabhata Batch</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Registrations Table */}
      <Card className="rounded-3xl border-gray-100 shadow-md bg-white p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#163B65]">Recent Student Registrations</h3>
            <p className="text-xs text-gray-400">Latest students onboarded via website popup and admissions form</p>
          </div>
          <Link href="/admin/students" className="text-xs font-semibold text-[#16A6A1] hover:underline flex items-center gap-1">
            View All Students <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-y border-gray-100">
              <tr>
                <th className="py-3 px-4">Student ID</th>
                <th className="py-3 px-4">Full Name</th>
                <th className="py-3 px-4">Mobile</th>
                <th className="py-3 px-4">Course Track</th>
                <th className="py-3 px-4">Class</th>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentRegistrations.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/60">
                  <td className="py-3 px-4 font-mono font-bold text-gray-700">{row.id}</td>
                  <td className="py-3 px-4 font-bold text-[#163B65]">{row.name}</td>
                  <td className="py-3 px-4 text-gray-600">{row.phone}</td>
                  <td className="py-3 px-4 text-gray-700">{row.course}</td>
                  <td className="py-3 px-4 text-gray-500">{row.class}</td>
                  <td className="py-3 px-4 text-gray-400">{row.date}</td>
                  <td className="py-3 px-4">
                    <Badge
                      className={`text-[10px] ${
                        row.status === "Verified"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {row.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
