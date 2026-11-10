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
  subject: string;
  chapter: string;
  faculty: string;
  duration: string;
  videoUrl: string;
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
  course: string;
  class: string;
  date: string;
  status: "Active" | "Pending" | "Suspended";
}

export interface LMSBatch {
  id: string;
  name: string;
  timing: string;
  days: string;
  faculty: string;
  studentsCount: number;
}

// Initial Sample Data for out-of-the-box readiness
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
    description: "Complete foundational to advanced preparation for JEE Main & JEE Advanced.",
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
    description: "Specialized training for National Standard Examination in Physics and INPhO.",
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
    description: "Stage 1 and Stage 2 mental ability, logic, and scholastic aptitude mastery.",
    color: "from-[#094A44] via-[#0E635C] to-[#073632]",
  },
];

const DEFAULT_MATERIALS: LMSMaterial[] = [
  {
    id: "mat-1",
    title: "Rotational Dynamics: Complete Comprehensive Formula Sheet & Shortcut Map",
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
    subject: "Mathematics",
    chapter: "Calculus Mastery",
    fileSize: "8.5 MB",
    fileType: "DPP",
    downloadsCount: 1820,
    dateUploaded: "1 week ago",
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
    category: "Topic",
    questionsCount: 20,
    duration: "40 Mins",
    totalMarks: 80,
    status: "Completed",
    questions: [],
  },
  {
    id: "test-4",
    title: "National Talent Search Stage 1 Grand Assessment",
    category: "Grand",
    questionsCount: 100,
    duration: "120 Mins",
    totalMarks: 200,
    status: "Available",
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

const DEFAULT_STUDENTS: LMSStudent[] = [
  {
    id: "std-1",
    name: "Aryan Sharma",
    email: "aryan@gmail.com",
    phone: "+91 9876543210",
    course: "IIT-JEE Comprehensive",
    class: "Class 11",
    date: "10 mins ago",
    status: "Active",
  },
  {
    id: "std-2",
    name: "Meera Nair",
    email: "meera.nair@outlook.com",
    phone: "+91 9811223344",
    course: "Olympiad Advanced Sprint",
    class: "Class 10",
    date: "35 mins ago",
    status: "Active",
  },
  {
    id: "std-3",
    name: "Tanmay Roy",
    email: "tanmay.roy@gmail.com",
    phone: "+91 9988771122",
    course: "NTSE & Aptitude Mastery",
    class: "Class 9",
    date: "1 hour ago",
    status: "Pending",
  },
];

const DEFAULT_BATCHES: LMSBatch[] = [
  {
    id: "b-1",
    name: "Pratham Batch (Morning)",
    timing: "7:00 AM – 10:00 AM IST",
    days: "Mon, Wed, Fri",
    faculty: "Dr. Rahul Sharma",
    studentsCount: 142,
  },
  {
    id: "b-2",
    name: "Aryabhata Olympiad Batch",
    timing: "6:00 PM – 8:00 PM IST",
    days: "Mon, Wed, Fri",
    faculty: "Dr. Rahul Sharma",
    studentsCount: 88,
  },
  {
    id: "b-3",
    name: "Vidyarthi Foundation Batch",
    timing: "4:00 PM – 5:30 PM IST",
    days: "Tue, Thu, Sat",
    faculty: "Er. Vivek Rathore",
    studentsCount: 95,
  },
];

// Helper to safely access localStorage in client
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

// Global LMS Store Singleton
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

  // Students
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

  // Reset Everything to Default Sample Data
  resetAll: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("lms_courses");
    localStorage.removeItem("lms_materials");
    localStorage.removeItem("lms_live_classes");
    localStorage.removeItem("lms_tests");
    localStorage.removeItem("lms_announcements");
    localStorage.removeItem("lms_students");
    localStorage.removeItem("lms_batches");
    window.dispatchEvent(new Event("lms_store_updated"));
  },
};

// React Hook for automatic real-time updates across components
export function useLMSData() {
  const [courses, setCourses] = useState<LMSCourse[]>([]);
  const [materials, setMaterials] = useState<LMSMaterial[]>([]);
  const [liveClasses, setLiveClasses] = useState<LMSLiveClass[]>([]);
  const [tests, setTests] = useState<LMSTest[]>([]);
  const [announcements, setAnnouncements] = useState<LMSAnnouncement[]>([]);
  const [students, setStudents] = useState<LMSStudent[]>([]);
  const [batches, setBatches] = useState<LMSBatch[]>([]);

  const refreshAll = () => {
    setCourses(LMSStore.getCourses());
    setMaterials(LMSStore.getMaterials());
    setLiveClasses(LMSStore.getLiveClasses());
    setTests(LMSStore.getTests());
    setAnnouncements(LMSStore.getAnnouncements());
    setStudents(LMSStore.getStudents());
    setBatches(LMSStore.getBatches());
  };

  useEffect(() => {
    refreshAll();
    const handleUpdate = () => refreshAll();
    window.addEventListener("lms_store_updated", handleUpdate);
    return () => window.removeEventListener("lms_store_updated", handleUpdate);
  }, []);

  return {
    courses,
    materials,
    liveClasses,
    tests,
    announcements,
    students,
    batches,
    store: LMSStore,
    refreshAll,
  };
}
