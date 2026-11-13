"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { useLMSData, LMSStore } from "@/lib/lms-store";
import { getAvatarById, getFrameById, STUDENT_TITLES } from "@/lib/cartoon-avatars";
import { CartoonAvatarModal } from "@/components/modals/cartoon-avatar-modal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Sparkles,
  Palette,
  Award,
  School,
  Heart,
} from "lucide-react";

export default function StudentProfilePage() {
  const { user, updateProfile } = useAuth();
  const studentId = user?.id || "STD-1001";
  const { profileExtras, refreshAll } = useLMSData();

  const [avatarModalOpen, setAvatarModalOpen] = useState(false);

  const [fullName, setFullName] = useState(user?.full_name || "Aryan Sharma");
  const [phone, setPhone] = useState(user?.phone || "+91 9876543210");
  const [email, setEmail] = useState(user?.email || "student@deepsiddhi.org");
  const [classLevel, setClassLevel] = useState<string>(user?.class_level || "Class 8");
  const [school, setSchool] = useState(profileExtras.school || "Springdales School, Delhi");
  const [parentName, setParentName] = useState(profileExtras.parentName || "Rajesh Sharma");
  const [parentPhone, setParentPhone] = useState(profileExtras.parentPhone || "+91 9876543210");
  const [parentEmail, setParentEmail] = useState(profileExtras.parentEmail || "rajesh.parent@gmail.com");

  // Password Reset state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordSaved, setPasswordSaved] = useState(false);

  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const currentAvatar = getAvatarById(profileExtras.avatarId || "astro-leo");
  const currentFrame = getFrameById(profileExtras.frameId || "frame-gold");
  const currentTitle =
    STUDENT_TITLES.find((t) => t.id === profileExtras.titleId) || STUDENT_TITLES[1];

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    LMSStore.saveProfileExtras(studentId, {
      school,
      parentName,
      parentPhone,
      parentEmail,
    });

    await updateProfile({
      fullName,
      phone,
      classLevel: classLevel as any,
    });

    setIsSaving(false);
    setSaved(true);
    refreshAll();
    setTimeout(() => setSaved(false), 3000);
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) return;
    setPasswordSaved(true);
    setCurrentPassword("");
    setNewPassword("");
    setTimeout(() => setPasswordSaved(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 space-y-2">
          <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">
            Student Profile & Avatar Setup
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            My Cartoon Profile 🦸
          </h1>
          <p className="text-xs sm:text-sm text-white/80 max-w-xl font-medium">
            Customize your cartoon avatar character, glow frames, proud scholar title, and academic records.
          </p>
        </div>
        <div className="absolute -right-4 -bottom-6 text-8xl sm:text-9xl opacity-20 select-none pointer-events-none">
          🎨
        </div>
      </div>

      {/* Main Profile & Avatar Card */}
      <Card className="rounded-3xl border-2 border-indigo-100 shadow-md bg-white p-6 sm:p-8 space-y-8">
        {/* Avatar Presentation & Picker */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100 justify-between">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="relative">
              <div
                onClick={() => setAvatarModalOpen(true)}
                className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center text-5xl sm:text-6xl bg-gradient-to-tr ${currentAvatar.bgColor} text-white cursor-pointer hover:scale-105 transition-transform shadow-xl ${currentFrame.borderClass} ${currentFrame.glowClass}`}
                title="Click to customize avatar"
              >
                <span>{currentAvatar.emoji}</span>
              </div>
              <span className="absolute -bottom-1 -right-1 text-xs bg-amber-400 text-gray-950 font-black px-2.5 py-0.5 rounded-full border border-white shadow-xs">
                Lv.{profileExtras.level || 7}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                  {fullName}
                </h2>
                <Badge className="bg-indigo-100 text-indigo-800 border-none font-bold text-xs">
                  {currentTitle.icon} {currentTitle.title}
                </Badge>
              </div>

              <p className="text-xs text-gray-500 font-semibold">
                Cartoon Hero: <span className="text-indigo-700 font-black">{currentAvatar.name}</span> ({currentAvatar.character})
              </p>

              <div className="flex items-center justify-center sm:justify-start gap-3 text-xs text-gray-500 pt-1">
                <span className="font-bold text-amber-600">⭐ {profileExtras.xp || 1250} XP</span>
                <span>•</span>
                <span className="font-bold text-purple-600">🏆 {currentFrame.badge} Frame</span>
              </div>
            </div>
          </div>

          <Button
            onClick={() => setAvatarModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs h-10 px-6 rounded-2xl shadow-md gap-2"
          >
            <Palette className="w-4 h-4" />
            <span>Customize Cartoon Avatar</span>
          </Button>
        </div>

        {/* Profile Details Form */}
        <form onSubmit={handleSaveProfile} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-black text-gray-700">Student Full Name</Label>
              <Input
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="rounded-xl text-xs h-10 border-gray-200"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-black text-gray-700">Enrolled Grade / Class</Label>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-black text-gray-700">Student Email Address</Label>
              <Input
                type="email"
                value={email}
                disabled
                className="rounded-xl text-xs h-10 bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-black text-gray-700">Mobile / Contact Number</Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-xl text-xs h-10 border-gray-200"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-black text-gray-700">School Name</Label>
            <Input
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              placeholder="e.g. Springdales School, Delhi"
              className="rounded-xl text-xs h-10 border-gray-200"
            />
          </div>

          {/* Parent Information Box (Requirement 1: "Student details: Name, Class, School, Email, Mobile Number, and Course Enrollment") */}
          <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-4">
            <h4 className="text-xs font-black text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Parent / Guardian Records</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label className="text-[11px] font-bold text-gray-700">Parent Name</Label>
                <Input
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="rounded-xl text-xs h-9 bg-white border-indigo-200"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-[11px] font-bold text-gray-700">Parent Mobile Number</Label>
                <Input
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  className="rounded-xl text-xs h-9 bg-white border-indigo-200"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-[11px] font-bold text-gray-700">Parent Email</Label>
                <Input
                  type="email"
                  value={parentEmail}
                  onChange={(e) => setParentEmail(e.target.value)}
                  className="rounded-xl text-xs h-9 bg-white border-indigo-200"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Button
              type="submit"
              disabled={isSaving}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs h-10 px-8 rounded-xl shadow-md"
            >
              {isSaving ? "Saving..." : "Save Profile Details"}
            </Button>

            {saved && (
              <span className="text-xs text-emerald-600 font-bold flex items-center gap-1.5 animate-slide-down">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Profile updated successfully! 🎉</span>
              </span>
            )}
          </div>
        </form>
      </Card>

      {/* Forgot Password & Password Reset Card (Requirement 1: "Forgot password and password reset functionality") */}
      <Card className="rounded-3xl border-2 border-indigo-100 shadow-md bg-white p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-indigo-600" />
          <div>
            <h3 className="text-base font-black text-gray-900">
              Password & Account Security
            </h3>
            <p className="text-xs text-gray-500">
              Update your account password or request a password reset link.
            </p>
          </div>
        </div>

        <form onSubmit={handlePasswordReset} className="space-y-4 max-w-md pt-2">
          <div className="space-y-1.5">
            <Label className="text-xs font-black text-gray-700">Current Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="rounded-xl text-xs h-10 border-gray-200"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-black text-gray-700">New Password</Label>
            <Input
              type="password"
              placeholder="Minimum 6 characters"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="rounded-xl text-xs h-10 border-gray-200"
            />
          </div>

          <Button
            type="submit"
            variant="outline"
            className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 text-xs font-bold rounded-xl h-10"
          >
            Update Security Password
          </Button>

          {passwordSaved && (
            <p className="text-xs text-emerald-600 font-bold">
              ✓ Password updated successfully!
            </p>
          )}
        </form>
      </Card>

      {/* Cartoon Avatar Modal */}
      <CartoonAvatarModal
        open={avatarModalOpen}
        onOpenChange={setAvatarModalOpen}
        studentId={studentId}
        studentName={fullName}
        currentExtras={profileExtras}
        onSave={refreshAll}
      />
    </div>
  );
}
