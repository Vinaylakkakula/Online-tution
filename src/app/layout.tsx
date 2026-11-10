import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/auth-context";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DeepSiddhi Foundation | Learn Today. Lead Tomorrow.",
    template: "%s | DeepSiddhi Foundation",
  },
  description:
    "DeepSiddhi Foundation offers expert-led preparation for IIT-JEE, Olympiad, NTSE, and Foundation courses. Join thousands of successful students on their journey to academic excellence.",
  keywords: [
    "IIT-JEE preparation",
    "Olympiad coaching",
    "NTSE preparation",
    "Foundation courses",
    "Online learning",
    "DeepSiddhi Foundation",
    "competitive exam coaching",
  ],
  authors: [{ name: "DeepSiddhi Foundation" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "DeepSiddhi Foundation",
    title: "DeepSiddhi Foundation | Learn Today. Lead Tomorrow.",
    description:
      "Expert-led preparation for IIT-JEE, Olympiad, NTSE, and Foundation courses.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-white text-[#243247]">
        <AuthProvider>
          <TooltipProvider delayDuration={200}>
            {children}
            <Toaster position="top-right" />
          </TooltipProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
