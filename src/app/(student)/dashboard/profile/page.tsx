"use client";

import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Lock,
} from "lucide-react";

export default function StudentProfilePage() {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(user?.full_name || "Aryan Sharma");
  const [phone, setPhone] = useState(user?.phone || "+91 9876543210");
  const [email, setEmail] = useState(user?.email || "student@deepsiddhi.org");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#163B65]">Student Academic Profile</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Personal identification, registered batches, syllabus tracks, and security credentials.
        </p>
      </div>

      {/* Main Profile Card */}
      <Card className="rounded-3xl border-gray-100 shadow-md bg-white p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#163B65] to-[#16A6A1] text-white font-extrabold text-3xl flex items-center justify-center shadow-lg">
            {fullName.charAt(0)}
          </div>

          <div className="space-y-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-bold text-gray-900">{fullName}</h2>
              <Badge className="bg-emerald-500 text-white text-[10px]">
                Active Enrolled
              </Badge>
            </div>
            <p className="text-xs text-gray-500 font-medium">
              Student ID: <strong className="text-gray-800">DSF-2026-0842</strong> • Roll: #14
            </p>
            <p className="text-xs text-teal-700 font-semibold">
              IIT-JEE Comprehensive Mastery 2026-27 (Pratham Morning Batch)
            </p>
          </div>
        </div>

        {/* Profile Update Form */}
        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Full Name
              </Label>
              <div className="relative mt-1">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-9 h-11 border-gray-200"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Mobile Number
              </Label>
              <div className="relative mt-1">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-9 h-11 border-gray-200"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Email Address
              </Label>
              <div className="relative mt-1">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  value={email}
                  disabled
                  className="pl-9 h-11 bg-gray-50 border-gray-200 text-gray-500"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Enrolled Class
              </Label>
              <div className="relative mt-1">
                <GraduationCap className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  value="Class 11 (2-Year Integrated)"
                  disabled
                  className="pl-9 h-11 bg-gray-50 border-gray-200 text-gray-500"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <Button
              type="submit"
              className="bg-[#163B65] hover:bg-[#122e50] text-white text-xs font-semibold h-10 px-6 rounded-xl"
            >
              {saved ? "Saved Successfully!" : "Save Profile Changes"}
            </Button>
            {saved && (
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Profile Updated
              </span>
            )}
          </div>
        </form>
      </Card>

      {/* Security & Password */}
      <Card className="rounded-3xl border-gray-100 shadow-md bg-white p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-bold text-[#163B65] flex items-center gap-2">
          <Lock className="w-5 h-5 text-[#16A6A1]" />
          Account Security & Login Credentials
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <Label className="text-xs font-semibold text-gray-700">New Password</Label>
            <Input type="password" placeholder="••••••••" className="mt-1 h-10 border-gray-200" />
          </div>
          <div>
            <Label className="text-xs font-semibold text-gray-700">Confirm New Password</Label>
            <Input type="password" placeholder="••••••••" className="mt-1 h-10 border-gray-200" />
          </div>
        </div>

        <Button variant="outline" className="text-xs rounded-xl border-gray-300">
          Update Security Password
        </Button>
      </Card>
    </div>
  );
}
