"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import {
  TrendingUp,
  Clock,
  CheckCircle2,
  Flame,
  Award,
  BookOpen,
  Calendar,
  Sparkles,
} from "lucide-react";

const weeklyStudyData = [
  { day: "Mon", hours: 4.2 },
  { day: "Tue", hours: 5.5 },
  { day: "Wed", hours: 3.8 },
  { day: "Thu", hours: 6.0 },
  { day: "Fri", hours: 5.2 },
  { day: "Sat", hours: 7.5 },
  { day: "Sun", hours: 8.0 },
];

const testPerformanceData = [
  { test: "Mock #01", score: 180 },
  { test: "Mock #02", score: 195 },
  { test: "Mock #03", score: 210 },
  { test: "Mock #04", score: 225 },
  { test: "Mock #05", score: 218 },
  { test: "Mock #06", score: 242 },
  { test: "Mock #07", score: 258 },
];

const subjectProgress = [
  { subject: "Physics", completed: 68, total: 95, percentage: 71, color: "bg-blue-600" },
  { subject: "Chemistry", completed: 58, total: 80, percentage: 72, color: "bg-teal-600" },
  { subject: "Mathematics", completed: 46, total: 65, percentage: 70, color: "bg-purple-600" },
  { subject: "Mental Ability / NTSE", completed: 28, total: 30, percentage: 93, color: "bg-amber-600" },
];

export default function LearningProgressPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#163B65]">Learning Progress & Analytics</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Detailed breakdown of your study hours, syllabus milestones, and mock test performance trends.
        </p>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-2xl border-gray-100 shadow-sm bg-white p-5 space-y-1">
          <span className="text-xs text-gray-500 font-semibold block">Total Watch Time</span>
          <span className="text-2xl font-black text-[#163B65]">146.5 hrs</span>
          <span className="text-[11px] text-teal-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +14.2% vs last week
          </span>
        </Card>

        <Card className="rounded-2xl border-gray-100 shadow-sm bg-white p-5 space-y-1">
          <span className="text-xs text-gray-500 font-semibold block">Completed Lessons</span>
          <span className="text-2xl font-black text-gray-900">200 / 270</span>
          <span className="text-[11px] text-teal-600 font-semibold block">74% Overall Syllabus</span>
        </Card>

        <Card className="rounded-2xl border-gray-100 shadow-sm bg-white p-5 space-y-1">
          <span className="text-xs text-gray-500 font-semibold block">Average Mock Score</span>
          <span className="text-2xl font-black text-emerald-600">258 / 300</span>
          <span className="text-[11px] text-gray-500 block">Top 5% in Batch</span>
        </Card>

        <Card className="rounded-2xl border-gray-100 shadow-sm bg-white p-5 space-y-1">
          <span className="text-xs text-gray-500 font-semibold block">Current Streak</span>
          <span className="text-2xl font-black text-rose-500">12 Days 🔥</span>
          <span className="text-[11px] text-gray-500 block">Personal Record: 24 Days</span>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Study Hours Bar Chart */}
        <Card className="rounded-3xl border-gray-100 shadow-md bg-white p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-[#163B65]">Weekly Study Hours</h3>
              <p className="text-xs text-gray-400">Hours spent watching lessons and solving DPPs</p>
            </div>
            <Badge className="bg-[#EAF4FF] text-[#163B65] border-0 text-xs">
              40.2 hrs this week
            </Badge>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyStudyData}>
                <XAxis dataKey="day" stroke="#888888" fontSize={11} tickLine={false} />
                <YAxis stroke="#888888" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#163B65",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="hours" fill="#16A6A1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Mock Test Score Trend Line Chart */}
        <Card className="rounded-3xl border-gray-100 shadow-md bg-white p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-[#163B65]">Mock Test Score Trajectory</h3>
              <p className="text-xs text-gray-400">Score progress across consecutive All India Tests</p>
            </div>
            <Badge className="bg-emerald-50 text-emerald-800 border-emerald-300 text-xs">
              +78 pts gain
            </Badge>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={testPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="test" stroke="#888888" fontSize={11} tickLine={false} />
                <YAxis domain={[150, 300]} stroke="#888888" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#163B65",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#163B65"
                  strokeWidth={3}
                  dot={{ fill: "#16A6A1", r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Subject-Wise Mastery Progress */}
      <Card className="rounded-3xl border-gray-100 shadow-md bg-white p-6 sm:p-8 space-y-6">
        <h3 className="text-base font-bold text-[#163B65] flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#16A6A1]" />
          Subject-Wise Syllabus Completion
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {subjectProgress.map((subj) => (
            <div key={subj.subject} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-gray-800">{subj.subject}</span>
                <span className="font-extrabold text-[#163B65]">{subj.percentage}%</span>
              </div>
              <Progress value={subj.percentage} className="h-2.5 bg-gray-200" />
              <div className="flex justify-between text-[11px] text-gray-500">
                <span>{subj.completed} of {subj.total} chapters completed</span>
                <span>{subj.total - subj.completed} remaining</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
