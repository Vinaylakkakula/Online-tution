"use client";

import { useState } from "react";
import { useLMSData, LMSStore, ACTIVE_COUPONS } from "@/lib/lms-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  CheckCircle2,
  Tag,
  Gift,
  ArrowRight,
  ShieldCheck,
  Percent,
} from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const { cartoonCourses, coupons } = useLMSData();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountPercent: number;
    message: string;
  } | null>(null);
  const [couponError, setCouponError] = useState("");

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const res = LMSStore.applyCoupon(couponInput, 1000);
    if (res.valid) {
      setAppliedCoupon({
        code: couponInput.trim().toUpperCase(),
        discountPercent: res.discountPercent,
        message: res.message,
      });
      setCouponError("");
    } else {
      setCouponError("Invalid or expired coupon code. Try CARTOON50 or KIDS2026!");
      setAppliedCoupon(null);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponError("");
  };

  return (
    <div className="min-h-screen bg-[#F5F8FF] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Top Header */}
        <div className="text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-100/80 text-[#102C50] font-black text-xs border border-blue-200">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Pocket-Friendly Monthly & Annual Learning Passes</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#102C50] tracking-tight">
            Simple & Transparent Course Pricing 🏷️
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-medium">
            Tailored curriculum for Classes 6th to 10th with animated cartoon lessons, recorded videos, formula sheets, homework reviews, and live tests.
          </p>

          {/* Monthly vs Annual Toggle */}
          <div className="flex items-center justify-center pt-2">
            <div className="bg-white p-1.5 rounded-2xl flex items-center gap-1 border border-gray-200 shadow-xs">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  billingCycle === "monthly"
                    ? "bg-[#1769AA] text-white shadow-xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Monthly Plans (Pay-as-you-learn)
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`px-5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  billingCycle === "annual"
                    ? "bg-[#102C50] text-white shadow-xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <span>Annual Pass</span>
                <span className="bg-[#FFD447] text-slate-950 text-[10px] px-1.5 py-0.5 rounded-md font-extrabold">
                  Save 40%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Coupon Code Banner */}
        <Card className="p-5 rounded-3xl border-2 border-dashed border-amber-300 bg-amber-50/70 max-w-xl mx-auto shadow-xs">
          <form onSubmit={handleApplyCoupon} className="flex flex-col sm:flex-row items-center gap-2">
            <div className="relative flex-1 w-full">
              <Tag className="w-4 h-4 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <Input
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="Enter coupon (e.g. CARTOON50 or KIDS2026)"
                className="pl-10 h-10 text-xs rounded-xl bg-white border-amber-200 uppercase font-mono font-bold"
              />
            </div>
            <Button
              type="submit"
              className="w-full sm:w-auto bg-[#FFD447] hover:bg-amber-400 text-slate-950 font-black text-xs h-10 px-6 rounded-xl shadow-xs"
            >
              Apply Voucher
            </Button>
          </form>

          {appliedCoupon && (
            <div className="mt-3 flex items-center justify-between text-xs text-emerald-800 font-bold bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {appliedCoupon.message}
              </span>
              <button
                onClick={handleRemoveCoupon}
                className="text-red-500 hover:underline text-[11px]"
              >
                Remove
              </button>
            </div>
          )}

          {couponError && (
            <p className="mt-2 text-xs text-red-600 font-bold text-center">
              {couponError}
            </p>
          )}

          <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-gray-500 font-semibold">
            <span>Active Codes:</span>
            <span className="font-mono bg-white px-2 py-0.5 rounded border border-amber-200 text-amber-800 font-bold">
              CARTOON50 (50% OFF)
            </span>
            <span className="font-mono bg-white px-2 py-0.5 rounded border border-amber-200 text-amber-800 font-bold">
              KIDS2026 (30% OFF)
            </span>
          </div>
        </Card>

        {/* Pricing Cards Grid (Classes 6 to 10) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {cartoonCourses.map((crs) => {
            const rawPrice =
              billingCycle === "monthly" ? crs.monthlyPrice : crs.annualPrice;
            const originalPrice =
              billingCycle === "monthly" ? crs.originalPrice : Math.round(crs.annualPrice * 1.5);

            let finalPrice = rawPrice;
            if (appliedCoupon) {
              const discount = Math.round((rawPrice * appliedCoupon.discountPercent) / 100);
              finalPrice = Math.max(0, rawPrice - discount);
            }

            return (
              <Card
                key={crs.id}
                className="p-6 rounded-3xl border-2 border-blue-100 hover:border-[#1769AA]/50 bg-white hover:shadow-xl transition-all flex flex-col justify-between group transform hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Offer Ribbon */}
                <div className="absolute top-0 right-0 bg-[#FF914D] text-white text-[9px] font-black uppercase px-3 py-1 rounded-bl-xl shadow-xs">
                  {crs.discountPercent}% OFF
                </div>

                <div className="space-y-4">
                  {/* Mascot Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl shadow-2xs group-hover:scale-110 transition-transform">
                    {crs.mascot}
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-[#1769AA] bg-blue-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {crs.classLevel}
                    </span>
                    <h3 className="text-base font-black text-[#102C50] mt-1">
                      {crs.title}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium line-clamp-2 mt-1">
                      {crs.subtitle}
                    </p>
                  </div>

                  {/* Pricing Display */}
                  <div className="pt-2 border-t border-gray-100 space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-black text-[#102C50]">
                        ₹{finalPrice.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        ₹{originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[11px] font-bold text-emerald-600">
                      {billingCycle === "monthly" ? "Billed monthly • Cancel anytime" : "Billed once a year (Full access)"}
                    </p>
                  </div>

                  {/* Feature Bullets */}
                  <ul className="space-y-2 text-xs text-gray-600 font-semibold pt-2 border-t border-gray-100">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{crs.totalSubjects} Subjects Subfolders</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{crs.totalChapters} Full Chapters</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Recorded Lessons + Speed</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Formula Maps & CBT Quizzes</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-5 space-y-2">
                  <Link href={`/demo`} className="block">
                    <Button className="w-full bg-[#1769AA] hover:bg-[#102C50] text-white font-black text-xs h-10 rounded-xl shadow-xs gap-1.5 transition-colors">
                      <span>Enroll / Free Demo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>

                  <p className="text-[10px] text-gray-400 text-center font-medium">
                    Includes 7-day money back guarantee
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
