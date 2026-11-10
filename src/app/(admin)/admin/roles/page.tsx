"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  KeyRound,
  ShieldCheck,
  Check,
  X,
  Lock,
  UserCheck,
  GraduationCap,
  Users,
} from "lucide-react";

const permissionsMatrix = [
  {
    module: "Student Management & Activation",
    superAdmin: true,
    admin: true,
    faculty: false,
    student: false,
  },
  {
    module: "Course Builder & Pricing Configuration",
    superAdmin: true,
    admin: true,
    faculty: false,
    student: false,
  },
  {
    module: "Live Lecture Scheduling & Zoom Links",
    superAdmin: true,
    admin: true,
    faculty: true,
    student: false,
  },
  {
    module: "Recorded Video & DRM Upload",
    superAdmin: true,
    admin: true,
    faculty: true,
    student: false,
  },
  {
    module: "Examination Authoring & Grading",
    superAdmin: true,
    admin: true,
    faculty: true,
    student: false,
  },
  {
    module: "Study Material Document Publishing",
    superAdmin: true,
    admin: true,
    faculty: true,
    student: false,
  },
  {
    module: "Fee Collections & Gateway Reconciliation",
    superAdmin: true,
    admin: false,
    faculty: false,
    student: false,
  },
  {
    module: "Access Enrolled Learning Video Content",
    superAdmin: true,
    admin: true,
    faculty: true,
    student: true,
  },
  {
    module: "Post Doubts in Academic Community",
    superAdmin: true,
    admin: true,
    faculty: true,
    student: true,
  },
  {
    module: "Institutional Settings & API Credentials",
    superAdmin: true,
    admin: false,
    faculty: false,
    student: false,
  },
];

export default function RolesAndPermissionsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#163B65]">Role-Based Access Control (RBAC)</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Server-side permission enforcement and Supabase Row Level Security (RLS) policy matrix.
        </p>
      </div>

      {/* 4 Role Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-2xl border-gray-100 shadow-sm bg-white p-5 space-y-2">
          <div className="flex items-center gap-2">
            <Badge className="bg-amber-500 text-white text-[10px]">Level 4</Badge>
            <h3 className="font-bold text-sm text-gray-900">Super Admin</h3>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Full root authority across finance, database migrations, credentials, and staff account provisioning.
          </p>
        </Card>

        <Card className="rounded-2xl border-gray-100 shadow-sm bg-white p-5 space-y-2">
          <div className="flex items-center gap-2">
            <Badge className="bg-[#163B65] text-white text-[10px]">Level 3</Badge>
            <h3 className="font-bold text-sm text-gray-900">Academic Admin</h3>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Manages student registrations, course batches, schedules, and broadcasts announcements.
          </p>
        </Card>

        <Card className="rounded-2xl border-gray-100 shadow-sm bg-white p-5 space-y-2">
          <div className="flex items-center gap-2">
            <Badge className="bg-[#16A6A1] text-white text-[10px]">Level 2</Badge>
            <h3 className="font-bold text-sm text-gray-900">Faculty Educator</h3>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Conducts live webinars, uploads recorded sessions, evaluates tests, and resolves doubts.
          </p>
        </Card>

        <Card className="rounded-2xl border-gray-100 shadow-sm bg-white p-5 space-y-2">
          <div className="flex items-center gap-2">
            <Badge className="bg-blue-600 text-white text-[10px]">Level 1</Badge>
            <h3 className="font-bold text-sm text-gray-900">Student Learner</h3>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Strictly sandboxed to view purchased course lessons, attend live sessions, and take tests.
          </p>
        </Card>
      </div>

      {/* Permissions Matrix Table */}
      <Card className="rounded-3xl border-gray-100 shadow-md bg-white overflow-hidden p-6 space-y-4">
        <h3 className="text-base font-bold text-[#163B65]">Granular Permission Matrix</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-y border-gray-100">
              <tr>
                <th className="py-3 px-4">System Operation / Module</th>
                <th className="py-3 px-4 text-center">Super Admin</th>
                <th className="py-3 px-4 text-center">Admin</th>
                <th className="py-3 px-4 text-center">Faculty</th>
                <th className="py-3 px-4 text-center">Student</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {permissionsMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50/60">
                  <td className="py-3.5 px-4 font-semibold text-gray-800">{row.module}</td>
                  <td className="py-3.5 px-4 text-center">
                    {row.superAdmin ? (
                      <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-gray-300 mx-auto" />
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {row.admin ? (
                      <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-gray-300 mx-auto" />
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {row.faculty ? (
                      <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-gray-300 mx-auto" />
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {row.student ? (
                      <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-gray-300 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
