"use client";

import { useState } from "react";
import { useLMSData, LMSStore, StudentFeedbackEntry } from "@/lib/lms-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Star,
  MessageSquare,
  Search,
  Filter,
  CheckCircle2,
  Reply,
  ShieldAlert,
} from "lucide-react";

export default function AdminFeedbackPage() {
  const { feedback, refreshAll } = useLMSData();
  const [searchTerm, setSearchTerm] = useState("");
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  const filteredFeedback = feedback.filter((f) => {
    return (
      f.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.targetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.comment.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleSendReply = (id: string) => {
    const reply = replyTextMap[id];
    if (!reply || !reply.trim()) return;

    LMSStore.replyFeedback(id, reply.trim());
    setActiveReplyId(null);
    setReplyTextMap((prev) => ({ ...prev, [id]: "" }));
    refreshAll();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-200/90 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-pink-100 text-pink-900 text-xs font-black">
              Student Sentiment & Quality
            </span>
            <span className="text-xs text-amber-600 font-bold flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>4.9 / 5.0 Star Rating Average</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Ratings & Feedback Moderation Center 💬
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-2xl font-medium">
            Read student reviews on teachers, courses, and recorded lessons. Respond directly to student queries and doubts.
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="max-w-md relative">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search feedback by student, teacher or keyword..."
          className="pl-10 h-10 text-xs rounded-xl bg-white border-gray-200"
        />
      </div>

      {/* Feedback Reviews List */}
      <div className="space-y-4">
        {filteredFeedback.map((f) => (
          <Card
            key={f.id}
            className="p-6 rounded-3xl border border-gray-200/90 bg-white shadow-xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-2xl bg-indigo-50 flex items-center justify-center text-2xl shadow-xs">
                  {f.studentAvatar || "🚀"}
                </span>
                <div>
                  <h4 className="text-sm font-black text-gray-900">
                    {f.studentName}
                  </h4>
                  <p className="text-xs text-gray-500 font-medium">
                    {f.classLevel} • {f.targetType}: <span className="font-bold text-[#004B87]">{f.targetName}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      f.rating >= star
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="text-xs text-gray-700 leading-relaxed font-medium bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
              "{f.comment}"
            </p>

            {/* Existing Admin Reply */}
            {f.adminReply && (
              <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-xs space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-900">
                  Mentor Reply Sent:
                </span>
                <p className="text-indigo-950 font-medium">{f.adminReply}</p>
              </div>
            )}

            {/* Reply Actions */}
            <div className="pt-2">
              {activeReplyId === f.id ? (
                <div className="space-y-2">
                  <Textarea
                    placeholder="Write your encouraging mentor response to this student..."
                    value={replyTextMap[f.id] || ""}
                    onChange={(e) =>
                      setReplyTextMap({ ...replyTextMap, [f.id]: e.target.value })
                    }
                    className="rounded-xl text-xs"
                  />
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleSendReply(f.id)}
                      className="bg-[#004B87] hover:bg-[#003866] text-white font-black text-xs rounded-xl"
                    >
                      Post Reply to Student
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveReplyId(null)}
                      className="text-xs text-gray-500 rounded-xl"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveReplyId(f.id)}
                  className="rounded-xl text-xs font-bold gap-1.5"
                >
                  <Reply className="w-3.5 h-3.5" />
                  <span>{f.adminReply ? "Edit Reply" : "Reply to Student"}</span>
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
