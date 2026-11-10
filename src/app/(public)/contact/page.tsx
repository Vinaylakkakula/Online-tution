"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
  HelpCircle,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: "IIT-JEE",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="bg-[#F6F8FC] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge className="bg-[#163B65] text-white hover:bg-[#163B65]">
            Contact Us
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#163B65]">
            Get In Touch With Our Counselors
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Have queries regarding batches, admissions, scholarship tests, or curriculum? We are here to guide you 7 days a week.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information & Map (1 Column) */}
          <div className="space-y-6">
            <Card className="rounded-2xl border-gray-100 shadow-md bg-white p-6 space-y-6">
              <h3 className="text-lg font-bold text-[#163B65] border-b border-gray-100 pb-3">
                Headquarters & Center
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EAF4FF] text-[#163B65] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#16A6A1]" />
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800 block">DeepSiddhi Foundation Tower</span>
                    <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">
                      Knowledge Hub Campus, Sector 62, Institutional Area, Noida - 201309, NCR New Delhi, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EAF4FF] text-[#163B65] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#16A6A1]" />
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800 block">Student Toll-Free Helpline</span>
                    <p className="text-gray-600 text-xs mt-0.5">+91 1800-425-9090</p>
                    <p className="text-gray-500 text-[11px]">+91 98765-43210 (Admissions WhatsApp)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EAF4FF] text-[#163B65] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#16A6A1]" />
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800 block">Email Support</span>
                    <p className="text-gray-600 text-xs mt-0.5">admissions@deepsiddhifoundation.org</p>
                    <p className="text-gray-500 text-[11px]">support@deepsiddhifoundation.org</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EAF4FF] text-[#163B65] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[#16A6A1]" />
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800 block">Counseling Hours</span>
                    <p className="text-gray-500 text-xs mt-0.5">Mon - Sat: 8:00 AM - 8:00 PM IST</p>
                    <p className="text-gray-500 text-xs">Sunday: 9:00 AM - 5:00 PM IST</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Map Preview Card */}
            <Card className="rounded-2xl border-gray-100 shadow-md bg-white overflow-hidden">
              <div className="h-44 bg-gradient-to-br from-slate-100 to-slate-200 relative flex items-center justify-center p-4 text-center">
                <div className="space-y-1">
                  <MapPin className="w-8 h-8 text-[#163B65] mx-auto animate-bounce" />
                  <span className="text-xs font-bold text-gray-800 block">DeepSiddhi Central Academic Campus</span>
                  <span className="text-[11px] text-gray-500 block">Interactive Google Maps Location</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form (2 Columns) */}
          <div className="lg:col-span-2">
            <Card className="rounded-2xl border-gray-100 shadow-md bg-white p-6 sm:p-8">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#163B65]">Inquiry Received!</h3>
                  <p className="text-gray-600 text-sm max-w-md mx-auto">
                    Thank you, <strong>{formData.fullName}</strong>. A dedicated senior academic counselor will reach out to you at <strong>{formData.phone}</strong> within 2 hours.
                  </p>
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ fullName: "", email: "", phone: "", course: "IIT-JEE", message: "" });
                    }}
                    variant="outline"
                    className="border-gray-300 text-gray-700 mt-4"
                  >
                    Submit Another Query
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-[#163B65]">Send an Academic Enquiry</h2>
                    <p className="text-xs text-gray-500">Fill in your details to receive syllabus brochures, fee structure, and demo lecture links.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <Label htmlFor="contactName" className="text-xs font-semibold text-gray-700">Student / Parent Name *</Label>
                      <Input
                        id="contactName"
                        required
                        placeholder="e.g. Rajesh Kumar"
                        className="mt-1 h-11"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactPhone" className="text-xs font-semibold text-gray-700">Mobile Number (with WhatsApp) *</Label>
                      <Input
                        id="contactPhone"
                        type="tel"
                        required
                        placeholder="+91 9876543210"
                        className="mt-1 h-11"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactEmail" className="text-xs font-semibold text-gray-700">Email Address *</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        required
                        placeholder="parent@example.com"
                        className="mt-1 h-11"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-gray-700">Course of Interest *</Label>
                      <Select
                        value={formData.course}
                        onValueChange={(val) => setFormData({ ...formData, course: val })}
                      >
                        <SelectTrigger className="mt-1 h-11">
                          <SelectValue placeholder="Select Course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="IIT-JEE">IIT-JEE Main & Advanced</SelectItem>
                          <SelectItem value="Olympiad">International Olympiads (Science/Math)</SelectItem>
                          <SelectItem value="NTSE">NTSE & State Talent Search</SelectItem>
                          <SelectItem value="Foundation">Class 6-10 Foundation</SelectItem>
                          <SelectItem value="Other Courses">Crash Courses & Test Series</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="contactMessage" className="text-xs font-semibold text-gray-700">Your Question or Specific Academic Need</Label>
                    <Textarea
                      id="contactMessage"
                      rows={4}
                      placeholder="Tell us about current class, target examination year, and topics you need help with..."
                      className="mt-1 resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto h-12 px-8 bg-[#163B65] hover:bg-[#122e50] text-white font-semibold rounded-xl shadow-md flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      "Transmitting..."
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Academic Inquiry
                      </>
                    )}
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
