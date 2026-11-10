"use client";

import { useState } from "react";
import { StudentSidebar } from "@/components/layout/student-sidebar";
import { StudentHeader } from "@/components/layout/student-header";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F4F6FA] text-gray-900">
      <StudentSidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="lg:pl-28 flex flex-col min-h-screen">
        <StudentHeader onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-[1400px] w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Oliveboard-Style Floating Doubt / Support Button (bottom-right) */}
      <Link
        href="/dashboard/community"
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#16A6A1] hover:bg-[#128f8b] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform group"
        title="Ask Doubts & Community"
      >
        <MessageCircle className="w-6 h-6 group-hover:rotate-6 transition-transform" />
        <span className="sr-only">Ask Doubt</span>
      </Link>
    </div>
  );
}
