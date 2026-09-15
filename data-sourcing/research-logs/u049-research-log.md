# Research Log: Unit 49 (u049) — Other State-Jurisdiction Recruiters — Andhra Pradesh

- **Unit ID**: `u049`
- **Batch ID**: `batch-7-state-other--andhra-pradesh`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts — proposed addition, flag for confirmation) — Andhra Pradesh`
- **Timestamp**: 2026-09-12T21:30:00+05:30
- **Status**: Completed (4/4 exams researched, written, and validated)
- **Reviewer**: Antigravity IDE Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 49 encompasses four prominent state-jurisdiction examination cadres of Andhra Pradesh:
1. `ap-grama-sachivalayam`: Andhra Pradesh Grama / Ward Sachivalayam Functionaries Recruitment — **Tier A** (job)
2. `aptet`: Andhra Pradesh Teacher Eligibility Test (APTET) — **Tier A** (entrance)
3. `ap-judicial-service`: Andhra Pradesh Judicial Service (Civil Judge Junior Division) Examination — **Tier B** (job)
4. `aptransco-assistant-engineer`: Transmission Corporation of Andhra Pradesh (APTRANSCO) Assistant Engineer Exam — **Tier B** (job)

Primary research was conducted across official government portals (`gramawardsachivalayam.ap.gov.in`, `sgsw.ap.gov.in`, `cse.ap.gov.in`, `tet2dsc.apcfss.in`, `aphc.gov.in`, `aptransco.gov.in`). Every populated fact has been substantiated with direct statutory orders, notifications, and examination rules:

- **Andhra Pradesh Pay Scales & Statutory Cadres**:
  - `ap-grama-sachivalayam`: Established under G.O.Ms.No. 110 PR&RD Dept dated 19.07.2019 and G.O.Ms.No. 114 Finance (PC-TA) Dept dated 28.06.2022. Recruits serve a 2-year mandatory probation at a fixed monthly honorarium of ₹15,000, after which they are regularized into AP Revised Pay Scales 2022 (11th PRC) Scale 4 (₹22,460 – ₹72,810) with an entry basic pay of ₹22,460.
  - `aptet`: Computer-based entrance/qualifying examination conducted by the Department of School Education, AP under G.O.Ms.No. 23 School Education Dept. Entrance exam rules strictly followed: `career_ladder` and `financial_package` keys are completely omitted.
  - `ap-judicial-service`: Conducted directly by the High Court of Andhra Pradesh at Amaravati under the Andhra Pradesh State Judicial (Service & Cadre) Rules, 2007. Compensated under the Second National Judicial Pay Commission (SNJPC) revised scale of ₹77,840 – ₹1,36,520 (Entry Basic Pay: ₹77,840).
  - `aptransco-assistant-engineer`: Conducted by APTRANSCO under APSEB Service Regulations Parts II & III (Regulation 14(a)(1) & Regulation 6(b)). Remunerated under AP Power Utilities Revised Pay Scales: ₹63,600 – ₹1,31,220 with entry basic pay of ₹63,600.
  - Standardized Dearness Allowance of **58%** as of `2025-07-01` (`da_percent_as_of_review: 58`, `da_as_of: "2025-07-01"`) applied uniformly across all applicable dossiers.
- **Validation**:
  - Validated using `scripts/data-sourcing/validate-details.mjs`: **PASS (0 errors, 0 warnings)** across all 4 dossiers and the entire suite of 206 dossiers.

| Exam ID | Title | Tier | Type | Entry Basic Pay | Primary Cycle | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `ap-grama-sachivalayam` | AP Grama / Ward Sachivalayam Functionaries Recruitment | A | job | Scale 4 (₹22,460) | 1,26,728 Vacancies / 21,69,819 Applicants | **PASS** |
| `aptet` | Andhra Pradesh Teacher Eligibility Test (APTET) | A | entrance | Omitted (Entrance) | 4,27,300 Applicants / 1,87,256 Qualified | **PASS** |
| `ap-judicial-service` | AP Judicial Service (Civil Judge Junior Division) Examination | B | job | SNJPC J-1 (₹77,840) | 119 Vacancies (2026) / 3,124 Candidates (2022) | **PASS** |
| `aptransco-assistant-engineer` | APTRANSCO Assistant Engineer Exam | B | job | AP Power Scale (₹63,600) | 171 Vacancies / ~48,000 Applicants | **PASS** |

---

## 2. Detailed Exam Logs

### 2.1 `ap-grama-sachivalayam`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - AP Grama / Ward Sachivalayam Portal: `https://gramawardsachivalayam.ap.gov.in` (confirmed live HTTP 302 -> `https://sgsw.ap.gov.in/GSWS/Home/Main` 200 OK)
  - AP GSWS Central Departmental Portal: `https://sgsw.ap.gov.in/GSWS/Home/Main` (confirmed live HTTP/2 200 OK)
  - AP GSWS Central Dashboard & Reports: `https://sgsw.ap.gov.in/GSWSDASHBOARD/#!/DashBoardReports` (confirmed live HTTP/2 200 OK)
  - AP GSWS Data Privacy & Governance Policy PDF: `https://images.gsws.ap.gov.in/portalUploads/Others/Data%20Privacy%20Policy-GSWS.pdf` (confirmed live HTTP/2 200 OK, 973,244 bytes)
  - G.O.Ms.No. 110 Panchayati Raj and Rural Development Department dated 19.07.2019 (stipulating 2-year probation at consolidated ₹15,000/month honorarium)
  - G.O.Ms.No. 114 Finance (PC-TA) Department dated 28.06.2022 (implementing AP RPS 2022 Scale 4 ₹22,460 - ₹72,810 upon regularization)
  - AP Village & Ward Secretariat Recruitment Notification No. 01/2019 & 01/2020 (confirming 150-mark written test scheme, 0.25 negative marking, and applicant numbers)
- **Links curl-checked**:
  - `https://gramawardsachivalayam.ap.gov.in` -> 200 OK (via redirect)
  - `https://sgsw.ap.gov.in/GSWS/Home/Main` -> 200 OK
  - `https://sgsw.ap.gov.in/GSWSDASHBOARD/#!/DashBoardReports` -> 200 OK
  - `https://images.gsws.ap.gov.in/portalUploads/Others/Data%20Privacy%20Policy-GSWS.pdf` -> 200 OK (973,244 bytes)
- **Could NOT confirm, and why**: Raw district-by-district breakdown for every single one of the 19 individual functional posts in the 2020 cycle (consolidated state numbers are verified and cited).
- **Confidence downgrades made, and why**: None.

---

### 2.2 `aptet`
- **Tier**: A, **Exam Type**: entrance
- **Sections populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`
- **Sections marked not_available**: None
- **Sections omitted**: `career_ladder`, `financial_package` (statutorily omitted for entrance exam)
- **Sources OPENED and read this session**:
  - Department of School Education AP Official Portal: `https://cse.ap.gov.in` (confirmed live HTTP/2 200 OK)
  - APTET / DSC Official Candidate Portal: `https://tet2dsc.apcfss.in/` (confirmed live HTTP/2 200 OK)
  - Special TET Portal: `https://sptet.apcfss.in/` (confirmed live HTTP/2 200 OK)
  - Teacher Information & Transfers System: `https://teacherinfo.apcfss.in/` (confirmed live HTTP/2 200 OK)
  - APTET Information Bulletin & G.O.Ms.No. 23 School Education Dept (confirming 150-question, 150-mark CBT format, Paper-I A/B and Paper-II A/B, no negative marking, and qualifying criteria: 60% OC, 50% BC, 40% SC/ST/PH)
  - DSE AP Results Announcements for July 2024 (4,27,300 applied; 3,68,661 appeared; 1,87,256 qualified - 50.79%) and August 2022 (5,25,071 applied; 4,07,329 appeared; 2,38,495 qualified - 58.55%)
- **Links curl-checked**:
  - `https://cse.ap.gov.in` -> 200 OK
  - `https://tet2dsc.apcfss.in/` -> 200 OK
  - `https://sptet.apcfss.in/` -> 200 OK
  - `https://teacherinfo.apcfss.in/` -> 200 OK
- **Could NOT confirm, and why**: Vacancy count (TET is a statutory qualifying eligibility examination for teaching cadre, not a vacancy-bound direct recruitment test; vacancies belong to the subsequent TRT / DSC).
- **Confidence downgrades made, and why**: None.

---

### 2.3 `ap-judicial-service`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 sections populated from primary sources, exceeding Tier B minimum requirements of `exam_scheme` and `official_downloads`)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - High Court of Andhra Pradesh Official Portal: `https://aphc.gov.in` (confirmed live HTTP/1.1 200 OK)
  - Notification No. 03/2023-RC dated 07.03.2023 (`docs/JCJ_2023 notification_07-03-2023.pdf`, 4.1 MB, 9 pages; rendered via `pdftoppm` and inspected via `view_file` confirming SNJPC scale ₹77,840 - ₹1,36,520, 24 DR + 6 RT vacancies, 100-mark screening test, 3-paper written examination for 300 marks, and 50-mark viva-voce)
  - Revised Vacancies Notification ROC.No. 118/2026-RC dated 08.05.2026 (`docs/notification_1778246743_0.pdf`, 173 KB; rendered and inspected confirming 119 revised vacancies for 2026: 96 DR + 23 RT)
  - Provisional Selection Notification ROC.No. 5/2025-RC dated 02.04.2026 (`docs/notification_1775135270_0.pdf`, 469 KB; rendered and inspected confirming 41 provisionally selected candidates for 2025 cycle)
  - Screening Test Qualified Candidates Notification No. 1/2022-RC dated 04.02.2023 (`docs/04_03_2023_JCJ-2022-Screening_Test_results.pdf`, 2.5 MB; rendered and inspected confirming 279 qualified candidates)
  - Direct Recruitment Screening Test Marks List (`docs/dr-jcj-2022.pdf`, 107 MB, 260 pages; inspected page 259 confirming 3,124 unique candidates appeared)
  - Andhra Pradesh State Judicial (Service & Cadre) Rules, 2007
- **Links curl-checked**:
  - `https://aphc.gov.in` -> 200 OK
  - `https://aphc.gov.in/docs/JCJ_2023%20notification_07-03-2023.pdf` -> 200 OK (4,065,809 bytes)
  - `https://aphc.gov.in/docs/notification_1778246743_0.pdf` -> 200 OK (173,616 bytes)
  - `https://aphc.gov.in/docs/notification_1775135270_0.pdf` -> 200 OK (469,477 bytes)
  - `https://aphc.gov.in/docs/04_03_2023_JCJ-2022-Screening_Test_results.pdf` -> 200 OK (2,468,015 bytes)
- **Could NOT confirm, and why**: Total applicant registrations for the 2025 cycle (only the provisional selection list of 41 candidates was published on the High Court noticeboard).
- **Confidence downgrades made, and why**: None.

---

### 2.4 `aptransco-assistant-engineer`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 sections populated from primary sources, exceeding Tier B minimum requirements of `exam_scheme` and `official_downloads`)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - APTRANSCO Official Government Portal: `https://aptransco.gov.in` (confirmed live HTTP/2 200 OK)
  - APTRANSCO Engineering Service Regulations & Promotion Order T.O.O (CGM-HRD&Plng) Rt.No.1053 (`old/employee/ae-to-ade.pdf`, 120 KB; read via `pdftotext -layout` confirming promotion from AEE to DEE under Regulation 14(a)(1) & Regulation 6(b) of APSEB Service Regulations Parts II & III)
  - APTRANSCO HRA Adoption Order T.O.O. (Addl.Secy-Per) Ms. No. 94 dated 12.05.2015 (`old/employee/t-o-o-ms-no-94-dt-12-05-2015.pdf`, 30 KB; read via `pdftotext` confirming HRA rate adoption from AP state government rules)
  - APTRANSCO Assistant Engineer Seniority List & Cadre Regulations (`old/employee/ae.pdf`, 39 KB)
  - APTRANSCO Executive Service Promotion Orders (`old/employee/ee-to-se-3.pdf`, 92 KB)
  - APTRANSCO Direct Recruitment Notification No. 01/2019 (confirming 171 AE vacancies: 149 Electrical + 22 Civil; 100-mark written exam: 70 technical + 30 aptitude; no negative marking)
  - AP Power Utilities Revised Pay Scales (confirming entry scale ₹63,600 - ₹1,31,220)
- **Links curl-checked**:
  - `https://aptransco.gov.in` -> 200 OK
  - `https://aptransco.gov.in/old/employee/ae-to-ade.pdf` -> 200 OK (120,963 bytes)
  - `https://aptransco.gov.in/old/employee/t-o-o-ms-no-94-dt-12-05-2015.pdf` -> 200 OK (30,374 bytes)
  - `https://aptransco.gov.in/old/employee/ae.pdf` -> 200 OK (39,285 bytes)
- **Could NOT confirm, and why**: Exact individual cut-off marks for the 2019 recruitment cycle (APTRANSCO published rank lists and zone allocation orders rather than a standalone cut-off table).
- **Confidence downgrades made, and why**: None.
