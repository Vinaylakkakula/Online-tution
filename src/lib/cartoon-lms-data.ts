export interface VideoItem {
  id: string;
  title: string;
  teacher: string;
  teacherAvatar: string;
  duration: string;
  durationMinutes: number;
  videoUrl: string;
  thumbnail: string;
  views: number;
  isBookmarked?: boolean;
  isCompleted?: boolean;
  resumeSeconds?: number;
  totalSeconds?: number;
}

export interface MaterialItem {
  id: string;
  title: string;
  fileType: "PDF" | "Formula Sheet" | "Mind Map" | "Notes";
  fileSize: string;
  downloadUrl: string;
  pagesCount: number;
  downloadsCount: number;
}

export interface AssignmentItem {
  id: string;
  title: string;
  dueDate: string;
  totalMarks: number;
  status: "Pending" | "Submitted" | "Graded";
  score?: number;
  description: string;
}

export interface TestQuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface TestItem {
  id: string;
  title: string;
  duration: string;
  totalMarks: number;
  questionsCount: number;
  status: "Available" | "Completed";
  studentScore?: number;
  questions: TestQuizQuestion[];
}

export interface ChapterItem {
  id: string;
  chapterNumber: number;
  title: string;
  summary: string;
  isCompleted?: boolean;
  progressPercent: number;
  videos: VideoItem[];
  materials: MaterialItem[];
  assignments: AssignmentItem[];
  tests: TestItem[];
}

export interface SubjectItem {
  id: string;
  name: string;
  slug: string;
  icon: string;
  accentColor: string;
  bgGradient: string;
  teacherName: string;
  teacherAvatar: string;
  chaptersCount: number;
  totalVideos: number;
  totalMaterials: number;
  chapters: ChapterItem[];
}

export interface CartoonCourse {
  id: string;
  classLevel: "Class 6" | "Class 7" | "Class 8" | "Class 9" | "Class 10";
  title: string;
  badgeTitle: string;
  subtitle: string;
  mascot: string;
  mascotName: string;
  themeColor: string;
  bgGradient: string;
  monthlyPrice: number;
  originalPrice: number;
  annualPrice: number;
  discountPercent: number;
  activeOffer: string;
  enrolledStudentsCount: number;
  totalSubjects: number;
  totalChapters: number;
  subjects: SubjectItem[];
}

export interface AcademicHoliday {
  id: string;
  title: string;
  date: string;
  type: "Regular" | "Government" | "Festival" | "Emergency" | "Special Class" | "Exam Day";
  description: string;
  isUrgent?: boolean;
}

export interface StudentAttendanceDay {
  date: string; // YYYY-MM-DD
  dayNumber: number;
  status: "present" | "absent" | "holiday" | "special_class";
  remarks?: string;
}

export interface StudentPerformanceRecord {
  studentId: string;
  studentName: string;
  classLevel: string;
  overallPercentage: number;
  totalMarksObtained: number;
  totalMaxMarks: number;
  rankInBatch: number;
  weakSubjects: string[];
  strongSubjects: string[];
  monthlyProgress: { month: string; score: number }[];
  subjectScores: {
    subject: string;
    marks: number;
    maxMarks: number;
    grade: string;
    trend: "up" | "down" | "steady";
  }[];
}

export interface StudentFeedbackEntry {
  id: string;
  studentName: string;
  studentAvatar: string;
  classLevel: string;
  targetType: "Teacher" | "Course" | "Recorded Class" | "App";
  targetName: string;
  rating: number; // 1 to 5
  comment: string;
  createdAt: string;
  adminReply?: string;
  status: "published" | "pending" | "hidden";
}

export interface DemoLead {
  id: string;
  studentName: string;
  parentName: string;
  parentPhone: string;
  studentEmail: string;
  school: string;
  classLevel: "Class 6" | "Class 7" | "Class 8" | "Class 9" | "Class 10";
  preferredSubject: string;
  demoDate: string;
  trialStartDate: string;
  trialEndDate: string;
  status: "Trial Active" | "Trial Expired" | "Enrolled" | "Pending Approval";
  trialDaysLeft: number;
}

// -------------------------------------------------------------
// CLASSES 6 TO 10 COURSES & SUBFOLDER DATA
// -------------------------------------------------------------

export const CARTOON_COURSES: CartoonCourse[] = [
  {
    id: "course-c6",
    classLevel: "Class 6",
    title: "Class 6 Junior Champs Adventure",
    badgeTitle: "Grade 6 Full Track",
    subtitle: "Complete Fun Learning: Maths, Science, English & Social Studies with Animated Lessons!",
    mascot: "🚀",
    mascotName: "Astro Leo",
    themeColor: "#2563EB",
    bgGradient: "from-blue-500 via-indigo-600 to-sky-500",
    monthlyPrice: 799,
    originalPrice: 1299,
    annualPrice: 6999,
    discountPercent: 38,
    activeOffer: "Back to School Bonanza: 38% OFF!",
    enrolledStudentsCount: 384,
    totalSubjects: 4,
    totalChapters: 16,
    subjects: [
      {
        id: "c6-math",
        name: "Mathematics",
        slug: "mathematics",
        icon: "📐",
        accentColor: "#3B82F6",
        bgGradient: "from-blue-500 to-indigo-600",
        teacherName: "Er. Amit Verma",
        teacherAvatar: "🤖",
        chaptersCount: 4,
        totalVideos: 12,
        totalMaterials: 8,
        chapters: [
          {
            id: "c6-m-ch1",
            chapterNumber: 1,
            title: "Knowing Our Numbers & Large Place Values",
            summary: "Learn Indian & International numeral systems, Roman numbers, and place value tricks!",
            isCompleted: true,
            progressPercent: 100,
            videos: [
              {
                id: "v-c6-m-1",
                title: "Fun with Large Numbers & Comparing Digits",
                teacher: "Er. Amit Verma",
                teacherAvatar: "🤖",
                duration: "24 mins",
                durationMinutes: 24,
                videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                thumbnail: "/thumbnails/math1.jpg",
                views: 520,
                isBookmarked: true,
                isCompleted: true,
                resumeSeconds: 1440,
                totalSeconds: 1440,
              },
              {
                id: "v-c6-m-2",
                title: "Indian vs International System Shortcuts",
                teacher: "Er. Amit Verma",
                teacherAvatar: "🤖",
                duration: "28 mins",
                durationMinutes: 28,
                videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                thumbnail: "/thumbnails/math2.jpg",
                views: 480,
                isBookmarked: false,
                isCompleted: true,
                resumeSeconds: 1680,
                totalSeconds: 1680,
              },
            ],
            materials: [
              {
                id: "mat-c6-m-1",
                title: "Chapter 1 Colorful Formula Sheet & Roman Numbers Chart",
                fileType: "Formula Sheet",
                fileSize: "2.1 MB",
                downloadUrl: "#",
                pagesCount: 6,
                downloadsCount: 340,
              },
              {
                id: "mat-c6-m-2",
                title: "Handwritten Class Notes: Estimation and Rounding Off",
                fileType: "Notes",
                fileSize: "3.4 MB",
                downloadUrl: "#",
                pagesCount: 12,
                downloadsCount: 290,
              },
            ],
            assignments: [
              {
                id: "asg-c6-m-1",
                title: "Homework Worksheet #01: Estimation Word Problems",
                dueDate: "Friday, 5:00 PM",
                totalMarks: 20,
                status: "Graded",
                score: 19,
                description: "Solve 10 practical questions on large transactions and estimation.",
              },
            ],
            tests: [
              {
                id: "tst-c6-m-1",
                title: "Class 6 Chapter 1 Speed Quiz",
                duration: "20 Mins",
                totalMarks: 30,
                questionsCount: 3,
                status: "Completed",
                studentScore: 28,
                questions: [
                  {
                    id: 1,
                    question: "How many thousands make one lakh in the Indian System?",
                    options: ["10", "100", "1,000", "10,000"],
                    correctAnswer: 1,
                    explanation: "1 Lakh = 100,000, so 100 thousands make one lakh.",
                  },
                  {
                    id: 2,
                    question: "What is the Roman numeral for 99?",
                    options: ["IC", "XCIX", "CXI", "LIL"],
                    correctAnswer: 1,
                    explanation: "90 is XC and 9 is IX, so 99 is written as XCIX.",
                  },
                  {
                    id: 3,
                    question: "Which is the smallest 6-digit number?",
                    options: ["100000", "999999", "111111", "100001"],
                    correctAnswer: 0,
                    explanation: "100,000 is the smallest 6-digit natural number.",
                  },
                ],
              },
            ],
          },
          {
            id: "c6-m-ch2",
            chapterNumber: 2,
            title: "Whole Numbers & Number Line Magic",
            summary: "Explore predecessor, successor, closure, commutative & associative properties.",
            isCompleted: false,
            progressPercent: 65,
            videos: [
              {
                id: "v-c6-m-3",
                title: "Number Line Addition & Subtraction Visual Tricks",
                teacher: "Er. Amit Verma",
                teacherAvatar: "🤖",
                duration: "30 mins",
                durationMinutes: 30,
                videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                thumbnail: "/thumbnails/math3.jpg",
                views: 380,
                isBookmarked: true,
                isCompleted: false,
                resumeSeconds: 620,
                totalSeconds: 1800,
              },
            ],
            materials: [
              {
                id: "mat-c6-m-3",
                title: "Whole Numbers Properties Mind Map",
                fileType: "Mind Map",
                fileSize: "1.8 MB",
                downloadUrl: "#",
                pagesCount: 4,
                downloadsCount: 210,
              },
            ],
            assignments: [
              {
                id: "asg-c6-m-2",
                title: "Practice Sheet: Distributive Property Puzzles",
                dueDate: "Monday, 6:00 PM",
                totalMarks: 25,
                status: "Pending",
                description: "Compute rapid multiplications using distributive properties.",
              },
            ],
            tests: [
              {
                id: "tst-c6-m-2",
                title: "Chapter 2 Practice Test",
                duration: "25 Mins",
                totalMarks: 20,
                questionsCount: 2,
                status: "Available",
                questions: [
                  {
                    id: 1,
                    question: "Which of the following whole numbers does not have a predecessor?",
                    options: ["0", "1", "2", "None"],
                    correctAnswer: 0,
                    explanation: "In whole numbers {0, 1, 2...}, 0 has no predecessor.",
                  },
                  {
                    id: 2,
                    question: "What is 45 × 0?",
                    options: ["45", "0", "1", "Undefined"],
                    correctAnswer: 1,
                    explanation: "Any number multiplied by 0 results in 0.",
                  },
                ],
              },
            ],
          },
          {
            id: "c6-m-ch3",
            chapterNumber: 3,
            title: "Playing with Numbers: Factors & Multiples",
            summary: "Prime numbers, composite numbers, divisibility tests, HCF, and LCM.",
            progressPercent: 0,
            videos: [
              {
                id: "v-c6-m-4",
                title: "HCF & LCM Shortcut Ladder Method",
                teacher: "Er. Amit Verma",
                teacherAvatar: "🤖",
                duration: "35 mins",
                durationMinutes: 35,
                videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                thumbnail: "/thumbnails/math4.jpg",
                views: 290,
                isBookmarked: false,
                isCompleted: false,
              },
            ],
            materials: [],
            assignments: [],
            tests: [],
          },
          {
            id: "c6-m-ch4",
            chapterNumber: 4,
            title: "Basic Geometrical Ideas & Shapes",
            summary: "Points, line segments, rays, curves, polygons, angles, and circles.",
            progressPercent: 0,
            videos: [],
            materials: [],
            assignments: [],
            tests: [],
          },
        ],
      },
      {
        id: "c6-sci",
        name: "General Science",
        slug: "science",
        icon: "🔬",
        accentColor: "#10B981",
        bgGradient: "from-emerald-500 to-teal-600",
        teacherName: "Dr. Neha Sen",
        teacherAvatar: "🦉",
        chaptersCount: 4,
        totalVideos: 10,
        totalMaterials: 7,
        chapters: [
          {
            id: "c6-s-ch1",
            chapterNumber: 1,
            title: "Components of Food & Balanced Diet",
            summary: "Nutrients, carbohydrates, proteins, fats, vitamins, minerals, and deficiency diseases.",
            isCompleted: true,
            progressPercent: 100,
            videos: [
              {
                id: "v-c6-s-1",
                title: "Carbohydrates, Fats & Proteins: Lab Tests Demonstration",
                teacher: "Dr. Neha Sen",
                teacherAvatar: "🦉",
                duration: "26 mins",
                durationMinutes: 26,
                videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                thumbnail: "/thumbnails/sci1.jpg",
                views: 610,
                isBookmarked: true,
                isCompleted: true,
              },
            ],
            materials: [
              {
                id: "mat-c6-s-1",
                title: "Vitamins & Deficiency Diseases Memory Chart",
                fileType: "PDF",
                fileSize: "2.8 MB",
                downloadUrl: "#",
                pagesCount: 8,
                downloadsCount: 410,
              },
            ],
            assignments: [],
            tests: [],
          },
          {
            id: "c6-s-ch2",
            chapterNumber: 2,
            title: "Sorting Materials into Groups",
            summary: "Lustre, hardness, solubility, transparency, and density of objects.",
            progressPercent: 40,
            videos: [],
            materials: [],
            assignments: [],
            tests: [],
          },
          {
            id: "c6-s-ch3",
            chapterNumber: 3,
            title: "Electricity and Circuits",
            summary: "Electric cell, bulb filament, switch, conductors, and insulators.",
            progressPercent: 0,
            videos: [],
            materials: [],
            assignments: [],
            tests: [],
          },
          {
            id: "c6-s-ch4",
            chapterNumber: 4,
            title: "Light, Shadows and Reflections",
            summary: "Luminous objects, pinhole camera, transparent vs opaque bodies.",
            progressPercent: 0,
            videos: [],
            materials: [],
            assignments: [],
            tests: [],
          },
        ],
      },
      {
        id: "c6-eng",
        name: "English Literature & Grammar",
        slug: "english",
        icon: "📖",
        accentColor: "#EC4899",
        bgGradient: "from-pink-500 to-rose-600",
        teacherName: "Ms. Ananya Roy",
        teacherAvatar: "🐱",
        chaptersCount: 4,
        totalVideos: 8,
        totalMaterials: 6,
        chapters: [
          {
            id: "c6-e-ch1",
            chapterNumber: 1,
            title: "Who Did Patrick's Homework? (Story & Moral)",
            summary: "Interactive animated story analysis, vocabulary builder, and grammar.",
            progressPercent: 80,
            videos: [],
            materials: [],
            assignments: [],
            tests: [],
          },
        ],
      },
      {
        id: "c6-sst",
        name: "Social Studies (History & Geography)",
        slug: "social-studies",
        icon: "🌍",
        accentColor: "#F59E0B",
        bgGradient: "from-amber-500 to-orange-600",
        teacherName: "Mr. Rajesh Nair",
        teacherAvatar: "🦖",
        chaptersCount: 4,
        totalVideos: 8,
        totalMaterials: 5,
        chapters: [
          {
            id: "c6-sst-ch1",
            chapterNumber: 1,
            title: "The Earth in the Solar System & Planetary Orbits",
            summary: "Planets, asteroids, meteors, constellations, and the Moon's phases.",
            progressPercent: 50,
            videos: [],
            materials: [],
            assignments: [],
            tests: [],
          },
        ],
      },
    ],
  },

  // CLASS 7
  {
    id: "course-c7",
    classLevel: "Class 7",
    title: "Class 7 Junior Prodigy Mastery",
    badgeTitle: "Grade 7 Full Track",
    subtitle: "Master Integers, Fractions, Heat, Nutrition, and World History with Fun Challenges!",
    mascot: "🦖",
    mascotName: "Dino Rex",
    themeColor: "#10B981",
    bgGradient: "from-emerald-500 via-teal-600 to-cyan-500",
    monthlyPrice: 899,
    originalPrice: 1499,
    annualPrice: 7999,
    discountPercent: 40,
    activeOffer: "Prodigy Pass: 40% OFF this month!",
    enrolledStudentsCount: 412,
    totalSubjects: 4,
    totalChapters: 18,
    subjects: [
      {
        id: "c7-math",
        name: "Mathematics",
        slug: "mathematics",
        icon: "📐",
        accentColor: "#3B82F6",
        bgGradient: "from-blue-500 to-indigo-600",
        teacherName: "Er. Amit Verma",
        teacherAvatar: "🤖",
        chaptersCount: 5,
        totalVideos: 14,
        totalMaterials: 9,
        chapters: [
          {
            id: "c7-m-ch1",
            chapterNumber: 1,
            title: "Integers & Rules of Signs",
            summary: "Multiplication and division of positive and negative integers.",
            progressPercent: 90,
            videos: [
              {
                id: "v-c7-m-1",
                title: "Sign Rules for Negative Numbers & Word Problems",
                teacher: "Er. Amit Verma",
                teacherAvatar: "🤖",
                duration: "32 mins",
                durationMinutes: 32,
                videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                thumbnail: "/thumbnails/math7.jpg",
                views: 450,
                isBookmarked: true,
                isCompleted: true,
              },
            ],
            materials: [],
            assignments: [],
            tests: [],
          },
          {
            id: "c7-m-ch2",
            chapterNumber: 2,
            title: "Fractions and Decimals Masterclass",
            summary: "Proper, improper, mixed fractions, reciprocal, and decimals division.",
            progressPercent: 40,
            videos: [],
            materials: [],
            assignments: [],
            tests: [],
          },
        ],
      },
      {
        id: "c7-sci",
        name: "Science (Physics, Chem, Bio)",
        slug: "science",
        icon: "🧪",
        accentColor: "#10B981",
        bgGradient: "from-emerald-500 to-teal-600",
        teacherName: "Dr. Neha Sen",
        teacherAvatar: "🦉",
        chaptersCount: 5,
        totalVideos: 12,
        totalMaterials: 8,
        chapters: [
          {
            id: "c7-s-ch1",
            chapterNumber: 1,
            title: "Nutrition in Plants & Photosynthesis",
            summary: "Autotrophic and heterotrophic modes, chlorophyll, and saprotrophs.",
            progressPercent: 75,
            videos: [],
            materials: [],
            assignments: [],
            tests: [],
          },
        ],
      },
      {
        id: "c7-eng",
        name: "English Language & Grammar",
        slug: "english",
        icon: "📖",
        accentColor: "#EC4899",
        bgGradient: "from-pink-500 to-rose-600",
        teacherName: "Ms. Ananya Roy",
        teacherAvatar: "🐱",
        chaptersCount: 4,
        totalVideos: 8,
        totalMaterials: 6,
        chapters: [],
      },
      {
        id: "c7-sst",
        name: "Social Studies",
        slug: "social-studies",
        icon: "🌍",
        accentColor: "#F59E0B",
        bgGradient: "from-amber-500 to-orange-600",
        teacherName: "Mr. Rajesh Nair",
        teacherAvatar: "🦖",
        chaptersCount: 4,
        totalVideos: 8,
        totalMaterials: 5,
        chapters: [],
      },
    ],
  },

  // CLASS 8
  {
    id: "course-c8",
    classLevel: "Class 8",
    title: "Class 8 Foundation Warriors",
    badgeTitle: "Grade 8 Full Track",
    subtitle: "Strong foundation for High School: Rational Numbers, Force & Pressure, Cell Structure!",
    mascot: "🤖",
    mascotName: "Robo Pixel",
    themeColor: "#8B5CF6",
    bgGradient: "from-purple-500 via-violet-600 to-indigo-500",
    monthlyPrice: 999,
    originalPrice: 1599,
    annualPrice: 8999,
    discountPercent: 37,
    activeOffer: "Foundation Booster: 37% OFF!",
    enrolledStudentsCount: 530,
    totalSubjects: 4,
    totalChapters: 20,
    subjects: [
      {
        id: "c8-math",
        name: "Mathematics",
        slug: "mathematics",
        icon: "📐",
        accentColor: "#3B82F6",
        bgGradient: "from-blue-500 to-indigo-600",
        teacherName: "Er. Amit Verma",
        teacherAvatar: "🤖",
        chaptersCount: 5,
        totalVideos: 15,
        totalMaterials: 10,
        chapters: [
          {
            id: "c8-m-ch1",
            chapterNumber: 1,
            title: "Rational Numbers & Number Line Density",
            summary: "Operations, commutative and distributive properties of rational numbers.",
            progressPercent: 85,
            videos: [],
            materials: [],
            assignments: [],
            tests: [],
          },
          {
            id: "c8-m-ch2",
            chapterNumber: 2,
            title: "Linear Equations in One Variable",
            summary: "Solving equations with variables on both sides and real-life age problems.",
            progressPercent: 50,
            videos: [],
            materials: [],
            assignments: [],
            tests: [],
          },
        ],
      },
      {
        id: "c8-sci",
        name: "Science (Physics, Chem, Bio)",
        slug: "science",
        icon: "⚡",
        accentColor: "#10B981",
        bgGradient: "from-emerald-500 to-teal-600",
        teacherName: "Dr. Rahul Sharma",
        teacherAvatar: "🦸",
        chaptersCount: 5,
        totalVideos: 14,
        totalMaterials: 9,
        chapters: [
          {
            id: "c8-s-ch1",
            chapterNumber: 1,
            title: "Force and Pressure: Contact vs Non-Contact",
            summary: "Atmospheric pressure, buoyant force, friction and applications.",
            progressPercent: 70,
            videos: [],
            materials: [],
            assignments: [],
            tests: [],
          },
        ],
      },
      {
        id: "c8-eng",
        name: "English",
        slug: "english",
        icon: "📖",
        accentColor: "#EC4899",
        bgGradient: "from-pink-500 to-rose-600",
        teacherName: "Ms. Ananya Roy",
        teacherAvatar: "🐱",
        chaptersCount: 5,
        totalVideos: 10,
        totalMaterials: 6,
        chapters: [],
      },
      {
        id: "c8-sst",
        name: "Social Studies",
        slug: "social-studies",
        icon: "🌍",
        accentColor: "#F59E0B",
        bgGradient: "from-amber-500 to-orange-600",
        teacherName: "Mr. Rajesh Nair",
        teacherAvatar: "🦖",
        chaptersCount: 5,
        totalVideos: 10,
        totalMaterials: 6,
        chapters: [],
      },
    ],
  },

  // CLASS 9
  {
    id: "course-c9",
    classLevel: "Class 9",
    title: "Class 9 Board Champions Track",
    badgeTitle: "Grade 9 Full Board Prep",
    subtitle: "Complete CBSE/State Board syllabus: Maths, Physics, Chemistry, Biology, English & SST!",
    mascot: "🦉",
    mascotName: "Professor Hoot",
    themeColor: "#EC4899",
    bgGradient: "from-pink-500 via-rose-600 to-amber-500",
    monthlyPrice: 1299,
    originalPrice: 1999,
    annualPrice: 11999,
    discountPercent: 35,
    activeOffer: "Board Champion Launch: 35% OFF!",
    enrolledStudentsCount: 680,
    totalSubjects: 6,
    totalChapters: 24,
    subjects: [
      {
        id: "c9-math",
        name: "Mathematics",
        slug: "mathematics",
        icon: "📐",
        accentColor: "#3B82F6",
        bgGradient: "from-blue-500 to-indigo-600",
        teacherName: "Er. Amit Verma",
        teacherAvatar: "🤖",
        chaptersCount: 5,
        totalVideos: 16,
        totalMaterials: 11,
        chapters: [
          {
            id: "c9-m-ch1",
            chapterNumber: 1,
            title: "Number Systems & Irrational Numbers",
            summary: "Representation of √x on number line, laws of exponents, rationalizing denominators.",
            progressPercent: 95,
            videos: [
              {
                id: "v-c9-m-1",
                title: "Rationalizing Surds & Exponent Power Laws",
                teacher: "Er. Amit Verma",
                teacherAvatar: "🤖",
                duration: "38 mins",
                durationMinutes: 38,
                videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                thumbnail: "/thumbnails/math9.jpg",
                views: 740,
                isBookmarked: true,
                isCompleted: true,
              },
            ],
            materials: [],
            assignments: [],
            tests: [],
          },
          {
            id: "c9-m-ch2",
            chapterNumber: 2,
            title: "Polynomials & Remainder Theorem",
            summary: "Zeros of polynomial, Factor Theorem, and algebraic identities.",
            progressPercent: 60,
            videos: [],
            materials: [],
            assignments: [],
            tests: [],
          },
        ],
      },
      {
        id: "c9-phy",
        name: "Physics",
        slug: "physics",
        icon: "⚡",
        accentColor: "#6366F1",
        bgGradient: "from-indigo-500 to-purple-600",
        teacherName: "Dr. Rahul Sharma",
        teacherAvatar: "🦸",
        chaptersCount: 4,
        totalVideos: 12,
        totalMaterials: 8,
        chapters: [
          {
            id: "c9-p-ch1",
            chapterNumber: 1,
            title: "Motion & Graphical Kinematics (v-t, s-t)",
            summary: "Equations of motion (v = u + at, s = ut + 0.5at², v² - u² = 2as) and uniform circular motion.",
            progressPercent: 75,
            videos: [],
            materials: [],
            assignments: [],
            tests: [],
          },
        ],
      },
      {
        id: "c9-chem",
        name: "Chemistry",
        slug: "chemistry",
        icon: "🧪",
        accentColor: "#06B6D4",
        bgGradient: "from-cyan-500 to-blue-600",
        teacherName: "Prof. Priya Saxena",
        teacherAvatar: "🦄",
        chaptersCount: 4,
        totalVideos: 12,
        totalMaterials: 8,
        chapters: [
          {
            id: "c9-c-ch1",
            chapterNumber: 1,
            title: "Matter in Our Surroundings & States of Matter",
            summary: "Diffusion, latent heat of fusion, vaporization, and evaporation cooling factors.",
            progressPercent: 80,
            videos: [],
            materials: [],
            assignments: [],
            tests: [],
          },
        ],
      },
      {
        id: "c9-bio",
        name: "Biology",
        slug: "biology",
        icon: "🌿",
        accentColor: "#10B981",
        bgGradient: "from-emerald-500 to-teal-600",
        teacherName: "Dr. Neha Sen",
        teacherAvatar: "🦉",
        chaptersCount: 4,
        totalVideos: 10,
        totalMaterials: 7,
        chapters: [
          {
            id: "c9-b-ch1",
            chapterNumber: 1,
            title: "The Fundamental Unit of Life: Cell Structure",
            summary: "Mitochondria, Endoplasmic Reticulum, Golgi Apparatus, Nucleus, and Osmosis.",
            progressPercent: 65,
            videos: [],
            materials: [],
            assignments: [],
            tests: [],
          },
        ],
      },
      {
        id: "c9-eng",
        name: "English",
        slug: "english",
        icon: "📖",
        accentColor: "#EC4899",
        bgGradient: "from-pink-500 to-rose-600",
        teacherName: "Ms. Ananya Roy",
        teacherAvatar: "🐱",
        chaptersCount: 4,
        totalVideos: 8,
        totalMaterials: 6,
        chapters: [],
      },
      {
        id: "c9-sst",
        name: "Social Studies",
        slug: "social-studies",
        icon: "🌍",
        accentColor: "#F59E0B",
        bgGradient: "from-amber-500 to-orange-600",
        teacherName: "Mr. Rajesh Nair",
        teacherAvatar: "🦖",
        chaptersCount: 4,
        totalVideos: 8,
        totalMaterials: 5,
        chapters: [],
      },
    ],
  },

  // CLASS 10
  {
    id: "course-c10",
    classLevel: "Class 10",
    title: "Class 10 Board Toppers Special",
    badgeTitle: "Grade 10 Board Excellence",
    subtitle: "Complete 10th Board syllabus with 10-Year Question Bank, NCERT Solutions & Mock Tests!",
    mascot: "🥷",
    mascotName: "Shadow Ninja",
    themeColor: "#F59E0B",
    bgGradient: "from-amber-500 via-orange-600 to-red-500",
    monthlyPrice: 1499,
    originalPrice: 2299,
    annualPrice: 13999,
    discountPercent: 35,
    activeOffer: "10th Board Topper Deal: 35% OFF + Free Mock Series!",
    enrolledStudentsCount: 890,
    totalSubjects: 6,
    totalChapters: 28,
    subjects: [
      {
        id: "c10-math",
        name: "Mathematics",
        slug: "mathematics",
        icon: "📐",
        accentColor: "#3B82F6",
        bgGradient: "from-blue-500 to-indigo-600",
        teacherName: "Er. Amit Verma",
        teacherAvatar: "🤖",
        chaptersCount: 6,
        totalVideos: 20,
        totalMaterials: 14,
        chapters: [
          {
            id: "c10-m-ch1",
            chapterNumber: 1,
            title: "Real Numbers & Fundamental Theorem of Arithmetic",
            summary: "Euclid's division lemma, proving irrationality of √2, √3, and decimal expansions.",
            progressPercent: 90,
            videos: [
              {
                id: "v-c10-m-1",
                title: "Fundamental Theorem of Arithmetic & Proof of Irrationals",
                teacher: "Er. Amit Verma",
                teacherAvatar: "🤖",
                duration: "42 mins",
                durationMinutes: 42,
                videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                thumbnail: "/thumbnails/math10.jpg",
                views: 1240,
                isBookmarked: true,
                isCompleted: true,
              },
            ],
            materials: [
              {
                id: "mat-c10-m-1",
                title: "Class 10 Real Numbers 10-Year Board Questions & Solutions",
                fileType: "PDF",
                fileSize: "4.2 MB",
                downloadUrl: "#",
                pagesCount: 16,
                downloadsCount: 890,
              },
            ],
            assignments: [],
            tests: [],
          },
          {
            id: "c10-m-ch2",
            chapterNumber: 2,
            title: "Quadratic Equations: Factorization & Formula",
            summary: "Discriminant, nature of roots, word problems on speed, time, and geometry.",
            progressPercent: 80,
            videos: [],
            materials: [],
            assignments: [],
            tests: [],
          },
          {
            id: "c10-m-ch3",
            chapterNumber: 3,
            title: "Introduction to Trigonometry & Identities",
            summary: "sin, cos, tan ratios, standard angles (0°, 30°, 45°, 60°, 90°), and trigonometric proofs.",
            progressPercent: 60,
            videos: [],
            materials: [],
            assignments: [],
            tests: [],
          },
        ],
      },
      {
        id: "c10-phy",
        name: "Physics",
        slug: "physics",
        icon: "⚡",
        accentColor: "#6366F1",
        bgGradient: "from-indigo-500 to-purple-600",
        teacherName: "Dr. Rahul Sharma",
        teacherAvatar: "🦸",
        chaptersCount: 4,
        totalVideos: 15,
        totalMaterials: 10,
        chapters: [
          {
            id: "c10-p-ch1",
            chapterNumber: 1,
            title: "Light: Reflection and Refraction (Mirror & Lens Formula)",
            summary: "Ray diagrams for concave/convex mirrors, refractive index, and lens power (P = 1/f).",
            progressPercent: 85,
            videos: [
              {
                id: "v-c10-p-1",
                title: "Ray Diagrams Mastery & Mirror Formula Sign Conventions",
                teacher: "Dr. Rahul Sharma",
                teacherAvatar: "🦸",
                duration: "45 mins",
                durationMinutes: 45,
                videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                thumbnail: "/thumbnails/phy10.jpg",
                views: 1120,
                isBookmarked: true,
                isCompleted: true,
              },
            ],
            materials: [],
            assignments: [],
            tests: [],
          },
          {
            id: "c10-p-ch2",
            chapterNumber: 2,
            title: "Electricity: Ohm's Law, Resistance in Series & Parallel",
            summary: "Electric potential, Ohm's law, resistivity, Joule's heating effect, and electric power.",
            progressPercent: 70,
            videos: [],
            materials: [],
            assignments: [],
            tests: [],
          },
        ],
      },
      {
        id: "c10-chem",
        name: "Chemistry",
        slug: "chemistry",
        icon: "🧪",
        accentColor: "#06B6D4",
        bgGradient: "from-cyan-500 to-blue-600",
        teacherName: "Prof. Priya Saxena",
        teacherAvatar: "🦄",
        chaptersCount: 4,
        totalVideos: 14,
        totalMaterials: 10,
        chapters: [
          {
            id: "c10-c-ch1",
            chapterNumber: 1,
            title: "Chemical Reactions and Equations: Balancing & Types",
            summary: "Combination, decomposition, displacement, double displacement, redox, and corrosion.",
            progressPercent: 88,
            videos: [],
            materials: [],
            assignments: [],
            tests: [],
          },
        ],
      },
      {
        id: "c10-bio",
        name: "Biology",
        slug: "biology",
        icon: "🌿",
        accentColor: "#10B981",
        bgGradient: "from-emerald-500 to-teal-600",
        teacherName: "Dr. Neha Sen",
        teacherAvatar: "🦉",
        chaptersCount: 4,
        totalVideos: 14,
        totalMaterials: 9,
        chapters: [
          {
            id: "c10-b-ch1",
            chapterNumber: 1,
            title: "Life Processes: Nutrition, Respiration & Circulation",
            summary: "Human digestive system, heart mechanism, double circulation, and nephron excretion.",
            progressPercent: 80,
            videos: [],
            materials: [],
            assignments: [],
            tests: [],
          },
        ],
      },
      {
        id: "c10-eng",
        name: "English",
        slug: "english",
        icon: "📖",
        accentColor: "#EC4899",
        bgGradient: "from-pink-500 to-rose-600",
        teacherName: "Ms. Ananya Roy",
        teacherAvatar: "🐱",
        chaptersCount: 5,
        totalVideos: 10,
        totalMaterials: 8,
        chapters: [],
      },
      {
        id: "c10-sst",
        name: "Social Studies",
        slug: "social-studies",
        icon: "🌍",
        accentColor: "#F59E0B",
        bgGradient: "from-amber-500 to-orange-600",
        teacherName: "Mr. Rajesh Nair",
        teacherAvatar: "🦖",
        chaptersCount: 5,
        totalVideos: 10,
        totalMaterials: 8,
        chapters: [],
      },
    ],
  },
];

// -------------------------------------------------------------
// ACADEMIC CALENDAR & HOLIDAYS DATA
// -------------------------------------------------------------
export const DEFAULT_ACADEMIC_HOLIDAYS: AcademicHoliday[] = [
  {
    id: "hol-1",
    title: "Diwali & Deepawali Vacation",
    date: "Nov 14 – Nov 17, 2026",
    type: "Festival",
    description: "Festival of Lights holiday break. Recorded classes and practice quizzes remain open 24/7!",
  },
  {
    id: "hol-2",
    title: "Guru Nanak Jayanti",
    date: "Nov 24, 2026",
    type: "Government",
    description: "Gazetted National Holiday. Live classes suspended; doubt room remains active.",
  },
  {
    id: "hol-3",
    title: "All-India Science Talent Olympiad Mock Exam",
    date: "Nov 28, 2026",
    type: "Exam Day",
    description: "Online Computer-Based Test (CBT) for Classes 6th to 10th from 10:00 AM to 1:00 PM.",
  },
  {
    id: "hol-4",
    title: "Special Sunday Doubt Clearing Marathon",
    date: "Nov 29, 2026",
    type: "Special Class",
    description: "Interactive live Zoom session with senior subject mentors for high-difficulty questions.",
  },
  {
    id: "hol-5",
    title: "Christmas & New Year Winter Break",
    date: "Dec 25 – Jan 01, 2027",
    type: "Festival",
    description: "Winter holiday celebration. Revision assignments will be accessible on the portal.",
  },
];

// -------------------------------------------------------------
// STUDENT PERFORMANCE RECORD SAMPLES
// -------------------------------------------------------------
export const SAMPLE_STUDENT_PERFORMANCE: StudentPerformanceRecord = {
  studentId: "STD-1001",
  studentName: "Aryan Sharma",
  classLevel: "Class 8",
  overallPercentage: 88.5,
  totalMarksObtained: 442,
  totalMaxMarks: 500,
  rankInBatch: 3,
  weakSubjects: ["Chemistry Equations", "Grammar Tenses"],
  strongSubjects: ["Mathematics Algebra", "Physics Motion", "Biology Cells"],
  monthlyProgress: [
    { month: "July", score: 78 },
    { month: "August", score: 82 },
    { month: "September", score: 85 },
    { month: "October", score: 87 },
    { month: "November", score: 91 },
  ],
  subjectScores: [
    { subject: "Mathematics", marks: 96, maxMarks: 100, grade: "A1", trend: "up" },
    { subject: "Science (Physics)", marks: 92, maxMarks: 100, grade: "A1", trend: "up" },
    { subject: "Science (Biology)", marks: 88, maxMarks: 100, grade: "A2", trend: "steady" },
    { subject: "Science (Chemistry)", marks: 80, maxMarks: 100, grade: "B1", trend: "down" },
    { subject: "English Literature", marks: 86, maxMarks: 100, grade: "A2", trend: "up" },
  ],
};

// -------------------------------------------------------------
// COUPONS & DISCOUNTS
// -------------------------------------------------------------
export interface CouponCode {
  code: string;
  discountPercent: number;
  description: string;
  validUntil: string;
}

export const ACTIVE_COUPONS: CouponCode[] = [
  { code: "CARTOON50", discountPercent: 50, description: "Flat 50% discount for new cartoon club learners", validUntil: "Dec 31, 2026" },
  { code: "KIDS2026", discountPercent: 30, description: "30% off on all Classes 6th to 10th monthly plans", validUntil: "Nov 30, 2026" },
  { code: "DEEPSIDDHI", discountPercent: 25, description: "Institutional scholarship special voucher", validUntil: "Ongoing" },
];

// -------------------------------------------------------------
// SAMPLE FEEDBACK & REVIEWS
// -------------------------------------------------------------
export const SAMPLE_FEEDBACK_LIST: StudentFeedbackEntry[] = [
  {
    id: "fb-1",
    studentName: "Aryan Sharma",
    studentAvatar: "🚀",
    classLevel: "Class 8",
    targetType: "Teacher",
    targetName: "Dr. Rahul Sharma (Physics)",
    rating: 5,
    comment: "The animated cartoon derivations on Force and Friction made the topic super easy to remember!",
    createdAt: "Yesterday",
    adminReply: "Thank you Aryan! Keep shining and aiming for top marks! 🌟",
    status: "published",
  },
  {
    id: "fb-2",
    studentName: "Meera Nair",
    studentAvatar: "🦖",
    classLevel: "Class 6",
    targetType: "Course",
    targetName: "Class 6 Junior Champs Adventure",
    rating: 5,
    comment: "I love the subfolder structure! Everything is so neatly organized by chapter and video.",
    createdAt: "2 days ago",
    adminReply: "Glad you love the organized folders, Meera! Happy learning! 🎒",
    status: "published",
  },
  {
    id: "fb-3",
    studentName: "Tanmay Roy",
    studentAvatar: "🤖",
    classLevel: "Class 10",
    targetType: "Recorded Class",
    targetName: "Light: Mirror Formula Sign Conventions",
    rating: 5,
    comment: "The playback speed controls and bookmark feature helped me revise 3 times before my school unit test.",
    createdAt: "3 days ago",
    status: "published",
  },
];
