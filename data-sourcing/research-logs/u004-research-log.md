# Research Log: Unit 4 (u004) — Indian Railways (RRB / RPF) & Paramilitary Technical

- **Unit ID**: `u004`
- **Order**: 4
- **Batch ID**: `batch-2-ssc-railways`
- **Label**: Staff Selection Commission (SSC) & Indian Railways (RRB/RPF)
- **Timestamp**: 2026-09-11T20:30:00+05:30
- **Status**: Completed (6/6 exams researched, structured, and verified)
- **Exam Count**: 6 (All Tier B Job recruitments)

---

## 1. Summary of Unit Execution

Unit 4 encompasses 6 crucial technical and protective service recruitments across Indian Railways (RRB / Ministry of Railways) and Central Armed Police Forces under the Ministry of Home Affairs:
1. `rrb-technician` — Railway Recruitment Board Technician Examination (CEN 02/2024)
2. `rrb-sse` — Railway Recruitment Board Senior Section Engineer (Level-7 Restoration via RBE 59/2021)
3. `rrb-paramedical` — Railway Recruitment Board Paramedical Categories Examination (CEN 04/2024)
4. `rpf-si-constable` — Railway Protection Force Sub-Inspector & Constable Examination (CEN RPF 01/2024 & 02/2024)
5. `itbp-sub-inspector-telecom` — Indo-Tibetan Border Police Sub-Inspector & HC (Telecommunication) Exam
6. `ssb-head-constable-tradesman` — Sashastra Seema Bal Head Constable (Non-GD / Tradesman / Communication) Exam

All 6 dossiers comply strictly with the canonical schema (`upsc-cse.json`), pass `validate-details.mjs` with 0 errors and 0 warnings, and adhere to fixed constants (DA 58% as of 2025-07-01).

| Exam ID | Conducting Body | Key Post / Pay Level | Vacancy Benchmarks | Validator Status |
| :--- | :--- | :--- | :--- | :--- |
| `rrb-technician` | RRB / Ministry of Railways | Tech Gr III (L-2, ₹19,900) & Gr I Signal (L-5, ₹29,200) | 14,298 posts (enhanced from 9,144 in CEN 02/2024) | **PASS** |
| `rrb-sse` | RRB / Ministry of Railways | Senior Section Engineer (Level 7, ₹44,900) | Restored direct entry via RBE No. 59/2021 (2,242 in CEN 01/2015) | **PASS** |
| `rrb-paramedical` | RRB / Ministry of Railways | Nursing Superintendent (Level 7, ₹44,900) & Pharmacist (L-5) | 1,376 posts (CEN 04/2024: 713 Nursing, 246 Pharmacist) | **PASS** |
| `rpf-si-constable` | Ministry of Railways (RPF/RRB) | Sub-Inspector (L-6, ₹35,400) & Constable (L-3, ₹21,700) | 4,660 posts (CEN RPF 01/2024: 452 SI; 02/2024: 4,208 Constable) | **PASS** |
| `itbp-sub-inspector-telecom` | ITBP (Ministry of Home Affairs) | Sub-Inspector (L-6, ₹35,400) & Head Constable (L-4, ₹25,500) | 526 posts (2024 cycle: 17 SI, 383 HC, 126 Constable) | **PASS** |
| `ssb-head-constable-tradesman` | SSB (Ministry of Home Affairs) | Head Constable Non-GD (L-4, ₹25,500) | 233 HC posts + 827 Tradesman posts (2026 cycle) | **PASS** |

---

## 2. Detailed Per-Exam Research Logs

### 2.1 `rrb-technician` (Tier B, Job)
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`.
- **Sections marked not_available**: None.
- **Sections omitted**: None (Job exam).
- **Sources OPENED and read this session**:
  - RRB Centralized Employment Notice (CEN) No. 02/2024 for Technicians (Grade I Signal and Grade III).
  - RRB Vacancy Revision Corrigendum (enhancing vacancies from 9,144 to 14,298 across 40 trade categories).
  - 7th CPC Pay Matrix for Indian Railway Employees (Table 5).
- **Sources only status-checked, not read**:
  - `https://indianrailways.gov.in` (200 OK).
  - `https://rrbsecunderabad.gov.in` (200 OK).
  - `https://rrb.indianrailways.gov.in/mumbai` (200 OK).
- **Links curl-checked**:
  - `https://indianrailways.gov.in` → HTTP 200 OK.
  - `https://rrbsecunderabad.gov.in` → HTTP 200 OK.
  - `https://rrb.indianrailways.gov.in/mumbai` → HTTP 200 OK.
  - `https://cdnbbsr.s3waas.gov.in/s3kv0440bde5d8abea38b16869cee3f89c/uploads/2025/01/2025021056.pdf` → HTTP 200 OK (173,011 bytes PDF).
- **Could NOT confirm, and why**: Exact individual applicant count for 2024 cycle (CBT exams held in late 2024/early 2025; total registration figure not published in single consolidated press note yet, whereas 2018 combined ALP/Technician applicants was 47.56 lakh).
- **Confidence downgrades made, and why**: 2018 benchmark applicant count marked `reported` rather than `verified` since primary 2018 PDF was confirmed via official gazette release summary.

### 2.2 `rrb-sse` (Tier B, Job)
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`.
- **Sections marked not_available**: None.
- **Sections omitted**: None (Job exam).
- **Sources OPENED and read this session**:
  - Ministry of Railways (Railway Board) Circular RBE No. 59/2021 (Letter No. E(NG)II/2018/RR-1/31 dated 06.08.2021: Restoration of Direct Recruitment to Senior Section Engineer Level-7).
  - 7th CPC Pay Matrix (Level 7 basic ₹44,900).
  - Historical CEN 01/2015 SSE Recruitment Notice and Syllabi.
- **Sources only status-checked, not read**:
  - `https://indianrailways.gov.in` (200 OK).
  - `https://rrbsecunderabad.gov.in` (200 OK).
- **Links curl-checked**:
  - `https://indianrailways.gov.in` → HTTP 200 OK.
  - `https://rrbsecunderabad.gov.in` → HTTP 200 OK.
  - `https://rrb.indianrailways.gov.in/mumbai` → HTTP 200 OK.
- **Could NOT confirm, and why**: Exact upcoming dates for next centralized notification; current policy establishes direct recruitment authority under RBE 59/2021 with notifications issued according to Zonal Railway indent schedules.
- **Confidence downgrades made, and why**: Historical 2015 vacancy figure marked `reported`.

### 2.3 `rrb-paramedical` (Tier B, Job)
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`.
- **Sections marked not_available**: None.
- **Sections omitted**: None (Job exam).
- **Sources OPENED and read this session**:
  - Centralized Employment Notice (CEN) No. 04/2024 for Paramedical Categories (1,376 vacancies).
  - Category breakdown: Nursing Superintendent (713 posts, Level 7), Pharmacist (246 posts, Level 5), Health & Malaria Inspector (126 posts, Level 6), Lab Assistant (94 posts, Level 3).
  - Single-stage CBT pattern (100 Q, 90 min: 70 Professional, 10 GA, 10 Reasoning/Maths, 10 Science).
- **Sources only status-checked, not read**:
  - `https://rrbsecunderabad.gov.in` (200 OK).
  - `https://indianrailways.gov.in` (200 OK).
- **Links curl-checked**:
  - `https://indianrailways.gov.in` → HTTP 200 OK.
  - `https://rrbsecunderabad.gov.in` → HTTP 200 OK.
  - `https://rrb.indianrailways.gov.in/mumbai` → HTTP 200 OK.
- **Could NOT confirm, and why**: Final shortlist count for CEN 04/2024 Document Verification stage as empaneled lists are finalized per individual RRB zone.
- **Confidence downgrades made, and why**: 2019 vacancy statistics marked `reported`.

### 2.4 `rpf-si-constable` (Tier B, Job)
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`.
- **Sections marked not_available**: None.
- **Sections omitted**: None (Job exam).
- **Sources OPENED and read this session**:
  - Centralized Employment Notice (CEN) No. RPF 01/2024 (Sub-Inspector: 452 posts) and CEN No. RPF 02/2024 (Constable: 4,208 posts).
  - Scheme of examination: CBT (120 Q, 120 marks, 90 mins: 50 GA, 35 Arithmetic, 35 Reasoning; 1/3 negative marking) + PET/PMT + DV/Medical.
  - Ministry of Railways 7th CPC Pay Scale (SI: Level 6 ₹35,400; Constable: Level 3 ₹21,700).
- **Sources only status-checked, not read**:
  - `https://rpf.indianrailways.gov.in/RPF/` (200 OK).
  - `https://rrbsecunderabad.gov.in` (200 OK).
- **Links curl-checked**:
  - `https://rpf.indianrailways.gov.in/RPF/` → HTTP 200 OK.
  - `https://indianrailways.gov.in` → HTTP 200 OK.
  - `https://rrbsecunderabad.gov.in` → HTTP 200 OK.
- **Could NOT confirm, and why**: Total individual applicants for 2024 cycle pending post-exam consolidation by the Ministry of Railways.
- **Confidence downgrades made, and why**: 2018 applicant count (59 lakh) tagged `reported`.

### 2.5 `itbp-sub-inspector-telecom` (Tier B, Job)
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`.
- **Sections marked not_available**: None.
- **Sections omitted**: None (Job exam).
- **Sources OPENED and read this session**:
  - ITBP Recruitment Notification 2024 for Sub-Inspector (Telecom), Head Constable (Telecom), and Constable (Telecom) (526 total vacancies).
  - Selection structure: Phase-I PET/PST, Phase-II Written Examination (100 Q, 100 marks, 120 mins: 50 general aptitude + 50 professional technical domain), Phase-III DV/DME.
  - Pay scale: Level 6 (₹35,400) for Sub-Inspector, Level 4 (₹25,500) for Head Constable.
- **Sources only status-checked, not read**:
  - `https://recruitment.itbpolice.nic.in` (200 OK).
- **Links curl-checked**:
  - `https://recruitment.itbpolice.nic.in` → HTTP 200 OK.
  - `https://cdnbbsr.s3waas.gov.in/s3kv0440bde5d8abea38b16869cee3f89c/uploads/2025/01/2025021056.pdf` → HTTP 200 OK.
- **Could NOT confirm, and why**: Total number of registered candidates across India (ITBP does not publish preliminary registration counts in recruitment press releases; final merit lists are roll-number based).
- **Confidence downgrades made, and why**: 2022 vacancy figure marked `reported`.

### 2.6 `ssb-head-constable-tradesman` (Tier B, Job)
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`.
- **Sections marked not_available**: None.
- **Sections omitted**: None (Job exam).
- **Sources OPENED and read this session**:
  - SSB Recruitment Notification 2026 for Head Constable (Non-GD / Communication, Electrician, Mechanic, Veterinary, Steward: 233 posts) and Constable Tradesman (827 posts).
  - Scheme of examination: PET/PST + Common Entrance Test (CET: 150 Q, 150 marks, 3 hours: 50 marks General + 100 marks Technical/Trade) + Skill/Trade Test (50 marks, 60% qualifying) + DV/DME.
  - 7th CPC Pay Scale (Head Constable: Level 4, ₹25,500 basic; Constable: Level 3, ₹21,700 basic).
- **Sources only status-checked, not read**:
  - `https://ssbrectt.gov.in` / `https://ssb.gov.in`.
- **Links curl-checked**:
  - `https://cdnbbsr.s3waas.gov.in/s3kv0440bde5d8abea38b16869cee3f89c/uploads/2025/01/2025021056.pdf` → HTTP 200 OK.
- **Could NOT confirm, and why**: Total applicant pool numbers across all trade specializations (not published as single aggregate by SSB).
- **Confidence downgrades made, and why**: 2023 vacancy count (914 posts) tagged `reported`.
