"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Settings,
  Video,
  KeyRound,
  Building,
  CheckCircle2,
  Lock,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [videoProvider, setVideoProvider] = useState("mux");
  const [muxTokenId, setMuxTokenId] = useState("mux_token_live_89401");
  const [zoomClientId, setZoomClientId] = useState("zoom_client_99410293");
  const [institutionName, setInstitutionName] = useState("DeepSiddhi Foundation");
  const [supportPhone, setSupportPhone] = useState("+91 1800-425-9090");
  const [supportEmail, setSupportEmail] = useState("support@deepsiddhifoundation.org");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#163B65]">Institutional & API Settings</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Configure video DRM streaming keys, video conferencing credentials, and campus institutional details.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Video Provider Settings */}
        <Card className="rounded-3xl border-gray-100 shadow-md bg-white p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Video className="w-5 h-5 text-[#16A6A1]" />
            <h3 className="font-bold text-base text-[#163B65]">Video Streaming Provider (DRM)</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <Label className="text-xs font-semibold text-gray-700">Active Provider *</Label>
              <Select value={videoProvider} onValueChange={setVideoProvider}>
                <SelectTrigger className="mt-1 h-10 border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mux">Mux Video (Recommended for Low Latency)</SelectItem>
                  <SelectItem value="cloudflare">Cloudflare Stream</SelectItem>
                  <SelectItem value="aws">AWS Elemental MediaLive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs font-semibold text-gray-700">API Token ID</Label>
              <Input
                value={muxTokenId}
                onChange={(e) => setMuxTokenId(e.target.value)}
                className="mt-1 h-10 font-mono border-gray-200"
              />
            </div>
          </div>
        </Card>

        {/* Live Conferencing (Zoom / Google Meet) */}
        <Card className="rounded-3xl border-gray-100 shadow-md bg-white p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <KeyRound className="w-5 h-5 text-[#16A6A1]" />
            <h3 className="font-bold text-base text-[#163B65]">Live Webinar API Credentials</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <Label className="text-xs font-semibold text-gray-700">Zoom OAuth Client ID</Label>
              <Input
                value={zoomClientId}
                onChange={(e) => setZoomClientId(e.target.value)}
                className="mt-1 h-10 font-mono border-gray-200"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold text-gray-700">Zoom Client Secret</Label>
              <Input
                type="password"
                defaultValue="••••••••••••••••••••••••"
                className="mt-1 h-10 font-mono border-gray-200"
              />
            </div>
          </div>
        </Card>

        {/* Institution Details */}
        <Card className="rounded-3xl border-gray-100 shadow-md bg-white p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Building className="w-5 h-5 text-[#16A6A1]" />
            <h3 className="font-bold text-base text-[#163B65]">Institutional Information</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <Label className="text-xs font-semibold text-gray-700">Platform Brand Name</Label>
              <Input
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                className="mt-1 h-10 border-gray-200"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold text-gray-700">Toll-Free Helpline</Label>
              <Input
                value={supportPhone}
                onChange={(e) => setSupportPhone(e.target.value)}
                className="mt-1 h-10 border-gray-200"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold text-gray-700">Admissions Email</Label>
              <Input
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="mt-1 h-10 border-gray-200"
              />
            </div>
          </div>
        </Card>

        <div className="flex items-center justify-between pt-2">
          <Button
            type="submit"
            className="bg-[#163B65] hover:bg-[#122e50] text-white text-xs font-semibold h-11 px-8 rounded-xl shadow-md"
          >
            {saved ? "Settings Saved Successfully!" : "Save Institutional Settings"}
          </Button>

          {saved && (
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Settings Synced to Supabase Config
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
