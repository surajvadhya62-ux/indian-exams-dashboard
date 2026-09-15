# Research Log: Unit 57 (u057) — Other State-Jurisdiction Recruiters — Himachal Pradesh

- **Unit ID**: `u057`
- **Batch ID**: `batch-7-state-other--himachal-pradesh`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts — proposed addition, flag for confirmation) — Himachal Pradesh`
- **Timestamp**: 2026-09-12T21:55:00+05:30
- **Status**: Completed (1/1 exam researched, written, and validated)
- **Reviewer**: Antigravity Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 57 covers Himachal Pradesh's premier state-level teacher certification examination:
1. `hptet`: Himachal Pradesh Teacher Eligibility Test (HPTET) — **Tier B (Entrance)**

Primary research was conducted directly on the official portal of the Himachal Pradesh Board of School Education (HPBOSE), Dharamshala (`hpbose.org`). All populated fields have been verified against direct statutory notifications, official prospectuses, syllabus documents, and signed result declarations from the Departmental Examination Branch (DEB):

- **Statutory Authority & Framework**:
  - Conducted by HPBOSE Dharamshala on behalf of the Department of School Education, Government of Himachal Pradesh, in compliance with Section 23(1) of the Right of Children to Free and Compulsory Education (RTE) Act, 2009, and guidelines laid down by the National Council for Teacher Education (NCTE).
  - Essential qualification for appointment as teacher across primary, upper primary/elementary, language, and special education cadres in schools of the Himachal Pradesh Government and local authorities.
  - Certificate Validity: Valid for **lifetime** across all categories. Unlimited attempts permitted (candidates may re-appear to improve scores).
- **Categories & Specializations**:
  - The examination encompasses 10 distinct teacher cadres:
    1. JBT (Junior Basic Training / D.El.Ed.) TET
    2. TGT Arts TET
    3. TGT Non-Medical TET
    4. TGT Medical TET
    5. TGT Hindi TET
    6. TGT Sanskrit (Shastri) TET
    7. Punjabi Language Teacher TET
    8. Urdu Language Teacher TET
    9. Special Educator TET (Pre-Primary to Class V)
    10. Special Educator TET (Classes VI to XII)
- **Examination Scheme & Structure**:
  - Standalone objective OMR test: 150 Multiple Choice Questions (MCQs), 150 marks, 150 minutes duration (2 hours 30 minutes).
  - Bilingual test booklet in English and Hindi (except language subject domain components).
  - Negative Marking: **None** (no negative marking for incorrect answers).
  - Passing Standard: Minimum **60%** (90 marks out of 150) for Unreserved / General candidates; **55%** (82 marks out of 150) with a 5% relaxation for SC, ST, OBC, and Physically Handicapped (PHH) candidates belonging to Himachal Pradesh.
- **Official Competition Benchmarks (Verified from Signed Gazettes)**:
  - **June 2026 Cycle** (Result declared 22-08-2026, Notification No. 68866-872 signed by Secretary Ankush Sharma, HPAS):
    - Total Applied: **32,531** | Appeared: **29,900** | Qualified: **6,744** | Overall Pass Rate: **22.55%**
    - Cadre Breakdown: JBT (8,374 appeared / 4,369 passed / 52.17%); TGT Non-Medical (5,067 appeared / 969 passed / 19.14%); TGT Arts (9,647 appeared / 497 passed / 5.15%); TGT Hindi (2,013 appeared / 314 passed / 15.60%); TGT Sanskrit (1,296 appeared / 205 passed / 15.82%); TGT Medical (3,020 appeared / 161 passed / 5.33%); Special Educator Pre-Primary to V (320 appeared / 136 passed / 42.50%); Special Educator VI to XII (88 appeared / 82 passed / 93.18%); Punjabi (71 appeared / 9 passed / 12.68%); Urdu (4 appeared / 2 passed / 50.00%).
  - **November 2025 Cycle** (Result declared 02-01-2026, Notification No. 5204-5210 signed by Deputy Secretary Admin):
    - Total Applied: **36,571** | Appeared: **33,083** | Qualified: **8,459** | Overall Pass Rate: **25.57%**
    - Highlights: JBT (2,506 passed / 7,574 appeared / 33.1%); TGT Medical (1,743 passed / 4,309 appeared / 40.5%); TGT Arts (1,429 passed / 10,858 appeared / 13.2%); TGT Hindi (907 passed / 2,187 appeared / 41.5%); TGT Non-Med (741 passed / 5,778 appeared / 12.8%); Special Educator Primary (557 passed / 621 appeared / 89.7%); TGT Sanskrit (427 passed / 1,541 appeared / 27.7%); Special Educator VI-XII (144 passed / 150 appeared / 96.0%).
  - **November 2024 Cycle** (Result declared 13-01-2025, Notification No. 43471-476):
    - Total Applied: **35,031** | Appeared: **31,896** | Qualified: **11,026** | Overall Pass Rate: **34.57%**
    - Highlights: TGT Arts (3,554 passed / 11,760 appeared); JBT (2,492 passed / 5,674 appeared); TGT Non-Med (1,805 passed / 6,621 appeared); Language Teacher (1,156 passed / 2,286 appeared); TGT Medical (1,152 passed / 4,195 appeared); Shastri (862 passed / 1,293 appeared).
  - **June 2024 Cycle** (Result declared 03-09-2024, Notification No. 41984-989):
    - Total Applied: **41,675** | Appeared: **37,826** | Qualified: **4,882** | Overall Pass Rate: **12.91%**
- **Validation**:
  - Validated using `scripts/data-sourcing/validate-details.mjs`: **PASS (0 errors, 0 warnings)** across `hptet.json` and the complete repository suite of 225 dossiers.

| Exam ID | Title | Tier | Type | Entry Basic Pay | Primary Cycle | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `hptet` | Himachal Pradesh Teacher Eligibility Test (HPTET) | B | entrance | N/A (Entrance) | June 2026: 29,900 Appeared / 6,744 Qualified (22.55%) | **PASS** |

---

## 2. Detailed Exam Log: `hptet`

- **Tier**: B, **Exam Type**: entrance
- **Sections populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads` (exceeding Tier B required minimums; benchmarks fully populated with verified empirical stats)
- **Sections marked not_available**: None
- **Sections omitted**: `career_ladder`, `financial_package` (omitted per schema §5.4 for entrance examinations)
- **Sources OPENED and read this session**:
  - HPBOSE Official Portal: `https://hpbose.org` (HTTP/2 200 OK)
  - HPBOSE Notifications Hub: `https://hpbose.org/Notification.aspx` (HTTP/2 200 OK, 1,003,071 bytes; inspected all TET-related announcements, answer keys, and result releases)
  - HPBOSE Online Application Portal & Instructions: `https://hpbose.org/OnlineServices/CET/TET/Instructions.aspx` (HTTP/2 200 OK; extracted online application schedule, fee structure of ₹1,200 for General and ₹700 for SC/ST/OBC/PHH, correction window, and submission steps)
  - HPBOSE Official Notification regarding TET November-2026: `https://hpbose.org/Admin/Upload/Notification%20regarding%20TET.pdf` (Advt No. HB/(37)/TET November-2026/68934-938 dated 11-09-2026; downloaded and visually examined via PNG conversion; confirmed exam schedule 22-11-2026 to 06-12-2026, fee details, and subjects)
  - HPBOSE TET November-2026 Information Bulletin & Prospectus: `https://hpbose.org/Admin/Upload/PROSPEECTUSTETNOVEMBER2026FINAL.pdf` (28-page PDF, 1.75 MB; downloaded and read via `pdftotext` confirming 150 MCQs, 150 minutes, no negative marking, 60% / 55% qualifying thresholds, lifetime certificate validity, and detailed syllabus breakdowns for all 10 subjects)
  - HPBOSE June 2026 Result Declaration Notification: `https://hpbose.org/Admin/Upload/RESULT%20NOTIFICATION%20TET%20JUNE-2026.pdf` (Letter No. हि०शि०बो० (37) DEB/TET Exam JUNE-2026/68866-872 dated 22-08-2026; downloaded and visually transcribed via PNG conversion; confirmed 32,531 applied, 29,900 appeared, 6,744 passed, and subject-wise figures)
  - HPBOSE November 2025 Result Declaration Notification: `https://hpbose.org/Admin/Upload/NOTIFICATION%20&%20PRESS%20NOTE_1.pdf` (Letter No. हि०शि०बो० (37) DEB/ TET Exam- Nov-2025/ 5204-5210 dated 02-01-2026; downloaded and visually transcribed via PNG conversion; confirmed 36,571 applied, 33,083 appeared, 8,459 passed, and subject-wise figures)
  - HPBOSE June 2025 Result Declaration Notification: `https://hpbose.org/Admin/Upload/Noti.T.R.13.08.2025.pdf` (Letter dated 13-08-2025 signed by Secretary Dr. Major Vishal Sharma; downloaded and visually transcribed via PNG conversion; confirmed 34,599 applied, 31,506 appeared, 10,880 passed)
  - HPBOSE November 2024 Result Declaration Notification: `https://hpbose.org/Admin/Upload/Noti.TET.13.01.2025.pdf` (Letter No. हि०शि०बो० (37) DEB/ TET Exam-NOV-2024/ 43471-476 dated 13-01-2025; downloaded and visually transcribed via PNG conversion; confirmed 35,031 applied, 31,896 appeared, 11,026 passed)
  - HPBOSE June 2024 Result Declaration Notification: `https://hpbose.org/Admin/Upload/Noti.TET.03.09.2024.pdf` (Letter No. हि०शि०बो० (37) DEB/ TET Exam- June-2024/ 41984-989 dated 03-09-2024; downloaded and visually transcribed via PNG conversion; confirmed 41,675 applied, 37,826 appeared, 4,882 passed)
  - HPBOSE June 2026 Final Answer Keys: `https://hpbose.org/Admin/Upload/FINAL_ANS_KEY_TET_JUNE_2026.pdf` (Confirmed live HTTP 200 OK, 12,333,918 bytes)
  - HPBOSE June 2026 Exam Schedule Notification: `https://hpbose.org/Admin/Upload/NOTITETJUNE2026.pdf` (Confirmed live HTTP 200 OK, 832,717 bytes)
- **Sources only status-checked, not read**: None
- **Links curl-checked**:
  - `https://hpbose.org/Admin/Upload/Notification%20regarding%20TET.pdf` -> HTTP/2 200 OK (758,326 bytes)
  - `https://hpbose.org/Admin/Upload/PROSPEECTUSTETNOVEMBER2026FINAL.pdf` -> HTTP/2 200 OK (1,756,871 bytes)
  - `https://hpbose.org/Admin/Upload/RESULT%20NOTIFICATION%20TET%20JUNE-2026.pdf` -> HTTP/2 200 OK (996,878 bytes)
  - `https://hpbose.org/Admin/Upload/FINAL_ANS_KEY_TET_JUNE_2026.pdf` -> HTTP/2 200 OK (12,333,918 bytes)
  - `https://hpbose.org/Admin/Upload/NOTIFICATION%20&%20PRESS%20NOTE_1.pdf` -> HTTP/2 200 OK (469,566 bytes)
  - `https://hpbose.org/Admin/Upload/Noti.T.R.13.08.2025.pdf` -> HTTP/2 200 OK (370,711 bytes)
  - `https://hpbose.org/Admin/Upload/Noti.TET.13.01.2025.pdf` -> HTTP/2 200 OK (454,196 bytes)
  - `https://hpbose.org/Admin/Upload/Noti.TET.03.09.2024.pdf` -> HTTP/2 200 OK (590,918 bytes)
  - `https://hpbose.org/Admin/Upload/NOTITETJUNE2026.pdf` -> HTTP/2 200 OK (832,717 bytes)
  - `https://hpbose.org/OnlineServices/CET/TET/Instructions.aspx` -> HTTP/2 200 OK (16,284 bytes)
  - `https://hpbose.org/Notification.aspx` -> HTTP/2 200 OK (1,003,071 bytes)
  - `https://hpbose.org` -> HTTP/2 200 OK (50,310 bytes)
- **Could NOT confirm, and why**: None. All figures, schedules, fee tiers, and percentages are derived directly from primary official signed notifications.
- **Confidence downgrades made, and why**: None. All populated figures are `verified` with direct links to primary official documents.
