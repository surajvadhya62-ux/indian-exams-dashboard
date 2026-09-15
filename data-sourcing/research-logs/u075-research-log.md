# Research Log: Unit 75 (u075) — Other State-Jurisdiction Recruiters — West Bengal

- **Unit ID**: `u075`
- **Batch ID**: `batch-7-state-other--west-bengal`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts — proposed addition, flag for confirmation) — West Bengal`
- **Timestamp**: 2026-09-13T14:55:00+05:30
- **Status**: Completed (4/4 exams researched, written, and validated)
- **Reviewer**: Antigravity Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 75 encompasses major statutory examination boards, state public power distribution utilities, professional entrance bodies, and health recruitment authorities across West Bengal:

1. `wbtet`: West Bengal Primary Teacher Eligibility Test (WBTET) — **Tier A (Entrance)**
2. `wbhrb-staff-nurse`: West Bengal Health Recruitment Board (WBHRB) Staff Nurse Grade II Exam — **Tier B (Job)**
3. `wbsedcl-junior-engineer`: West Bengal State Electricity Distribution Company Limited (WBSEDCL) Junior Engineer (Electrical) Grade-II Exam — **Tier B (Job)**
4. `wbjee`: West Bengal Joint Entrance Examination (Engineering / Technology / Pharmacy / Architecture) — **Tier C (Entrance)**

### Pay Architecture & Statutory Standards:
- **West Bengal Services (Revision of Pay and Allowances) Rules, 2019 (ROPA 2019)**:
  - `wbhrb-staff-nurse`: Recruited into Pay Level 9 (Scale ₹28,900 – ₹74,500, Entry Basic: **₹29,800**).
- **West Bengal State Electricity Distribution Company Limited (ROPA-2020 Pay Matrix)**:
  - `wbsedcl-junior-engineer`: Operates under autonomous state power utility bipartite wage regulations under Level 6 of ROPA-2020 (Scale ₹36,800 – ₹1,06,700, Entry Basic: **₹36,800**).
- **Standardized DA Constant**:
  - All job dossiers implement the repository-wide canonical constant of **58% DA** as of `2025-07-01` (`da_percent_as_of_review: 58`, `da_as_of: "2025-07-01"`).
- **Entrance Examination Structure**:
  - `wbtet` and `wbjee` are qualifying / entrance examinations; `career_ladder` and `financial_package` are omitted in accordance with `RESEARCH-GUIDE.md` specifications.

---

## 2. Examination Overview Table

| Exam ID | Title | Tier | Type | Entry Basic / Scale | Exam Pattern Summary | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `wbtet` | West Bengal Primary Teacher Eligibility Test (WBTET) | A | entrance | N/A (Entrance) | OMR: 150 MCQs, 150 marks, 150 mins, no negative marking (5 sections of 30m each) | **PASS** |
| `wbhrb-staff-nurse` | WBHRB Staff Nurse Grade II Exam | B | job | Level 9 (₹29,800) | 100-mark framework: Academic (75m) + Experience (10m) + Interview & Dictation (15m) | **PASS** |
| `wbsedcl-junior-engineer` | WBSEDCL Junior Engineer (Electrical) Gr.-II | B | job | Level 6 (₹36,800) | Stage 1 CBT: 85 MCQs, 85m, 90 mins, -0.33 negative + Stage 2 Interview: 15m | **PASS** |
| `wbjee` | West Bengal Joint Entrance Examination | C | entrance | N/A (Entrance) | Offline OMR: Paper I Maths (100m) & Paper II Physics/Chemistry (100m) across 3 question categories | **PASS** |

---

## 3. Detailed Exam Research Log

### 1. `wbtet` (Tier A, entrance)
- **Conducting Body**: West Bengal Board of Primary Education (WBBPE), Acharya Prafulla Chandra Bhavan, DK 7/1, Sector-II, Salt Lake, Kolkata - 700091.
- **Sections populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`.
- **Sections omitted**: `career_ladder`, `financial_package` (Entrance examination).
- **Sections marked not_available**: None.
- **Sources OPENED and read this session**:
  - WBBPE Information and Guidelines for Teacher Eligibility Test-2022 (`TET-2022`) (`tet22_guidelines.pdf`, 10 pages; verified 150 MCQs scheme, 5 sections of 30 marks each [Child Development and Pedagogy, Language I, Language II English, Mathematics, Environmental Studies], 150-minute duration, bilingual paper in Bengali & English, zero negative marking, 60% General cut-off [90 marks], 55% reserved cut-off [82 marks], lifetime validity).
  - WBBPE Notification Pertaining to Holding Teacher Eligibility Test-2023 (`TET-2023`) in Adherence to NCTE Guidelines (Notification No. `1945/WBBPE/2023` dated 13.09.2023; read via Apple Vision OCR confirming exam date on 10.12.2023 [later rescheduled to 24.12.2023], eligibility excluding B.Ed. per Supreme Court ruling, application fee structure, and language options).
  - WBBPE Notice No. `2121/WBBPE/2025/13T-08/2023` dated 24.09.2025 (`tet23_result_summary.pdf`, read via Apple Vision OCR; verified declaration of TET-2023 results, 3,09,054 registered candidates, 2,73,147 appeared candidates, 6,754 qualified candidates [2.47% pass rate], and 64 candidates ranked 1st to 10th).
  - WBBPE Official State Portal Event Details (`https://wbbpe.wb.gov.in/pages/event_details.html`; verified TET-2022 examination held on 11.12.2022, 6,19,102 appeared candidates, result published 10.02.2023, 1,50,492 qualified candidates [24.31% pass rate], certificates issued 29.04.2023).
- **Links curl-checked**:
  - `https://wbbpe.wb.gov.in/` -> HTTP/1.1 200 OK
  - `https://wbbpeonline.com/` -> HTTP/2 200 OK
  - `https://wbbpe.wb.gov.in/pages/event_details.html` -> HTTP/1.1 200 OK
  - `https://wbbpe.wb.gov.in/file/cacc827f-a3f0-4d2f-ac24-0d60c9c0101b.pdf` -> HTTP/1.1 200 OK
  - `https://wbbpeonline.com/ImageHandler.ashx?ID=24&Type=NoticeDoc&FileExt=.pdf` -> HTTP/2 200 OK
  - `https://wbbpeonline.com/ImageHandler.ashx?ID=55&Type=NoticeDoc&FileExt=.pdf` -> HTTP/2 200 OK
  - `https://wbbpeonline.com/ImageHandler.ashx?ID=58&Type=NoticeDoc&FileExt=.pdf` -> HTTP/2 200 OK
- **Could NOT confirm, and why**: Total registered count for TET-2022 (approx. 6.9 lakh reported in press, but official board portal cites 6,19,102 appeared candidates; registered field left omitted in favor of exact verified appearance figure).
- **Confidence downgrades made, and why**: None.

---

### 2. `wbhrb-staff-nurse` (Tier B, job)
- **Conducting Body**: West Bengal Health Recruitment Board (WBHRB), BENFISH TOWER, GN-31, Sector-V, Salt Lake, Kolkata - 700091.
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`.
- **Sections omitted**: None.
- **Sections marked not_available**: None.
- **Sources OPENED and read this session**:
  - WBHRB Advertisement No. `R/Staff Nurses, Gr. II/GNM/7/2025` dated 07.08.2025 (`ad_6894a5ab94548.pdf`, 10 pages; verified 2,436 GNM vacancies [Female: 2,192, Male: 244], Level 9 basic pay ₹29,800, notified initial emoluments ₹39,500, 100-mark evaluation framework: 75 academic, 10 experience, 15 interview + mandatory qualifying Bengali/Nepali dictation test).
  - WBHRB Advertisement No. `R/Staff Nurses, Gr. II/Basic & Post Basic B.Sc. Nursing/8/2025` dated 07.08.2025 (`ad_6894a764dc74d.pdf`, 10 pages; verified 2,582 vacancies [Basic B.Sc.: 2,330, Post Basic B.Sc.: 252], Level 9 pay scale, same evaluation scheme).
  - West Bengal Nursing Service Cadre Regulations and WBS (ROPA) Rules 2019 (verified Level 9 entry basic ₹29,800, Level 12 Grade-I Sister-in-Charge, Level 14 Assistant Nursing Superintendent, Level 15 Deputy Nursing Superintendent, Level 16 Nursing Superintendent).
- **Links curl-checked**:
  - `https://www.hrb.wb.gov.in/` -> HTTP/2 200 OK
  - `https://www.hrb.wb.gov.in/uploads/ads/ad_6894a5ab94548.pdf` -> HTTP/2 200 OK
  - `https://www.hrb.wb.gov.in/uploads/ads/ad_6894a764dc74d.pdf` -> HTTP/2 200 OK
  - `https://www.wbhealth.gov.in/` -> HTTP/1.1 200 OK
- **Could NOT confirm, and why**: Total applicant registrations for 2025 cycle (applications opened August 2025; aggregate applicant pool totals are released upon Overall Performance List publication).
- **Confidence downgrades made, and why**: None.

---

### 3. `wbsedcl-junior-engineer` (Tier B, job)
- **Conducting Body**: West Bengal State Electricity Distribution Company Limited (WBSEDCL), Vidyut Bhavan, Block-DJ, Sector-II, Bidhannagar, Kolkata - 700091.
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`.
- **Sections omitted**: None.
- **Sections marked not_available**: None.
- **Sources OPENED and read this session**:
  - WBSEDCL Employment Notification No. `MPP/2025/04` dated 24.11.2025 (`Website Notification w.r.t Notification No. MPP-2025-04 Dt. 24.11.2025_27_11.pdf`, 24 pages; verified 401 vacancies for Junior Engineer (Electrical) Gr.-II across 16 reservation sub-categories, ROPA-2020 Level 6 pay scale ₹36,800 – ₹1,06,700 with entry basic ₹36,800, full-time 3-year Diploma qualification, age 18-32 years, service bond ₹2,00,000).
  - WBSEDCL Detailed Test Matrix & Scheme (verified 85-question CBT for 90 minutes, 0.33 negative marking, Domain Knowledge 50 marks [sectional cut-off 20], English 5m, Quant 10m, Computer Proficiency 10m, Vernacular Bengali/Nepali 10m [sectional cut-off 4], aggregate qualifying thresholds: UR/EWS 40%, SC 35%, ST 30%, OBC 35%, PwBD 30%; followed by 15-mark Personal Interview in 1:3 ratio at Vidyut Bhavan).
  - WBSEDCL Intimation regarding Date & Schedule of CBT (`Intimation regarding Date & Schedule of Computer Based Test under Notification No MPP202504 Dt. 24112025_09_01.pdf`; confirmed CBT administration on 27.01.2026 across West Bengal centers).
  - WBSEDCL Notice for Go-Live of Objection Management Link (`Notice for Go-Live of Objection Management Link w.r.t Computer Based Test conducted on 27.01.2026.pdf`).
  - WBSEDCL Previous Cycle Notification No. `MPP/2021/03` (confirmed 414 JE vacancies: 390 Electrical and 24 Civil).
- **Links curl-checked**:
  - `https://www.wbsedcl.in/` -> HTTP/1.1 302 / 200 OK
  - `https://www.wbsedcl.in/irj/go/km/docs/internet/new_website/careers.html` -> HTTP/1.1 200 OK
  - `https://www.wbsedcl.in/irj/go/km/docs/internet/new_website/pdf/Careers/Website%20Notification%20w.r.t%20Notification%20No.%20MPP-2025-04%20Dt.%2024.11.2025_27_11.pdf` -> HTTP/1.1 200 OK
  - `https://www.wbsedcl.in/irj/go/km/docs/internet/new_website/pdf/Careers/Intimation%20regarding%20Date%20&%20Schedule%20of%20Computer%20Based%20Test%20under%20Notification%20No%20MPP202504%20Dt.%2024112025_09_01.pdf` -> HTTP/1.1 200 OK
  - `https://www.wbsedcl.in/irj/go/km/docs/internet/new_website/pdf/Careers/Notice%20for%20Go-Live%20of%20Objection%20Management%20Link%20w.r.t%20Computer%20Based%20Test%20conducted%20on%2027.01.2026.pdf` -> HTTP/1.1 200 OK
- **Could NOT confirm, and why**: Exact number of registered candidates for MPP/2025/04 (WBSEDCL does not publish raw application counts in public notices; roll-number-based admit cards and objection management portals are published).
- **Confidence downgrades made, and why**: None.

---

### 4. `wbjee` (Tier C, entrance)
- **Conducting Body**: West Bengal Joint Entrance Examinations Board (WBJEEB), RUPANNA, DB-118, Sector-I, Salt Lake City, Kolkata - 700064.
- **Sections populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`.
- **Sections omitted**: `career_ladder`, `financial_package` (Academic entrance examination).
- **Sections marked not_available**: None.
- **Sources OPENED and read this session**:
  - Information Bulletin of WBJEE-2026 (`wbjee_2026_bulletin.pdf`, 45 pages; verified two-paper single-day offline OMR examination: Paper I Mathematics [75 MCQs, 100m, 120 mins] and Paper II Physics & Chemistry [80 MCQs, 100m, 120 mins]; three question categories per subject: Cat-1 [1m, -0.25 negative], Cat-2 [2m, -0.50 negative], Cat-3 [2m, multi-correct, zero negative, partial credit]; General Merit Rank [GMR] and Pharmacy Merit Rank [PMR] derivation; and application fee structure).
  - WBJEEB Press Conference & Result Declarations for WBJEE 2024 (held 28.04.2024, results declared 06.06.2024; verified 1,42,694 registered candidates, 1,13,492 appeared candidates, 1,12,963 qualified candidates [99.53% pass rate]).
  - WBJEEB Press Conference & Result Declarations for WBJEE 2023 (held 30.04.2023, results declared 26.05.2023; verified 1,24,919 registered candidates, 97,524 appeared candidates, 96,913 qualified candidates [99.37% pass rate]).
  - WBJEE-2026 Centralized Counselling Schedule (`Schedule of WBJEE-2026 Counselling.pdf`).
  - WBJEE-2026 Decentralized Seat Matrix (`Seat Matrix (Engg. & Pharmacy) of Online Decentralised Counselling.pdf`).
- **Links curl-checked**:
  - `https://wbjeeb.in/` -> HTTP/2 200 OK
  - `https://wbjeeb.nic.in/` -> HTTP/2 200 OK
  - `https://wbjeeb.in/wbjee-exam/` -> HTTP/2 200 OK
  - `https://cdnbbsr.s3waas.gov.in/s3d2a27e83d429f0dcae6b937cf440aeb1/uploads/2026/03/202603101506582412.pdf` -> HTTP/2 200 OK
  - `https://cdnbbsr.s3waas.gov.in/s3d2a27e83d429f0dcae6b937cf440aeb1/uploads/2026/06/202606291700903463.pdf` -> HTTP/2 200 OK
  - `https://cdnbbsr.s3waas.gov.in/s3d2a27e83d429f0dcae6b937cf440aeb1/uploads/2026/09/202609061815337480.pdf` -> HTTP/2 200 OK
- **Could NOT confirm, and why**: Exact seat matrix breakdown for upcoming academic year until institutional intake approvals are finalized by AICTE/PCI/Council of Architecture.
- **Confidence downgrades made, and why**: None.

---

## 4. Quality Audit & Review Gates

1. **Schema Validation**: Executed `node scripts/data-sourcing/validate-details.mjs` across the repository: **256 files checked, 0 errors, 0 warnings**.
2. **Citations & Primary Evidence**: All 4 dossiers carry verified source URLs, official notification numbers, and quotes from primary government gazettes, board notifications, or company circulars.
3. **Canonical Financial Consistency**: Job dossiers (`wbhrb-staff-nurse`, `wbsedcl-junior-engineer`) adhere strictly to the project-wide constant **58% DA** as of `2025-07-01`.
4. **Entrance Exam Cleanliness**: `wbtet` and `wbjee` have `career_ladder` and `financial_package` fully omitted as required.
5. **Download Links Liveness**: Every cited link was curl-verified this session and returned HTTP 200 OK (or HTTP 302 for base utility portal).
