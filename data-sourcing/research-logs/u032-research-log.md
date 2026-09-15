# Research Log: Unit 32 (u032) — Major State Public Service Commissions — Sikkim

- **Unit ID**: `u032`
- **Batch ID**: `batch-4-state-psc--sikkim`
- **Label**: `Major State Public Service Commissions (State Administrative Services) — Sikkim`
- **Timestamp**: 2026-09-12T03:22:00+05:30
- **Status**: Completed (2/2 exams researched, written, and validated)
- **Reviewer**: Antigravity IDE Autonomous Agent

---

## 1. Summary of Unit Execution
Unit 32 covers the premier civil service and police recruitment examinations of the State of Sikkim conducted by the Sikkim Public Service Commission (SPSC):
1. `spsc-cce`: Sikkim Public Service Commission Combined Competitive Examination (Sikkim State Civil Service / Sikkim State Police Service / Sikkim State Finance & Accounts Service) — **Tier B**
2. `spsc-sub-inspector`: Sikkim Police Sub-Inspector of Police Recruitment Examination — **Tier C**

Both dossiers were authored in strict accordance with `RESEARCH-GUIDE.md`, `EXECUTION-PLAN.md`, and the schema defined by `public/exam-details/upsc-cse.json`:
- **State Administrative & Police Pay Structure**: Formally governed by the **Sikkim Services (Revised Pay) Rules, 2018** (effective 01.01.2016):
  - **Sikkim State Civil Service (SSCS - Under Secretary)**: Appointed in **Pay Matrix Level 15** (Entry Basic Pay **₹45,600**; scale ₹45,600 – ₹1,07,500; corresponding to pre-revised PB-3 ₹9,300 – ₹34,800 + GP ₹5,400).
  - **Sikkim State Finance & Accounts Service (SSF&AS - Accounts Officer)**: Appointed in **Pay Matrix Level 15** (Entry Basic Pay **₹45,600**; scale ₹45,600 – ₹1,07,500).
  - **Sikkim State Police Service (SSPS - Deputy Superintendent of Police)**: Appointed in **Pay Matrix Level 16** (Entry Basic Pay **₹49,100**; scale ₹49,100 – ₹1,15,500; corresponding to pre-revised PB-3 ₹9,300 – ₹34,800 + GP ₹5,800).
  - **Sikkim Police Sub-Inspector**: Directly recruited in **Pay Matrix Level 12** (Entry Basic Pay **₹37,500**; scale ₹37,500 – ₹88,500; corresponding to pre-revised PB-2 ₹9,300 – ₹34,800 + GP ₹3,800). This authoritative finding from Advt. No. 14/SPSC/EXAM/2025 and Notification No. 238/DIGP/PHQ/2025 supersedes legacy references indicating Level 11.
  - **Probationary Stipendiary Rule**: Governed by Government Notification No. 489/GEN/DOP dated 31.10.2011, establishing fixed stipendiary / basic pay during the initial probationary/training period before standard variable allowances are fully drawn.
  - **Mandatory Domicile**: Candidates must be in possession of a valid Certificate of Identification (COI) or Sikkim Subject Certificate issued by the competent authority under the Government of Sikkim.
- **Statutory Exam Scheme Overhauls**:
  - **CCE Statutory Modernization (2026 Rules)**: Promulgated vide Department of Personnel Notification No. 186/GEN/DOP dated 10.02.2026 (**The Sikkim State Civil Service (Direct Recruitment) Examination Rules, 2026**) and published under SPSC Notice No. 96/SPSC/EXAM/2026 dated 23.02.2026:
    - *Stage I Prelims*: Objective screening test of 400 marks (Paper I General Studies 200 marks, 120 mins; Paper II Aptitude Test 200 marks, 120 mins; 1/3 negative marking penalty; shortlists 20× vacancies for Mains).
    - *Stage II Mains*: Conventional written examination of 4 papers totaling 1,000 marks merit basis (Paper I English 100 marks, 120 mins, qualifying only; Paper II GS I 300 marks; Paper III GS II 300 marks; Paper IV GS III 300 marks).
    - *Stage III Personality Test*: 100 marks interview summoned at a 1:5 ratio of vacancies.
    - *Grand Total Merit*: 1,000 marks (900 written GS + 100 interview).
  - **Sub-Inspector Scheme (2025 Framework)**: Notified vide Police Headquarters Notification No. 238/DIGP/PHQ/2025 dated 29.04.2025 and Advt. No. 14/SPSC/EXAM/2025:
    - *Stage 1 Prelims*: Objective screening test of 300 marks (Paper I GS 150 marks, 2 hrs; Paper II Reasoning & Mental Ability 150 marks, 2 hrs; negative marking applies; shortlists 12× to 15× vacancies for PET).
    - *Stage 2 Physical Tests*: PMT (qualifying height/chest/weight) and PET (50 marks total across 5 events: 100m sprint, 1500m run, high jump, long jump, shot-put). Crucially, PET marks count towards the final merit list!
    - *Stage 3 Mains*: Written examination of 500 marks across 3 papers (Paper I English 100 marks, 1.5 hrs; Paper II GS I 200 marks, 3 hrs; Paper III GS II 200 marks, 3 hrs).
    - *Final Merit*: Stage 2 (PET 50 marks) + Stage 3 (Mains 500 marks) = **550 marks total**. There is **no interview / viva-voce** under the revised 2025 framework.
- **Competition Benchmarks & Statistics**:
  - **CCE Recent Cycles**:
    - *2025 Cycle (Advt. 17/SPSC/EXAM/2025)*: 25 vacancies of Under Secretary (SSCS); Preliminary Written Exam scheduled for May 2026.
    - *2024 Cycle (Advt. 09/2024 & 10/2024)*: 47 vacancies (22 Under Secretary, 25 Accounts Officer); 47 candidates recommended on 29.05.2026 (Ref No: 105/EXAM/SPSC/2026).
    - *2022 Combined Cycle (Advt. 11/SPSC/EXAM/2022)*: 62 vacancies (18 Under Secretary, 14 DSP, 30 Accounts Officer); Prelims held 16.01.2023, Mains 23–25 Feb 2024, Viva-voce Oct–Nov 2024; exactly 62 candidates recommended on 05.12.2024 (Notice No. 50/SPSC/EXAMS/2024).
  - **Sub-Inspector Cycles**:
    - *2025 Cycle (Advt. 14/SPSC/EXAM/2025)*: 39 vacancies of Sub-Inspector in Level 12.
    - *2018/2020 Cycle (Advt. 03/SPSC/EXAM/2018)*: 10 vacancies in PB-2 ₹9,300 – ₹34,800 + GP ₹3,800; exactly 10 candidates recommended on 23.03.2020 (Notice Ref No: 23/EXAM/SPSC/2020).
- **Validation**: Both dossiers pass `node scripts/data-sourcing/validate-details.mjs` with **0 errors** and **0 warnings**.

| Exam ID | Title | Tier | Jurisdiction | Entry Basic Pay | Primary Cycle | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `spsc-cce` | Sikkim Public Service Commission Combined Competitive Examination | B | Sikkim | Level 15 (₹45,600) / Level 16 (₹49,100) | 62 (2022 Cycle) / 25 (2025 Cycle) | **PASS** |
| `spsc-sub-inspector` | Sikkim Police Sub-Inspector of Police Recruitment Examination | C | Sikkim | Level 12 (₹37,500) | 39 (2025 Cycle) / 10 (2018 Cycle) | **PASS** |

---

## 2. Detailed Exam Logs

### 2.1 `spsc-cce`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 sections fully populated, exceeding Tier B minimum requirements of exam_scheme + official_downloads)
- **Sections marked not_available**: None
- **Sections omitted**: None (job examination)
- **Sources OPENED and read this session**:
  - SPSC Official Commission Portal: `https://spsc.sikkim.gov.in` (confirmed live 200 OK)
  - SPSC Advertisements Archive: `https://spsc.sikkim.gov.in/Advertisements.html`
  - SPSC Results Archive: `https://spsc.sikkim.gov.in/Results.html`
  - SPSC Combined CCE Recruitment Advertisement (Advt. No. 11/SPSC/EXAM/2022 dated 29.09.2022, `cce_advt_2022.pdf`, 6 pages rendered to PNG and inspected with `view_file` confirming 62 vacancies across Level 15 Under Secretary [18], Level 16 DSP [14], and Level 15 Accounts Officer [30])
  - SPSC Combined Recruitment Final Recommendation Notice No. 50/SPSC/EXAMS/2024 dated 05.12.2024 (`Combined_Recruitment_Final_Notice_05_12_2024.pdf`, 3 pages rendered to PNG and inspected with `view_file` confirming merit list of 62 candidates)
  - The Sikkim State Civil Service (Direct Recruitment) Examination Rules, 2026 (Notification No. 186/GEN/DOP dated 10.02.2026, `Under_Secretary_2026_Examination_Rules_23_02_2026.pdf`, 8 pages rendered to PNG and inspected with `view_file`)
  - SPSC Under Secretary 2026 Plan of Examination (Appendix I, `Under_Secretary_2026_Plan_of_Examination_23_02_2026.pdf`, 2 pages rendered to PNG and inspected with `view_file`)
  - SPSC Under Secretary 2026 Schemes & Syllabus (Appendix II & III, `Under_Secretary_2026_Schemes_&_Syllabus_23_02_2026.pdf`, 8 pages rendered to PNG and inspected with `view_file`)
  - SPSC Notice No. 96/SPSC/EXAM/2026 dated 23.02.2026 regarding Written Examination for Under Secretary under Advt. No. 17/SPSC/EXAM/2025 (`Under_Secretary_2026_Written_Examination_23_02_2026.pdf`, 1 page rendered to PNG and inspected with `view_file`)
  - SPSC Final Recommendation Notice for Under Secretary & Accounts Officer Ref No: 105/EXAM/SPSC/2026 dated 29.05.2026 (`Final_Notice_Under_Secretary_Accounts_Officer_29_09_2026.pdf`, 2 pages rendered to PNG and inspected with `view_file` confirming 22 Under Secretary and 25 Accounts Officer recommended)
  - SPSC Manual / Sikkim Public Service Commission (State Public Service Commission Rules & Regulations, `scratch/SPSC_Manual.pdf`)
  - Sikkim Services (Revised Pay) Rules, 2018 (Pay Matrix Schedule confirming Level 15 cell 1 = ₹45,600 and Level 16 cell 1 = ₹49,100)
- **Sources only status-checked, not read**: None
- **Links curl-checked**:
  - `https://spsc.sikkim.gov.in` → 200 OK
  - `https://spsc.sikkim.gov.in/Advertisements/Combinned_US_AO_DSP_ADD_29_09_2022.pdf` → 200 OK
  - `https://spsc.sikkim.gov.in/Results/Combined%20Recruitment_Final%20Notice_05_12_2024.pdf` → 200 OK
  - `https://spsc.sikkim.gov.in/Notices/Under%20Secretary_2026_Examination%20Rules_23_02_2026.pdf` → 200 OK
  - `https://spsc.sikkim.gov.in/Notices/Under%20Secretary_2026_Plan%20of%20Examination_23_02_2026.pdf` → 200 OK
  - `https://spsc.sikkim.gov.in/Notices/Under%20Secretary_2026_Schemes_&_Syllabus_23_02_2026.pdf` → 200 OK
  - `https://spsc.sikkim.gov.in/Notices/Under%20Secretary_2026_Written%20Examination_23_02_2026.pdf` → 200 OK
  - `https://spsc.sikkim.gov.in/Results/Final_Notice_Under_Secretary_Accounts_Officer_29_09_2026.pdf` → 200 OK
- **Could NOT confirm, and why**: Exact individual marks for candidates in the 2022 cycle (SPSC publishes roll-number recommendation lists; individual marks are communicated to candidates or published via login).
- **Confidence downgrades made, and why**: None.

---

### 2.2 `spsc-sub-inspector`
- **Tier**: C, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 sections fully populated, exceeding Tier C minimum requirements of official_downloads)
- **Sections marked not_available**: None
- **Sections omitted**: None (job examination)
- **Sources OPENED and read this session**:
  - SPSC Sub-Inspector of Police Recruitment Advertisement (Advt. No. 14/SPSC/EXAM/2025 dated 20.05.2025, `Sub_Inspector_Police_Adv_20_05_2025.pdf`, 3 pages rendered to PNG and inspected with `view_file` confirming 39 posts in Level 12 of Pay Matrix)
  - Sikkim Police Sub-Inspector Statutory Recruitment Notification No. 238/DIGP/PHQ/2025 dated 29.04.2025 (`Sub_Inspector_Police_Notification_20_05_2025.pdf`, 3 pages rendered to PNG and inspected with `view_file` confirming 3-stage scheme, PET 50 marks, Mains 500 marks, no interview)
  - SPSC Sub-Inspector Scheme of Examination & Syllabus (`Sub_Inspector_Police_Syllabus_20_05_2025.pdf`, 5 pages rendered to PNG and inspected with `view_file` detailing 300-mark Prelims, 50-mark PET events, and 500-mark Mains)
  - SPSC Sub-Inspector Final Recommendation Notice Ref No: 23/EXAM/SPSC/2020 dated 23.03.2020 (`Final_Notice_for_Sub_Inspector_Sikkim_Police.pdf`, 1 page rendered to PNG and inspected with `view_file` confirming 10 candidates recommended under Advt. No. 03/SPSC/EXAM/2018)
  - Sikkim Services (Revised Pay) Rules, 2018 (Pay Matrix Schedule confirming Level 12 cell 1 = ₹37,500, pre-revised PB-2 ₹9,300 – ₹34,800 + GP ₹3,800)
- **Sources only status-checked, not read**: None
- **Links curl-checked**:
  - `https://spsc.sikkim.gov.in/Advertisements/Sub_Inspector_Police_Adv_20_05_2025.pdf` → 200 OK
  - `https://spsc.sikkim.gov.in/Notices/Sub_Inspector_Police_Notification_20_05_2025.pdf` → 200 OK
  - `https://spsc.sikkim.gov.in/Syllabus/Sub_Inspector_Police_Syllabus_20_05_2025.pdf` → 200 OK
  - `https://spsc.sikkim.gov.in/Results/Final_Notice_for_Sub_Inspector_Sikkim_Police.pdf` → 200 OK
- **Could NOT confirm, and why**: Exact marks obtained by individual candidates in the 2018 cycle (recommendation notice lists merit order 1 to 10 with roll numbers and names).
- **Confidence downgrades made, and why**: None.
