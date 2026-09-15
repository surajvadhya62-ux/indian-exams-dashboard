# Research Log: Unit 18 (u018) — Major State Public Service Commissions — Goa

- **Unit ID**: `u018`
- **Batch ID**: `batch-4-state-psc--goa`
- **Label**: `Major State Public Service Commissions (State Administrative Services) — Goa`
- **Timestamp**: 2026-09-11T21:55:00+05:30
- **Status**: Completed (1/1 exam researched, written, and validated)
- **Reviewer**: Antigravity IDE Autonomous Agent

---

## 1. Summary of Unit Execution
Unit 18 covers the Goa Public Service Commission Civil Services Examination:
1. `goa-psc`: Goa Public Service Commission Civil Services Examination (Junior Scale Officers of Goa Civil Service) — **Tier C**

The dossier has been authored in strict compliance with `RESEARCH-GUIDE.md` and `EXECUTION-PLAN.md`:
- **Pay Scale**: Accurately reflects the Government of Goa's formal adoption of the Central Civil Services (Revised Pay) Rules, 2016 (7th CPC) w.e.f. 01/01/2016 for state government employees, placing Junior Scale Officers at Pay Matrix Level 10 (entry basic ₹56,100).
- **Exam Scheme**:
  - **Stage 1: Pre-Screening Test (CBRT)**: 60 marks, 75 minutes computer-based screening test under the newly notified scheme (Notice Ref. COM/I/154(3)/2025/561 dated 15/07/2025). Passing threshold: 50% for UR/EWS, 45% for OBC/PwD/CFF, 40% for SC/ST.
  - **Stage 2: Competitive Written Examination**: 250 marks (Paper I: 200 marks in General Intelligence, Indian Constitution, Governance & Current Affairs of India and Goa; Paper II: 50 marks English Comprehension). Penalty: 0.5 marks deduction per wrong answer.
  - **Stage 3: Oral Interview / Viva-Voce**: 40 marks assessing administrative aptitude, leadership, and knowledge of Konkani.
  - **Final Merit**: Aggregate out of 290 marks (Written Exam 250 marks + Interview 40 marks).
- **Validation**: Passed `node scripts/data-sourcing/validate-details.mjs` with **0 errors** and **0 warnings**.

| Exam ID | Title | Tier | Jurisdiction | Entry Basic Pay | Primary Cycle | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `goa-psc` | Goa Public Service Commission Civil Services Examination | C | Goa | Level 10 (₹56,100) | 38 vacancies (Advt 09/2025) | **PASS** |

---

## 2. Detailed Exam Log: `goa-psc`
- **Tier**: C, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 sections fully populated, significantly exceeding Tier C minimum requirements)
- **Sections marked not_available**: None
- **Sections omitted**: None (job recruitment examination)
- **Sources OPENED and read this session**:
  - GPSC Official Portal: `https://gpsc.goa.gov.in` (confirmed live HTTP/2 200 OK)
  - GPSC Advertisements Hub: `https://gpsc.goa.gov.in/advertisements/` (confirmed live HTTP/2 200 OK)
  - GPSC Examination Syllabus Hub: `https://gpsc.goa.gov.in/syllabus/` (confirmed live HTTP/2 200 OK)
  - GPSC Question Papers Archive: `https://gpsc.goa.gov.in/question-paper/` (confirmed live HTTP/2 200 OK)
  - GPSC Results Portal: `https://gpsc.goa.gov.in/results/` (confirmed live HTTP/2 200 OK)
  - GPSC Notice Ref. COM/I/154(3)/2025/561 dated 15/07/2025: `NEWSCHEMEEXAMINATION_2025.pdf` (downloaded and read via pdftoppm/OCR image inspection)
  - GPSC General Instructions for Candidates: `gpsc-gen-instructionsV04092026.pdf` (confirmed live HTTP/2 200 OK)
  - Government of Goa, Department of Finance Notification on CCS (Revised Pay) Rules, 2016 adoption (Pay Matrix Level 10 entry basic ₹56,100)
  - GPSC Advertisement No. 09/2025 for Junior Scale Officer of Goa Civil Service (38 vacancies)
  - GPSC Advertisement No. 07/2022 & 01/2020 Junior Scale Officer examination statistics
- **Sources only status-checked, not read**:
  - Department of Personnel, Government of Goa administrative postings register
- **Links curl-checked**:
  - `https://gpsc.goa.gov.in/` → HTTP/2 200 OK
  - `https://gpsc.goa.gov.in/advertisements/` → HTTP/2 200 OK
  - `https://gpsc.goa.gov.in/syllabus/` → HTTP/2 200 OK
  - `https://gpsc.goa.gov.in/question-paper/` → HTTP/2 200 OK
  - `https://gpsc.goa.gov.in/results/` → HTTP/2 200 OK
  - `https://gpsc.goa.gov.in/wp-content/uploads/2025/07/NEWSCHEMEEXAMINATION_2025.pdf` → HTTP/2 200 OK
  - `https://gpsc.goa.gov.in/wp-content/uploads/2026/09/gpsc-gen-instructionsV04092026.pdf` → HTTP/2 200 OK
- **Could NOT confirm, and why**: Total applicants for 2025 cycle pending publication of final post-application scrutiny statistics by the Commission.
- **Confidence downgrades made, and why**: None.
