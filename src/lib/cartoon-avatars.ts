export interface CartoonAvatar {
  id: string;
  name: string;
  character: string;
  description: string;
  badge: string;
  color: string;
  bgColor: string;
  borderColor: string;
  emoji: string;
  svgIcon?: string;
}

export interface AvatarFrame {
  id: string;
  name: string;
  color: string;
  borderClass: string;
  glowClass: string;
  badge: string;
}

export interface StudentTitle {
  id: string;
  title: string;
  icon: string;
  unlockedAtXp: number;
}

export const CARTOON_AVATARS: CartoonAvatar[] = [
  {
    id: "astro-leo",
    name: "Astro Leo",
    character: "Space Explorer Cadet",
    description: "Loves exploring space, astrophysics & celestial secrets!",
    badge: "Space Hero",
    color: "#3B82F6",
    bgColor: "from-blue-400 to-indigo-600",
    borderColor: "border-blue-400",
    emoji: "🚀",
  },
  {
    id: "dino-rex",
    name: "Dino Rex",
    character: "Prehistoric Science Whiz",
    description: "Curious paleontologist who loves dinosaurs & natural sciences!",
    badge: "Fossil Hunter",
    color: "#10B981",
    bgColor: "from-emerald-400 to-teal-600",
    borderColor: "border-emerald-400",
    emoji: "🦖",
  },
  {
    id: "robo-pixel",
    name: "Robo Pixel",
    character: "Math & AI Prodigy",
    description: "Solves complex math formulas in milliseconds with robot power!",
    badge: "Code Wizard",
    color: "#8B5CF6",
    bgColor: "from-purple-400 to-indigo-700",
    borderColor: "border-purple-400",
    emoji: "🤖",
  },
  {
    id: "professor-hoot",
    name: "Professor Hoot",
    character: "Wise Master of Logic",
    description: "Deep thinker with night vision for solving tricky puzzle problems!",
    badge: "Top Scholar",
    color: "#F59E0B",
    bgColor: "from-amber-400 to-orange-600",
    borderColor: "border-amber-400",
    emoji: "🦉",
  },
  {
    id: "sparky-fox",
    name: "Sparky Fox",
    character: "Speedy Problem Solver",
    description: "Quick on calculations and always first to finish speed quizzes!",
    badge: "Lightning Reflex",
    color: "#EC4899",
    bgColor: "from-pink-400 to-rose-600",
    borderColor: "border-pink-400",
    emoji: "🦊",
  },
  {
    id: "luna-magic",
    name: "Luna Cat",
    character: "Creative Word Alchemist",
    description: "Grammar ninja and imaginative storyteller who loves literature!",
    badge: "Master Author",
    color: "#06B6D4",
    bgColor: "from-cyan-400 to-blue-600",
    borderColor: "border-cyan-400",
    emoji: "🐱",
  },
  {
    id: "shadow-ninja",
    name: "Shadow Ninja",
    character: "Exam Stealth Champion",
    description: "Laser focus, quiet determination, and unstoppable score streaks!",
    badge: "Silent Master",
    color: "#6366F1",
    bgColor: "from-indigo-500 to-slate-900",
    borderColor: "border-indigo-400",
    emoji: "🥷",
  },
  {
    id: "bambu-panda",
    name: "Bambu Panda",
    character: "Zen Mindset Learner",
    description: "Calm under exam pressure and reads textbooks with total zen focus!",
    badge: "Mindful Champion",
    color: "#14B8A6",
    bgColor: "from-teal-400 to-emerald-700",
    borderColor: "border-teal-400",
    emoji: "🐼",
  },
  {
    id: "starlight-unicorn",
    name: "Starlight",
    character: "Wonder Biology Champ",
    description: "Fascinated by plant cells, animal ecosystems, and magic elements!",
    badge: "Nature Guardian",
    color: "#D946EF",
    bgColor: "from-fuchsia-400 to-pink-600",
    borderColor: "border-fuchsia-400",
    emoji: "🦄",
  },
  {
    id: "captain-proton",
    name: "Captain Proton",
    character: "Physics Superhero",
    description: "Commands Newton's laws and electric circuits to save the day!",
    badge: "Force Master",
    color: "#EF4444",
    bgColor: "from-red-400 to-orange-600",
    borderColor: "border-red-400",
    emoji: "🦸",
  },
];

export const AVATAR_FRAMES: AvatarFrame[] = [
  {
    id: "frame-gold",
    name: "Golden Champion",
    color: "#F59E0B",
    borderClass: "ring-4 ring-amber-400 border-amber-300",
    glowClass: "shadow-[0_0_15px_rgba(245,158,11,0.5)]",
    badge: "🏆 Gold",
  },
  {
    id: "frame-galaxy",
    name: "Cosmic Neon",
    color: "#8B5CF6",
    borderClass: "ring-4 ring-purple-500 border-indigo-400",
    glowClass: "shadow-[0_0_15px_rgba(139,92,246,0.5)]",
    badge: "🌌 Cosmic",
  },
  {
    id: "frame-emerald",
    name: "Emerald Genius",
    color: "#10B981",
    borderClass: "ring-4 ring-emerald-500 border-teal-300",
    glowClass: "shadow-[0_0_15px_rgba(16,185,129,0.5)]",
    badge: "💎 Emerald",
  },
  {
    id: "frame-ruby",
    name: "Ruby Flame",
    color: "#EF4444",
    borderClass: "ring-4 ring-rose-500 border-red-300",
    glowClass: "shadow-[0_0_15px_rgba(239,68,68,0.5)]",
    badge: "🔥 Flame",
  },
  {
    id: "frame-cyber",
    name: "Cyber Cyan",
    color: "#06B6D4",
    borderClass: "ring-4 ring-cyan-400 border-sky-300",
    glowClass: "shadow-[0_0_15px_rgba(6,182,212,0.5)]",
    badge: "⚡ Cyber",
  },
];

export const STUDENT_TITLES: StudentTitle[] = [
  { id: "t-1", title: "Novice Explorer", icon: "🌱", unlockedAtXp: 0 },
  { id: "t-2", title: "Math Magician", icon: "📐", unlockedAtXp: 200 },
  { id: "t-3", title: "Science Detective", icon: "🔬", unlockedAtXp: 500 },
  { id: "t-4", title: "Junior Einstein", icon: "💡", unlockedAtXp: 1000 },
  { id: "t-5", title: "Quiz Ninja", icon: "⚡", unlockedAtXp: 1800 },
  { id: "t-6", title: "Formula Grandmaster", icon: "👑", unlockedAtXp: 3000 },
];

export function getAvatarById(id: string): CartoonAvatar {
  return CARTOON_AVATARS.find((a) => a.id === id) || CARTOON_AVATARS[0];
}

export function getFrameById(id: string): AvatarFrame {
  return AVATAR_FRAMES.find((f) => f.id === id) || AVATAR_FRAMES[0];
}
