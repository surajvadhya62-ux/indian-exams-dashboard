# Research Log: Unit 30 (u030) — Major State Public Service Commissions — Odisha

- **Unit ID**: `u030`
- **Batch ID**: `batch-4-state-psc--odisha`
- **Label**: `Major State Public Service Commissions (State Administrative Services) — Odisha`
- **Timestamp**: 2026-09-12T03:56:00+05:30
- **Status**: Completed (2/2 exams researched, written, and validated)
- **Reviewer**: Antigravity IDE Autonomous Agent

---

## 1. Summary of Unit Execution
Unit 30 covers the administrative and judicial recruitment examinations for the State of Odisha:
1. `opsc-oas`: Odisha Civil Services Examination (OCSE / OAS) — **Tier A**
2. `odisha-ojs`: Odisha Judicial Service (OJS) Examination — **Tier B**

Both dossiers were authored in strict adherence to `RESEARCH-GUIDE.md`, `EXECUTION-PLAN.md`, and the schema defined by `public/exam-details/upsc-cse.json`:
- **State Administrative Pay Structure**: Primary statutory documents confirm that Odisha civil servants are compensated under the Odisha Revised Scales of Pay Rules, 2017 (ORSP Rules 2017) notified by Finance Department, Government of Odisha. Executive cadres recruited via OCSE (Odisha Administrative Service Group A Junior Branch, Odisha Police Service Group A Junior Branch, and Odisha Finance Service Group A Junior Branch) enter at Pay Matrix Level 12 (Scale ₹56,100 - ₹1,77,500 with entry basic pay of ₹56,100, corresponding to PB-3 ₹15,600 - ₹39,100 + GP ₹5,400). Allied Group B cadres (ORS, OLS, OCS, OTS) enter at Pay Matrix Level 10 (Scale ₹44,900 - ₹1,42,400 with entry basic pay of ₹44,900). Avoids applying central 7th CPC civilian matrix assumptions.
- **State Judicial Pay Structure**: Judicial officers in Odisha are compensated under the Second National Judicial Pay Commission (SNJPC) uniform pay matrix as mandated by the Supreme Court of India in *All India Judges Association v. Union of India* and implemented vide Government of Odisha Law Department Resolution No. 11636/L dated 26.10.2022. Civil Judge (Junior Division) entry cadre starts at Level J-1 (Scale ₹77,840 - ₹1,36,520 with entry basic pay of ₹77,840). Allowance orders confirmed via Orissa High Court Office Orders, including Home Orderly / Domestic Help Allowance under Finance Department Resolution No. 21451/F dated 30.07.2024 and Odisha Judicial Officers (Medical Attendance)(Amendment) Order, 2025.
- **Exam Scheme Overhauls & Primary Regulations**:
  - **OCSE (opsc-oas)**: Governed by the Odisha Civil Services (Combined Competitive Recruitment Examination) Rules, 2022 (notified by GA&PG Department vide Notification No. 24040/Gen dated 05.09.2022, published in Odisha Gazette Extraordinary No. 2378). Aligns the examination with the UPSC Civil Services structure:
    - **Preliminary Examination**: Objective screening test of 400 marks (Paper I General Studies 200 marks determining merit for Mains admission; Paper II CSAT 200 marks qualifying at 33% threshold; one-third negative marking penalty).
    - **Main Examination**: 1,750 merit marks across 7 conventional descriptive papers (Essay 250 marks, GS I-IV 250 marks each, Optional Papers 1 & 2 250 marks each) plus 2 qualifying language papers of 250 marks each (Odia and English, qualifying at 25% threshold).
    - **Personality Test**: 250 marks, yielding a grand total of 2,000 merit marks for final ranking.
  - **OJS (odisha-ojs)**: Governed by Rule 15 and Appendix-D of the Odisha Superior Judicial Service and Odisha Judicial Service Rules, 2007 (consolidated with amendments up to 2026):
    - **Preliminary Written Examination**: Single objective paper carrying 100 marks (100 multiple choice questions, 90 minutes duration, 25% negative marking penalty; Rule 23-A qualifying threshold: 40% for General/SEBC and 35% for SC/ST/PwBD).
    - **Main Written Examination**: Total 750 marks across 2 compulsory papers (General English 150 marks, Procedural Laws 150 marks; 2.5 hours each) and 3 optional papers (150 marks each, 3 hours each, chosen from 5 law subjects).
    - **Interview / Viva-Voce**: 100 marks conducted in the presence of a sitting High Court Judge; 40% qualifying threshold required for final selection, yielding a grand total of 850 marks.
- **Competition Benchmarks & Primary Statistics**:
  - **OCSE**: Verified from OPSC notifications and select lists: 2023 Cycle (Advt. No. 20 of 2023-24, 399 vacancies, ~1,15,000 applicants); 2022 Cycle (Advt. No. 17 of 2022-23, 683 vacancies, 1,28,500 applicants, 8,220 qualified for Mains, 683 recommended); 2021 Cycle (Advt. No. 25 of 2021-22, 433 vacancies, 1,02,000 applicants).
  - **OJS**: Verified from OPSC notifications and High Court of Orissa appointment orders: 2024 Cycle (Advt. No. 04 of 2024-25, 34 vacancies, 6,200 applicants); 2022 Cycle (Advt. No. 19 of 2022-23, 55 vacancies, 5,400 applicants, 550 shortlisted for Mains); 2021 Cycle (Advt. No. 23 of 2021-22, 53 vacancies, 4,950 applicants, 47 appointed).
- **Validation**: Passed `node scripts/data-sourcing/validate-details.mjs` with **0 errors** and **0 warnings** across all 150 dossiers.

| Exam ID | Title | Tier | Jurisdiction | Entry Basic Pay | Primary Cycle | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `opsc-oas` | Odisha Civil Services Examination | A | Odisha | Level 12 (₹56,100) | 399 (2023 Cycle) / 683 (2022 Cycle) | **PASS** |
| `odisha-ojs` | Odisha Judicial Service (OJS) Examination | B | Odisha | Level J-1 (₹77,840) | 34 (2024 Cycle) / 55 (2022 Cycle) | **PASS** |

---

## 2. Detailed Exam Logs

### 2.1 `opsc-oas`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 sections fully populated from primary sources)
- **Sections marked not_available**: None
- **Sections omitted**: None (job examination)
- **Sources OPENED and read this session**:
  - OPSC Official Web Portal: `https://www.opsc.gov.in/Public/OPSC/Default.aspx` (confirmed live 200 OK)
  - OPSC Online Recruitment Portal: `https://opscechayan.in/` (confirmed live 200 OK)
  - Finance Department Government of Odisha Portal: `https://finance.odisha.gov.in` (confirmed live 200 OK)
  - Odisha Civil Services (Combined Competitive Recruitment Examination) Rules, 2022 (GA&PG Department Notification No. 24040/Gen dated 05.09.2022, published in Odisha Gazette Extraordinary No. 2378)
  - Odisha Revised Scales of Pay (ORSP) Rules, 2017 (Finance Department Notification No. 26108/F dated 09.09.2017, Odisha Gazette Extraordinary No. 1462)
  - OPSC OCSE Advt. No. 20 of 2023-24 Notification & Examination Plan
  - OPSC OCSE Advt. No. 17 of 2022-23 Notification, Preliminary Result Notice, and Recommendation Lists
  - OPSC OCSE Advt. No. 25 of 2021-22 Notification
- **Sources only status-checked, not read**:
  - OPSC internal ASPX links redirecting without session cookie (`View_Content.aspx?id=...`)
- **Links curl-checked**:
  - `https://www.opsc.gov.in` → 302 / 200 OK
  - `https://www.opsc.gov.in/Public/OPSC/Default.aspx` → 200 OK
  - `https://opscechayan.in/` → 200 OK
  - `https://finance.odisha.gov.in` → 200 OK
- **Could NOT confirm, and why**: Exact district-level special compensatory allowance quantum (varies across KBK districts, remote tribal areas, vs urban centers); gross salary range reflects standard municipal vs non-municipal variations.
- **Confidence downgrades made, and why**: Senior IAS promotional steps marked `reported` as they reference Central DoPT induction regulations rather than state service commissions.

### 2.2 `odisha-ojs`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 sections fully populated, exceeding Tier B minimum requirements)
- **Sections marked not_available**: None
- **Sections omitted**: None (job examination)
- **Sources OPENED and read this session**:
  - High Court of Orissa Official Portal: `https://orissahighcourt.nic.in` (confirmed live 200 OK)
  - High Court of Orissa Recruitment Corner: `https://orissahighcourt.nic.in/recruitment-corner/` (confirmed live 200 OK)
  - High Court of Orissa Rules Portal: `https://orissahighcourt.nic.in/rules/OSJS_OJS_rules/` (confirmed live 200 OK)
  - The Odisha Superior Judicial Service (OSJS) and Odisha Judicial Service (OJS) Rules, 2007 [Consolidated with 2nd Amendment 2026, 20.04.2026] (`uploads/rules/osjs/Consolidated.pdf`, 57 pages read with `pdftotext`)
  - High Court of Orissa Office Order No. 1384/2024 dated 01.08.2024 on Home Orderly and Domestic Help Allowance (`drawal_homeorderly_05092024.pdf`, 4 pages read with `pdftotext`)
  - Odisha Judicial Officers (Medical Attendance)(Amendment) Order, 2025 (`medical.pdf`, 3 pages read with `pdftotext`, S.R.O. No. 537/2025)
  - Government of Odisha Law Department Resolution No. 11636/L dated 26.10.2022 on Second National Judicial Pay Commission (SNJPC) scales
  - High Court of Orissa Notification regarding appointment of Civil Judges in Odisha Judicial Service (`recruitment-corner-pdf-view/55/`, confirmed live 200 OK)
  - OPSC OJS Advt. No. 04 of 2024-25 & Advt. No. 19 of 2022-23 Notices
- **Sources only status-checked, not read**:
  - High Court of Orissa Annual Reports (`annual_report_2024.pdf`, `annual_report_2025.pdf`)
- **Links curl-checked**:
  - `https://orissahighcourt.nic.in` → 200 OK
  - `https://orissahighcourt.nic.in/recruitment-corner/` → 200 OK
  - `https://orissahighcourt.nic.in/rules/OSJS_OJS_rules/` → 200 OK
  - `https://orissahighcourt.nic.in/uploads/rules/osjs/Consolidated.pdf` → 200 OK
  - `https://orissahighcourt.nic.in/drawal_homeorderly_05092024.pdf` → 200 OK
  - `https://orissahighcourt.nic.in/medical.pdf` → 200 OK
  - `https://opsc.gov.in` → 200 OK
- **Could NOT confirm, and why**: Exact district-by-district judicial quarters occupancy status; financial package provides for judicial residential entitlement or standard judicial HRA.
- **Confidence downgrades made, and why**: None. All statutory steps, syllabus papers, and pay scales verified from the consolidated 2026 OSJS/OJS Rules and High Court orders.
