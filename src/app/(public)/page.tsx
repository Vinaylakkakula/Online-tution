import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  GraduationCap,
  BookOpen,
  Users,
  Trophy,
  Star,
  Clock,
  Play,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Target,
  TrendingUp,
  Video,
  Calendar,
  Award,
  MessageSquare,
  ShieldCheck,
  Zap,
  ChevronRight,
  FolderTree,
  Rocket,
} from "lucide-react";
import { CartoonHeroVisual } from "@/components/home/cartoon-hero-visual";

// Featured courses data (seed)
const featuredCourses = [
  {
    id: "1",
    title: "IIT-JEE Complete Course",
    description:
      "Comprehensive preparation covering Physics, Chemistry, and Mathematics for JEE Main & Advanced.",
    category: "IIT-JEE",
    targetClass: "Class 11-12",
    faculty: "Dr. Rahul Sharma",
    lessons: 240,
    duration: "12 months",
    price: 49999,
    discountedPrice: 34999,
    image: "/api/placeholder/course-jee",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "2",
    title: "Olympiad Mastery Program",
    description:
      "Advanced problem-solving techniques for National & International Science Olympiads.",
    category: "Olympiad",
    targetClass: "Class 8-12",
    faculty: "Prof. Anita Desai",
    lessons: 120,
    duration: "6 months",
    price: 29999,
    discountedPrice: 19999,
    image: "/api/placeholder/course-olympiad",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "3",
    title: "NTSE Preparation Course",
    description:
      "Structured preparation for NTSE with mock tests, study material, and expert guidance.",
    category: "NTSE",
    targetClass: "Class 10",
    faculty: "Mr. Vikram Patel",
    lessons: 80,
    duration: "4 months",
    price: 14999,
    discountedPrice: 9999,
    image: "/api/placeholder/course-ntse",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "4",
    title: "Foundation Mathematics",
    description:
      "Build a strong mathematical foundation with conceptual clarity and advanced problem-solving.",
    category: "Foundation",
    targetClass: "Class 6-10",
    faculty: "Dr. Priya Mehta",
    lessons: 160,
    duration: "8 months",
    price: 19999,
    discountedPrice: 14999,
    image: "/api/placeholder/course-foundation",
    color: "from-violet-500 to-purple-600",
  },
];

const features = [
  {
    icon: Video,
    title: "Live & Recorded Classes",
    description:
      "Attend live interactive sessions or learn at your pace with high-quality recorded lectures.",
  },
  {
    icon: Users,
    title: "Expert Faculty",
    description:
      "Learn from IIT alumni, PhD holders, and experienced educators with proven track records.",
  },
  {
    icon: Target,
    title: "Structured Curriculum",
    description:
      "Well-organized course content aligned with exam patterns and latest syllabus changes.",
  },
  {
    icon: TrendingUp,
    title: "Performance Analytics",
    description:
      "Track your progress with detailed analytics, test reports, and personalized recommendations.",
  },
  {
    icon: MessageSquare,
    title: "Doubt Resolution",
    description:
      "Get your doubts cleared by faculty and peers through our active community platform.",
  },
  {
    icon: ShieldCheck,
    title: "Proven Results",
    description:
      "Thousands of students have achieved top ranks in competitive exams with our guidance.",
  },
];

const faculty = [
  {
    name: "Dr. Rahul Sharma",
    subject: "Physics",
    qualification: "PhD, IIT Delhi",
    experience: "15+ years",
    initials: "RS",
  },
  {
    name: "Prof. Anita Desai",
    subject: "Mathematics",
    qualification: "MSc, IIT Bombay",
    experience: "12+ years",
    initials: "AD",
  },
  {
    name: "Mr. Vikram Patel",
    subject: "Chemistry",
    qualification: "MTech, IIT Kanpur",
    experience: "10+ years",
    initials: "VP",
  },
  {
    name: "Dr. Priya Mehta",
    subject: "Biology",
    qualification: "PhD, AIIMS Delhi",
    experience: "8+ years",
    initials: "PM",
  },
];

const stats = [
  { value: "50,000+", label: "Students Enrolled", icon: Users },
  { value: "500+", label: "Expert Faculty", icon: GraduationCap },
  { value: "5,000+", label: "Video Lessons", icon: Play },
  { value: "95%+", label: "Success Rate", icon: Trophy },
];

const testimonials = [
  {
    name: "Arjun Kumar",
    achievement: "AIR 45, JEE Advanced 2024",
    content:
      "DeepSiddhi Foundation transformed my JEE preparation. The structured approach and expert faculty helped me crack JEE Advanced with an exceptional rank.",
    initials: "AK",
  },
  {
    name: "Sneha Reddy",
    achievement: "Gold Medal, International Science Olympiad",
    content:
      "The Olympiad program at DeepSiddhi is world-class. The advanced problem-solving techniques I learned were instrumental in winning the gold medal.",
    initials: "SR",
  },
  {
    name: "Rohit Agarwal",
    achievement: "NTSE Scholar 2024",
    content:
      "The NTSE course was perfectly structured. The mock tests and study materials were so comprehensive that I felt fully prepared on exam day.",
    initials: "RA",
  },
];

const faqs = [
  {
    question: "What courses does DeepSiddhi Foundation offer?",
    answer:
      "We offer comprehensive preparation for IIT-JEE (Main & Advanced), Science & Math Olympiads, NTSE, and Foundation courses for students from Class 6 to 12 and Droppers.",
  },
  {
    question: "How are the classes conducted?",
    answer:
      "We offer both live interactive classes conducted via Zoom/Google Meet and high-quality recorded lectures that you can watch at your own pace. All classes are taught by expert faculty members.",
  },
  {
    question: "Can I access recorded lectures after the live class?",
    answer:
      "Yes! All live classes are recorded and made available in your student dashboard within 24 hours. You can rewatch them as many times as needed.",
  },
  {
    question: "What is the refund policy?",
    answer:
      "We offer a 7-day money-back guarantee. If you're not satisfied with the course, you can request a full refund within 7 days of enrollment.",
  },
  {
    question: "Do you provide study materials?",
    answer:
      "Yes, we provide comprehensive study materials including PDF notes, worksheets, practice papers, question banks, and previous year papers for all courses.",
  },
  {
    question: "How can I track my progress?",
    answer:
      "Your student dashboard includes detailed progress tracking with subject-wise analytics, test performance reports, learning streaks, and personalized recommendations.",
  },
];

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-[#163B65] via-[#1a4a7a] to-[#163B65] overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#16A6A1]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#16A6A1]/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#16A6A1]/5 rounded-full blur-3xl" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400/20 via-cyan-400/20 to-purple-400/20 backdrop-blur-sm text-cyan-200 text-xs sm:text-sm px-4 py-2 rounded-full mb-6 border border-cyan-400/30 shadow-md">
                <Rocket className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="font-bold text-white">Fun & Interactive Learning • Classes 6th to 10th</span>
                <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">NEW</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
                Learn, Play &<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-cyan-300 to-teal-200">
                  Score Top Ranks! 📚✨
                </span>
              </h1>

              <p className="mt-5 text-base sm:text-lg text-white/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Transform school into an adventure! Explore colorful subject subfolders, watch recorded video lessons at your own pace, unlock cartoon avatars & badges, and enjoy a <strong className="text-amber-300 font-bold">7-Day Free Trial</strong> with India&apos;s best educators.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link href="/demo">
                  <Button
                    size="xl"
                    className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-extrabold shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 hover:scale-105 transition-all text-base px-6 border-0"
                  >
                    <Rocket className="w-5 h-5 mr-1" />
                    Start Free Demo (7 Days)
                  </Button>
                </Link>
                <Link href="/courses">
                  <Button
                    size="xl"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-white/5 backdrop-blur-sm text-base px-6 transition-all hover:scale-105"
                  >
                    <BookOpen className="w-5 h-5 mr-1 text-cyan-300" />
                    Explore Subfolders
                  </Button>
                </Link>
              </div>

              {/* Mini Feature Highlights */}
              <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs text-cyan-100 font-medium">
                <span className="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Subject Folders
                </span>
                <span className="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Recorded Classes
                </span>
                <span className="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Cartoon Avatars
                </span>
                <span className="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
                  <CheckCircle2 className="w-3.5 h-3.5 text-pink-400" /> Free Trial
                </span>
              </div>

              {/* Trust indicators */}
              <div className="mt-8 flex items-center gap-4 justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {["🚀", "🦖", "🤖", "🦉"].map((emoji, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 border-2 border-slate-900 flex items-center justify-center text-sm shadow"
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-white/70 text-xs mt-0.5 font-medium">
                    <strong className="text-white font-bold">4.9/5</strong> by 2,500+ happy young scholars & parents
                  </p>
                </div>
              </div>
            </div>

            {/* Right Content - Cartoon Hero Visual with Paper Rockets & Magic Books */}
            <div className="w-full">
              <CartoonHeroVisual />
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 40L48 36.7C96 33.3 192 26.7 288 30C384 33.3 480 46.7 576 50C672 53.3 768 46.7 864 40C960 33.3 1056 26.7 1152 30C1248 33.3 1344 46.7 1392 53.3L1440 60V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V40Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Grade Quick Selector Banner */}
      <section className="py-6 bg-gradient-to-r from-cyan-50 via-blue-50 to-amber-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center md:text-left">
              <span className="text-3xl animate-bounce">🚀</span>
              <div>
                <p className="font-extrabold text-[#163B65] text-base">Select Your Grade & Jump In!</p>
                <p className="text-xs text-gray-500">Subject-wise folder system • Recorded Classes • Homework & Tests</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {["Class 6th 🎒", "Class 7th 📗", "Class 8th 🔬", "Class 9th 📐", "Class 10th 🏆"].map((grade) => (
                <Link
                  key={grade}
                  href="/courses"
                  className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#163B65] hover:text-white text-[#163B65] font-bold text-xs shadow-sm hover:shadow border border-blue-200 transition-all hover:scale-105"
                >
                  {grade}
                </Link>
              ))}
              <Link
                href="/demo"
                className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-sm hover:shadow transition-all hover:scale-105"
              >
                7-Day Free Demo 🎁
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Badge variant="accent" className="mb-4 text-sm">
              <BookOpen className="w-3.5 h-3.5 mr-1" /> Popular Courses
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#243247]">
              Featured Courses
            </h2>
            <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
              Explore our most popular courses designed by expert faculty to help
              you achieve academic excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
              <Card
                key={course.id}
                className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-sm"
              >
                {/* Course Image Placeholder */}
                <div
                  className={`h-40 bg-gradient-to-br ${course.color} relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/20 text-white backdrop-blur-sm border-0 text-xs">
                      {course.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 right-3 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 text-white fill-white" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <GraduationCap className="w-16 h-16 text-white/20" />
                  </div>
                </div>

                <CardContent className="p-5">
                  <h3 className="font-semibold text-[#243247] group-hover:text-[#163B65] transition-colors line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1.5 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="mt-4 flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      {course.lessons} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {course.duration}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-[#163B65]">
                        ₹{course.discountedPrice?.toLocaleString("en-IN")}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        ₹{course.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <Link href={`/courses/${course.id}`} className="block mt-4">
                    <Button variant="outline" className="w-full" size="sm">
                      Enrol Now
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/courses">
              <Button variant="outline" size="lg">
                View All Courses
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[#F6F8FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Badge variant="accent" className="mb-4 text-sm">
              <Zap className="w-3.5 h-3.5 mr-1" /> Why Choose Us
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#243247]">
              Why Choose DeepSiddhi Foundation?
            </h2>
            <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
              We combine expert teaching, cutting-edge technology, and
              personalized attention to deliver exceptional learning outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <Card
                key={i}
                className="p-6 hover:shadow-lg transition-all duration-300 border-0 bg-white group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#EAF4FF] flex items-center justify-center mb-4 group-hover:bg-[#163B65] transition-colors">
                  <feature.icon className="w-6 h-6 text-[#163B65] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-[#243247] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Badge variant="accent" className="mb-4 text-sm">
              <Award className="w-3.5 h-3.5 mr-1" /> Expert Faculty
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#243247]">
              Our Expert Faculty
            </h2>
            <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
              Learn from the best minds in education with decades of combined
              teaching experience.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {faculty.map((member, i) => (
              <Card
                key={i}
                className="p-6 text-center hover:shadow-lg transition-all duration-300 border-0 group"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#163B65] to-[#16A6A1] flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold shadow-lg group-hover:shadow-xl transition-shadow">
                  {member.initials}
                </div>
                <h3 className="font-semibold text-[#243247]">{member.name}</h3>
                <p className="text-sm text-[#16A6A1] font-medium mt-1">
                  {member.subject}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {member.qualification}
                </p>
                <p className="text-xs text-gray-400">
                  {member.experience} experience
                </p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/faculty">
              <Button variant="outline" size="lg">
                Meet All Faculty
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Live Classes Preview */}
      <section className="py-20 bg-[#F6F8FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Badge variant="accent" className="mb-4 text-sm">
              <Calendar className="w-3.5 h-3.5 mr-1" /> Live Classes
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#243247]">
              Upcoming Live Classes
            </h2>
            <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
              Join our interactive live sessions and learn directly from expert
              faculty.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "JEE Physics: Electrostatics",
                faculty: "Dr. Rahul Sharma",
                date: "Tomorrow, 4:00 PM",
                course: "IIT-JEE",
                status: "upcoming",
              },
              {
                title: "Olympiad Math: Number Theory",
                faculty: "Prof. Anita Desai",
                date: "Tomorrow, 6:00 PM",
                course: "Olympiad",
                status: "upcoming",
              },
              {
                title: "NTSE Mental Ability",
                faculty: "Mr. Vikram Patel",
                date: "Wed, 5:00 PM",
                course: "NTSE",
                status: "upcoming",
              },
            ].map((cls, i) => (
              <Card
                key={i}
                className="p-6 hover:shadow-lg transition-all duration-300 border-0 bg-white"
              >
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="accent">{cls.course}</Badge>
                  <Badge variant="warning">Upcoming</Badge>
                </div>
                <h3 className="font-semibold text-[#243247] mb-2">
                  {cls.title}
                </h3>
                <div className="space-y-2 text-sm text-gray-500">
                  <p className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#16A6A1]" />
                    {cls.faculty}
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#16A6A1]" />
                    {cls.date}
                  </p>
                </div>
                <Link href="/register" className="block mt-4">
                  <Button variant="secondary" className="w-full" size="sm">
                    Register to Attend
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories / Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Badge variant="accent" className="mb-4 text-sm">
              <Trophy className="w-3.5 h-3.5 mr-1" /> Student Success
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#243247]">
              Student Success Stories
            </h2>
            <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
              Hear from our students who have achieved extraordinary results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <Card
                key={i}
                className="p-6 hover:shadow-lg transition-all duration-300 border-0 bg-[#F6F8FC]"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#163B65] to-[#16A6A1] flex items-center justify-center text-white text-sm font-bold">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[#243247]">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-[#16A6A1] font-medium">
                      {testimonial.achievement}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Results & Achievements */}
      <section className="py-20 bg-gradient-to-br from-[#163B65] to-[#1a4a7a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Our Results Speak for Themselves
            </h2>
            <p className="mt-3 text-white/60 max-w-2xl mx-auto">
              Consistently producing top rankers and achievers across all
              competitive examinations.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "250+", label: "IIT Selections (2024)", icon: "🎓" },
              { value: "45", label: "Top 100 AIR Rankers", icon: "🏆" },
              { value: "500+", label: "NTSE Scholars", icon: "📚" },
              { value: "120+", label: "Olympiad Medals", icon: "🥇" },
            ].map((result, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all"
              >
                <div className="text-3xl mb-3">{result.icon}</div>
                <p className="text-3xl font-bold text-white">{result.value}</p>
                <p className="text-sm text-white/60 mt-2">{result.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Badge variant="accent" className="mb-4 text-sm">
              <MessageSquare className="w-3.5 h-3.5 mr-1" /> FAQ
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#243247]">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-gray-500">
              Got questions? We have answers.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-[#F6F8FC] rounded-xl px-6 border-0"
              >
                <AccordionTrigger className="text-left text-[#243247] hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-500">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-[#F6F8FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="accent" className="mb-4 text-sm">
                Get in Touch
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#243247]">
                Contact Us
              </h2>
              <p className="mt-3 text-gray-500 max-w-lg">
                Have questions about our courses or need help with enrollment?
                Our team is here to assist you.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  {
                    icon: CheckCircle2,
                    text: "Free counselling sessions available",
                  },
                  {
                    icon: CheckCircle2,
                    text: "Personalized course recommendations",
                  },
                  {
                    icon: CheckCircle2,
                    text: "Demo classes for all courses",
                  },
                  {
                    icon: CheckCircle2,
                    text: "Flexible payment options",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-[#16A6A1]" />
                    <span className="text-sm text-[#243247]">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link href="/contact">
                  <Button size="lg">
                    Contact Us
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <Card className="p-8 border-0 shadow-lg bg-white">
              <h3 className="text-lg font-semibold text-[#243247] mb-6">
                Quick Enquiry
              </h3>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#243247] mb-1.5 block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#243247] placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#163B65]/20 focus-visible:border-[#163B65]/40 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#243247] mb-1.5 block">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 99999 99999"
                      className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#243247] placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#163B65]/20 focus-visible:border-[#163B65]/40 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#243247] mb-1.5 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#243247] placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#163B65]/20 focus-visible:border-[#163B65]/40 transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#243247] mb-1.5 block">
                    Course Interest
                  </label>
                  <select className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#243247] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#163B65]/20 focus-visible:border-[#163B65]/40 transition-all">
                    <option value="">Select a course</option>
                    <option>IIT-JEE</option>
                    <option>Olympiad</option>
                    <option>NTSE</option>
                    <option>Foundation</option>
                    <option>Other Courses</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#243247] mb-1.5 block">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your requirements..."
                    className="flex w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#243247] placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#163B65]/20 focus-visible:border-[#163B65]/40 transition-all resize-none"
                  />
                </div>
                <Button className="w-full" size="lg">
                  Submit Enquiry
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
