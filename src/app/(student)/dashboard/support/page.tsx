"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";

export default function SupportPage() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [ticketSent, setTicketSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;
    setTicketSent(true);
    setTimeout(() => {
      setTicketSent(false);
      setSubject("");
      setMessage("");
    }, 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#163B65]">Student Help & Academic Support</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Raise technical, academic, or billing tickets directly with the DeepSiddhi student support cell.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Helpline Box (1 Col) */}
        <div className="space-y-4">
          <Card className="rounded-3xl border-gray-100 shadow-sm bg-white p-6 space-y-4">
            <h3 className="font-bold text-sm text-[#163B65]">Direct Support Channels</h3>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-100 flex items-center gap-3">
                <Phone className="w-5 h-5 text-teal-700" />
                <div>
                  <span className="font-bold text-teal-900 block">Toll-Free Helpline</span>
                  <span className="text-teal-700">1800-425-9090 (8AM - 8PM)</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-100 flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-blue-700" />
                <div>
                  <span className="font-bold text-blue-900 block">WhatsApp Academic Desk</span>
                  <span className="text-blue-700">+91 98765-43210</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-100 flex items-center gap-3">
                <Mail className="w-5 h-5 text-purple-700" />
                <div>
                  <span className="font-bold text-purple-900 block">Support Email</span>
                  <span className="text-purple-700">support@deepsiddhi.org</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Raise Ticket Form (2 Cols) */}
        <div className="lg:col-span-2">
          <Card className="rounded-3xl border-gray-100 shadow-sm bg-white p-6 sm:p-8 space-y-5">
            <h3 className="text-base font-bold text-[#163B65]">Create a Support Ticket</h3>

            {ticketSent ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-gray-900 text-sm">Ticket #TK-2026-904 Created</h4>
                <p className="text-xs text-gray-500">
                  Our academic operations team will respond via email within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Issue Subject
                  </Label>
                  <Input
                    required
                    placeholder="e.g. Unable to play Chapter 4 recorded video on mobile"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="mt-1 h-11 border-gray-200"
                  />
                </div>

                <div>
                  <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Detailed Description
                  </Label>
                  <Textarea
                    required
                    rows={4}
                    placeholder="Provide details, device OS, browser name, or test ID..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-1 resize-none border-gray-200"
                  />
                </div>

                <Button
                  type="submit"
                  className="bg-[#163B65] hover:bg-[#122e50] text-white text-xs font-semibold h-11 px-6 rounded-xl flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Support Ticket
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>

      {/* FAQ Accordion */}
      <Card className="rounded-3xl border-gray-100 shadow-sm bg-white p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-bold text-[#163B65]">Frequently Asked Questions</h3>

        <Accordion type="single" collapsible className="w-full text-xs">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xs font-semibold text-gray-800">
              How do I resume recorded lectures from where I left off?
            </AccordionTrigger>
            <AccordionContent className="text-xs text-gray-600 leading-relaxed">
              Our player automatically bookmarks your exact timestamp every 5 seconds. Simply click &quot;Resume Lecture&quot; from the dashboard or select the lesson in Recorded Classes to continue immediately.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-xs font-semibold text-gray-800">
              Can I attend live classes on multiple devices simultaneously?
            </AccordionTrigger>
            <AccordionContent className="text-xs text-gray-600 leading-relaxed">
              For security and DRM protection, your account allows single active streaming session at a time. You can switch between desktop and mobile easily by logging in.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-xs font-semibold text-gray-800">
              When are All India Mock Test results declared?
            </AccordionTrigger>
            <AccordionContent className="text-xs text-gray-600 leading-relaxed">
              Instant scores, accuracy percentage, and solutions are available immediately upon submission. All India Percentiles and cohort ranks update every Sunday evening at 8:00 PM IST.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  );
}
