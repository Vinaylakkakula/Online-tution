"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { CARTOON_AVATARS } from "@/lib/cartoon-avatars";
import { LMSStore } from "@/lib/lms-store";
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
import {
  Sparkles,
  User,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
  Lock,
  School,
  ShieldCheck,
} from "lucide-react";
import { ClassLevel } from "@/types/database";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [classLevel, setClassLevel] = useState<ClassLevel>("Class 6");
  const [school, setSchool] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [selectedAvatarId, setSelectedAvatarId] = useState("astro-leo");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName.trim()) {
      setError("Please enter the student's full name.");
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    const courseTitle = `${classLevel} Champions Adventure`;

    const res = await register({
      fullName,
      phone,
      email,
      course: courseTitle,
      classLevel,
    });

    if (res.success) {
      // Save extra cartoon profile metadata
      LMSStore.saveProfileExtras("STD-1001", {
        avatarId: selectedAvatarId,
        school,
        parentName,
        parentPhone,
      });

      router.push("/dashboard");
    } else {
      setError(res.error || "Registration failed. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <Card className="rounded-3xl border-2 border-indigo-100 shadow-2xl bg-white overflow-hidden max-w-lg mx-auto">
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-white text-center space-y-1">
        <span className="text-2xl">🚀</span>
        <h2 className="text-2xl font-black tracking-tight text-white">
          Join the Cartoon Learning Club!
        </h2>
        <p className="text-xs text-white/80 font-medium">
          Classes 6th to 10th Interactive Learning with Subfolders, Recorded Videos & Badges!
        </p>
      </div>

      <CardContent className="p-6 sm:p-8 space-y-5">
        {error && (
          <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-600 font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Pick Starting Cartoon Avatar */}
          <div className="space-y-1.5">
            <Label className="text-xs font-black text-gray-700 flex items-center justify-between">
              <span>Choose Your Cartoon Hero Avatar</span>
              <span className="text-[10px] text-indigo-600 font-bold">You can change this anytime!</span>
            </Label>
            <div className="grid grid-cols-5 gap-2 pt-1">
              {CARTOON_AVATARS.slice(0, 5).map((av) => (
                <button
                  key={av.id}
                  type="button"
                  onClick={() => setSelectedAvatarId(av.id)}
                  className={`p-2 rounded-2xl border-2 flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    selectedAvatarId === av.id
                      ? "border-indigo-600 bg-indigo-50 shadow-sm scale-105"
                      : "border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  <span className="text-2xl">{av.emoji}</span>
                  <span className="text-[10px] font-bold text-gray-800 truncate w-full text-center">
                    {av.name.split(" ")[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs font-black text-gray-700">Student Name *</Label>
              <Input
                required
                placeholder="e.g. Aryan Sharma"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="rounded-xl text-xs h-10 border-gray-200"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-black text-gray-700">Select Grade / Class *</Label>
              <Select
                value={classLevel}
                onValueChange={(val: any) => setClassLevel(val)}
              >
                <SelectTrigger className="rounded-xl text-xs h-10 border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Class 6">Class 6th</SelectItem>
                  <SelectItem value="Class 7">Class 7th</SelectItem>
                  <SelectItem value="Class 8">Class 8th</SelectItem>
                  <SelectItem value="Class 9">Class 9th</SelectItem>
                  <SelectItem value="Class 10">Class 10th</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs font-black text-gray-700">Email Address *</Label>
              <Input
                type="email"
                required
                placeholder="student@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl text-xs h-10 border-gray-200"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-black text-gray-700">Student Mobile *</Label>
              <Input
                required
                placeholder="+91 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-xl text-xs h-10 border-gray-200"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-black text-gray-700">School Name</Label>
            <Input
              placeholder="e.g. Delhi Public School"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="rounded-xl text-xs h-10 border-gray-200"
            />
          </div>

          {/* Parent Details */}
          <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-2.5">
            <span className="text-[10px] font-black uppercase text-indigo-900 tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              Parent / Guardian Contact
            </span>
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Parent Name"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                className="rounded-xl text-xs h-9 bg-white border-indigo-200"
              />
              <Input
                placeholder="Parent WhatsApp Phone"
                value={parentPhone}
                onChange={(e) => setParentPhone(e.target.value)}
                className="rounded-xl text-xs h-9 bg-white border-indigo-200"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-black text-gray-700">Create Password *</Label>
            <Input
              type="password"
              required
              placeholder="•••••••• (Min 6 chars)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl text-xs h-10 border-gray-200"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs h-11 rounded-2xl shadow-md gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{isSubmitting ? "Creating Profile..." : "Create My Student Account 🚀"}</span>
          </Button>

          <p className="text-xs text-gray-500 text-center font-medium pt-1">
            Already registered?{" "}
            <Link href="/login" className="text-indigo-600 font-bold hover:underline">
              Sign In here
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
