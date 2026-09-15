# Research Log: Unit 44 (u044) — Other State-Jurisdiction Recruiters — Tamil Nadu

- **Unit ID**: `u044`
- **Batch ID**: `batch-7-state-other--tamil-nadu`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts) — Tamil Nadu`
- **Timestamp**: 2026-09-12T16:25:00+05:30
- **Status**: Completed (7/7 exams researched, authored, and validated)
- **Reviewer**: Antigravity IDE Autonomous Agent

---

## 1. Summary of Unit Execution
Unit 44 covers the 7 premier non-TNPSC state-jurisdiction recruitment and eligibility examination bodies of Tamil Nadu across police recruitment (TNUSRB), power utility generation and distribution (TANGEDCO / TNEB Ltd), higher education entrance (Anna University), school education teacher eligibility (TRB Tamil Nadu), and healthcare specialist/paramedical cadres (TN MRB):

1. `tnusrb-constable`: TNUSRB Police Constable Grade-II, Jail Warder & Fireman Exam — **Tier A** (Job)
2. `tnusrb-si`: TNUSRB Sub-Inspector of Police (Taluk, AR & TSP) Examination — **Tier A** (Job)
3. `tangedco-assistant-engineer`: Tamil Nadu Generation and Distribution Corporation (TANGEDCO) AE Exam — **Tier A** (Job)
4. `tancet`: Tamil Nadu Common Entrance Test — **Tier B** (Academic Entrance)
5. `tntet`: Tamil Nadu Teacher Eligibility Test — **Tier B** (Job / Teacher Eligibility Certification)
6. `tn-mrb-staff-nurse`: Tamil Nadu Medical Services Recruitment Board (TN MRB) Staff Nurse Exam — **Tier B** (Job)
7. `tn-mrb-assistant-surgeon`: TN MRB Assistant Surgeon (General) Recruitment Examination — **Tier B** (Job)

All 7 dossiers were authored in strict adherence to `RESEARCH-GUIDE.md`, `EXECUTION-PLAN.md`, and the canonical schema defined by `public/exam-details/upsc-cse.json`:

- **Tamil Nadu State Pay Matrix (G.O. Ms. No. 303, 2017) Alignment**:
  - All salary, compensation, and pay scales strictly derive from the **Tamil Nadu Revised Pay Rules, 2017** (Finance Department G.O. Ms. No. 303 dated 11.10.2017) and service rules of the respective boards:
    - **Level 6 (Entry Basic ₹18,200, Pay Band ₹18,200 – ₹57,900)**: TNUSRB Constable Grade-II, Jail Warder Grade-II, and Fireman.
    - **Level 10 (Entry Basic ₹20,600, Pay Band ₹20,600 – ₹65,500)**: TNTET Paper-I Secondary Grade Teacher (SGT) and TN MRB Staff Nurse (regular time scale upon absorption).
    - **Level 13 (Entry Basic ₹36,900, Pay Band ₹36,900 – ₹1,16,600)**: TNUSRB Sub-Inspector of Police (Taluk, Armed Reserve, and Tamil Nadu Special Police) and TNTET Paper-II Graduate Teacher / BT Assistant.
    - **Officer Level 1 (Entry Basic ₹39,800, Pay Band ₹39,800 – ₹1,26,500)**: TANGEDCO Assistant Engineer (Electrical / Mechanical / Civil / IT).
    - **Level 22 (Entry Basic ₹56,100, Pay Band ₹56,100 – ₹1,77,500)**: TN MRB Assistant Surgeon (General) (Tamil Nadu Medical Service).
    - **Academic Entrance Omission**: In strict compliance with Schema §5.4 and `EXECUTION-PLAN.md`, `career_ladder` and `financial_package` are omitted entirely from `tancet.json`.
  - Project constants (`da_percent_as_of_review: 58` and `da_as_of: "2025-07-01"`) maintained uniformly across all government pay structures, with Chennai CCA (Group H-1 city, ₹1,200 to ₹2,400) and HRA tiers accurately specified.
- **Primary Statutory Sources & Selection Frameworks**:
  - **TNUSRB Constable CR-2025 & CR-2023**: Verified from Tamil Nadu Uniformed Services Recruitment Board Notification No. 02/2025 dated 21.08.2025 (3,665 posts) and Notification No. 02/2023 dated 08.08.2023 (3,359 posts); statutory scheme: Part I Tamil Eligibility (80 Qs, 80 marks, 40% min qualifying) + Part II Main Written Exam (70 Qs, 70 marks, 2 hrs 40 mins overall) + Certificate Verification, PMT & ET (qualifying) + PET (24 marks) + Special marks (NCC/NSS/Sports, 6 marks).
  - **TNUSRB Sub-Inspector 2025 & 2023**: Verified from TNUSRB Notification No. 01/2025 dated 05.04.2025 (1,352 posts: 817 Taluk, 360 AR, 175 TSP) and Notification No. 01/2023 dated 05.05.2023 (621 posts); 4-stage framework: Part I Tamil Language Eligibility (100 Qs / 100 marks, qualifying 40 marks) + Part II Main Written (Open: 140 Qs / 70 marks; Dept: 170 Qs / 85 marks) + PMT & ET (qualifying) + PET (15 marks) + Viva-Voce (10 marks) + Special marks (5 marks).
  - **TANGEDCO Assistant Engineer**: Grounded in TANGEDCO Direct Recruitment Service Regulations and the statutory alignment under the Tamil Nadu Public Service Commission (TNPSC Combined Technical Services Examination — Degree Level, Notification No. 09/2024 dated 26.07.2024 per G.O. Ms. No. 83 Energy Dept).
  - **TANCET 2026**: Verified directly from Anna University Secretary TANCET Press Note dated 22.05.2026 and Information Brochure 2026 (30,919 registered, 27,468 appeared across 40 exam centres in 15 cities for MBA, MCA, and CEETA-PG).
  - **TNTET 2026**: Verified directly from Teachers Recruitment Board (TRB) Tamil Nadu Press Releases (04.07.2026 & 05.07.2026); Paper-I (61,386 registered, 59,535 appeared) and Paper-II (1,67,743 registered, 1,60,929 appeared, total 2,20,464 appearing candidates).
  - **TN MRB Staff Nurse**: Verified from TN MRB Notification No. 02/MRB/2019 dated 07.02.2019 (2,345 posts) and Special Drive Notification No. 04/MRB/2022; single-stage CBT (200 objective questions, 100 marks, 0.5 mark each, no negative marking).
  - **TN MRB Assistant Surgeon (General)**: Verified from TN MRB Notification No. 17/MRB/2025 dated 15.09.2025 (1,100 posts) and Notification No. 01/MRB/2024 dated 15.03.2024 (2,553 posts); two-paper CBT (Paper I Tamil Eligibility 50 marks qualifying + Paper II Medical Sciences 100 marks).
- **Validation**:
  - Validated with `node scripts/data-sourcing/validate-details.mjs`: **160/160 files checked, 0 errors, 0 warnings**.
- **Link Auditing**: All 27 cited official downloads and portals were checked via HTTP requests; 100% returned HTTP 200 OK.

| Exam ID | Title | Tier | Conducting Body | Pay Level (Basic) | Primary Cycle | Validation |
| :--- | :--- | :---: | :--- | :--- | :--- | :---: |
| `tnusrb-constable` | TNUSRB Police Constable Grade-II, Jail Warder & Fireman Exam | A | TNUSRB | Level 6 (₹18,200) | 3,665 (CR-2025) / 3,359 (CR-2023) | **PASS** |
| `tnusrb-si` | TNUSRB Sub-Inspector of Police (Taluk, AR & TSP) Exam | A | TNUSRB | Level 13 (₹36,900) | 1,352 (2025) / 621 (2023) | **PASS** |
| `tangedco-assistant-engineer` | TANGEDCO Assistant Engineer Examination | A | TANGEDCO / TNPSC | Officer Level 1 (₹39,800) | CTSE 09/2024 / TNEB DR | **PASS** |
| `tancet` | Tamil Nadu Common Entrance Test | B | Anna University | N/A (Entrance) | 27,468 appeared (2026) | **PASS** |
| `tntet` | Tamil Nadu Teacher Eligibility Test | B | TRB Tamil Nadu | Level 10 / Level 13 | 2,20,464 appeared (2026) | **PASS** |
| `tn-mrb-staff-nurse` | TN MRB Staff Nurse Examination | B | TN MRB | Level 10 (₹20,600 regular) | 2,345 (2019) / DAP (2022) | **PASS** |
| `tn-mrb-assistant-surgeon` | TN MRB Assistant Surgeon (General) Exam | B | TN MRB | Level 22 (₹56,100) | 1,100 (2025) / 2,553 (2024) | **PASS** |

---

## 2. Detailed Exam Logs

### 2.1 `tnusrb-constable`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (All 5 sections fully populated)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - Tamil Nadu Police Subordinate Services Rules; Tamil Nadu Special Police Subordinate Service Rules; Tamil Nadu Jail Subordinate Service Rules; Tamil Nadu Fire Subordinate Service Rules.
  - TNUSRB Common Recruitment 2025 Notification (Advt. No. 02/2025 dated 21.08.2025, `Notification_CR_2025.pdf`, 3,665 vacancies: 2,599 Police Constables, 129 Jail Warders, 937 Firemen).
  - TNUSRB Common Recruitment 2025 Syllabus (`Syllabus_CR2025.pdf`).
  - TNUSRB Common Recruitment 2025 FAQ English (`FAQ_English_CR2025.pdf`).
  - TNUSRB Annual Planner 2026 English (`Annual_Planner_2026_English.pdf`).
  - TNUSRB Common Recruitment 2023 Notification (`NotificationCR2023.pdf`, 3,359 vacancies).
  - TNUSRB Information Brochure (`informationbrochure.pdf`).
  - Tamil Nadu Revised Pay Rules, 2017 (Level 6, Entry Basic ₹18,200, Pay Band ₹18,200 – ₹57,900).
- **Links curl-checked**:
  - `https://www.tnusrb.tn.gov.in/pdfs/Notification_CR_2025.pdf` → 200 OK
  - `https://www.tnusrb.tn.gov.in/pdfs/Syllabus_CR2025.pdf` → 200 OK
  - `https://www.tnusrb.tn.gov.in/pdfs/FAQ_English_CR2025.pdf` → 200 OK
  - `https://www.tnusrb.tn.gov.in/pdfs/Annual_Planner_2026_English.pdf` → 200 OK
  - `https://www.tnusrb.tn.gov.in/pdfs/NotificationCR2023.pdf` → 200 OK
  - `https://www.tnusrb.tn.gov.in/pdfs/informationbrochure.pdf` → 200 OK
- **Confidence downgrades made**: None.

### 2.2 `tnusrb-si`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (All 5 sections fully populated)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - Tamil Nadu Police Subordinate Services Rules (Rules for Sub-Inspectors of Police).
  - TNUSRB Joint Recruitment of Sub-Inspectors of Police (Taluk, AR & TSP) 2025 Notification (Advt. No. 01/2025 dated 05.04.2025, `SI(TK, AR) 2025 Notification_n.pdf`, 1,352 vacancies: 817 Taluk, 360 Armed Reserve, 175 TSP).
  - TNUSRB Sub-Inspector 2025 Syllabus (`SI_2025_Syllabus.pdf`).
  - TNUSRB Sub-Inspector Instructions for Candidates English (`Instructions_for_candidates_English.pdf`).
  - TNUSRB Sub-Inspector 2023 Notification (`Notification_en.pdf`, 621 vacancies).
  - TNUSRB Sub-Inspector 2022 Advertisement (`siadvertisement.pdf`, 969 vacancies, 1,48,870 appearing candidates).
  - Tamil Nadu Revised Pay Rules, 2017 (Level 13, Entry Basic ₹36,900, Pay Band ₹36,900 – ₹1,16,600).
- **Links curl-checked**:
  - `https://www.tnusrb.tn.gov.in/pdfs/SI(TK,%20AR)%202025%20Notification_n.pdf` → 200 OK
  - `https://www.tnusrb.tn.gov.in/pdfs/SI_2025_Syllabus.pdf` → 200 OK
  - `https://www.tnusrb.tn.gov.in/pdfs/Instructions_for_candidates_English.pdf` → 200 OK
  - `https://www.tnusrb.tn.gov.in/pdfs/Notification_en.pdf` → 200 OK
  - `https://www.tnusrb.tn.gov.in/pdfs/siadvertisement.pdf` → 200 OK
- **Confidence downgrades made**: None.

### 2.3 `tangedco-assistant-engineer`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (All 5 sections fully populated)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - TNEB / TANGEDCO Service Regulations; Tamil Nadu Government Gazette G.O. Ms. No. 83 Energy Department aligning direct recruitments under TNPSC.
  - TNPSC Combined Technical Services Examination (Degree Level) Notification No. 09/2024 dated 26.07.2024 (`09_2024_CTS_NONOT_ENGLISH_.pdf`).
  - TNPSC Combined Technical Services Examination Scheme & Syllabus Archive (`CTSE_DIP_Eng_13.08.2024_.pdf`).
  - TNEB Ltd / TANGEDCO Official Portal (`https://www.tnebltd.gov.in`).
  - Tamil Nadu Revised Pay Rules, 2017 & TANGEDCO Revised Pay Scales for Officers (Officer Level 1, Entry Basic ₹39,800, Pay Band ₹39,800 – ₹1,26,500).
- **Links curl-checked**:
  - `https://www.tnebltd.gov.in` → 200 OK
  - `https://www.tnpsc.gov.in/Document/english/09_2024_CTS_NONOT_ENGLISH_.pdf` → 200 OK
  - `https://www.tnpsc.gov.in/Document/english/CTSE_DIP_Eng_13.08.2024_.pdf` → 200 OK
- **Confidence downgrades made**: None.

### 2.4 `tancet`
- **Tier**: B, **Exam Type**: entrance
- **Sections populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`
- **Sections marked not_available**: None
- **Sections omitted**: `career_ladder`, `financial_package` (Omitted per schema §5.4 and `EXECUTION-PLAN.md` rules for academic entrance exams)
- **Sources OPENED and read this session**:
  - Anna University Centre for Entrance Examinations Portal (`https://tancet.annauniv.edu/tancet/index.html`).
  - TANCET 2026 Information Brochure (`Information Brochure 2026.pdf`).
  - Anna University Secretary TANCET Press Release dated 22.05.2026 (`Press.pdf`, 30,919 registered, 27,468 appeared across MBA, MCA, and CEETA-PG).
- **Links curl-checked**:
  - `https://tancet.annauniv.edu/tancet/index.html` → 200 OK
  - `https://tancet.annauniv.edu/tancet/Information%20Brochure%202026.pdf` → 200 OK
  - `https://tancet.annauniv.edu/tancet/Press.pdf` → 200 OK
- **Confidence downgrades made**: None.

### 2.5 `tntet`
- **Tier**: B, **Exam Type**: job (Teacher Eligibility Certification)
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (All 5 sections populated, exceeding Tier B minimum)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - National Council for Teacher Education (NCTE) Guidelines for TET; Tamil Nadu Elementary and School Educational Subordinate Service Rules.
  - Teachers Recruitment Board (TRB) Tamil Nadu TET Portal (`https://trb.tn.gov.in/tntet.php?language=LG-1&status=Active`).
  - TRB Press Release TNTET Paper-I dated 04.07.2026 (`4059189243TET1press news.pdf`, 61,386 registered, 59,535 appeared across 289 centres).
  - TRB Press Release TNTET Paper-II dated 05.07.2026 (`4801622470press news tet paper II.pdf`, 1,67,743 registered, 1,60,929 appeared across 611 centres).
  - TRB Consolidated TNTET Press Release (`2643662506TET Press News.pdf`).
  - Tamil Nadu Revised Pay Rules, 2017 (Level 10 / ₹20,600 for SGT; Level 13 / ₹36,900 for BT Assistant).
- **Links curl-checked**:
  - `https://trb.tn.gov.in/tntet.php?language=LG-1&status=Active` → 200 OK
  - `https://trb.tn.gov.in/admin/pdf/4059189243TET1press%20news.pdf` → 200 OK
  - `https://trb.tn.gov.in/admin/pdf/4801622470press%20news%20tet%20paper%20II.pdf` → 200 OK
  - `https://trb.tn.gov.in/admin/pdf/2643662506TET%20Press%20News.pdf` → 200 OK
- **Confidence downgrades made**: None.

### 2.6 `tn-mrb-staff-nurse`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (All 5 sections populated, exceeding Tier B minimum)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - Tamil Nadu Medical Subordinate Service Rules; Health & Family Welfare Department Service Orders.
  - TN MRB Official Portal (`https://mrb.tn.gov.in/`).
  - TN MRB Notification No. 02/MRB/2019 dated 07.02.2019 (`Nurses_Notification_07022019.pdf`, 2,345 posts).
  - TN MRB Special Drive Notification No. 04/MRB/2022 dated 02.03.2022 (`notification_Nurses_DAP_020322.pdf`).
  - Tamil Nadu Revised Pay Rules, 2017 (Consolidated ₹14,000/month with ₹500 annual increments on contract; Level 10, Entry Basic ₹20,600 upon absorption to regular time scale).
- **Links curl-checked**:
  - `https://mrb.tn.gov.in/` → 200 OK
  - `https://mrb.tn.gov.in/departments_cms/uploads/tami_800/content_pdf/Nurses_Notification_07022019.pdf` → 200 OK
  - `https://mrb.tn.gov.in/departments_cms/uploads/tami_800/content_pdf/notification_Nurses_DAP_020322.pdf` → 200 OK
- **Confidence downgrades made**: None.

### 2.7 `tn-mrb-assistant-surgeon`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (All 5 sections populated, exceeding Tier B minimum)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - Tamil Nadu Medical Service Special Rules (Branch-I Medical); Health & Family Welfare Department Service Orders.
  - TN MRB Official Portal (`https://mrb.tn.gov.in/`).
  - TN MRB Assistant Surgeon (General) Notification No. 17/MRB/2025 dated 15.09.2025 (`ASGNotification2025.pdf`, 1,100 posts).
  - TN MRB Assistant Surgeon (General) Notification No. 01/MRB/2024 dated 15.03.2024 (`AS_Notification_150324.pdf`, 2,553 posts).
  - Tamil Nadu Revised Pay Rules, 2017 (Level 22, Entry Basic ₹56,100, Pay Band ₹56,100 – ₹1,77,500).
- **Links curl-checked**:
  - `https://mrb.tn.gov.in/` → 200 OK
  - `https://mrb.tn.gov.in/departments_cms/uploads/tami_800/content_pdf/ASGNotification2025.pdf` → 200 OK
  - `https://mrb.tn.gov.in/departments_cms/uploads/tami_800/content_pdf/AS_Notification_150324.pdf` → 200 OK
- **Confidence downgrades made**: None.
