"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Lock,
  Mail,
  GraduationCap,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  KeyRound,
  CheckCircle2,
} from "lucide-react";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const { login, loginWithDemo } = useAuth();
  const [activeTab, setActiveTab] = useState<"student" | "admin">("student");
  const [authMode, setAuthMode] = useState<"password" | "otp">("password");

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    setIsSubmitting(true);
    const result = await login(
      email,
      password,
      activeTab === "admin" ? "admin" : "student"
    );
    setIsSubmitting(false);

    if (result.success) {
      if (activeTab === "admin") {
        router.push("/admin");
      } else {
        router.push(redirectUrl);
      }
    } else {
      setError(result.error || "Invalid email or password.");
    }
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOtpSent(true);
    }, 700);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 4) {
      setError("Please enter the verification OTP.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      loginWithDemo("student");
      setIsSubmitting(false);
      router.push(redirectUrl);
    }, 800);
  };

  const handleDemoSignIn = (role: "student" | "admin" | "faculty") => {
    loginWithDemo(role);
    if (role === "admin") {
      router.push("/admin");
    } else if (role === "faculty") {
      router.push("/admin");
    } else {
      router.push(redirectUrl);
    }
  };

  return (
    <Card className="rounded-3xl border-gray-100 shadow-xl bg-white overflow-hidden">
      <div className="bg-gradient-to-r from-[#163B65] via-[#1a477b] to-[#16A6A1] p-6 text-white text-center">
        <h2 className="text-2xl font-bold">Sign In to DeepSiddhi</h2>
        <p className="text-xs text-[#EAF4FF]/80 mt-1">
          Access your personalized classes, live tests, and reports
        </p>
      </div>

      <CardContent className="p-6 sm:p-8 space-y-6">
        {/* Role Toggle Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(val) => {
            setActiveTab(val as "student" | "admin");
            setError("");
          }}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 w-full h-11 bg-gray-100 p-1 rounded-xl">
            <TabsTrigger
              value="student"
              className="rounded-lg text-xs font-semibold data-[state=active]:bg-white data-[state=active]:text-[#163B65] data-[state=active]:shadow-sm"
            >
              Student Portal
            </TabsTrigger>
            <TabsTrigger
              value="admin"
              className="rounded-lg text-xs font-semibold data-[state=active]:bg-white data-[state=active]:text-[#163B65] data-[state=active]:shadow-sm"
            >
              Admin / Faculty Portal
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Student Auth: Password vs OTP Toggle */}
        {activeTab === "student" && (
          <div className="flex justify-center border-b border-gray-100 pb-3 gap-6 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setAuthMode("password");
                setError("");
              }}
              className={`pb-1 border-b-2 transition-colors ${
                authMode === "password"
                  ? "border-[#16A6A1] text-[#163B65]"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              Email & Password
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode("otp");
                setError("");
              }}
              className={`pb-1 border-b-2 transition-colors ${
                authMode === "otp"
                  ? "border-[#16A6A1] text-[#163B65]"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              Mobile OTP Login
            </button>
          </div>
        )}

        {/* Password Form (Student or Admin) */}
        {(activeTab === "admin" || authMode === "password") && (
          <form onSubmit={handlePasswordLogin} className="space-y-4">
            <div>
              <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                {activeTab === "admin" ? "Staff / Admin Email" : "Registered Email"}
              </Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="email"
                  required
                  placeholder={
                    activeTab === "admin"
                      ? "admin@deepsiddhi.org"
                      : "student@deepsiddhi.org"
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 h-11 border-gray-200 focus:border-[#16A6A1]"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-[#16A6A1] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 h-11 border-gray-200 focus:border-[#16A6A1]"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-[#163B65] hover:bg-[#122e50] text-white font-semibold rounded-xl shadow-md"
            >
              {isSubmitting ? "Authenticating..." : `Sign In as ${activeTab === "admin" ? "Admin" : "Student"}`}
            </Button>
          </form>
        )}

        {/* Mobile OTP Form (Student Only) */}
        {activeTab === "student" && authMode === "otp" && (
          <div className="space-y-4">
            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Mobile Number
                  </Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500">
                      +91
                    </span>
                    <Input
                      type="tel"
                      maxLength={10}
                      required
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      className="pl-12 h-11 border-gray-200 focus:border-[#16A6A1]"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 bg-[#16A6A1] hover:bg-[#138e8a] text-white font-semibold rounded-xl shadow-md"
                >
                  {isSubmitting ? "Sending OTP..." : "Get Verification OTP"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="text-center p-2 bg-teal-50 rounded-lg border border-teal-200 text-xs text-teal-800">
                  OTP sent to +91 {phone} (Demo Code: <strong>123456</strong>)
                </div>
                <div>
                  <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Enter 6-Digit OTP
                  </Label>
                  <Input
                    type="text"
                    maxLength={6}
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="h-11 text-center font-bold text-lg tracking-widest border-gray-200"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 bg-[#163B65] hover:bg-[#122e50] text-white font-semibold rounded-xl shadow-md"
                >
                  {isSubmitting ? "Verifying..." : "Verify & Sign In"}
                </Button>
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="text-xs text-gray-500 hover:underline"
                  >
                    Change Phone Number
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Quick 1-Click Demo Evaluation Box */}
        <div className="pt-4 border-t border-gray-100 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Instant Demo Access (Testing):</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDemoSignIn("student")}
              className="h-9 text-xs border-teal-200 bg-teal-50/50 hover:bg-teal-100 text-[#163B65] font-medium rounded-lg"
            >
              Demo Student
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDemoSignIn("faculty")}
              className="h-9 text-xs border-blue-200 bg-blue-50/50 hover:bg-blue-100 text-[#163B65] font-medium rounded-lg"
            >
              Demo Faculty
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDemoSignIn("admin")}
              className="h-9 text-xs border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100 text-[#163B65] font-medium rounded-lg"
            >
              Demo Admin
            </Button>
          </div>
        </div>

        {/* Footer Link */}
        <div className="text-center text-xs text-gray-500 pt-2">
          Don&apos;t have an account yet?{" "}
          <Link href="/register" className="text-[#16A6A1] font-semibold hover:underline">
            Register as a Student
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-gray-400">Loading portal...</div>}>
      <LoginContent />
    </Suspense>
  );
}
