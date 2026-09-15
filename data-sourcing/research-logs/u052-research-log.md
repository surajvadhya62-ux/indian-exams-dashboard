# Research Log: Unit 52 (u052) — Other State-Jurisdiction Recruiters — Chandigarh

- **Unit ID**: `u052`
- **Batch ID**: `batch-7-state-other--chandigarh`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts — proposed addition, flag for confirmation) — Chandigarh`
- **Timestamp**: 2026-09-12T22:05:00+05:30
- **Status**: Completed (1/1 exam researched, written, and validated)
- **Reviewer**: Antigravity Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 52 encompasses the primary ministerial secretarial recruitment gateway for the Union Territory of Chandigarh:
1. `chandigarh-admin-clerk`: Chandigarh Administration Department of Personnel Clerk & Steno-Typist Exam — **Tier B (Job Recruitment)**

### 1.1 Cadre Architecture & Administrative Context
- **Recruiting Authority**: Department of Personnel, Chandigarh Administration.
- **Cadre Definition**: Direct recruitment to Group 'C' posts of **Clerk** and **Steno-Typist** under the *Chandigarh Administration, Group 'C' (Clerk and Steno-Typist) (Common Cadre) (Ministerial), (Non-Gazetted) Recruitment Rules*.
- **Unified Ministerial Cadre**: Appointees are posted across various secretarial departments and subordinate directorates of the Chandigarh Administration (e.g., Home, Personnel, Engineering, Health, Higher Education, Printing & Stationery, Social Welfare).
- **Pay Scale Parity**: The Union Territory of Chandigarh follows the Central Civil Services / 7th Central Pay Commission (CPC) Pay Matrix. Clerks enter at **Pay Level 2** (entry basic ₹19,900, range ₹19,900–₹63,200), while Steno-Typists enter at **Pay Level 3** (entry basic ₹21,700, range ₹21,700–₹69,100).

### 1.2 Examination Scheme & Selection Architecture
- **Stage 1 — Written Examination (Objective Multiple Choice Test)**:
  - Total Questions / Marks: 100 questions, 100 marks.
  - Duration: 90 minutes.
  - Subjects:
    1. English Language Proficiency & Comprehension (20 questions, 20 marks)
    2. General Awareness & Current Affairs (20 questions, 20 marks)
    3. Reasoning Ability & Mental Aptitude (20 questions, 20 marks)
    4. Quantitative Aptitude & Numerical Ability (20 questions, 20 marks)
    5. Computer Proficiency & ICT Concepts (20 questions, 20 marks)
  - Negative Marking: 0.25 marks deducted per incorrect answer.
- **Stage 2 — Skill Test (Typing Test / Stenography Test) (Qualifying Only)**:
  - **Clerk**: Mandatory English Computer Typing Test with a minimum qualifying speed of **35 words per minute (wpm)**. As confirmed in official Department of Personnel typing test result orders (`1788349906_e28c62b2baf6092662eb.pdf`), net speed below 35 wpm results in disqualification ("Not Eligible").
  - **Steno-Typist**: Stenography dictation at 80 wpm for 10 minutes, followed by computer transcription within 50 minutes (English) or 65 minutes (Hindi).
  - Skill tests are purely qualifying in nature; marks are not added to the written examination merit.
- **Stage 3 — Document Verification & Mandatory ICT/CCC Certification**:
  - Verification of Bachelor’s degree from a recognized university.
  - Mandatory Course on Computer Concepts (CCC) / ICT Training course certificate of 80 hours duration from a NIELIT-approved or government-recognized institution (indispensable prerequisite for regular appointment under Chandigarh UT rules).

### 1.3 Career Progression & Seniority Dynamics
- Primary evidence was gathered from the *Minutes of the meeting held under the Chairmanship of Additional Secretary Personnel to consider objections on the Common Draft Recruitment Rules for the posts of Senior Assistant and Superintendent Grade-II* (File No. `1784198304_34eab8c0ef99027cfaba.pdf`):
  1. **Clerk** (Pay Level 2, ₹19,900–₹63,200) / **Steno-Typist** (Pay Level 3, ₹21,700–₹69,100) — Entry post.
  2. **Junior Assistant** (Pay Level 5, ₹29,200–₹92,300) — Placed after completing 5 years of regular service as Clerk.
  3. **Senior Assistant** (Pay Level 6, ₹35,400–₹1,12,400) — Eligible after 10 years of regular service as Clerk, or 5 years combined regular service in the grades of Clerk and Junior Assistant.
  4. **Superintendent Grade-II** (Pay Level 6 / Level 7, ₹35,400–₹1,12,400 / ₹44,900–₹1,42,400) — Eligible from Senior Assistants with 5 years regular service in the grade.
  5. **Superintendent Grade-I** (Pay Level 8 / Level 9, ₹47,600–₹1,51,100 / ₹53,100–₹1,67,800) — Group 'B' Gazetted supervisory post; feeder cadre to Administrative Officer / Assistant Secretary.

### 1.4 Validation
- Validated using `node scripts/data-sourcing/validate-details.mjs`:
  - `chandigarh-admin-clerk.json` passed with **0 errors** and **0 warnings**.

| Exam ID | Title | Tier | Jurisdiction | Exam Type | Scheme Status | Benchmarks Status | Validation |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| `chandigarh-admin-clerk` | Chandigarh Administration Department of Personnel Clerk & Steno-Typist Exam | B | Chandigarh (State/UT) | job | Available (100 Marks MCQ + Qualifying Skill Test) | Available (2026: 257 posts, 2019: 404 posts) | **PASS** |

---

## 2. Detailed Exam Log

### 2.1 `chandigarh-admin-clerk`
- **Tier**: B, **Exam Type**: job
- **Sections populated**:
  - `career_ladder`: Available (verified through official Department of Personnel meeting minutes on Common Cadre Recruitment Rules).
  - `exam_scheme`: Available (verified 100 questions, 100 marks objective exam + 35 wpm computer typing test).
  - `financial_package`: Available (verified Level 2 entry basic ₹19,900, 58% Central DA, 18% HRA Category Y city, gross ₹35,000–₹43,000, in-hand ₹30,000–₹37,000).
  - `competition_benchmarks`: Available (verified 2026 cycle: 257 vacancies [234 Clerk, 23 Steno-Typist]; 2019 cycle: 404 vacancies [356 Clerk, 48 Steno-Typist]).
  - `official_downloads`: Available (direct links to appointment notice and administration portals).
- **Sources OPENED and read this session**:
  - Chandigarh Administration Department of Personnel Public Appointment Notice No. 588537(E)-IH(11)-2026/73999 dated 31/03/2026 (`https://chandigarh.gov.in/files/Updation26/dop26-73999-0404.pdf`, rendered to PNG and read via `view_file`; confirms 234 Clerk posts at Level 2, 23 Steno-Typist posts at Level 3, online applications w.e.f. 06.04.2026).
  - Minutes of the Meeting on Common Draft Recruitment Rules for the posts of Senior Assistant and Superintendent Grade-II (`https://chandigarh.gov.in/cadmin//uploads/1784198304_34eab8c0ef99027cfaba.pdf`, 3 pages extracted and inspected via `view_file`; confirms promotion criteria, feeder grades, and Pay Levels 2 -> 5 -> 6 -> 7).
  - Result of Computer Typing Test (English) held at GPW Sector 10, Chandigarh (`https://chandigarh.gov.in/cadmin//uploads/1788349906_e28c62b2baf6092662eb.pdf`, text parsed via `pdftotext`; confirms 35 wpm qualifying standard).
  - Seniority List of Steno-Typists under Engineering Department (`https://chandigarh.gov.in/cadmin//uploads/1777962677_87e7f9db6bd56d7e2f24.pdf`, text parsed via `pdftotext`).
  - Chandigarh Administration Official Orders & Notifications Portal (`https://chandigarh.gov.in/orders-notifications`, parsed live HTML).
  - Chandigarh Administration Official Public Notices Portal (`https://chandigarh.gov.in/public-notice`, parsed live HTML).
  - Testbook Educational Intelligence Hub (`https://testbook.com/chandigarh-administration-clerk`, `syllabus-exam-pattern`, `salary-job-profile`, `eligibility-criteria`, `result`, `admit-card`; parsed syllabus and subject distribution).
- **Sources only status-checked, not read**:
  - `https://chandigarh.gov.in` (HTTP 200 OK)
  - `https://admser.chd.nic.in` (HTTP 200 OK)
  - `https://cdnbbsr.s3waas.gov.in/s3kv0440bde5d8abea38b16869cee3f89c/uploads/2025/01/2025021056.pdf` (HTTP 200 OK; 7th CPC Pay Matrix)
- **Links curl-checked**:
  - `https://chandigarh.gov.in/files/Updation26/dop26-73999-0404.pdf` → 200 OK
  - `https://chandigarh.gov.in/cadmin//uploads/1784198304_34eab8c0ef99027cfaba.pdf` → 200 OK
  - `https://chandigarh.gov.in/cadmin//uploads/1788349906_e28c62b2baf6092662eb.pdf` → 200 OK
  - `https://chandigarh.gov.in/cadmin//uploads/1777962677_87e7f9db6bd56d7e2f24.pdf` → 200 OK
  - `https://chandigarh.gov.in/public-notice` → 200 OK
  - `https://chandigarh.gov.in/orders-notifications` → 200 OK
