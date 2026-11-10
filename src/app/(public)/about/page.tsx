import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  GraduationCap,
  Target,
  Compass,
  CheckCircle2,
  Users,
  Trophy,
  BookOpen,
  ArrowRight,
  Shield,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | DeepSiddhi Foundation",
  description: "Our mission, vision, and commitment to shaping India's academic leaders.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#F6F8FC] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge className="bg-[#163B65] text-white hover:bg-[#163B65]">
            About DeepSiddhi Foundation
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#163B65] tracking-tight leading-tight">
            Nurturing Potential. Inspiring Excellence.
          </h1>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Founded by visionary IITians and veteran educators, DeepSiddhi Foundation is committed to democratizing elite-tier competitive coaching with personalized mentoring and cutting-edge pedagogy.
          </p>
        </div>

        {/* Mission and Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="rounded-3xl border-gray-100 shadow-sm bg-white p-8 space-y-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF4FF] text-[#163B65] flex items-center justify-center">
              <Target className="w-6 h-6 text-[#16A6A1]" />
            </div>
            <h3 className="text-2xl font-bold text-[#163B65]">Our Mission</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              To empower every ambitious student in India with deep conceptual understanding, analytical problem-solving capability, and the psychological confidence required to crack premier national examinations without burnout.
            </p>
            <ul className="space-y-2 text-xs text-gray-600 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A6A1]" />
                Zero-compromise faculty quality from top tier institutes
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A6A1]" />
                Affordable and accessible to students across tier-1, tier-2 and tier-3 towns
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A6A1]" />
                Rigorous testing combined with compassionate psychological mentoring
              </li>
            </ul>
          </Card>

          <Card className="rounded-3xl border-gray-100 shadow-sm bg-white p-8 space-y-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF4FF] text-[#163B65] flex items-center justify-center">
              <Compass className="w-6 h-6 text-[#16A6A1]" />
            </div>
            <h3 className="text-2xl font-bold text-[#163B65]">Our Vision</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              To be India&apos;s most trusted and intellectually stimulating online education institution—where foundational curiosity is transformed into lifelong scientific, mathematical, and technological leadership.
            </p>
            <ul className="space-y-2 text-xs text-gray-600 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A6A1]" />
                Continuous innovation in interactive hybrid pedagogy
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A6A1]" />
                100,000+ engineers, researchers, and scientists produced by 2030
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A6A1]" />
                Merit-based scholarships for underprivileged achievers
              </li>
            </ul>
          </Card>
        </div>

        {/* Milestone Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center shadow-sm">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#163B65] block">45,000+</span>
            <span className="text-xs text-gray-500 mt-1 block">Students Empowered</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center shadow-sm">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#16A6A1] block">98.4%</span>
            <span className="text-xs text-gray-500 mt-1 block">JEE Qualification Ratio</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center shadow-sm">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#163B65] block">150+</span>
            <span className="text-xs text-gray-500 mt-1 block">Top 500 AIR Achievers</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center shadow-sm">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#16A6A1] block">4.9 / 5</span>
            <span className="text-xs text-gray-500 mt-1 block">Parent Trust Rating</span>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="bg-gradient-to-r from-[#163B65] to-[#16A6A1] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold">Embark on Your Academic Transformation</h3>
            <p className="text-[#EAF4FF]/80 text-sm mt-1">
              Explore our structured IIT-JEE, Olympiad, and Foundation preparation programs.
            </p>
          </div>
          <Link href="/courses">
            <Button className="bg-white text-[#163B65] hover:bg-[#EAF4FF] font-bold px-6 py-6 rounded-xl shadow-lg flex items-center gap-2">
              Browse All Courses
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
