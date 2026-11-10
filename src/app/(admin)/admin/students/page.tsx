"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Users,
  Search,
  Filter,
  UserCheck,
  UserX,
  BookOpen,
  Calendar,
  CheckCircle2,
  Trash2,
  Plus,
  GraduationCap,
  Sparkles,
  Phone,
  Mail,
} from "lucide-react";
import { useLMSData, LMSStudent } from "@/lib/lms-store";

export default function StudentsManagementPage() {
  const { students, courses, batches, store } = useLMSData();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBatch, setFilterBatch] = useState("all");
  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<LMSStudent | null>(null);

  // Enrollment Modal state
  const [enrollCourse, setEnrollCourse] = useState("");
  const [enrollBatch, setEnrollBatch] = useState("");

  // Add Student state
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("+91 ");
  const [newClass, setNewClass] = useState("Class 11");
  const [newCourse, setNewCourse] = useState("");
  const [newBatch, setNewBatch] = useState("");

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.phone.includes(searchTerm);

    const matchesBatch = filterBatch === "all" || s.batchName === filterBatch;

    return matchesSearch && matchesBatch;
  });

  const handleOpenEnrollModal = (student: LMSStudent) => {
    setSelectedStudent(student);
    setEnrollCourse(courses[0]?.title || "");
    setEnrollBatch(batches[0]?.name || student.batchName);
    setEnrollModalOpen(true);
  };

  const handleConfirmEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent || !enrollCourse) return;

    store.enrollStudentInCourse(selectedStudent.id, enrollCourse, enrollBatch);
    setEnrollModalOpen(false);
    setSelectedStudent(null);
  };

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const courseToEnroll = newCourse || courses[0]?.title || "IIT-JEE Comprehensive Mastery 2026-27";
    const batchToAssign = newBatch || batches[0]?.name || "Pratham Batch (Morning)";

    const newStudent: LMSStudent = {
      id: `STD-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newName.trim(),
      email: newEmail.trim(),
      phone: newPhone.trim(),
      enrolledCourses: [courseToEnroll],
      batchName: batchToAssign,
      classLevel: newClass,
      joinedDate: "Today",
      progress: 0,
      status: "Active",
    };

    store.addStudent(newStudent);
    setAddStudentOpen(false);
    setNewName("");
    setNewEmail("");
    setNewPhone("+91 ");
  };

  const handleDeleteStudent = (id: string) => {
    if (confirm("Are you sure you want to remove this student record?")) {
      store.deleteStudent(id);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-[#004B87] text-white text-[10px] font-bold">
              Student Directory
            </Badge>
            <span className="text-xs text-gray-500 font-semibold">
              Live Enrollment Engine
            </span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Student Management & Course Enrollment
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            Assign courses & batches to specific students. Everything syncs instantly with the student portal.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            onClick={() => setAddStudentOpen(true)}
            className="bg-[#004B87] hover:bg-[#003866] text-white font-extrabold text-xs h-10 px-5 rounded-xl shadow-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            Register Student
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="rounded-2xl border-gray-200/90 shadow-2xs bg-white p-4">
          <span className="text-xs text-gray-500 font-bold block">Total Registered</span>
          <span className="text-2xl font-black text-[#004B87]">{students.length}</span>
        </Card>
        <Card className="rounded-2xl border-gray-200/90 shadow-2xs bg-white p-4">
          <span className="text-xs text-gray-500 font-bold block">Active Students</span>
          <span className="text-2xl font-black text-emerald-600">
            {students.filter((s) => s.status === "Active").length}
          </span>
        </Card>
        <Card className="rounded-2xl border-gray-200/90 shadow-2xs bg-white p-4">
          <span className="text-xs text-gray-500 font-bold block">Total Courses</span>
          <span className="text-2xl font-black text-purple-700">{courses.length}</span>
        </Card>
        <Card className="rounded-2xl border-gray-200/90 shadow-2xs bg-white p-4">
          <span className="text-xs text-gray-500 font-bold block">Active Batches</span>
          <span className="text-2xl font-black text-amber-600">{batches.length}</span>
        </Card>
      </div>

      {/* Filter & Search Bar */}
      <Card className="rounded-2xl border-gray-200/90 shadow-2xs bg-white p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Search by student name, email, phone or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 text-xs rounded-xl h-10 border-gray-200"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs text-gray-500 font-bold whitespace-nowrap">
              Filter Batch:
            </span>
            <Select value={filterBatch} onValueChange={setFilterBatch}>
              <SelectTrigger className="w-full sm:w-56 text-xs rounded-xl h-10">
                <SelectValue placeholder="All Batches" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-xs">
                  All Batches
                </SelectItem>
                {batches.map((b) => (
                  <SelectItem key={b.id} value={b.name} className="text-xs">
                    {b.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Students List */}
      <div className="space-y-4">
        {filteredStudents.length === 0 ? (
          <Card className="rounded-2xl border-gray-200/90 p-12 text-center bg-white">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-gray-700">No students found</h3>
            <p className="text-xs text-gray-400 mt-1">
              Try adjusting your search query or registering a new student.
            </p>
          </Card>
        ) : (
          filteredStudents.map((student) => (
            <Card
              key={student.id}
              className="rounded-2xl border-gray-200/90 shadow-2xs hover:shadow-md transition-shadow bg-white overflow-hidden p-5"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Student Info */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center font-black text-[#004B87] text-base shrink-0">
                    {student.name.charAt(0)}
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-extrabold text-base text-gray-900">
                        {student.name}
                      </h3>
                      <Badge
                        variant="outline"
                        className="text-[10px] font-bold text-gray-500 border-gray-200"
                      >
                        {student.id}
                      </Badge>
                      <Badge
                        className={`text-[10px] font-bold ${
                          student.status === "Active"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                      >
                        {student.status}
                      </Badge>
                      <Badge className="bg-blue-50 text-[#004B87] border border-blue-200 text-[10px] font-bold">
                        {student.classLevel}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-500 font-medium flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        <span>{student.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                        <span>{student.phone}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>Joined: {student.joinedDate}</span>
                      </div>
                    </div>

                    {/* Active Batch */}
                    <div className="flex items-center gap-2 pt-1 text-xs text-gray-700">
                      <span className="font-bold text-gray-500">Current Cohort:</span>
                      <span className="font-semibold px-2.5 py-0.5 rounded-lg bg-gray-100 border border-gray-200 text-gray-800">
                        {student.batchName || "Not assigned"}
                      </span>
                    </div>

                    {/* Enrolled Courses Tags */}
                    <div className="pt-2 flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-gray-500">Enrolled Courses:</span>
                      {student.enrolledCourses && student.enrolledCourses.length > 0 ? (
                        student.enrolledCourses.map((c, idx) => (
                          <Badge
                            key={idx}
                            className="bg-[#004B87]/10 text-[#004B87] hover:bg-[#004B87]/20 border border-[#004B87]/20 text-[11px] font-bold py-0.5 px-2.5"
                          >
                            <GraduationCap className="w-3 h-3 mr-1 inline" />
                            {c}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-xs text-gray-400 italic">No courses assigned</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex sm:flex-row lg:flex-col items-center lg:items-end justify-between sm:justify-end gap-2 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                  <Button
                    onClick={() => handleOpenEnrollModal(student)}
                    className="bg-[#004B87] hover:bg-[#003866] text-white text-xs font-black rounded-xl h-9 px-4 shadow-xs flex items-center gap-1.5"
                  >
                    <GraduationCap className="w-4 h-4" />
                    Enroll Course & Batch
                  </Button>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => store.toggleStudentStatus(student.id)}
                      className="text-[11px] font-bold rounded-xl h-8 px-3"
                    >
                      {student.status === "Active" ? "Suspend" : "Activate"}
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteStudent(student.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 text-[11px] font-bold rounded-xl h-8 px-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* ENROLL COURSE MODAL */}
      <Dialog open={enrollModalOpen} onOpenChange={setEnrollModalOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-gray-900 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#004B87]" />
              Enroll Course to Student
            </DialogTitle>
          </DialogHeader>

          {selectedStudent && (
            <form onSubmit={handleConfirmEnroll} className="space-y-4 pt-2">
              {/* Selected Student Banner */}
              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-[#004B87]">
                    Student: {selectedStudent.name}
                  </span>
                  <Badge variant="outline" className="text-[10px] font-bold text-blue-700 bg-white">
                    {selectedStudent.id}
                  </Badge>
                </div>
                <div className="text-[11px] text-gray-500 mt-1">
                  {selectedStudent.email} • {selectedStudent.classLevel}
                </div>
              </div>

              {/* Course Selection */}
              <div>
                <Label className="text-xs font-bold text-gray-700">
                  Select Course to Assign *
                </Label>
                <Select value={enrollCourse} onValueChange={setEnrollCourse}>
                  <SelectTrigger className="mt-1 text-xs rounded-xl h-10">
                    <SelectValue placeholder="Choose course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.title} className="text-xs">
                        {course.title} ({course.category})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-[11px] text-gray-400 mt-1">
                  Enrolling the student grants immediate access to this course's live classes, tests, notes, and recorded lectures.
                </p>
              </div>

              {/* Batch Assignment */}
              <div>
                <Label className="text-xs font-bold text-gray-700">
                  Assign to Batch / Cohort *
                </Label>
                <Select value={enrollBatch} onValueChange={setEnrollBatch}>
                  <SelectTrigger className="mt-1 text-xs rounded-xl h-10">
                    <SelectValue placeholder="Choose batch" />
                  </SelectTrigger>
                  <SelectContent>
                    {batches.map((batch) => (
                      <SelectItem key={batch.id} value={batch.name} className="text-xs">
                        {batch.name} ({batch.timing})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEnrollModalOpen(false)}
                  className="text-xs rounded-xl h-10 px-4"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#004B87] hover:bg-[#003866] text-white text-xs font-extrabold rounded-xl h-10 px-5 shadow-sm"
                >
                  Confirm & Enroll Student
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* REGISTER NEW STUDENT MODAL */}
      <Dialog open={addStudentOpen} onOpenChange={setAddStudentOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-gray-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#004B87]" />
              Register New Student
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreateStudent} className="space-y-4 pt-2">
            <div>
              <Label className="text-xs font-bold text-gray-700">Full Name *</Label>
              <Input
                required
                placeholder="e.g. Aryan Sharma"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="mt-1 text-xs rounded-xl h-10"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-bold text-gray-700">Email Address *</Label>
                <Input
                  required
                  type="email"
                  placeholder="student@example.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="mt-1 text-xs rounded-xl h-10"
                />
              </div>
              <div>
                <Label className="text-xs font-bold text-gray-700">Phone Number</Label>
                <Input
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="+91 9876543210"
                  className="mt-1 text-xs rounded-xl h-10"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-bold text-gray-700">Academic Level</Label>
              <Select value={newClass} onValueChange={setNewClass}>
                <SelectTrigger className="mt-1 text-xs rounded-xl h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Class 8" className="text-xs">Class 8</SelectItem>
                  <SelectItem value="Class 9" className="text-xs">Class 9</SelectItem>
                  <SelectItem value="Class 10" className="text-xs">Class 10</SelectItem>
                  <SelectItem value="Class 11" className="text-xs">Class 11</SelectItem>
                  <SelectItem value="Class 12" className="text-xs">Class 12</SelectItem>
                  <SelectItem value="Dropper / Repeater" className="text-xs">Dropper / Repeater</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs font-bold text-gray-700">Initial Course</Label>
              <Select value={newCourse} onValueChange={setNewCourse}>
                <SelectTrigger className="mt-1 text-xs rounded-xl h-10">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((c) => (
                    <SelectItem key={c.id} value={c.title} className="text-xs">
                      {c.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs font-bold text-gray-700">Initial Batch</Label>
              <Select value={newBatch} onValueChange={setNewBatch}>
                <SelectTrigger className="mt-1 text-xs rounded-xl h-10">
                  <SelectValue placeholder="Select batch" />
                </SelectTrigger>
                <SelectContent>
                  {batches.map((b) => (
                    <SelectItem key={b.id} value={b.name} className="text-xs">
                      {b.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
              <Button
                type="button"
                variant="outline"
                onClick={() => setAddStudentOpen(false)}
                className="text-xs rounded-xl h-10 px-4"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#004B87] hover:bg-[#003866] text-white text-xs font-extrabold rounded-xl h-10 px-5 shadow-sm"
              >
                Register & Enroll
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
