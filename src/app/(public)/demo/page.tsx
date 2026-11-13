"use client";

import { useState } from "react";
import { LMSStore } from "@/lib/lms-store";
import { Card } from "@/components/ui/card";
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
  Sparkles,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Calendar,
  Gift,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

export default function DemoPage() {
  const [studentName, setStudentName] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [school, setSchool] = useState("");
  const [classLevel, setClassLevel] = useState<
    "Class 6" | "Class 7" | "Class 8" | "Class 9" | "Class 10"
  >("Class 6");
  const [preferredSubject, setPreferredSubject] = useState("Mathematics & Science");
  const [demoDate, setDemoDate] = useState("This Saturday, 5:00 PM IST");
  const [submitted, setSubmitted] = useState(false);
  const [generatedLead, setGeneratedLead] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !parentPhone || !studentEmail) return;

    const lead = LMSStore.registerDemo({
      studentName,
      parentName,
      parentPhone,
      studentEmail,
      school,
      classLevel,
      preferredSubject,
      demoDate,
    });

    setGeneratedLead(lead);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 via-white to-purple-50/40 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Top Hero Banner */}
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-gray-950 font-black text-xs shadow-md">
            <Gift className="w-4 h-4 text-gray-950" />
            <span>1-Week FREE Trial Adventure! No Credit Card Required</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
            Book Your Free Demo Class 🚀
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-medium">
            Get 7 days of full access to interactive cartoon video lessons, chapter subfolders, formula maps, and live doubt sessions for Classes 6th to 10th!
          </p>
        </div>

        {submitted && generatedLead ? (
          <Card className="p-8 sm:p-10 rounded-3xl border-2 border-emerald-300 bg-white shadow-2xl text-center space-y-6 animate-scale-up">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-4xl mx-auto shadow-md">
              🎉
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-gray-900">
                Congratulations, {generatedLead.studentName}!
              </h2>
              <p className="text-sm text-emerald-700 font-bold">
                Your 7-Day Free Trial Pass is now ACTIVE!
              </p>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                We have reserved your slot for <span className="font-bold text-gray-800">{generatedLead.demoDate}</span>. Our academic mentor will send the joining link to {generatedLead.parentPhone}.
              </p>
            </div>

            {/* Trial Details Card */}
            <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-left max-w-md mx-auto space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Student Name:</span>
                <span className="font-bold text-gray-900">{generatedLead.studentName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Grade / Class:</span>
                <span className="font-bold text-indigo-700">{generatedLead.classLevel}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Trial Period:</span>
                <span className="font-bold text-gray-900">
                  {generatedLead.trialStartDate} – {generatedLead.trialEndDate}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Remaining Trial Days:</span>
                <span className="font-black text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-md">
                  7 Days Remaining 🎁
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-[#1769AA] hover:bg-[#102C50] text-white font-bold text-xs h-11 px-8 rounded-2xl shadow-sm gap-2">
                  <span>Enter Student Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/dashboard/subfolders" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto text-xs font-bold h-11 rounded-2xl border-gray-300">
                  <span>Explore Course Subfolders</span>
                </Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Column */}
            <Card className="lg:col-span-7 p-6 sm:p-8 rounded-3xl border border-gray-200/90 bg-white shadow-sm space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-black text-gray-700">Student Full Name *</Label>
                    <Input
                      required
                      placeholder="e.g. Aryan Sharma"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="rounded-xl text-xs h-10 border-gray-200"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-black text-gray-700">Target Grade *</Label>
                    <Select
                      value={classLevel}
                      onValueChange={(val: any) => setClassLevel(val)}
                    >
                      <SelectTrigger className="rounded-xl text-xs h-10 border-gray-200">
                        <SelectValue placeholder="Select Class" />
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
                    <Label className="text-xs font-black text-gray-700">Student Email Address *</Label>
                    <Input
                      type="email"
                      required
                      placeholder="student@gmail.com"
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      className="rounded-xl text-xs h-10 border-gray-200"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-black text-gray-700">School Name</Label>
                    <Input
                      placeholder="e.g. Delhi Public School"
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      className="rounded-xl text-xs h-10 border-gray-200"
                    />
                  </div>
                </div>

                {/* Parent Contact Section */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
                  <span className="text-[11px] font-black uppercase text-amber-900 tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    Parent / Guardian Contact Information
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-[11px] font-bold text-gray-700">Parent Name</Label>
                      <Input
                        placeholder="Father / Mother Name"
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        className="rounded-xl text-xs h-9 bg-white border-amber-200"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[11px] font-bold text-gray-700">Parent WhatsApp / Mobile *</Label>
                      <Input
                        required
                        placeholder="+91 9876543210"
                        value={parentPhone}
                        onChange={(e) => setParentPhone(e.target.value)}
                        className="rounded-xl text-xs h-9 bg-white border-amber-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-black text-gray-700">Preferred Focus Subject</Label>
                    <Select
                      value={preferredSubject}
                      onValueChange={setPreferredSubject}
                    >
                      <SelectTrigger className="rounded-xl text-xs h-10 border-gray-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mathematics & Science">Mathematics & Science</SelectItem>
                        <SelectItem value="Mathematics Only">Mathematics Mastery</SelectItem>
                        <SelectItem value="Science (Physics/Chem/Bio)">Science Explorer</SelectItem>
                        <SelectItem value="Full All-Subjects Combo">Full All-Subjects Track</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-black text-gray-700">Demo Date Slot</Label>
                    <Select
                      value={demoDate}
                      onValueChange={setDemoDate}
                    >
                      <SelectTrigger className="rounded-xl text-xs h-10 border-gray-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="This Saturday, 5:00 PM IST">This Saturday, 5:00 PM IST</SelectItem>
                        <SelectItem value="This Sunday, 11:00 AM IST">This Sunday, 11:00 AM IST</SelectItem>
                        <SelectItem value="Next Wednesday, 6:00 PM IST">Next Wednesday, 6:00 PM IST</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#1769AA] hover:bg-[#102C50] text-white font-bold text-xs h-11 rounded-2xl shadow-sm gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#FFD447]" />
                  <span>Start 7-Day FREE Adventure Trial Now!</span>
                </Button>
              </form>
            </Card>

            {/* Perks Column */}
            <div className="lg:col-span-5 space-y-4">
              <Card className="p-6 rounded-3xl border border-blue-200/80 bg-blue-50/40 space-y-4 shadow-2xs">
                <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
                  <span>🎁</span>
                  <span>Included in Your 7-Day Trial:</span>
                </h3>

                <ul className="space-y-3 text-xs text-gray-700 font-semibold">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Instant access to Classes 6th-10th subjects & chapter subfolders.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Watch recorded lessons with speed controls & bookmarking.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Download colorful formula sheets & handwritten notes.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Interactive CBT quizzes with instant marks & explanations.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>1-on-1 Live demo interaction with Senior Academic Mentors.</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-5 rounded-3xl border border-gray-200 bg-white flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl shrink-0">
                  🦉
                </div>
                <div>
                  <h4 className="text-xs font-black text-gray-900">100% No Commitment</h4>
                  <p className="text-[11px] text-gray-500">
                    After the trial, you can choose any monthly or annual plan with our special cartoon discounts.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
