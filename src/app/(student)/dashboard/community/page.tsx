"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  MessageSquare,
  ThumbsUp,
  Award,
  CheckCircle2,
  Sparkles,
  Send,
  Flag,
  Share2,
  CornerDownRight,
  ShieldCheck,
} from "lucide-react";

interface Post {
  id: string;
  author: string;
  authorRole: "student" | "faculty";
  batch: string;
  subject: string;
  title: string;
  content: string;
  likes: number;
  commentsCount: number;
  timeAgo: string;
  hasFacultyResponse?: boolean;
  facultyAnswer?: {
    facultyName: string;
    facultyRole: string;
    answer: string;
    timeAgo: string;
  };
}

const initialPosts: Post[] = [
  {
    id: "p-1",
    author: "Aryan Sharma",
    authorRole: "student",
    batch: "Pratham Batch (Class 11)",
    subject: "Physics",
    title: "Doubt in Rolling Motion: Does friction always do negative work on a pure rolling cylinder?",
    content: "In pure rolling without slipping, the instantaneous velocity of the contact point is zero. If the contact point doesn't slip, is work done by static friction zero? Why does friction cause angular deceleration in certain questions?",
    likes: 24,
    commentsCount: 5,
    timeAgo: "3 hours ago",
    hasFacultyResponse: true,
    facultyAnswer: {
      facultyName: "Dr. Rahul Sharma",
      facultyRole: "Senior Physics Faculty, Ex-IIT Bombay",
      answer: "Excellent question Aryan! In pure rolling on a stationary surface, static friction does zero net work because the point of application has zero displacement relative to the surface. It only transfers kinetic energy between translational and rotational modes (no thermal dissipation).",
      timeAgo: "1 hour ago",
    },
  },
  {
    id: "p-2",
    author: "Ananya Deshmukh",
    authorRole: "student",
    batch: "Pratham Batch (Class 11)",
    subject: "Chemistry",
    title: "Trick to quickly determine hybridization of central atom in interhalogens like IF7 and ClF3?",
    content: "During timed mock tests, drawing full Lewis structures takes too long. What is the fastest formula used by faculty?",
    likes: 38,
    commentsCount: 8,
    timeAgo: "6 hours ago",
    hasFacultyResponse: true,
    facultyAnswer: {
      facultyName: "Prof. Priya Saxena",
      facultyRole: "Head of Chemistry, M.Tech IIT Delhi",
      answer: "Use Steric Number = 1/2 [V + M - C + A]. For ClF3: V=7 (valence of Cl), M=3 (monovalent F), C=0, A=0 => SN = 1/2 [10] = 5 => sp³d (T-shaped with 2 lone pairs). Under 5 seconds!",
      timeAgo: "4 hours ago",
    },
  },
];

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("Physics");
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const handlePostDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: Post = {
      id: `p-${Date.now()}`,
      author: "Aryan Sharma",
      authorRole: "student",
      batch: "Pratham Batch",
      subject: selectedSubject,
      title: newTitle,
      content: newContent,
      likes: 1,
      commentsCount: 0,
      timeAgo: "Just now",
    };

    setPosts([newPost, ...posts]);
    setNewTitle("");
    setNewContent("");
  };

  const toggleLike = (id: string) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
    setPosts(
      posts.map((p) =>
        p.id === id ? { ...p, likes: liked[id] ? p.likes - 1 : p.likes + 1 } : p
      )
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#163B65]">Academic Doubt Community</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Ask doubts, discuss complex numerical patterns with classmates, and receive verified solutions from master faculty.
        </p>
      </div>

      {/* Ask Doubt Card */}
      <Card className="rounded-3xl border-gray-100 shadow-md bg-white p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-bold text-[#163B65] flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[#16A6A1]" />
          Post a Subject Doubt or Discussion
        </h3>

        <form onSubmit={handlePostDoubt} className="space-y-3">
          <div className="flex gap-2">
            {["Physics", "Chemistry", "Mathematics", "Biology"].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSelectedSubject(s)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                  selectedSubject === s
                    ? "bg-[#163B65] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <Input
            placeholder="Doubt Headline (e.g. Question on Angular Momentum Conservation...)"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="text-xs h-11 border-gray-200"
          />

          <Textarea
            rows={3}
            placeholder="Explain where you are stuck, your intermediate steps, or specific formula ambiguity..."
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="text-xs resize-none border-gray-200"
          />

          <div className="flex justify-end pt-1">
            <Button
              type="submit"
              className="bg-[#16A6A1] hover:bg-[#138e8a] text-white text-xs font-semibold rounded-xl px-5 h-10 gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              Post Doubt to Faculty & Batch
            </Button>
          </div>
        </form>
      </Card>

      {/* Posts List */}
      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className="rounded-3xl border-gray-100 shadow-sm bg-white p-6 sm:p-8 space-y-4">
            {/* Header info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#163B65] to-[#16A6A1] text-white font-bold flex items-center justify-center text-xs">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-gray-900">{post.author}</span>
                    <Badge variant="outline" className="border-gray-200 text-gray-600 text-[10px]">
                      {post.batch}
                    </Badge>
                  </div>
                  <span className="text-[10px] text-gray-400">{post.timeAgo} • {post.subject}</span>
                </div>
              </div>

              {post.hasFacultyResponse && (
                <Badge className="bg-teal-600 text-white text-[10px] gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Faculty Verified
                </Badge>
              )}
            </div>

            {/* Post content */}
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-gray-900 leading-snug">{post.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{post.content}</p>
            </div>

            {/* Faculty Answer Box (Highlighted) */}
            {post.facultyAnswer && (
              <div className="p-4 sm:p-5 rounded-2xl bg-[#EAF4FF]/50 border border-blue-200/70 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#163B65] text-white font-bold text-[10px] flex items-center justify-center">
                      ✓
                    </div>
                    <div>
                      <span className="font-bold text-xs text-[#163B65]">
                        {post.facultyAnswer.facultyName}
                      </span>
                      <span className="text-[10px] text-teal-700 block font-medium">
                        {post.facultyAnswer.facultyRole}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400">{post.facultyAnswer.timeAgo}</span>
                </div>

                <p className="text-xs text-gray-800 leading-relaxed pl-8">
                  {post.facultyAnswer.answer}
                </p>
              </div>
            )}

            {/* Post Footer */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-1.5 transition-colors ${
                    liked[post.id] ? "text-teal-600 font-bold" : "hover:text-[#163B65]"
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{post.likes} Helpful</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{post.commentsCount} Comments</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="hover:text-red-500 flex items-center gap-1 text-[11px]">
                  <Flag className="w-3 h-3" />
                  Report
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
