import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  Sparkles,
  ArrowRight,
  Star,
  CheckCircle,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expert Faculty | DeepSiddhi Foundation",
  description: "Learn from top educators, IITians, and national Olympiad mentors.",
};

const facultyMembers = [
  {
    id: "1",
    name: "Dr. Rahul Sharma",
    subject: "Physics",
    qualifications: "Ph.D. Applied Physics (IIT Bombay), M.Sc Physics",
    experience: "16+ Years Experience",
    bio: "Pioneer of conceptual visualization in electrodynamics and mechanics. Mentored 40+ Top 100 JEE Advanced rankers including AIR 4 and AIR 19.",
    initials: "RS",
    gradient: "from-blue-600 to-indigo-700",
    badge: "Head of Physics",
    stats: { studentsTaught: "25,000+", topRanks: "120+", rating: 4.9 },
    specialization: ["Electrodynamics", "Rotational Mechanics", "Modern Physics"],
  },
  {
    id: "2",
    name: "Prof. Priya Saxena",
    subject: "Chemistry",
    qualifications: "M.Tech Chemical Sciences (IIT Delhi), CSIR-NET JRF",
    experience: "12+ Years Experience",
    bio: "Expert in Organic Reaction Mechanisms and Coordination Chemistry. Renowned for creating simplified mental reaction maps for rapid problem solving.",
    initials: "PS",
    gradient: "from-teal-600 to-emerald-700",
    badge: "Head of Chemistry",
    stats: { studentsTaught: "18,000+", topRanks: "85+", rating: 4.9 },
    specialization: ["Organic Chemistry", "Chemical Kinetics", "Thermodynamics"],
  },
  {
    id: "3",
    name: "Er. Amit Verma",
    subject: "Mathematics",
    qualifications: "B.Tech Computer Science & Maths (IIT Kanpur)",
    experience: "14+ Years Experience",
    bio: "Passionate mathematician specialized in Calculus and Coordinate Geometry. Authored 3 national best-selling JEE Advanced question workbooks.",
    initials: "AV",
    gradient: "from-purple-600 to-violet-800",
    badge: "Head of Mathematics",
    stats: { studentsTaught: "22,000+", topRanks: "95+", rating: 4.8 },
    specialization: ["Differential Calculus", "Coordinate Conics", "Vectors & 3D"],
  },
  {
    id: "4",
    name: "Dr. Sunita Kulkarni",
    subject: "Biology & Olympiad Mentor",
    qualifications: "Ph.D. Molecular Genetics (AIIMS New Delhi)",
    experience: "11+ Years Experience",
    bio: "National mentor for International Biology Olympiad (IBO) and Junior Science Olympiad (IJSO). Guided 14 students to international medal podiums.",
    initials: "SK",
    gradient: "from-rose-500 to-pink-700",
    badge: "Olympiad Program Lead",
    stats: { studentsTaught: "14,000+", topRanks: "50+ Medals", rating: 4.9 },
    specialization: ["Genetics & Biotech", "Cell Biology", "Ecology"],
  },
  {
    id: "5",
    name: "Er. Vivek Rathore",
    subject: "Mental Ability & NTSE Specialist",
    qualifications: "M.Sc Mathematics, NTSE Scholar",
    experience: "9+ Years Experience",
    bio: "Expert strategist for NTSE Stage 1 & 2 MAT (Mental Ability Test) and foundational aptitude reasoning for classes 8 to 10.",
    initials: "VR",
    gradient: "from-amber-600 to-orange-700",
    badge: "Foundation & NTSE Lead",
    stats: { studentsTaught: "16,500+", topRanks: "300+ Scholars", rating: 4.8 },
    specialization: ["Logical Reasoning", "Pattern Recognition", "Number Theory"],
  },
  {
    id: "6",
    name: "Prof. Rajesh Joshi",
    subject: "Physical Chemistry & Olympiads",
    qualifications: "M.Sc Physical Chemistry (BITS Pilani)",
    experience: "13+ Years Experience",
    bio: "Specialist in Indian National Chemistry Olympiad (INChO) and advanced thermodynamics numerical drills for top JEE rank seekers.",
    initials: "RJ",
    gradient: "from-cyan-600 to-blue-700",
    badge: "Senior Faculty",
    stats: { studentsTaught: "19,000+", topRanks: "70+", rating: 4.9 },
    specialization: ["Quantum Chemistry", "Ionic Equilibrium", "Electrochemistry"],
  },
];

export default function FacultyPage() {
  return (
    <div className="bg-[#F6F8FC] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge className="bg-[#163B65] text-white hover:bg-[#163B65] px-3.5 py-1 text-xs">
            Academic Maestros
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#163B65] tracking-tight">
            Learn From India&apos;s Finest Educators
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Our faculty members are alumni of premier institutions (IITs, AIIMS, BITS) with decades of proven experience producing All India Top Ranks in IIT-JEE, Olympiads, and NTSE.
          </p>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facultyMembers.map((member) => (
            <Card
              key={member.id}
              className="bg-white rounded-2xl border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Card Banner */}
              <div className={`h-28 bg-gradient-to-r ${member.gradient} p-4 relative`}>
                <span className="inline-block px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">
                  {member.badge}
                </span>
              </div>

              {/* Avatar + Main Info */}
              <div className="px-6 pb-6 pt-0 relative flex-1 flex flex-col">
                <div className="flex justify-between items-end -mt-12 mb-4">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-tr ${member.gradient} text-white font-bold text-2xl flex items-center justify-center shadow-lg border-4 border-white`}>
                    {member.initials}
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 text-xs font-bold text-amber-700">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{member.stats.rating} / 5.0</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-[#163B65]">{member.name}</h3>
                  <p className="text-sm font-semibold text-[#16A6A1]">{member.subject} Specialist</p>
                  <p className="text-xs text-gray-500 font-medium">{member.qualifications}</p>
                </div>

                <p className="text-xs text-gray-600 mt-3 line-clamp-3 leading-relaxed">
                  {member.bio}
                </p>

                {/* Focus Areas */}
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                    Key Specialties:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {member.specialization.map((spec, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats Bar */}
                <div className="mt-auto pt-4 border-t border-gray-100 grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <span className="font-bold text-[#163B65] block">{member.stats.studentsTaught}</span>
                    <span className="text-[10px] text-gray-500">Mentored</span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <span className="font-bold text-[#16A6A1] block">{member.stats.topRanks}</span>
                    <span className="text-[10px] text-gray-500">Success Milestones</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA section */}
        <div className="bg-gradient-to-r from-[#163B65] to-[#16A6A1] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold">Have Questions for Our Faculty?</h3>
            <p className="text-[#EAF4FF]/80 text-sm sm:text-base max-w-xl">
              Schedule a 1-on-1 academic counseling session to evaluate your current strengths and map out a study timetable.
            </p>
          </div>
          <Link href="/contact">
            <Button className="bg-white text-[#163B65] hover:bg-[#EAF4FF] font-bold px-6 py-6 rounded-xl shadow-lg flex items-center gap-2">
              Book Academic Counseling
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
