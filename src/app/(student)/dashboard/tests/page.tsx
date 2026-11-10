"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GraduationCap,
  Monitor,
  Award,
  Trophy,
  ClipboardList,
  BookOpen,
  Tv2,
  Medal,
  ChevronRight,
  Clock,
  Flag,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  UploadCloud,
  FileText,
  Search,
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const sampleTestQuestions: Question[] = [
  {
    id: 1,
    question:
      "A solid sphere and a hollow sphere of identical mass and radius roll down an inclined plane without slipping from rest. Which sphere reaches the bottom first?",
    options: [
      "Hollow sphere, because of greater moment of inertia",
      "Solid sphere, because it has smaller moment of inertia and thus greater acceleration",
      "Both reach the bottom at the same time since mass and radius are identical",
      "Depends on the angle of inclination of the plane",
    ],
    correctIndex: 1,
    explanation:
      "Acceleration in rolling down an incline is a = g sin(θ) / (1 + I / (mR²)). For a solid sphere I = 2/5 mR², while for a hollow sphere I = 2/3 mR². Thus solid sphere has higher acceleration and reaches first.",
  },
  {
    id: 2,
    question:
      "Which of the following carbocations is the MOST stable according to hyperconjugation and resonance effects?",
    options: [
      "Allyl carbocation (CH2=CH-CH2+)",
      "Tropylium cation (C7H7+)",
      "Tert-butyl carbocation ((CH3)3C+)",
      "Benzyl carbocation (C6H5-CH2+)",
    ],
    correctIndex: 1,
    explanation:
      "Tropylium cation has 6 pi electrons in a planar aromatic 7-membered ring satisfying Huckel's rule (4n+2 with n=1), imparting extraordinary aromatic resonance stability.",
  },
  {
    id: 3,
    question:
      "If f(x) = x³ - 3x² + 6, find the point of local minimum of f(x) on the real line.",
    options: ["x = 0", "x = 1", "x = 2", "x = -2"],
    correctIndex: 2,
    explanation:
      "f'(x) = 3x² - 6x = 3x(x - 2) = 0 => critical points at x = 0 and x = 2. f''(x) = 6x - 6. At x = 2, f''(2) = 6 > 0, so local minimum occurs at x = 2.",
  },
  {
    id: 4,
    question:
      "According to Biot-Savart law, the magnetic field dB at distance r from an infinitesimal current element I dl is proportional to:",
    options: ["r", "1 / r", "1 / r²", "1 / r³"],
    correctIndex: 2,
    explanation:
      "dB = (μ₀ / 4π) * (I dl × r̂) / r², so it is inversely proportional to r².",
  },
];

export default function TestsPage() {
  const [testActive, setTestActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (testActive && !testSubmitted && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setTestSubmitted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [testActive, testSubmitted, timeRemaining]);

  const handleSelectOption = (optIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optIndex,
    }));
  };

  const handleToggleFlag = () => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentQuestionIndex]: !prev[currentQuestionIndex],
    }));
  };

  const calculateScore = () => {
    let score = 0;
    sampleTestQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score += 4;
      } else if (selectedAnswers[idx] !== undefined) {
        score -= 1;
      }
    });
    return score;
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Test Active Mode (Simulated CBT Examination) */}
      {testActive ? (
        <div className="space-y-6">
          {/* CBT Exam Header */}
          <div className="bg-[#004B87] text-white p-4 sm:p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-lg border border-blue-400/20">
            <div>
              <span className="text-xs text-cyan-300 font-extrabold uppercase tracking-wide block">
                All India JEE Mock Test #08
              </span>
              <h2 className="text-lg font-black text-white">
                Physics & Chemistry Speed Assessment
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-red-500/20 px-3.5 py-1.5 rounded-xl border border-red-400/40 text-red-100 shadow-inner">
                <Clock className="w-4 h-4 text-red-400 animate-pulse" />
                <span className="font-mono font-black text-sm text-white">
                  {formatTimer(timeRemaining)}
                </span>
              </div>

              {!testSubmitted && (
                <Button
                  onClick={() => setTestSubmitted(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-md h-9 px-4"
                >
                  Submit Examination
                </Button>
              )}
            </div>
          </div>

          {!testSubmitted ? (
            /* Question Layout: 8 Cols Question + 4 Cols Palette */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Question Body */}
              <div className="lg:col-span-8 space-y-4">
                <Card className="rounded-2xl border-gray-200/90 shadow-sm bg-white p-6 sm:p-8 space-y-6">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <span className="font-extrabold text-sm text-gray-800">
                      Question {currentQuestionIndex + 1} of {sampleTestQuestions.length}
                    </span>

                    <button
                      onClick={handleToggleFlag}
                      className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${
                        flaggedQuestions[currentQuestionIndex]
                          ? "bg-amber-100 text-amber-900 border border-amber-200"
                          : "text-gray-500 hover:bg-gray-100 border border-gray-200"
                      }`}
                    >
                      <Flag className="w-3.5 h-3.5" />
                      <span>
                        {flaggedQuestions[currentQuestionIndex]
                          ? "Flagged for Review"
                          : "Mark for Review"}
                      </span>
                    </button>
                  </div>

                  <p className="text-base font-bold text-gray-900 leading-relaxed">
                    {sampleTestQuestions[currentQuestionIndex].question}
                  </p>

                  {/* Options */}
                  <div className="space-y-3 pt-2">
                    {sampleTestQuestions[currentQuestionIndex].options.map(
                      (opt, oIdx) => {
                        const isSelected =
                          selectedAnswers[currentQuestionIndex] === oIdx;
                        return (
                          <div
                            key={oIdx}
                            onClick={() => handleSelectOption(oIdx)}
                            className={`p-4 rounded-xl border cursor-pointer text-xs sm:text-sm transition-all flex items-center gap-3.5 ${
                              isSelected
                                ? "border-[#004B87] bg-[#EAF4FF] text-[#004B87] font-bold shadow-2xs ring-1 ring-[#004B87]"
                                : "border-gray-200 hover:bg-gray-50 text-gray-800"
                            }`}
                          >
                            <span
                              className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
                                isSelected
                                  ? "bg-[#004B87] text-white"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span className="leading-snug">{opt}</span>
                          </div>
                        );
                      }
                    )}
                  </div>

                  {/* Nav buttons */}
                  <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentQuestionIndex === 0}
                      onClick={() =>
                        setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
                      }
                      className="text-xs font-bold gap-1.5 rounded-xl border-gray-200"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Previous
                    </Button>

                    <Button
                      size="sm"
                      onClick={() => {
                        if (currentQuestionIndex < sampleTestQuestions.length - 1) {
                          setCurrentQuestionIndex((prev) => prev + 1);
                        } else {
                          setTestSubmitted(true);
                        }
                      }}
                      className="bg-[#004B87] hover:bg-[#003866] text-white text-xs font-black gap-1.5 rounded-xl px-5"
                    >
                      {currentQuestionIndex === sampleTestQuestions.length - 1
                        ? "Finish Test"
                        : "Save & Next"}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Question Palette Sidebar */}
              <div className="lg:col-span-4 space-y-4">
                <Card className="rounded-2xl border-gray-200/90 shadow-sm bg-white p-5 space-y-4">
                  <h4 className="font-black text-sm text-gray-900">
                    Question Palette
                  </h4>

                  <div className="grid grid-cols-4 gap-2">
                    {sampleTestQuestions.map((q, idx) => {
                      const isAnswered = selectedAnswers[idx] !== undefined;
                      const isFlagged = flaggedQuestions[idx];
                      const isCurrent = currentQuestionIndex === idx;

                      let bg = "bg-gray-100 text-gray-600 border border-gray-200";
                      if (isAnswered) bg = "bg-emerald-500 text-white font-bold";
                      if (isFlagged) bg = "bg-amber-400 text-white font-bold";
                      if (isCurrent) bg += " ring-2 ring-[#004B87]";

                      return (
                        <button
                          key={q.id}
                          onClick={() => setCurrentQuestionIndex(idx)}
                          className={`h-10 rounded-xl text-xs font-bold transition-transform active:scale-95 flex items-center justify-center ${bg}`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-4 border-t border-gray-100 space-y-2 text-[11px] text-gray-500 font-medium">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                      <span>Answered ({Object.keys(selectedAnswers).length})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                      <span>Marked for Review</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-gray-200 inline-block border border-gray-300" />
                      <span>Not Visited</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          ) : (
            /* Results & Solutions View */
            <Card className="rounded-2xl border-gray-200/90 shadow-xl bg-white p-6 sm:p-10 space-y-8">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Award className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">
                  Examination Results
                </h3>
                <p className="text-xs text-gray-500">
                  All India JEE Mock Test #08 • Detailed Evaluation & Solutions
                </p>
              </div>

              {/* Score Summary Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-2xl bg-teal-50 border border-teal-100">
                  <span className="text-2xl font-black text-teal-800">
                    {calculateScore()} / 16
                  </span>
                  <span className="text-[11px] text-teal-700 block mt-1 font-bold">
                    Total Score
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                  <span className="text-2xl font-black text-blue-800">
                    {Math.max(0, Math.round((calculateScore() / 16) * 100))}%
                  </span>
                  <span className="text-[11px] text-blue-700 block mt-1 font-bold">
                    Percentage
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">
                  <span className="text-2xl font-black text-purple-800">AIR 42</span>
                  <span className="text-[11px] text-purple-700 block mt-1 font-bold">
                    Batch Rank
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <span className="text-2xl font-black text-emerald-800">96.5%</span>
                  <span className="text-[11px] text-emerald-700 block mt-1 font-bold">
                    Percentile
                  </span>
                </div>
              </div>

              {/* Solutions List */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="font-black text-base text-gray-900">
                  Detailed Solutions & Explanations
                </h4>

                {sampleTestQuestions.map((q, idx) => {
                  const studentAns = selectedAnswers[idx];
                  const isCorrect = studentAns === q.correctIndex;

                  return (
                    <div
                      key={q.id}
                      className={`p-5 rounded-2xl border text-xs space-y-3 ${
                        isCorrect
                          ? "bg-emerald-50/40 border-emerald-200"
                          : studentAns !== undefined
                          ? "bg-red-50/40 border-red-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-extrabold text-gray-900 text-sm">
                          Q{idx + 1}. {q.question}
                        </span>
                        {isCorrect ? (
                          <Badge className="bg-emerald-600 text-white text-[10px] shrink-0 font-bold">
                            +4 Correct
                          </Badge>
                        ) : studentAns !== undefined ? (
                          <Badge className="bg-red-600 text-white text-[10px] shrink-0 font-bold">
                            -1 Incorrect
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-gray-500 text-[10px] shrink-0">
                            0 Unattempted
                          </Badge>
                        )}
                      </div>

                      <div className="space-y-1 text-gray-700">
                        <div>
                          Your Answer:{" "}
                          <strong className={isCorrect ? "text-emerald-700" : "text-red-700"}>
                            {studentAns !== undefined
                              ? `${String.fromCharCode(65 + studentAns)}. ${q.options[studentAns]}`
                              : "Not Answered"}
                          </strong>
                        </div>
                        <div>
                          Correct Answer:{" "}
                          <strong className="text-emerald-700">
                            {String.fromCharCode(65 + q.correctIndex)}. {q.options[q.correctIndex]}
                          </strong>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-gray-200 text-gray-600 text-[11px] leading-relaxed">
                        <span className="font-bold text-[#004B87] block mb-0.5">Explanation:</span>
                        {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center pt-4">
                <Button
                  onClick={() => {
                    setTestActive(false);
                    setTestSubmitted(false);
                    setSelectedAnswers({});
                  }}
                  className="bg-[#004B87] hover:bg-[#003866] text-white font-black text-xs px-6 py-2.5 rounded-xl shadow-md"
                >
                  Return to Tests Hub
                </Button>
              </div>
            </Card>
          )}
        </div>
      ) : (
        /* Regular Oliveboard-Style Tests Hub View (Matches Screenshot 1) */
        <div className="space-y-8">
          {/* SECTION 1: Exams & Tests Heading + 4 Cards (Matches Oliveboard Screenshot 1) */}
          <div className="space-y-4">
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Exams & Tests
            </h1>

            {/* 4 Pastel Exam Cards with Icons & Arrow (Screenshot 1) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* 1. IIT Exam */}
              <div
                onClick={() => {
                  setTestActive(true);
                  setTestSubmitted(false);
                  setCurrentQuestionIndex(0);
                }}
                className="p-6 rounded-2xl bg-[#E8F4FD] hover:bg-[#DAEDFB] border border-[#CDE5FC] flex flex-col items-center text-center justify-between cursor-pointer transition-all hover:shadow-md group relative min-h-[140px]"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-[#0066CC] mb-2 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-10 h-10 stroke-[2]" />
                </div>
                <div>
                  <h3 className="font-black text-base text-gray-900">IIT Exam</h3>
                  <p className="text-xs text-gray-500 font-medium">(IIT-JEE Advanced)</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 group-hover:translate-x-1 group-hover:text-gray-700 transition-all" />
              </div>

              {/* 2. JEE Exam */}
              <div
                onClick={() => {
                  setTestActive(true);
                  setTestSubmitted(false);
                  setCurrentQuestionIndex(0);
                }}
                className="p-6 rounded-2xl bg-[#FDF0E6] hover:bg-[#FCE4D4] border border-[#FAD7C0] flex flex-col items-center text-center justify-between cursor-pointer transition-all hover:shadow-md group relative min-h-[140px]"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-[#D96B27] mb-2 group-hover:scale-110 transition-transform">
                  <Monitor className="w-9 h-9 stroke-[2]" />
                </div>
                <div>
                  <h3 className="font-black text-base text-gray-900">JEE Exam</h3>
                  <p className="text-xs text-gray-500 font-medium">(JEE Main)</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 group-hover:translate-x-1 group-hover:text-gray-700 transition-all" />
              </div>

              {/* 3. NTSE */}
              <div
                onClick={() => {
                  setTestActive(true);
                  setTestSubmitted(false);
                  setCurrentQuestionIndex(0);
                }}
                className="p-6 rounded-2xl bg-[#E8F8F2] hover:bg-[#D5F5E7] border border-[#CAEDE0] flex flex-col items-center text-center justify-between cursor-pointer transition-all hover:shadow-md group relative min-h-[140px]"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-[#107C41] mb-2 group-hover:scale-110 transition-transform">
                  <Award className="w-9 h-9 stroke-[2]" />
                </div>
                <div>
                  <h3 className="font-black text-base text-gray-900">NTSE</h3>
                  <p className="text-xs text-gray-500 font-medium">
                    (National Talent Search Examination)
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 group-hover:translate-x-1 group-hover:text-gray-700 transition-all" />
              </div>

              {/* 4. Olympiad */}
              <div
                onClick={() => {
                  setTestActive(true);
                  setTestSubmitted(false);
                  setCurrentQuestionIndex(0);
                }}
                className="p-6 rounded-2xl bg-[#F3ECFB] hover:bg-[#EAE0F8] border border-[#DFCEF2] flex flex-col items-center text-center justify-between cursor-pointer transition-all hover:shadow-md group relative min-h-[140px]"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-[#6B3FA0] mb-2 group-hover:scale-110 transition-transform">
                  <Trophy className="w-9 h-9 stroke-[2]" />
                </div>
                <div>
                  <h3 className="font-black text-base text-gray-900">Olympiad</h3>
                  <p className="text-xs text-gray-500 font-medium">
                    (National & International)
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 group-hover:translate-x-1 group-hover:text-gray-700 transition-all" />
              </div>
            </div>
          </div>

          {/* SECTION 2: Test Categories Heading + 4 Cards (Matches Oliveboard Screenshot 1) */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Test Categories
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Sectional Test */}
              <div
                onClick={() => {
                  setTestActive(true);
                  setTestSubmitted(false);
                  setCurrentQuestionIndex(0);
                }}
                className="p-5 rounded-2xl bg-[#EAF5FE] hover:bg-[#D9EDFD] border border-[#CDE5FC] flex items-center justify-between cursor-pointer transition-all hover:shadow-md group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#0066CC] shadow-xs group-hover:scale-105 transition-transform">
                    <ClipboardList className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="font-extrabold text-sm text-gray-900">
                    Sectional Test
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-700 group-hover:translate-x-1 transition-all" />
              </div>

              {/* Topic Test */}
              <div
                onClick={() => {
                  setTestActive(true);
                  setTestSubmitted(false);
                  setCurrentQuestionIndex(0);
                }}
                className="p-5 rounded-2xl bg-[#E8F8F2] hover:bg-[#D4F4E6] border border-[#CAEDE0] flex items-center justify-between cursor-pointer transition-all hover:shadow-md group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#107C41] shadow-xs group-hover:scale-105 transition-transform">
                    <BookOpen className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="font-extrabold text-sm text-gray-900">
                    Topic Test
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-700 group-hover:translate-x-1 transition-all" />
              </div>

              {/* Mock Test */}
              <div
                onClick={() => {
                  setTestActive(true);
                  setTestSubmitted(false);
                  setCurrentQuestionIndex(0);
                }}
                className="p-5 rounded-2xl bg-[#F3ECFB] hover:bg-[#E8DCF7] border border-[#DFCEF2] flex items-center justify-between cursor-pointer transition-all hover:shadow-md group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#6B3FA0] shadow-xs group-hover:scale-105 transition-transform">
                    <Tv2 className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="font-extrabold text-sm text-gray-900">
                    Mock Test
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-700 group-hover:translate-x-1 transition-all" />
              </div>

              {/* Grand Test */}
              <div
                onClick={() => {
                  setTestActive(true);
                  setTestSubmitted(false);
                  setCurrentQuestionIndex(0);
                }}
                className="p-5 rounded-2xl bg-[#FDF0E6] hover:bg-[#FCE3D2] border border-[#FAD4BA] flex items-center justify-between cursor-pointer transition-all hover:shadow-md group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#C65D28] shadow-xs group-hover:scale-105 transition-transform">
                    <Medal className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="font-extrabold text-sm text-gray-900">
                    Grand Test
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-700 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </div>

          {/* SECTION 3: Active Mock Tests & Assignments List */}
          <div className="space-y-4 pt-4">
            <Tabs defaultValue="tests" className="space-y-6">
              <TabsList className="bg-gray-100 p-1 rounded-xl">
                <TabsTrigger value="tests" className="text-xs font-bold rounded-lg">
                  Mock Tests & Chapter Quizzes
                </TabsTrigger>
                <TabsTrigger value="assignments" className="text-xs font-bold rounded-lg">
                  Assignments & Homework Upload
                </TabsTrigger>
              </TabsList>

              <TabsContent value="tests" className="space-y-4">
                {[
                  {
                    title: "All India JEE Mock Test #08 (Full Length)",
                    category: "NTA CBT Simulation",
                    questions: 75,
                    duration: "180 Mins",
                    marks: 300,
                    status: "Available Now",
                  },
                  {
                    title: "Rotational Dynamics & Gravity Chapter Speed Test",
                    category: "Physics Sectional",
                    questions: 25,
                    duration: "45 Mins",
                    marks: 100,
                    status: "Available Now",
                  },
                  {
                    title: "Organic Reaction Mechanisms & Isomerism",
                    category: "Chemistry Topic Test",
                    questions: 20,
                    duration: "40 Mins",
                    marks: 80,
                    status: "Completed (Score: 72/80)",
                  },
                ].map((t, idx) => (
                  <Card
                    key={idx}
                    className="rounded-2xl border-gray-200/90 shadow-2xs bg-white p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <Badge
                          variant="outline"
                          className="border-blue-400 text-[#004B87] bg-blue-50 text-[10px] font-bold"
                        >
                          {t.category}
                        </Badge>
                        <h3 className="text-base font-extrabold text-gray-900">
                          {t.title}
                        </h3>
                        <p className="text-xs text-gray-500 font-medium">
                          {t.questions} Questions • {t.duration} • Total Marks: {t.marks}
                        </p>
                      </div>

                      <Button
                        onClick={() => {
                          setTestActive(true);
                          setTestSubmitted(false);
                          setCurrentQuestionIndex(0);
                        }}
                        className="bg-[#004B87] hover:bg-[#003866] text-white text-xs font-extrabold rounded-xl h-10 px-5 shadow-sm"
                      >
                        Start Simulated Test
                      </Button>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="assignments" className="space-y-4">
                <Card className="rounded-2xl border-gray-200/90 shadow-2xs bg-white p-6 space-y-4">
                  <div>
                    <Badge className="bg-amber-500 text-white text-[10px] font-bold">
                      Due Friday, 11:59 PM
                    </Badge>
                    <h3 className="text-base font-black text-gray-900 mt-1">
                      Assignment #04: Complex Rotational Torque Numerical Set
                    </h3>
                    <p className="text-xs text-gray-500">
                      Solve all 10 problems on paper, scan as single PDF and upload for teacher review.
                    </p>
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:bg-gray-50/70 transition-colors cursor-pointer">
                    <UploadCloud className="w-10 h-10 text-[#004B87] mx-auto mb-2" />
                    <span className="text-xs font-extrabold text-gray-800 block">
                      Drag & Drop Hand-solved PDF here
                    </span>
                    <span className="text-[11px] text-gray-400 block">
                      or click to browse local files (Max 15 MB)
                    </span>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
}
