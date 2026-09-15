# Research Log: Unit 12 (u012) — Major State Public Service Commissions: Rajasthan

- **Unit ID**: `u012`
- **Batch ID**: `batch-4-state-psc--rajasthan`
- **Timestamp**: 2026-09-11T21:18:00+05:30
- **Status**: Completed (2/2 exams researched, authored, and verified)
- **Reviewer**: Antigravity Lead Research & Validation Agent
- **Validation Result**: **PASS (0 errors, 0 warnings across 80 total dossiers)**

---

## 1. Summary of Unit Execution

Unit 12 covers the primary recruitment examinations conducted by the **Rajasthan Public Service Commission (RPSC)** for the state of Rajasthan:
1. **`rajasthan-police-si`**: Rajasthan Police Sub-Inspector / Platoon Commander Examination (Tier A, job)
2. **`rpsc-ras`**: Rajasthan State and Subordinate Services Combined Competitive Examination (RAS/RTS) (Tier B, job)

Both examinations have been researched and authored with primary statutory sources directly from RPSC portals (`rpsc.rajasthan.gov.in`), Rajasthan Police Department, and Rajasthan Finance Department (Rules Division). All 5 sections (`career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`) have been fully populated for both examinations in strict compliance with the canonical frozen schema ([`upsc-cse.json`](file:///Users/surajvadhya/Documents/kimi/workspace/indian-exams-dashboard/public/exam-details/upsc-cse.json)).

| Exam ID | Title | Tier | Type | Entry Basic Pay / Level | Recent Vacancies | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `rajasthan-police-si` | Rajasthan Police Sub-Inspector / Platoon Commander Examination | A | job | Level L-11 (₹37,800 basic; fixed ₹26,500 during probation) | 859 (SI 2021) | **PASS** |
| `rpsc-ras` | Rajasthan Public Service Commission RAS/RTS | B | job | Level L-14 (₹56,100 basic; fixed ₹39,300 during probation) | 905 (RAS 2023) / 733 (RAS 2024) | **PASS** |

---

## 2. Detailed Exam Research Records

### 2.1 `rajasthan-police-si`
- **Tier**: A | **Exam Type**: `job`
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sources OPENED and Read**:
  - `https://rpsc.rajasthan.gov.in/Static/RecruitmentAdvertisements/7107054E6CEB463D854E675DFDAACF82.pdf` — RPSC Detailed Advertisement No. 08/EXAM/SI-PC/EP-I/2020-21 (downloaded to `/tmp/si_2021_advt.pdf` and read via `pdftotext`).
  - `https://rpsc.rajasthan.gov.in/Static/Syllabus/B1186D1E-D4A8-4699-8D06-608E930CEECE.pdf` — Official Syllabus and Scheme for Paper-I (General Hindi) (downloaded to `/tmp/si_paper1_syllabus.pdf` and read via `pdftotext`).
  - `https://rpsc.rajasthan.gov.in/Static/Syllabus/A1E1781F-8C6F-44BD-9DF2-E75D3D258617.pdf` — Official Syllabus and Scheme for Paper-II (General Knowledge and General Science) (downloaded to `/tmp/si_paper2_syllabus.pdf` and read via `pdftotext`).
  - `https://rpsc.rajasthan.gov.in/Static/Syllabus/C9AFDB5C-42AB-43D2-9C5D-9218DD00BBED.pdf` — Official Scheme of Physical Efficiency Test (PET) for Sub-Inspector (downloaded to `/tmp/si_pet_scheme.pdf` and read via `pdftotext`).
  - Rajasthan Police Subordinate Service Rules, 1989 & Rajasthan Civil Services (Revised Pay) Rules, 2017.
- **Pay Scale**:
  - Level L-11 under Rajasthan Civil Services (Revised Pay) Rules, 2017 (pre-revised Grade Pay ₹4,200).
  - Trainee probationers receive a fixed monthly stipend of ₹26,500 for the initial 2-year probation period.
  - On regular confirmation, Entry Basic Pay is ₹37,800.
  - DA: 58% constant (effective 2025-07-01).
  - Gross Range: ₹68,000 – ₹73,000 / month.
  - In-Hand Range: ₹58,000 – ₹64,000 / month (after GPF/NPS, SI, and RGHS deductions).
- **Exam Scheme**:
  - Stage 1: Written Examination (Paper-I: General Hindi, 200 marks, 120 mins; Paper-II: GK & General Science, 200 marks, 120 mins). Negative marking: 1/3. Total 400 marks.
  - Stage 2: Physical Efficiency Test (PET): 100 marks (100m race, long jump, chinning up/shot put). Qualifying threshold: 50% (50 marks).
  - Stage 3: Interview / Aptitude Test: 50 marks. Shortlisting restricted to 3x vacancies based on aggregate written + PET marks.
  - Final Merit: Written Examination (400) + Interview (50) = 450 marks.
- **Link Verification**:
  - `https://rpsc.rajasthan.gov.in` → HTTP 200
  - `https://rpsc.rajasthan.gov.in/Static/RecruitmentAdvertisements/B87284F000614D55999928D873BD8B3E.pdf` → HTTP 200 (Live)
  - `https://rpsc.rajasthan.gov.in/Static/RecruitmentAdvertisements/7107054E6CEB463D854E675DFDAACF82.pdf` → HTTP 200 (Live)
  - `https://rpsc.rajasthan.gov.in/Static/Syllabus/B1186D1E-D4A8-4699-8D06-608E930CEECE.pdf` → HTTP 200 (Live)
  - `https://rpsc.rajasthan.gov.in/Static/Syllabus/A1E1781F-8C6F-44BD-9DF2-E75D3D258617.pdf` → HTTP 200 (Live)
  - `https://rpsc.rajasthan.gov.in/Static/Syllabus/C9AFDB5C-42AB-43D2-9C5D-9218DD00BBED.pdf` → HTTP 200 (Live)
  - `https://rpsc.rajasthan.gov.in/syllabus` → HTTP 200 (Live)
- **Competition Benchmarks**:
  - 2021 Cycle: 859 notified vacancies (AP: 746, IB: 64, RAC: 38, MBC: 11). Registered applicants ~7,97,000; examinees appeared in written test: 3,83,097. Shortlisted for PET: 20,240. Qualified for interview: 3,291.
  - 2016 Cycle: 511 vacancies (revised to 825). Registered applicants ~4,69,000. Shortlisted for PET: 11,346.

---

### 2.2 `rpsc-ras`
- **Tier**: B | **Exam Type**: `job`
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (All 5 sections enriched)
- **Sources OPENED and Read**:
  - `https://rpsc.rajasthan.gov.in/Static/Syllabus/CDD32E18-BF75-42FF-B4CA-71AD8267C371.pdf` — Official Scheme and Syllabus for Preliminary Examination (downloaded to `/tmp/ras_pre_syllabus.pdf` and read via `pdftotext`).
  - `https://rpsc.rajasthan.gov.in/Static/Syllabus/D8681157-9EBC-4A47-B35F-54333F99BB65.pdf` — Official Scheme of Examination and Question Paper Pattern for Mains Examination (downloaded to `/tmp/ras_mains_scheme.pdf` and read via `pdftotext`).
  - `https://rpsc.rajasthan.gov.in/Static/RecruitmentAdvertisements/A6C5484FAD24491EB33EEC4BBCDF4470.pdf` — Advt. 13/2024-25 for Rajasthan State and Subordinate Services Comb. Comp. Exam 2024.
  - `https://rpsc.rajasthan.gov.in/Static/RecruitmentAdvertisements/0AE4D1AE3F2848BD9BA5E4C490098CC0.pdf` — Advt. 02/2023-24 for Rajasthan State and Subordinate Services Comb. Comp. Exam 2023.
  - Rajasthan Administrative Service Rules, 1954 & Rajasthan Civil Services (Revised Pay) Rules, 2017.
- **Pay Scale**:
  - Level L-14 under Rajasthan Civil Services (Revised Pay) Rules, 2017 (pre-revised Grade Pay ₹5,400, State Services Junior Scale).
  - Trainees undergo 2 years of probation trainee service on a fixed monthly stipend of ₹39,300.
  - On regular confirmation, Entry Basic Pay is ₹56,100.
  - DA: 58% constant (effective 2025-07-01).
  - Gross Range: ₹98,000 – ₹1,08,000 / month.
  - In-Hand Range: ₹83,000 – ₹94,000 / month (after GPF/NPS, SI, and RGHS deductions).
- **Exam Scheme**:
  - Stage 1: Preliminary Examination (Objective, screening only): 1 paper (General Knowledge and General Science), 150 questions, 200 marks, 180 minutes. Negative marking: 1/3 (0.44 marks). Shortlists ~15x vacancies for Mains.
  - Stage 2: Main Written Examination: 4 compulsory descriptive papers of 200 marks and 180 minutes each:
    - Paper-I: General Studies - I (History, Economics, Sociology, Management, Accounting & Auditing) — 200 marks
    - Paper-II: General Studies - II (Administrative Ethics, General Science & Technology, Earth Science / Geography) — 200 marks
    - Paper-III: General Studies - III (Indian Political System, Public Administration & Management, Administrative Law, Sports, Yoga, Behaviour) — 200 marks
    - Paper-IV: General Hindi and General English (General Hindi 120 marks, General English 80 marks) — 200 marks
    - Total Mains Marks = 800 marks.
  - Stage 3: Personality and Viva-Voce Examination (Interview): 100 marks.
  - Final Merit: Mains Examination (800) + Interview (100) = 900 marks total.
- **Link Verification**:
  - `https://rpsc.rajasthan.gov.in/Static/RecruitmentAdvertisements/A6C5484FAD24491EB33EEC4BBCDF4470.pdf` → HTTP 200 (Live)
  - `https://rpsc.rajasthan.gov.in/Static/RecruitmentAdvertisements/0AE4D1AE3F2848BD9BA5E4C490098CC0.pdf` → HTTP 200 (Live)
  - `https://rpsc.rajasthan.gov.in/Static/RecruitmentAdvertisements/6C6BF3AD89A8422CB927291EA68B913A.pdf` → HTTP 200 (Live)
  - `https://rpsc.rajasthan.gov.in/Static/Syllabus/CDD32E18-BF75-42FF-B4CA-71AD8267C371.pdf` → HTTP 200 (Live)
  - `https://rpsc.rajasthan.gov.in/Static/Syllabus/D8681157-9EBC-4A47-B35F-54333F99BB65.pdf` → HTTP 200 (Live)
  - `https://rpsc.rajasthan.gov.in/Static/Syllabus/0FA5BD78-5D4A-411B-BA64-2314FF1EF1EF.pdf` → HTTP 200 (Live)
  - `https://rpsc.rajasthan.gov.in/syllabus` → HTTP 200 (Live)
- **Competition Benchmarks**:
  - 2023 Cycle: 905 vacancies (424 State Service, 481 Subordinate Service). ~6,97,000 registered applicants; ~4,57,000 appeared in Prelims. Shortlisted for Mains: 19,355 candidates. Qualified for interview: 2,168.
  - 2021 Cycle: 988 vacancies (363 State Service, 625 Subordinate Service). ~6,48,000 registered applicants; ~3,20,000 appeared in Prelims. Shortlisted for Mains: 20,102 candidates. Qualified for interview: 2,174.

---

## 3. Protocol and Schema Compliance Verification

1. **Schema Integrity**:
   - Both files comply with Schema Version 1, `last_reviewed`: "2026-09-11".
   - Automated check via `scripts/data-sourcing/validate-details.mjs` yields **PASS (0 errors, 0 warnings)**.
2. **State Pay Matrix Rules (§5.3)**:
   - Neither dossier uses central 7th CPC civilian tables. Both accurately cite the Rajasthan Civil Services (Revised Pay) Rules, 2017 Schedule-I (Level L-11 for SI, Level L-14 for RAS) and document Rajasthan's statutory 2-year probation trainee fixed stipend system.
3. **DA Project Constant (§5.2)**:
   - `da_percent_as_of_review`: 58
   - `da_as_of`: "2025-07-01"
4. **Link Liveness (§4)**:
   - All cited URLs checked directly on `rpsc.rajasthan.gov.in` and confirmed HTTP 200 via GET requests with referrer headers.
