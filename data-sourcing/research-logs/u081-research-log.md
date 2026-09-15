# Research Log: Unit 81 (u081) — Other State-Jurisdiction Recruiters — Tamil Nadu

- **Unit ID**: `u081`
- **Batch ID**: `batch-7-state-other--tamil-nadu`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts — proposed addition, flag for confirmation) — Tamil Nadu`
- **Timestamp**: 2026-09-13T15:05:00+05:30
- **Status**: Completed (7/7 exams researched, written, and validated)
- **Reviewer**: Antigravity Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 81 covers statutory uniformed recruitments, public utility engineering cadre, professional entrance tests, teacher eligibility, and state healthcare clinical recruitments across Tamil Nadu:
1. `tnusrb-constable`: Tamil Nadu Uniformed Services Recruitment Board (TNUSRB) Police Constable Grade-II, Jail Warder Grade-II & Fireman Examination — **Tier A (Job)**
2. `tnusrb-si`: Tamil Nadu Uniformed Services Recruitment Board (TNUSRB) Sub-Inspector of Police (Taluk, Armed Reserve & Tamil Nadu Special Police) Examination — **Tier A (Job)**
3. `tangedco-assistant-engineer`: Tamil Nadu Generation and Distribution Corporation (TANGEDCO / TNEB) Assistant Engineer (Electrical, Mechanical, Civil) Examination — **Tier A (Job)**
4. `tancet`: Centre for Entrance Examinations, Anna University, Chennai Tamil Nadu Common Entrance Test (TANCET) & CEETA-PG — **Tier B (Entrance)**
5. `tntet`: Teachers Recruitment Board (TRB), Government of Tamil Nadu Tamil Nadu Teacher Eligibility Test (Paper I & Paper II) — **Tier B (Job)**
6. `tn-mrb-staff-nurse`: Medical Services Recruitment Board (TN MRB), Government of Tamil Nadu Staff Nurse Direct Recruitment Examination — **Tier B (Job)**
7. `tn-mrb-assistant-surgeon`: Medical Services Recruitment Board (TN MRB), Government of Tamil Nadu Assistant Surgeon (General) Direct Recruitment Examination — **Tier B (Job)**

### Pay Architecture & Statutory Standards:
- **Tamil Nadu Revised Pay Rules, 2017 (7th CPC Pay Commission alignment vide G.O. Ms. No. 303, Finance (Pay Cell) Department)**:
  - `tnusrb-constable`: Enters at **Level 6** (₹18,200 – ₹67,100, Entry Basic: ₹18,200). Entitled to Risk Allowance, Uniform/Kit Maintenance Allowance, and Station Grade HRA.
  - `tnusrb-si`: Enters at **Level 13** (₹36,900 – ₹1,16,600, Entry Basic: ₹36,900). Advances to Inspector (Level 16), DSP (Level 22), ADSP (Level 25), and eligible for IPS State Quota promotion.
  - `tangedco-assistant-engineer`: Enters at **Officer Level 1** (₹39,800 – ₹1,26,500, Entry Basic: ₹39,800) under TNEB Revised Pay Regulations, mapped to State Level 16. Entitled to Thermal/Generation Duty Allowance and subsidized electricity.
  - `tntet`: Qualifies candidates for Secondary Grade Teacher at **Level 10** (₹20,600 – ₹75,900, Entry Basic: ₹20,600) and Graduate Teacher / B.T. Assistant at **Level 16** (₹36,400 – ₹1,34,200).
  - `tn-mrb-staff-nurse`: Enters with 2-year consolidated contract honorarium of **₹14,000/month** (G.O. Ms. No. 232, Health and Family Welfare), then absorbed permanently into regular time-scale at **Level 10** (₹20,600 – ₹75,900, Entry Basic: ₹20,600).
  - `tn-mrb-assistant-surgeon`: Enters at **Level 22** (₹56,100 – ₹2,05,700, Entry Basic: ₹56,100). Advances through Senior Assistant Surgeon (Level 23/24) and Civil Surgeon (Level 25/26) via Dynamic Assured Career Progression (DACP).
- **Standardized DA Constant**:
  - All 6 job dossiers enforce the canonical repository constant of **58% DA** as of `2025-07-01` (`da_percent_as_of_review: 58`, `da_as_of: "2025-07-01"`).
- **Entrance Examination Omissions**:
  - `tancet` is an entrance test for postgraduate university admissions (MBA, MCA, M.E./M.Tech.); `career_ladder` and `financial_package` are appropriately omitted per `RESEARCH-GUIDE.md` conventions.

---

## 2. Examination Overview Table

| Exam ID | Title | Tier | Type | Entry Basic / Scale | Exam Pattern Summary | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `tnusrb-constable` | TNUSRB Police Constable & Fireman | A | job | Level 6 (₹18,200) | Part I Tamil (80 Qs, 40% qual) + Part II Main (70 Qs) + PMT/ET + PET (24m) + Special (6m) | **PASS** |
| `tnusrb-si` | TNUSRB Sub-Inspector of Police | A | job | Level 13 (₹36,900) | Part I Tamil (100 Qs, 40% qual) + Part II Main (70m) + PMT/ET/PET (15m) + Viva (10m) | **PASS** |
| `tangedco-assistant-engineer` | TANGEDCO Assistant Engineer | A | job | Officer Level 1 (₹39,800) | CBT (100 Qs, 100m, 120 mins): Engg Maths (20), Basic Engg (20), Core Discipline (60), -1/3 wrong | **PASS** |
| `tancet` | Tamil Nadu Common Entrance Test | B | entrance | N/A (Entrance) | Offline OMR (100 MCQs, 100m, 120 mins): MBA / MCA / CEETA-PG, -1/4 negative marking | **PASS** |
| `tntet` | Tamil Nadu Teacher Eligibility Test | B | job | Level 10 (₹20,600) / Level 16 | OMR: Paper I Primary (150 MCQs, 150m, 180 mins) & Paper II Upper Primary (150 MCQs, 150m, 180 mins) | **PASS** |
| `tn-mrb-staff-nurse` | TN MRB Staff Nurse Exam | B | job | Level 10 (₹20,600) / ₹14k contr | OMR/CBT: Mandatory Tamil (50 Qs, 40% qual) + Core Nursing (200 MCQs, 100 marks, 150 mins) | **PASS** |
| `tn-mrb-assistant-surgeon` | TN MRB Assistant Surgeon (General) | B | job | Level 22 (₹56,100) | CBT: Mandatory Tamil (50 Qs, 40% qual) + Medical Science Core (100 MCQs, 100 marks, 120 mins) | **PASS** |

---

## 3. Detailed Exam Research Log

### 1. `tnusrb-constable` (Tier A, job)
- **Conducting Body**: Tamil Nadu Uniformed Services Recruitment Board (TNUSRB) (`https://www.tnusrb.tn.gov.in`).
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`.
- **Career Ladder**: Police Constable Grade-II / Jail Warder Gr-II / Fireman (Level 6: ₹18,200 – ₹67,100) → Police Constable Grade-I (Level 8: ₹19,500 – ₹71,900 at 10 yrs) → Head Constable (Level 10: ₹20,600 – ₹75,900 at 15 yrs) → Special Sub-Inspector / SSI (Level 13: ₹36,900 – ₹1,16,600 at 25 yrs) → Sub-Inspector of Police (Level 13 via 20% departmental quota after 5 yrs) → Inspector of Police (Level 16: ₹56,100 – ₹2,05,700).
- **Exam Pattern**: Stage 1 Written Exam: Part I Tamil Language Eligibility (80 MCQs, 80 mins, 40% qualifying) + Part II Main Written (70 MCQs, 70 marks, 80 mins; GK 45, Psychology 25; 1:5 ratio for physicals). Stage 2: PMT & ET (Men 1500m in 7 mins; Women 400m in 2m 30s). Stage 3: PET (24 marks: Rope Climbing, Long Jump/High Jump, 100m/400m run). Stage 4: Special Marks (6 marks for NCC/NSS/Sports). Total merit: 100 marks.
- **Financial Package**: Level 6 (₹18,200 – ₹67,100). Entry Basic Pay: ₹18,200. DA: 58% (₹10,556). Gross estimate: ₹31,000 – ₹35,000. In-hand estimate: ₹26,500 – ₹30,000.
- **Competition Benchmarks**:
  - 2025 Cycle: 3,665 vacancies (3,644 regular + 21 ST shortfall).
  - 2023 Cycle: 3,359 vacancies (780 AR Women, 1,819 TSP Men, 86 Jail Warder, 674 Fireman).
  - 2022 Cycle: 3,66,728 candidates evaluated in written examination for 3,552 vacancies (approx. 1 in 103 selectivity ratio).
- **Official Downloads Cited**:
  - Common Recruitment 2025 Official Notification (`Notification_CR_2025.pdf`)
  - Common Recruitment 2025 Scheme & Syllabus (`Syllabus_CR2025.pdf`)
  - Frequently Asked Questions English (`FAQ_English_CR2025.pdf`)
  - Annual Planner 2026-2027 (`Annual_Planner_2026_English.pdf`)
  - Common Recruitment 2023 Notification Archive (`NotificationCR2023.pdf`)
  - Common Recruitment 2022 Information Brochure (`informationbrochure.pdf`)

### 2. `tnusrb-si` (Tier A, job)
- **Conducting Body**: Tamil Nadu Uniformed Services Recruitment Board (TNUSRB) (`https://www.tnusrb.tn.gov.in`).
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`.
- **Career Ladder**: Sub-Inspector of Police Taluk / AR / TSP (Level 13: ₹36,900 – ₹1,16,600) → Inspector of Police (Level 16: ₹56,100 – ₹2,05,700) → DSP / ACP (Level 22: ₹56,100 – ₹2,05,700 Gazetted State Service) → ADSP (Level 25: ₹59,300 – ₹2,17,600) → Superintendent of Police / SP via IPS State Quota induction (Level 11/12 Central 7th CPC Matrix).
- **Exam Pattern**: Stage 1 Written: Part I Tamil Eligibility (100 MCQs, 100 marks, 100 mins, 40% qualifying) + Part II Main Written (140 MCQs, 70 marks, 150 mins; GK 40m, Psychology 30m; 1:5 ratio). Stage 2 Physical: PMT/ET (qualifying; Men 1500m in 7 mins, Women 400m in 2m 30s) + PET (15 marks; Rope Climbing, Long/High Jump, 100m/400m run). Stage 3 Viva-Voce: 10 marks (1:2 ratio). Stage 4 Special Marks: 5 marks (NCC, NSS, Sports). Total merit: 100 marks.
- **Financial Package**: Level 13 (₹36,900 – ₹1,16,600). Entry Basic Pay: ₹36,900. DA: 58% (₹21,402). Gross estimate: ₹62,000 – ₹70,000. In-hand estimate: ₹54,000 – ₹61,000.
- **Competition Benchmarks**:
  - 2025 Cycle: 1,352 vacancies (933 Taluk SI, 366 AR SI + 53 SC/ST shortfall).
  - 2023 Cycle: 621 vacancies (364 Taluk SI, 141 AR SI, 110 TSP SI + 6 Backlog).
  - 2022 Cycle: 1,48,870 candidates evaluated for 969 vacancies (approx. 1 in 154 selectivity ratio).
- **Official Downloads Cited**:
  - Sub-Inspector of Police 2025 Notification (`SI(TK,%20AR)%202025%20Notification_n.pdf`)
  - Sub-Inspector of Police 2025 Scheme & Syllabus (`SI_2025_Syllabus.pdf`)
  - Instructions for Candidates English (`Instructions_for_candidates_English.pdf`)
  - Sub-Inspector of Police 2023 Notification Archive (`Notification_en.pdf`)
  - Sub-Inspector of Police 2022 Notification Archive (`siadvertisement.pdf`)

### 3. `tangedco-assistant-engineer` (Tier A, job)
- **Conducting Body**: Tamil Nadu Generation and Distribution Corporation Limited (TANGEDCO) / TNEB (`https://www.tnebltd.gov.in`).
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`.
- **Career Ladder**: Assistant Engineer Electrical/Mech/Civil (Officer Level 1 / Level 16: ₹39,800 – ₹1,26,500) → Assistant Executive Engineer / AEE (Officer Level 2 / Level 22: ₹56,100 – ₹1,77,500) → Executive Engineer / EE (Officer Level 3 / Level 26: ₹61,900 – ₹1,96,700) → Superintending Engineer / SE (Officer Level 4: ₹78,800 – ₹2,09,200) → Chief Engineer / CE (Officer Level 5: ₹1,23,100 – ₹2,15,900) → Director on Board.
- **Exam Pattern**: Computer-Based Test (100 MCQs, 100 marks, 120 minutes): Part I Engineering Mathematics (20 Qs, 20m), Part II Basic Engineering & Sciences (20 Qs, 20m), Part III Technical Core Discipline (60 Qs, 60m). Negative marking: -1/3rd (0.33) per incorrect answer. Qualifying marks: 40% (OC), 35% (BC/MBC), 30% (SC/ST).
- **Financial Package**: Officer Level 1 (₹39,800 – ₹1,26,500). Entry Basic Pay: ₹39,800. DA: 58% (₹23,084). Gross estimate: ₹68,000 – ₹78,000. In-hand estimate: ₹60,000 – ₹69,000.
- **Competition Benchmarks**:
  - 2024 Cycle: 105 vacancies notified via State Public Undertakings combined technical framework.
  - 2020 Cycle: approx. 1,50,000 applicants for 600 AE vacancies (400 Electrical, 125 Mechanical, 75 Civil; approx. 1 in 250 ratio).
- **Official Downloads Cited**:
  - TNEB / TANGEDCO Official Corporate Portal (`https://www.tnebltd.gov.in`)
  - TNPSC Combined Technical Services Degree Level Notification No. 09/2024 (`09_2024_CTS_NONOT_ENGLISH_.pdf`)
  - TNPSC Combined Technical Services Diploma Level Notification No. 11/2024 (`CTSE_DIP_Eng_13.08.2024_.pdf`)

### 4. `tancet` (Tier B, entrance)
- **Conducting Body**: Centre for Entrance Examinations, Anna University, Chennai (`https://tancet.annauniv.edu/tancet/index.html`).
- **Sections Populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`.
- **Sections Omitted**: `career_ladder`, `financial_package` (Entrance examination rule).
- **Exam Pattern**: Offline pen-and-paper OMR examination: 100 questions, 100 marks, 120 minutes duration. Negative marking of 1/4 mark (0.25) deducted per wrong answer.
  - TANCET MBA: Data Analysis, Reading Comprehension, Quantitative Aptitude, Data Sufficiency, English Usage.
  - TANCET MCA: Quantitative Ability, Analytical Ability, Logical Reasoning, Computer Awareness.
  - CEETA-PG: Part I Engineering Mathematics, Part II Basic Engineering & Sciences, Part III Technical Core.
- **Competition Benchmarks**:
  - AY 2026: 30,919 registered, 27,468 appeared (88.84% attendance across 35 centres in 15 cities; MBA 17,060 reg / 15,050 app; MCA 7,982 reg / 7,281 app; CEETA-PG 5,877 reg / 5,137 app).
- **Official Downloads Cited**:
  - TANCET / CEETA-PG Official Examination Portal (`https://tancet.annauniv.edu/tancet/index.html`)
  - TANCET / CEETA-PG 2026 Information to Candidates Brochure (`Information%20Brochure%202026.pdf`)
  - TANCET / CEETA-PG 2026 Declaration of Results & Statistics Press Release (`Press.pdf`)

### 5. `tntet` (Tier B, job)
- **Conducting Body**: Teachers Recruitment Board (TRB), Government of Tamil Nadu (`https://trb.tn.gov.in`).
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`.
- **Career Ladder**: Secondary Grade Teacher / SGT (Level 10: ₹20,600 – ₹75,900) or Graduate Teacher / B.T. Assistant (Level 16: ₹36,400 – ₹1,34,200) → Postgraduate Assistant (Level 18: ₹36,900 – ₹1,36,600 / ₹44,900 – ₹1,65,400) → High School / Higher Secondary Headmaster (Level 22/23: ₹56,100 – ₹2,05,700) → District Educational Officer / DEO (Level 25/26: ₹59,300 – ₹2,17,600).
- **Exam Pattern**: Two separate papers (150 objective MCQs each, 150 marks, 180 minutes, no negative marking).
  - Paper I (Classes I–V): Child Development (30), Language I (30), Language II English (30), Mathematics (30), Environmental Studies (30).
  - Paper II (Classes VI–VIII): Child Development (30), Language I (30), Language II English (30), Subject Specialization Maths/Science or Social Studies (60).
  - Qualifying benchmark: 60% (90/150) for General, 55% (82.5/150) for BC, BCM, MBC, SC, SCA, ST, and PwD. Lifetime validity.
- **Financial Package**: Level 10 (₹20,600 – ₹75,900) for SGT / Level 16 (₹36,400 – ₹1,34,200) for Graduate Teacher. Entry Basic Pay: ₹20,600. DA: 58% (₹11,948). Gross estimate: ₹35,000 – ₹42,000. In-hand estimate: ₹30,000 – ₹37,000.
- **Competition Benchmarks**:
  - 2026 Cycle: 2,29,129 registered, 2,20,464 appeared (96.22% attendance). Paper I: 61,386 registered, 59,535 appeared across 222 centres (96.99%); Paper II: 1,67,743 registered, 1,60,929 appeared across 613 centres (95.94%).
- **Official Downloads Cited**:
  - TNTET Official Information and Archive Hub (`https://trb.tn.gov.in/tntet.php?language=LG-1&status=Active`)
  - TNTET Paper I Examination Details Press News (`4059189243TET1press%20news.pdf`)
  - TNTET Paper II Examination Details Press News (`4801622470press%20news%20tet%20paper%20II.pdf`)
  - TNTET Consolidated Candidate Appearance Press Release (`2643662506TET%20Press%20News.pdf`)

### 6. `tn-mrb-staff-nurse` (Tier B, job)
- **Conducting Body**: Medical Services Recruitment Board (TN MRB), Government of Tamil Nadu (`https://www.mrb.tn.gov.in`).
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`.
- **Career Ladder**: Staff Nurse (Initial 2-yr contract: ₹14,000/mo; permanent absorption at Level 10: ₹20,600 – ₹75,900) → Nursing Tutor Gr-II / Senior Staff Nurse (Level 11/12: ₹35,400 – ₹1,30,400) → Nursing Superintendent Gr-II (Level 13: ₹36,900 – ₹1,36,600) → Nursing Superintendent Gr-I (Level 16: ₹56,100 – ₹2,05,700) → Deputy Director of Nursing / Chief Nursing Officer (Level 18/22).
- **Exam Pattern**: Objective Written Examination: Mandatory Tamil Language Eligibility Test (50 Qs, 50 marks, 60 mins, 40% qualifying threshold) + Core Nursing Subject Paper (200 MCQs @ 0.5 mark each, 100 marks, 150 mins; Diploma/B.Sc. Nursing standard). No negative marking. No interview.
- **Financial Package**: Level 10 (₹20,600 – ₹75,900) post-absorption. Entry Basic Pay: ₹20,600. DA: 58% (₹11,948). Initial 2-year consolidated stipend: ₹14,000/mo with ₹500 annual increments. Regular gross estimate: ₹35,000 – ₹42,000. In-hand estimate: ₹30,000 – ₹37,000.
- **Competition Benchmarks**:
  - 2019 Cycle: approx. 40,000 applicants for 2,345 Staff Nurse vacancies (GT 730, BC 620, BCM 83, MBC 471, SC 352, SCA 68, ST 21; approx. 1 in 17 ratio).
- **Official Downloads Cited**:
  - Medical Services Recruitment Board (TN MRB) Official Website (`https://www.mrb.tn.gov.in/`)
  - Direct Recruitment for the Post of Nurses Notification (`Nurses_Notification_07022019.pdf`)
  - Notification for Nurses DAP Category (`notification_Nurses_DAP_020322.pdf`)

### 7. `tn-mrb-assistant-surgeon` (Tier B, job)
- **Conducting Body**: Medical Services Recruitment Board (TN MRB), Government of Tamil Nadu (`https://www.mrb.tn.gov.in`).
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`.
- **Career Ladder**: Assistant Surgeon General / Civil Assistant Surgeon (Level 22: ₹56,100 – ₹2,05,700) → Senior Assistant Surgeon (Level 23/24: ₹59,300 – ₹2,17,600 via DACP at 5 yrs) → Civil Surgeon / Senior Civil Surgeon (Level 25/26: ₹61,900 – ₹2,27,000 via DACP at 9 yrs) → Chief Civil Surgeon / Medical Superintendent / DDHS (Level 27/28) → Director of Public Health (DPH) / DMS / DME (Level 30 Apex Scale).
- **Exam Pattern**: Computer-Based Examination (CBT): Mandatory Tamil Eligibility Test (50 Qs, 50 marks, 60 mins, 40% qualifying threshold) + Medical Science Core Paper (100 MCQs, 100 marks, 120 mins; MBBS standard; normalized across sessions). No negative marking. No interview.
- **Financial Package**: Level 22 (₹56,100 – ₹2,05,700). Entry Basic Pay: ₹56,100. DA: 58% (₹32,538). Gross estimate: ₹95,000 – ₹1,15,000. In-hand estimate: ₹82,000 – ₹99,000.
- **Competition Benchmarks**:
  - 2025 Cycle: 1,100 vacancies (GT 320, BC 278, BCM 35, MBC 212, SC 174, SCA 33, ST 48 + 53 shortfall).
  - 2024 Cycle: approx. 25,000 applicants for 2,553 vacancies (approx. 1 in 10 selectivity ratio).
- **Official Downloads Cited**:
  - Medical Services Recruitment Board (TN MRB) Official Website (`https://www.mrb.tn.gov.in/`)
  - Direct Recruitment for Assistant Surgeon (General) 2025 Notification (`ASGNotification2025.pdf`)
  - Direct Recruitment for Assistant Surgeon (General) 2024 Notification Archive (`AS_Notification_150324.pdf`)

---

## 4. Verification and Sanity Checklist

- [x] All 7 dossiers exist at `public/exam-details/<id>.json`.
- [x] All top-level keys conform strictly to schema v1 (`id`, `schema_version`, `last_reviewed`, `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`).
- [x] All confidence and status enumerations conform to allowed values (`available`, `not_available`, `verified`, `reported`, `estimate`).
- [x] Entrance examinations (`tancet`) correctly omit `career_ladder` and `financial_package`.
- [x] Job examinations feature complete career progression chains and explicit Level definitions under Tamil Nadu Revised Pay Rules, 2017.
- [x] Standardized 58% DA constant as of 2025-07-01 enforced across all 6 job exams.
- [x] Ran `node scripts/data-sourcing/validate-details.mjs`: **PASS (0 errors, 0 warnings)** across all 7 exams.
