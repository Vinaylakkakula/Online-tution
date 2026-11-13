"use client";

import { useState } from "react";
import { useLMSData, LMSStore, DemoLead } from "@/lib/lms-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Gift,
  CheckCircle2,
  Clock,
  Plus,
  Search,
  Filter,
  Check,
  X,
  Phone,
  Mail,
  UserCheck,
} from "lucide-react";

export default function AdminTrialsPage() {
  const { demoLeads, refreshAll } = useLMSData();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredLeads = demoLeads.filter((l) => {
    const matchSearch =
      l.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.parentPhone.includes(searchTerm);
    const matchStatus = statusFilter === "all" || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleUpdateStatus = (
    id: string,
    status: DemoLead["status"],
    extendDays: number = 0
  ) => {
    LMSStore.updateTrialStatus(id, status, extendDays);
    refreshAll();
  };

  const handleConvertEnrollment = (lead: DemoLead) => {
    LMSStore.addStudent({
      id: `STD-${Date.now().toString().slice(-4)}`,
      name: lead.studentName,
      email: lead.studentEmail,
      phone: lead.parentPhone,
      enrolledCourses: [`${lead.classLevel} Full Track`],
      batchName: "Pratham Batch (Morning)",
      classLevel: lead.classLevel,
      joinedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      progress: 0,
      status: "Active",
    });
    LMSStore.updateTrialStatus(lead.id, "Enrolled");
    alert(`🎉 Success! ${lead.studentName} has been enrolled as a full student in ${lead.classLevel}!`);
    refreshAll();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-200/90 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-black">
              Admissions & Trials
            </span>
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              7-Day Free Trial Pipeline
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Demo & Free Trial Management 🎁
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-2xl font-medium">
            Review trial requests, schedule mentor demo sessions, extend trial access, or convert trial students to permanent paid enrollments.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-gray-200 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search leads by student name, parent phone, email..."
            className="pl-10 h-10 text-xs rounded-xl border-gray-200"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {["all", "Trial Active", "Enrolled", "Trial Expired"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                statusFilter === status
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {status === "all" ? "All Leads" : status}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLeads.map((lead) => (
          <Card
            key={lead.id}
            className="p-5 rounded-3xl border-2 border-indigo-100 bg-white hover:shadow-lg transition-all flex flex-col justify-between gap-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge className="bg-indigo-100 text-indigo-900 font-bold text-[10px]">
                  {lead.classLevel}
                </Badge>
                <span
                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                    lead.status === "Trial Active"
                      ? "bg-emerald-100 text-emerald-800"
                      : lead.status === "Enrolled"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {lead.status}
                </span>
              </div>

              <div>
                <h4 className="text-base font-black text-gray-900">
                  {lead.studentName}
                </h4>
                <p className="text-xs text-gray-500 font-medium">{lead.school || "School Not Specified"}</p>
              </div>

              <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 space-y-1.5 text-xs text-gray-600">
                <p className="flex items-center gap-2">
                  <span className="font-bold text-gray-800">Parent:</span> {lead.parentName || "Guardian"}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  <span className="font-mono text-gray-800 font-bold">{lead.parentPhone}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  <span className="truncate">{lead.studentEmail}</span>
                </p>
                <p className="text-[11px] text-indigo-700 font-semibold pt-1">
                  📅 Demo Slot: {lead.demoDate}
                </p>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">Trial Expiry:</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {lead.trialDaysLeft} Days Remaining
                </span>
              </div>
            </div>

            {/* Admin Actions */}
            <div className="space-y-2 pt-3 border-t border-gray-100">
              {lead.status !== "Enrolled" && (
                <Button
                  size="sm"
                  onClick={() => handleConvertEnrollment(lead)}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs rounded-xl shadow-xs gap-1.5"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Convert to Full Enrollment</span>
                </Button>
              )}

              <div className="grid grid-cols-2 gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleUpdateStatus(lead.id, "Trial Active", 7)}
                  className="text-[11px] font-bold rounded-xl border-gray-200"
                >
                  +7 Days Trial
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleUpdateStatus(lead.id, "Trial Expired")}
                  className="text-[11px] font-bold rounded-xl border-red-200 text-red-600 hover:bg-red-50"
                >
                  Expire Access
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
