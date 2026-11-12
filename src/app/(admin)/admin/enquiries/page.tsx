"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  UserCheck,
  Search,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  Clock,
  MessageSquare,
  Sparkles,
  Trash2,
  Plus,
} from "lucide-react";
import { useLMSData, LMSEnquiry } from "@/lib/lms-store";

export default function StudentEnquiriesPage() {
  const { enquiries, store } = useLMSData();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = enquiries.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.phone.includes(search) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.course.toLowerCase().includes(search.toLowerCase()) ||
      e.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id: string, newStatus: LMSEnquiry["status"]) => {
    store.updateEnquiryStatus(id, newStatus);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete inquiry for "${name}"?`)) {
      store.deleteEnquiry(id);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
              Admissions CRM
            </span>
            <span className="text-xs text-gray-500 font-medium">
              • Real-Time Lead Sync Active ({enquiries.length} Inquiries)
            </span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Student Admissions & Inquiries
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Real-time feed of leads from website registration popup, contact us inquiries, and course booking forms.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs font-bold px-3 py-1.5">
            ⚡ Instant Sync Active
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card className="rounded-2xl border-gray-200/90 shadow-2xs bg-white p-4 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search inquiry by student name, mobile, email, course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10 text-xs border-gray-200 focus:ring-1 focus:ring-[#004B87]"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {(["all", "new", "contacted", "enrolled", "closed"] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                statusFilter === st
                  ? "bg-[#004B87] text-white shadow-2xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </Card>

      {/* Leads Table */}
      <Card className="rounded-2xl border-gray-200/90 shadow-xs bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/80 text-gray-500 uppercase tracking-wider font-bold border-b border-gray-200">
              <tr>
                <th className="py-3.5 px-4">Lead ID</th>
                <th className="py-3.5 px-4">Student / Parent</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Course Track</th>
                <th className="py-3.5 px-4">Class</th>
                <th className="py-3.5 px-4">Source & Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Notes</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-10 text-center text-gray-400 text-xs">
                    No student inquiries found matching filter.
                  </td>
                </tr>
              ) : (
                filtered.map((lead) => (
                  <tr key={lead.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-gray-700">{lead.id}</td>
                    <td className="py-3 px-4 font-bold text-[#004B87]">{lead.name}</td>
                    <td className="py-3 px-4 text-gray-600">
                      <span className="block font-medium">{lead.phone}</span>
                      <span className="text-[10px] text-gray-400">{lead.email}</span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-800">{lead.course}</td>
                    <td className="py-3 px-4 text-gray-500">{lead.classLevel}</td>
                    <td className="py-3 px-4 text-gray-500">
                      <span className="block font-medium">{lead.source}</span>
                      <span className="text-[10px] text-gray-400">{lead.createdAt}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        className={`text-[10px] font-bold capitalize ${
                          lead.status === "new"
                            ? "bg-amber-100 text-amber-900 border-amber-300"
                            : lead.status === "contacted"
                            ? "bg-blue-100 text-blue-900 border-blue-300"
                            : lead.status === "enrolled"
                            ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                            : "bg-gray-100 text-gray-700 border-gray-300"
                        }`}
                      >
                        {lead.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-500 max-w-[200px] truncate" title={lead.notes}>
                      {lead.notes || "—"}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Select
                          value={lead.status}
                          onValueChange={(val) => updateStatus(lead.id, val as LMSEnquiry["status"])}
                        >
                          <SelectTrigger className="h-8 text-[11px] w-28 border-gray-200">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="enrolled">Enrolled</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>

                        <button
                          onClick={() => handleDelete(lead.id, lead.name)}
                          className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
