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
  CalendarDays,
  Plus,
  Users,
  Clock,
  Calendar,
  CheckCircle2,
  Trash2,
  Layers,
  GraduationCap,
} from "lucide-react";
import { useLMSData, LMSBatch } from "@/lib/lms-store";

export default function BatchesManagementPage() {
  const { batches, courses, store } = useLMSData();
  const [modalOpen, setModalOpen] = useState(false);
  const [batchName, setBatchName] = useState("");
  const [courseTitle, setCourseTitle] = useState(
    courses[0]?.title || "IIT-JEE Comprehensive Mastery 2026-27"
  );
  const [timing, setTiming] = useState("7:00 AM – 10:00 AM IST");
  const [startDate, setStartDate] = useState("Nov 20, 2026");
  const [days, setDays] = useState("Mon, Wed, Fri");
  const [faculty, setFaculty] = useState("Dr. Rahul Sharma");
  const [capacity, setCapacity] = useState("150");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!batchName.trim()) return;

    const newBatch: LMSBatch = {
      id: `b-${Date.now()}`,
      name: batchName.trim(),
      courseTitle: courseTitle || (courses[0]?.title ?? "General Batch"),
      timing,
      startDate,
      days,
      faculty,
      maxStudents: Number(capacity) || 100,
      currentEnrolled: 0,
      status: "filling",
    };

    store.addBatch(newBatch);
    setModalOpen(false);
    setBatchName("");
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this batch?")) {
      store.deleteBatch(id);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-[#004B87] text-white text-[10px] font-bold">
              Academic Engine
            </Badge>
            <span className="text-xs text-gray-500 font-semibold">
              Live Synchronized Store
            </span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Batches & Academic Cohorts
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            Create and manage student batches tied to courses. Changes persist across the platform.
          </p>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          className="bg-[#004B87] hover:bg-[#003866] text-white font-extrabold text-xs h-10 px-5 rounded-xl shadow-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          Create New Batch
        </Button>
      </div>

      {/* Batch Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {batches.map((batch) => {
          const fillPercentage = Math.round(
            (batch.currentEnrolled / (batch.maxStudents || 1)) * 100
          );

          return (
            <Card
              key={batch.id}
              className="rounded-2xl border-gray-200/90 shadow-2xs hover:shadow-md transition-shadow bg-white flex flex-col justify-between overflow-hidden"
            >
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-bold ${
                        batch.status === "active"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : batch.status === "filling"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-gray-50 text-gray-700 border-gray-200"
                      }`}
                    >
                      {batch.status === "active"
                        ? "Active Cohort"
                        : batch.status === "filling"
                        ? "Admissions Filling Fast"
                        : "Completed"}
                    </Badge>
                    <h3 className="font-extrabold text-base text-gray-900 leading-snug">
                      {batch.name}
                    </h3>
                  </div>

                  <button
                    onClick={() => handleDelete(batch.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Batch"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Course Linkage */}
                <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center gap-2.5">
                  <GraduationCap className="w-4 h-4 text-[#004B87] shrink-0" />
                  <span className="text-xs font-bold text-[#004B87] truncate">
                    {batch.courseTitle}
                  </span>
                </div>

                {/* Batch Details */}
                <div className="space-y-2 text-xs text-gray-600 font-medium">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>{batch.timing}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>
                      Starts {batch.startDate} • {batch.days}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>Faculty: {batch.faculty}</span>
                  </div>
                </div>

                {/* Capacity Progress Bar */}
                <div className="pt-2 border-t border-gray-100 space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold text-gray-700">
                    <span>Enrolled: {batch.currentEnrolled}</span>
                    <span>Max: {batch.maxStudents} seats</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        fillPercentage >= 90
                          ? "bg-red-500"
                          : fillPercentage >= 70
                          ? "bg-amber-500"
                          : "bg-[#004B87]"
                      }`}
                      style={{ width: `${Math.min(fillPercentage, 100)}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Create Batch Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-gray-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#004B87]" />
              Create Academic Batch
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreate} className="space-y-4 pt-2">
            <div>
              <Label className="text-xs font-bold text-gray-700">Batch Name *</Label>
              <Input
                required
                placeholder="e.g. Pratham Batch (Morning)"
                value={batchName}
                onChange={(e) => setBatchName(e.target.value)}
                className="mt-1 text-xs rounded-xl h-10"
              />
            </div>

            <div>
              <Label className="text-xs font-bold text-gray-700">Tied to Course *</Label>
              <Select value={courseTitle} onValueChange={setCourseTitle}>
                <SelectTrigger className="mt-1 text-xs rounded-xl h-10">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((c) => (
                    <SelectItem key={c.id} value={c.title} className="text-xs font-medium">
                      {c.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-bold text-gray-700">Timing *</Label>
                <Input
                  required
                  value={timing}
                  onChange={(e) => setTiming(e.target.value)}
                  placeholder="e.g. 7:00 AM - 10:00 AM IST"
                  className="mt-1 text-xs rounded-xl h-10"
                />
              </div>
              <div>
                <Label className="text-xs font-bold text-gray-700">Days *</Label>
                <Input
                  required
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  placeholder="e.g. Mon, Wed, Fri"
                  className="mt-1 text-xs rounded-xl h-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-bold text-gray-700">Start Date</Label>
                <Input
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="e.g. Nov 20, 2026"
                  className="mt-1 text-xs rounded-xl h-10"
                />
              </div>
              <div>
                <Label className="text-xs font-bold text-gray-700">Capacity (Seats)</Label>
                <Input
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  placeholder="150"
                  className="mt-1 text-xs rounded-xl h-10"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-bold text-gray-700">Primary Faculty</Label>
              <Input
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                placeholder="e.g. Dr. Rahul Sharma"
                className="mt-1 text-xs rounded-xl h-10"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
              <Button
                type="button"
                variant="outline"
                onClick={() => setModalOpen(false)}
                className="text-xs rounded-xl h-10 px-4"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#004B87] hover:bg-[#003866] text-white text-xs font-extrabold rounded-xl h-10 px-5 shadow-sm"
              >
                Save & Publish Batch
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
