"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileCheck2,
  Clock,
  Award,
  AlertCircle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Flag,
  ArrowRight,
  ArrowLeft,
  UploadCloud,
  FileText,
  RotateCcw,
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
    question: "A solid sphere and a hollow sphere of identical mass and radius roll down an inclined plane without slipping from rest. Which sphere reaches the bottom first?",
    options: [
      "Hollow sphere, because of greater moment of inertia",
      "Solid sphere, because it has smaller moment of inertia and thus greater acceleration",
      "Both reach the bottom at the same time since mass and radius are identical",
      "Depends on the angle of inclination of the plane",
    ],
    correctIndex: 1,
    explanation: "Acceleration in rolling down an incline is a = g sin(θ) / (1 + I / (mR²)). For a solid sphere I = 2/5 mR², while for a hollow sphere I = 2/3 mR². Thus solid sphere has higher acceleration and reaches first.",
  },
  {
    id: 2,
    question: "Which of the following carbocations is the MOST stable according to hyperconjugation and resonance effects?",
    options: [
      "Allyl carbocation (CH2=CH-CH2+)",
      "Tropylium cation (C7H7+)",
      "Tert-butyl carbocation ((CH3)3C+)",
      "Benzyl carbocation (C6H5-CH2+)",
    ],
    correctIndex: 1,
    explanation: "Tropylium cation has 6 pi electrons in a planar aromatic 7-membered ring satisfying Huckel's rule (4n+2 with n=1), imparting extraordinary aromatic resonance stability.",
  },
  {
    id: 3,
    question: "If f(x) = x³ - 3x² + 6, find the point of local minimum of f(x) on the real line.",
    options: [
      "x = 0",
      "x = 1",
      "x = 2",
      "x = -2",
    ],
    correctIndex: 2,
    explanation: "f'(x) = 3x² - 6x = 3x(x - 2) = 0 => critical points at x = 0 and x = 2. f''(x) = 6x - 6. At x = 2, f''(2) = 6 > 0, so local minimum occurs at x = 2.",
  },
  {
    id: 4,
    question: "According to Biot-Savart law, the magnetic field dB at distance r from an infinitesimal current element I dl is proportional to:",
    options: [
      "r",
      "1 / r",
      "1 / r²",
      "1 / r³",
    ],
    correctIndex: 2,
    explanation: "dB = (μ₀ / 4π) * (I dl × r̂) / r², so it is inversely proportional to r².",
  },
];

export default function TestsAndAssignmentsPage() {
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
        score += 4; // +4 for correct
      } else if (selectedAnswers[idx] !== undefined) {
        score -= 1; // -1 for incorrect (JEE marking scheme)
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
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#163B65]">Examinations & Assignments</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Simulated NTA examination portal, instant score analysis, detailed solutions, and assignment uploads.
          </p>
        </div>
      </div>

      {testActive ? (
        /* Active Test Taking View */
        <div className="space-y-6">
          {/* Top Exam Header */}
          <div className="bg-[#163B65] text-white p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-md">
            <div>
              <span className="text-xs text-teal-300 font-semibold block">All India JEE Mock Test #08</span>
              <h2 className="text-base font-bold">Physics & Chemistry Speed Assessment</h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-red-500/20 px-3 py-1.5 rounded-xl border border-red-400/40 text-red-200">
                <Clock className="w-4 h-4 text-red-400 animate-pulse" />
                <span className="font-mono font-bold text-sm text-white">
                  {formatTimer(timeRemaining)}
                </span>
              </div>

              {!testSubmitted && (
                <Button
                  onClick={() => setTestSubmitted(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl"
                >
                  Submit Examination
                </Button>
              )}
            </div>
          </div>

          {!testSubmitted ? (
            /* Question Layout: Main + Question Palette */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Question Body (8 Cols) */}
              <div className="lg:col-span-8 space-y-4">
                <Card className="rounded-3xl border-gray-100 shadow-sm bg-white p-6 sm:p-8 space-y-6">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <span className="font-bold text-sm text-gray-700">
                      Question {currentQuestionIndex + 1} of {sampleTestQuestions.length}
                    </span>

                    <button
                      onClick={handleToggleFlag}
                      className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-lg transition-colors ${
                        flaggedQuestions[currentQuestionIndex]
                          ? "bg-amber-100 text-amber-800"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      <Flag className="w-3.5 h-3.5" />
                      <span>{flaggedQuestions[currentQuestionIndex] ? "Flagged for Review" : "Mark for Review"}</span>
                    </button>
                  </div>

                  <p className="text-base font-semibold text-gray-900 leading-relaxed">
                    {sampleTestQuestions[currentQuestionIndex].question}
                  </p>

                  {/* Options */}
                  <div className="space-y-3 pt-2">
                    {sampleTestQuestions[currentQuestionIndex].options.map((opt, oIdx) => {
                      const isSelected = selectedAnswers[currentQuestionIndex] === oIdx;
                      return (
                        <div
                          key={oIdx}
                          onClick={() => handleSelectOption(oIdx)}
                          className={`p-4 rounded-xl border cursor-pointer text-xs sm:text-sm transition-all flex items-center gap-3 ${
                            isSelected
                              ? "border-teal-500 bg-teal-50/50 text-[#163B65] font-semibold ring-1 ring-teal-500"
                              : "border-gray-200 hover:bg-gray-50 text-gray-700"
                          }`}
                        >
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                              isSelected
                                ? "bg-[#16A6A1] text-white"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="leading-snug">{opt}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Nav buttons */}
                  <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentQuestionIndex === 0}
                      onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                      className="text-xs gap-1.5 rounded-xl"
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
                      className="bg-[#163B65] hover:bg-[#122e50] text-white text-xs gap-1.5 rounded-xl px-5"
                    >
                      {currentQuestionIndex === sampleTestQuestions.length - 1 ? "Finish Test" : "Save & Next"}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Question Palette Sidebar (4 Cols) */}
              <div className="lg:col-span-4 space-y-4">
                <Card className="rounded-3xl border-gray-100 shadow-sm bg-white p-5 space-y-4">
                  <h4 className="font-bold text-sm text-[#163B65]">Question Palette</h4>

                  <div className="grid grid-cols-4 gap-2">
                    {sampleTestQuestions.map((q, idx) => {
                      const isAnswered = selectedAnswers[idx] !== undefined;
                      const isFlagged = flaggedQuestions[idx];
                      const isCurrent = currentQuestionIndex === idx;

                      let bg = "bg-gray-100 text-gray-600";
                      if (isAnswered) bg = "bg-emerald-500 text-white font-bold";
                      if (isFlagged) bg = "bg-amber-400 text-white font-bold";
                      if (isCurrent) bg += " ring-2 ring-[#163B65]";

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

                  <div className="pt-4 border-t border-gray-100 space-y-2 text-[11px] text-gray-500">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                      <span>Answered</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                      <span>Marked for Review</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-gray-200 inline-block" />
                      <span>Not Visited</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          ) : (
            /* Results & Solutions Breakdown */
            <Card className="rounded-3xl border-gray-100 shadow-xl bg-white p-6 sm:p-10 space-y-8">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Award className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#163B65]">Examination Results</h3>
                <p className="text-xs text-gray-500">All India JEE Mock Test #08 • Detailed Evaluation</p>
              </div>

              {/* Score summary cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-2xl bg-teal-50 border border-teal-100">
                  <span className="text-2xl font-black text-teal-800">{calculateScore()} / 16</span>
                  <span className="text-[11px] text-teal-700 block mt-1 font-semibold">Total Score</span>
                </div>
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                  <span className="text-2xl font-black text-blue-800">
                    {Math.round((calculateScore() / 16) * 100)}%
                  </span>
                  <span className="text-[11px] text-blue-700 block mt-1 font-semibold">Percentage</span>
                </div>
                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">
                  <span className="text-2xl font-black text-purple-800">AIR 42</span>
                  <span className="text-[11px] text-purple-700 block mt-1 font-semibold">Batch Rank</span>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <span className="text-2xl font-black text-emerald-800">96.5%</span>
                  <span className="text-[11px] text-emerald-700 block mt-1 font-semibold">Percentile</span>
                </div>
              </div>

              {/* Solutions List */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="font-bold text-base text-[#163B65]">Detailed Solutions & Explanations</h4>

                {sampleTestQuestions.map((q, idx) => {
                  const studentAns = selectedAnswers[idx];
                  const isCorrect = studentAns === q.correctIndex;

                  return (
                    <div
                      key={q.id}
                      className={`p-5 rounded-2xl border text-xs space-y-3 ${
                        isCorrect
                          ? "bg-emerald-50/30 border-emerald-200"
                          : studentAns !== undefined
                          ? "bg-red-50/30 border-red-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-bold text-gray-900 text-sm">
                          Q{idx + 1}. {q.question}
                        </span>
                        {isCorrect ? (
                          <Badge className="bg-emerald-500 text-white text-[10px] shrink-0">
                            +4 Correct
                          </Badge>
                        ) : studentAns !== undefined ? (
                          <Badge className="bg-red-500 text-white text-[10px] shrink-0">
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

                      <div className="p-3 rounded-xl bg-white border border-gray-100 text-gray-600 text-[11px] leading-relaxed">
                        <span className="font-bold text-[#163B65] block mb-0.5">Explanation:</span>
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
                  className="bg-[#163B65] text-white rounded-xl"
                >
                  Return to Tests Hub
                </Button>
              </div>
            </Card>
          )}
        </div>
      ) : (
        /* Tests Hub Tabs: Active Tests & Assignment Uploads */
        <Tabs defaultValue="tests" className="space-y-6">
          <TabsList className="bg-gray-100 p-1 rounded-xl">
            <TabsTrigger value="tests" className="text-xs font-semibold rounded-lg">
              Mock Tests & Chapter Quizzes
            </TabsTrigger>
            <TabsTrigger value="assignments" className="text-xs font-semibold rounded-lg">
              Assignments & Homework Upload
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tests" className="space-y-4">
            {[
              {
                title: "All India JEE Mock Test #08 (Current)",
                category: "Full Length Mock",
                questions: 75,
                duration: "180 Mins",
                marks: 300,
                status: "Available",
                activeNow: true,
              },
              {
                title: "Rotational Dynamics & Gravity Chapter Speed Test",
                category: "Physics Topic Test",
                questions: 25,
                duration: "45 Mins",
                marks: 100,
                status: "Available",
              },
              {
                title: "Reaction Mechanisms & Isomerism Quiz",
                category: "Chemistry Chapter Test",
                questions: 20,
                duration: "40 Mins",
                marks: 80,
                status: "Completed (Score: 72/80)",
              },
            ].map((t, idx) => (
              <Card key={idx} className="rounded-2xl border-gray-100 shadow-sm bg-white p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <Badge variant="outline" className="border-teal-400 text-teal-800 text-[10px]">
                      {t.category}
                    </Badge>
                    <h3 className="text-base font-bold text-gray-900">{t.title}</h3>
                    <p className="text-xs text-gray-500">
                      {t.questions} Questions • {t.duration} • Total Marks: {t.marks}
                    </p>
                  </div>

                  <Button
                    onClick={() => {
                      setTestActive(true);
                      setTestSubmitted(false);
                      setCurrentQuestionIndex(0);
                    }}
                    className="bg-[#163B65] hover:bg-[#122e50] text-white text-xs font-semibold rounded-xl h-10 px-5"
                  >
                    Start Simulated Test
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="assignments" className="space-y-4">
            <Card className="rounded-2xl border-gray-100 shadow-sm bg-white p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <Badge className="bg-amber-500 text-white text-[10px]">Due Friday, 11:59 PM</Badge>
                  <h3 className="text-base font-bold text-gray-900 mt-1">
                    Assignment #04: Complex Rotational Torque Numerical Set
                  </h3>
                  <p className="text-xs text-gray-500">Solve all 10 problems on paper, scan as single PDF and upload.</p>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                <UploadCloud className="w-8 h-8 text-[#16A6A1] mx-auto mb-2" />
                <span className="text-xs font-bold text-gray-800 block">Drag & Drop Hand-solved PDF here</span>
                <span className="text-[10px] text-gray-400 block">or click to browse local files (Max 15 MB)</span>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
