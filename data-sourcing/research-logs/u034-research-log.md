# Research Log: Unit 34 (u034) — Major State Public Service Commissions — Tripura

- **Unit ID**: `u034`
- **Batch ID**: `batch-4-state-psc--tripura`
- **Label**: `Major State Public Service Commissions (State Administrative Services) — Tripura`
- **Timestamp**: 2026-09-12T03:06:00+05:30
- **Status**: Completed (2/2 exams researched, written, and validated)
- **Reviewer**: Antigravity IDE Autonomous Agent

---

## 1. Summary of Unit Execution
Unit 34 covers the flagship state civil service and administrative recruitment examinations of the State of Tripura conducted by the Tripura Public Service Commission (TPSC):
1. `tpsc-cce`: Tripura Public Service Commission Combined Competitive Examination — **Tier B**
2. `tpsc-tcs`: Tripura Public Service Commission Civil Service Examination — **Tier C**

Both dossiers were authored in strict adherence to `RESEARCH-GUIDE.md`, `EXECUTION-PLAN.md`, and the schema defined by `public/exam-details/upsc-cse.json`:
- **Tripura State Administrative Cadre & Pay Structure (§5.3 State Pay Trap Avoided)**:
  - Executive cadres under direct recruitment: **Tripura Civil Service (TCS) Grade-II** (Executive field administration: Deputy Collector & Magistrate, Sub-Divisional Magistrate / SDM, Block Development Officer / BDO) and **Tripura Police Service (TPS) Grade-II** (Deputy Superintendent of Police / DSP, Assistant Commandant TSR) are Group 'A' Gazetted officers placed at **Pay Matrix Level 14** under the **Tripura State Civil Services (Revised Pay) (First Amendment) Rules, 2018** (effective 01.10.2018; corresponding to pre-revised PB-4 ₹15,600 – ₹39,100 + Grade Pay ₹5,400 under Tripura ROP 2017).
  - Primary document verification: Confirmed directly from Table 4 (Page 43) of the *Report of the Expert Committee on Revision of Pay for Employees of the State Government and other organizations of Tripura (2018)* (`REPORT-OF-EC-2018.PDF`) published by the Tripura Finance Department, and verified against TPSC recruitment advertisement Advt. No. 05/2022.
  - Entry Basic Pay: **₹54,000** (Cell 1, Level 14).
  - Dearness Allowance: Standardized to the project review constant of **58%** as of 2025-07-01 (58% of ₹54,000 = **₹31,320**).
  - Allowances & In-Hand: House Rent Allowance (8% in Agartala municipal corporation area = ₹4,320; 7% in other district headquarters/subdivisions = ₹3,780), and fixed monthly Medical Allowance of ₹500. Gross range estimate: **₹89,600 – ₹96,500**. Net in-hand range estimate: **₹79,000 – ₹86,000** after statutory deductions for National Pension System (NPS, 10% on Basic + DA = ₹8,532/month), Tripura State Employees Group Insurance Scheme (GIS, ₹300/month), and Professional Tax (₹200/month).
  - Allied Administrative Cadres: Evaluated Tripura Combined Competitive Examination for Miscellaneous Posts (Advt. No. 18/2025) recruiting Superintendent of Taxes (Level 12, Entry Basic ₹42,900, GP 4600), Inspector of Small Savings (Level 10, Entry Basic ₹34,700, GP 4200), and Supervisor ICDS (Level 9, Entry Basic ₹27,300, GP 2800).
- **Statutory Exam Scheme & Regulations**:
  - Governed by the *Tripura Civil Service and Tripura Police Service (Appointment by Combined Competitive Examination) 14th (fourteenth amendment) Regulations, 2017* (Notification dated 05.01.2018) and syllabus document `tcstpssyllsbus4322.pdf`.
  - **Preliminary Examination**: Objective OMR screening test of 200 multiple-choice questions carrying 200 marks, duration 150 minutes (2½ hours). Penalty: **1/4th (0.25) mark** deducted for each incorrect response. Commission summons maximum 10 times the number of vacancies category-wise for admission to Mains.
  - **Main Examination**: 6 compulsory conventional written descriptive papers totaling **800 marks** (all 3 hours / 180 minutes each):
    1. Language Paper I: English Essay (40m), Report Writing (30m), Précis Writing (30m) = 100 marks.
    2. Language Paper II: English Composition (50m) + Bengali / Kokborok / Alternative English (50m) = 100 marks.
    3. General Studies Paper I: 150 marks (Section A: GK & Current Affairs 25m, Science & Tech 25m, Numerical Ability 25m, Reasoning 25m in MCQ format with 0.25 negative marking; Section B: Environmental Conservation 25m, Security & Disaster Management 25m in descriptive format).
    4. General Studies Paper II: 150 marks (Section A: Modern History of India 50m, History of Tripura 20m, Indian Socio-Cultural Heritage & Cultural Heritage of Tripura 30m; Section B: Geography of India 35m, Geography of Tripura 15m).
    5. General Studies Paper III: 150 marks (Section A: Constitution of India & Human Rights 50m, Indian Political System & Governance 35m, Political & Administrative System of Tripura 15m; Section B: Foreign Policy of India & External Relations 25m, International Organizations & Global Issues 25m).
    6. General Studies Paper IV: 150 marks (Section A: Indian Economy 30m, Budgetary, Fiscal & Monetary Policy 30m, Banking & Financial Markets 30m; Section B: Social Security Measures & Welfare Programs 30m, Economy of Tripura 30m).
  - **Personality Test (Interview)**: 100 marks (candidates summoned at a 1:3 vacancy ratio).
  - **Grand Total Merit Score**: 800 (Written) + 100 (Interview) = **900 marks**.
- **Competition Benchmarks & Primary Recommendation Lists**:
  - **2022 Cycle (Advt. 05/2022, Notification dated 12.09.2024)**: Exactly 40 vacancies (30 TCS Gr-II, 10 TPS Gr-II). Exactly 40 candidates recommended. Highest TCS: 598.75 (Sagar Datta Majumdar, Roll 10080); Highest TPS: 509.75 (Debojyoti Sinha, Roll 10582). Cutoffs out of 900: TCS UR 508.50, SC 457.75, ST 460.25 (PH Loco 441.75, PH HI 387.25); TPS UR 498.25, SC 453.25, ST 450.50.
  - **2020 Cycle (Advt. 03/2020, Notification dated 28.09.2021)**: 40 vacancies (30 TCS Gr-II, 10 TPS Gr-II). Prelims held 29.11.2020 shortlisted 414 candidates for Mains (Notification dated 29.12.2020). Exactly 40 candidates recommended. Highest TCS: 569.75 (Krittika Saha, Roll 11394); Highest TPS: 526.00 (Jayanta Dubey, Roll 11462). Cutoffs out of 900: TCS UR 514.75, SC 479.00, ST 449.50 (PH Visual 426.25, PH Loco 416.25); TPS UR 506.25, SC 475.00, ST 444.00.
- **Validation**: Both dossiers passed `node scripts/data-sourcing/validate-details.mjs` with **0 errors** and **0 warnings**.

| Exam ID | Title | Tier | Jurisdiction | Entry Basic Pay | Primary Cycle | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `tpsc-cce` | Tripura Public Service Commission Combined Competitive Examination | B | Tripura | Level 14 (₹54,000) | 40 (Advt. 05/2022) | **PASS** |
| `tpsc-tcs` | Tripura Public Service Commission Civil Service Examination | C | Tripura | Level 14 (₹54,000) | 30 (Advt. 05/2022) | **PASS** |

---

## 2. Detailed Exam Logs

### 2.1 `tpsc-cce`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 sections fully populated, exceeding Tier B minimum requirements of exam_scheme + official_downloads)
- **Sections marked not_available**: None
- **Sections omitted**: None (job examination)
- **Sources OPENED and read this session**:
  - TPSC Advt. No. 05/2022 Notification PDF (`sites/default/files/advttcstps3322.pdf`, 6 pages read via `pypdf` confirming 40 vacancies [30 TCS Gr-II + 10 TPS Gr-II], Pay Matrix Level 14, age limit 21–40 years, prelims 200 marks, mains 800 marks, interview 100 marks).
  - TPSC TCS & TPS Combined Competitive Main Examination Scheme & Detailed Syllabus PDF (`sites/default/files/tcstpssyllsbus4322.pdf`, 9 pages read via `pypdf` confirming all 6 papers, mark distributions, sectional breakdown, and 1/4 negative marking in GS-I Section A).
  - TPSC TCS & TPS CCE 2022 Final Recommendation List & Category-Wise Cutoff Marks Notification No. F.11(1-15)-TPSC/EXAM/TCS&TPS/2022 dated 12.09.2024 (`sites/default/files/Recom_tcs_tps_05_2022.pdf`, 3 pages read via `pypdf` and PNG rendering confirming all 40 recommended candidates, merit roll numbers, toppers Sagar Datta Majumdar 598.75 and Debojyoti Sinha 509.75, and official cutoffs).
  - TPSC TCS & TPS CCE 2020 Final Recommendation List Notification No. F.11(1-15)-TPSC/EXAM/TCS&TPS/2020 dated 28.09.2021 (`sites/default/files/tcs-tps-28-09-21.pdf`, 3 pages read via `pypdf` confirming 40 candidates recommended, toppers Krittika Saha 569.75 and Jayanta Dubey 526.00, and category cutoffs).
  - TPSC TCS & TPS CCE 2020 Preliminary Examination Qualified Shortlist dated 29.12.2020 (`sites/default/files/tcs-tps_291220.pdf`, 4 pages read via `pypdf` confirming 414 candidates shortlisted for Main Examination).
  - TPSC TCS & TPS Preliminary Examination Question Paper Booklet (General Studies) (`sites/default/files/tcs-pre-19.pdf`, 32 pages read via `pypdf` confirming 200 MCQs, 2½ hours duration, 0.25 penalty).
  - Government of Tripura Finance Department *Report of the Expert Committee on Revision of Pay for Employees of the State Government (2018)* (`REPORT-OF-EC-2018.PDF`, 57 pages read via `pypdf`, confirming Table 4 Level 14 Entry Basic Pay ₹54,000 for pre-revised PB-4 GP 5400).
- **Sources only status-checked, not read**:
  - `https://tpsc.tripura.gov.in` (official portal; confirmed live HTTP/1.1 200 OK).
  - `https://tpsc.tripura.gov.in/examination` (confirmed live HTTP/1.1 200 OK).
  - `https://tpsc.tripura.gov.in/syllabus-and-schemes` (confirmed live HTTP/1.1 200 OK).
- **Links curl-checked**:
  - `https://tpsc.tripura.gov.in/sites/default/files/advttcstps3322.pdf` → 200 OK
  - `https://tpsc.tripura.gov.in/sites/default/files/tcstpssyllsbus4322.pdf` → 200 OK
  - `https://tpsc.tripura.gov.in/sites/default/files/Recom_tcs_tps_05_2022.pdf` → 200 OK
  - `https://tpsc.tripura.gov.in/sites/default/files/tcs-tps-28-09-21.pdf` → 200 OK
  - `https://tpsc.tripura.gov.in/sites/default/files/tcs-tps_291220.pdf` → 200 OK
  - `https://tpsc.tripura.gov.in/sites/default/files/tcs-pre-19.pdf` → 200 OK
  - `https://finance.tripura.gov.in/sites/default/files/REPORT-OF-EC-2018.PDF` → 200 OK
- **Could NOT confirm, and why**: Total aggregate preliminary exam applicant count for the 2022 cycle (TPSC publishes roll numbers of admitted and shortlisted candidates, but aggregate registration counts are kept in internal administrative annual reports).
- **Confidence downgrades made, and why**: None. All core figures are directly drawn from primary official notifications.

---

### 2.2 `tpsc-tcs`
- **Tier**: C, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 sections fully populated, greatly exceeding Tier C requirement of official_downloads only)
- **Sections marked not_available**: None
- **Sections omitted**: None (job examination)
- **Sources OPENED and read this session**:
  - TPSC Advt. No. 05/2022 Notification PDF (`sites/default/files/advttcstps3322.pdf`, 6 pages read confirming TCS Grade-II 30 posts, eligibility, age limits, pay scale Level 14 ₹54,000).
  - TPSC TCS & TPS Combined Competitive Main Examination Scheme & Syllabus (`sites/default/files/tcstpssyllsbus4322.pdf`, 9 pages read confirming complete syllabus).
  - TPSC Final Recommendation List & Cutoffs for TCS Grade-II (Advt. 05/2022) dated 12.09.2024 (`sites/default/files/Recom_tcs_tps_05_2022.pdf`, 3 pages read confirming exactly 30 TCS Grade-II recommendations, highest score 598.75, category cutoffs UR 508.50, SC 457.75, ST 460.25).
  - TPSC Final Recommendation List for TCS Grade-II (Advt. 03/2020) dated 28.09.2021 (`sites/default/files/tcs-tps-28-09-21.pdf`, 3 pages read confirming 30 TCS Grade-II recommendations, highest score 569.75, category cutoffs UR 514.75, SC 479.00, ST 449.50).
  - TPSC Combined Competitive Examination for Miscellaneous Posts Advertisement (Advt. No. 18/2025) (`Advt_18_2025_040625.pdf`, 6 pages read via `pypdf` and PNG rendering confirming allied administrative cadres: Superintendent of Taxes Level 12 ₹42,900, Inspector of Small Savings Level 10 ₹34,700, Supervisor Level 9 ₹27,300).
  - Guidelines & Amended Syllabus for Combined Competitive Examination for Miscellaneous Posts (`Guidlines & Amended copy of Misc..pdf`, 6 pages read confirming Prelims 100m, Mains 200m, Interview 20m).
  - Government of Tripura Finance Department Pay Matrix Report 2018 (`REPORT-OF-EC-2018.PDF`, Table 4, Page 43).
- **Sources only status-checked, not read**:
  - `https://tpsc.tripura.gov.in` (confirmed live HTTP/1.1 200 OK).
  - `https://tpsc.tripura.gov.in/examination` (confirmed live HTTP/1.1 200 OK).
  - `https://tpsc.tripura.gov.in/syllabus-and-schemes` (confirmed live HTTP/1.1 200 OK).
- **Links curl-checked**:
  - `https://tpsc.tripura.gov.in/sites/default/files/Advt_18_2025_040625.pdf` → 200 OK
  - `https://tpsc.tripura.gov.in/sites/default/files/Guidlines%20%26%20Amended%20copy%20of%20Misc..pdf` → 200 OK
  - `https://tpsc.tripura.gov.in/sites/default/files/advttcstps3322.pdf` → 200 OK
  - `https://tpsc.tripura.gov.in/sites/default/files/tcstpssyllsbus4322.pdf` → 200 OK
  - `https://tpsc.tripura.gov.in/sites/default/files/Recom_tcs_tps_05_2022.pdf` → 200 OK
  - `https://tpsc.tripura.gov.in/sites/default/files/tcs-tps-28-09-21.pdf` → 200 OK
  - `https://finance.tripura.gov.in/sites/default/files/REPORT-OF-EC-2018.PDF` → 200 OK
- **Could NOT confirm, and why**: None. All core parameters for TCS Grade-II and allied civil administrative services are substantiated with primary documentation.
- **Confidence downgrades made, and why**: None.
