"use client";

import { useState } from "react";
import { SubfolderExplorer } from "@/components/course/subfolder-explorer";
import { useAuth } from "@/context/auth-context";
import { Sparkles, Layers, BookOpen, Compass } from "lucide-react";

export default function SubfoldersPage() {
  const { user } = useAuth();
  const initialClass = user?.class_level || "Class 6";

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border-2 border-indigo-100 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-black flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              <span>Classes 6th to 10th Explorer</span>
            </span>
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Subfolder Hierarchy Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Subjects & Chapters Subfolders 📁
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-2xl font-medium">
            Browse Classes 6th through 10th. Click any course to view subjects, chapters, recorded video lectures, downloadable formula maps, assignments, and CBT quizzes!
          </p>
        </div>
      </div>

      {/* Main Subfolder Explorer Component */}
      <SubfolderExplorer initialClass={initialClass} studentId={user?.id || "STD-1001"} />
    </div>
  );
}
