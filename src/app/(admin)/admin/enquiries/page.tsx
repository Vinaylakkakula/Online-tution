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
} from "lucide-react";

interface EnquiryLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  course: string;
  classLevel: string;
  source: string;
  createdAt: string;
  status: "new" | "contacted" | "enrolled" | "closed";
  notes?: string;
}

const mockEnquiries: EnquiryLead[] = [
  {
    id: "ENQ-501",
    name: "Vikram Malhotra",
    phone: "+91 9899887766",
    email: "vikram.parent@gmail.com",
    course: "IIT-JEE",
    classLevel: "Class 11",
    source: "Website Welcome Popup",
    createdAt: "Today, 11:20 AM",
    status: "new",
  },
  {
    id: "ENQ-502",
    name: "Suresh Pillai",
    phone: "+91 9811002233",
    email: "suresh@yahoo.com",
    course: "Olympiad",
    classLevel: "Class 8",
    source: "Contact Us Form",
    createdAt: "Today, 10:15 AM",
    status: "contacted",
    notes: "Spoke to father. Interested in Physics Olympiad. Demo session booked for Thursday.",
  },
  {
    id: "ENQ-503",
    name: "Deepika Sen",
    phone: "+91 9900112233",
    email: "deepika@gmail.com",
    course: "NTSE",
    classLevel: "Class 10",
    source: "Website Welcome Popup",
    createdAt: "Yesterday",
    status: "enrolled",
    notes: "Payment confirmed. Enrolled in Vidyarthi Batch.",
  },
  {
    id: "ENQ-504",
    name: "Rahul Aggarwal",
    phone: "+91 9711224466",
    email: "rahul.a@outlook.com",
    course: "IIT-JEE",
    classLevel: "Class 12",
    source: "Contact Us Form",
    createdAt: "2 days ago",
    status: "closed",
    notes: "Looking for offline center in Jaipur only.",
  },
];

export default function StudentEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<EnquiryLead[]>(mockEnquiries);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = enquiries.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.phone.includes(search) ||
      e.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id: string, newStatus: EnquiryLead["status"]) => {
    setEnquiries(
      enquiries.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#163B65]">Student Admissions Enquiries</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Inbound registration leads collected via homepage popup, course inquiries, and counseling booking requests.
        </p>
      </div>

      {/* Filters */}
      <Card className="rounded-2xl border-gray-100 shadow-sm bg-white p-4 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search lead by student or parent name, mobile, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10 text-xs border-gray-200"
          />
        </div>

        <div className="flex gap-2">
          {(["all", "new", "contacted", "enrolled", "closed"] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                statusFilter === st
                  ? "bg-[#163B65] text-white shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </Card>

      {/* Leads Table */}
      <Card className="rounded-3xl border-gray-100 shadow-md bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-100">
              <tr>
                <th className="py-3 px-4">Lead ID</th>
                <th className="py-3 px-4">Student / Parent</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Course Track</th>
                <th className="py-3 px-4">Class</th>
                <th className="py-3 px-4">Source & Date</th>
                <th className="py-3 px-4">Lead Status</th>
                <th className="py-3 px-4 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50/60">
                  <td className="py-3 px-4 font-mono font-bold text-gray-700">{lead.id}</td>
                  <td className="py-3 px-4 font-bold text-[#163B65]">{lead.name}</td>
                  <td className="py-3 px-4 text-gray-600">
                    <span className="block font-medium">{lead.phone}</span>
                    <span className="text-[10px] text-gray-400">{lead.email}</span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-800">{lead.course}</td>
                  <td className="py-3 px-4 text-gray-500">{lead.classLevel}</td>
                  <td className="py-3 px-4 text-gray-500">
                    <span className="block">{lead.source}</span>
                    <span className="text-[10px] text-gray-400">{lead.createdAt}</span>
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      className={`text-[10px] capitalize ${
                        lead.status === "new"
                          ? "bg-amber-100 text-amber-800"
                          : lead.status === "contacted"
                          ? "bg-blue-100 text-blue-800"
                          : lead.status === "enrolled"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {lead.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Select
                      value={lead.status}
                      onValueChange={(val) => updateStatus(lead.id, val as EnquiryLead["status"])}
                    >
                      <SelectTrigger className="h-8 text-[11px] w-28 ml-auto border-gray-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="enrolled">Enrolled</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
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
