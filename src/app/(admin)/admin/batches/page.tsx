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
  CalendarDays,
  Plus,
  Users,
  Clock,
  Calendar,
  CheckCircle2,
  Trash2,
} from "lucide-react";

interface BatchItem {
  id: string;
  name: string;
  courseTitle: string;
  timing: string;
  startDate: string;
  maxStudents: number;
  currentEnrolled: number;
  status: "active" | "filling" | "completed";
}

const initialBatches: BatchItem[] = [
  {
    id: "b-1",
    name: "Pratham Batch (Morning)",
    courseTitle: "IIT-JEE Comprehensive Mastery 2026-27",
    timing: "7:00 AM - 10:00 AM IST",
    startDate: "Nov 15, 2026",
    maxStudents: 150,
    currentEnrolled: 136,
    status: "filling",
  },
  {
    id: "b-2",
    name: "Sankalp Batch (Evening)",
    courseTitle: "IIT-JEE Crash Course 2026",
    timing: "5:00 PM - 8:00 PM IST",
    startDate: "Dec 01, 2026",
    maxStudents: 150,
    currentEnrolled: 122,
    status: "active",
  },
  {
    id: "b-3",
    name: "Aryabhata Olympiad Batch",
    courseTitle: "Physics Olympiad Advanced Sprint",
    timing: "6:00 PM - 8:00 PM IST (Mon, Wed, Fri)",
    startDate: "Nov 10, 2026",
    maxStudents: 75,
    currentEnrolled: 64,
    status: "filling",
  },
  {
    id: "b-4",
    name: "Vidyarthi Foundation Batch",
    courseTitle: "NTSE & Aptitude Mastery",
    timing: "4:00 PM - 5:30 PM IST (Tue, Thu, Sat)",
    startDate: "Oct 20, 2026",
    maxStudents: 100,
    currentEnrolled: 98,
    status: "active",
  },
];

export default function BatchesManagementPage() {
  const [batches, setBatches] = useState<BatchItem[]>(initialBatches);
  const [modalOpen, setModalOpen] = useState(false);
  const [batchName, setBatchName] = useState("");
  const [courseTitle, setCourseTitle] = useState("IIT-JEE Comprehensive Mastery");
  const [timing, setTiming] = useState("7:00 AM - 10:00 AM IST");
  const [startDate, setStartDate] = useState("Dec 15, 2026");
  const [capacity, setCapacity] = useState("150");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!batchName) return;

    const newBatch: BatchItem = {
      id: `b-${Date.now()}`,
      name: batchName,
      courseTitle,
      timing,
      startDate,
      maxStudents: Number(capacity),
      currentEnrolled: 0,
      status: "filling",
    };

    setBatches([...batches, newBatch]);
    setModalOpen(false);
    setBatchName("");
  };

  const deleteBatch = (id: string) => {
    setBatches(batches.filter((b) => b.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#163B65]">Academic Batches Management</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Group enrolled students into specific morning, evening, and weekend live instruction cohorts.
          </p>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          className="bg-[#163B65] hover:bg-[#122e50] text-white text-xs font-semibold rounded-xl h-10 px-4 gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Create New Batch
        </Button>
      </div>

      {/* Batches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {batches.map((batch) => (
          <Card key={batch.id} className="rounded-3xl border-gray-100 shadow-md bg-white p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Badge className="bg-[#163B65] text-white text-[10px]">
                {batch.status === "filling" ? "Filling Fast" : "Active Cohort"}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteBatch(batch.id)}
                className="text-red-500 hover:text-red-700 h-8 w-8 p-0 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div>
              <h3 className="text-base font-bold text-gray-900">{batch.name}</h3>
              <p className="text-xs text-teal-700 font-medium mt-0.5">{batch.courseTitle}</p>
            </div>

            <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 space-y-1 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                <span>{batch.timing}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-teal-600" />
                <span>Starts on {batch.startDate}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center text-xs">
              <span className="text-gray-500">Seat Occupancy:</span>
              <span className="font-bold text-gray-800">
                {batch.currentEnrolled} / {batch.maxStudents} Students ({Math.round((batch.currentEnrolled / batch.maxStudents) * 100)}%)
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Dialog */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[480px] p-6 rounded-3xl bg-white border-0 shadow-2xl space-y-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-[#163B65]">
              Create New Academic Batch
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreate} className="space-y-4 text-xs">
            <div>
              <Label className="text-xs font-semibold text-gray-700">Batch Name *</Label>
              <Input
                required
                value={batchName}
                onChange={(e) => setBatchName(e.target.value)}
                placeholder="e.g. Achievers Weekend Batch"
                className="mt-1 h-10 border-gray-200"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold text-gray-700">Associated Course *</Label>
              <Input
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                className="mt-1 h-10 border-gray-200"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-semibold text-gray-700">Timing *</Label>
                <Input
                  value={timing}
                  onChange={(e) => setTiming(e.target.value)}
                  placeholder="e.g. 5:00 PM - 8:00 PM"
                  className="mt-1 h-10 border-gray-200"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold text-gray-700">Max Capacity *</Label>
                <Input
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="mt-1 h-10 border-gray-200"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="bg-[#163B65] text-white rounded-xl">
                Create Batch
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
