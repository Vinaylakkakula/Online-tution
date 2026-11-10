"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CreditCard,
  Download,
  Search,
  CheckCircle2,
  Clock,
  RotateCcw,
  Receipt,
} from "lucide-react";

interface PaymentTx {
  id: string;
  studentName: string;
  courseTitle: string;
  amount: number;
  method: string;
  date: string;
  status: "completed" | "refunded" | "pending";
}

const mockPayments: PaymentTx[] = [
  {
    id: "TXN-98401",
    studentName: "Aryan Sharma",
    courseTitle: "IIT-JEE Comprehensive Mastery 2026-27",
    amount: 34999,
    method: "UPI (Google Pay)",
    date: "Nov 01, 2026",
    status: "completed",
  },
  {
    id: "TXN-98402",
    studentName: "Siddharth Verma",
    courseTitle: "IIT-JEE Comprehensive Mastery 2026-27",
    amount: 34999,
    method: "Credit Card (HDFC)",
    date: "Oct 25, 2026",
    status: "completed",
  },
  {
    id: "TXN-98403",
    studentName: "Ananya Deshmukh",
    courseTitle: "Physics Olympiad Advanced Sprint",
    amount: 18999,
    method: "Net Banking",
    date: "Oct 20, 2026",
    status: "completed",
  },
  {
    id: "TXN-98404",
    studentName: "Rohan Kulkarni",
    courseTitle: "IIT-JEE Crash Course 2026",
    amount: 14999,
    method: "UPI (PhonePe)",
    date: "Oct 15, 2026",
    status: "completed",
  },
  {
    id: "TXN-98405",
    studentName: "Vikram Malhotra",
    courseTitle: "Foundation Prep Class 9",
    amount: 11999,
    method: "Debit Card",
    date: "Oct 12, 2026",
    status: "refunded",
  },
];

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<PaymentTx[]>(mockPayments);
  const [search, setSearch] = useState("");

  const filtered = payments.filter(
    (p) =>
      p.studentName.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.courseTitle.toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = payments
    .filter((p) => p.status === "completed")
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#163B65]">Payments & Revenue Reconciliation</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Student fee transactions, gateway responses, tax invoices, and refund processing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="text-xs rounded-xl border-gray-200 gap-1.5"
            onClick={() => {
              const csv =
                "Transaction ID,Student Name,Course,Amount,Payment Method,Date,Status\n" +
                payments
                  .map(
                    (p) =>
                      `"${p.id}","${p.studentName}","${p.courseTitle}",₹${p.amount},"${p.method}","${p.date}","${p.status}"`
                  )
                  .join("\n");
              const blob = new Blob([csv], { type: "text/csv" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "DeepSiddhi_Payment_Ledger.csv";
              a.click();
            }}
          >
            <Download className="w-3.5 h-3.5" />
            Export Payments CSV
          </Button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="rounded-2xl border-gray-100 shadow-sm bg-white p-5 space-y-1">
          <span className="text-xs text-gray-500 font-semibold block">Total Collections</span>
          <span className="text-2xl font-black text-emerald-700">₹{totalRevenue.toLocaleString()}</span>
          <span className="text-[11px] text-gray-400 block">Gateway Settlement Active</span>
        </Card>

        <Card className="rounded-2xl border-gray-100 shadow-sm bg-white p-5 space-y-1">
          <span className="text-xs text-gray-500 font-semibold block">Successful Transactions</span>
          <span className="text-2xl font-black text-[#163B65]">
            {payments.filter((p) => p.status === "completed").length}
          </span>
          <span className="text-[11px] text-emerald-600 font-semibold block">98.8% Success Rate</span>
        </Card>

        <Card className="rounded-2xl border-gray-100 shadow-sm bg-white p-5 space-y-1">
          <span className="text-xs text-gray-500 font-semibold block">Refunds Processed</span>
          <span className="text-2xl font-black text-amber-600">
            {payments.filter((p) => p.status === "refunded").length}
          </span>
          <span className="text-[11px] text-gray-400 block">7-Day Guarantee Period</span>
        </Card>
      </div>

      {/* Table */}
      <Card className="rounded-3xl border-gray-100 shadow-md bg-white overflow-hidden space-y-4 p-6">
        <div className="relative max-w-sm">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search by student name or transaction ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10 text-xs border-gray-200"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-y border-gray-100">
              <tr>
                <th className="py-3 px-4">Tx ID</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Course Enrolled</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50/60">
                  <td className="py-3.5 px-4 font-mono font-bold text-gray-700">{tx.id}</td>
                  <td className="py-3.5 px-4 font-bold text-[#163B65]">{tx.studentName}</td>
                  <td className="py-3.5 px-4 text-gray-800">{tx.courseTitle}</td>
                  <td className="py-3.5 px-4 font-extrabold text-gray-900">₹{tx.amount.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-gray-600">{tx.method}</td>
                  <td className="py-3.5 px-4 text-gray-400">{tx.date}</td>
                  <td className="py-3.5 px-4">
                    <Badge
                      className={`text-[10px] capitalize ${
                        tx.status === "completed"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {tx.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button variant="ghost" size="sm" className="h-8 text-xs text-teal-700 hover:bg-teal-50 gap-1 rounded-lg">
                      <Receipt className="w-3.5 h-3.5" />
                      Receipt
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
