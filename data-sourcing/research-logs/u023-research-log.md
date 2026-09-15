# Research Log: Unit 23 (u023) — Major State Public Service Commissions — Jharkhand

- **Unit ID**: `u023`
- **Batch ID**: `batch-4-state-psc--jharkhand`
- **Label**: `Major State Public Service Commissions (State Administrative Services) — Jharkhand`
- **Timestamp**: 2026-09-12T01:32:00+05:30
- **Status**: Completed (2/2 exams researched, written, and validated)
- **Reviewer**: Antigravity IDE Autonomous Agent

---

## 1. Summary of Unit Execution
Unit 23 covers the two flagship examinations conducted by the Jharkhand Public Service Commission (JPSC) in conjunction with the High Court of Jharkhand, Ranchi:
1. `jharkhand-judicial-service`: Jharkhand Judicial Service (Civil Judge Junior Division) Examination — **Tier B**
2. `jharkhand-jpsc`: Jharkhand Public Service Commission Combined Competitive Examination (JPSC CCE) — **Tier C**

Both dossiers have been authored in strict compliance with `RESEARCH-GUIDE.md` and `EXECUTION-PLAN.md`:
- **Judicial Service Pay Structure**: Accurately applies the Second National Judicial Pay Commission (SNJPC) uniform judicial pay matrix (Level J-1 entry basic ₹77,840; scale ₹77,840–₹1,36,520; unrevised ₹27,700–₹44,770) mandated by the Supreme Court of India in *All India Judges Association v. Union of India* (WP(C) 643/2015), avoiding civilian state pay or central 7th CPC matrix confusion.
- **State Administrative Service Pay Structure**: Accurately reflects the Jharkhand State Revised Pay Rules, where the premier administrative entry cadres (Jharkhand Administrative Service Deputy Collector, Jharkhand Police Service DSP, Jharkhand Finance Service State Tax Officer) are placed in **Jharkhand Pay Matrix Level 9 (PB-2 ₹9,300–₹34,800 + GP ₹5,400; entry basic ₹53,100; scale ₹53,100–₹1,67,800)**, avoiding the trap of applying central 7th CPC Level 10 (₹56,100).
- **Exam Schemes**:
  - `jharkhand-judicial-service`: Preliminary Entrance Test (Objective Type screening of 100 marks, 120 minutes; 1 mark per question, no negative marking, 1:15 shortlist ratio for Mains), Main Examination (4 conventional descriptive papers of 100 marks each, 400 marks total: Procedural Law/IPC/Evidence, Commercial/Property Law, Personal Laws/Jurisprudence, Hindi & English Language), and Viva-Voce (100 marks with qualifying minimum 25% for Gen/EWS and 20% for reserved categories; final merit out of 500 marks).
  - `jharkhand-jpsc`: Preliminary Examination under amended CCSE Rules 2021 (Paper I General Studies 200 marks + Paper II Jharkhand Specific GS 200 marks; 100 questions of 2 marks each per paper, no negative marking; 1:15 shortlist ratio for Mains), Main Examination (Paper I General Hindi & English qualifying 100 marks at 30% + 5 conventional descriptive merit papers totaling 950 marks: Paper II Language & Literature 150 marks, Paper III Social Sciences 200 marks, Paper IV Constitution & Polity/Pub Ad 200 marks, Paper V Indian Economy 200 marks, Paper VI General Sciences & Tech 200 marks), and Interview / Personality Test (100 marks, no minimum qualifying cutoff per 2021 amendment; final merit out of 1,050 marks).
- **Validation**: Both dossiers pass `node scripts/data-sourcing/validate-details.mjs` with **0 errors** and **0 warnings**.

| Exam ID | Title | Tier | Jurisdiction | Pay Scale / Entry Basic | Primary Cycle | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `jharkhand-judicial-service` | Jharkhand Judicial Service (Civil Judge Junior Division) Exam | B | Jharkhand | SNJPC J-1 (₹77,840) | 138 vacancies (Advt. 22/2023) | **PASS** |
| `jharkhand-jpsc` | Jharkhand PSC Combined Competitive Examination (CCE) | C | Jharkhand | Jharkhand Level 9 (₹53,100) | 103 vac. (2026) / 342 vac. (2024) | **PASS** |

---

## 2. Detailed Exam Log

### 2.1 `jharkhand-judicial-service`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 sections fully populated, exceeding Tier B minimum requirements)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - JPSC Official Portal: `https://www.jpsc.gov.in` (confirmed live HTTP/2 200 OK)
  - High Court of Jharkhand, Ranchi Official Portal: `https://jharkhandhighcourt.nic.in` (confirmed live HTTP/1.1 200 OK)
  - JPSC Advt. No. 22/2023 Notification PDF: `https://www.jpsc.gov.in/data/Advertisement_22_23_dated_14_08_2023.pdf` (confirmed live HTTP/2 200 OK; downloaded and inspected; 138 vacancies across categories UNR 60, ST 28, SC 12, BC-I 10, BC-II 15, EWS 13; Preliminary screening test held 10.03.2024; unrevised pay scale ₹27,700–44,770)
  - JPSC 2026 Examination Calendar: `https://www.jpsc.gov.in/data/Exam_Calendar_2026_dtd_09_07_2026.pdf` (confirmed live HTTP/2 200 OK; Advt. No. 22/2023 Mains schedule)
  - JPSC Civil Judge (Junior Division) Candidate Portal: `https://www.jpsc.gov.in/Civil_judge_junior_division_22_2023/login.php` (confirmed live HTTP/2 200 OK)
  - Second National Judicial Pay Commission (SNJPC) Report & Supreme Court of India Order in *All India Judges Association v. Union of India* (WP(C) 643/2015) — Level J-1 entry basic ₹77,840.
  - Jharkhand Judicial Service (Recruitment and Conditions of Service) Rules.
- **Sources only status-checked, not read**:
  - District Judiciary subordinate judge recruitment archive of High Court of Jharkhand.
- **Links curl-checked**:
  - `https://www.jpsc.gov.in/data/Advertisement_22_23_dated_14_08_2023.pdf` → 200 OK
  - `https://www.jpsc.gov.in/data/Exam_Calendar_2026_dtd_09_07_2026.pdf` → 200 OK
  - `https://www.jpsc.gov.in/Civil_judge_junior_division_22_2023/login.php` → 200 OK
  - `https://jharkhandhighcourt.nic.in` → 200 OK
  - `https://www.jpsc.gov.in` → 200 OK
- **Could NOT confirm, and why**: Total applicants appeared in Prelims 2024 has not been published as an individual consolidated statistical gazette by JPSC; vacancy numbers (138) and categories are verified from primary notification.
- **Confidence downgrades made, and why**: 2018 recruitment vacancy figures marked `reported` rather than `verified` because the 2018 advertisement was superseded in active downloads.

---

### 2.2 `jharkhand-jpsc`
- **Tier**: C, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 sections fully populated, exceeding Tier C minimum requirements)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - JPSC Official Portal: `https://www.jpsc.gov.in` (confirmed live HTTP/2 200 OK)
  - JPSC Combined Civil Services Advt. No. 01/2026 Notification PDF: `https://www.jpsc.gov.in/data/Advertisement_01_26_dated_29_01_2026-1.pdf` (confirmed live HTTP/2 200 OK; 103 vacancies across 9 services; Mains scheduled 25–27 July 2026)
  - JPSC Combined Civil Services Advt. No. 01/2024 Notification PDF: `https://www.jpsc.gov.in/data/Advertisement_01_24_dated_27_01_2024.pdf` (confirmed live HTTP/2 200 OK; downloaded and read via pdftotext; confirmed 342 vacancies across 10 cadres: Deputy Collector 207, DSP 35, State Tax Officer 56; Prelims held 17 March 2024, 4,975 candidates qualified for Mains)
  - The Jharkhand Combined Civil Services Examination Rules, 2021 (with 1st Amendment 2021 and 2nd Amendment 2023): `https://www.jpsc.gov.in/data/The_Jharkhand_Combined_civil_Services_Examination_2021.pdf` (confirmed live HTTP/2 200 OK)
  - JPSC CCSE Detailed Syllabus: `https://www.jpsc.gov.in/data/CCSE%20Syllabus.pdf` (confirmed live HTTP/2 200 OK)
  - JPSC 2026 Examination Calendar: `https://www.jpsc.gov.in/data/Exam_Calendar_2026_dtd_09_07_2026.pdf` (confirmed live HTTP/2 200 OK)
  - JPSC Press Release on Combined Civil Services Mains Schedule: `https://www.jpsc.gov.in/data/Press_Release_01_26_dated_14_07_2026.pdf` (confirmed live HTTP/2 200 OK)
  - Jharkhand State Revised Pay Rules Level 9 (PB-2 ₹9,300–34,800 + GP ₹5,400; basic ₹53,100).
- **Sources only status-checked, not read**:
  - Department of Personnel, Administrative Reforms and Rajbhasha, Government of Jharkhand circulars.
- **Links curl-checked**:
  - `https://www.jpsc.gov.in/data/Advertisement_01_26_dated_29_01_2026-1.pdf` → 200 OK
  - `https://www.jpsc.gov.in/data/Advertisement_01_24_dated_27_01_2024.pdf` → 200 OK
  - `https://www.jpsc.gov.in/data/CCSE%20Syllabus.pdf` → 200 OK
  - `https://www.jpsc.gov.in/data/The_Jharkhand_Combined_civil_Services_Examination_2021.pdf` → 200 OK
  - `https://www.jpsc.gov.in/data/Exam_Calendar_2026_dtd_09_07_2026.pdf` → 200 OK
  - `https://www.jpsc.gov.in/data/Press_Release_01_26_dated_14_07_2026.pdf` → 200 OK
  - `https://www.jpsc.gov.in` → 200 OK
- **Could NOT confirm, and why**: Total number of registered candidates for Advt 01/2026 is ongoing in processing; 2024 Prelims shortlist of 4,975 candidates is verified from official Mains candidate list.
- **Confidence downgrades made, and why**: 7th to 10th JPSC 2021 vacancy numbers marked `reported` rather than `verified` because primary notice is archived under earlier portal structure.
