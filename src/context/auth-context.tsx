"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { UserRole, ClassLevel } from "@/types/database";
import { getSupabaseClient } from "@/lib/supabase/client";
import { LMSStore, LMSStudent } from "@/lib/lms-store";

export interface UserSession {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  role: UserRole;
  class_level: ClassLevel | null;
  avatar_url: string | null;
  enrolledCourse?: string;
}

interface AuthContextType {
  user: UserSession | null;
  role: UserRole | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<{ success: boolean; error?: string }>;
  loginWithDemo: (role: UserRole) => void;
  logout: () => void;
  register: (details: {
    fullName: string;
    email: string;
    phone: string;
    course: string;
    classLevel: ClassLevel;
  }) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (details: {
    fullName: string;
    phone: string;
    classLevel?: ClassLevel;
  }) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo user accounts for smooth evaluation and fallback
const DEMO_USERS: Record<UserRole, UserSession> = {
  student: {
    id: "STD-1001",
    email: "student@deepsiddhi.org",
    full_name: "Aryan Sharma",
    phone: "+91 9876543210",
    role: "student",
    class_level: "Class 11",
    avatar_url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=faces",
    enrolledCourse: "IIT-JEE Comprehensive Mastery 2026-27",
  },
  faculty: {
    id: "fac-001",
    email: "faculty@deepsiddhi.org",
    full_name: "Dr. Rahul Sharma",
    phone: "+91 9811122233",
    role: "faculty",
    class_level: null,
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces",
  },
  admin: {
    id: "adm-001",
    email: "admin@deepsiddhi.org",
    full_name: "Academic Director",
    phone: "+91 9988776655",
    role: "admin",
    class_level: null,
    avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces",
  },
  super_admin: {
    id: "sadm-001",
    email: "superadmin@deepsiddhi.org",
    full_name: "DeepSiddhi Super Admin",
    phone: "+91 9988771122",
    role: "super_admin",
    class_level: null,
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadSession = useCallback(() => {
    if (typeof window === "undefined") return;
    const savedUser = localStorage.getItem("deepsiddhi_user_session");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
      } catch {
        localStorage.removeItem("deepsiddhi_user_session");
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    loadSession();
    setIsLoading(false);

    // Cross-tab auth session synchronisation
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "deepsiddhi_user_session") {
        loadSession();
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [loadSession]);

  const loginWithDemo = (selectedRole: UserRole) => {
    const demoUser = DEMO_USERS[selectedRole];
    setUser(demoUser);
    localStorage.setItem("deepsiddhi_user_session", JSON.stringify(demoUser));
    localStorage.setItem("deepsiddhi_welcome_seen", "registered");

    // Also verify student is present in LMSStore if logging in as student
    if (selectedRole === "student") {
      const existingStudents = LMSStore.getStudents();
      const exists = existingStudents.some((s) => s.email.toLowerCase() === demoUser.email.toLowerCase());
      if (!exists) {
        LMSStore.addStudent({
          id: demoUser.id,
          name: demoUser.full_name,
          email: demoUser.email,
          phone: demoUser.phone || "+91 9876543210",
          enrolledCourses: ["IIT-JEE Comprehensive Mastery 2026-27"],
          batchName: "Pratham Batch (Morning)",
          classLevel: "Class 11",
          joinedDate: "Nov 1, 2026",
          progress: 72,
          status: "Active",
        });
      }
    }
  };

  const login = async (
    email: string,
    password: string,
    expectedRole?: UserRole
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    try {
      const supabase = getSupabaseClient();
      // If supabase is configured and available, attempt real login
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project")) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setIsLoading(false);
          return { success: false, error: error.message };
        }

        if (data?.user) {
          // Fetch profile
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", data.user.id)
            .single();

          const activeUser: UserSession = {
            id: data.user.id,
            email: data.user.email || email,
            full_name: profile?.full_name || email.split("@")[0],
            phone: profile?.phone || null,
            role: (profile?.role as UserRole) || expectedRole || "student",
            class_level: profile?.class_level || null,
            avatar_url: profile?.avatar_url || null,
          };

          setUser(activeUser);
          localStorage.setItem("deepsiddhi_user_session", JSON.stringify(activeUser));
          setIsLoading(false);
          return { success: true };
        }
      }

      // Local mock login fallback
      const role =
        expectedRole ||
        (email.toLowerCase().includes("superadmin")
          ? "super_admin"
          : email.toLowerCase().includes("admin")
          ? "admin"
          : email.toLowerCase().includes("faculty")
          ? "faculty"
          : "student");

      // Check if this student exists in LMSStore
      const existingStudents = LMSStore.getStudents();
      const existingStudent = existingStudents.find(
        (s) => s.email.toLowerCase() === email.toLowerCase()
      );

      const matchedUser: UserSession = {
        id: existingStudent?.id || `usr-${Date.now()}`,
        email,
        full_name:
          existingStudent?.name ||
          (email.includes("admin")
            ? "Academic Director"
            : email
                .split("@")[0]
                .replace(/[._]/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())),
        phone: existingStudent?.phone || "+91 9876543210",
        role,
        class_level: existingStudent?.classLevel as ClassLevel || (role === "student" ? "Class 11" : null),
        avatar_url: null,
        enrolledCourse: existingStudent?.enrolledCourses[0] || "IIT-JEE Comprehensive Mastery 2026-27",
      };

      // If logging in as a new student not yet in LMSStore, add them
      if (role === "student" && !existingStudent) {
        LMSStore.addStudent({
          id: matchedUser.id,
          name: matchedUser.full_name,
          email: matchedUser.email,
          phone: matchedUser.phone || "+91 9876543210",
          enrolledCourses: ["IIT-JEE Comprehensive Mastery 2026-27"],
          batchName: "Pratham Batch (Morning)",
          classLevel: (matchedUser.class_level as string) || "Class 11",
          joinedDate: "Today",
          progress: 0,
          status: "Active",
        });
      }

      setUser(matchedUser);
      localStorage.setItem("deepsiddhi_user_session", JSON.stringify(matchedUser));
      setIsLoading(false);
      return { success: true };
    } catch (err: unknown) {
      setIsLoading(false);
      const message = err instanceof Error ? err.message : "Authentication failed";
      return { success: false, error: message };
    }
  };

  const register = async (details: {
    fullName: string;
    email: string;
    phone: string;
    course: string;
    classLevel: ClassLevel;
  }): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    try {
      const studentId = `STD-${Math.floor(1000 + Math.random() * 9000)}`;

      const newUser: UserSession = {
        id: studentId,
        email: details.email,
        full_name: details.fullName,
        phone: details.phone,
        role: "student",
        class_level: details.classLevel,
        avatar_url: null,
        enrolledCourse: details.course,
      };

      // 1. Save auth session
      setUser(newUser);
      localStorage.setItem("deepsiddhi_user_session", JSON.stringify(newUser));
      localStorage.setItem("deepsiddhi_welcome_seen", "registered");

      // 2. CRUCIAL: Immediately sync new student into LMSStore so Admin Panel sees them!
      const newLmsStudent: LMSStudent = {
        id: studentId,
        name: details.fullName,
        email: details.email,
        phone: details.phone,
        enrolledCourses: [details.course || "IIT-JEE Comprehensive Mastery 2026-27"],
        batchName: "Pratham Batch (Morning)",
        classLevel: details.classLevel,
        joinedDate: "Just now",
        progress: 0,
        status: "Active",
      };
      LMSStore.addStudent(newLmsStudent);

      // 3. Immediately log enquiry lead into LMSStore for Admin Enquiries
      LMSStore.addEnquiry({
        id: `ENQ-${Math.floor(500 + Math.random() * 500)}`,
        name: details.fullName,
        phone: details.phone,
        email: details.email,
        course: details.course,
        classLevel: details.classLevel,
        source: "Student Self-Registration",
        createdAt: "Just now",
        status: "enrolled",
        notes: `Enrolled in ${details.course}`,
      });

      setIsLoading(false);
      return { success: true };
    } catch (err: unknown) {
      setIsLoading(false);
      const message = err instanceof Error ? err.message : "Registration failed";
      return { success: false, error: message };
    }
  };

  const updateProfile = async (details: {
    fullName: string;
    phone: string;
    classLevel?: ClassLevel;
  }): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: "No active user session." };

    try {
      const updatedUser: UserSession = {
        ...user,
        full_name: details.fullName,
        phone: details.phone,
        ...(details.classLevel ? { class_level: details.classLevel } : {}),
      };

      setUser(updatedUser);
      localStorage.setItem("deepsiddhi_user_session", JSON.stringify(updatedUser));

      // Synchronize changes to LMSStore student record so Admin sees the updated profile!
      LMSStore.updateStudent(user.email, {
        name: details.fullName,
        phone: details.phone,
        ...(details.classLevel ? { classLevel: details.classLevel } : {}),
      });

      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Profile update failed";
      return { success: false, error: msg };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("deepsiddhi_user_session");
    // Also sign out from Supabase if active
    try {
      const supabase = getSupabaseClient();
      supabase.auth.signOut();
    } catch {
      // Ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isLoading,
        isAuthenticated: !!user,
        login,
        loginWithDemo,
        logout,
        register,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
