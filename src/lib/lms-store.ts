"use client";

import { useState, useEffect } from "react";

export interface LMSCourse {
  id: string;
  title: string;
  category: "IIT-JEE" | "Olympiad" | "NTSE" | "Foundation";
  targetClass: string;
  faculty: string;
  price: number;
  discountedPrice: number;
  totalLessons: number;
  duration: string;
  isPublished: boolean;
  enrolledCount: number;
  description: string;
  color?: string;
}

export interface LMSMaterial {
  id: string;
  title: string;
  courseTitle: string;
  subject: "Physics" | "Chemistry" | "Mathematics" | "General";
  chapter: string;
  fileSize: string;
  fileType: "PDF" | "Formula Sheet" | "DPP" | "Notes";
  downloadUrl?: string;
  downloadsCount: number;
  dateUploaded: string;
}

export interface LMSLiveClass {
  id: string;
  title: string;
  course: string;
  batch: string;
  faculty: string;
  scheduledAt: string;
  duration: string;
  status: "live" | "upcoming" | "completed";
  meetingProvider: "zoom" | "google_meet";
  meetingUrl: string;
  passcode: string;
  description: string;
  enrolledStudentsCount: number;
}

export interface LMSRecordedClass {
  id: string;
  title: string;
  course: string;
  subject: string;
  chapter: string;
  faculty: string;
  duration: string;
  videoUrl: string;
  viewsCount: number;
  isPublished: boolean;
  date: string;
}

export interface LMSTestQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LMSTest {
  id: string;
  title: string;
  courseTitle: string;
  category: "Sectional" | "Topic" | "Mock" | "Grand";
  questionsCount: number;
  duration: string;
  totalMarks: number;
  status: "Available" | "Completed";
  questions: LMSTestQuestion[];
}

export interface LMSAnnouncement {
  id: string;
  title: string;
  category: "Academic Update" | "Study Material" | "Test Alert" | "General";
  message: string;
  date: string;
  priority: "high" | "normal";
}

export interface LMSStudent {
  id: string;
  name: string;
  email: string;
  phone: string;
  enrolledCourses: string[]; // List of courses assigned to this student
  batchName: string;
  classLevel: string;
  joinedDate: string;
  progress: number;
  status: "Active" | "Pending" | "Suspended";
}

export interface LMSBatch {
  id: string;
  name: string;
  courseTitle: string;
  timing: string;
  startDate: string;
  days: string;
  faculty: string;
  maxStudents: number;
  currentEnrolled: number;
  status: "active" | "filling" | "completed";
}

// Initial Default Data
const DEFAULT_COURSES: LMSCourse[] = [
  {
    id: "c-1",
    title: "IIT-JEE Comprehensive Mastery 2026-27",
    category: "IIT-JEE",
    targetClass: "Class 11 – 12",
    faculty: "Dr. Rahul Sharma & Er. Amit Verma",
    price: 49999,
    discountedPrice: 34999,
    totalLessons: 240,
    duration: "24 Months",
    isPublished: true,
    enrolledCount: 420,
    description: "Two-year integrated Physics, Chemistry & Mathematics for JEE Main & Advanced.",
    color: "from-[#0C335C] via-[#104375] to-[#0A2A4D]",
  },
  {
    id: "c-2",
    title: "Physics Olympiad Advanced Sprint (NSEP & INPhO)",
    category: "Olympiad",
    targetClass: "Classes 6 – 12",
    faculty: "Dr. Rahul Sharma",
    price: 24999,
    discountedPrice: 18999,
    totalLessons: 80,
    duration: "6 Months",
    isPublished: true,
    enrolledCount: 185,
    description: "Specialized Olympiad physics training for NSEP, INPhO, and international contests.",
    color: "from-[#4E146E] via-[#6B1F96] to-[#3B0E54]",
  },
  {
    id: "c-3",
    title: "National Talent Search (NTSE) & Aptitude Mastery",
    category: "NTSE",
    targetClass: "Class 8 – 10",
    faculty: "Er. Vivek Rathore",
    price: 19999,
    discountedPrice: 12999,
    totalLessons: 60,
    duration: "6 Months",
    isPublished: true,
    enrolledCount: 237,
    description: "Mental Ability Test (MAT) and Scholastic Aptitude Test (SAT) preparation.",
    color: "from-[#094A44] via-[#0E635C] to-[#073632]",
  },
];

const DEFAULT_BATCHES: LMSBatch[] = [
  {
    id: "b-1",
    name: "Pratham Batch (Morning)",
    courseTitle: "IIT-JEE Comprehensive Mastery 2026-27",
    timing: "7:00 AM – 10:00 AM IST",
    startDate: "Nov 15, 2026",
    days: "Mon, Wed, Fri",
    faculty: "Dr. Rahul Sharma",
    maxStudents: 150,
    currentEnrolled: 136,
    status: "filling",
  },
  {
    id: "b-2",
    name: "Aryabhata Olympiad Batch",
    courseTitle: "Physics Olympiad Advanced Sprint (NSEP & INPhO)",
    timing: "6:00 PM – 8:00 PM IST",
    startDate: "Nov 10, 2026",
    days: "Mon, Wed, Fri",
    faculty: "Dr. Rahul Sharma",
    maxStudents: 75,
    currentEnrolled: 64,
    status: "filling",
  },
  {
    id: "b-3",
    name: "Vidyarthi Foundation Batch",
    courseTitle: "National Talent Search (NTSE) & Aptitude Mastery",
    timing: "4:00 PM – 5:30 PM IST",
    startDate: "Oct 20, 2026",
    days: "Tue, Thu, Sat",
    faculty: "Er. Vivek Rathore",
    maxStudents: 100,
    currentEnrolled: 98,
    status: "active",
  },
];

const DEFAULT_STUDENTS: LMSStudent[] = [
  {
    id: "STD-1001",
    name: "Aryan Sharma",
    email: "student@deepsiddhi.org",
    phone: "+91 9876543210",
    enrolledCourses: ["IIT-JEE Comprehensive Mastery 2026-27", "Physics Olympiad Advanced Sprint (NSEP & INPhO)"],
    batchName: "Pratham Batch (Morning)",
    classLevel: "Class 11",
    joinedDate: "Nov 1, 2026",
    progress: 72,
    status: "Active",
  },
  {
    id: "STD-1002",
    name: "Meera Nair",
    email: "meera.nair@outlook.com",
    phone: "+91 9811223344",
    enrolledCourses: ["Physics Olympiad Advanced Sprint (NSEP & INPhO)"],
    batchName: "Aryabhata Olympiad Batch",
    classLevel: "Class 10",
    joinedDate: "Nov 3, 2026",
    progress: 45,
    status: "Active",
  },
  {
    id: "STD-1003",
    name: "Tanmay Roy",
    email: "tanmay.roy@gmail.com",
    phone: "+91 9988771122",
    enrolledCourses: ["National Talent Search (NTSE) & Aptitude Mastery"],
    batchName: "Vidyarthi Foundation Batch",
    classLevel: "Class 9",
    joinedDate: "Oct 28, 2026",
    progress: 86,
    status: "Active",
  },
  {
    id: "STD-1004",
    name: "Kavya Iyer",
    email: "kavya.iyer@gmail.com",
    phone: "+91 9765432109",
    enrolledCourses: ["IIT-JEE Comprehensive Mastery 2026-27"],
    batchName: "Pratham Batch (Morning)",
    classLevel: "Class 12",
    joinedDate: "Nov 5, 2026",
    progress: 60,
    status: "Pending",
  },
];

const DEFAULT_MATERIALS: LMSMaterial[] = [
  {
    id: "mat-1",
    title: "Rotational Dynamics: Complete Comprehensive Formula Sheet & Shortcut Map",
    courseTitle: "IIT-JEE Comprehensive Mastery 2026-27",
    subject: "Physics",
    chapter: "Chapter 4: Rotational Mechanics",
    fileSize: "2.4 MB",
    fileType: "Formula Sheet",
    downloadsCount: 1420,
    dateUploaded: "Yesterday",
  },
  {
    id: "mat-2",
    title: "Master Handwritten Notes: Parallel Axis Theorem & Rolling Bodies",
    courseTitle: "IIT-JEE Comprehensive Mastery 2026-27",
    subject: "Physics",
    chapter: "Chapter 4: Rotational Mechanics",
    fileSize: "6.8 MB",
    fileType: "Notes",
    downloadsCount: 2190,
    dateUploaded: "2 days ago",
  },
  {
    id: "mat-3",
    title: "Organic Chemistry Reaction Mechanism Map (45 Conversions)",
    courseTitle: "IIT-JEE Comprehensive Mastery 2026-27",
    subject: "Chemistry",
    chapter: "Chapter 3: Reaction Mechanisms",
    fileSize: "4.1 MB",
    fileType: "PDF",
    downloadsCount: 3840,
    dateUploaded: "3 days ago",
  },
  {
    id: "mat-4",
    title: "Calculus & Coordinate Geometry 200 Advanced Numerical Problem Bank",
    courseTitle: "IIT-JEE Comprehensive Mastery 2026-27",
    subject: "Mathematics",
    chapter: "Calculus Mastery",
    fileSize: "8.5 MB",
    fileType: "DPP",
    downloadsCount: 1820,
    dateUploaded: "1 week ago",
  },
];

const DEFAULT_RECORDED_CLASSES: LMSRecordedClass[] = [
  {
    id: "rec-1",
    title: "Lecture 1: Rigid Body Rotation & Angular Kinematics",
    course: "IIT-JEE Comprehensive Mastery 2026-27",
    subject: "Physics",
    chapter: "Chapter 4: Rotational Mechanics",
    faculty: "Dr. Rahul Sharma",
    duration: "45 mins",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    viewsCount: 382,
    isPublished: true,
    date: "Yesterday",
  },
  {
    id: "rec-2",
    title: "Lecture 2: Moment of Inertia for Continuous Bodies & Integration",
    course: "IIT-JEE Comprehensive Mastery 2026-27",
    subject: "Physics",
    chapter: "Chapter 4: Rotational Mechanics",
    faculty: "Dr. Rahul Sharma",
    duration: "52 mins",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    viewsCount: 341,
    isPublished: true,
    date: "2 days ago",
  },
  {
    id: "rec-3",
    title: "Lecture 3: Organic Reaction Mechanisms SN1 vs SN2 Inversion",
    course: "IIT-JEE Comprehensive Mastery 2026-27",
    subject: "Chemistry",
    chapter: "Chapter 3: Reaction Mechanisms",
    faculty: "Prof. Priya Saxena",
    duration: "48 mins",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    viewsCount: 412,
    isPublished: true,
    date: "3 days ago",
  },
];

const DEFAULT_LIVE_CLASSES: LMSLiveClass[] = [
  {
    id: "lc-1",
    title: "Advanced Problem Solving: Magnetism & Biot-Savart Law Numerical Drill",
    course: "IIT-JEE Comprehensive Mastery 2026-27",
    batch: "Pratham Batch (Morning)",
    faculty: "Dr. Rahul Sharma",
    scheduledAt: "Today, 5:00 PM – 6:30 PM IST",
    duration: "90 Minutes",
    status: "live",
    meetingProvider: "zoom",
    meetingUrl: "https://zoom.us/j/9876543210?pwd=deepsiddhi",
    passcode: "DEEPSIDDHI-2026",
    description: "Derivations and speed shortcuts for non-standard current wire geometry.",
    enrolledStudentsCount: 142,
  },
  {
    id: "lc-2",
    title: "Organic Chemistry: SN1 & SN2 Stereochemical Inversion Masterclass",
    course: "IIT-JEE Comprehensive Mastery 2026-27",
    batch: "Pratham Batch (Morning)",
    faculty: "Prof. Priya Saxena",
    scheduledAt: "Tomorrow, 7:00 AM – 8:30 AM IST",
    duration: "90 Minutes",
    status: "upcoming",
    meetingProvider: "zoom",
    meetingUrl: "https://zoom.us/j/9876543211?pwd=deepsiddhi",
    passcode: "DEEPSIDDHI-2026",
    description: "Walden inversion, solvent polarities, and nucleophilicity trends.",
    enrolledStudentsCount: 138,
  },
];

const DEFAULT_TESTS: LMSTest[] = [
  {
    id: "test-1",
    title: "All India JEE Mock Test #08 (Full Length)",
    courseTitle: "IIT-JEE Comprehensive Mastery 2026-27",
    category: "Mock",
    questionsCount: 75,
    duration: "180 Mins",
    totalMarks: 300,
    status: "Available",
    questions: [
      {
        id: 1,
        question:
          "A solid sphere and a hollow sphere of identical mass and radius roll down an inclined plane without slipping from rest. Which sphere reaches the bottom first?",
        options: [
          "Hollow sphere, because of greater moment of inertia",
          "Solid sphere, because it has smaller moment of inertia and thus greater acceleration",
          "Both reach the bottom at the same time since mass and radius are identical",
          "Depends on the angle of inclination of the plane",
        ],
        correctIndex: 1,
        explanation:
          "Acceleration in rolling down an incline is a = g sin(θ) / (1 + I / (mR²)). For a solid sphere I = 2/5 mR², while for a hollow sphere I = 2/3 mR². Thus solid sphere has higher acceleration and reaches first.",
      },
      {
        id: 2,
        question:
          "Which of the following carbocations is the MOST stable according to hyperconjugation and resonance effects?",
        options: [
          "Allyl carbocation (CH2=CH-CH2+)",
          "Tropylium cation (C7H7+)",
          "Tert-butyl carbocation ((CH3)3C+)",
          "Benzyl carbocation (C6H5-CH2+)",
        ],
        correctIndex: 1,
        explanation:
          "Tropylium cation has 6 pi electrons in a planar aromatic 7-membered ring satisfying Huckel's rule (4n+2 with n=1), imparting extraordinary aromatic resonance stability.",
      },
    ],
  },
  {
    id: "test-2",
    title: "Rotational Dynamics & Gravity Chapter Speed Test",
    courseTitle: "IIT-JEE Comprehensive Mastery 2026-27",
    category: "Sectional",
    questionsCount: 25,
    duration: "45 Mins",
    totalMarks: 100,
    status: "Available",
    questions: [],
  },
  {
    id: "test-3",
    title: "Organic Reaction Mechanisms & Isomerism Quiz",
    courseTitle: "IIT-JEE Comprehensive Mastery 2026-27",
    category: "Topic",
    questionsCount: 20,
    duration: "40 Mins",
    totalMarks: 80,
    status: "Completed",
    questions: [],
  },
];

const DEFAULT_ANNOUNCEMENTS: LMSAnnouncement[] = [
  {
    id: "ann-1",
    title: "Special Doubt Clearing Session with Er. Amit Verma",
    category: "Academic Update",
    message: "Special Doubt Clearing Session for Rotational Mechanics and Calculus scheduled for this Saturday at 4 PM.",
    date: "4 hours ago",
    priority: "high",
  },
  {
    id: "ann-2",
    title: "New 200-Question Chemistry Problem Bank Released",
    category: "Study Material",
    message: "Comprehensive problem set with complete handwritten solutions has been uploaded to Study Materials.",
    date: "Yesterday",
    priority: "normal",
  },
];

function getStored<T>(key: string, defaultVal: T): T {
  if (typeof window === "undefined") return defaultVal;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultVal;
    return JSON.parse(raw);
  } catch {
    return defaultVal;
  }
}

function setStored<T>(key: string, val: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(val));
    window.dispatchEvent(new Event("lms_store_updated"));
  } catch (e) {
    console.error("LMS Store save error:", e);
  }
}

export const LMSStore = {
  // Courses
  getCourses: (): LMSCourse[] => getStored("lms_courses", DEFAULT_COURSES),
  saveCourses: (courses: LMSCourse[]) => setStored("lms_courses", courses),
  addCourse: (course: LMSCourse) => {
    const current = LMSStore.getCourses();
    LMSStore.saveCourses([course, ...current]);
  },
  deleteCourse: (id: string) => {
    const current = LMSStore.getCourses();
    LMSStore.saveCourses(current.filter((c) => c.id !== id));
  },
  togglePublishCourse: (id: string) => {
    const current = LMSStore.getCourses();
    LMSStore.saveCourses(
      current.map((c) => (c.id === id ? { ...c, isPublished: !c.isPublished } : c))
    );
  },

  // Batches
  getBatches: (): LMSBatch[] => getStored("lms_batches", DEFAULT_BATCHES),
  saveBatches: (batches: LMSBatch[]) => setStored("lms_batches", batches),
  addBatch: (batch: LMSBatch) => {
    const current = LMSStore.getBatches();
    LMSStore.saveBatches([batch, ...current]);
  },
  deleteBatch: (id: string) => {
    const current = LMSStore.getBatches();
    LMSStore.saveBatches(current.filter((b) => b.id !== id));
  },

  // Students & Course Enrollment
  getStudents: (): LMSStudent[] => getStored("lms_students", DEFAULT_STUDENTS),
  saveStudents: (students: LMSStudent[]) => setStored("lms_students", students),
  addStudent: (student: LMSStudent) => {
    const current = LMSStore.getStudents();
    LMSStore.saveStudents([student, ...current]);
  },
  deleteStudent: (id: string) => {
    const current = LMSStore.getStudents();
    LMSStore.saveStudents(current.filter((s) => s.id !== id));
  },
  enrollStudentInCourse: (studentId: string, courseTitle: string, batchName?: string) => {
    const current = LMSStore.getStudents();
    LMSStore.saveStudents(
      current.map((s) => {
        if (s.id === studentId) {
          const already = s.enrolledCourses.includes(courseTitle);
          const updatedCourses = already ? s.enrolledCourses : [...s.enrolledCourses, courseTitle];
          return {
            ...s,
            enrolledCourses: updatedCourses,
            batchName: batchName || s.batchName,
          };
        }
        return s;
      })
    );
  },
  toggleStudentStatus: (studentId: string) => {
    const current = LMSStore.getStudents();
    LMSStore.saveStudents(
      current.map((s) =>
        s.id === studentId
          ? { ...s, status: s.status === "Active" ? "Suspended" : "Active" }
          : s
      )
    );
  },

  // Materials
  getMaterials: (): LMSMaterial[] => getStored("lms_materials", DEFAULT_MATERIALS),
  saveMaterials: (materials: LMSMaterial[]) => setStored("lms_materials", materials),
  addMaterial: (material: LMSMaterial) => {
    const current = LMSStore.getMaterials();
    LMSStore.saveMaterials([material, ...current]);
  },
  deleteMaterial: (id: string) => {
    const current = LMSStore.getMaterials();
    LMSStore.saveMaterials(current.filter((m) => m.id !== id));
  },

  // Recorded Classes
  getRecordedClasses: (): LMSRecordedClass[] => getStored("lms_recorded_classes", DEFAULT_RECORDED_CLASSES),
  saveRecordedClasses: (classes: LMSRecordedClass[]) => setStored("lms_recorded_classes", classes),
  addRecordedClass: (cls: LMSRecordedClass) => {
    const current = LMSStore.getRecordedClasses();
    LMSStore.saveRecordedClasses([cls, ...current]);
  },
  deleteRecordedClass: (id: string) => {
    const current = LMSStore.getRecordedClasses();
    LMSStore.saveRecordedClasses(current.filter((c) => c.id !== id));
  },

  // Live Classes
  getLiveClasses: (): LMSLiveClass[] => getStored("lms_live_classes", DEFAULT_LIVE_CLASSES),
  saveLiveClasses: (classes: LMSLiveClass[]) => setStored("lms_live_classes", classes),
  addLiveClass: (cls: LMSLiveClass) => {
    const current = LMSStore.getLiveClasses();
    LMSStore.saveLiveClasses([cls, ...current]);
  },
  deleteLiveClass: (id: string) => {
    const current = LMSStore.getLiveClasses();
    LMSStore.saveLiveClasses(current.filter((l) => l.id !== id));
  },
  toggleLiveStatus: (id: string) => {
    const current = LMSStore.getLiveClasses();
    LMSStore.saveLiveClasses(
      current.map((l) =>
        l.id === id
          ? { ...l, status: l.status === "live" ? "completed" : "live" }
          : l
      )
    );
  },

  // Tests
  getTests: (): LMSTest[] => getStored("lms_tests", DEFAULT_TESTS),
  saveTests: (tests: LMSTest[]) => setStored("lms_tests", tests),
  addTest: (test: LMSTest) => {
    const current = LMSStore.getTests();
    LMSStore.saveTests([test, ...current]);
  },
  deleteTest: (id: string) => {
    const current = LMSStore.getTests();
    LMSStore.saveTests(current.filter((t) => t.id !== id));
  },

  // Announcements
  getAnnouncements: (): LMSAnnouncement[] => getStored("lms_announcements", DEFAULT_ANNOUNCEMENTS),
  saveAnnouncements: (anns: LMSAnnouncement[]) => setStored("lms_announcements", anns),
  addAnnouncement: (ann: LMSAnnouncement) => {
    const current = LMSStore.getAnnouncements();
    LMSStore.saveAnnouncements([ann, ...current]);
  },
  deleteAnnouncement: (id: string) => {
    const current = LMSStore.getAnnouncements();
    LMSStore.saveAnnouncements(current.filter((a) => a.id !== id));
  },

  // Reset Everything to Default Sample Data
  resetAll: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("lms_courses");
    localStorage.removeItem("lms_batches");
    localStorage.removeItem("lms_students");
    localStorage.removeItem("lms_materials");
    localStorage.removeItem("lms_recorded_classes");
    localStorage.removeItem("lms_live_classes");
    localStorage.removeItem("lms_tests");
    localStorage.removeItem("lms_announcements");
    window.dispatchEvent(new Event("lms_store_updated"));
  },
};

export function useLMSData() {
  const [courses, setCourses] = useState<LMSCourse[]>([]);
  const [batches, setBatches] = useState<LMSBatch[]>([]);
  const [students, setStudents] = useState<LMSStudent[]>([]);
  const [materials, setMaterials] = useState<LMSMaterial[]>([]);
  const [recordedClasses, setRecordedClasses] = useState<LMSRecordedClass[]>([]);
  const [liveClasses, setLiveClasses] = useState<LMSLiveClass[]>([]);
  const [tests, setTests] = useState<LMSTest[]>([]);
  const [announcements, setAnnouncements] = useState<LMSAnnouncement[]>([]);

  const refreshAll = () => {
    setCourses(LMSStore.getCourses());
    setBatches(LMSStore.getBatches());
    setStudents(LMSStore.getStudents());
    setMaterials(LMSStore.getMaterials());
    setRecordedClasses(LMSStore.getRecordedClasses());
    setLiveClasses(LMSStore.getLiveClasses());
    setTests(LMSStore.getTests());
    setAnnouncements(LMSStore.getAnnouncements());
  };

  useEffect(() => {
    refreshAll();
    const handleUpdate = () => refreshAll();
    window.addEventListener("lms_store_updated", handleUpdate);
    return () => window.removeEventListener("lms_store_updated", handleUpdate);
  }, []);

  return {
    courses,
    batches,
    students,
    materials,
    recordedClasses,
    liveClasses,
    tests,
    announcements,
    store: LMSStore,
    refreshAll,
  };
}
