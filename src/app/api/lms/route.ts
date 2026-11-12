import { NextResponse, type NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";

// Force Next.js and Vercel to NEVER cache this route handler
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

// File-based persistence paths (local workspace and serverless /tmp fallback)
const LOCAL_DB_PATH = path.join(process.cwd(), "data", "lms-db.json");
const TMP_DB_PATH = path.join("/tmp", "lms-db.json");

// Initial fallback dataset to seed empty stores
const INITIAL_DATA = {
  version: 1,
  updatedAt: new Date().toISOString(),
  courses: [
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
  ],
  batches: [
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
  ],
  students: [
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
  ],
  materials: [
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
  ],
  recordedClasses: [
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
  ],
  liveClasses: [
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
  ],
  tests: [
    {
      id: "test-1",
      title: "All India JEE Mock Test #08 (Full Length)",
      courseTitle: "IIT-JEE Comprehensive Mastery 2026-27",
      category: "Mock",
      questionsCount: 75,
      duration: "180 Mins",
      totalMarks: 300,
      status: "Available",
      questions: [],
    },
  ],
  announcements: [
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
  ],
  enquiries: [
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
  ],
};

// Global in-memory singleton to persist across serverless requests in same instance
declare global {
  var __deepsiddhi_lms_store__: any;
}

if (!globalThis.__deepsiddhi_lms_store__) {
  globalThis.__deepsiddhi_lms_store__ = JSON.parse(JSON.stringify(INITIAL_DATA));
}

async function getStoreData() {
  const candidates: any[] = [];

  // Candidate 1: In-memory store (most recent updates within runtime)
  if (globalThis.__deepsiddhi_lms_store__) {
    candidates.push(globalThis.__deepsiddhi_lms_store__);
  }

  // Candidate 2: Serverless /tmp file (persisted on serverless environment)
  try {
    const raw = await fs.readFile(TMP_DB_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") candidates.push(parsed);
  } catch {
    // ignore
  }

  // Candidate 3: Local data file in repository
  try {
    const raw = await fs.readFile(LOCAL_DB_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") candidates.push(parsed);
  } catch {
    // ignore
  }

  // Candidate 4: Initial static fallback
  candidates.push(INITIAL_DATA);

  // Pick the candidate with highest version or most items
  let best = candidates[0];
  for (const c of candidates) {
    const bestVer = Number(best.version || 0);
    const cVer = Number(c.version || 0);
    if (cVer > bestVer) {
      best = c;
    } else if (cVer === bestVer && (c.courses?.length || 0) > (best.courses?.length || 0)) {
      best = c;
    }
  }

  globalThis.__deepsiddhi_lms_store__ = best;
  return best;
}

async function saveStoreData(data: any) {
  globalThis.__deepsiddhi_lms_store__ = data;

  // Always write to /tmp (writable on Vercel and serverless containers)
  try {
    await fs.writeFile(TMP_DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.warn("Unable to write to /tmp on serverless:", err);
  }

  // Try writing to local repo directory
  try {
    const dir = path.dirname(LOCAL_DB_PATH);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(LOCAL_DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // ignore (read-only filesystem on Vercel)
  }
}

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0",
  "Pragma": "no-cache",
  "Expires": "0",
  "Surrogate-Control": "no-store",
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clientVersion = searchParams.get("version");

    const store = await getStoreData();

    if (clientVersion && Number(clientVersion) === Number(store.version)) {
      return NextResponse.json(
        {
          notModified: true,
          version: store.version,
          updatedAt: store.updatedAt,
        },
        { headers: NO_CACHE_HEADERS }
      );
    }

    return NextResponse.json(
      {
        notModified: false,
        version: store.version || 1,
        updatedAt: store.updatedAt || new Date().toISOString(),
        data: {
          courses: store.courses || [],
          batches: store.batches || [],
          students: store.students || [],
          materials: store.materials || [],
          recordedClasses: store.recordedClasses || [],
          liveClasses: store.liveClasses || [],
          tests: store.tests || [],
          announcements: store.announcements || [],
          enquiries: store.enquiries || [],
        },
      },
      { headers: NO_CACHE_HEADERS }
    );
  } catch (err) {
    console.error("GET /api/lms error:", err);
    return NextResponse.json(
      { error: "Failed to read LMS store", data: globalThis.__deepsiddhi_lms_store__ },
      { status: 200, headers: NO_CACHE_HEADERS }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const store = await getStoreData();

    const { action, payload, fullData } = body;
    let modified = false;

    if (fullData) {
      // Intelligent union merge so no items are lost between browsers
      if (Array.isArray(fullData.courses)) {
        const existingMap = new Map((store.courses || []).map((c: any) => [c.id, c]));
        fullData.courses.forEach((c: any) => existingMap.set(c.id, c));
        store.courses = Array.from(existingMap.values());
      }
      if (Array.isArray(fullData.materials)) {
        const existingMap = new Map((store.materials || []).map((m: any) => [m.id, m]));
        fullData.materials.forEach((m: any) => existingMap.set(m.id, m));
        store.materials = Array.from(existingMap.values());
      }
      if (Array.isArray(fullData.liveClasses)) {
        const existingMap = new Map((store.liveClasses || []).map((l: any) => [l.id, l]));
        fullData.liveClasses.forEach((l: any) => existingMap.set(l.id, l));
        store.liveClasses = Array.from(existingMap.values());
      }
      if (Array.isArray(fullData.students)) {
        const existingMap = new Map((store.students || []).map((s: any) => [s.email?.toLowerCase(), s]));
        fullData.students.forEach((s: any) => existingMap.set(s.email?.toLowerCase(), s));
        store.students = Array.from(existingMap.values());
      }
      if (Array.isArray(fullData.enquiries)) {
        const existingMap = new Map((store.enquiries || []).map((e: any) => [e.id, e]));
        fullData.enquiries.forEach((e: any) => existingMap.set(e.id, e));
        store.enquiries = Array.from(existingMap.values());
      }
      if (Array.isArray(fullData.tests)) store.tests = fullData.tests;
      if (Array.isArray(fullData.announcements)) store.announcements = fullData.announcements;
      if (Array.isArray(fullData.batches)) store.batches = fullData.batches;
      if (Array.isArray(fullData.recordedClasses)) store.recordedClasses = fullData.recordedClasses;
      modified = true;
    } else if (action) {
      switch (action) {
        case "add_course": {
          const current = store.courses || [];
          store.courses = [payload, ...current.filter((c: any) => c.id !== payload.id)];
          modified = true;
          break;
        }
        case "update_course": {
          store.courses = (store.courses || []).map((c: any) =>
            c.id === payload.id ? { ...c, ...payload.updated } : c
          );
          modified = true;
          break;
        }
        case "delete_course": {
          store.courses = (store.courses || []).filter((c: any) => c.id !== payload.id);
          modified = true;
          break;
        }
        case "toggle_course_publish": {
          store.courses = (store.courses || []).map((c: any) =>
            c.id === payload.id ? { ...c, isPublished: !c.isPublished } : c
          );
          modified = true;
          break;
        }

        case "add_material": {
          store.materials = [payload, ...(store.materials || []).filter((m: any) => m.id !== payload.id)];
          modified = true;
          break;
        }
        case "delete_material": {
          store.materials = (store.materials || []).filter((m: any) => m.id !== payload.id);
          modified = true;
          break;
        }

        case "add_live_class": {
          store.liveClasses = [payload, ...(store.liveClasses || []).filter((l: any) => l.id !== payload.id)];
          modified = true;
          break;
        }
        case "update_live_class": {
          store.liveClasses = (store.liveClasses || []).map((l: any) =>
            l.id === payload.id ? { ...l, ...payload.updated } : l
          );
          modified = true;
          break;
        }
        case "delete_live_class": {
          store.liveClasses = (store.liveClasses || []).filter((l: any) => l.id !== payload.id);
          modified = true;
          break;
        }
        case "toggle_live_status": {
          store.liveClasses = (store.liveClasses || []).map((l: any) =>
            l.id === payload.id
              ? { ...l, status: l.status === "live" ? "completed" : "live" }
              : l
          );
          modified = true;
          break;
        }

        case "add_recorded_class": {
          store.recordedClasses = [payload, ...(store.recordedClasses || []).filter((r: any) => r.id !== payload.id)];
          modified = true;
          break;
        }
        case "delete_recorded_class": {
          store.recordedClasses = (store.recordedClasses || []).filter((r: any) => r.id !== payload.id);
          modified = true;
          break;
        }

        case "add_test": {
          store.tests = [payload, ...(store.tests || []).filter((t: any) => t.id !== payload.id)];
          modified = true;
          break;
        }
        case "delete_test": {
          store.tests = (store.tests || []).filter((t: any) => t.id !== payload.id);
          modified = true;
          break;
        }

        case "add_announcement": {
          store.announcements = [payload, ...(store.announcements || []).filter((a: any) => a.id !== payload.id)];
          modified = true;
          break;
        }
        case "delete_announcement": {
          store.announcements = (store.announcements || []).filter((a: any) => a.id !== payload.id);
          modified = true;
          break;
        }

        case "add_student": {
          const current = store.students || [];
          const existingIdx = current.findIndex(
            (s: any) => s.email?.toLowerCase() === payload.email?.toLowerCase()
          );
          if (existingIdx >= 0) {
            current[existingIdx] = { ...current[existingIdx], ...payload };
            store.students = [...current];
          } else {
            store.students = [payload, ...current];
          }
          modified = true;
          break;
        }
        case "update_student": {
          store.students = (store.students || []).map((s: any) =>
            s.id === payload.id || s.email?.toLowerCase() === payload.id?.toLowerCase()
              ? { ...s, ...payload.updated }
              : s
          );
          modified = true;
          break;
        }
        case "toggle_student_status": {
          store.students = (store.students || []).map((s: any) =>
            s.id === payload.id
              ? { ...s, status: s.status === "Active" ? "Suspended" : "Active" }
              : s
          );
          modified = true;
          break;
        }
        case "delete_student": {
          store.students = (store.students || []).filter((s: any) => s.id !== payload.id);
          modified = true;
          break;
        }
        case "enroll_student": {
          const { studentId, courseTitle, batchName } = payload;
          store.students = (store.students || []).map((s: any) => {
            if (s.id === studentId || s.email === studentId) {
              const courses = s.enrolledCourses || [];
              const updated = courses.includes(courseTitle) ? courses : [...courses, courseTitle];
              return {
                ...s,
                enrolledCourses: updated,
                batchName: batchName || s.batchName,
              };
            }
            return s;
          });

          store.courses = (store.courses || []).map((c: any) =>
            c.title === courseTitle ? { ...c, enrolledCount: (c.enrolledCount || 0) + 1 } : c
          );
          modified = true;
          break;
        }

        case "add_enquiry": {
          store.enquiries = [payload, ...(store.enquiries || []).filter((e: any) => e.id !== payload.id)];
          modified = true;
          break;
        }
        case "update_enquiry_status": {
          store.enquiries = (store.enquiries || []).map((e: any) =>
            e.id === payload.id
              ? { ...e, status: payload.status, ...(payload.notes ? { notes: payload.notes } : {}) }
              : e
          );
          modified = true;
          break;
        }
        case "delete_enquiry": {
          store.enquiries = (store.enquiries || []).filter((e: any) => e.id !== payload.id);
          modified = true;
          break;
        }

        case "add_batch": {
          store.batches = [payload, ...(store.batches || []).filter((b: any) => b.id !== payload.id)];
          modified = true;
          break;
        }
        case "delete_batch": {
          store.batches = (store.batches || []).filter((b: any) => b.id !== payload.id);
          modified = true;
          break;
        }

        default:
          break;
      }
    }

    if (modified) {
      store.version = (store.version || 1) + 1;
      store.updatedAt = new Date().toISOString();
      await saveStoreData(store);
    }

    return NextResponse.json(
      {
        success: true,
        version: store.version,
        updatedAt: store.updatedAt,
        data: {
          courses: store.courses || [],
          batches: store.batches || [],
          students: store.students || [],
          materials: store.materials || [],
          recordedClasses: store.recordedClasses || [],
          liveClasses: store.liveClasses || [],
          tests: store.tests || [],
          announcements: store.announcements || [],
          enquiries: store.enquiries || [],
        },
      },
      { headers: NO_CACHE_HEADERS }
    );
  } catch (err) {
    console.error("POST /api/lms error:", err);
    return NextResponse.json(
      { error: "Failed to update LMS store" },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}
