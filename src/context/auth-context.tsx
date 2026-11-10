"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { UserRole, Profile, ClassLevel } from "@/types/database";
import { getSupabaseClient } from "@/lib/supabase/client";

interface UserSession {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  role: UserRole;
  class_level: ClassLevel | null;
  avatar_url: string | null;
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo user accounts for smooth evaluation and fallback
const DEMO_USERS: Record<UserRole, UserSession> = {
  student: {
    id: "std-001",
    email: "student@deepsiddhi.org",
    full_name: "Aryan Sharma",
    phone: "+91 9876543210",
    role: "student",
    class_level: "Class 11",
    avatar_url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=faces",
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

  useEffect(() => {
    // Check saved session in localStorage
    const savedUser = localStorage.getItem("deepsiddhi_user_session");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("deepsiddhi_user_session");
      }
    }
    setIsLoading(false);
  }, []);

  const loginWithDemo = (selectedRole: UserRole) => {
    const demoUser = DEMO_USERS[selectedRole];
    setUser(demoUser);
    localStorage.setItem("deepsiddhi_user_session", JSON.stringify(demoUser));
    localStorage.setItem("deepsiddhi_welcome_seen", "registered");
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
      const role = expectedRole || (email.includes("admin") ? "admin" : email.includes("faculty") ? "faculty" : "student");
      const matchedUser: UserSession = {
        id: `usr-${Date.now()}`,
        email,
        full_name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        phone: "+91 9876543210",
        role,
        class_level: role === "student" ? "Class 11" : null,
        avatar_url: null,
      };

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
      const newUser: UserSession = {
        id: `std-${Date.now()}`,
        email: details.email,
        full_name: details.fullName,
        phone: details.phone,
        role: "student",
        class_level: details.classLevel,
        avatar_url: null,
      };

      setUser(newUser);
      localStorage.setItem("deepsiddhi_user_session", JSON.stringify(newUser));
      localStorage.setItem("deepsiddhi_welcome_seen", "registered");
      setIsLoading(false);
      return { success: true };
    } catch (err: unknown) {
      setIsLoading(false);
      const message = err instanceof Error ? err.message : "Registration failed";
      return { success: false, error: message };
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
