import { NextResponse, type NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";

// File-based central storage path
const DB_FILE_PATH = path.join(process.cwd(), "data", "lms-db.json");

// In-memory cache fallback to ensure speed and resilience
let memoryStoreCache: any = null;

async function readStoreFromDisk() {
  try {
    const raw = await fs.readFile(DB_FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    memoryStoreCache = parsed;
    return parsed;
  } catch (err) {
    if (memoryStoreCache) {
      return memoryStoreCache;
    }
    throw err;
  }
}

async function writeStoreToDisk(data: any) {
  memoryStoreCache = data;
  try {
    const dir = path.dirname(DB_FILE_PATH);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(DB_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing lms-db.json to disk:", err);
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clientVersion = searchParams.get("version");

    const store = await readStoreFromDisk();

    // Fast 304-style check if client already has the latest version
    if (clientVersion && Number(clientVersion) === Number(store.version)) {
      return NextResponse.json({
        notModified: true,
        version: store.version,
        updatedAt: store.updatedAt,
      });
    }

    return NextResponse.json({
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
    });
  } catch (err) {
    console.error("GET /api/lms error:", err);
    return NextResponse.json(
      { error: "Failed to read central LMS store" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const store = await readStoreFromDisk();

    const { action, payload, fullData } = body;
    let modified = false;

    if (fullData) {
      store.courses = fullData.courses || store.courses;
      store.batches = fullData.batches || store.batches;
      store.students = fullData.students || store.students;
      store.materials = fullData.materials || store.materials;
      store.recordedClasses = fullData.recordedClasses || store.recordedClasses;
      store.liveClasses = fullData.liveClasses || store.liveClasses;
      store.tests = fullData.tests || store.tests;
      store.announcements = fullData.announcements || store.announcements;
      store.enquiries = fullData.enquiries || store.enquiries;
      modified = true;
    } else if (action) {
      switch (action) {
        // Courses
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

        // Materials
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

        // Live Classes
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

        // Recorded Classes
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

        // Tests
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

        // Announcements
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

        // Students & Enrollment
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

          // Increment course enrollment count
          store.courses = (store.courses || []).map((c: any) =>
            c.title === courseTitle ? { ...c, enrolledCount: (c.enrolledCount || 0) + 1 } : c
          );
          modified = true;
          break;
        }

        // Enquiries
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

        // Batches
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
      await writeStoreToDisk(store);
    }

    return NextResponse.json({
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
    });
  } catch (err) {
    console.error("POST /api/lms error:", err);
    return NextResponse.json(
      { error: "Failed to update central LMS store" },
      { status: 500 }
    );
  }
}
