"use client";

import { useState } from "react";
import {
  CARTOON_AVATARS,
  AVATAR_FRAMES,
  STUDENT_TITLES,
  CartoonAvatar,
  AvatarFrame,
  StudentTitle,
  getAvatarById,
  getFrameById,
} from "@/lib/cartoon-avatars";
import { LMSStore, StudentProfileExtra } from "@/lib/lms-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Check, Palette, Award, Shield, Heart } from "lucide-react";

interface CartoonAvatarModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentId: string;
  studentName?: string;
  currentExtras?: StudentProfileExtra;
  onSave?: (updated: StudentProfileExtra) => void;
}

export function CartoonAvatarModal({
  open,
  onOpenChange,
  studentId,
  studentName = "Aryan Sharma",
  currentExtras,
  onSave,
}: CartoonAvatarModalProps) {
  const existing = currentExtras || LMSStore.getProfileExtras(studentId);

  const [selectedAvatarId, setSelectedAvatarId] = useState(existing.avatarId || "astro-leo");
  const [selectedFrameId, setSelectedFrameId] = useState(existing.frameId || "frame-gold");
  const [selectedTitleId, setSelectedTitleId] = useState(existing.titleId || "t-2");
  const [activeTab, setActiveTab] = useState<"avatars" | "frames" | "titles">("avatars");
  const [isSavedAnimation, setIsSavedAnimation] = useState(false);

  const selectedAvatar = getAvatarById(selectedAvatarId);
  const selectedFrame = getFrameById(selectedFrameId);
  const selectedTitle =
    STUDENT_TITLES.find((t) => t.id === selectedTitleId) || STUDENT_TITLES[1];

  const handleSave = () => {
    const updated: Partial<StudentProfileExtra> = {
      avatarId: selectedAvatarId,
      frameId: selectedFrameId,
      titleId: selectedTitleId,
    };
    LMSStore.saveProfileExtras(studentId, updated);
    setIsSavedAnimation(true);
    setTimeout(() => {
      setIsSavedAnimation(false);
      onSave?.(LMSStore.getProfileExtras(studentId));
      onOpenChange(false);
    }, 700);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-3xl border-2 border-indigo-200 bg-gradient-to-b from-white via-indigo-50/30 to-purple-50/40 shadow-2xl">
        <DialogHeader className="p-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white relative">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-white/20 backdrop-blur-md text-2xl">
              🎨
            </span>
            <div>
              <DialogTitle className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                Customize Your Cartoon Avatar!
                <Sparkles className="w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: "3s" }} />
              </DialogTitle>
              <DialogDescription className="text-xs text-white/80 font-medium mt-0.5">
                Pick your hero mascot, radiant border frame & proud scholar badge.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Live Character Preview Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-white to-indigo-50/70 border-2 border-indigo-100 shadow-md flex flex-col sm:flex-row items-center gap-5 justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-4xl sm:text-5xl bg-gradient-to-tr ${selectedAvatar.bgColor} text-white transition-all transform hover:scale-105 ${selectedFrame.borderClass} ${selectedFrame.glowClass}`}
              >
                <span>{selectedAvatar.emoji}</span>
                <span className="absolute -bottom-1 -right-1 text-xs bg-amber-400 text-gray-950 font-black px-2 py-0.5 rounded-full border border-white shadow-xs">
                  Lv.{existing.level || 7}
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-base sm:text-lg font-black text-gray-900">
                    {studentName}
                  </h4>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                    {selectedTitle.icon} {selectedTitle.title}
                  </span>
                </div>
                <p className="text-xs font-semibold text-gray-600">
                  Hero: <span className="text-blue-600 font-extrabold">{selectedAvatar.name}</span> • {selectedAvatar.character}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-gray-500 font-medium">
                  <span className="flex items-center gap-1 text-amber-600 font-bold">
                    ⭐ {existing.xp || 1250} XP
                  </span>
                  <span>🔥 {existing.streakDays || 5} Day Streak</span>
                </div>
              </div>
            </div>

            <div className="text-center sm:text-right shrink-0">
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 bg-purple-100 px-2.5 py-1 rounded-full">
                {selectedFrame.badge} Frame
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-2xl">
            <button
              onClick={() => setActiveTab("avatars")}
              className={`flex-1 py-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "avatars"
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <span>🦸</span>
              <span>1. Cartoon Heroes ({CARTOON_AVATARS.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("frames")}
              className={`flex-1 py-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "frames"
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <span>✨</span>
              <span>2. Glow Frames</span>
            </button>
            <button
              onClick={() => setActiveTab("titles")}
              className={`flex-1 py-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "titles"
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <span>👑</span>
              <span>3. Scholar Titles</span>
            </button>
          </div>

          {/* Tab 1: Avatars Grid */}
          {activeTab === "avatars" && (
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-h-64 overflow-y-auto pr-1">
              {CARTOON_AVATARS.map((avatar) => {
                const isSelected = avatar.id === selectedAvatarId;
                return (
                  <button
                    key={avatar.id}
                    onClick={() => setSelectedAvatarId(avatar.id)}
                    className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center text-center gap-1.5 cursor-pointer relative group ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50/80 shadow-md scale-102"
                        : "border-gray-200 hover:border-indigo-300 bg-white"
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[10px]">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-gradient-to-tr ${avatar.bgColor} text-white shadow-xs group-hover:scale-110 transition-transform`}
                    >
                      {avatar.emoji}
                    </div>
                    <span className="text-xs font-black text-gray-900 leading-tight">
                      {avatar.name}
                    </span>
                    <span className="text-[10px] text-gray-500 line-clamp-1 leading-tight">
                      {avatar.character}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Tab 2: Glow Frames */}
          {activeTab === "frames" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {AVATAR_FRAMES.map((frame) => {
                const isSelected = frame.id === selectedFrameId;
                return (
                  <button
                    key={frame.id}
                    onClick={() => setSelectedFrameId(frame.id)}
                    className={`p-3.5 rounded-2xl border-2 transition-all flex items-center gap-3 cursor-pointer text-left ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50/80 shadow-md"
                        : "border-gray-200 hover:border-indigo-300 bg-white"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center bg-gray-900 text-white text-base ${frame.borderClass}`}
                    >
                      {selectedAvatar.emoji}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-black text-gray-900">{frame.name}</p>
                      <p className="text-[10px] text-gray-500 font-semibold">{frame.badge}</p>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-indigo-600" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Tab 3: Scholar Titles */}
          {activeTab === "titles" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
              {STUDENT_TITLES.map((title) => {
                const isSelected = title.id === selectedTitleId;
                return (
                  <button
                    key={title.id}
                    onClick={() => setSelectedTitleId(title.id)}
                    className={`p-3 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer text-left ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50/80 shadow-md"
                        : "border-gray-200 hover:border-indigo-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{title.icon}</span>
                      <div>
                        <p className="text-xs font-black text-gray-900">{title.title}</p>
                        <p className="text-[10px] text-emerald-600 font-bold">
                          Unlocked at {title.unlockedAtXp} XP
                        </p>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-indigo-600" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-3">
          <p className="text-[11px] text-gray-500 hidden sm:block">
            Avatar changes are synced live to your dashboard & tests!
          </p>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="flex-1 sm:flex-initial rounded-xl text-xs font-bold"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              className={`flex-1 sm:flex-initial rounded-xl text-xs font-black px-6 shadow-md transition-all ${
                isSavedAnimation
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white scale-95"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
              }`}
            >
              {isSavedAnimation ? "Saved! 🎉" : "Apply Character"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
