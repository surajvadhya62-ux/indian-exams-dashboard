# Research Log: Unit 33 (u033) — Major State Public Service Commissions — Telangana

- **Unit ID**: `u033`
- **Batch ID**: `batch-4-state-psc--telangana`
- **Label**: `Major State Public Service Commissions (State Administrative Services) — Telangana`
- **Timestamp**: 2026-09-12T03:50:00+05:30
- **Status**: Completed (3/3 exams researched, written, and validated)
- **Reviewer**: Antigravity IDE Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 33 covers the premier recruitment examinations of the State of Telangana conducted by the Telangana Public Service Commission (TGPSC, formerly TSPSC) and the Telangana State Forest Department:
1. `tspsc-group-4`: TSPSC Group-4 Services (Junior Assistant & Junior Accountant) Exam — **Tier A**
2. `telangana-forest-fbo`: Telangana Forest Department Forest Beat Officer (FBO) & Section Officer Exam — **Tier B**
3. `tspsc`: Telangana State Public Service Commission Group-1 Services Examination — **Tier C**

The dossiers were authored in strict adherence to `RESEARCH-GUIDE.md`, `EXECUTION-PLAN.md`, and the schema defined by `public/exam-details/upsc-cse.json`:
- **State Pay Commission & Statutory Framework**:
  - All three dossiers strictly cite the **Telangana Revised Pay Scales 2020 (RPS 2020)**, notified vide **G.O.Ms.No.51, Finance (HRM.IV) Department, dated 11/06/2021** (implementing the First Pay Revision Commission of Telangana / 1st PRC, with 32 master scales).
  - Conflation with central 7th CPC levels was strictly avoided per §5.3.
  - **Group-IV (Junior Assistant / Junior Accountant)**: Scale 6 (₹24,280 – ₹72,850, Entry Basic Pay **₹24,280**).
  - **Forest Department (Forest Beat Officer / FBO)**: Scale 5 (₹22,900 – ₹69,150, Entry Basic Pay **₹22,900**; revised from pre-2020 scale ₹16,400 – ₹49,870 under Notification No. 48/2017). Forest Section Officer (FSO) starts at Scale 11 (₹31,040 – ₹92,050).
  - **Group-1 Services (Deputy Collector / DSP / CTO / RTO)**: Scale 21 (₹54,220 – ₹1,33,630, Entry Basic Pay **₹54,220**). Scale 20 (₹51,320 – ₹1,27,310) applies to municipal commissioners and excise superintendents.
  - **Allowances & Deductions**: Dearness Allowance is pegged at the project review constant of **58%** as of **2025-07-01**. House Rent Allowance (HRA) is governed by G.O.Ms.No.53 Finance Department (24% for Greater Hyderabad Municipal Corporation / GHMC, 13% for district headquarters / major towns, and 11% for other / rural postings). Deductions include 10% NPS employee contribution on Basic+DA, Professional Tax (₹200), and TSGLI/EHS state insurance.
- **Statutory Abolition of Interviews (G.O.Ms.No.55 Reform)**:
  - Pursuant to Government of Telangana **G.O.Ms.No.55, General Administration (Ser.A) Department, dated 25/04/2022**, interviews (oral tests / viva-voce) have been abolished across all state direct recruitments, including Group-1 Services. Selection is based purely on aggregate written examination merit followed by Certificate Verification (CV).
- **Primary Examination Schemes & Competition Data**:
  - **Group-IV (Notification No. 19/2022)**: 8,180 vacancies (8,039 initial + 141 addendum). Single-stage objective test (Paper I General Studies 150 marks, 150 mins; Paper II Secretarial Abilities 150 marks, 150 mins; total 300 marks; no negative marking). Written exam conducted on 01/07/2023. General Ranking List (GRL) released on 09/02/2024 comprising **7,26,837 admitted candidates**. Primary certificate verification schedule (`UFJFU1NOT1RFL0dSLTQtQ1YtU2NoZWR1bGUyMDI0MDYxNjIyNDc1MS5wZGY=`, 166 pages, verified directly) shortlisted **24,030 candidates in 1:3 ratio**.
  - **Forest Department (Notification No. 48/2017 & 47/2017)**: 1,857 vacancies for FBO and 90 vacancies for FSO. Objective test of 200 marks (Paper I General Knowledge 100 marks, Paper II General Mathematics 100 marks), followed by physical walking endurance test (25 km in 4 hours for male candidates, 16 km in 4 hours for female candidates; qualifying only), and medical measurement test. Final revised selections were issued following High Court orders in W.A.No. 551/2019.
  - **Group-1 Services (Notification No. 02/2024)**: 563 vacancies across 18 department posts. Screening Preliminary Test of 150 marks (held 09/06/2024) statutorily admitted candidates to Mains at a **1:50 ratio** (~28,150 candidates). Mains examination (held 21/10/2024 to 27/10/2024) comprising qualifying General English (150 marks, SSC standard) and 6 compulsory descriptive merit papers of 150 marks each (total 900 merit marks). Final Certificate Verification Notification No. 02/2024 dated 14/04/2025 shortlisted **exactly 563 candidates** in 1:1 ratio.
- **Validation**: Passed `node scripts/data-sourcing/validate-details.mjs` with **0 errors** and **0 warnings** across all 140 repository dossiers.

| Exam ID | Title | Tier | Jurisdiction | Entry Basic Pay | Primary Cycle | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `tspsc-group-4` | TSPSC Group-4 Services (Junior Assistant & Junior Accountant) Exam | A | Telangana | Scale 6 (₹24,280) | 8,180 (19/2022 Cycle) | **PASS** |
| `telangana-forest-fbo` | Telangana Forest Department Forest Beat Officer (FBO) & Section Officer Exam | B | Telangana | Scale 5 (₹22,900) | 1,857 (48/2017 Cycle) | **PASS** |
| `tspsc` | Telangana State Public Service Commission Group-1 Services Examination | C | Telangana | Scale 21 (₹54,220) | 563 (02/2024 Cycle) | **PASS** |

---

## 2. Detailed Exam Logs

### 2.1 `tspsc-group-4`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 required sections fully populated from primary sources)
- **Sections marked not_available**: None
- **Sections omitted**: None (job examination)
- **Sources OPENED and read this session**:
  - TGPSC Official Commission Portal: `https://www.tgpsc.gov.in` and `https://websitenew.tgpsc.gov.in/` (confirmed live HTTP/2 200 OK)
  - TGPSC Group-IV Detailed Notification No. 19/2022 PDF (`RElSRUNUUkVDUlVJVE1FTlROT1RJLzE5LTIwMjItR1JPVVAtSVYtTk9USUZJQ0FUSU9OMjAyMjEyMzEyMDMzMjUucGRm`, 149 pages; inspected Para I(2) vacancies, Para IX selection procedure, Annexure-III scheme & syllabus)
  - TGPSC Group-IV Scheme and Syllabus Document (`UFJFU1NOT1RFL0dyb3VwLUlWX1NjaGVtZV9hbmRfU3lsbGFidXMyMDIyMTEyNzExMDE1My5wZGY=`, 3 pages; read with `pypdf`)
  - TGPSC Group-IV Certificate Verification Notification & Candidate Schedule Dt.16/06/2024 (`UFJFU1NOT1RFL0dSLTQtQ1YtU2NoZWR1bGUyMDI0MDYxNjIyNDc1MS5wZGY=`, 166 pages; parsed with python script extracting 24,030 hall ticket numbers across 166 pages called for Certificate Verification at Sri Potti Sreeramulu Telugu University, Nampally, Hyderabad)
  - TGPSC Group-IV General Ranking List (GRL) Announcement Dt.09/02/2024 (confirmed 7,26,837 admitted candidates evaluated from the written exam held on 01/07/2023)
  - Government of Telangana Finance (HRM.IV) Department G.O.Ms.No.51 dated 11/06/2021 (Telangana Revised Pay Scales 2020 Master Scale & Scale 6 ₹24,280 – 72,850)
  - Government of Telangana General Administration (Ser.A) Department G.O.Ms.No.55 dated 25/04/2022 (dispensing with interviews across direct recruitments) & G.O.Ms.No.136 dated 23/11/2022 (Group-IV scheme)
  - TGPSC Group-IV Services Notification No. 10/2018 PDF (`RElSRUNUUkVDUlVJVE1FTlROT1RJLzEwMjAxODAyMDYxOC5wZGY=`, 52 pages; confirmed 1,521 vacancies and previous cycle structure)
- **Sources only status-checked, not read**:
  - `https://otr.tgpsc.gov.in/` (One Time Registration portal)
- **Links curl-checked**:
  - `https://www.tgpsc.gov.in` → 200 OK
  - `https://websitenew.tgpsc.gov.in/notifications` → 200 OK
  - `https://websitenew.tgpsc.gov.in/preview/RElSRUNUUkVDUlVJVE1FTlROT1RJLzE5LTIwMjItR1JPVVAtSVYtTk9USUZJQ0FUSU9OMjAyMjEyMzEyMDMzMjUucGRmr95v17a0y2d8i13v` → 200 OK (application/pdf)
  - `https://websitenew.tgpsc.gov.in/preview/UFJFU1NOT1RFL0dyb3VwLUlWX1NjaGVtZV9hbmRfU3lsbGFidXMyMDIyMTEyNzExMDE1My5wZGY=r95v17a0y2d8i13v` → 200 OK (application/pdf)
  - `https://websitenew.tgpsc.gov.in/preview/UFJFU1NOT1RFL0dSLTQtQ1YtU2NoZWR1bGUyMDI0MDYxNjIyNDc1MS5wZGY=r95v17a0y2d8i13v` → 200 OK (application/pdf)
  - `https://websitenew.tgpsc.gov.in/preview/RElSRUNUUkVDUlVJVE1FTlROT1RJLzEwMjAxODAyMDYxOC5wZGY=r95v17a0y2d8i13v` → 200 OK (application/pdf)
- **Could NOT confirm, and why**: Exact individual scorecards for rejected/invalid OMR sheets (rejected candidate numbers are not included in the GRL).
- **Confidence downgrades made, and why**: None. All core figures are directly extracted from primary government PDFs.

---

### 2.2 `telangana-forest-fbo`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 sections populated, exceeding Tier B minimum requirements of exam_scheme + official_downloads)
- **Sections marked not_available**: None
- **Sections omitted**: None (job examination)
- **Sources OPENED and read this session**:
  - TSPSC Notification No. 48/2017 PDF (`RElSRUNUUkVDUlVJVE1FTlROT1RJLzQ4MjAxNy5wZGY=`, 23 pages; read with `pypdf`, confirming 1,857 vacancies for Forest Beat Officer, pre-revised pay scale ₹16,400 – 49,870, Annexure-III 200-mark scheme, walking endurance test of 25 km / 16 km in 4 hours, and medical vision requirements)
  - TSPSC Notification No. 47/2017 PDF (`RElSRUNUUkVDUlVJVE1FTlROT1RJLzQ3MjAxNy5wZGY=`, 22 pages; confirming 90 vacancies for Forest Section Officer, pre-revised pay scale ₹21,230 – 63,010, and scheme)
  - TSPSC Notification No. 46/2017 PDF (Forest Range Officer, confirming feeder hierarchy to FRO)
  - TSPSC Forest Beat Officer Revised Selection List PDF (`UFJFU1NOT1RFL0ZvcmVzdCBCZWF0IE9mZmljZXIgc2VsZWN0aW9uIGxpc3QyMDIyMTIxMzIwNTY0MC5wZGY=`, 7 pages; read with `pypdf`, detailing provisional selections across Khammam, Mahabubnagar, and Warangal agency areas pursuant to High Court W.A.No. 551/2019 orders)
  - Telangana State Forest Department Official Portal: `https://forests.telangana.gov.in` (confirmed live HTTP/2 200 OK)
  - Government of Telangana Finance Department G.O.Ms.No.51 dated 11/06/2021 (Telangana RPS 2020 Schedule Scale 5 ₹22,900 – 69,150 corresponding to pre-revised ₹16,400 – 49,870; Scale 11 ₹31,040 – 92,050 for FSO)
- **Sources only status-checked, not read**:
  - `http://old.tspsc.gov.in/Fbo482017/CheckListFBO-48-2017.pdf`
- **Links curl-checked**:
  - `https://websitenew.tgpsc.gov.in/preview/RElSRUNUUkVDUlVJVE1FTlROT1RJLzQ4MjAxNy5wZGY=r95v17a0y2d8i13v` → 200 OK (application/pdf)
  - `https://websitenew.tgpsc.gov.in/preview/RElSRUNUUkVDUlVJVE1FTlROT1RJLzQ3MjAxNy5wZGY=r95v17a0y2d8i13v` → 200 OK (application/pdf)
  - `https://websitenew.tgpsc.gov.in/preview/UFJFU1NOT1RFL0ZvcmVzdCBCZWF0IE9mZmljZXIgc2VsZWN0aW9uIGxpc3QyMDIyMTIxMzIwNTY0MC5wZGY=r95v17a0y2d8i13v` → 200 OK (application/pdf)
  - `https://forests.telangana.gov.in` → 200 OK
- **Could NOT confirm, and why**: Exact date of next standalone direct recruitment notification for FBO (the Forest Department has notified requisitions, but subsequent unified recruitments have been coordinated through TGPSC).
- **Confidence downgrades made, and why**: Total applicants for 2017 FBO cycle marked `reported` rather than `verified` as total registered numbers were disclosed in commission press briefings rather than in the Gazette notification itself.

---

### 2.3 `tspsc`
- **Tier**: C, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 sections fully populated, significantly exceeding Tier C minimum requirements of official_downloads only)
- **Sections marked not_available**: None
- **Sections omitted**: None (job examination)
- **Sources OPENED and read this session**:
  - TGPSC Group-I Services Detailed Notification No. 02/2024 PDF (`RElSRUNUUkVDUlVJVE1FTlROT1RJL05PVElGSUNBVElPTl9OT18wMi0yMDI0X0dyb3VwLUlfU2VydmljZXMgKDEpMjAyNDAyMjAxNDA3MzcucGRm`, 50 pages; inspected Para 1.3 vacancies and scales, Para 12 selection procedure, Para 12.1(B) 1:50 Mains admission ratio, Para 12.1(D) qualifying English marks, Para 12.8 minimum qualifying aggregate marks in Mains, and Annexure-II scheme)
  - TGPSC Group-I Scheme & Syllabus Document (`UFJFU1NOT1RFL0dyb3VwLUkgU2NoZW1lIGFuZCBTeWxsYWJ1czIwMjIxMTI5MTI1MzQwLnBkZg==`, 11 pages; read with `pypdf`, confirming 150-mark Prelims, 150-mark qualifying English, and 6 conventional descriptive merit papers totaling 900 marks)
  - TGPSC Group-I Certificate Verification Notification No. 02/2024 Dt.14/04/2025 (`UFJFU1NOT1RFL0dST1VQLUktMDIyNC1DVi1OT1RJRk4yMDI1MDQxNDExNDcyMy5wZGY=`, 5 pages; parsed with python script confirming exactly 563 candidate hall ticket numbers shortlisted for Certificate Verification across 5 pages at Suravaram Pratap Reddy University, Nampally)
  - TGPSC Group-I Consolidated Multi-Zone Vacancy Position Breakup PDF (`UFJFU1NOT1RFL0dST1VQLUktQlJFQUtVUC1PRi1WQUNBTkNJRVMyMDI1MDQxMTIxMjcxOS5wZGY=`, 2 pages)
  - TSPSC Group-I Notification No. 04/2022 PDF (`RElSRUNUUkVDUlVJVE1FTlROT1RJL0dST1VQLTEtTk9USUZJQ0FUSU9OLVdFQlNJVEUyMDIyMDQyOTE4MDgwMy5wZGY=`, 47 pages; confirmed 503 vacancies for 2022 cycle)
  - TSPSC Group-I Preliminary Examination Press Release Dt.16/10/2022 (confirmed 3,80,081 applicants registered and 2,86,051 appeared across 1,019 test venues, representing 75.26% attendance)
  - Government of Telangana Finance (HRM.IV) Department G.O.Ms.No.51 dated 11/06/2021 (Telangana RPS 2020 Scale 21 ₹54,220 – 1,33,630 for Deputy Collector, DSP, CTO, RTO, DPO, District Registrar)
  - Government of Telangana General Administration (Ser.A) Department G.O.Ms.No.55 dated 25/04/2022 (statutorily abolishing interview for Group-1 posts)
- **Sources only status-checked, not read**:
  - `https://tgpsc.gov.in` (confirmed redirect to `https://websitenew.tgpsc.gov.in/`)
- **Links curl-checked**:
  - `https://tgpsc.gov.in` → 200 OK
  - `https://websitenew.tgpsc.gov.in/preview/RElSRUNUUkVDUlVJVE1FTlROT1RJL05PVElGSUNBVElPTl9OT18wMi0yMDI0X0dyb3VwLUlfU2VydmljZXMgKDEpMjAyNDAyMjAxNDA3MzcucGRmr95v17a0y2d8i13v` → 200 OK (application/pdf)
  - `https://websitenew.tgpsc.gov.in/preview/UFJFU1NOT1RFL0dyb3VwLUkgU2NoZW1lIGFuZCBTeWxsYWJ1czIwMjIxMTI5MTI1MzQwLnBkZg==r95v17a0y2d8i13v` → 200 OK (application/pdf)
  - `https://websitenew.tgpsc.gov.in/preview/UFJFU1NOT1RFL0dST1VQLUktMDIyNC1DVi1OT1RJRk4yMDI1MDQxNDExNDcyMy5wZGY=r95v17a0y2d8i13v` → 200 OK (application/pdf)
  - `https://websitenew.tgpsc.gov.in/preview/UFJFU1NOT1RFL0dST1VQLUktQlJFQUtVUC1PRi1WQUNBTkNJRVMyMDI1MDQxMTIxMjcxOS5wZGY=r95v17a0y2d8i13v` → 200 OK (application/pdf)
  - `https://websitenew.tgpsc.gov.in/preview/RElSRUNUUkVDUlVJVE1FTlROT1RJL0dST1VQLTEtTk9USUZJQ0FUSU9OLVdFQlNJVEUyMDIyMDQyOTE4MDgwMy5wZGY=r95v17a0y2d8i13v` → 200 OK (application/pdf)
- **Could NOT confirm, and why**: Candidate-wise Mains marks transcript breakdown prior to completion of certificate verification (marks are protected under candidate login during active verification phases).
- **Confidence downgrades made, and why**: None. All core statistics, vacancy breakups, and shortlisting counts have been verified directly from primary commission documents.
