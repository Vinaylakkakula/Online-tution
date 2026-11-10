import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BookOpen,
  Clock,
  Users,
  Play,
  Star,
  CheckCircle2,
  Calendar,
  FileText,
  Award,
  Video,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Course Details | DeepSiddhi Foundation",
  description: "Comprehensive curriculum, faculty, and batch schedules.",
};

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }];
}

const courseDetails = {
  id: "1",
  title: "IIT-JEE Comprehensive Mastery 2026-27",
  subtitle: "Two-Year Integrated Physics, Chemistry & Mathematics Program for JEE Main & Advanced",
  category: "IIT-JEE",
  targetClass: "Class 11 & 12",
  rating: 4.9,
  ratingCount: 1420,
  enrolledStudents: 12500,
  duration: "24 Months (650+ Hours)",
  totalLessons: 240,
  price: 49999,
  discountedPrice: 34999,
  language: "English & Hindi (Bilingual)",
  faculty: {
    name: "Dr. Rahul Sharma",
    title: "Senior Physics Faculty, Ex-IIT Bombay",
    experience: "15+ Years",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces",
    bio: "Ph.D. in Applied Physics from IIT Bombay. Has mentored over 40+ Top 100 JEE Advanced rankers in the past decade.",
  },
  highlights: [
    "650+ Hours of Live & Recorded Interactive Classes",
    "240+ Comprehensive Video Lectures with 4K clarity",
    "Daily Practice Problems (DPP) with video solutions",
    "60+ All India Mock Tests simulated on official NTA interface",
    "24x7 AI & Faculty Doubt Solving Community",
    "Complete printed & digital study material courier delivered",
    "Personalized 1-on-1 Academic Mentorship & Progress Tracking",
  ],
  curriculum: [
    {
      subject: "Physics",
      chapters: [
        { name: "Kinematics & Newton's Laws of Motion", lessons: 14, hours: "24 hrs" },
        { name: "Work, Energy, Power & Circular Dynamics", lessons: 12, hours: "20 hrs" },
        { name: "Rotational Mechanics & System of Particles", lessons: 18, hours: "32 hrs" },
        { name: "Electrostatics & Current Electricity", lessons: 16, hours: "28 hrs" },
        { name: "Magnetism & Electromagnetic Induction", lessons: 15, hours: "26 hrs" },
        { name: "Optics & Modern Physics", lessons: 20, hours: "36 hrs" },
      ],
    },
    {
      subject: "Chemistry",
      chapters: [
        { name: "Atomic Structure & Periodic Classification", lessons: 12, hours: "20 hrs" },
        { name: "Chemical Bonding & Molecular Structure", lessons: 14, hours: "24 hrs" },
        { name: "Thermodynamics & Chemical Equilibrium", lessons: 16, hours: "28 hrs" },
        { name: "Organic Reaction Mechanisms & Hydrocarbons", lessons: 22, hours: "38 hrs" },
        { name: "Coordination Compounds & Metallurgy", lessons: 12, hours: "20 hrs" },
      ],
    },
    {
      subject: "Mathematics",
      chapters: [
        { name: "Sets, Relations, Functions & Quadratic Equations", lessons: 14, hours: "24 hrs" },
        { name: "Differential & Integral Calculus", lessons: 26, hours: "46 hrs" },
        { name: "Coordinate Geometry (Conics & Lines)", lessons: 18, hours: "32 hrs" },
        { name: "Vectors & 3D Geometry", lessons: 12, hours: "22 hrs" },
        { name: "Probability & Permutations/Combinations", lessons: 14, hours: "25 hrs" },
      ],
    },
  ],
  batches: [
    {
      name: "Pratham Batch (Morning)",
      timing: "7:00 AM - 10:00 AM IST",
      startDate: "15th Nov 2026",
      seatsLeft: 14,
      status: "Filling Fast",
    },
    {
      name: "Sankalp Batch (Evening)",
      timing: "5:00 PM - 8:00 PM IST",
      startDate: "1st Dec 2026",
      seatsLeft: 28,
      status: "Open",
    },
  ],
};

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  return (
    <div className="bg-[#F6F8FC] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#163B65]">Home</Link>
          <span>/</span>
          <Link href="/courses" className="hover:text-[#163B65]">Courses</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate">{courseDetails.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content (2 Columns) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-[#163B65] text-white hover:bg-[#163B65]">
                  {courseDetails.category}
                </Badge>
                <Badge variant="outline" className="border-teal-300 text-teal-800 bg-teal-50">
                  {courseDetails.targetClass}
                </Badge>
                <div className="flex items-center gap-1 text-amber-500 text-sm ml-auto">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-gray-800">{courseDetails.rating}</span>
                  <span className="text-gray-500">({courseDetails.ratingCount} reviews)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#163B65] leading-tight">
                {courseDetails.title}
              </h1>

              <p className="text-gray-600 text-base leading-relaxed">
                {courseDetails.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-3 text-sm text-gray-600 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#16A6A1]" />
                  <span>{courseDetails.enrolledStudents.toLocaleString()}+ Enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#16A6A1]" />
                  <span>{courseDetails.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#16A6A1]" />
                  <span>{courseDetails.totalLessons} Lessons</span>
                </div>
              </div>
            </div>

            {/* Course Highlights */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-[#163B65] flex items-center gap-2">
                <Award className="w-5 h-5 text-[#16A6A1]" />
                What You Get in This Program
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {courseDetails.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#16A6A1] shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Accordion */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#163B65] flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#16A6A1]" />
                    Comprehensive Syllabus & Modules
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Structured topic progression designed by national IIT-JEE top rank mentors
                  </p>
                </div>
              </div>

              <Accordion type="single" collapsible defaultValue="Physics" className="w-full">
                {courseDetails.curriculum.map((subj) => (
                  <AccordionItem key={subj.subject} value={subj.subject} className="border-gray-200">
                    <AccordionTrigger className="text-base font-semibold text-[#163B65] hover:no-underline py-4">
                      <span className="flex items-center gap-3">
                        <GraduationCap className="w-5 h-5 text-[#16A6A1]" />
                        {subj.subject} Curriculum
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-2 pb-4">
                      {subj.chapters.map((chap, cIdx) => (
                        <div
                          key={cIdx}
                          className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-sm"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-white text-xs font-semibold flex items-center justify-center border border-gray-200 text-gray-600">
                              {cIdx + 1}
                            </span>
                            <span className="font-medium text-gray-800">{chap.name}</span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>{chap.lessons} Lectures</span>
                            <span className="font-medium text-gray-700">{chap.hours}</span>
                          </div>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Faculty Details */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-[#163B65]">Lead Master Faculty</h2>
              <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-[#EAF4FF]/40 border border-blue-100">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#163B65] to-[#16A6A1] text-white text-2xl font-bold flex items-center justify-center shrink-0 shadow-md">
                  DRS
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#163B65]">{courseDetails.faculty.name}</h3>
                  <p className="text-sm font-medium text-[#16A6A1]">{courseDetails.faculty.title}</p>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">{courseDetails.faculty.bio}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar / Checkout Card (1 Column) */}
          <div className="space-y-6">
            <Card className="rounded-2xl border-gray-200 shadow-xl overflow-hidden sticky top-24 bg-white">
              <div className="bg-gradient-to-r from-[#163B65] to-[#16A6A1] p-6 text-white text-center">
                <span className="text-xs uppercase tracking-wider text-[#EAF4FF]/80 font-semibold">Special Offer</span>
                <div className="mt-2 flex items-baseline justify-center gap-3">
                  <span className="text-4xl font-extrabold">₹{courseDetails.discountedPrice.toLocaleString()}</span>
                  <span className="text-lg line-through text-white/60">₹{courseDetails.price.toLocaleString()}</span>
                </div>
                <Badge className="mt-2 bg-emerald-500 text-white font-semibold">
                  Save 30% Today
                </Badge>
              </div>

              <CardContent className="p-6 space-y-5">
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Select Available Batch:</h4>
                  {courseDetails.batches.map((batch, bIdx) => (
                    <div
                      key={bIdx}
                      className="p-3.5 rounded-xl border-2 border-teal-500 bg-teal-50/40 relative cursor-pointer"
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-sm text-[#163B65]">{batch.name}</span>
                        <Badge variant="outline" className="border-teal-600 text-teal-800 text-[10px]">
                          {batch.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600 mt-1 flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-teal-600" />
                        <span>Starts {batch.startDate}</span>
                      </div>
                      <div className="text-xs text-gray-600 mt-1 flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-teal-600" />
                        <span>{batch.timing}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 space-y-3">
                  <Link href={`/login?redirect=/dashboard/my-courses&enrol=${resolvedParams.id}`} className="block">
                    <Button className="w-full h-12 bg-[#163B65] hover:bg-[#122e50] text-white font-semibold text-base rounded-xl shadow-lg flex items-center justify-center gap-2">
                      Enroll In Course Now
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>

                  <Link href="/register" className="block">
                    <Button variant="outline" className="w-full h-11 border-gray-300 text-gray-700 font-medium text-sm rounded-xl">
                      Book Free Live Demo Class
                    </Button>
                  </Link>
                </div>

                <div className="pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>7-Day 100% Money-Back Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-blue-600" />
                    <span>Access on Web, Mobile App & Tablet</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
