"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { AdminHeader } from "@/components/layout/admin-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  KeyRound,
  ArrowRight,
  ExternalLink,
  GraduationCap,
  Sparkles,
  AlertTriangle,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, role, isLoading, loginWithDemo } = useAuth();
  const router = useRouter();

  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A192F] text-white flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center animate-spin mb-4">
          <ShieldCheck className="w-6 h-6 text-amber-400" />
        </div>
        <p className="text-sm font-semibold tracking-wide text-gray-300">
          Verifying Security Clearance & Role Permissions...
        </p>
        <span className="text-xs text-gray-500 mt-1">DeepSiddhi Academic Engine</span>
      </div>
    );
  }

  const isAdminAuthorized = role === "admin" || role === "super_admin";

  // If not authorized as Admin, present High-Security Lockscreen
  if (!isAdminAuthorized) {
    const handleVerifyPasscode = (e: React.FormEvent) => {
      e.preventDefault();
      setAuthError("");
      setIsVerifying(true);

      setTimeout(() => {
        setIsVerifying(false);
        // Valid passcodes: 2026, admin, admin123, deepsiddhi
        const validPasscodes = ["2026", "admin", "admin123", "deepsiddhi"];
        if (validPasscodes.includes(passcode.trim().toLowerCase())) {
          loginWithDemo("admin");
        } else {
          setAuthError("Invalid Administrator Passcode. Access Denied.");
        }
      }, 600);
    };

    const handleQuickAuthorize = () => {
      loginWithDemo("super_admin");
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#071322] via-[#0F2744] to-[#0A192F] text-white flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full space-y-6">
          {/* Top Logo & Brand */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-amber-400 shadow-xl shadow-amber-950/40 mb-2">
              <ShieldAlert className="w-7 h-7 animate-pulse" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              Restricted Administrative Zone
            </h1>
            <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
              DeepSiddhi Academic Engine & Control Center requires elevated administrator clearance to create, modify, or publish courses, tests, and student records.
            </p>
          </div>

          {/* Security Card */}
          <Card className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-2xl p-6 sm:p-7 text-white space-y-5">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                <span>Security Clearance Level 4 Required</span>
              </div>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-200">
                Protected
              </span>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {/* Passcode Form */}
            <form onSubmit={handleVerifyPasscode} className="space-y-4">
              <div>
                <Label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                  Admin Passcode
                </Label>
                <div className="relative mt-1.5">
                  <KeyRound className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <Input
                    type="password"
                    placeholder="Enter Security Key (e.g. 2026)"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="pl-10 h-11 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                </div>
                <p className="text-[11px] text-gray-400 mt-1 font-mono">
                  Default Academic Passcode: <strong className="text-amber-300">2026</strong>
                </p>
              </div>

              <Button
                type="submit"
                disabled={isVerifying}
                className="w-full h-11 bg-amber-500 hover:bg-amber-400 text-gray-950 font-black text-xs rounded-xl shadow-lg transition-all"
              >
                {isVerifying ? "Verifying Credentials..." : "Authenticate & Access Console"}
              </Button>
            </form>

            <div className="relative flex items-center justify-center my-3">
              <div className="border-t border-white/10 w-full" />
              <span className="bg-[#0D213B] px-3 text-[11px] text-gray-400 uppercase font-bold tracking-wider absolute">
                Or Fast Authorization
              </span>
            </div>

            {/* 1-Click Authorized Elevation */}
            <Button
              type="button"
              variant="outline"
              onClick={handleQuickAuthorize}
              className="w-full h-10 border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Authorize as Super Admin (Testing/Evaluation)</span>
            </Button>

            {/* Return Link */}
            <div className="pt-2 text-center">
              <Link
                href="/dashboard"
                className="text-xs text-gray-400 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Return to Student Portal</span>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F8FC]">
      {/* Top Security Status Banner */}
      <div className="bg-[#003866] text-white text-[11px] font-medium px-4 py-1.5 flex items-center justify-between border-b border-[#002B4D]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-emerald-200">
            Secure Session Active
          </span>
          <span className="text-blue-200 hidden sm:inline">
            • Authenticated as {user?.role === "super_admin" ? "Super Admin" : "Academic Director"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:inline text-blue-200 font-mono text-[10px]">
            ⚡ Real-Time Sync: Admin ⇄ Dashboard Connected
          </span>
          <Link
            href="/dashboard"
            className="text-cyan-300 hover:text-white font-bold flex items-center gap-1 transition-colors"
          >
            <span>Live Student View</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>

      <AdminSidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="lg:pl-64 flex flex-col min-h-screen">
        <AdminHeader onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
