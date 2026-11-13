import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BookOpen,
  Sparkles,
  Rocket,
  Star,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Users,
  Trophy,
  Play,
  Clock,
  Compass,
  FolderOpen,
  ShieldCheck,
  Award,
  Flame,
  Zap,
  Brain,
  Video,
  Layers,
  MessageSquare,
  HelpCircle,
  Check,
  ChevronRight,
  Gift,
  FileCheck2,
} from "lucide-react";
import { CartoonHeroVisual } from "@/components/home/cartoon-hero-visual";

// 7 Interactive Learning Categories (Section 4.C)
const learningCategories = [
  {
    id: "math",
    name: "Mathematics",
    gradeRange: "Classes 6th - 10th",
    icon: "📐",
    mascot: "🚀",
    color: "from-blue-500/10 to-indigo-500/15 border-blue-200 text-blue-900",
    badgeColor: "bg-blue-100 text-blue-800",
    description:
      "Master algebra, geometry, fractions, probability & logic puzzles through visual problem-solving.",
    topics: ["Algebra & Equations", "Coordinate Geometry", "Trigonometry & Mensuration"],
  },
  {
    id: "science",
    name: "General Science",
    gradeRange: "Classes 6th - 10th",
    icon: "🔬",
    mascot: "🦖",
    color: "from-emerald-500/10 to-teal-500/15 border-emerald-200 text-emerald-900",
    badgeColor: "bg-emerald-100 text-emerald-800",
    description:
      "Explore the wonders of physical world, chemical reactions, cell biology, and interactive experiments.",
    topics: ["Force & Motion", "Chemical Reactions", "Living Systems & Anatomy"],
  },
  {
    id: "english",
    name: "English Literature & Grammar",
    gradeRange: "Classes 6th - 10th",
    icon: "📖",
    mascot: "🦉",
    color: "from-amber-500/10 to-orange-500/15 border-amber-200 text-amber-900",
    badgeColor: "bg-amber-100 text-amber-800",
    description:
      "Build immaculate grammar, advanced vocabulary, reading comprehension, and expressive creative writing.",
    topics: ["Tenses & Clauses", "Reading Comprehension", "Creative Essay Writing"],
  },
  {
    id: "social",
    name: "Social Science",
    gradeRange: "Classes 6th - 10th",
    icon: "🌍",
    mascot: "🥷",
    color: "from-purple-500/10 to-violet-500/15 border-purple-200 text-purple-900",
    badgeColor: "bg-purple-100 text-purple-800",
    description:
      "Travel through historical civilizations, earth geography, resources, and civic democratic governance.",
    topics: ["Freedom Struggle", "Physical Geography", "Indian Constitution & Rights"],
  },
  {
    id: "physics",
    name: "Physics Explorers",
    gradeRange: "Classes 8th - 10th",
    icon: "⚛️",
    mascot: "🤖",
    color: "from-cyan-500/10 to-sky-500/15 border-cyan-200 text-cyan-900",
    badgeColor: "bg-cyan-100 text-cyan-800",
    description:
      "Uncover gravitational forces, electricity, sound waves, optics, and energy conservation principles.",
    topics: ["Laws of Motion", "Light & Reflection", "Current & Magnetism"],
  },
  {
    id: "chemistry",
    name: "Chemistry Lab",
    gradeRange: "Classes 8th - 10th",
    icon: "🧪",
    mascot: "⚡",
    color: "from-pink-500/10 to-rose-500/15 border-pink-200 text-pink-900",
    badgeColor: "bg-pink-100 text-pink-800",
    description:
      "Decipher periodic tables, atomic bonds, acids, bases, chemical kinetics, and laboratory demonstrations.",
    topics: ["Atomic Structure", "Periodic Trends", "Acids, Bases & Salts"],
  },
  {
    id: "biology",
    name: "Biology & Life Sciences",
    gradeRange: "Classes 8th - 10th",
    icon: "🌱",
    mascot: "🦋",
    color: "from-teal-500/10 to-green-500/15 border-teal-200 text-teal-900",
    badgeColor: "bg-teal-100 text-teal-800",
    description:
      "Learn cellular reproduction, plant physiology, human health, genetics, and ecosystem biodiversity.",
    topics: ["Cell Division", "Heredity & Evolution", "Human Organ Systems"],
  },
];

// 4 Steps: How Learning Works (Section 4.D)
const learningSteps = [
  {
    step: "01",
    title: "Choose Your Class",
    description:
      "Select your grade from Class 6th to 10th. All courses align with CBSE, ICSE, and State Board curriculum.",
    icon: "🎒",
    color: "bg-blue-50 text-blue-600 border-blue-200",
  },
  {
    step: "02",
    title: "Explore Subject Folders",
    description:
      "Click into dedicated subject subfolders: Chapters, Recorded Video Classes, Revision Notes, and Mind Maps.",
    icon: "📁",
    color: "bg-indigo-50 text-indigo-600 border-indigo-200",
  },
  {
    step: "03",
    title: "Watch Interactive Lessons",
    description:
      "Learn at your own pace with 0.75x–2x speed playback, resume tracking, and 1-click video bookmarks.",
    icon: "🎥",
    color: "bg-amber-50 text-amber-600 border-amber-200",
  },
  {
    step: "04",
    title: "Practice & Win Rewards",
    description:
      "Ace chapter-wise CBT quizzes, level up cartoon avatars, win Gold Scholar badges, and maintain daily streaks!",
    icon: "🏆",
    color: "bg-emerald-50 text-emerald-600 border-emerald-200",
  },
];

// 8 Why Choose Us Feature Cards (Section 4.F)
const features = [
  {
    icon: Users,
    title: "Expert Educators",
    description:
      "Learn from passionate educators and IIT alumni who simplify complex concepts with real-world examples.",
    badge: "Top Mentors",
  },
  {
    icon: Brain,
    title: "Interactive Learning",
    description:
      "Say goodbye to passive memorization! Engage with colorful diagrams, chapter quizzes, and visual demos.",
    badge: "100% Active",
  },
  {
    icon: Video,
    title: "Recorded Video Classes",
    description:
      "Access 5,000+ HD recorded lectures 24/7 with playback speed controls (0.75x to 2x) and instant resume.",
    badge: "On-Demand",
  },
  {
    icon: FolderOpen,
    title: "Chapter-wise Subfolders",
    description:
      "Clean, intuitive folder navigation: Mathematics, Physics, Chemistry, Biology, English & Social Studies.",
    badge: "Zero Clutter",
  },
  {
    icon: FileCheck2,
    title: "Smart Practice Tests",
    description:
      "Chapter CBT tests with timers, instant grading, detailed answer explanations, and performance scores.",
    badge: "Instant Marks",
  },
  {
    icon: Trophy,
    title: "Progress Tracking",
    description:
      "Live student dashboard tracking attendance percentage, completed lessons, subject marks, and report cards.",
    badge: "Parent Trusted",
  },
  {
    icon: Sparkles,
    title: "Student-Friendly Interface",
    description:
      "A bright, kid-friendly interface inspired by Duolingo & Khan Academy with zero ads or distractions.",
    badge: "Child Safe",
  },
  {
    icon: Gift,
    title: "Affordable Learning",
    description:
      "Transparent monthly subscription pricing starting at ₹1,499/mo, plus a risk-free 7-day free demo trial.",
    badge: "7-Day Trial",
  },
];

// Student & Parent Testimonials (Section 4.G)
const testimonials = [
  {
    name: "Arjun Sharma",
    role: "Class 8 Student • New Delhi",
    avatar: "🚀",
    stars: 5,
    title: "Math is now my favorite subject!",
    content:
      "Before DeepSiddhi, fractions and geometry felt scary. The animated videos and folder system made every chapter clear. I leveled up my Astro Leo avatar to Level 8 and scored 96% in my term exams!",
  },
  {
    name: "Dr. Meenakshi Sundaram",
    role: "Parent of Class 10 Student • Bengaluru",
    avatar: "👩‍⚕️",
    stars: 5,
    title: "True conceptual clarity without stress.",
    content:
      "As a doctor, I wanted a learning platform that focuses on deep scientific understanding rather than rote cramming. The chapter subfolders and smart tests have made my daughter completely confident for her 10th boards.",
  },
  {
    name: "Sneha Reddy",
    role: "Class 7 Student • Hyderabad",
    avatar: "🦖",
    stars: 5,
    title: "The 7-Day Trial convinced my parents instantly!",
    content:
      "We took the 7-day free trial and I was hooked on day one! The speed controls let me revise science lectures at 1.5x before school tests. The bookmarks feature is super handy.",
  },
  {
    name: "Rajesh Malhotra",
    role: "Parent of Class 6 Student • Mumbai",
    avatar: "👨‍💼",
    stars: 5,
    title: "Best EdTech platform for young students.",
    content:
      "The interface is so clean, child-friendly, and distraction-free. The daily attendance tracker and monthly progress reports give me total peace of mind regarding my son's study habits.",
  },
];

// Frequently Asked Questions (Section 4.I)
const faqs = [
  {
    question: "How do I register for the 7-day free trial?",
    answer:
      "Simply click 'Start Free Demo (7 Days)', choose your child's grade (Classes 6th to 10th), and enter your basic contact information. You will get immediate 7-day full access without any credit card or upfront payment.",
  },
  {
    question: "What is included in the free demo trial?",
    answer:
      "During the 7-day trial, students get complete access to all subjects, chapter subfolders, recorded video lessons, downloadable formula cards, and interactive chapter practice tests for their selected class.",
  },
  {
    question: "Which classes and school boards are supported?",
    answer:
      "DeepSiddhi Foundation supports Classes 6th, 7th, 8th, 9th, and 10th across CBSE, ICSE, and all major Indian State Boards. All chapters are structured strictly according to the latest NCERT and board syllabi.",
  },
  {
    question: "How do subject and chapter subfolders work?",
    answer:
      "When a student opens their course, all subjects (Mathematics, Science, English, Social Studies) appear as neat folders. Clicking any subject opens its chapters, and clicking a chapter opens its video lessons, PDFs, and tests.",
  },
  {
    question: "Can students watch recorded classes on mobile and tablets?",
    answer:
      "Yes! Our video player works smoothly on Android phones, iPhones, iPads, tablets, and laptops. Students can adjust playback speed (0.75x to 2x), resume where they stopped, and bookmark favorite lessons.",
  },
  {
    question: "How does the monthly course pricing and discount coupons work?",
    answer:
      "We offer affordable monthly subscription plans tailored for each class with no lock-in. You can apply promotional coupon codes like CARTOON50 or KIDS2026 at checkout for special seasonal discounts.",
  },
];

export default function HomePage() {
  return (
    <div className="overflow-x-hidden bg-[#F5F8FF]">
      {/* ======================================================== */}
      {/* SECTION 4.B: HERO SECTION (LIGHT, AIRY & CHILD-FRIENDLY) */}
      {/* ======================================================== */}
      <section className="relative min-h-[85vh] flex items-center pt-8 pb-16 lg:py-20 overflow-hidden bg-gradient-to-b from-[#F5F8FF] via-white to-[#F5F8FF]">
        {/* Soft Radial Ambient Glows */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#1769AA]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#38D9E6]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-80 h-80 bg-[#FFD447]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Delicate Dot Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(#102C50 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Headline & Messaging */}
            <div className="lg:col-span-6 text-center lg:text-left space-y-6">
              {/* Trust Pill */}
              <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md text-[#102C50] text-xs sm:text-sm px-4 py-2 rounded-full border border-blue-200/80 shadow-xs">
                <Rocket className="w-4 h-4 text-[#1769AA] animate-pulse" />
                <span className="font-bold">Next-Gen LMS for Classes 6th to 10th</span>
                <span className="bg-[#FFD447] text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                  FREE TRIAL
                </span>
              </div>

              {/* Main Headline (Requirement 4.B) */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#102C50] leading-[1.15] tracking-tight">
                Learning Is an Adventure.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1769AA] via-[#0284C7] to-[#16A6A1]">
                  Your Success Is the Reward! 🚀
                </span>
              </h1>

              {/* Supporting Text (Requirement 4.B) */}
              <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Explore exciting lessons, play interactive quizzes, unlock achievements, and become a classroom champion with DeepSiddhi Foundation.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3.5 justify-center lg:justify-start">
                <Link href="/demo" className="w-full sm:w-auto">
                  <Button
                    size="xl"
                    className="w-full sm:w-auto bg-[#1769AA] hover:bg-[#102C50] text-white font-extrabold shadow-lg shadow-blue-500/20 hover:shadow-xl hover:scale-105 transition-all text-base px-7 h-13 rounded-2xl border-0 gap-2 cursor-pointer"
                  >
                    <span>Start Your Free 7-Day Trial</span>
                    <Rocket className="w-4 h-4" />
                  </Button>
                </Link>

                <Link href="/courses" className="w-full sm:w-auto">
                  <Button
                    size="xl"
                    variant="outline"
                    className="w-full sm:w-auto border-2 border-gray-200 bg-white hover:bg-gray-50 text-[#102C50] font-bold text-base px-6 h-13 rounded-2xl transition-all hover:scale-105 gap-2 cursor-pointer shadow-xs"
                  >
                    <BookOpen className="w-4 h-4 text-[#1769AA]" />
                    <span>Explore Courses</span>
                  </Button>
                </Link>
              </div>

              {/* Feature Highlights Bar */}
              <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs font-semibold text-gray-600">
                <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-gray-200/80 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Subject Subfolders
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-gray-200/80 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1769AA]" />
                  Recorded Videos
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-gray-200/80 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                  Cartoon Avatars
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-gray-200/80 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-500" />
                  7-Day Demo
                </span>
              </div>

              {/* Trust Indicators (Section 4.B) */}
              <div className="pt-2 flex items-center gap-4 justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {["🚀", "🦖", "🤖", "🦉"].map((mascot, i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#38D9E6] to-[#1769AA] border-2 border-white flex items-center justify-center text-sm shadow-xs"
                    >
                      {mascot}
                    </div>
                  ))}
                </div>
                <div className="text-left text-xs">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-[#FFD447] text-[#FFD447]"
                      />
                    ))}
                    <span className="font-extrabold text-[#102C50] ml-1">4.9/5</span>
                  </div>
                  <p className="text-gray-500 mt-0.5 font-medium">
                    Trusted by <strong className="text-[#102C50] font-bold">50,000+</strong> students & parents across India
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Component with Paper Rockets, Books & Badges */}
            <div className="lg:col-span-6 w-full">
              <CartoonHeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* Grade Quick Selector Strip */}
      <section className="py-4 bg-white border-y border-blue-100/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-center md:text-left">
              <span className="text-2xl animate-bounce">🎒</span>
              <p className="font-extrabold text-[#102C50] text-sm">
                Jump Straight Into Your Grade:
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { label: "Class 6th 🚀", href: "/courses?class=Class+6" },
                { label: "Class 7th 🦖", href: "/courses?class=Class+7" },
                { label: "Class 8th 🤖", href: "/courses?class=Class+8" },
                { label: "Class 9th 🦉", href: "/courses?class=Class+9" },
                { label: "Class 10th 🥷", href: "/courses?class=Class+10" },
              ].map((g) => (
                <Link
                  key={g.label}
                  href={g.href}
                  className="px-3.5 py-1.5 rounded-xl bg-gray-50 hover:bg-[#1769AA] hover:text-white text-[#102C50] font-bold text-xs border border-gray-200 transition-all hover:scale-105 shadow-2xs"
                >
                  {g.label}
                </Link>
              ))}
              <Link
                href="/demo"
                className="px-3.5 py-1.5 rounded-xl bg-[#FFD447] hover:bg-amber-300 text-slate-950 font-black text-xs shadow-2xs transition-all hover:scale-105"
              >
                7-Day Free Demo 🎁
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 4.C: INTERACTIVE LEARNING CATEGORIES */}
      {/* ======================================================== */}
      <section id="subjects" className="py-20 bg-[#F5F8FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#1769AA] text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>Classes 6th to 10th Curriculum</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#102C50] tracking-tight">
              Choose Your Learning Adventure
            </h2>
            <p className="text-base text-gray-600 font-normal">
              Dive into colorful subjects mapped for school exams, Olympiads, and foundation success with interactive subfolders, video lessons, and fun quizzes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {learningCategories.map((subject) => (
              <Card
                key={subject.id}
                className="p-6 rounded-3xl bg-white border border-gray-200/90 shadow-2xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Icon & Grade Pill */}
                  <div className="flex items-center justify-between">
                    <span className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-3xl border border-gray-100 group-hover:scale-110 transition-transform">
                      {subject.icon}
                    </span>
                    <span className="text-[11px] font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                      {subject.gradeRange}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-[#102C50] group-hover:text-[#1769AA] transition-colors">
                      {subject.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1.5 leading-relaxed font-normal">
                      {subject.description}
                    </p>
                  </div>

                  {/* Sample Topics */}
                  <div className="space-y-1.5 pt-2 border-t border-gray-100">
                    {subject.topics.map((t, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1.5 text-[11px] text-gray-600"
                      >
                        <Check className="w-3 h-3 text-[#16A6A1] shrink-0" />
                        <span className="truncate">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-gray-100">
                  <Link
                    href={`/courses?subject=${encodeURIComponent(subject.name)}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gray-50 group-hover:bg-[#1769AA] text-[#102C50] group-hover:text-white font-bold text-xs transition-colors"
                  >
                    <span>Explore {subject.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/courses">
              <Button
                size="lg"
                className="bg-[#102C50] hover:bg-[#1769AA] text-white font-bold text-sm px-7 rounded-2xl shadow-sm gap-2"
              >
                <FolderOpen className="w-4 h-4 text-[#38D9E6]" />
                <span>Open Complete Subject Subfolders</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 4.D: HOW LEARNING WORKS (4-STEP JOURNEY) */}
      {/* ======================================================== */}
      <section className="py-20 bg-white border-t border-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Simple 4-Step Learning Model</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#102C50] tracking-tight">
              How DeepSiddhi Works
            </h2>
            <p className="text-base text-gray-600 font-normal">
              A playful, structured, and rewarding learning journey designed to make young students confident and exam-ready.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {learningSteps.map((s, i) => (
              <div
                key={s.step}
                className="relative bg-gray-50/70 rounded-3xl p-6 border border-gray-200/80 hover:bg-white hover:shadow-lg transition-all duration-300 space-y-4 group"
              >
                {/* Step Pill */}
                <div className="flex items-center justify-between">
                  <span className="w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-2xl shadow-2xs group-hover:scale-110 transition-transform">
                    {s.icon}
                  </span>
                  <span className="text-2xl font-black text-gray-300 group-hover:text-[#1769AA] transition-colors">
                    {s.step}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg font-black text-[#102C50]">
                    {s.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-normal">
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 4.E: GAMIFICATION (DUOLINGO-INSPIRED MOTIVATION) */}
      {/* ======================================================== */}
      <section className="py-20 bg-gradient-to-b from-[#F5F8FF] to-white border-t border-blue-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
              <span>Gamified Learning Engine</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#102C50] tracking-tight">
              Study More. Play More. Achieve More!
            </h2>
            <p className="text-base text-gray-600 font-normal">
              Turn homework into an exciting quest! Unlock cartoon avatars, maintain daily streaks, earn Scholar XP, and climb the leaderboard.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Card 1: Cartoon Avatars Showcase */}
            <Card className="p-7 rounded-3xl bg-white border border-gray-200/90 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-[#102C50] flex items-center gap-2">
                  <span>🚀</span>
                  <span>10+ Cartoon Avatars</span>
                </h3>
                <span className="text-xs font-bold text-[#1769AA] bg-blue-50 px-2.5 py-0.5 rounded-full">
                  Customizable
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed font-normal">
                Students can pick their favorite character and unlock custom glowing avatar frames as they complete weekly lessons.
              </p>
              <div className="flex items-center justify-around py-3 bg-gray-50 rounded-2xl border border-gray-100">
                {[
                  { emoji: "🚀", name: "Astro Leo" },
                  { emoji: "🦖", name: "Dino Rex" },
                  { emoji: "🤖", name: "Robo Pixel" },
                  { emoji: "🦉", name: "Prof Owl" },
                  { emoji: "🥷", name: "Cyber Ninja" },
                ].map((a) => (
                  <div key={a.name} className="flex flex-col items-center">
                    <span className="text-3xl hover:scale-125 transition-transform cursor-pointer">
                      {a.emoji}
                    </span>
                    <span className="text-[10px] font-bold text-gray-600 mt-1">
                      {a.name}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Card 2: Streak & XP Engine */}
            <Card className="p-7 rounded-3xl bg-white border border-gray-200/90 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-[#102C50] flex items-center gap-2">
                  <span>🔥</span>
                  <span>Daily Learning Streaks</span>
                </h3>
                <span className="text-xs font-bold text-orange-700 bg-orange-50 px-2.5 py-0.5 rounded-full">
                  1.5x XP Boost
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed font-normal">
                Maintain study consistency! Students who practice 20 minutes a day maintain their flame streak and earn double rewards.
              </p>
              <div className="grid grid-cols-3 gap-2.5 py-2">
                <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 text-center">
                  <p className="text-xl font-black text-amber-600">1,250</p>
                  <p className="text-[10px] text-gray-500 font-semibold uppercase">Scholar XP</p>
                </div>
                <div className="p-3 rounded-2xl bg-orange-50/70 border border-orange-200 text-center">
                  <p className="text-xl font-black text-orange-600">7 Days</p>
                  <p className="text-[10px] text-gray-500 font-semibold uppercase">Hot Streak</p>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center">
                  <p className="text-xl font-black text-emerald-600">Level 7</p>
                  <p className="text-[10px] text-gray-500 font-semibold uppercase">Rank Status</p>
                </div>
              </div>
            </Card>

            {/* Card 3: Badges & Quests */}
            <Card className="p-7 rounded-3xl bg-white border border-gray-200/90 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-[#102C50] flex items-center gap-2">
                  <span>🏆</span>
                  <span>Badges & Achievements</span>
                </h3>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  Win Medals
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed font-normal">
                Unlock honors for mastering science chapters, acing speed math tests, or finishing homework before 7 PM!
              </p>
              <div className="flex items-center justify-between gap-2 py-1">
                {[
                  { icon: "🥇", label: "Math Genius" },
                  { icon: "⚡", label: "Speed Demon" },
                  { icon: "🔬", label: "Science Whiz" },
                  { icon: "🎯", label: "Bullseye" },
                ].map((b) => (
                  <div
                    key={b.label}
                    className="flex-1 p-2 bg-gray-50 rounded-xl border border-gray-100 text-center"
                  >
                    <span className="text-2xl">{b.icon}</span>
                    <p className="text-[9px] font-bold text-gray-700 mt-0.5 leading-tight">
                      {b.label}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 4.F: WHY CHOOSE DEEPSIDDHI (8 PREMIUM CARDS) */}
      {/* ======================================================== */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#1769AA] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>International EdTech Standard</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#102C50] tracking-tight">
              Why Parents & Students Choose Us
            </h2>
            <p className="text-base text-gray-600 font-normal">
              Designed specifically for young minds from Class 6 to 10 to build lifelong academic curiosity and top exam results.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <Card
                key={f.title}
                className="p-6 rounded-3xl bg-white border border-gray-200/90 shadow-2xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1769AA] flex items-center justify-center group-hover:bg-[#1769AA] group-hover:text-white transition-colors shadow-2xs">
                    <f.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase text-[#1769AA] bg-blue-50 px-2 py-0.5 rounded-md">
                    {f.badge}
                  </span>
                </div>

                <h3 className="text-base font-black text-[#102C50]">
                  {f.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-normal">
                  {f.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 4.G: STUDENT & PARENT SUCCESS STORIES */}
      {/* ======================================================== */}
      <section className="py-20 bg-[#F5F8FF] border-t border-blue-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Real Stories, Real Results</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#102C50] tracking-tight">
              Loved by Students. Trusted by Parents.
            </h2>
            <p className="text-base text-gray-600 font-normal">
              See how our chapter subfolders and friendly mentors helped thousands of young scholars excel in school and Olympiads.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <Card
                key={t.name}
                className="p-6 rounded-3xl bg-white border border-gray-200/90 shadow-xs hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <h4 className="text-sm font-bold text-[#102C50]">
                    "{t.title}"
                  </h4>

                  <p className="text-xs text-gray-600 leading-relaxed font-normal">
                    {t.content}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl shrink-0">
                    {t.avatar}
                  </span>
                  <div>
                    <p className="text-xs font-bold text-[#102C50]">{t.name}</p>
                    <p className="text-[10px] text-gray-500">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 4.H: PRICING & 7-DAY FREE TRIAL SECTION */}
      {/* ======================================================== */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Prominent Free Trial Callout */}
          <div className="mb-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-50 via-sky-50 to-indigo-50 border-2 border-blue-200/80 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD447] text-slate-950 text-xs font-extrabold uppercase">
                <span>🎁 Risk-Free Offer</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#102C50]">
                Try 7 Days Completely Free — Zero Card Needed!
              </h3>
              <p className="text-sm text-gray-600 max-w-2xl font-normal">
                Pick your child's class, attend live interactive demo sessions, watch recorded lectures, and explore chapter subfolders with zero commitment.
              </p>
            </div>

            <Link href="/demo" className="shrink-0 w-full sm:w-auto">
              <Button
                size="xl"
                className="w-full sm:w-auto bg-[#1769AA] hover:bg-[#102C50] text-white font-black text-sm h-13 px-8 rounded-2xl shadow-md gap-2"
              >
                <span>Claim Free 7-Day Demo</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-[#102C50]">
              Transparent Monthly Pricing
            </h3>
            <p className="text-sm text-gray-500 font-normal">
              No hidden fees. Pay month-to-month. Use coupon <code className="font-bold text-[#1769AA] bg-blue-50 px-2 py-0.5 rounded">CARTOON50</code> for 50% discount!
            </p>
          </div>

          {/* Monthly Grade Pricing Cards */}
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              {
                cls: "Class 6th",
                mascot: "🚀",
                monthly: 1499,
                discounted: 749,
                badge: "Junior Champs",
              },
              {
                cls: "Class 7th",
                mascot: "🦖",
                monthly: 1699,
                discounted: 849,
                badge: "Junior Prodigy",
              },
              {
                cls: "Class 8th",
                mascot: "🤖",
                monthly: 1999,
                discounted: 999,
                badge: "Foundation Pro",
                popular: true,
              },
              {
                cls: "Class 9th",
                mascot: "🦉",
                monthly: 2499,
                discounted: 1249,
                badge: "Board Preps",
              },
              {
                cls: "Class 10th",
                mascot: "🥷",
                monthly: 2999,
                discounted: 1499,
                badge: "Board Toppers",
              },
            ].map((p) => (
              <Card
                key={p.cls}
                className={`p-6 rounded-3xl bg-white border transition-all text-center space-y-4 relative ${
                  p.popular
                    ? "border-2 border-[#1769AA] shadow-lg -translate-y-1"
                    : "border-gray-200/90 shadow-2xs hover:shadow-md"
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1769AA] text-white text-[10px] font-black uppercase px-3 py-0.5 rounded-full shadow-xs">
                    Most Popular
                  </span>
                )}
                <div>
                  <span className="text-3xl">{p.mascot}</span>
                  <h4 className="text-base font-black text-[#102C50] mt-1">{p.cls}</h4>
                  <span className="text-[10px] font-bold text-gray-500 uppercase">{p.badge}</span>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-baseline justify-center gap-1.5">
                    <span className="text-2xl font-black text-[#102C50]">₹{p.discounted}</span>
                    <span className="text-xs text-gray-400 line-through">₹{p.monthly}</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">
                    With CARTOON50
                  </span>
                </div>

                <Link href={`/pricing?class=${encodeURIComponent(p.cls)}`} className="block pt-2">
                  <Button
                    size="sm"
                    className="w-full bg-gray-50 hover:bg-[#1769AA] hover:text-white text-[#102C50] font-bold text-xs rounded-xl transition-colors"
                  >
                    View Plan
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 4.I: INTERACTIVE FAQ ACCORDION */}
      {/* ======================================================== */}
      <section className="py-20 bg-[#F5F8FF] border-t border-blue-100/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#1769AA] text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Common Questions</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#102C50] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-gray-600 font-normal">
              Everything you need to know about DeepSiddhi Foundation, courses, and the 7-day free trial.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-white rounded-2xl px-6 border border-gray-200/90 shadow-2xs overflow-hidden"
              >
                <AccordionTrigger className="text-left font-bold text-[#102C50] hover:no-underline py-4 text-sm sm:text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-xs sm:text-sm leading-relaxed pb-4 font-normal">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 4.J: FINAL CTA SECTION */}
      {/* ======================================================== */}
      <section className="py-20 bg-gradient-to-r from-[#102C50] via-[#1769AA] to-[#0284C7] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl">🚀</div>
          <div className="absolute bottom-10 right-10 text-6xl">📚</div>
          <div className="absolute top-1/2 left-3/4 text-5xl">✨</div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-cyan-200 text-xs font-bold backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Join India's Most Engaging Learning Community</span>
          </span>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Your Learning Adventure Starts Today!
          </h2>

          <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto font-normal leading-relaxed">
            Join DeepSiddhi Foundation and make every day a step towards success. 7 days free trial, no credit card required.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/demo">
              <Button
                size="xl"
                className="bg-[#FFD447] hover:bg-amber-300 text-slate-950 font-black text-base px-8 h-13 rounded-2xl shadow-xl hover:scale-105 transition-all gap-2"
              >
                <span>Start Learning for Free 🚀</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link href="/courses">
              <Button
                size="xl"
                variant="outline"
                className="border-2 border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold text-base px-7 h-13 rounded-2xl transition-all"
              >
                <Compass className="w-4 h-4 mr-1 text-[#38D9E6]" />
                <span>Explore Subject Subfolders</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
