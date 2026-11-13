"use client";

import { useState } from "react";
import { useLMSData, LMSStore, StudentFeedbackEntry } from "@/lib/lms-store";
import { useAuth } from "@/context/auth-context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Star,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  User,
  Heart,
} from "lucide-react";

export default function StudentFeedbackPage() {
  const { user } = useAuth();
  const studentName = user?.full_name || "Aryan Sharma";
  const classLevel = user?.class_level || "Class 8";
  const { feedback, profileExtras, refreshAll } = useLMSData();

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [targetType, setTargetType] = useState<"Teacher" | "Course" | "Recorded Class" | "App">("Teacher");
  const [targetName, setTargetName] = useState("Dr. Rahul Sharma (Physics)");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    LMSStore.addFeedback({
      studentName,
      studentAvatar: "🚀",
      classLevel,
      targetType,
      targetName,
      rating,
      comment: comment.trim(),
    });

    setSubmitted(true);
    setComment("");
    refreshAll();
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-white via-rose-50/20 to-slate-50 rounded-3xl p-6 sm:p-8 text-[#102C50] relative overflow-hidden border border-gray-200/90 shadow-xs">
        <div className="relative z-10 space-y-2">
          <span className="text-xs font-black uppercase tracking-wider bg-rose-100/80 text-rose-900 border border-rose-200/80 px-3 py-1 rounded-full w-fit block">
            ⭐ Your Voice Matters!
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#102C50]">
            Ratings & Feedback Center 💬
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl font-normal">
            Rate your cartoon video lectures, mentors, and practice quizzes. Help us make learning even more fun!
          </p>
        </div>
        <div className="absolute -right-4 -bottom-6 text-8xl sm:text-9xl opacity-10 select-none pointer-events-none">
          ⭐
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Rating Form Column */}
        <Card className="lg:col-span-5 p-6 rounded-3xl border border-gray-200/90 bg-white shadow-xs space-y-5">
          <div className="space-y-1">
            <h3 className="text-base font-black text-gray-900">
              Leave a Review or Report an Issue
            </h3>
            <p className="text-xs text-gray-500">
              Your feedback is directly reviewed by the Academic Director.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 1 to 5 Star Interactive Rating */}
            <div className="space-y-1.5 text-center p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
              <span className="text-xs font-bold text-gray-700 block">
                How would you rate this experience?
              </span>
              <div className="flex items-center justify-center gap-2 pt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="p-1 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        (hoverRating || rating) >= star
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-[11px] font-black text-amber-700 block mt-1">
                {rating === 5 && "🌟 Super Awesome! Loved it!"}
                {rating === 4 && "👍 Very Good lesson!"}
                {rating === 3 && "👌 Good, but can improve"}
                {rating === 2 && "🤔 Needed more practice problems"}
                {rating === 1 && "⚠️ Had difficulty understanding"}
              </span>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-black text-gray-700">Category</Label>
              <Select
                value={targetType}
                onValueChange={(val: any) => setTargetType(val)}
              >
                <SelectTrigger className="rounded-xl text-xs h-10 border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Teacher">Rate Teacher / Faculty</SelectItem>
                  <SelectItem value="Course">Rate Course Content</SelectItem>
                  <SelectItem value="Recorded Class">Rate Video Class</SelectItem>
                  <SelectItem value="App">Report Problem / Bug</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-black text-gray-700">Teacher / Course Name</Label>
              <Input
                value={targetName}
                onChange={(e) => setTargetName(e.target.value)}
                placeholder="e.g. Dr. Rahul Sharma (Physics) or Class 8 Mathematics"
                className="rounded-xl text-xs h-10 border-gray-200"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-black text-gray-700">Your Feedback Comment *</Label>
              <Textarea
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write what you liked or what you want explained in more detail..."
                className="rounded-xl text-xs min-h-[90px] border-gray-200"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-black text-xs h-10 rounded-xl shadow-md gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Submit Review</span>
            </Button>

            {submitted && (
              <p className="text-xs text-emerald-600 font-bold text-center animate-fade-in flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Thank you! Your feedback was submitted successfully! 🎉</span>
              </p>
            )}
          </form>
        </Card>

        {/* Community Reviews List Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider">
              Recent Student Feedback ({feedback.length})
            </h3>
            <span className="text-xs text-amber-600 font-bold flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>4.9 / 5.0 Average Rating</span>
            </span>
          </div>

          <div className="space-y-3">
            {feedback.map((f) => (
              <Card
                key={f.id}
                className="p-5 rounded-3xl border-2 border-indigo-100 bg-white shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center text-xl shadow-xs">
                      {f.studentAvatar || "🚀"}
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-gray-900">
                        {f.studentName}
                      </h4>
                      <p className="text-[10px] text-gray-500">
                        {f.classLevel} • {f.targetType}: <span className="font-bold text-indigo-700">{f.targetName}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          f.rating >= s
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-gray-700 leading-relaxed font-medium">
                  "{f.comment}"
                </p>

                {/* Admin Reply Card */}
                {f.adminReply && (
                  <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-xs space-y-1">
                    <span className="text-[10px] font-black uppercase text-indigo-800 tracking-wider flex items-center gap-1">
                      <span>🎓</span>
                      <span>Academic Mentor Reply:</span>
                    </span>
                    <p className="text-[11px] text-indigo-900 font-medium">
                      {f.adminReply}
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
