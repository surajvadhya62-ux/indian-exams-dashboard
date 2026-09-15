# Research Log: Unit 39 (u039) — Subordinate Boards & State Police Recruitment Boards — Rajasthan

- **Unit ID**: `u039`
- **Batch ID**: `batch-5-subordinate-police-boards--rajasthan`
- **Label**: `Subordinate Boards & State Police Recruitment Boards — Rajasthan`
- **Timestamp**: 2026-09-12T03:55:00+05:30
- **Status**: Completed (10/10 exams researched, authored, and validated)
- **Reviewer**: Antigravity IDE Autonomous Agent

---

## 1. Summary of Unit Execution
Unit 39 covers the 10 major subordinate, technical, ministerial, and police recruitment examinations of the State of Rajasthan:
1. `rsmssb-cet-12th`: RSMSSB Common Eligibility Test (Senior Secondary Level) — **Tier A**
2. `rsmssb-cet-graduate`: RSMSSB Common Eligibility Test (Graduation Level) — **Tier A**
3. `rsmssb-patwari`: RSMSSB Rajasthan Patwari Examination — **Tier A**
4. `rsmssb-vdo`: RSMSSB Village Development Officer (Gram Vikas Adhikari) Exam — **Tier A**
5. `rajasthan-police-constable`: Rajasthan Police Constable Recruitment Examination — **Tier A**
6. `rsmssb-junior-accountant`: RSMSSB Junior Accountant & Tehsil Revenue Accountant (TRA) Exam — **Tier B**
7. `rsmssb-informatics-assistant`: RSMSSB Informatics Assistant (Soochana Sahayak) Examination — **Tier B**
8. `rsmssb-lab-assistant`: RSMSSB Lab Assistant (Prayogshala Sahayak) Examination — **Tier B**
9. `rsmssb-agriculture-supervisor`: RSMSSB Krishi Paryavekshak (Agriculture Supervisor) Exam — **Tier B**
10. `rsmssb-sanganak`: RSMSSB Computor (Sanganak) Examination — **Tier C**

All 10 dossiers were authored in strict conformity with `RESEARCH-GUIDE.md`, `EXECUTION-PLAN.md`, and the schema defined by `public/exam-details/upsc-cse.json`:
- **Rajasthan State Pay Matrix & 7th CPC Alignment**: All salary and financial packages are grounded in the **Rajasthan Civil Services (Revised Pay) Rules, 2017** (notified vide Finance Department Notification No. F.15(1)FD/Rules/2017 dated 30 October 2017, effective 1 January 2016):
  - **Level L-5 (Entry Basic ₹20,800)**: Police Constable, Patwari, Agriculture Supervisor, and Junior Assistant / Clerk Gr II (probation fixed remuneration ₹14,600/month for 2 years).
  - **Level L-6 (Entry Basic ₹21,500)**: Village Development Officer / Gram Vikas Adhikari (probation fixed remuneration ₹15,100/month).
  - **Level L-8 (Entry Basic ₹26,300)**: Informatics Assistant, Lab Assistant, and Computor / Sanganak (probation fixed remuneration ₹18,500/month).
  - **Level L-10 (Entry Basic ₹33,800)**: Junior Accountant & Tehsil Revenue Accountant (TRA) (probation fixed remuneration ₹23,700/month).
  - Project constants (`da_percent_as_of_review: 58` and `da_as_of: "2025-07-01"`) strictly maintained across all dossiers.
- **Statutory Frameworks & Schemes Verified**:
  - **Rajasthan Subordinate and Ministerial Services (Common Eligibility Test) Rules, 2022** (DOP Notification No. F.2(1)DOP/A-II/2021 dated 23 May 2022) verified for CET 12th Level (Schedule II) and CET Graduate Level (Schedule I).
  - **Single vs Two-Stage Written Schemes**: VDO 2021 verified as two-stage (Prelims 100 marks + Mains 200 marks, 1/3rd negative marking). Junior Accountant verified as 2 papers (Paper I 450 marks + Paper II 450 marks = 900 marks, 1/3rd penalty). Informatics Assistant verified as Part I Written (100 marks) + Part II Qualifying Bilingual Typing Test (20 wpm). Lab Assistant verified as Paper I (200 marks) + Paper II (200 marks) = 400 marks. Computor (Sanganak) verified as 100 questions / 100 marks (Part A 30 + Part B 70).
  - **Rajasthan Police Constable 2023**: Verified from Police Headquarters Notification No. 2305 dated 03.08.2023; 4-stage selection: PST/PET (5 km run, qualifying) → CBT (150 questions, 150 marks, 0.25 negative marking) → Trade Proficiency Test (30 marks) → DV & Medical.
- **Validation**: Every single dossier passed `node scripts/data-sourcing/validate-details.mjs` with **0 errors** and **0 warnings**.
- **Link Auditing**: All 32 unique cited URLs were live checked via automated HTTP requests; 100% returned HTTP 200 OK.

| Exam ID | Title | Tier | Conducting Body | Pay Level (Basic) | Primary Cycle | Validation |
| :--- | :--- | :---: | :--- | :--- | :--- | :---: |
| `rsmssb-cet-12th` | RSMSSB Common Eligibility Test (Senior Secondary Level) | A | RSMSSB | Level L-5 (₹20,800) | 2024 / 2022 | **PASS** |
| `rsmssb-cet-graduate` | RSMSSB Common Eligibility Test (Graduation Level) | A | RSMSSB | Level L-10 (₹33,800) | 2024 / 2022 | **PASS** |
| `rsmssb-patwari` | RSMSSB Rajasthan Patwari Examination | A | RSMSSB | Level L-5 (₹20,800) | 5,610 (2021) | **PASS** |
| `rsmssb-vdo` | RSMSSB Village Development Officer (Gram Vikas Adhikari) Exam | A | RSMSSB | Level L-6 (₹21,500) | 5,396 (2021) | **PASS** |
| `rajasthan-police-constable` | Rajasthan Police Constable Recruitment Examination | A | Rajasthan Police | Level L-5 (₹20,800) | 3,578 (2023) | **PASS** |
| `rsmssb-junior-accountant` | RSMSSB Junior Accountant & TRA Exam | B | RSMSSB | Level L-10 (₹33,800) | 5,388 (2023) | **PASS** |
| `rsmssb-informatics-assistant` | RSMSSB Informatics Assistant (Soochana Sahayak) Exam | B | RSMSSB | Level L-8 (₹26,300) | 3,415 (2023) | **PASS** |
| `rsmssb-lab-assistant` | RSMSSB Lab Assistant (Prayogshala Sahayak) Exam | B | RSMSSB | Level L-8 (₹26,300) | 1,012 (2022) | **PASS** |
| `rsmssb-agriculture-supervisor` | RSMSSB Krishi Paryavekshak (Agriculture Supervisor) Exam | B | RSMSSB | Level L-5 (₹20,800) | 430 (2023) | **PASS** |
| `rsmssb-sanganak` | RSMSSB Computor (Sanganak) Examination | C | RSMSSB | Level L-8 (₹26,300) | 583 (2023) | **PASS** |

---

## 2. Detailed Exam Logs

### 2.1 `rsmssb-cet-12th`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (All 5 sections populated)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - Rajasthan Subordinate and Ministerial Services (Common Eligibility Test) Rules, 2022 (DOP Notification No. F.2(1)DOP/A-II/2021 dated 23.05.2022, Schedule II).
  - RSMSSB CET Senior Secondary Level 2024 Exam Schedule Notice (`CET_Sr_Sec2024_Examschedule27092024.pdf`, 313 KB).
  - RSMSSB CET Senior Secondary Level 2024 Admit Card & Exam Directives Notice (`CET(12TH)_aDV_14102024.pdf`, 1.33 MB).
  - RSMSSB CET Senior Secondary Level 2024 Master Question Paper & Objections Notice (`CET_Sr_Sec2024_Qest_Objct06122024.pdf`, 121 KB).
  - RSMSSB CET Senior Secondary Level 2022 Detailed Advertisement & Syllabi (`CET Sr New.pdf`, 452 KB).
  - Rajasthan Civil Services (Revised Pay) Rules, 2017 (Level L-5 Schedule: Entry Basic ₹20,800, probation fixed ₹14,600).
- **Links curl-checked**:
  - `https://rsmssb.rajasthan.gov.in/page?menuName=Home` → 200 OK
  - `https://rsmssb.rajasthan.gov.in/Static/files/CET_Sr_Sec2024_Examschedule27092024.pdf` → 200 OK
  - `https://rsmssb.rajasthan.gov.in/Static/files/CET(12TH)_aDV_14102024.pdf` → 200 OK
  - `https://rsmssb.rajasthan.gov.in/Static/files/CET_Sr_Sec2024_Qest_Objct06122024.pdf` → 200 OK
  - `https://rsmssb.rajasthan.gov.in/Static/files/CET%20Sr%20New.pdf` → 200 OK
- **Confidence downgrades made**: None.

### 2.2 `rsmssb-cet-graduate`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (All 5 sections populated)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - Rajasthan Subordinate and Ministerial Services (Common Eligibility Test) Rules, 2022 (Schedule I posts).
  - RSMSSB CET Graduate Level 2024 Detailed Advertisement Advt. No. 09/2024 dated 06.08.2024.
  - State Recruitment Portal Post Details Servlet (`postdetailsservlet?rect_id=3426`, confirmed registration dates 09.08.2024 to 07.09.2024).
  - RSMSSB CET Graduate 2024 Center Update Notice (`CET(Grudt)2024_CenterChng25092024.pdf`, 361 KB).
  - RSMSSB CET Graduate 2024 Question Paper Objection Notice (`CET_Grd_2024_QuesObj_PN_20112024.pdf`, 1.00 MB).
  - RSMSSB CET Graduate 2024 Online Application Editing Order (`CET24_Edit_21102024.pdf`, 382 KB).
  - RSMSSB CET Graduate 2022 Scorecard & Attendance Press Release (8,22,600 candidates appeared).
- **Links curl-checked**:
  - `https://rsmssb.rajasthan.gov.in/page?menuName=Home` → 200 OK
  - `https://rsmssb.rajasthan.gov.in/Static/files/CET(Grudt)2024_CenterChng25092024.pdf` → 200 OK
  - `https://rsmssb.rajasthan.gov.in/Static/files/CET_Grd_2024_QuesObj_PN_20112024.pdf` → 200 OK
  - `https://rsmssb.rajasthan.gov.in/Static/files/CET24_Edit_21102024.pdf` → 200 OK
- **Confidence downgrades made**: None.

### 2.3 `rsmssb-patwari`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (All 5 sections populated)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - Rajasthan Land Revenue (Land Records) Rules, 1957.
  - RSMSSB Patwar 2019 Amended Advertisement (`Patwar2019_Ammended_Adv_08072021.pdf`, 2.27 MB, 5,378 posts revised to 5,610).
  - State Recruitment Portal Post Details (`postdetailsservlet?rect_id=1353`).
  - RSMSSB Patwar 2021 Final Selection Recommendation Order List-V (`Patwar2021_result11012024.pdf`, 317 KB).
  - RSMSSB Patwar 2021 Final Selection Recommendation Order List-III (`patwar2021_finalresultlist_III26082022.pdf`, 159 KB).
  - Rajasthan Civil Services (Revised Pay) Rules, 2017 (Level L-5, ₹20,800 basic).
- **Links curl-checked**:
  - `https://rsmssb.rajasthan.gov.in/page?menuName=Home` → 200 OK
  - `https://rsmssb.rajasthan.gov.in/Static/files/Patwar2021_result11012024.pdf` → 200 OK
  - `https://rsmssb.rajasthan.gov.in/Static/files/patwar2021_finalresultlist_III26082022.pdf` → 200 OK
  - `https://rsmssb.rajasthan.gov.in/Static/files/Patwar2019_Ammended_Adv_08072021.pdf` → 200 OK
- **Confidence downgrades made**: None.

### 2.4 `rsmssb-vdo`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (All 5 sections populated)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - Rajasthan Panchayati Raj Rules, 1996 and Panchayati Raj Act, 1994.
  - RSMSSB VDO 2021 Detailed Recruitment Advertisement Advt. No. 04/2021 dated 06.09.2021 (`postdetailsservlet?rect_id=1773`).
  - RSMSSB VDO 2021 Revised Advertisement with District-wise Posts (`VDO2021_Distwisepost.pdf`, 336 KB, revised to 5,396 posts).
  - RSMSSB VDO 2021 Amended Advertisement Notice (`VDO_Amendedadvt_28102021.pdf`, 520 KB).
  - RSMSSB VDO 2021 Final Recommendation & Cut-off Marks Notice (`VDO2021_Results_18052023.pdf`, 750 KB).
  - Rajasthan Civil Services (Revised Pay) Rules, 2017 (Level L-6, ₹21,500 basic, probation fixed ₹15,100).
- **Links curl-checked**:
  - `https://rsmssb.rajasthan.gov.in/page?menuName=Home` → 200 OK
  - `https://rsmssb.rajasthan.gov.in/Static/files/VDO2021_Results_18052023.pdf` → 200 OK
  - `https://rsmssb.rajasthan.gov.in/Static/files/VDO2021_Distwisepost.pdf` → 200 OK
  - `https://rsmssb.rajasthan.gov.in/Static/files/VDO_Amendedadvt_28102021.pdf` → 200 OK
- **Confidence downgrades made**: None.

### 2.5 `rajasthan-police-constable`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (All 5 sections populated)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - Rajasthan Police Subordinate Service Rules, 1989.
  - Rajasthan Police Constable Recruitment-2023 Standing Order / Notification No. 2305 dated 03.08.2023 (3,578 vacancies: Non-TSP 3,240, TSP 338).
  - Rajasthan Police CBT Exam Schedule Notification (CBT conducted on 13 & 14 June 2024; PST/PET conducted 27-30 December 2023).
  - Rajasthan Police Official Web Portal (`police.rajasthan.gov.in`, confirmed live 200 OK).
  - Rajasthan State Recruitment Portal (`recruitment.rajasthan.gov.in`, confirmed live 200 OK).
  - Rajasthan Civil Services (Revised Pay) Rules, 2017 (Level L-5, ₹20,800 basic, probation fixed ₹14,600).
- **Links curl-checked**:
  - `https://police.rajasthan.gov.in` → 200 OK
  - `https://recruitment.rajasthan.gov.in/` → 200 OK
- **Confidence downgrades made**: None.

### 2.6 `rsmssb-junior-accountant`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (All 5 sections populated, exceeding Tier B minimum requirements)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - Rajasthan Subordinate Accounts Service Rules, 1963 & Rajasthan Revenue Accounts Subordinate Service Rules, 1975.
  - RSMSSB Advt. No. 02/2023 dated 20.06.2023 (`JrAccntntNTRA_Adrtzmnt_20062023.pdf`, 10.5 MB, 19 pages read via `pdftoppm` and `view_file`).
  - RSMSSB Junior Accountant & TRA Amended Advertisement (`JrActntNdTRA_AmndedAdrtzmnt_23062023.pdf`, 604 KB).
  - RSMSSB Medical Examination & Recommendation Order (`JRA23_ME_29112024.pdf`, 275 KB).
  - Rajasthan Civil Services (Revised Pay) Rules, 2017 (Level L-10, Entry Basic ₹33,800, probation fixed ₹23,700).
- **Links curl-checked**:
  - `https://rsmssb.rajasthan.gov.in/page?menuName=Home` → 200 OK
  - `https://rsmssb.rajasthan.gov.in/Static/files/JrAccntntNTRA_Adrtzmnt_20062023.pdf` → 200 OK
  - `https://rsmssb.rajasthan.gov.in/Static/files/JrActntNdTRA_AmndedAdrtzmnt_23062023.pdf` → 200 OK
  - `https://rsmssb.rajasthan.gov.in/Static/files/JRA23_ME_29112024.pdf` → 200 OK
- **Confidence downgrades made**: None.

### 2.7 `rsmssb-informatics-assistant`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (All 5 sections populated)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - Rajasthan Computer State and Subordinate Services Rules, 1992.
  - State Recruitment Portal Post Details (`postdetailsservlet?rect_id=2735`, 2,730 initial posts).
  - RSMSSB IA 2023 Amended Advertisement Notice (`AmmdAdvtIA_14062024.pdf`, 182 KB, vacancies revised to 3,415).
  - RSMSSB IA 2023 Primary Answer Key Notice (`IA2023_FirstAnsKey02022024.pdf`, 890 KB).
  - RSMSSB IA 2023 Document Verification Schedule Order (`IA2023_Batchwise_Schedule.pdf`).
  - RSMSSB Informatics Assistant Full Advertisement Archive (`IA_FullAdvt_1104_27022018_raj.pdf`, 5.60 MB).
  - Rajasthan Civil Services (Revised Pay) Rules, 2017 (Level L-8, Entry Basic ₹26,300, probation fixed ₹18,500).
- **Links curl-checked**:
  - `https://rsmssb.rajasthan.gov.in/page?menuName=Home` → 200 OK
  - `https://rsmssb.rajasthan.gov.in/Static/files/IA2023_FirstAnsKey02022024.pdf` → 200 OK
  - `https://rsmssb.rajasthan.gov.in/Static/files/AmmdAdvtIA_14062024.pdf` → 200 OK
  - `https://rsmssb.rajasthan.gov.in/Static/files/IA_FullAdvt_1104_27022018_raj.pdf` → 200 OK
- **Confidence downgrades made**: None.

### 2.8 `rsmssb-lab-assistant`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (All 5 sections populated)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - Rajasthan Educational Subordinate Service Rules, 1971; Forensic Science Subordinate Rules.
  - RSMSSB Lab Assistant 2022 Detailed Advertisement Advt. No. 04/2022 (`LabAssistant2022_Advertisement16032022_1.pdf`, 1.61 MB, 1,012 posts across 7 codes).
  - State Recruitment Portal Post Details (`postdetailsservlet?rect_id=2254`).
  - RSMSSB Lab Assistant 2022 Final Selected Candidates Order (`Lab_Asst_Sci_Final_Sel_Cand_22022023_1.pdf`, 2.82 MB).
  - RSMSSB Lab Assistant Full Advertisement Archive (`Full_LabA.pdf`, 825 KB).
  - Rajasthan Civil Services (Revised Pay) Rules, 2017 (Level L-8, Entry Basic ₹26,300, probation fixed ₹18,500).
- **Links curl-checked**:
  - `https://rsmssb.rajasthan.gov.in/page?menuName=Home` → 200 OK
  - `https://rsmssb.rajasthan.gov.in/Static/files/Lab_Asst_Sci_Final_Sel_Cand_22022023_1.pdf` → 200 OK
  - `https://rsmssb.rajasthan.gov.in/Static/files/LabAssistant2022_Advertisement16032022_1.pdf` → 200 OK
  - `https://rsmssb.rajasthan.gov.in/Static/files/Full_LabA.pdf` → 200 OK
- **Confidence downgrades made**: None.

### 2.9 `rsmssb-agriculture-supervisor`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (All 5 sections populated)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - Rajasthan Agriculture Subordinate Service Rules, 1978.
  - RSMSSB Advt. No. 06/2023 dated 10.07.2023 (`Agriculture_Supervisor_2023.pdf`, 9.26 MB, 430 posts, read via `pdftoppm` and `view_file`).
  - State Recruitment Portal Post Details (`postdetailsservlet?rect_id=2920`).
  - RSMSSB Agriculture Supervisor 2023 Final Selection & Cut-off Order Dated 28.11.2024 (`AgriSup23_Result_28112024.pdf`, 1.69 MB).
  - RSMSSB Agriculture Supervisor Full Advertisement Archive (`FullAdvt_AgriSupervisor2018_2776_250518.pdf`, 840 KB).
  - Rajasthan Civil Services (Revised Pay) Rules, 2017 (Level L-5, Entry Basic ₹20,800, probation fixed ₹14,600).
- **Links curl-checked**:
  - `https://rsmssb.rajasthan.gov.in/page?menuName=Home` → 200 OK
  - `https://rsmssb.rajasthan.gov.in/Static/files/AgriSup23_Result_28112024.pdf` → 200 OK
  - `https://rsmssb.rajasthan.gov.in/Static/files/Agriculture_Supervisor_2023.pdf` → 200 OK
  - `https://rsmssb.rajasthan.gov.in/Static/files/FullAdvt_AgriSupervisor2018_2776_250518.pdf` → 200 OK
- **Confidence downgrades made**: None.

### 2.10 `rsmssb-sanganak`
- **Tier**: C, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (All 5 sections populated, exceeding Tier C minimum requirement of official_downloads)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - Rajasthan Statistical Subordinate Service Rules, 1971.
  - RSMSSB Advt. No. 05/2023 dated 07.07.2023 (`ADV_computer07072023.pdf`, 1.40 MB, 583 posts).
  - State Recruitment Portal Post Details (`postdetailsservlet?rect_id=2918`).
  - RSMSSB Computor 2023 Roll Number List for Document Verification Order Dated 05.07.2024 (`Computer23_Result_05072024.pdf`, 8.10 MB).
  - RSMSSB Computor 2023 Final Selection & Recommendation Notice Dated 29.11.2024 (`Computer23_Result_29112024.pdf`, 1.08 MB).
  - RSMSSB Computor Full Advertisement Archive (`Computor_FullAdvt_1063_20022018_raj.pdf`, 5.87 MB).
  - Rajasthan Civil Services (Revised Pay) Rules, 2017 (Level L-8, Entry Basic ₹26,300, probation fixed ₹18,500).
- **Links curl-checked**:
  - `https://rsmssb.rajasthan.gov.in/page?menuName=Home` → 200 OK
  - `https://rsmssb.rajasthan.gov.in/Static/files/Computer23_Result_29112024.pdf` → 200 OK
  - `https://rsmssb.rajasthan.gov.in/Static/files/Computer23_Result_05072024.pdf` → 200 OK
  - `https://rsmssb.rajasthan.gov.in/Static/files/ADV_computer07072023.pdf` → 200 OK
  - `https://rsmssb.rajasthan.gov.in/Static/files/Computor_FullAdvt_1063_20022018_raj.pdf` → 200 OK
- **Confidence downgrades made**: None.
