"use client";

import { useState } from "react";
import { useLMSData, LMSStore, CouponCode } from "@/lib/lms-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Percent,
  Plus,
  Trash2,
  Tag,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  CreditCard,
  Sparkles,
} from "lucide-react";

export default function AdminPricingPage() {
  const { cartoonCourses, coupons, refreshAll } = useLMSData();

  // New Coupon Form
  const [newCode, setNewCode] = useState("");
  const [newDiscount, setNewDiscount] = useState("30");
  const [newDesc, setNewDesc] = useState("");
  const [newValid, setNewValid] = useState("Dec 31, 2026");
  const [message, setMessage] = useState("");

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;

    LMSStore.addCoupon({
      code: newCode.trim().toUpperCase(),
      discountPercent: Number(newDiscount) || 30,
      description: newDesc.trim() || `${newDiscount}% discount for enrolled students`,
      validUntil: newValid || "Ongoing",
    });

    setMessage(`Coupon ${newCode.toUpperCase()} added successfully!`);
    setNewCode("");
    setNewDesc("");
    refreshAll();
    setTimeout(() => setMessage(""), 3000);
  };

  const handleUpdateCoursePrice = (courseId: string, newPrice: number) => {
    const updated = cartoonCourses.map((c) =>
      c.id === courseId ? { ...c, monthlyPrice: newPrice } : c
    );
    LMSStore.saveCartoonCourses(updated);
    setMessage("Monthly course price updated!");
    refreshAll();
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-200/90 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black">
              Revenue & Subscriptions
            </span>
            <span className="text-xs text-indigo-600 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              Dynamic Discount Engine Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Monthly Course Pricing & Coupons 🏷️
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-2xl font-medium">
            Configure monthly pricing per grade (Class 6th to 10th), manage promotional coupon codes, and calculate discount margins.
          </p>
        </div>
      </div>

      {message && (
        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 animate-slide-down">
          ✓ {message}
        </div>
      )}

      {/* Grade-wise Monthly Pricing Settings */}
      <Card className="p-6 rounded-3xl border border-gray-200 bg-white shadow-xs space-y-4">
        <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
          <span>🏷️</span>
          <span>Classes 6th to 10th Monthly Price Matrix</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {cartoonCourses.map((crs) => (
            <div
              key={crs.id}
              className="p-4 rounded-2xl border-2 border-indigo-100 bg-indigo-50/20 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-indigo-700">
                  {crs.classLevel}
                </span>
                <span className="text-xl">{crs.mascot}</span>
              </div>

              <div>
                <Label className="text-[11px] font-bold text-gray-600">Monthly Fee (₹)</Label>
                <Input
                  type="number"
                  defaultValue={crs.monthlyPrice}
                  onBlur={(e) =>
                    handleUpdateCoursePrice(crs.id, Number(e.target.value) || crs.monthlyPrice)
                  }
                  className="rounded-xl text-xs h-9 font-black bg-white border-gray-300 mt-1"
                />
              </div>

              <div className="flex justify-between items-center text-[11px] text-gray-500 font-medium">
                <span>Annual Pass:</span>
                <span className="font-bold text-gray-900">₹{crs.annualPrice}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Coupon Codes & Promotions Manager */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Create Coupon Card */}
        <Card className="lg:col-span-5 p-6 rounded-3xl border border-gray-200 bg-white shadow-xs space-y-4">
          <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
            <Plus className="w-4 h-4 text-emerald-600" />
            <span>Create New Discount Coupon</span>
          </h3>

          <form onSubmit={handleAddCoupon} className="space-y-3.5">
            <div className="space-y-1">
              <Label className="text-xs font-black text-gray-700">Coupon Voucher Code *</Label>
              <Input
                required
                placeholder="e.g. FESTIVAL40"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                className="rounded-xl text-xs h-10 uppercase font-mono font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs font-black text-gray-700">Discount % *</Label>
                <Input
                  type="number"
                  required
                  min="5"
                  max="90"
                  value={newDiscount}
                  onChange={(e) => setNewDiscount(e.target.value)}
                  className="rounded-xl text-xs h-10 font-bold"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-black text-gray-700">Valid Until</Label>
                <Input
                  value={newValid}
                  onChange={(e) => setNewValid(e.target.value)}
                  placeholder="e.g. Dec 31, 2026"
                  className="rounded-xl text-xs h-10"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-black text-gray-700">Description / Offer Title</Label>
              <Input
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="e.g. 40% off on winter subscriptions"
                className="rounded-xl text-xs h-10"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#004B87] hover:bg-[#003866] text-white font-black text-xs h-10 rounded-xl shadow-xs"
            >
              Add Active Coupon
            </Button>
          </form>
        </Card>

        {/* Active Coupons List */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider">
            Active Discount Coupons ({coupons.length})
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {coupons.map((c, idx) => (
              <Card
                key={idx}
                className="p-4 rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/40 space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-black text-sm text-gray-900 bg-white px-2 py-0.5 rounded-md border border-amber-200">
                      {c.code}
                    </span>
                    <Badge className="bg-rose-500 text-white font-black text-[10px]">
                      {c.discountPercent}% OFF
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 font-medium mt-1">
                    {c.description}
                  </p>
                </div>

                <div className="flex justify-between items-center text-[10px] text-gray-400 pt-2 border-t border-amber-200/50">
                  <span>Validity: {c.validUntil}</span>
                  <span className="text-emerald-700 font-bold">Active in Checkout</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
