"use client";

import { useState } from "react";
import { useLMSData, LMSStore, AcademicHoliday } from "@/lib/lms-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CalendarDays,
  AlertTriangle,
  Plus,
  Trash2,
  Clock,
  Sparkles,
  Megaphone,
} from "lucide-react";

export default function AdminCalendarPage() {
  const { holidays, emergencyAlert, refreshAll } = useLMSData();

  // Add Holiday Form
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState<AcademicHoliday["type"]>("Festival");
  const [description, setDescription] = useState("");

  // Emergency Holiday Broadcast Form
  const [emergencyTitle, setEmergencyTitle] = useState("Severe Weather Alert — Online Classes Only");
  const [emergencyDate, setEmergencyDate] = useState("Today");
  const [emergencyMessage, setEmergencyMessage] = useState(
    "Due to severe rainfall and government safety advisories, all offline learning centers are closed. All live video classes & doubt support are active online on our student portal!"
  );

  const [message, setMessage] = useState("");

  const handleAddHoliday = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date.trim()) return;

    LMSStore.addHoliday({
      id: `hol-${Date.now()}`,
      title: title.trim(),
      date: date.trim(),
      type,
      description: description.trim() || `${type} holiday scheduled on academic calendar.`,
    });

    setMessage(`Holiday "${title}" added to academic calendar!`);
    setTitle("");
    setDate("");
    setDescription("");
    refreshAll();
    setTimeout(() => setMessage(""), 3000);
  };

  const handleDeleteHoliday = (id: string) => {
    LMSStore.deleteHoliday(id);
    refreshAll();
  };

  const handleBroadcastEmergency = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emergencyTitle.trim() || !emergencyMessage.trim()) return;

    LMSStore.declareEmergencyHoliday(emergencyTitle, emergencyDate, emergencyMessage);
    setMessage("🚨 EMERGENCY HOLIDAY BROADCAST DECLARED & SENT TO ALL STUDENTS!");
    refreshAll();
    setTimeout(() => setMessage(""), 4000);
  };

  const handleDismissEmergency = () => {
    LMSStore.dismissEmergencyAlert();
    refreshAll();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-200/90 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-red-100 text-red-900 text-xs font-black">
              Academic Operations
            </span>
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Emergency Notification Broadcast
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Academic Calendar & Emergency Holidays 🗓️
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-2xl font-medium">
            Schedule academic vacations, exam dates, government holidays, and broadcast instant emergency holiday notices across all student portals.
          </p>
        </div>
      </div>

      {message && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 animate-slide-down">
          {message}
        </div>
      )}

      {/* Emergency Holiday Announcer Card (Requirement 9: "Admin can declare emergency holidays instantly... clearly highlighted") */}
      <Card className="p-6 rounded-3xl border-2 border-red-300 bg-red-50/40 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚨</span>
            <div>
              <h3 className="text-base font-black text-red-950">
                Instant Emergency Holiday Broadcast
              </h3>
              <p className="text-xs text-red-800/80 font-medium">
                Declaring an emergency holiday flashes a high-visibility urgent banner on all student dashboards!
              </p>
            </div>
          </div>

          {emergencyAlert && emergencyAlert.isActive && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleDismissEmergency}
              className="text-xs font-bold border-red-300 text-red-700 hover:bg-red-100 rounded-xl"
            >
              Dismiss Current Alert
            </Button>
          )}
        </div>

        <form onSubmit={handleBroadcastEmergency} className="space-y-3 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1 sm:col-span-2">
              <Label className="text-xs font-black text-red-950">Emergency Title *</Label>
              <Input
                required
                value={emergencyTitle}
                onChange={(e) => setEmergencyTitle(e.target.value)}
                className="rounded-xl text-xs h-10 bg-white border-red-200"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-black text-red-950">Date / Effective</Label>
              <Input
                value={emergencyDate}
                onChange={(e) => setEmergencyDate(e.target.value)}
                className="rounded-xl text-xs h-10 bg-white border-red-200"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-black text-red-950">Urgent Message & Instructions *</Label>
            <Textarea
              required
              value={emergencyMessage}
              onChange={(e) => setEmergencyMessage(e.target.value)}
              className="rounded-xl text-xs bg-white border-red-200 min-h-[70px]"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xs h-10 rounded-xl shadow-md gap-2"
          >
            <Megaphone className="w-4 h-4" />
            <span>Broadcast Emergency Holiday to All Students</span>
          </Button>
        </form>
      </Card>

      {/* Regular Calendar Management Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Add Holiday Form */}
        <Card className="lg:col-span-5 p-6 rounded-3xl border border-gray-200 bg-white shadow-xs space-y-4">
          <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
            <Plus className="w-4 h-4 text-indigo-600" />
            <span>Schedule Academic Holiday / Event</span>
          </h3>

          <form onSubmit={handleAddHoliday} className="space-y-3.5">
            <div className="space-y-1">
              <Label className="text-xs font-black text-gray-700">Holiday Title *</Label>
              <Input
                required
                placeholder="e.g. Winter Break / Science Mock Exam"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="rounded-xl text-xs h-10"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs font-black text-gray-700">Date Range *</Label>
                <Input
                  required
                  placeholder="e.g. Dec 25 – Jan 01"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="rounded-xl text-xs h-10"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-black text-gray-700">Holiday Type</Label>
                <Select value={type} onValueChange={(val: any) => setType(val)}>
                  <SelectTrigger className="rounded-xl text-xs h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Festival">Festival Break</SelectItem>
                    <SelectItem value="Government">Government Holiday</SelectItem>
                    <SelectItem value="Exam Day">Exam / CBT Date</SelectItem>
                    <SelectItem value="Special Class">Special Sunday Session</SelectItem>
                    <SelectItem value="Regular">Regular Holiday</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-black text-gray-700">Description</Label>
              <Textarea
                placeholder="Details for students..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-xl text-xs min-h-[70px]"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#004B87] hover:bg-[#003866] text-white font-black text-xs h-10 rounded-xl"
            >
              Add to Academic Calendar
            </Button>
          </form>
        </Card>

        {/* Existing Holidays List */}
        <div className="lg:col-span-7 space-y-3">
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider">
            Scheduled Holidays ({holidays.length})
          </h3>

          <div className="space-y-2.5">
            {holidays.map((h) => (
              <Card
                key={h.id}
                className="p-4 rounded-2xl border border-gray-200 bg-white shadow-xs flex items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] font-bold">
                      {h.type}
                    </Badge>
                    <span className="text-xs text-gray-500 font-semibold">{h.date}</span>
                  </div>
                  <h4 className="text-sm font-black text-gray-900">{h.title}</h4>
                  <p className="text-xs text-gray-500 line-clamp-1">{h.description}</p>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteHoliday(h.id)}
                  className="text-gray-400 hover:text-red-500 p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
