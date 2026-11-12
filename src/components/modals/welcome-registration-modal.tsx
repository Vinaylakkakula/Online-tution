"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Sparkles,
  Phone,
  Mail,
  User,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  KeyRound,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { ClassLevel } from "@/types/database";

export function WelcomeRegistrationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"details" | "otp" | "success">("details");
  const { register } = useAuth();

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

  useEffect(() => {
    // Check if user has already registered or dismissed modal
    const hasSeenModal = localStorage.getItem("deepsiddhi_welcome_seen");
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500); // Friendly 1.5s delay on initial visit
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("deepsiddhi_welcome_seen", "dismissed");
  };

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
      setError("Please agree to the privacy policy and terms.");
      return;
    }

    setIsSubmitting(true);
    // Simulate sending OTP
    setTimeout(() => {
      setIsSubmitting(false);
      setStep("otp");
    }, 700);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`welcome-otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    setIsSubmitting(true);

    // Register student, which automatically syncs to LMSStore & Admin Panel
    const res = await register({
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      course: formData.course,
      classLevel: formData.classLevel,
    });

    setIsSubmitting(false);

    if (res.success) {
      setStep("success");
      localStorage.setItem("deepsiddhi_welcome_seen", "registered");
      localStorage.setItem("deepsiddhi_lead", JSON.stringify(formData));
    } else {
      setError(res.error || "Verification failed. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[540px] p-0 overflow-hidden border-0 shadow-2xl rounded-2xl bg-white">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#163B65] via-[#1a477b] to-[#16A6A1] p-6 text-white relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-md">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-[#EAF4FF]/80">
                DeepSiddhi Foundation
              </span>
              <DialogTitle className="text-xl font-bold text-white tracking-tight">
                Welcome to DeepSiddhi Foundation
              </DialogTitle>
            </div>
          </div>
          <DialogDescription className="text-sm text-[#EAF4FF]/90 font-normal mt-1">
            Start your journey towards academic excellence. Enroll in India&apos;s premier online coaching for IIT-JEE, Olympiads, and NTSE.
          </DialogDescription>
          <div className="absolute top-4 right-4 text-white/40">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              {error}
            </div>
          )}

          {step === "details" && (
            <form onSubmit={handleDetailsSubmit} className="space-y-4">
              <div>
                <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Student Full Name
                </Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    required
                    placeholder="e.g. Aryan Sharma"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="pl-9 h-11 border-gray-200 focus:border-[#16A6A1]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value.replace(/\D/g, ""),
                        })
                      }
                      className="pl-12 h-11 border-gray-200 focus:border-[#16A6A1]"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Email Address
                  </Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="email"
                      required
                      placeholder="aryan@gmail.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="pl-9 h-11 border-gray-200 focus:border-[#16A6A1]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Target Course Track
                  </Label>
                  <div className="mt-1">
                    <Select
                      value={formData.course}
                      onValueChange={(val) =>
                        setFormData({ ...formData, course: val })
                      }
                    >
                      <SelectTrigger className="h-11 border-gray-200">
                        <SelectValue placeholder="Select Course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IIT-JEE">IIT-JEE (Main & Advanced)</SelectItem>
                        <SelectItem value="Olympiad">Physics & Math Olympiad</SelectItem>
                        <SelectItem value="NTSE">NTSE & Foundation</SelectItem>
                        <SelectItem value="Foundation">Class 6–10 Foundation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Current Class Level
                  </Label>
                  <div className="mt-1">
                    <Select
                      value={formData.classLevel}
                      onValueChange={(val) =>
                        setFormData({ ...formData, classLevel: val as ClassLevel })
                      }
                    >
                      <SelectTrigger className="h-11 border-gray-200">
                        <SelectValue placeholder="Select Class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Class 8">Class 8</SelectItem>
                        <SelectItem value="Class 9">Class 9</SelectItem>
                        <SelectItem value="Class 10">Class 10</SelectItem>
                        <SelectItem value="Class 11">Class 11</SelectItem>
                        <SelectItem value="Class 12">Class 12</SelectItem>
                        <SelectItem value="Dropper">Dropper Batch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <Checkbox
                  id="welcome-terms"
                  checked={formData.agreedToTerms}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      agreedToTerms: checked === true,
                    })
                  }
                  className="mt-0.5"
                />
                <label
                  htmlFor="welcome-terms"
                  className="text-xs text-gray-500 leading-snug cursor-pointer"
                >
                  I consent to receive important academic updates, admission guidance, and test schedule notifications via SMS/WhatsApp.
                </label>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 bg-[#163B65] hover:bg-[#122e50] text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>{isSubmitting ? "Generating OTP..." : "Get OTP & Start Free Demo"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="text-center space-y-1">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal-50 text-[#16A6A1] mb-1">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 text-base">
                  Verify Mobile Number
                </h3>
                <p className="text-xs text-gray-500">
                  Enter the 6-digit verification code sent to{" "}
                  <strong>+91 {formData.phone}</strong>
                </p>
                <div className="inline-block bg-teal-50 px-2.5 py-1 rounded text-[11px] text-teal-800 font-semibold mt-1">
                  Demo Test OTP: <strong>123456</strong>
                </div>
              </div>

              <div className="flex justify-center gap-2">
                {otp.map((digit, i) => (
                  <Input
                    key={i}
                    id={`welcome-otp-${i}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    className="w-10 sm:w-12 h-12 text-center text-lg font-bold border-gray-300 focus:border-[#16A6A1] rounded-xl"
                  />
                ))}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 bg-[#16A6A1] hover:bg-[#138e8a] text-white font-semibold rounded-xl shadow-md transition-all"
              >
                {isSubmitting ? "Verifying..." : "Verify OTP & Complete"}
              </Button>

              <div className="flex justify-between items-center text-xs">
                <button
                  type="button"
                  onClick={() => setStep("details")}
                  className="text-gray-500 hover:text-gray-800 underline"
                >
                  Change Details
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOtp(["1", "2", "3", "4", "5", "6"]);
                  }}
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
                <h3 className="text-xl font-bold text-[#163B65]">Registration Successful!</h3>
                <p className="text-sm text-gray-600 mt-1 max-w-sm mx-auto">
                  Welcome to DeepSiddhi Foundation, <strong>{formData.fullName}</strong>. Your profile has been created and synced with the Academic Director.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl text-left border border-gray-100 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Selected Track:</span>
                  <span className="font-semibold text-gray-800">{formData.course}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Class:</span>
                  <span className="font-semibold text-gray-800">{formData.classLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Admin Sync:</span>
                  <span className="font-semibold text-emerald-600">✓ Enrolled in Admin Panel</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="flex-1 border-gray-300 text-gray-700"
                >
                  Explore Website
                </Button>
                <Link href="/dashboard" className="flex-1" onClick={handleClose}>
                  <Button className="w-full bg-[#163B65] hover:bg-[#122e50] text-white">
                    Go to Student Portal
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
