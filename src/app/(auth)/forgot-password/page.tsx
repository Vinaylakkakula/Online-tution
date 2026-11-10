"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSent(true);
    }, 800);
  };

  return (
    <Card className="rounded-3xl border-gray-100 shadow-xl bg-white overflow-hidden">
      <div className="bg-gradient-to-r from-[#163B65] to-[#16A6A1] p-6 text-white text-center">
        <h2 className="text-xl font-bold">Reset Password</h2>
        <p className="text-xs text-[#EAF4FF]/80 mt-1">
          Enter your registered email to receive recovery instructions
        </p>
      </div>

      <CardContent className="p-6 sm:p-8 space-y-6">
        {sent ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#163B65]">Password Link Sent</h3>
              <p className="text-xs text-gray-600 mt-1">
                We sent a password reset email to <strong>{email}</strong>. Check your inbox and spam folder.
              </p>
            </div>
            <Link href="/login" className="block">
              <Button className="w-full bg-[#163B65] text-white">
                Back to Sign In
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Your Registered Email
              </Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="email"
                  required
                  placeholder="student@example.com"
                  className="pl-9 h-11 border-gray-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-[#163B65] hover:bg-[#122e50] text-white font-semibold rounded-xl"
            >
              {isSubmitting ? "Sending Link..." : "Send Reset Link"}
            </Button>

            <div className="text-center pt-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#163B65]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Return to Login
              </Link>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
