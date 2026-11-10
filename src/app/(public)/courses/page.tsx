import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpen,
  Clock,
  Users,
  Play,
  Star,
  Search,
  GraduationCap,
  ChevronRight,
  Filter,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses",
  description: "Explore our comprehensive courses for IIT-JEE, Olympiad, NTSE, and Foundation preparation.",
};

const allCourses = [
  {
    id: "1",
    title: "IIT-JEE Complete Course",
    description: "Comprehensive preparation covering Physics, Chemistry, and Mathematics for JEE Main & Advanced with 240+ video lessons.",
    category: "IIT-JEE",
    targetClass: "Class 11-12",
    faculty: "Dr. Rahul Sharma",
    lessons: 240,
    duration: "12 months",
    price: 49999,
    discountedPrice: 34999,
    rating: 4.9,
    students: 12500,
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "2",
    title: "JEE Crash Course",
    description: "Intensive revision program for JEE Main & Advanced focusing on high-yield topics and problem-solving strategies.",
    category: "IIT-JEE",
    targetClass: "Class 12, Dropper",
    faculty: "Dr. Rahul Sharma",
    lessons: 80,
    duration: "3 months",
    price: 19999,
    discountedPrice: 14999,
    rating: 4.8,
    students: 8200,
    color: "from-blue-600 to-blue-800",
  },
  {
    id: "3",
    title: "Olympiad Mastery Program",
    description: "Advanced problem-solving techniques for National & International Science and Math Olympiads.",
    category: "Olympiad",
    targetClass: "Class 8-12",
    faculty: "Prof. Anita Desai",
    lessons: 120,
    duration: "6 months",
    price: 29999,
    discountedPrice: 19999,
    rating: 4.9,
    students: 5600,
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "4",
    title: "Math Olympiad Foundation",
    description: "Build strong mathematical reasoning and problem-solving skills for competitive math olympiads.",
    category: "Olympiad",
    targetClass: "Class 6-10",
    faculty: "Prof. Anita Desai",
    lessons: 60,
    duration: "4 months",
    price: 12999,
    discountedPrice: 8999,
    rating: 4.7,
    students: 3400,
    color: "from-teal-500 to-emerald-600",
  },
  {
    id: "5",
    title: "NTSE Preparation Course",
    description: "Structured preparation for NTSE with mock tests, comprehensive study material, and expert guidance.",
    category: "NTSE",
    targetClass: "Class 10",
    faculty: "Mr. Vikram Patel",
    lessons: 80,
    duration: "4 months",
    price: 14999,
    discountedPrice: 9999,
    rating: 4.8,
    students: 7800,
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "6",
    title: "Foundation Mathematics",
    description: "Build a strong mathematical foundation with conceptual clarity and advanced problem-solving skills.",
    category: "Foundation",
    targetClass: "Class 6-10",
    faculty: "Dr. Priya Mehta",
    lessons: 160,
    duration: "8 months",
    price: 19999,
    discountedPrice: 14999,
    rating: 4.8,
    students: 9200,
    color: "from-violet-500 to-purple-600",
  },
  {
    id: "7",
    title: "Foundation Science",
    description: "Comprehensive science program covering Physics, Chemistry, and Biology with hands-on experiments.",
    category: "Foundation",
    targetClass: "Class 6-10",
    faculty: "Dr. Priya Mehta",
    lessons: 140,
    duration: "8 months",
    price: 17999,
    discountedPrice: 12999,
    rating: 4.7,
    students: 6500,
    color: "from-purple-500 to-pink-600",
  },
  {
    id: "8",
    title: "KVPY Preparation",
    description: "Targeted preparation for Kishore Vaigyanik Protsahan Yojana with mock tests and study material.",
    category: "Other Courses",
    targetClass: "Class 11-12",
    faculty: "Dr. Rahul Sharma",
    lessons: 60,
    duration: "3 months",
    price: 12999,
    discountedPrice: 8999,
    rating: 4.6,
    students: 2800,
    color: "from-rose-500 to-red-600",
  },
];

export default function CoursesPage() {
  return (
    <div>
      {/* Page Header */}
      <section className="pt-28 pb-12 bg-gradient-to-br from-[#163B65] to-[#1a4a7a] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-20 w-64 h-64 bg-[#16A6A1]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-20 w-48 h-48 bg-[#16A6A1]/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="bg-white/10 text-white border-0 mb-4">
              <BookOpen className="w-3.5 h-3.5 mr-1" /> Course Catalog
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Explore Our Courses
            </h1>
            <p className="mt-3 text-white/60 max-w-xl mx-auto">
              Choose from our wide range of expertly designed courses for competitive exam preparation.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-white border-b border-gray-100 sticky top-16 lg:top-20 z-30 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Search courses..." className="pl-10" />
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Select>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="IIT-JEE">IIT-JEE</SelectItem>
                  <SelectItem value="Olympiad">Olympiad</SelectItem>
                  <SelectItem value="NTSE">NTSE</SelectItem>
                  <SelectItem value="Foundation">Foundation</SelectItem>
                  <SelectItem value="Other">Other Courses</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="6-8">Class 6-8</SelectItem>
                  <SelectItem value="9-10">Class 9-10</SelectItem>
                  <SelectItem value="11-12">Class 11-12</SelectItem>
                  <SelectItem value="dropper">Dropper</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12 bg-[#F6F8FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-gray-500">
              Showing <span className="font-semibold text-[#243247]">{allCourses.length}</span> courses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCourses.map((course) => (
              <Card key={course.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-sm bg-white">
                {/* Course Header */}
                <div className={`h-44 bg-gradient-to-br ${course.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/20 text-white backdrop-blur-sm border-0 text-xs">
                      {course.category}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                    <Star className="w-3 h-3 fill-yellow-300 text-yellow-300" />
                    <span className="text-xs text-white font-medium">{course.rating}</span>
                  </div>
                  <div className="absolute bottom-3 right-3 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 text-white fill-white" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <GraduationCap className="w-20 h-20 text-white/15" />
                  </div>
                </div>

                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="accent" className="text-[10px]">{course.targetClass}</Badge>
                  </div>
                  
                  <h3 className="font-semibold text-[#243247] text-lg group-hover:text-[#163B65] transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1.5 line-clamp-2">{course.description}</p>

                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
                    <Users className="w-4 h-4 text-[#16A6A1]" />
                    <span>{course.faculty}</span>
                  </div>

                  <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" /> {course.lessons} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" /> {course.students.toLocaleString()} students
                    </span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-[#163B65]">
                        ₹{course.discountedPrice.toLocaleString("en-IN")}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        ₹{course.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <Link href={`/courses/${course.id}`}>
                      <Button size="sm">
                        Enrol <ChevronRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
