"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Radio,
  FileCheck2,
  FileText,
  AlertCircle,
  CheckCircle2,
  Trash2,
} from "lucide-react";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "class" | "test" | "material" | "announcement";
  timeAgo: string;
  isRead: boolean;
}

const initialNotifications: NotificationItem[] = [
  {
    id: "n-1",
    title: "Physics Live Webinar Starting in 2 Hours",
    message: "Dr. Rahul Sharma will be taking an advanced numerical drill on Magnetism & Biot-Savart Law at 5:00 PM IST.",
    type: "class",
    timeAgo: "2 hours ago",
    isRead: false,
  },
  {
    id: "n-2",
    title: "All India JEE Mock Test #08 Published",
    message: "Your scheduled 3-hour full syllabus simulation exam is now active in the Tests portal. Total Marks: 300.",
    type: "test",
    timeAgo: "5 hours ago",
    isRead: false,
  },
  {
    id: "n-3",
    title: "New Study Material Uploaded: Chemistry Reaction Map",
    message: "Prof. Priya Saxena has uploaded the 45-Conversion Organic Chemistry Quick Summary Chart.",
    type: "material",
    timeAgo: "Yesterday",
    isRead: false,
  },
  {
    id: "n-4",
    title: "Special Doubt Clearing Schedule for Weekend",
    message: "Mathematics mentor Er. Amit Verma will host an exclusive 2-hour doubt clearing session on Saturday at 4 PM.",
    type: "announcement",
    timeAgo: "2 days ago",
    isRead: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#163B65]">In-App Notifications</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Real-time alerts for live lecture countdowns, new study materials, test results, and batch announcements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
            className="text-xs rounded-xl border-gray-200"
          >
            Mark All as Read
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl"
          >
            Clear
          </Button>
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <Card className="rounded-3xl border-gray-100 p-12 text-center text-gray-400">
            <Bell className="w-10 h-10 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No new notifications. You are all caught up!</p>
          </Card>
        ) : (
          notifications.map((item) => (
            <Card
              key={item.id}
              className={`rounded-2xl border transition-all p-5 ${
                !item.isRead
                  ? "bg-white border-teal-200 shadow-sm ring-1 ring-teal-200/50"
                  : "bg-gray-50/60 border-gray-100"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                    item.type === "class"
                      ? "bg-red-100 text-red-600"
                      : item.type === "test"
                      ? "bg-purple-100 text-purple-600"
                      : item.type === "material"
                      ? "bg-teal-100 text-teal-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {item.type === "class" && <Radio className="w-5 h-5" />}
                  {item.type === "test" && <FileCheck2 className="w-5 h-5" />}
                  {item.type === "material" && <FileText className="w-5 h-5" />}
                  {item.type === "announcement" && <AlertCircle className="w-5 h-5" />}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                    <span className="text-[11px] text-gray-400">{item.timeAgo}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.message}</p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
