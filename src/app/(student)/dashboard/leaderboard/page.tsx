"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Medal,
  Award,
  Crown,
  Flame,
  ArrowUp,
  Star,
  Users,
} from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  score: number;
  points: number;
  batch: string;
  streak: number;
  isCurrentUser?: boolean;
}

const leaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    name: "Siddharth Verma",
    avatar: "SV",
    score: 292,
    points: 4850,
    batch: "Pratham Batch",
    streak: 28,
  },
  {
    rank: 2,
    name: "Ananya Deshmukh",
    avatar: "AD",
    score: 288,
    points: 4620,
    batch: "Pratham Batch",
    streak: 22,
  },
  {
    rank: 3,
    name: "Rohan Kulkarni",
    avatar: "RK",
    score: 284,
    points: 4490,
    batch: "Aryabhata Olympiad",
    streak: 19,
  },
  {
    rank: 4,
    name: "Aryan Sharma",
    avatar: "AS",
    score: 278,
    points: 4310,
    batch: "Pratham Batch",
    streak: 12,
    isCurrentUser: true,
  },
  {
    rank: 5,
    name: "Meera Nair",
    avatar: "MN",
    score: 272,
    points: 4180,
    batch: "Pratham Batch",
    streak: 15,
  },
  {
    rank: 6,
    name: "Tanmay Roy",
    avatar: "TR",
    score: 268,
    points: 3990,
    batch: "Vidyarthi Batch",
    streak: 11,
  },
  {
    rank: 7,
    name: "Kavya Iyer",
    avatar: "KI",
    score: 265,
    points: 3870,
    batch: "Pratham Batch",
    streak: 9,
  },
];

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<"weekly" | "monthly" | "all_time">("weekly");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#163B65]">Student Honor Leaderboard</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Academic rankings based on test percentile, daily practice problems, and live class attendance.
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-gray-200 shadow-xs">
          {(["weekly", "monthly", "all_time"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                period === p
                  ? "bg-[#163B65] text-white shadow-xs font-bold"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {p.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Podium Cards for Top 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        {/* Rank 2 (Silver) */}
        <Card className="rounded-3xl border-gray-100 shadow-md bg-white p-6 text-center space-y-4 md:order-1 relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 font-black text-xl flex items-center justify-center mx-auto shadow-inner">
            #2
          </div>
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-slate-400 to-slate-600 text-white font-bold text-lg flex items-center justify-center mx-auto shadow-md">
            {leaderboardData[1].avatar}
          </div>
          <div>
            <h3 className="font-bold text-base text-gray-900">{leaderboardData[1].name}</h3>
            <span className="text-xs text-gray-400">{leaderboardData[1].batch}</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex justify-around text-xs">
            <div>
              <span className="font-bold text-slate-900 block">{leaderboardData[1].score}/300</span>
              <span className="text-[10px] text-gray-400">Avg Score</span>
            </div>
            <div>
              <span className="font-bold text-teal-600 block">{leaderboardData[1].points} pts</span>
              <span className="text-[10px] text-gray-400">Total Points</span>
            </div>
          </div>
        </Card>

        {/* Rank 1 (Gold - Center & Elevated) */}
        <Card className="rounded-3xl border-2 border-amber-300 shadow-xl bg-gradient-to-b from-amber-50/50 to-white p-6 text-center space-y-4 md:order-2 md:-translate-y-4 relative overflow-hidden">
          <div className="absolute top-3 right-3 text-amber-500">
            <Crown className="w-6 h-6" />
          </div>
          <div className="w-14 h-14 rounded-2xl bg-amber-400 text-white font-black text-2xl flex items-center justify-center mx-auto shadow-md">
            #1
          </div>
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 text-white font-bold text-2xl flex items-center justify-center mx-auto shadow-lg ring-4 ring-amber-100">
            {leaderboardData[0].avatar}
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-gray-900">{leaderboardData[0].name}</h3>
            <span className="text-xs text-amber-800 font-semibold">{leaderboardData[0].batch}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-amber-100/60 border border-amber-200 flex justify-around text-xs">
            <div>
              <span className="font-extrabold text-amber-950 block">{leaderboardData[0].score}/300</span>
              <span className="text-[10px] text-amber-800">Avg Score</span>
            </div>
            <div>
              <span className="font-extrabold text-teal-800 block">{leaderboardData[0].points} pts</span>
              <span className="text-[10px] text-teal-700">Total Points</span>
            </div>
          </div>
        </Card>

        {/* Rank 3 (Bronze) */}
        <Card className="rounded-3xl border-gray-100 shadow-md bg-white p-6 text-center space-y-4 md:order-3 relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 font-black text-xl flex items-center justify-center mx-auto shadow-inner">
            #3
          </div>
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-700 to-amber-900 text-white font-bold text-lg flex items-center justify-center mx-auto shadow-md">
            {leaderboardData[2].avatar}
          </div>
          <div>
            <h3 className="font-bold text-base text-gray-900">{leaderboardData[2].name}</h3>
            <span className="text-xs text-gray-400">{leaderboardData[2].batch}</span>
          </div>
          <div className="p-3 rounded-2xl bg-amber-50/50 border border-amber-100 flex justify-around text-xs">
            <div>
              <span className="font-bold text-amber-900 block">{leaderboardData[2].score}/300</span>
              <span className="text-[10px] text-gray-400">Avg Score</span>
            </div>
            <div>
              <span className="font-bold text-teal-600 block">{leaderboardData[2].points} pts</span>
              <span className="text-[10px] text-gray-400">Total Points</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Ranks 4+ Table */}
      <Card className="rounded-3xl border-gray-100 shadow-md bg-white p-6 space-y-4">
        <h3 className="text-sm font-bold text-[#163B65]">Full Cohort Rankings</h3>

        <div className="divide-y divide-gray-100">
          {leaderboardData.map((student) => (
            <div
              key={student.rank}
              className={`py-3.5 px-4 rounded-2xl flex items-center justify-between text-xs transition-colors ${
                student.isCurrentUser
                  ? "bg-teal-50 border border-teal-200 font-semibold"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`w-7 text-center font-bold text-sm ${
                    student.rank <= 3 ? "text-amber-500" : "text-gray-400"
                  }`}
                >
                  #{student.rank}
                </span>

                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#163B65] to-[#16A6A1] text-white font-bold flex items-center justify-center text-xs">
                  {student.avatar}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 text-sm">{student.name}</span>
                    {student.isCurrentUser && (
                      <Badge className="bg-[#163B65] text-white text-[10px]">
                        You
                      </Badge>
                    )}
                  </div>
                  <span className="text-[11px] text-gray-400">{student.batch}</span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right hidden sm:block">
                  <span className="font-bold text-gray-800">{student.score} / 300</span>
                  <span className="text-[10px] text-gray-400 block">Avg Exam Score</span>
                </div>

                <div className="text-right">
                  <span className="font-black text-[#16A6A1]">{student.points} pts</span>
                  <span className="text-[10px] text-gray-400 block">XP</span>
                </div>

                <div className="hidden sm:flex items-center gap-1 text-rose-500 font-bold">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{student.streak}d</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
