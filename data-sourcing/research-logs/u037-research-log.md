# Research Log: Unit 37 (u037) — Subordinate Boards & State Police Recruitment Boards — Uttar Pradesh

- **Unit ID**: `u037`
- **Batch ID**: `batch-5-subordinate-police-boards--uttar-pradesh`
- **Label**: `Subordinate Boards & State Police Recruitment Boards — Uttar Pradesh`
- **Timestamp**: 2026-09-12T02:58:00+05:30
- **Status**: Completed (10/10 exams researched, authored, and validated)
- **Reviewer**: Antigravity IDE Autonomous Agent

---

## 1. Summary of Unit Execution
Unit 37 covers the comprehensive suite of 10 state subordinate, ministerial, healthcare, and technical recruitment examinations conducted by the **Uttar Pradesh Subordinate Services Selection Commission (UPSSSC)**:
1. `upsssc-pet`: Uttar Pradesh Subordinate Services Preliminary Eligibility Test — **Tier A** (Mandatory gateway examination for all UP Group C recruitments)
2. `upsssc-lekhpal`: UPSSSC Rajasva & Chakbandi Lekhpal Examination — **Tier A** (Board of Revenue)
3. `upsssc-vdo`: UPSSSC Gram Vikas Adhikari & Gram Panchayat Adhikari Examination — **Tier A** (Rural Development & Panchayati Raj)
4. `upsssc-junior-assistant`: UPSSSC Combined Junior Assistant & Clerk Examination — **Tier B** (Civil Secretariats & Directorates)
5. `upsssc-forest-guard`: UPSSSC Forest Guard & Wildlife Guard Examination — **Tier B** (Forest & Wildlife Department)
6. `upsssc-je`: UPSSSC Combined Junior Engineer (Civil/Electrical/Mechanical) Examination — **Tier B** (PWD, Irrigation, RED, Awas Vikas)
7. `upsssc-anm`: UPSSSC Female Health Worker (ANM) Examination — **Tier B** (Directorate of Family Welfare)
8. `upsssc-supply-inspector`: UPSSSC Supply Inspector & Senior/Junior Assistant Examination — **Tier B** (Food & Civil Supplies Department)
9. `upsssc-tubewell-operator`: UPSSSC Tubewell Operator (Nalkoop Chalak) Examination — **Tier C** (Irrigation & Water Resources Department)
10. `upsssc-aso`: UPSSSC Assistant Statistical Officer (ASO) & ARO Examination — **Tier C** (Economics & Statistics Division, State Planning Institute)

All 10 dossiers were authored in strict compliance with `RESEARCH-GUIDE.md`, `EXECUTION-PLAN.md`, and project validation standards:
- **Comprehensive Depth**: Although Tiers B and C required only `exam_scheme` or `official_downloads`, all 10 dossiers were enriched across all five sections (`career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, and `official_downloads`) with verified statutory sources.
- **UP Revised Pay Rules 2016 Alignment**: All pay levels are mapped directly to the Uttar Pradesh Revised Pay Rules, 2016 (7th CPC Pay Matrix):
  - Pay Level 2: GP ₹1,900, Entry basic ₹19,900 (`upsssc-forest-guard`, `upsssc-tubewell-operator`).
  - Pay Level 3: GP ₹2,000, Entry basic ₹21,700 (`upsssc-pet`, `upsssc-lekhpal`, `upsssc-vdo`, `upsssc-junior-assistant`, `upsssc-anm`).
  - Pay Level 6: GP ₹4,200, Entry basic ₹35,400 (`upsssc-je`, `upsssc-supply-inspector`, `upsssc-aso`).
- **DA Constant**: Maintained uniformly at **58%** as of `2025-07-01` across all financial packages.
- **Validation**: Every file passed `node scripts/data-sourcing/validate-details.mjs` individually and in repository-wide testing with **0 errors** and **0 warnings**.

| Exam ID | Title | Tier | Jurisdiction | Entry Basic Pay | Primary Cycle | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `upsssc-pet` | Preliminary Eligibility Test | A | Uttar Pradesh | Level 3 (₹21,700 modal Group C) | PET 2021, 2022, 2023 | **PASS** |
| `upsssc-lekhpal` | Rajasva & Chakbandi Lekhpal Exam | A | Uttar Pradesh | Level 3 (₹21,700) | Advt. 01-Exam/2022 (8,085 vac) | **PASS** |
| `upsssc-vdo` | Gram Vikas & Gram Panchayat Adhikari | A | Uttar Pradesh | Level 3 (₹21,700) | Advt. 01-Exam/2023 & 02-Exam/2018 | **PASS** |
| `upsssc-junior-assistant` | Combined Junior Assistant & Clerk | B | Uttar Pradesh | Level 3 (₹21,700) | Advt. 09-Exam/2023 (5,512 vac) | **PASS** |
| `upsssc-forest-guard` | Forest Guard & Wildlife Guard | B | Uttar Pradesh | Level 2 (₹19,900) | Advt. 10-Exam/2023 & 05-Exam/2019 | **PASS** |
| `upsssc-je` | Combined Junior Engineer | B | Uttar Pradesh | Level 6 (₹35,400) | Advt. 08-Exam/2024 & 04-Exam/2018 | **PASS** |
| `upsssc-anm` | Female Health Worker (ANM) | B | Uttar Pradesh | Level 3 (₹21,700) | Advt. 09-Exam/2024 & 02-Exam/2021 | **PASS** |
| `upsssc-supply-inspector` | Supply Inspector & Senior/Jr Asst | B | Uttar Pradesh | Level 6 (₹35,400) | Advt. 03-Exam/2022 (76 vac) | **PASS** |
| `upsssc-tubewell-operator` | Tubewell Operator (Nalkoop Chalak) | C | Uttar Pradesh | Level 2 (₹19,900) | Advt. 15(3)/2016 (3,210 vac) | **PASS** |
| `upsssc-aso` | Assistant Statistical Officer (ASO) | C | Uttar Pradesh | Level 6 (₹35,400) | Advt. 07-Exam/2019 (904 vac) | **PASS** |

---

## 2. Detailed Exam Log

### 2.1 `upsssc-pet`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 populated)
- **Primary Sources & Notifications**:
  - UPSSSC Official Web Portal: `https://upsssc.gov.in/default.aspx` (confirmed live HTTP 200 via GET)
  - UPSSSC Preliminary Eligibility Test Framework & Examination Scheme Notification
  - PET 2021 Result Press Note (Advt. No. 04-Exam/2021, 28.10.2021)
  - PET 2022 Result Notification (Advt. No. 04-Exam/2022, 25.01.2023)
  - PET 2023 Result Notification (Advt. No. 07-Exam/2023, 29.01.2024)
- **Competition Benchmarks Verified**:
  - 2023 Cycle: 20,07,533 applicants; 12,58,017 candidates appeared.
  - 2022 Cycle: 37,58,209 applicants; 25,11,962 candidates appeared.
  - 2021 Cycle: 20,73,540 applicants; 17,99,052 candidates appeared.
- **Exam Pattern**: 100 MCQs, 100 marks, 120 minutes across 15 syllabus components; 0.25 negative marking.

### 2.2 `upsssc-lekhpal`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 populated)
- **Primary Sources & Notifications**:
  - UPSSSC Rajasva Lekhpal Notification (Advt. No. 01-Exam/2022)
  - UPSSSC Lekhpal Mains Revised Scheme & Syllabus Notice
  - UPSSSC Lekhpal DV Notification (27,455 shortlisted)
  - UPSSSC Lekhpal Final Selection Order dated 30.12.2023 recommending 7,897 candidates for 8,085 vacancies.
- **Career Ladder**: Rajasva Lekhpal (Level 3, ₹21,700) → Kanoongo / Revenue Inspector (Level 5, ₹29,200) → Naib Tehsildar (Level 9 / GP 4200/4800, ₹47,600 / ₹53,100) → Tehsildar (Level 10, ₹56,100) → SDM (Level 11).

### 2.3 `upsssc-vdo`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 populated)
- **Primary Sources & Notifications**:
  - UPSSSC Gram Panchayat Adhikari Notification (Advt. No. 01-Exam/2023 for 1,468 vacancies)
  - UPSSSC GPA Revised Scheme of Examination Notice (Part I: Panchayati Raj & Rural Schemes 65 marks; Part II: Computer 15 marks; Part III: UP GK 20 marks)
  - UPSSSC Combined VDO 2018 Re-Exam Notice (Advt. No. 02-Exam/2018 re-exam 26-27 June 2023, DV list 4,065 candidates).

### 2.4 `upsssc-junior-assistant`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 populated)
- **Primary Sources & Notifications**:
  - UPSSSC Combined Junior Assistant Notification (Advt. No. 09-Exam/2023 for 5,512 vacancies)
  - UPSSSC Junior Assistant Advt. No. 08-Exam/2022 Notification (1,262 vacancies)
  - UPSSSC Revised Scheme Notice: 100 MCQs (Hindi 30, Reasoning 15, GK 20, Computer 15, UP GK 20) + Qualifying Typing Test (Hindi 25 WPM, English 30 WPM).

### 2.5 `upsssc-forest-guard`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 populated)
- **Primary Sources & Notifications**:
  - UPSSSC Forest Guard & Wildlife Guard Notification (Advt. No. 10-Exam/2023 for 709 vacancies)
  - UPSSSC Advt. No. 05-Exam/2019 Notification, PST/PET Standard Orders, and Final Recommendation Order dated 14.02.2024 recommending 655 candidates.
  - Physical Standards: Male 25 km walk in 4 hours with 10 kg weight; Female 14 km walk in 4 hours.

### 2.6 `upsssc-je`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 populated)
- **Primary Sources & Notifications**:
  - UPSSSC Combined Junior Engineer (Civil) Notification (Advt. No. 08-Exam/2024 for 4,612 vacancies)
  - UPSSSC Advt. No. 04-Exam/2018 Final Selection List dated 28.11.2023 recommending 1,477 candidates.
  - Scheme: Specific Engineering Discipline (65 marks), Computer & IT (15 marks), UP GK (20 marks); Level 6 entry basic ₹35,400.

### 2.7 `upsssc-anm`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 populated)
- **Primary Sources & Notifications**:
  - UPSSSC Female Health Worker Notification (Advt. No. 09-Exam/2024 for 5,272 vacancies)
  - UPSSSC Swasthya Karyakartri Advt. No. 02-Exam/2021 Final Selection Order dated 06.08.2022 recommending 8,831 candidates for 9,212 vacancies.
  - Scheme: 100 questions on midwifery, maternal-child health, immunization, nutrition; Level 3 entry basic ₹21,700.

### 2.8 `upsssc-supply-inspector`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 populated)
- **Primary Sources & Notifications**:
  - UPSSSC Supply Inspector & Senior/Junior Assistant Notification (Advt. No. 03-Exam/2022 for 76 vacancies)
  - Written Exam held 17.07.2022; Final Selection Order dated 17.12.2022 recommending 76 candidates.
  - Scheme: General Studies (60 marks) + General Hindi (40 marks); Level 6 entry basic ₹35,400.

### 2.9 `upsssc-tubewell-operator`
- **Tier**: C, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 populated)
- **Primary Sources & Notifications**:
  - UPSSSC Nalkoop Chalak Notification (Advt. No. 15(3)/2016 for 3,210 vacancies in Irrigation Department)
  - Final Selection and Joining Order dated 18.02.2020 recommending 3,210 candidates.
  - Scheme: Hindi (25 marks), GK (15 marks), Technical ITI Trades (80 marks); Level 2 entry basic ₹19,900.

### 2.10 `upsssc-aso`
- **Tier**: C, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 populated)
- **Primary Sources & Notifications**:
  - UPSSSC Assistant Statistical Officer & Assistant Research Officer Notification (Advt. No. 07-Exam/2019 for 904 vacancies)
  - Final Selection List dated 15.02.2023 recommending 896 candidates.
  - Scheme: Hindi (30 marks), GK & Reasoning (30 marks), Specialized Subject - Economics/Statistics/Maths/Commerce (60 marks); Level 6 entry basic ₹35,400.

---

## 3. Verification and Quality Audit
- Validated each of the 10 dossiers individually via `node scripts/data-sourcing/validate-details.mjs public/exam-details/<id>.json`:
  - 10 checked, 0 errors, 0 warnings.
- Validated all 127 repository dossiers:
  - 127 checked, 0 errors, 0 warnings.
- Verified live responsiveness of official UPSSSC portal endpoints.
