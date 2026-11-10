-- DeepSiddhi Foundation LMS Seed Data

-- Insert Sample Courses
INSERT INTO courses (id, title, slug, description, short_description, category, target_class, price, discounted_price, duration_hours, total_lessons, is_published, is_featured)
VALUES 
(
  'a1111111-1111-1111-1111-111111111111',
  'IIT-JEE Comprehensive Mastery 2026-27',
  'iit-jee-comprehensive-mastery',
  'Two-year integrated program covering Physics, Chemistry and Mathematics for JEE Main and Advanced with 650+ live hours, daily DPPs and 60+ mock tests.',
  'Two-year integrated Physics, Chemistry & Mathematics for JEE Main & Advanced.',
  'IIT-JEE',
  ARRAY['Class 11', 'Class 12'],
  49999.00,
  34999.00,
  650.0,
  240,
  true,
  true
),
(
  'b2222222-2222-2222-2222-222222222222',
  'Physics Olympiad Advanced Sprint (NSEP & INPhO)',
  'physics-olympiad-advanced-sprint',
  'Specialized Olympiad coaching for high-school students aiming for national medals in National Standard Examination in Physics (NSEP) and INPhO.',
  'Specialized problem solving and Olympiad physics theory.',
  'Olympiad',
  ARRAY['Class 10', 'Class 11', 'Class 12'],
  24999.00,
  18999.00,
  180.0,
  80,
  true,
  true
),
(
  'c3333333-3333-3333-3333-333333333333',
  'National Talent Search (NTSE) & Aptitude Mastery',
  'ntse-aptitude-mastery',
  'Comprehensive Mental Ability Test (MAT) and Scholastic Aptitude Test (SAT) preparation designed for Class 9 and 10 talent search aspirants.',
  'NTSE Stage 1 & 2 preparation with 300+ reasoning drills.',
  'NTSE',
  ARRAY['Class 9', 'Class 10'],
  15999.00,
  11999.00,
  140.0,
  60,
  true,
  true
)
ON CONFLICT (id) DO NOTHING;

-- Insert Batches
INSERT INTO batches (id, name, course_id, start_date, max_students, is_active)
VALUES
(
  'b1111111-0000-0000-0000-000000000001',
  'Pratham Batch (Morning)',
  'a1111111-1111-1111-1111-111111111111',
  '2026-11-15',
  150,
  true
),
(
  'b2222222-0000-0000-0000-000000000002',
  'Aryabhata Olympiad Batch',
  'b2222222-2222-2222-2222-222222222222',
  '2026-11-10',
  75,
  true
)
ON CONFLICT (id) DO NOTHING;
