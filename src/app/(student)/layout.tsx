"use client";

import { useState } from "react";
import { StudentSidebar } from "@/components/layout/student-sidebar";
import { StudentHeader } from "@/components/layout/student-header";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F4F6FA] text-gray-900 flex flex-col">
      {/* Slide-out Sidebar for Desktop & Mobile Drawer */}
      <StudentSidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area */}
      <div className="lg:pl-28 flex flex-col min-h-screen flex-1">
        <StudentHeader onMenuClick={() => setMobileOpen(true)} />

        <main className="flex-1 p-3.5 sm:p-5 lg:p-7 max-w-[1400px] w-full mx-auto pb-24 lg:pb-10">
          {children}
        </main>
      </div>

      {/* Mobile-Only Bottom Navigation Bar (Phones & Small Tablets) */}
      <MobileBottomNav />

      {/* Floating Doubt / Community Chat Button (Elevated on mobile above bottom nav) */}
      <Link
        href="/dashboard/community"
        className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#16A6A1] hover:bg-[#128f8b] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all group"
        title="Ask Doubts & Community"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-6 transition-transform" />
        <span className="sr-only">Ask Doubt</span>
      </Link>
    </div>
  );
}
