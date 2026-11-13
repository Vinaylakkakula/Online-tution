"use client";

import { useState, useEffect, useCallback } from "react";
import {
  CARTOON_COURSES,
  DEFAULT_ACADEMIC_HOLIDAYS,
  ACTIVE_COUPONS,
  SAMPLE_FEEDBACK_LIST,
  SAMPLE_STUDENT_PERFORMANCE,
  CartoonCourse,
  AcademicHoliday,
  DemoLead,
  StudentPerformanceRecord,
  StudentFeedbackEntry,
  CouponCode,
  VideoItem,
  MaterialItem,
  AssignmentItem,
  TestItem,
  ChapterItem,
  SubjectItem,
} from "./cartoon-lms-data";

export type {
  CartoonCourse,
  AcademicHoliday,
  DemoLead,
  StudentPerformanceRecord,
  StudentFeedbackEntry,
  CouponCode,
  VideoItem,
  MaterialItem,
  AssignmentItem,
  TestItem,
  ChapterItem,
  SubjectItem,
};

export interface StudentBookmark {
  id: string;
  studentId: string;
  targetId: string;
  type: "video" | "material";
  title: string;
  courseTitle: string;
  subject: string;
  chapter: string;
  teacher: string;
  duration?: string;
  videoUrl?: string;
  thumbnail?: string;
  createdAt: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  classLevel: string;
  date: string;
  status: "present" | "absent" | "holiday" | "special_class";
  remarks?: string;
}

export interface EmergencyAlert {
  id: string;
  title: string;
  message: string;
  date: string;
  isActive: boolean;
  declaredAt: string;
}

export interface StudentProfileExtra {
  studentId: string;
  avatarId: string;
  frameId: string;
  titleId: string;
  school: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  coins: number;
  xp: number;
  level: number;
  streakDays: number;
  unlockedBadges: string[];
}

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
  facultyTitle?: string;
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
  courseTitle?: string;
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
  studentsCount?: number;
  status: "active" | "filling" | "completed";
}

export interface LMSEnquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  course: string;
  classLevel: string;
  source: string;
  createdAt: string;
  status: "new" | "contacted" | "enrolled" | "closed";
  notes?: string;
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

const DEFAULT_ENQUIRIES: LMSEnquiry[] = [
  {
    id: "ENQ-501",
    name: "Vikram Malhotra",
    phone: "+91 9899887766",
    email: "vikram.parent@gmail.com",
    course: "IIT-JEE",
    classLevel: "Class 11",
    source: "Website Welcome Popup",
    createdAt: "Today, 11:20 AM",
    status: "new",
  },
  {
    id: "ENQ-502",
    name: "Suresh Pillai",
    phone: "+91 9811002233",
    email: "suresh@yahoo.com",
    course: "Olympiad",
    classLevel: "Class 8",
    source: "Contact Us Form",
    createdAt: "Today, 10:15 AM",
    status: "contacted",
    notes: "Spoke to father. Interested in Physics Olympiad. Demo session booked for Thursday.",
  },
  {
    id: "ENQ-503",
    name: "Deepika Sen",
    phone: "+91 9900112233",
    email: "deepika@gmail.com",
    course: "NTSE",
    classLevel: "Class 10",
    source: "Website Welcome Popup",
    createdAt: "Yesterday",
    status: "enrolled",
    notes: "Payment confirmed. Enrolled in Vidyarthi Batch.",
  },
  {
    id: "ENQ-504",
    name: "Rahul Aggarwal",
    phone: "+91 9711224466",
    email: "rahul.a@outlook.com",
    course: "IIT-JEE",
    classLevel: "Class 12",
    source: "Contact Us Form",
    createdAt: "2 days ago",
    status: "closed",
    notes: "Looking for offline center in Jaipur only.",
  },
];

const DEFAULT_BOOKMARKS: StudentBookmark[] = [
  {
    id: "bmk-1",
    studentId: "STD-1001",
    targetId: "v-c6-m-1",
    type: "video",
    title: "Fun with Large Numbers & Comparing Digits",
    courseTitle: "Class 6 Junior Champs Adventure",
    subject: "Mathematics",
    chapter: "Chapter 1: Knowing Our Numbers",
    teacher: "Er. Amit Verma",
    duration: "24 mins",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    createdAt: "Nov 10, 2026",
  },
  {
    id: "bmk-2",
    studentId: "STD-1001",
    targetId: "v-c6-s-1",
    type: "video",
    title: "Carbohydrates, Fats & Proteins: Lab Tests Demonstration",
    courseTitle: "Class 6 Junior Champs Adventure",
    subject: "General Science",
    chapter: "Chapter 1: Components of Food",
    teacher: "Dr. Neha Sen",
    duration: "26 mins",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    createdAt: "Nov 11, 2026",
  },
];

const DEFAULT_ATTENDANCE: AttendanceRecord[] = [
  { id: "att-1", studentId: "STD-1001", studentName: "Aryan Sharma", classLevel: "Class 6", date: "2026-11-02", status: "present" },
  { id: "att-2", studentId: "STD-1001", studentName: "Aryan Sharma", classLevel: "Class 6", date: "2026-11-03", status: "present" },
  { id: "att-3", studentId: "STD-1001", studentName: "Aryan Sharma", classLevel: "Class 6", date: "2026-11-04", status: "present" },
  { id: "att-4", studentId: "STD-1001", studentName: "Aryan Sharma", classLevel: "Class 6", date: "2026-11-05", status: "absent", remarks: "Doctor appointment" },
  { id: "att-5", studentId: "STD-1001", studentName: "Aryan Sharma", classLevel: "Class 6", date: "2026-11-06", status: "present" },
  { id: "att-6", studentId: "STD-1001", studentName: "Aryan Sharma", classLevel: "Class 6", date: "2026-11-09", status: "present" },
  { id: "att-7", studentId: "STD-1001", studentName: "Aryan Sharma", classLevel: "Class 6", date: "2026-11-10", status: "present" },
  { id: "att-8", studentId: "STD-1001", studentName: "Aryan Sharma", classLevel: "Class 6", date: "2026-11-11", status: "present" },
  { id: "att-9", studentId: "STD-1001", studentName: "Aryan Sharma", classLevel: "Class 6", date: "2026-11-12", status: "present" },
  { id: "att-10", studentId: "STD-1001", studentName: "Aryan Sharma", classLevel: "Class 6", date: "2026-11-13", status: "present" },
];

const DEFAULT_EMERGENCY_ALERT: EmergencyAlert = {
  id: "emg-1",
  title: "Heavy Rainfall Warning — Online Classes Continuous",
  message: "Due to severe weather warnings issued by the meteorological department, physical learning centers are closed today. All live lecture streams and interactive doubts are happening on our cartoon LMS without interruption! Stay cozy and learn from home 🌧️✨",
  date: "Today",
  isActive: true,
  declaredAt: "2026-11-13T07:30:00Z",
};

const DEFAULT_DEMO_LEADS: DemoLead[] = [
  {
    id: "lead-1",
    studentName: "Kabir Mehra",
    parentName: "Sanjay Mehra",
    parentPhone: "+91 9822334455",
    studentEmail: "kabir.mehra@gmail.com",
    school: "Delhi Public School",
    classLevel: "Class 7",
    preferredSubject: "Mathematics & Science",
    demoDate: "Nov 15, 2026 (5:00 PM)",
    trialStartDate: "Nov 12, 2026",
    trialEndDate: "Nov 19, 2026",
    status: "Trial Active",
    trialDaysLeft: 6,
  },
  {
    id: "lead-2",
    studentName: "Ananya Deshmukh",
    parentName: "Sunita Deshmukh",
    parentPhone: "+91 9877001122",
    studentEmail: "ananya.d@gmail.com",
    school: "St. Xavier's High School",
    classLevel: "Class 9",
    preferredSubject: "Physics & Chemistry",
    demoDate: "Nov 16, 2026 (6:00 PM)",
    trialStartDate: "Nov 10, 2026",
    trialEndDate: "Nov 17, 2026",
    status: "Trial Active",
    trialDaysLeft: 4,
  },
];

const DEFAULT_PROFILE_EXTRAS: Record<string, StudentProfileExtra> = {
  "STD-1001": {
    studentId: "STD-1001",
    avatarId: "astro-leo",
    frameId: "frame-gold",
    titleId: "t-2",
    school: "Springdales School, Delhi",
    parentName: "Rajesh Sharma",
    parentPhone: "+91 9876543210",
    parentEmail: "rajesh.parent@gmail.com",
    coins: 480,
    xp: 1250,
    level: 7,
    streakDays: 5,
    unlockedBadges: ["Space Hero", "Speedy Solver", "Math Magician", "Streak Champion"],
  },
};

const BROADCAST_CHANNEL_NAME = "deepsiddhi_lms_sync";

function triggerSyncBroadcast(key: string): void {
  if (typeof window === "undefined") return;
  // Dispatch local window event for immediate in-tab listeners
  window.dispatchEvent(new CustomEvent("lms_store_updated", { detail: { key, time: Date.now() } }));

  // Cross-tab broadcast via BroadcastChannel API
  try {
    if ("BroadcastChannel" in window) {
      const channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
      channel.postMessage({ type: "SYNC_EVENT", key, timestamp: Date.now() });
      channel.close();
    }
  } catch {
    // Fallback handled by storage event
  }
}

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
    triggerSyncBroadcast(key);
  } catch (e) {
    console.error("LMS Store save error:", e);
  }
}

// Background sync to the central server endpoint (/api/lms)
async function sendServerAction(action: string, payload: any) {
  if (typeof window === "undefined") return;
  try {
    const res = await fetch("/api/lms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, payload }),
    });
    if (res.ok) {
      const json = await res.json();
      if (json.version) {
        localStorage.setItem("lms_server_version", String(json.version));
      }
    }
  } catch (err) {
    console.warn("Background server sync failed (offline or network issue):", err);
  }
}

export const LMSStore = {
  // Sync with central server (Cross-Device & Cross-Browser Sync)
  syncWithServer: async (): Promise<boolean> => {
    if (typeof window === "undefined") return false;
    try {
      const res = await fetch(`/api/lms?t=${Date.now()}`, { cache: "no-store" });
      if (!res.ok) return false;
      const json = await res.json();
      if (!json.data) return false;

      // Check if client has local items not in server (e.g. added before server sync was enabled)
      const localCourses = getStored<LMSCourse[]>("lms_courses", []);
      const localMaterials = getStored<LMSMaterial[]>("lms_materials", []);
      const localLiveClasses = getStored<LMSLiveClass[]>("lms_live_classes", []);
      const localStudents = getStored<LMSStudent[]>("lms_students", []);
      const localEnquiries = getStored<LMSEnquiry[]>("lms_enquiries", []);

      const serverCourseIds = new Set((json.data.courses || []).map((c: any) => c.id));
      const newLocalCourses = localCourses.filter((c) => !serverCourseIds.has(c.id));

      const serverMaterialIds = new Set((json.data.materials || []).map((m: any) => m.id));
      const newLocalMaterials = localMaterials.filter((m) => !serverMaterialIds.has(m.id));

      const serverLiveIds = new Set((json.data.liveClasses || []).map((l: any) => l.id));
      const newLocalLive = localLiveClasses.filter((l) => !serverLiveIds.has(l.id));

      const serverStudentEmails = new Set(
        (json.data.students || []).map((s: any) => s.email?.toLowerCase())
      );
      const newLocalStudents = localStudents.filter(
        (s) => !serverStudentEmails.has(s.email?.toLowerCase())
      );

      const serverEnquiryIds = new Set((json.data.enquiries || []).map((e: any) => e.id));
      const newLocalEnquiries = localEnquiries.filter((e) => !serverEnquiryIds.has(e.id));

      // If client has items that the server is missing (e.g., added earlier in admin), upload them to server!
      if (
        newLocalCourses.length > 0 ||
        newLocalMaterials.length > 0 ||
        newLocalLive.length > 0 ||
        newLocalStudents.length > 0 ||
        newLocalEnquiries.length > 0
      ) {
        const mergedData = {
          courses: [...newLocalCourses, ...(json.data.courses || [])],
          materials: [...newLocalMaterials, ...(json.data.materials || [])],
          liveClasses: [...newLocalLive, ...(json.data.liveClasses || [])],
          students: [...newLocalStudents, ...(json.data.students || [])],
          enquiries: [...newLocalEnquiries, ...(json.data.enquiries || [])],
          batches: json.data.batches || [],
          recordedClasses: json.data.recordedClasses || [],
          tests: json.data.tests || [],
          announcements: json.data.announcements || [],
        };

        // Upload merged to server
        await fetch("/api/lms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullData: mergedData }),
        });

        // Store locally
        localStorage.setItem("lms_courses", JSON.stringify(mergedData.courses));
        localStorage.setItem("lms_materials", JSON.stringify(mergedData.materials));
        localStorage.setItem("lms_live_classes", JSON.stringify(mergedData.liveClasses));
        localStorage.setItem("lms_students", JSON.stringify(mergedData.students));
        localStorage.setItem("lms_enquiries", JSON.stringify(mergedData.enquiries));
        triggerSyncBroadcast("server_sync");
        return true;
      }

      // Check version if no new local items
      const currentVersion = localStorage.getItem("lms_server_version") || "0";
      if (json.version && String(json.version) === currentVersion) {
        return false;
      }

      // Otherwise, update client with server's authoritative data
      localStorage.setItem("lms_courses", JSON.stringify(json.data.courses || []));
      localStorage.setItem("lms_batches", JSON.stringify(json.data.batches || []));
      localStorage.setItem("lms_students", JSON.stringify(json.data.students || []));
      localStorage.setItem("lms_materials", JSON.stringify(json.data.materials || []));
      localStorage.setItem("lms_recorded_classes", JSON.stringify(json.data.recordedClasses || []));
      localStorage.setItem("lms_live_classes", JSON.stringify(json.data.liveClasses || []));
      localStorage.setItem("lms_tests", JSON.stringify(json.data.tests || []));
      localStorage.setItem("lms_announcements", JSON.stringify(json.data.announcements || []));
      localStorage.setItem("lms_enquiries", JSON.stringify(json.data.enquiries || []));

      if (json.version) {
        localStorage.setItem("lms_server_version", String(json.version));
      }

      triggerSyncBroadcast("server_sync");
      return true;
    } catch (err) {
      console.warn("Server sync error:", err);
      return false;
    }
  },

  // Courses
  getCourses: (): LMSCourse[] => getStored("lms_courses", DEFAULT_COURSES),
  saveCourses: (courses: LMSCourse[]) => {
    setStored("lms_courses", courses);
  },
  addCourse: (course: LMSCourse) => {
    const current = LMSStore.getCourses();
    LMSStore.saveCourses([course, ...current]);
    sendServerAction("add_course", course);
  },
  updateCourse: (id: string, updated: Partial<LMSCourse>) => {
    const current = LMSStore.getCourses();
    LMSStore.saveCourses(
      current.map((c) => (c.id === id ? { ...c, ...updated } : c))
    );
    sendServerAction("update_course", { id, updated });
  },
  deleteCourse: (id: string) => {
    const current = LMSStore.getCourses();
    LMSStore.saveCourses(current.filter((c) => c.id !== id));
    sendServerAction("delete_course", { id });
  },
  togglePublishCourse: (id: string) => {
    const current = LMSStore.getCourses();
    LMSStore.saveCourses(
      current.map((c) => (c.id === id ? { ...c, isPublished: !c.isPublished } : c))
    );
    sendServerAction("toggle_course_publish", { id });
  },

  // Batches
  getBatches: (): LMSBatch[] => getStored("lms_batches", DEFAULT_BATCHES),
  saveBatches: (batches: LMSBatch[]) => {
    setStored("lms_batches", batches);
  },
  addBatch: (batch: LMSBatch) => {
    const current = LMSStore.getBatches();
    LMSStore.saveBatches([batch, ...current]);
    sendServerAction("add_batch", batch);
  },
  deleteBatch: (id: string) => {
    const current = LMSStore.getBatches();
    LMSStore.saveBatches(current.filter((b) => b.id !== id));
    sendServerAction("delete_batch", { id });
  },

  // Students & Course Enrollment
  getStudents: (): LMSStudent[] => getStored("lms_students", DEFAULT_STUDENTS),
  saveStudents: (students: LMSStudent[]) => {
    setStored("lms_students", students);
  },
  addStudent: (student: LMSStudent) => {
    const current = LMSStore.getStudents();
    const existingIndex = current.findIndex(
      (s) => s.email.toLowerCase() === student.email.toLowerCase()
    );
    if (existingIndex >= 0) {
      const updated = [...current];
      updated[existingIndex] = { ...updated[existingIndex], ...student };
      LMSStore.saveStudents(updated);
    } else {
      LMSStore.saveStudents([student, ...current]);
    }
    sendServerAction("add_student", student);
  },
  updateStudent: (idOrEmail: string, updated: Partial<LMSStudent>) => {
    const current = LMSStore.getStudents();
    LMSStore.saveStudents(
      current.map((s) =>
        s.id === idOrEmail || s.email.toLowerCase() === idOrEmail.toLowerCase()
          ? { ...s, ...updated }
          : s
      )
    );
    sendServerAction("update_student", { id: idOrEmail, updated });
  },
  deleteStudent: (id: string) => {
    const current = LMSStore.getStudents();
    LMSStore.saveStudents(current.filter((s) => s.id !== id));
    sendServerAction("delete_student", { id });
  },
  enrollStudentInCourse: (studentId: string, courseTitle: string, batchName?: string) => {
    const current = LMSStore.getStudents();
    LMSStore.saveStudents(
      current.map((s) => {
        if (s.id === studentId || s.email === studentId) {
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

    const courses = LMSStore.getCourses();
    LMSStore.saveCourses(
      courses.map((c) =>
        c.title === courseTitle ? { ...c, enrolledCount: (c.enrolledCount || 0) + 1 } : c
      )
    );

    sendServerAction("enroll_student", { studentId, courseTitle, batchName });
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
    sendServerAction("toggle_student_status", { id: studentId });
  },

  // Materials
  getMaterials: (): LMSMaterial[] => getStored("lms_materials", DEFAULT_MATERIALS),
  saveMaterials: (materials: LMSMaterial[]) => {
    setStored("lms_materials", materials);
  },
  addMaterial: (material: LMSMaterial) => {
    const current = LMSStore.getMaterials();
    LMSStore.saveMaterials([material, ...current]);
    sendServerAction("add_material", material);
  },
  deleteMaterial: (id: string) => {
    const current = LMSStore.getMaterials();
    LMSStore.saveMaterials(current.filter((m) => m.id !== id));
    sendServerAction("delete_material", { id });
  },

  // Recorded Classes
  getRecordedClasses: (): LMSRecordedClass[] =>
    getStored("lms_recorded_classes", DEFAULT_RECORDED_CLASSES),
  saveRecordedClasses: (classes: LMSRecordedClass[]) => {
    setStored("lms_recorded_classes", classes);
  },
  addRecordedClass: (cls: LMSRecordedClass) => {
    const current = LMSStore.getRecordedClasses();
    LMSStore.saveRecordedClasses([cls, ...current]);
    sendServerAction("add_recorded_class", cls);
  },
  deleteRecordedClass: (id: string) => {
    const current = LMSStore.getRecordedClasses();
    LMSStore.saveRecordedClasses(current.filter((c) => c.id !== id));
    sendServerAction("delete_recorded_class", { id });
  },

  // Live Classes
  getLiveClasses: (): LMSLiveClass[] => getStored("lms_live_classes", DEFAULT_LIVE_CLASSES),
  saveLiveClasses: (classes: LMSLiveClass[]) => {
    setStored("lms_live_classes", classes);
  },
  addLiveClass: (cls: LMSLiveClass) => {
    const current = LMSStore.getLiveClasses();
    LMSStore.saveLiveClasses([cls, ...current]);
    sendServerAction("add_live_class", cls);
  },
  updateLiveClass: (id: string, updated: Partial<LMSLiveClass>) => {
    const current = LMSStore.getLiveClasses();
    LMSStore.saveLiveClasses(
      current.map((l) => (l.id === id ? { ...l, ...updated } : l))
    );
    sendServerAction("update_live_class", { id, updated });
  },
  deleteLiveClass: (id: string) => {
    const current = LMSStore.getLiveClasses();
    LMSStore.saveLiveClasses(current.filter((l) => l.id !== id));
    sendServerAction("delete_live_class", { id });
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
    sendServerAction("toggle_live_status", { id });
  },

  // Tests
  getTests: (): LMSTest[] => getStored("lms_tests", DEFAULT_TESTS),
  saveTests: (tests: LMSTest[]) => {
    setStored("lms_tests", tests);
  },
  addTest: (test: LMSTest) => {
    const current = LMSStore.getTests();
    LMSStore.saveTests([test, ...current]);
    sendServerAction("add_test", test);
  },
  deleteTest: (id: string) => {
    const current = LMSStore.getTests();
    LMSStore.saveTests(current.filter((t) => t.id !== id));
    sendServerAction("delete_test", { id });
  },

  // Announcements
  getAnnouncements: (): LMSAnnouncement[] =>
    getStored("lms_announcements", DEFAULT_ANNOUNCEMENTS),
  saveAnnouncements: (anns: LMSAnnouncement[]) => {
    setStored("lms_announcements", anns);
  },
  addAnnouncement: (ann: LMSAnnouncement) => {
    const current = LMSStore.getAnnouncements();
    LMSStore.saveAnnouncements([ann, ...current]);
    sendServerAction("add_announcement", ann);
  },
  deleteAnnouncement: (id: string) => {
    const current = LMSStore.getAnnouncements();
    LMSStore.saveAnnouncements(current.filter((a) => a.id !== id));
    sendServerAction("delete_announcement", { id });
  },

  // Enquiries & Leads
  getEnquiries: (): LMSEnquiry[] => getStored("lms_enquiries", DEFAULT_ENQUIRIES),
  saveEnquiries: (enquiries: LMSEnquiry[]) => {
    setStored("lms_enquiries", enquiries);
  },
  addEnquiry: (enquiry: LMSEnquiry) => {
    const current = LMSStore.getEnquiries();
    LMSStore.saveEnquiries([enquiry, ...current]);
    sendServerAction("add_enquiry", enquiry);
  },
  updateEnquiryStatus: (id: string, status: LMSEnquiry["status"], notes?: string) => {
    const current = LMSStore.getEnquiries();
    LMSStore.saveEnquiries(
      current.map((e) =>
        e.id === id ? { ...e, status, ...(notes !== undefined ? { notes } : {}) } : e
      )
    );
    sendServerAction("update_enquiry_status", { id, status, notes });
  },
  deleteEnquiry: (id: string) => {
    const current = LMSStore.getEnquiries();
    LMSStore.saveEnquiries(current.filter((e) => e.id !== id));
    sendServerAction("delete_enquiry", { id });
  },

  // --- CARTOON LMS & CLASSES 6 TO 10 SUBFOLDERS ---
  getCartoonCourses: (): CartoonCourse[] => getStored("lms_cartoon_courses", CARTOON_COURSES),
  saveCartoonCourses: (courses: CartoonCourse[]) => {
    setStored("lms_cartoon_courses", courses);
    sendServerAction("save_cartoon_courses", courses);
  },
  getCourseByClass: (classLevel: string): CartoonCourse | undefined => {
    const list = LMSStore.getCartoonCourses();
    return list.find((c) => c.classLevel.toLowerCase() === classLevel.toLowerCase()) || list[0];
  },
  updateCourseChapterItem: (courseId: string, subjectId: string, chapterId: string, itemType: "video" | "material" | "assignment" | "test", item: any) => {
    const courses = LMSStore.getCartoonCourses();
    const updated = courses.map((crs) => {
      if (crs.id !== courseId) return crs;
      return {
        ...crs,
        subjects: crs.subjects.map((sub) => {
          if (sub.id !== subjectId) return sub;
          return {
            ...sub,
            chapters: sub.chapters.map((ch) => {
              if (ch.id !== chapterId) return ch;
              if (itemType === "video") return { ...ch, videos: [item, ...ch.videos] };
              if (itemType === "material") return { ...ch, materials: [item, ...ch.materials] };
              if (itemType === "assignment") return { ...ch, assignments: [item, ...ch.assignments] };
              if (itemType === "test") return { ...ch, tests: [item, ...ch.tests] };
              return ch;
            }),
          };
        }),
      };
    });
    LMSStore.saveCartoonCourses(updated);
  },

  // --- BOOKMARKS ---
  getBookmarks: (studentId?: string): StudentBookmark[] => {
    const all = getStored<StudentBookmark[]>("lms_bookmarks", DEFAULT_BOOKMARKS);
    if (!studentId) return all;
    return all.filter((b) => b.studentId === studentId);
  },
  toggleBookmark: (bookmark: Omit<StudentBookmark, "id" | "createdAt"> & { id?: string }) => {
    const current = getStored<StudentBookmark[]>("lms_bookmarks", DEFAULT_BOOKMARKS);
    const existingIndex = current.findIndex(
      (b) => b.targetId === bookmark.targetId && b.studentId === bookmark.studentId
    );
    let updated: StudentBookmark[];
    if (existingIndex >= 0) {
      updated = current.filter((_, idx) => idx !== existingIndex);
    } else {
      const newBm: StudentBookmark = {
        ...bookmark,
        id: bookmark.id || `bmk-${Date.now()}`,
        createdAt: "Just now",
      };
      updated = [newBm, ...current];
    }
    setStored("lms_bookmarks", updated);
    sendServerAction("sync_bookmarks", updated);
    return existingIndex < 0;
  },
  isBookmarked: (targetId: string, studentId?: string): boolean => {
    const list = LMSStore.getBookmarks(studentId);
    return list.some((b) => b.targetId === targetId);
  },

  // --- ATTENDANCE MANAGEMENT ---
  getAttendance: (studentId?: string): AttendanceRecord[] => {
    const all = getStored<AttendanceRecord[]>("lms_attendance", DEFAULT_ATTENDANCE);
    if (!studentId) return all;
    return all.filter((a) => a.studentId === studentId);
  },
  markAttendance: (record: AttendanceRecord) => {
    const current = LMSStore.getAttendance();
    const existing = current.findIndex(
      (a) => a.studentId === record.studentId && a.date === record.date
    );
    let updated: AttendanceRecord[];
    if (existing >= 0) {
      updated = current.map((a, idx) => (idx === existing ? record : a));
    } else {
      updated = [record, ...current];
    }
    setStored("lms_attendance", updated);
    sendServerAction("mark_attendance", record);
  },

  // --- ACADEMIC CALENDAR & EMERGENCY HOLIDAYS ---
  getHolidays: (): AcademicHoliday[] => getStored("lms_holidays", DEFAULT_ACADEMIC_HOLIDAYS),
  addHoliday: (holiday: AcademicHoliday) => {
    const current = LMSStore.getHolidays();
    const updated = [holiday, ...current.filter((h) => h.id !== holiday.id)];
    setStored("lms_holidays", updated);
    sendServerAction("add_holiday", holiday);
  },
  deleteHoliday: (id: string) => {
    const current = LMSStore.getHolidays();
    const updated = current.filter((h) => h.id !== id);
    setStored("lms_holidays", updated);
    sendServerAction("delete_holiday", { id });
  },
  declareEmergencyHoliday: (title: string, date: string, message: string) => {
    const alert: EmergencyAlert = {
      id: `emg-${Date.now()}`,
      title,
      message,
      date,
      isActive: true,
      declaredAt: new Date().toISOString(),
    };
    setStored("lms_emergency_alert", alert);
    LMSStore.addHoliday({
      id: alert.id,
      title: `🚨 ${title}`,
      date,
      type: "Emergency",
      description: message,
      isUrgent: true,
    });
    sendServerAction("declare_emergency_holiday", alert);
  },
  getEmergencyAlert: (): EmergencyAlert | null => {
    return getStored<EmergencyAlert | null>("lms_emergency_alert", DEFAULT_EMERGENCY_ALERT);
  },
  dismissEmergencyAlert: () => {
    const current = LMSStore.getEmergencyAlert();
    if (current) {
      const updated = { ...current, isActive: false };
      setStored("lms_emergency_alert", updated);
    }
  },

  // --- DEMO REGISTRATION & 7-DAY FREE TRIAL ---
  getDemoLeads: (): DemoLead[] => getStored("lms_demo_leads", DEFAULT_DEMO_LEADS),
  registerDemo: (lead: Omit<DemoLead, "id" | "trialStartDate" | "trialEndDate" | "status" | "trialDaysLeft">) => {
    const current = LMSStore.getDemoLeads();
    const now = new Date();
    const end = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const newLead: DemoLead = {
      ...lead,
      id: `lead-${Date.now()}`,
      trialStartDate: now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      trialEndDate: end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "Trial Active",
      trialDaysLeft: 7,
    };
    const updated = [newLead, ...current];
    setStored("lms_demo_leads", updated);
    sendServerAction("register_demo", newLead);
    return newLead;
  },
  updateTrialStatus: (id: string, status: DemoLead["status"], extendDays: number = 0) => {
    const current = LMSStore.getDemoLeads();
    const updated = current.map((l) => {
      if (l.id !== id) return l;
      return {
        ...l,
        status,
        trialDaysLeft: extendDays > 0 ? l.trialDaysLeft + extendDays : l.trialDaysLeft,
      };
    });
    setStored("lms_demo_leads", updated);
    sendServerAction("update_trial_status", { id, status, extendDays });
  },

  // --- PERFORMANCE & REPORTS ---
  getPerformance: (studentId?: string): StudentPerformanceRecord => {
    return getStored<StudentPerformanceRecord>("lms_performance", SAMPLE_STUDENT_PERFORMANCE);
  },
  updatePerformance: (record: StudentPerformanceRecord) => {
    setStored("lms_performance", record);
    sendServerAction("update_performance", record);
  },

  // --- RATINGS & FEEDBACK ---
  getFeedback: (): StudentFeedbackEntry[] => getStored("lms_feedback", SAMPLE_FEEDBACK_LIST),
  addFeedback: (entry: Omit<StudentFeedbackEntry, "id" | "createdAt" | "status">) => {
    const current = LMSStore.getFeedback();
    const newEntry: StudentFeedbackEntry = {
      ...entry,
      id: `fb-${Date.now()}`,
      createdAt: "Just now",
      status: "published",
    };
    const updated = [newEntry, ...current];
    setStored("lms_feedback", updated);
    sendServerAction("add_feedback", newEntry);
  },
  replyFeedback: (id: string, reply: string) => {
    const current = LMSStore.getFeedback();
    const updated = current.map((f) => (f.id === id ? { ...f, adminReply: reply } : f));
    setStored("lms_feedback", updated);
    sendServerAction("reply_feedback", { id, reply });
  },

  // --- PRICING & COUPONS ---
  getCoupons: (): CouponCode[] => getStored("lms_coupons", ACTIVE_COUPONS),
  addCoupon: (coupon: CouponCode) => {
    const current = LMSStore.getCoupons();
    const updated = [coupon, ...current.filter((c) => c.code !== coupon.code)];
    setStored("lms_coupons", updated);
    sendServerAction("add_coupon", coupon);
  },
  applyCoupon: (code: string, originalAmount: number) => {
    const coupons = LMSStore.getCoupons();
    const found = coupons.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      return { valid: false, discountPercent: 0, discountAmount: 0, finalPrice: originalAmount, message: "Invalid or expired coupon code." };
    }
    const discountAmount = Math.round((originalAmount * found.discountPercent) / 100);
    const finalPrice = Math.max(0, originalAmount - discountAmount);
    return {
      valid: true,
      discountPercent: found.discountPercent,
      discountAmount,
      finalPrice,
      message: `Yay! ${found.discountPercent}% discount applied successfully! 🎉`,
    };
  },

  // --- PROFILE CUSTOMIZATION EXTRAS (AVATAR, FRAME, TITLE, PARENTS) ---
  getProfileExtras: (studentId: string = "STD-1001"): StudentProfileExtra => {
    const map = getStored<Record<string, StudentProfileExtra>>("lms_profile_extras", DEFAULT_PROFILE_EXTRAS);
    return map[studentId] || DEFAULT_PROFILE_EXTRAS["STD-1001"] || {
      studentId,
      avatarId: "astro-leo",
      frameId: "frame-gold",
      titleId: "t-2",
      school: "Springdales School, Delhi",
      parentName: "Rajesh Sharma",
      parentPhone: "+91 9876543210",
      parentEmail: "rajesh.parent@gmail.com",
      coins: 480,
      xp: 1250,
      level: 7,
      streakDays: 5,
      unlockedBadges: ["Space Hero", "Speedy Solver", "Math Magician", "Streak Champion"],
    };
  },
  saveProfileExtras: (studentId: string, extras: Partial<StudentProfileExtra>) => {
    const map = getStored<Record<string, StudentProfileExtra>>("lms_profile_extras", DEFAULT_PROFILE_EXTRAS);
    const current = map[studentId] || LMSStore.getProfileExtras(studentId);
    map[studentId] = { ...current, ...extras };
    setStored("lms_profile_extras", map);
    sendServerAction("save_profile_extras", { studentId, extras: map[studentId] });
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
    localStorage.removeItem("lms_enquiries");
    localStorage.removeItem("lms_server_version");
    triggerSyncBroadcast("all");
    sendServerAction("reset_all", {});
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
  const [enquiries, setEnquiries] = useState<LMSEnquiry[]>([]);

  // Cartoon LMS States
  const [cartoonCourses, setCartoonCourses] = useState<CartoonCourse[]>([]);
  const [bookmarks, setBookmarks] = useState<StudentBookmark[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [holidays, setHolidays] = useState<AcademicHoliday[]>([]);
  const [emergencyAlert, setEmergencyAlert] = useState<EmergencyAlert | null>(null);
  const [demoLeads, setDemoLeads] = useState<DemoLead[]>([]);
  const [performance, setPerformance] = useState<StudentPerformanceRecord>(SAMPLE_STUDENT_PERFORMANCE);
  const [feedback, setFeedback] = useState<StudentFeedbackEntry[]>([]);
  const [coupons, setCoupons] = useState<CouponCode[]>([]);
  const [profileExtras, setProfileExtras] = useState<StudentProfileExtra>(LMSStore.getProfileExtras());

  const [lastSyncedAt, setLastSyncedAt] = useState<number>(Date.now());
  const [isServerConnected, setIsServerConnected] = useState<boolean>(true);

  const refreshAll = useCallback(() => {
    setCourses(LMSStore.getCourses());
    setBatches(LMSStore.getBatches());
    setStudents(LMSStore.getStudents());
    setMaterials(LMSStore.getMaterials());
    setRecordedClasses(LMSStore.getRecordedClasses());
    setLiveClasses(LMSStore.getLiveClasses());
    setTests(LMSStore.getTests());
    setAnnouncements(LMSStore.getAnnouncements());
    setEnquiries(LMSStore.getEnquiries());

    // Cartoon LMS Refreshes
    setCartoonCourses(LMSStore.getCartoonCourses());
    setBookmarks(LMSStore.getBookmarks());
    setAttendance(LMSStore.getAttendance());
    setHolidays(LMSStore.getHolidays());
    setEmergencyAlert(LMSStore.getEmergencyAlert());
    setDemoLeads(LMSStore.getDemoLeads());
    setPerformance(LMSStore.getPerformance());
    setFeedback(LMSStore.getFeedback());
    setCoupons(LMSStore.getCoupons());
    setProfileExtras(LMSStore.getProfileExtras());

    setLastSyncedAt(Date.now());
  }, []);

  useEffect(() => {
    // 1. Initial render from local cache
    refreshAll();

    // 2. Immediately pull latest state from the central server
    LMSStore.syncWithServer().then((updated) => {
      if (updated) refreshAll();
    });

    // 3. Regular periodic background polling (every 1.5 seconds) for instant cross-device sync
    const interval = setInterval(() => {
      LMSStore.syncWithServer().then((updated) => {
        if (updated) refreshAll();
      });
    }, 1500);

    // 4. Sync on window focus / tab visibility change (e.g. user unlocks mobile phone or switches browser)
    const handleFocus = () => {
      LMSStore.syncWithServer().then((updated) => {
        if (updated) refreshAll();
      });
    };
    const handleVisibilityChange = () => {
      if (typeof document !== "undefined" && document.visibilityState === "visible") {
        LMSStore.syncWithServer().then((updated) => {
          if (updated) refreshAll();
        });
      }
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 5. In-window & Cross-tab events
    const handleUpdate = () => refreshAll();
    window.addEventListener("lms_store_updated", handleUpdate);

    const handleStorage = (e: StorageEvent) => {
      if (!e.key || e.key.startsWith("lms_") || e.key.startsWith("deepsiddhi_")) {
        refreshAll();
      }
    };
    window.addEventListener("storage", handleStorage);

    let channel: BroadcastChannel | null = null;
    try {
      if (typeof window !== "undefined" && "BroadcastChannel" in window) {
        channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
        channel.onmessage = () => {
          refreshAll();
        };
      }
    } catch {
      // Channel fallback
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("lms_store_updated", handleUpdate);
      window.removeEventListener("storage", handleStorage);
      channel?.close();
    };
  }, [refreshAll]);

  return {
    courses,
    batches,
    students,
    materials,
    recordedClasses,
    liveClasses,
    tests,
    announcements,
    enquiries,
    cartoonCourses,
    bookmarks,
    attendance,
    holidays,
    emergencyAlert,
    demoLeads,
    performance,
    feedback,
    coupons,
    profileExtras,
    lastSyncedAt,
    isLiveSynced: true,
    isServerConnected,
    store: LMSStore,
    refreshAll,
  };
}
