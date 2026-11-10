"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  GraduationCap,
  Plus,
  Mail,
  Phone,
  BookOpen,
  Award,
  Trash2,
  Calendar,
} from "lucide-react";

interface FacultyItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  qualifications: string;
  experience: string;
  assignedBatches: string[];
}

const mockFaculty: FacultyItem[] = [
  {
    id: "fac-1",
    name: "Dr. Rahul Sharma",
    email: "rahul.sharma@deepsiddhi.org",
    phone: "+91 9811122233",
    subject: "Physics",
    qualifications: "Ph.D. Applied Physics (IIT Bombay)",
    experience: "16+ Years",
    assignedBatches: ["Pratham Batch", "Aryabhata Olympiad"],
  },
  {
    id: "fac-2",
    name: "Prof. Priya Saxena",
    email: "priya.saxena@deepsiddhi.org",
    phone: "+91 9822233344",
    subject: "Chemistry",
    qualifications: "M.Tech Chemical Sciences (IIT Delhi)",
    experience: "12+ Years",
    assignedBatches: ["Pratham Batch", "Sankalp Evening"],
  },
  {
    id: "fac-3",
    name: "Er. Amit Verma",
    email: "amit.verma@deepsiddhi.org",
    phone: "+91 9833344455",
    subject: "Mathematics",
    qualifications: "B.Tech Computer Science (IIT Kanpur)",
    experience: "14+ Years",
    assignedBatches: ["Pratham Batch", "Aryabhata Olympiad"],
  },
  {
    id: "fac-4",
    name: "Dr. Sunita Kulkarni",
    email: "sunita.k@deepsiddhi.org",
    phone: "+91 9844455566",
    subject: "Biology & Olympiads",
    qualifications: "Ph.D. Molecular Genetics (AIIMS New Delhi)",
    experience: "11+ Years",
    assignedBatches: ["Olympiad Elite Batch"],
  },
  {
    id: "fac-5",
    name: "Er. Vivek Rathore",
    email: "vivek.rathore@deepsiddhi.org",
    phone: "+91 9855566677",
    subject: "Mental Ability & NTSE",
    qualifications: "M.Sc Mathematics, NTSE Scholar",
    experience: "9+ Years",
    assignedBatches: ["Vidyarthi Foundation Batch"],
  },
];

export default function FacultyManagementPage() {
  const [facultyList, setFacultyList] = useState<FacultyItem[]>(mockFaculty);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Physics");
  const [qualifications, setQualifications] = useState("");
  const [experience, setExperience] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const newFaculty: FacultyItem = {
      id: `fac-${Date.now()}`,
      name,
      email,
      phone,
      subject,
      qualifications,
      experience: `${experience} Years`,
      assignedBatches: ["Pratham Batch"],
    };

    setFacultyList([...facultyList, newFaculty]);
    setModalOpen(false);
    setName("");
    setEmail("");
    setPhone("");
    setQualifications("");
    setExperience("");
  };

  const deleteFaculty = (id: string) => {
    setFacultyList(facultyList.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#163B65]">Faculty Directory & Assignments</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage master educators, assign subject streams and batches, and schedule live lecture webinars.
          </p>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          className="bg-[#163B65] hover:bg-[#122e50] text-white text-xs font-semibold rounded-xl h-10 px-4 gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Faculty Member
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facultyList.map((fac) => (
          <Card key={fac.id} className="rounded-3xl border-gray-100 shadow-md bg-white p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge className="bg-[#163B65] text-white text-[10px]">
                  {fac.subject} Specialist
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteFaculty(fac.id)}
                  className="text-red-500 hover:text-red-700 h-8 w-8 p-0 rounded-lg"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#163B65] to-[#16A6A1] text-white font-bold flex items-center justify-center text-sm shadow-md">
                  {fac.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900">{fac.name}</h3>
                  <span className="text-[11px] text-gray-400">{fac.experience} Experience</span>
                </div>
              </div>

              <p className="text-xs text-gray-600 font-medium">
                {fac.qualifications}
              </p>

              <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 space-y-1 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#16A6A1]" />
                  <span>{fac.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#16A6A1]" />
                  <span>{fac.phone}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100">
              <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
                Active Cohorts:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {fac.assignedBatches.map((b, bIdx) => (
                  <span key={bIdx} className="text-[10px] bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded-md font-semibold">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Dialog */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[480px] p-6 rounded-3xl bg-white border-0 shadow-2xl space-y-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-[#163B65]">
              Onboard Master Faculty
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreate} className="space-y-4 text-xs">
            <div>
              <Label className="text-xs font-semibold text-gray-700">Full Name *</Label>
              <Input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Dr. K.S. Verma"
                className="mt-1 h-10 border-gray-200"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-semibold text-gray-700">Email *</Label>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="faculty@deepsiddhi.org"
                  className="mt-1 h-10 border-gray-200"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold text-gray-700">Phone</Label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98..."
                  className="mt-1 h-10 border-gray-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-semibold text-gray-700">Subject Stream *</Label>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Physics"
                  className="mt-1 h-10 border-gray-200"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold text-gray-700">Experience (Years) *</Label>
                <Input
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="10"
                  className="mt-1 h-10 border-gray-200"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold text-gray-700">Qualifications *</Label>
              <Input
                value={qualifications}
                onChange={(e) => setQualifications(e.target.value)}
                placeholder="e.g. Ph.D. Applied Physics (IIT Bombay)"
                className="mt-1 h-10 border-gray-200"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="bg-[#163B65] text-white rounded-xl">
                Save Faculty
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
