import Link from "next/link";
import { GraduationCap, ArrowLeft } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F6F8FC] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Top Bar with Logo & Return Link */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[#163B65] font-bold text-lg hover:opacity-90"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#163B65] to-[#16A6A1] flex items-center justify-center text-white shadow-md">
            <GraduationCap className="w-6 h-6" />
          </div>
          <span className="hidden sm:inline">DeepSiddhi Foundation</span>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#163B65] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Website
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md mt-10">
        {children}
      </div>

      <div className="mt-8 text-center text-xs text-gray-400">
        © 2026 DeepSiddhi Foundation. All rights reserved. Secure Portal.
      </div>
    </div>
  );
}
