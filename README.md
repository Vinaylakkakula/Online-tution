# DeepSiddhi Foundation LMS

> **Production-grade Online Learning Management Platform for IIT-JEE, Olympiad, NTSE & Foundation Preparation**

---

## 🌟 Executive Overview

**DeepSiddhi Foundation LMS** is a full-stack educational platform built with modern web technologies, providing a public portal, a student registration and verification workflow, an interactive student learning portal, and a 22-module administrative control console.

### Key Pillars
- **Public Institution Website**: Modern landing page with hero CTA, featured courses, curriculum breakdowns, faculty profiles, and inquiry channels.
- **First-Visit Welcome / Registration Modal**: Lead generation popup with phone number formatting, OTP simulation, course selection, and consent.
- **Interactive Student Learning Portal**:
  - Live Classes with Zoom / Google Meet integration and live status alerts
  - Recorded Class Player with custom speeds (0.75x - 2x), DRM token watermarking, and lesson progress tracking
  - NTA-simulated Timed MCQ Examinations with review marking, auto-submit, and question-by-question solution explanations
  - Downloadable Study Materials (PDF notes, formula books, DPPs)
  - Learning Progress & Analytics powered by Recharts (weekly study hours, test percentile trends)
  - Student Honor Leaderboard (weekly/monthly/all-time)
  - Peer & Faculty Doubt Community with verified educator responses
  - In-App Notifications & Academic Support Desk
- **Administrative Console**:
  - Master Executive Overview with 8 KPI metrics and revenue run-rate charts
  - Student Directory with CSV roster export and account activation toggles
  - Admissions Leads & Enquiry CRM with status pipelines (New, Contacted, Enrolled, Closed)
  - Course Builder with pricing, faculty assignment, and curriculum authoring
  - Batch & Cohort Capacity Manager
  - Master Faculty Directory
  - Live Webinar Scheduler with broadcast alerts
  - Recorded Video Asset Manager
  - Test & Examination Authoring Engine
  - Study Material Repository
  - Financial Ledger & Payment Reconciliation
  - Push Announcement Broadcaster
  - Role-Based Access Control (RBAC) matrix (Super Admin, Admin, Faculty, Student)
  - System API & Video Provider Configuration

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | [Next.js](https://nextjs.org) (App Router, React 19, TypeScript) |
| **Styling & Design System** | Tailwind CSS v4, shadcn/ui primitives, Radix UI |
| **Branding Color Palette** | Deep Navy (`#163B65`), Teal (`#16A6A1`), Sky Tint (`#EAF4FF`), White (`#FFFFFF`) |
| **Icons** | Lucide React |
| **Data Visualization** | Recharts (Area charts, Bar charts, Trajectory trend lines) |
| **Database & Auth** | Supabase (PostgreSQL, Row Level Security, Auth, Storage) |
| **Video Delivery** | Mux Video DRM / Cloudflare Stream (Configurable) |
| **Live Classes** | Zoom Meeting SDK / Google Meet |
| **Deployment Target** | Vercel (Frontend) + Supabase Cloud (Backend) |

---

## 🚀 Quick Evaluation & Demo Access

For rapid local testing and reviewer evaluation without requiring immediate external database credentials, the platform includes a built-in session fallback with instant 1-click test roles:

1. **Student Account**: `student@deepsiddhi.org` (Aryan Sharma, Class 11 IIT-JEE Track)
2. **Faculty Account**: `faculty@deepsiddhi.org` (Dr. Rahul Sharma, Lead Physics Faculty)
3. **Super Admin Account**: `admin@deepsiddhi.org` (Academic Director, Full Root Access)

Simply navigate to `/login` and click any of the **Instant Demo Access** buttons to explore authenticated student or administrator features immediately.

---

## 💻 Local Development Setup

### 1. Prerequisites
- Node.js (v18.18.0 or newer)
- npm or pnpm
- Git

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/deepsiddhi/deepsiddhi-lms.git
cd deepsiddhi-lms

# Install project dependencies
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Populate the required keys in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=DeepSiddhi Foundation
VIDEO_PROVIDER=mux
```

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Supabase Database Setup & Migrations

The platform includes a complete database schema located in `supabase/migrations/20261102000000_deepsiddhi_schema.sql` and seed data in `supabase/seed.sql`.

### Option A: Using the Supabase Web Dashboard
1. Go to your [Supabase Dashboard](https://app.supabase.com) and create a new project.
2. Navigate to **SQL Editor** in the left sidebar.
3. Paste the contents of `supabase/migrations/20261102000000_deepsiddhi_schema.sql` and click **Run**.
4. Paste the contents of `supabase/seed.sql` and click **Run** to populate initial courses, batches, and curriculum records.
5. Copy your **Project URL** and **Anon Key** from `Project Settings > API` into your `.env.local` file.

### Option B: Using the Supabase CLI
```bash
supabase login
supabase link --project-ref your-project-ref
supabase db push
```

---

## 🚢 Production Build & Vercel Deployment

### 1. Build Verification
Run the production build locally to ensure zero TypeScript or routing warnings:
```bash
npm run build
```

### 2. Deploying to Vercel
1. Push your repository to GitHub / GitLab.
2. Sign in to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import the repository.
4. Set the Framework Preset to **Next.js**.
5. Add the Environment Variables configured in your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_APP_URL`
   - `VIDEO_PROVIDER`
6. Click **Deploy**.

---

## 🔒 Security & Row Level Security (RLS)

- **Strict Student Content Isolation**: Enrolled students can only access video playback IDs and protected study materials for courses they have active enrollments in.
- **Service Role Key Protection**: `SUPABASE_SERVICE_ROLE_KEY` is strictly confined to server-side routes and never exposed to client-side bundles.
- **Input Sanitization**: Client and server validation on mobile numbers, email strings, and inquiry payloads.
- **DRM Watermarking**: Player sessions embed unique student IDs to deter screen recording and piracy.

---

## 📄 License & Attribution

Designed and engineered for **DeepSiddhi Foundation**. All rights reserved © 2026.
