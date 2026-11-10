"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  GraduationCap,
  User,
  Phone,
  Mail,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  KeyRound,
} from "lucide-react";
import { ClassLevel } from "@/types/database";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [step, setStep] = useState<"details" | "otp" | "success">("details");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    course: "IIT-JEE",
    classLevel: "Class 11" as ClassLevel,
    agreedToTerms: false,
  });

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!formData.agreedToTerms) {
      setError("Please accept the terms and privacy policy to continue.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep("otp");
    }, 700);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (val && index < 5) {
      const next = document.getElementById(`reg-otp-${index + 1}`);
      next?.focus();
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const entered = otp.join("");
    if (entered.length !== 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    setIsSubmitting(true);
    const res = await register(formData);
    setIsSubmitting(false);

    if (res.success) {
      setStep("success");
    } else {
      setError(res.error || "Verification failed. Please try again.");
    }
  };

  return (
    <Card className="rounded-3xl border-gray-100 shadow-xl bg-white overflow-hidden">
      <div className="bg-gradient-to-r from-[#163B65] via-[#1a477b] to-[#16A6A1] p-6 text-white text-center">
        <h2 className="text-2xl font-bold">Student Registration</h2>
        <p className="text-xs text-[#EAF4FF]/80 mt-1">
          Start your journey towards academic excellence with DeepSiddhi
        </p>
      </div>

      <CardContent className="p-6 sm:p-8 space-y-6">
        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {step === "details" && (
          <form onSubmit={handleDetailsSubmit} className="space-y-4">
            <div>
              <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Student Full Name *
              </Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  required
                  placeholder="e.g. Aryan Sharma"
                  className="pl-9 h-11 border-gray-200 focus:border-[#16A6A1]"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Mobile Number *
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
                  className="pl-12 h-11 border-gray-200 focus:border-[#16A6A1]"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })
                  }
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Email Address *
              </Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="email"
                  required
                  placeholder="student@example.com"
                  className="pl-9 h-11 border-gray-200 focus:border-[#16A6A1]"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Select Course *
                </Label>
                <Select
                  value={formData.course}
                  onValueChange={(val) => setFormData({ ...formData, course: val })}
                >
                  <SelectTrigger className="mt-1 h-11 border-gray-200">
                    <SelectValue placeholder="Course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IIT-JEE">IIT-JEE</SelectItem>
                    <SelectItem value="Olympiad">Olympiad</SelectItem>
                    <SelectItem value="NTSE">NTSE</SelectItem>
                    <SelectItem value="Foundation">Foundation</SelectItem>
                    <SelectItem value="Other Courses">Other Courses</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Current Class *
                </Label>
                <Select
                  value={formData.classLevel}
                  onValueChange={(val) => setFormData({ ...formData, classLevel: val as ClassLevel })}
                >
                  <SelectTrigger className="mt-1 h-11 border-gray-200">
                    <SelectValue placeholder="Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Class 6">Class 6</SelectItem>
                    <SelectItem value="Class 7">Class 7</SelectItem>
                    <SelectItem value="Class 8">Class 8</SelectItem>
                    <SelectItem value="Class 9">Class 9</SelectItem>
                    <SelectItem value="Class 10">Class 10</SelectItem>
                    <SelectItem value="Class 11">Class 11</SelectItem>
                    <SelectItem value="Class 12">Class 12</SelectItem>
                    <SelectItem value="Dropper">Dropper</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-start gap-2 pt-1">
              <Checkbox
                id="regTerms"
                checked={formData.agreedToTerms}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, agreedToTerms: checked === true })
                }
                className="mt-1 border-gray-300 data-[state=checked]:bg-[#16A6A1]"
              />
              <Label htmlFor="regTerms" className="text-xs text-gray-600 font-normal leading-tight cursor-pointer">
                I agree to the Terms of Service & Privacy Policy, and consent to receive class alerts.
              </Label>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-[#163B65] hover:bg-[#122e50] text-white font-semibold rounded-xl shadow-md flex items-center justify-center gap-2 group"
            >
              {isSubmitting ? (
                "Sending OTP..."
              ) : (
                <>
                  Continue Learning
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div className="text-center py-2">
              <div className="w-12 h-12 bg-[#EAF4FF] text-[#163B65] rounded-full flex items-center justify-center mx-auto mb-3">
                <KeyRound className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-[#163B65]">Verify Mobile Number</h4>
              <p className="text-xs text-gray-500 mt-1">
                Enter the OTP sent to <strong>+91 {formData.phone}</strong>
              </p>
              <div className="mt-2 inline-block bg-teal-50 border border-teal-200 px-3 py-1 rounded text-xs text-teal-800 font-mono">
                Demo OTP: <strong>123456</strong>
              </div>
            </div>

            <div className="flex justify-center gap-2">
              {otp.map((val, i) => (
                <Input
                  key={i}
                  id={`reg-otp-${i}`}
                  type="text"
                  maxLength={1}
                  value={val}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  className="w-11 h-12 text-center text-lg font-bold border-gray-300 focus:border-[#16A6A1]"
                />
              ))}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-[#16A6A1] hover:bg-[#138e8a] text-white font-semibold rounded-xl shadow-md"
            >
              {isSubmitting ? "Verifying..." : "Verify & Complete Registration"}
            </Button>

            <div className="flex justify-between items-center text-xs text-gray-500">
              <button
                type="button"
                onClick={() => setStep("details")}
                className="hover:underline"
              >
                Change Details
              </button>
              <button
                type="button"
                onClick={() => setOtp(["1", "2", "3", "4", "5", "6"])}
                className="text-[#16A6A1] font-semibold hover:underline"
              >
                Auto-fill Demo OTP
              </button>
            </div>
          </form>
        )}

        {step === "success" && (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#163B65]">Registration Complete!</h3>
              <p className="text-xs text-gray-600 mt-1">
                Welcome, <strong>{formData.fullName}</strong>. Your student account is active.
              </p>
            </div>

            <Button
              onClick={() => router.push("/dashboard")}
              className="w-full h-11 bg-[#163B65] hover:bg-[#122e50] text-white font-semibold rounded-xl shadow-md"
            >
              Go to Student Learning Dashboard
            </Button>
          </div>
        )}

        <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100">
          Already have an account?{" "}
          <Link href="/login" className="text-[#16A6A1] font-semibold hover:underline">
            Sign In Here
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
