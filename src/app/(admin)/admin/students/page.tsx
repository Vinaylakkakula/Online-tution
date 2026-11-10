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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Users,
  Search,
  Filter,
  Download,
  UserCheck,
  UserX,
  BookOpen,
  Calendar,
  CheckCircle2,
  MoreVertical,
  ShieldAlert,
  ArrowUpDown,
} from "lucide-react";

interface StudentRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  batch: string;
  classLevel: string;
  joinedDate: string;
  progress: number;
  isActive: boolean;
}

const mockStudents: StudentRecord[] = [
  {
    id: "STD-1001",
    name: "Aryan Sharma",
    email: "aryan@gmail.com",
    phone: "+91 9876543210",
    course: "IIT-JEE Comprehensive Mastery",
    batch: "Pratham Batch (Morning)",
    classLevel: "Class 11",
    joinedDate: "Nov 1, 2026",
    progress: 72,
    isActive: true,
  },
  {
    id: "STD-1002",
    name: "Siddharth Verma",
    email: "siddharth@gmail.com",
    phone: "+91 9811223344",
    course: "IIT-JEE Comprehensive Mastery",
    batch: "Pratham Batch (Morning)",
    classLevel: "Class 11",
    joinedDate: "Oct 25, 2026",
    progress: 84,
    isActive: true,
  },
  {
    id: "STD-1003",
    name: "Ananya Deshmukh",
    email: "ananya@gmail.com",
    phone: "+91 9822334455",
    course: "Physics Olympiad Sprint",
    batch: "Aryabhata Olympiad",
    classLevel: "Class 10",
    joinedDate: "Oct 20, 2026",
    progress: 65,
    isActive: true,
  },
  {
    id: "STD-1004",
    name: "Rohan Kulkarni",
    email: "rohan@gmail.com",
    phone: "+91 9833445566",
    course: "IIT-JEE Crash Course",
    batch: "Sankalp Evening",
    classLevel: "Class 12",
    joinedDate: "Oct 15, 2026",
    progress: 50,
    isActive: true,
  },
  {
    id: "STD-1005",
    name: "Meera Nair",
    email: "meera@gmail.com",
    phone: "+91 9844556677",
    course: "NTSE & Aptitude Mastery",
    batch: "Vidyarthi Batch",
    classLevel: "Class 9",
    joinedDate: "Oct 10, 2026",
    progress: 88,
    isActive: true,
  },
  {
    id: "STD-1006",
    name: "Tanmay Roy",
    email: "tanmay@gmail.com",
    phone: "+91 9855667788",
    course: "IIT-JEE Comprehensive Mastery",
    batch: "Pratham Batch (Morning)",
    classLevel: "Class 11",
    joinedDate: "Oct 05, 2026",
    progress: 30,
    isActive: false,
  },
];

export default function StudentsManagementPage() {
  const [students, setStudents] = useState<StudentRecord[]>(mockStudents);
  const [search, setSearch] = useState("");
  const [filterClass, setFilterClass] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);

  const filtered = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.phone.includes(search);
    const matchesClass = filterClass === "all" || s.classLevel === filterClass;
    return matchesSearch && matchesClass;
  });

  const toggleStatus = (id: string) => {
    setStudents(
      students.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
  };

  const exportCSV = () => {
    const header = "Student ID,Name,Email,Phone,Course,Batch,Class,Joined Date,Progress,Status\n";
    const rows = filtered
      .map(
        (s) =>
          `"${s.id}","${s.name}","${s.email}","${s.phone}","${s.course}","${s.batch}","${s.classLevel}","${s.joinedDate}",${s.progress}%,"${s.isActive ? "Active" : "Inactive"}"`
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `DeepSiddhi_Students_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#163B65]">Student Directory & Accounts</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage student enrollments, assign batches, monitor progress, toggle account status, and export rosters.
          </p>
        </div>

        <Button
          onClick={exportCSV}
          className="bg-[#163B65] hover:bg-[#122e50] text-white text-xs font-semibold rounded-xl h-10 px-4 gap-2"
        >
          <Download className="w-4 h-4" />
          Export Student CSV
        </Button>
      </div>

      {/* Search and Filters Card */}
      <Card className="rounded-2xl border-gray-100 shadow-sm bg-white p-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Search by student name, phone, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-10 text-xs border-gray-200"
            />
          </div>

          <div className="w-full sm:w-48">
            <Select value={filterClass} onValueChange={setFilterClass}>
              <SelectTrigger className="h-10 text-xs border-gray-200">
                <SelectValue placeholder="Filter Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="Class 9">Class 9</SelectItem>
                <SelectItem value="Class 10">Class 10</SelectItem>
                <SelectItem value="Class 11">Class 11</SelectItem>
                <SelectItem value="Class 12">Class 12</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Students Table */}
      <Card className="rounded-3xl border-gray-100 shadow-md bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-100">
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Course & Batch</th>
                <th className="py-3 px-4">Class</th>
                <th className="py-3 px-4">Progress</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50/60">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#163B65] to-[#16A6A1] text-white font-bold flex items-center justify-center text-xs">
                        {s.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-bold text-[#163B65] block">{s.name}</span>
                        <span className="text-[10px] text-gray-400 font-mono">{s.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600">
                    <span className="block">{s.phone}</span>
                    <span className="text-[10px] text-gray-400">{s.email}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-gray-900 block">{s.course}</span>
                    <span className="text-[10px] text-teal-700 font-medium">{s.batch}</span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600">{s.classLevel}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-800">{s.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge
                      className={`text-[10px] ${
                        s.isActive
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {s.isActive ? "Active" : "Suspended"}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedStudent(s)}
                      className="h-8 text-[11px] rounded-lg border-gray-200"
                    >
                      Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleStatus(s.id)}
                      className={`h-8 text-[11px] rounded-lg ${
                        s.isActive ? "text-red-600 hover:bg-red-50" : "text-emerald-600 hover:bg-emerald-50"
                      }`}
                    >
                      {s.isActive ? "Deactivate" : "Activate"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Student Details Dialog */}
      <Dialog open={!!selectedStudent} onOpenChange={(open) => !open && setSelectedStudent(null)}>
        <DialogContent className="sm:max-w-[500px] p-6 rounded-3xl bg-white border-0 shadow-2xl space-y-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-[#163B65]">
              Student Profile • {selectedStudent?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">Student ID:</span>
              <span className="font-mono font-bold text-gray-900">{selectedStudent?.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Mobile Phone:</span>
              <span className="font-bold text-gray-900">{selectedStudent?.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Email:</span>
              <span className="font-bold text-gray-900">{selectedStudent?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Enrolled Track:</span>
              <span className="font-bold text-[#163B65]">{selectedStudent?.course}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Assigned Batch:</span>
              <span className="font-bold text-teal-700">{selectedStudent?.batch}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Syllabus Progress:</span>
              <span className="font-bold text-emerald-600">{selectedStudent?.progress}% Completed</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Registration Date:</span>
              <span className="font-bold text-gray-900">{selectedStudent?.joinedDate}</span>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={() => setSelectedStudent(null)}
              className="bg-[#163B65] text-white text-xs rounded-xl"
            >
              Close Window
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
