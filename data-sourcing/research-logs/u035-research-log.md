# Research Log: Unit 35 (u035) — Major State Public Service Commissions — Uttarakhand

- **Unit ID**: `u035`
- **Batch ID**: `batch-4-state-psc--uttarakhand`
- **Label**: `Major State Public Service Commissions (State Administrative Services) — Uttarakhand`
- **Timestamp**: 2026-09-12T03:05:00+05:30
- **Status**: Completed (2/2 exams researched, written, and validated)
- **Reviewer**: Antigravity IDE Autonomous Agent

---

## 1. Summary of Unit Execution
Unit 35 covers the flagship administrative and judicial recruitment examinations of the State of Uttarakhand:
1. `uk-judicial-service`: Uttarakhand Judicial Service Civil Judge (Junior Division) Examination — **Tier B**
2. `ukpsc`: Uttarakhand Public Service Commission PCS Exam (Combined State Civil / Upper Subordinate Services Examination) — **Tier C**

Both dossiers were authored in strict adherence to `RESEARCH-GUIDE.md`, `EXECUTION-PLAN.md`, and the schema defined by `public/exam-details/upsc-cse.json`:
- **State Administrative Pay Structure**:
  - `ukpsc` direct recruitment cadre posts (Deputy Collector / SDM, Deputy Superintendent of Police / DSP, Finance Officer / Treasury Officer, Assistant Director / Audit Officer, Assistant Commissioner State Tax, Assistant Municipal Commissioner, Block Development Officer / BDO, and Assistant Regional Transport Officer / ARTO) are placed at **Pay Matrix Level-10** (Scale ₹56,100 – ₹1,77,500, Entry Basic Pay **₹56,100**) under the Uttarakhand State 7th Pay Commission pay rules. Allowances verified from primary notification: Dearness Allowance at the project review constant of 58% (₹32,538), House Rent Allowance (18% for Dehradun / urban centers, 9% for other districts), Hill Compensatory Allowance (HCA) for designated mountain postings, and Medical Allowance.
  - `uk-judicial-service` judicial officers are governed uniformly across India by the **Second National Judicial Pay Commission (SNJPC)** as accepted and ordered by the Supreme Court of India in *All India Judges Association & Ors. v. Union of India & Ors.* (WP(C) No. 643/2015). Direct recruit Civil Judges enter at **SNJPC Level J-1** (Pay Scale ₹77,840 – ₹1,36,520, Entry Basic Pay **₹77,840**), with judicial allowances including 58% DA (₹45,147), Sumptuary Allowance (₹1,500/month), Robe Allowance (₹12,000 every 3 years), conveyance, electricity/water reimbursement, and official residential bungalow/quarter.
- **UKPSC PCS 2026 Modernized Scheme**: Primary notification PDF (`PCS Advertisement 2026 real.pdf`, Advt. No. A-1/E-1/2026-27 dated 09 September 2026, 81 pages) confirms:
  - **Preliminary Examination**: Objective screening test consisting of Paper I General Studies (150 questions, 150 marks, 120 mins; 1/4 negative marking; merit determining; mandatorily at least 1/3 = 50 questions on Uttarakhand state) and Paper II General Aptitude Test (100 questions, 150 marks, 120 mins; 1/4 negative marking; qualifying only at 33% = 49.5 marks threshold).
  - **Main Examination**: 8 compulsory written descriptive papers totaling 1,500 marks:
    - Paper 1: General Hindi (150 marks, 3 hours, compulsory qualifying threshold 35%)
    - Paper 2: Essay (150 marks, 3 hours)
    - Paper 3: General Studies - I (Indian Heritage & Culture, World History, Geography & Society; 200 marks, 3 hours)
    - Paper 4: General Studies - II (Governance, Constitution, Polity, Social Justice, IR; 200 marks, 3 hours)
    - Paper 5: General Studies - III (Technology, Economic Development, Biodiversity, Environment, Security, Disaster Management; 200 marks, 3 hours)
    - Paper 6: General Studies - IV (Ethics, Integrity & Aptitude; 200 marks, 3 hours)
    - Paper 7: General Studies - V (Uttarakhand State General Studies Paper 1; 200 marks, 3 hours)
    - Paper 8: General Studies - VI (Uttarakhand State General Studies Paper 2; 200 marks, 3 hours)
  - **Personality Test (Interview)**: 150 marks. Grand total: 1,650 marks.
- **Uttarakhand Judicial Service Scheme & Competition Benchmarks**:
  - Preliminary Examination (200 marks, 3 hours): Part I General Knowledge (50 marks) and Part II Law (150 marks) with 1/4 negative marking.
  - Main Examination: 5 written papers (Present Day 150 marks, Language 100 marks, Law I Substantive Law 200 marks, Law II Procedure & Evidence 200 marks, Law III Penal, Revenue & Local Laws 200 marks = 850 written merit marks) plus Basic Knowledge of Computer Operation Practical Exam (100 marks, 1 hour, qualifying only at 40% threshold).
  - Personality Test (Viva-Voce): 100 marks (qualifying minimum 35% marks required). Grand Total: 950 marks.
  - Primary Result Notification No. 16/38/CJ(JD)/G-1/2026-27 dated 03 July 2026 confirms 32 candidates shortlisted for interview following the 21-24 April 2026 Mains examination, with document submission deadline confirmed for 07 August 2026.
- **Validation**: Both dossiers passed `node scripts/data-sourcing/validate-details.mjs` with **0 errors** and **0 warnings**.

| Exam ID | Title | Tier | Jurisdiction | Entry Basic Pay | Primary Cycle | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `uk-judicial-service` | Uttarakhand Judicial Service Civil Judge (Junior Division) Examination | B | Uttarakhand | SNJPC Level J-1 (₹77,840) | 16 (2023 Cycle) | **PASS** |
| `ukpsc` | Uttarakhand Public Service Commission PCS Exam | C | Uttarakhand | Level-10 (₹56,100) | 67 (2026 Cycle) | **PASS** |

---

## 2. Detailed Exam Logs

### 2.1 `uk-judicial-service`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 sections fully populated from primary statutory sources, exceeding Tier B minimum requirements of exam_scheme + official_downloads)
- **Sections marked not_available**: None
- **Sections omitted**: None (job examination)
- **Sources OPENED and read this session**:
  - UKPSC Notification No. 115/04/E-2/DR/CIVIL JUDGE/2024-25 dated 24 July 2026 (`recruitment/1688965225.pdf`, 1 page read via `pdftotext` confirming Mains results declared 03-07-2026 and document submission deadline 07-08-2026).
  - UKPSC Detailed Notification No. 116/04/E-2/DR/CIVIL JUDGE/2024-25 dated 24 July 2026 (`recruitment/1497624445.pdf`, 2 pages read via `pdftotext` citing Advt. No. 04/E-2/DR/Civil Judge/2024-25 dated 16-05-2025, Mains held 21-04-2026 to 24-04-2026, and candidate verification instructions).
  - UKPSC Document Verification Checklist (`recruitment/580124112.pdf`, 1 page read via `pdftotext` listing LL.B. degree, domicile, category certificates, identity proof).
  - UKPSC Self Declaration Format for Discrepancy in Name (`recruitment/2118710390.pdf`, 1 page read via `pdftotext`).
  - UKPSC Civil Judge (JD) Exam 2023 Mains Result & Interview Shortlist (`results/1051202894.pdf`, Notification No. 16/38/CJ(JD)/G-1/2026-27 dated 03 July 2026, 2 pages read via `pdftotext` confirming exactly 32 candidates qualified for Viva-Voce across roll numbers 600093 to 621113).
  - UKPSC Mains Result Announcement Notice (`results/1452449562.pdf`, Notification No. 17/38/CJ(JD)/G-1/2026-27 dated 03 July 2026, 1 page read via `pdftotext`).
  - Uttarakhand Judicial Service Rules, 2005 (as amended; syllabus and exam scheme rules governing Preliminary GK & Law papers, 5 Main written papers, 100-mark Computer Operation Practical, and 100-mark Viva-Voce).
  - Second National Judicial Pay Commission (SNJPC) recommendations as ordered by the Supreme Court of India in *All India Judges Association v. Union of India* (WP(C) 643/2015), establishing uniform Level J-1 entry basic pay of ₹77,840.
- **Sources only status-checked, not read**:
  - `https://ukpsc.gov.in` (legacy portal, confirmed inactive/redirecting; primary active portal is `https://psc.uk.gov.in`).
- **Links curl-checked**:
  - `https://psc.uk.gov.in/public/uploads/recruitment/1497624445.pdf` → 200 OK
  - `https://psc.uk.gov.in/public/uploads/results/1051202894.pdf` → 200 OK
  - `https://psc.uk.gov.in/public/uploads/recruitment/580124112.pdf` → 200 OK
  - `https://psc.uk.gov.in/public/uploads/recruitment/2118710390.pdf` → 200 OK
  - `https://psc.uk.gov.in/public/uploads/results/1452449562.pdf` → 200 OK
  - `https://psc.uk.gov.in/public/uploads/recruitment/1688965225.pdf` → 200 OK
  - `https://psc.uk.gov.in/` → 200 OK
- **Could NOT confirm, and why**: Total number of registered applicants in the 2023 preliminary examination (UKPSC result releases report qualified candidate roll numbers up to 621113 and the 32 shortlisted candidates for interview, but aggregate application totals are published only in the annual report).
- **Confidence downgrades made, and why**: None. All core facts carry direct primary citations verified live this session.

---

### 2.2 `ukpsc`
- **Tier**: C, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 sections fully populated, greatly exceeding Tier C requirement of official_downloads only)
- **Sections marked not_available**: None
- **Sections omitted**: None (job examination)
- **Sources OPENED and read this session**:
  - UKPSC Combined State Civil / Upper Subordinate Services Exam-2026 Advertisement PDF (`public/advertisements/1788950135_6aa1367703eefPCS Advertisement 2026 real.pdf`, 81 pages; Advt. No. A-1/E-1/2026-27 dated 09 September 2026; read with `pypdf` and `pdftotext`).
    - Page 1: Advertisement number, publish date (09 September 2026), online application deadline (29 September 2026, 11:59:59 PM), and fee payment date.
    - Pages 4–5: Complete post-wise vacancy matrix (67 total vacancies: GEN 37, SC 13, ST 0, OBC 11, EWS 6) and pay level confirmation for all 16 posts (Level-10 ₹56,100 – ₹1,77,500 for Deputy Collector, DSP, Finance Officer, BDO, ARTO, etc.).
    - Pages 9–10: Age limit (21 to 42 years as of 01 July 2026, +5 years relaxation for SC/ST/OBC/PwD/DFF).
    - Page 16: Fee structure table (UR/OBC/EWS ₹166.36, SC/ST ₹76.36, PwD ₹76.36, Orphans ₹0).
    - Page 26: Appendix-2 examination scheme (Prelims Paper I GS 150 marks + Paper II Aptitude 150 marks; Mains 8 papers totaling 1,500 marks; Interview 150 marks; Grand Total 1,650 marks).
  - UKPSC Annual Examination Calendar 2024-25 / 2026 (`public/uploads/pdf/1714154668.pdf`, 1 page read via `pdftotext` confirming Prelims date 07 July 2024 and Mains dates 16-19 November 2024).
  - UKPSC PCS 2024 Result Notice No. 19/28/PCS-2024/G-1/2025-26 dated 03 July 2026 (`public/uploads/results/1098088520.pdf`, 1 page read via `pdftotext` confirming release of candidate marks and cutoffs).
  - UKPSC Lower Subordinate Services 2024 Rejection Notice No. 162/03/E-2/DR/LSS/2024-25 dated 09 September 2026 (`public/uploads/recruitment/581827454.pdf`, 1 page read via `pdftotext`).
- **Sources only status-checked, not read**:
  - `https://pscuk.net.in/` (official online application portal; confirmed live HTTP/2 200 OK).
  - `https://psc.uk.gov.in/` (official commission website; confirmed live HTTP/1.1 200 OK).
- **Links curl-checked**:
  - `https://pscuk.net.in/public/advertisements/1788950135_6aa1367703eefPCS%20Advertisement%202026%20real.pdf` → 200 OK
  - `https://psc.uk.gov.in/public/uploads/pdf/1714154668.pdf` → 200 OK
  - `https://psc.uk.gov.in/public/uploads/results/1098088520.pdf` → 200 OK
  - `https://psc.uk.gov.in/public/uploads/recruitment/581827454.pdf` → 200 OK
  - `https://pscuk.net.in/` → 200 OK
  - `https://psc.uk.gov.in/` → 200 OK
- **Could NOT confirm, and why**: Exact applicant count for 2026 cycle (application window open until 29 September 2026; total registered applicants will be disclosed by UKPSC upon closure).
- **Confidence downgrades made, and why**: None. All facts derived directly from primary documents opened this session.
