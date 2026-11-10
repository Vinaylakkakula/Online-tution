// Database types matching Supabase schema
export type UserRole = "super_admin" | "admin" | "faculty" | "student";

export type CourseCategory = "IIT-JEE" | "Olympiad" | "NTSE" | "Foundation" | "Other Courses";

export type ClassLevel = "Class 6" | "Class 7" | "Class 8" | "Class 9" | "Class 10" | "Class 11" | "Class 12" | "Dropper";

export type LiveClassStatus = "upcoming" | "live" | "completed" | "cancelled";

export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";

export type TestStatus = "draft" | "published" | "active" | "completed";

export type AssignmentStatus = "pending" | "submitted" | "graded";

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  avatar_url: string | null;
  role: UserRole;
  class_level: ClassLevel | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  thumbnail_url: string | null;
  category: CourseCategory;
  target_class: ClassLevel[];
  price: number;
  discounted_price: number | null;
  duration_hours: number;
  total_lessons: number;
  is_published: boolean;
  is_featured: boolean;
  faculty_id: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  faculty?: FacultyProfile;
  subjects?: Subject[];
  enrollment_count?: number;
}

export interface Subject {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  sort_order: number;
  created_at: string;
  chapters?: Chapter[];
}

export interface Chapter {
  id: string;
  subject_id: string;
  title: string;
  description: string | null;
  sort_order: number;
  created_at: string;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  chapter_id: string;
  title: string;
  description: string | null;
  video_url: string | null;
  video_provider_id: string | null;
  duration_minutes: number;
  sort_order: number;
  is_free_preview: boolean;
  is_published: boolean;
  created_at: string;
}

export interface Batch {
  id: string;
  name: string;
  course_id: string;
  start_date: string;
  end_date: string | null;
  max_students: number;
  is_active: boolean;
  created_at: string;
  course?: Course;
}

export interface FacultyProfile {
  id: string;
  user_id: string;
  specialization: string;
  qualifications: string;
  experience_years: number;
  bio: string;
  profile_photo_url: string | null;
  is_active: boolean;
  created_at: string;
  profile?: Profile;
}

export interface CourseEnrollment {
  id: string;
  student_id: string;
  course_id: string;
  batch_id: string | null;
  enrolled_at: string;
  is_active: boolean;
  completed_at: string | null;
  progress_percentage: number;
  course?: Course;
  batch?: Batch;
}

export interface RecordedClass {
  id: string;
  course_id: string;
  subject_id: string | null;
  chapter_id: string | null;
  title: string;
  description: string | null;
  video_url: string | null;
  video_provider_id: string | null;
  thumbnail_url: string | null;
  duration_minutes: number;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  course?: Course;
  subject?: Subject;
  chapter?: Chapter;
}

export interface VideoWatchHistory {
  id: string;
  student_id: string;
  recorded_class_id: string;
  last_position_seconds: number;
  total_watched_seconds: number;
  is_completed: boolean;
  last_watched_at: string;
  created_at: string;
}

export interface LiveClass {
  id: string;
  course_id: string;
  batch_id: string | null;
  faculty_id: string;
  title: string;
  description: string | null;
  scheduled_at: string;
  duration_minutes: number;
  meeting_url: string | null;
  meeting_id: string | null;
  meeting_provider: "zoom" | "google_meet" | null;
  status: LiveClassStatus;
  recording_url: string | null;
  created_at: string;
  course?: Course;
  batch?: Batch;
  faculty?: FacultyProfile;
}

export interface Test {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  total_marks: number;
  duration_minutes: number;
  passing_marks: number;
  status: TestStatus;
  scheduled_at: string | null;
  show_results_immediately: boolean;
  created_at: string;
  questions?: TestQuestion[];
  course?: Course;
}

export interface TestQuestion {
  id: string;
  test_id: string;
  question_text: string;
  question_type: "mcq" | "multi_select" | "true_false" | "numerical";
  marks: number;
  negative_marks: number;
  explanation: string | null;
  sort_order: number;
  options?: TestOption[];
}

export interface TestOption {
  id: string;
  question_id: string;
  option_text: string;
  is_correct: boolean;
  sort_order: number;
}

export interface TestAttempt {
  id: string;
  student_id: string;
  test_id: string;
  started_at: string;
  submitted_at: string | null;
  score: number | null;
  total_marks: number;
  percentage: number | null;
  time_taken_seconds: number | null;
  is_submitted: boolean;
  test?: Test;
  answers?: TestAnswer[];
}

export interface TestAnswer {
  id: string;
  attempt_id: string;
  question_id: string;
  selected_option_id: string | null;
  is_correct: boolean | null;
  marks_awarded: number | null;
  is_marked_for_review: boolean;
}

export interface StudyMaterial {
  id: string;
  course_id: string;
  subject_id: string | null;
  chapter_id: string | null;
  title: string;
  description: string | null;
  file_url: string;
  file_type: "pdf" | "doc" | "worksheet" | "practice_paper" | "question_bank" | "notes";
  file_size_bytes: number;
  download_count: number;
  is_published: boolean;
  created_at: string;
  course?: Course;
  subject?: Subject;
}

export interface Payment {
  id: string;
  student_id: string;
  course_id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  payment_method: string | null;
  transaction_id: string | null;
  gateway_response: Record<string, unknown> | null;
  receipt_url: string | null;
  created_at: string;
  course?: Course;
  student?: Profile;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  target_audience: "all" | "students" | "faculty" | CourseCategory;
  course_id: string | null;
  is_active: boolean;
  priority: "low" | "medium" | "high";
  created_by: string;
  created_at: string;
  expires_at: string | null;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: "class" | "test" | "material" | "announcement" | "result" | "payment" | "general";
  is_read: boolean;
  action_url: string | null;
  created_at: string;
}

export interface CommunityPost {
  id: string;
  author_id: string;
  course_id: string | null;
  title: string;
  content: string;
  post_type: "discussion" | "doubt" | "announcement";
  is_pinned: boolean;
  is_resolved: boolean;
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
  author?: Profile;
}

export interface CommunityComment {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  is_faculty_response: boolean;
  likes_count: number;
  created_at: string;
  author?: Profile;
}

export interface LeaderboardScore {
  id: string;
  student_id: string;
  course_id: string | null;
  total_points: number;
  test_score: number;
  attendance_score: number;
  engagement_score: number;
  rank: number | null;
  period: "weekly" | "monthly" | "all_time";
  calculated_at: string;
  student?: Profile;
}

export interface StudentEnquiry {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  course_interest: CourseCategory;
  class_level: ClassLevel;
  message: string | null;
  status: "new" | "contacted" | "enrolled" | "closed";
  created_at: string;
}

export interface SupportTicket {
  id: string;
  user_id: string;
  subject: string;
  description: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  details: Record<string, unknown> | null;
  ip_address: string | null;
  created_at: string;
}
