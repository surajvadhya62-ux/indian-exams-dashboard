# Research Log: Unit 74 (u074) — Other State-Jurisdiction Recruiters — Uttarakhand

- **Unit ID**: `u074`
- **Batch ID**: `batch-7-state-other--uttarakhand`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts — proposed addition, flag for confirmation) — Uttarakhand`
- **Timestamp**: 2026-09-13T14:55:00+05:30
- **Status**: Completed (1/1 exam researched, written, and validated)
- **Reviewer**: Antigravity Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 74 covers statutory teacher eligibility certification for the state of Uttarakhand:
1. `utet`: Uttarakhand Teacher Eligibility Test (UTET I & II) — **Tier B (Entrance)**

All populated facts and figures were derived directly from official government orders, detailed examination notifications, syllabi frameworks, result statistical press releases, and question paper archives hosted by the Uttarakhand Board of School Education (UBSE), Ramnagar (Nainital) on `https://ubse.uk.gov.in` and `https://ukutet.com`:

- **Statutory Framework & Nature of Examination**:
  - Mandated under Section 23(1) of the Right of Children to Free and Compulsory Education (RTE) Act, 2009, and guidelines laid down by the National Council for Teacher Education (NCTE).
  - Categorized as `exam_type: "entrance"`. Per project rules (§5.4 and `RESEARCH-GUIDE.md`), `career_ladder` and `financial_package` are strictly omitted (absent keys, not empty arrays/objects) as TET is a qualifying certification examination and does not itself constitute employment or recruit into a direct pay scale.
- **Statutory Certificate Validity**:
  - Governed by Government of Uttarakhand School Education Department Office Order No. `889/XXIV-A-1/2021-15/2011 Vol-I` dated 28.06.2021 (signed by Secretary R. Meenakshi Sundaram).
  - In line with NCTE guidelines dated 09.06.2021 and Ministry of Education, Govt. of India directives dated 07.06.2021, the validity of the UTET certificate has been extended from 7 years to **Lifetime**, effective retrospectively from 11.02.2011.
- **Examination Scheme & Structure**:
  - **UTET-I (Primary Level, Classes I to V)**: 150 objective MCQs, 150 marks, 150 minutes (2.5 hours). Comprises Child Development & Pedagogy (30 marks), Language-I (30 marks), Language-II (30 marks), Mathematics (30 marks), and Environmental Studies (30 marks).
  - **UTET-II (Upper Primary / Elementary Level, Classes VI to VIII)**: 150 objective MCQs, 150 marks, 150 minutes (2.5 hours). Comprises Child Development & Pedagogy (30 marks), Language-I (30 marks), Language-II (30 marks), and a Discipline Elective of 60 marks: Mathematics & Science (30 Math + 30 Science) OR Social Studies / Social Sciences (History, Geography, Social & Political Life, and Pedagogy).
  - No negative marking in either paper.
  - Qualifying criteria: General / Unreserved: 60% (90/150 marks); OBC / PwD / Ex-Servicemen / DFF: 50% (75/150 marks); SC / ST: 40% (60/150 marks).
- **Verified Competition Benchmarks**:
  - **2025 Cycle**: Primary numerical release signed by Secretary UBSE dated 12.11.2025:
    - UTET-I: 14,595 registered, 11,949 appeared, 4,564 qualified (38.20% pass rate).
    - UTET-II: 24,517 registered, 20,803 appeared, 4,153 qualified (19.96% pass rate).
    - Total: 39,112 registered, 32,752 appeared, 8,717 qualified (26.61% overall pass rate). Conducted on 27.09.2025 in 29 cities across 94 exam centers.
  - **2026 Cycle**: Exam scheduled for 29.09.2026 across 29 cities in Uttarakhand; application window 14.07.2026 to 03.08.2026 on `www.ukutet.com`.
- **Validation**:
  - Validated via `scripts/data-sourcing/validate-details.mjs`: **PASS (0 errors, 0 warnings)** across all 251 dossier files in the repository.
  - Frontend production build verified clean via `npm run build` (Vite build successful).

---

## 2. Summary Table

| Exam ID | Title | Tier | Type | Entry Basic / Scale | Primary Cycle / Benchmarks | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| [`utet.json`](file:///Users/surajvadhya/Documents/kimi/workspace/indian-exams-dashboard/public/exam-details/utet.json) | Uttarakhand Teacher Eligibility Test (UTET I & II) | B | entrance | N/A (Entrance) | 39,112 Registered, 32,752 Appeared, 8,717 Qualified (2025 Cycle) | **PASS** |

---

## 3. Detailed Exam Log

### `utet` (Tier B, entrance)
- **Sections populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads` (exceeding Tier B required minimum of `exam_scheme` and `official_downloads` by including verified multi-year competition benchmarks).
- **Sections marked not_available**: None.
- **Sections omitted (entrance only)**: `career_ladder`, `financial_package` (strictly omitted per §5.4 and `RESEARCH-GUIDE.md`).
- **Sources OPENED and read this session**:
  - UBSE UTET-I & II 2025 Official Result Press Notification (`20251112138018775.pdf`, 1 page, read via Apple Vision OCR and image inspection, confirming 14,595 registered, 11,949 appeared, 4,564 qualified [38.20%] for UTET-I; 24,517 registered, 20,803 appeared, 4,153 qualified [19.96%] for UTET-II; total 39,112 registered, 32,752 appeared, 8,717 qualified; exam on 27.09.2025 in 29 cities across 94 centers; result declared on 12.11.2025 signed by Secretary UBSE).
  - UBSE UTET 2026 Detailed Notification / Vigyapti No. 01/77-81/2026-27 dated 14.07.2026 (`202607151232929937.pdf`, read via Vision OCR and image inspection, confirming exam on 29.09.2026, UTET-I 10:00 AM–12:30 PM, UTET-II 02:00 PM–04:30 PM, application fees ₹600/₹1000 General/OBC and ₹300/₹500 SC/ST/PwD, online application window 14.07.2026–03.08.2026 on `ukutet.com`).
  - Government of Uttarakhand Certificate Lifetime Validity Office Order No. `889/XXIV-A-1/2021-15/2011 Vol-I` dated 28.06.2021 (`20250922129301683.pdf`, signed by Secretary R. Meenakshi Sundaram, confirming lifetime certificate validity with retrospective effect from 11.02.2011).
  - UBSE UTET Structure and Content of Syllabus Document (`202507111495469767.pdf` / `202505271003568867.pdf`, 8 pages, confirming 150 MCQs, 150 marks, 150 mins per paper, Child Development & Pedagogy 30 Qs/marks, Language-I 30 Qs/marks, Language-II 30 Qs/marks, Mathematics 30 Qs/marks, EVS 30 Qs/marks for Paper-I; Mathematics & Science 60 Qs/marks or Social Studies 60 Qs/marks for Paper-II).
  - UBSE UTET 2026 Examination Notice & Schedule (`202607151997735215.pdf`).
  - UBSE UTET 2026 Scribe Information Bulletin (`202608272058632683.pdf`).
  - UBSE UTET 2023 Result Notification No. `06/448-50/2023-24` dated 28.11.2023 (`202505271717377374.pdf`).
  - UBSE UTET 2024 Answer Key & Objection Notification (`20250527273939837.pdf`).
  - UBSE UTET 2025 Final Answer Key Paper-I & Paper-II (`202511121701447404.pdf`, `20251112723281827.pdf`).
  - UBSE Previous Year Question Paper Booklets (2023 Booklet 1: `20250920332583548.pdf`, 2023 Booklet 2: `20250920972321550.pdf`).
- **Sources only status-checked, not read**:
  - `https://ubse.uk.gov.in` (HTTP 200 OK)
  - `https://ubse.uk.gov.in/document-category/utet/` (HTTP 200 OK)
  - `https://ukutet.com` (HTTP 200 OK)
- **Links curl-checked**:
  - `https://ubse.uk.gov.in` -> HTTP 200 OK
  - `https://ubse.uk.gov.in/document-category/utet/` -> HTTP 200 OK
  - `https://ukutet.com` -> HTTP 200 OK
  - `https://cdnbbsr.s3waas.gov.in/s32dbf21633f03afcf882eaf10e4b5caca/uploads/2026/07/202607151232929937.pdf` -> HTTP 200 OK (390,369 bytes)
  - `https://cdnbbsr.s3waas.gov.in/s32dbf21633f03afcf882eaf10e4b5caca/uploads/2026/07/202607151997735215.pdf` -> HTTP 200 OK (237,878 bytes)
  - `https://cdnbbsr.s3waas.gov.in/s32dbf21633f03afcf882eaf10e4b5caca/uploads/2025/07/202507111495469767.pdf` -> HTTP 200 OK (3,925,710 bytes)
  - `https://cdnbbsr.s3waas.gov.in/s32dbf21633f03afcf882eaf10e4b5caca/uploads/2025/09/20250922129301683.pdf` -> HTTP 200 OK (418,102 bytes)
  - `https://cdnbbsr.s3waas.gov.in/s32dbf21633f03afcf882eaf10e4b5caca/uploads/2025/11/20251112138018775.pdf` -> HTTP 200 OK (897,423 bytes)
  - `https://cdnbbsr.s3waas.gov.in/s32dbf21633f03afcf882eaf10e4b5caca/uploads/2025/11/202511121701447404.pdf` -> HTTP 200 OK (3,171,361 bytes)
  - `https://cdnbbsr.s3waas.gov.in/s32dbf21633f03afcf882eaf10e4b5caca/uploads/2025/11/20251112723281827.pdf` -> HTTP 200 OK (3,190,467 bytes)
  - `https://cdnbbsr.s3waas.gov.in/s32dbf21633f03afcf882eaf10e4b5caca/uploads/2025/09/20250920332583548.pdf` -> HTTP 200 OK (9,211,904 bytes)
  - `https://cdnbbsr.s3waas.gov.in/s32dbf21633f03afcf882eaf10e4b5caca/uploads/2025/09/20250920972321550.pdf` -> HTTP 200 OK (7,530,266 bytes)
- **Could NOT confirm, and why**:
  - Registered vs appeared breakdown for historical 2023 cycle (UBSE published the result declaration press note affirming publication on 28.11.2023, but candidate-level aggregates were archived on the roll-number lookup service; left as `null` rather than estimated).
- **Confidence downgrades made, and why**: None. All populated 2025 benchmark figures are `verified` directly from the primary UBSE numerical result release.
