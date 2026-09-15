# Research Log: Unit 27 (u027) — Major State Public Service Commissions — Meghalaya

- **Unit ID**: `u027`
- **Batch ID**: `batch-4-state-psc--meghalaya`
- **Label**: `Major State Public Service Commissions (State Administrative Services) — Meghalaya`
- **Timestamp**: 2026-09-12T02:04:00+05:30
- **Status**: Completed (1/1 exam researched, written, and validated)
- **Reviewer**: Antigravity IDE Autonomous Agent

---

## 1. Summary of Unit Execution
Unit 27 covers the flagship administrative recruitment examination of the State of Meghalaya:
1. `mpsc-meghalaya-cce`: Meghalaya Public Service Commission Combined Civil Services Exam (Meghalaya Civil Service / MCS) — **Tier B**

The dossier was authored in strict adherence to `RESEARCH-GUIDE.md`, `EXECUTION-PLAN.md`, and the schema defined by `public/exam-details/upsc-cse.json`:
- **State Administrative Pay Structure**: Correctly cites the **Meghalaya Services (Revision of Pay) Rules, 2018** (notified vide Finance Department Notification No. F(PR)-77/2017/117 dated 1 March 2018, implementing the Fifth Meghalaya Pay Commission / 5MPC with effect from 1 January 2017). Cadre posts in the Meghalaya Civil Service (Junior Grade) are placed at **Pay Matrix Level 15** (Scale ₹45,600 – ₹1,07,500, Entry Basic Pay **₹45,600**; corresponding to pre-revised PB-4 ₹17,000 – ₹33,690 under the Meghalaya Services (ROP) Rules 2009). Pursuant to Office Memorandum No. F(PR)-52/2017/30 dated 19 December 2017, Level 15 is the statutory threshold for Group 'A' Gazetted posts in Meghalaya. Pre-revision stubs quoting central 7th CPC Level 9/10 rates (₹53,100) were rejected per §5.3 as conflations with central pay scales.
- **Exam Scheme Overhaul (2025 Reform)**: Primary gazette notifications confirm a comprehensive modernization of the examination scheme under Government of Meghalaya Personnel & A.R. (A) Department Notification Memo No. PER.6/97/225-A dated 11 August 2025, published in the Meghalaya Gazette and implemented by MPSC from Advt. No. 18/2025:
  - **Optional Subjects Completely Eliminated**: Replaced by UPSC-aligned General Studies I–IV, an Essay paper, and a dedicated 250-mark paper exclusively on Meghalaya (History, Polity, Socio-Economic Issues, Culture, Literature, Geography).
  - **Preliminary Examination**: Objective screening test carrying 400 marks (Paper I General Studies 200 marks, 120 mins, determines merit for Mains; Paper II CSAT 200 marks, 120 mins, qualifying at 33% threshold; 1/3 negative marking penalty). Shortlist ratio from Prelims to Mains is strictly maintained at 1:15 (Advt. No. 18/2025 Para 6.2).
  - **Main Examination**: Conventional written descriptive test of 6 merit papers totaling 1,500 marks plus 300 marks qualifying English (at 33% threshold), followed by a 150-mark Interview / Personality Test summoned at a 1:1.5 candidate ratio, yielding a grand total of 1,650 merit marks.
- **Competition Benchmarks & Primary Statistics**: Verified from MPSC primary result notifications, roll-number-level marks disclosures, and examination programme orders:
  - **MCS 2025 Cycle (Advt. No. 18/2025)**: 36 vacancies advertised (UR: 6, Khasi-Jaintia: 14, Garo: 14, Other ST/SC: 2). Preliminary Examination confirmed for 26 September 2026 across 33 examination venues (Shillong, Tura, Jowai, Nongstoin, Williamnagar) with a total seated capacity of 15,156 candidates (Programme Notice No. MPSC/EX-C/25/2026/27 dated 14 August 2026). Statutorily shortlists 540 candidates for Mains (15×) and summons 54 candidates for Interview (1.5×).
  - **MCS 2021/2022 Cycle (Advt. Feb 2022 / July 2023, completed Jan 2025)**: 13,435 appearing candidates evaluated in Prelims Paper I (verified directly from the 287-page official roll number & marks publication vide Notice dated 09 August 2024, `notify/Notice09Aug2024d.pdf`, spanning roll numbers up to 24,943); Mains examination conducted 8–16 October 2024; 35 candidates recommended in final merit list on 17 January 2025 (Notification No. MPSC/Ex-C/50/2021-2022/171: 5 UR, 14 Khasi-Jaintia, 14 Garo, 2 Other ST/SC: Asish Koch, Kavery Rabha).
- **Validation**: Passed `node scripts/data-sourcing/validate-details.mjs` with **0 errors** and **0 warnings**.

| Exam ID | Title | Tier | Jurisdiction | Entry Basic Pay | Primary Cycle | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `mpsc-meghalaya-cce` | Meghalaya Public Service Commission Combined Civil Services Exam | B | Meghalaya | Level 15 (₹45,600) | 36 (2025 Cycle) | **PASS** |

---

## 2. Detailed Exam Logs

### 2.1 `mpsc-meghalaya-cce`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 sections fully populated from primary sources, exceeding Tier B minimum requirements of exam_scheme + official_downloads)
- **Sections marked not_available**: None
- **Sections omitted**: None (job examination)
- **Sources OPENED and read this session**:
  - MPSC Official Commission Portal: `https://mpsc.meghalaya.gov.in` (confirmed live 200 OK; noted domain migration from old `mpsc.nic.in` which returns NXDOMAIN)
  - MPSC Online Recruitment Processing Application (RPA) Portal: `https://rpa.meghalaya.gov.in` (confirmed live HTTP/2 200 OK; migrated from `megrecruitment.nic.in`)
  - MPSC Advt. No. 18/2025 Notification PDF (`advt/Advt10Oct2025a.pdf`, 7 pages read with `pdftotext` and `pypdf`)
  - Government of Meghalaya Personnel & A.R. (A) Department Notification Memo No. PER.6/97/225-A dated 11 August 2025 / MPSC Plan of Examination & Syllabi PDF (`syllabus/MCS_Syllabus2025.pdf`, 3 pages read with `pdftotext`)
  - MPSC Preliminary Examination Programme & Seating Venue Notice dated 14 August 2026 (`programme/Notice14Aug2026a.pdf`, 2 pages; rendered with `pdftoppm` and inspected via `view_file`)
  - MPSC MCS Junior Grade Final Merit Recommendation Notification No. MPSC/Ex-C/50/2021-2022/171 dated 17 January 2025 (`results/Result17Jan2025a.pdf`, 2 pages; rendered with `pdftoppm` and inspected via `view_file`)
  - MPSC Preliminary Examination Paper I Candidate-wise Marks Publication Notice dated 09 August 2024 (`notify/Notice09Aug2024d.pdf`, 287 pages; parsed with python script extracting 13,435 candidate marks rows with roll numbers up to 24,943)
  - MPSC Mains 2024 Programme Notice No. MPSC/EX-c/7/2023-2024/80 dated 05 September 2024 (`programme/Notice05Sep2024a.pdf`, 2 pages; rendered with `pdftoppm` and inspected via `view_file`)
  - Meghalaya Services (Revision of Pay) Rules, 2018 (Finance Department Notification No. F(PR)-77/2017/117 dated 1 March 2018, published on `megfinance.gov.in/files/notifications/Meghalaya_Services_Revision_of_Pay_Rules_2018.pdf`, 17 pages; rendered with `pdftoppm`, page 14 inspected via `view_file` confirming First Schedule Pay Matrix Level 15 scale ₹45,600 – ₹1,07,500)
  - Government of Meghalaya Finance (PR) Department O.M. No. F(PR)-52/2017/30 dated 19 December 2017 on Classification of Services/Posts (Group 'A' defined as Level 15 and above)
  - Government of Meghalaya Finance (PR) Department O.M. No. F(PR)-54/2017/18 dated 1 December 2017 on House Rent Allowance (15% Greater Shillong, 12.5% District HQs, 10% Other areas)
  - Government of Meghalaya Finance (PR) Department O.M. No. F(PR)-56/2017/18 dated 1 December 2017 on Hill Compensatory Allowance (₹500/month flat)
  - Government of Meghalaya Finance (PR) Department O.M. No. F(PR)-55/2017/18 dated 1 December 2017 on Medical Allowance (₹1,000/month flat)
  - The Meghalaya Civil Service Rules, 1975 (`http://meglaw.gov.in/rules/The_Meghalaya_Civil_Service_Rules_1975.pdf`, 12 pages read with `pdftotext`, confirming Rule 5 recruitment method, Rule 12 probation, Rule 17 scales, Rule 22 promotion to Senior Grade after 7 years)
  - MPSC Question Papers Archive (`pyq.html`): confirmed live PYQ PDFs for MCS Mains 2024 (`misc/MEGHALAYA CIVIL SERVICE 2024.pdf`, 19.2 MB), MCS Prelims 2023 (`misc/04112023MCSPRELIMS.pdf`, 18.1 MB), MPS Prelims 2022 (`misc/17122022MPSPRELIMS.pdf`, 27.2 MB), and MCS Prelims 2018 (`misc/04082018MCS2017PRELIMS.pdf`, 3.8 MB)
- **Sources only status-checked, not read**:
  - `https://megrecruitment.nic.in` (former recruitment portal, successfully confirmed migration to `https://rpa.meghalaya.gov.in`)
  - `https://mpsc.nic.in` (legacy domain; confirmed NXDOMAIN; corrected to `https://mpsc.meghalaya.gov.in`)
- **Links curl-checked**:
  - `https://mpsc.meghalaya.gov.in` → 200 OK
  - `https://rpa.meghalaya.gov.in/` → 200 OK
  - `https://mpsc.meghalaya.gov.in/advt/Advt10Oct2025a.pdf` → 200 OK
  - `https://mpsc.meghalaya.gov.in/syllabus/MCS_Syllabus2025.pdf` → 200 OK
  - `https://mpsc.meghalaya.gov.in/programme/Notice14Aug2026a.pdf` → 200 OK
  - `https://mpsc.meghalaya.gov.in/results/Result17Jan2025a.pdf` → 200 OK
  - `https://mpsc.meghalaya.gov.in/notify/Notice09Aug2024d.pdf` → 200 OK
  - `https://mpsc.meghalaya.gov.in/misc/MEGHALAYA%20CIVIL%20SERVICE%202024.pdf` → 200 OK
  - `https://mpsc.meghalaya.gov.in/misc/04112023MCSPRELIMS.pdf` → 200 OK
  - `https://mpsc.meghalaya.gov.in/misc/17122022MPSPRELIMS.pdf` → 200 OK
  - `http://meglaw.gov.in/rules/The_Meghalaya_Civil_Service_Rules_1975.pdf` → 200 OK
  - `https://megfinance.gov.in/files/notifications/Meghalaya_Services_Revision_of_Pay_Rules_2018.pdf` → 200 OK
- **Could NOT confirm, and why**: Exact individual Marks/Scorecards for the final interview of the 2022 cycle (MPSC published rank list with category breakdown, but total score out of 1,650 is accessible only via candidate login on the marks portal `view_marks.html`).
- **Confidence downgrades made, and why**: None. All figures carry strict primary citations directly opened and inspected this session.
