# Research Log: Unit 17 (u017) — Major State Public Service Commissions — Chhattisgarh

- **Unit ID**: `u017`
- **Batch ID**: `batch-4-state-psc--chhattisgarh`
- **Label**: `Major State Public Service Commissions (State Administrative Services) — Chhattisgarh`
- **Timestamp**: 2026-09-11T21:24:00+05:30
- **Status**: Completed (2/2 exams researched, written, and validated)
- **Reviewer**: Antigravity IDE Autonomous Agent

---

## 1. Summary of Unit Execution
Unit 17 covers the two flagship examinations administered by the Chhattisgarh Public Service Commission (CGPSC) and the High Court of Chhattisgarh Bilaspur:
1. `cg-judicial-service`: Chhattisgarh Judicial Service (Civil Judge Entry Level) Examination — **Tier B**
2. `cgpsc`: Chhattisgarh Public Service Commission State Service Exam (CGPSC SSE) — **Tier C**

Both dossiers have been authored in strict compliance with `RESEARCH-GUIDE.md` and `EXECUTION-PLAN.md`:
- **Judicial Service Pay Structure**: Accurately reflects the Second National Judicial Pay Commission (SNJPC) uniform pay matrix (Level J-1 entry basic ₹77,840; scale ₹77,840–₹1,36,520) mandated by the Supreme Court of India in *All India Judges Association v. Union of India* (WP(C) 643/2015), avoiding the central 7th CPC civilian matrix trap.
- **State Administrative Service Pay Structure**: Accurately cites the Government of Chhattisgarh Finance Department Revised Pay Rules, 2017 (छ.ग. वेतन पुनरीक्षण नियम, 2017) at Pay Matrix Level 12 (PB-3 ₹15,600–₹39,100 with Grade Pay ₹5,400, entry basic ₹56,100), rather than central scales.
- **Exam Schemes**:
  - `cg-judicial-service`: Prelims (100 marks MCQ screening test), Mains (100 marks written descriptive covering Civil Judgment Writing 40 marks, Criminal Judgment Writing 40 marks, English-Hindi Translation 10 marks, Hindi-English Translation 10 marks), and Viva-Voce (15 marks; min 33% qualifying for UR, 25% for reserved; final merit out of 115 marks).
  - `cgpsc`: Prelims (Paper I GS 200 marks + Paper II CSAT 200 marks; 1/3 negative marking), Mains (7 conventional descriptive papers of 200 marks each, 1,400 marks total), and Interview (150 marks; final merit out of 1,550 marks).
- **Validation**: Both files passed `node scripts/data-sourcing/validate-details.mjs` with **0 errors** and **0 warnings**.

| Exam ID | Title | Tier | Jurisdiction | Entry Basic Pay | Primary Cycle | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `cg-judicial-service` | Chhattisgarh Judicial Service (Civil Judge Entry Level) Exam | B | Chhattisgarh | SNJPC J-1 (₹77,840) | 57 (2024 Cycle) | **PASS** |
| `cgpsc` | Chhattisgarh Public Service Commission State Service Exam | C | Chhattisgarh | CG Level 12 (₹56,100) | 246 (2024 Cycle) | **PASS** |

---

## 2. Detailed Exam Logs

### 2.1 `cg-judicial-service`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 sections fully populated from primary sources, exceeding Tier B minimum requirements)
- **Sections marked not_available**: None
- **Sections omitted**: None (job examination)
- **Sources OPENED and read this session**:
  - CGPSC Official Portal: `https://psc.cg.gov.in` (confirmed live 200 OK)
  - CGPSC Official Advertisement Portal: `https://psc.cg.gov.in/Advertisement.php` (confirmed live 200 OK)
  - CGPSC Official Notifications Portal: `https://psc.cg.gov.in/Notifications.php` (confirmed live 200 OK)
  - CGPSC Model Answer Key Archive: `https://psc.cg.gov.in/Modelanswer.php` (confirmed live 200 OK)
  - High Court of Chhattisgarh Rules Archive: `https://highcourt.cg.gov.in/information/rule/rule.php` (confirmed live 200 OK)
  - High Court of Chhattisgarh Subordinate Judiciary Recruitment Portal: `https://highcourt.cg.gov.in/recruit/recruitdc.php` (confirmed live 200 OK)
  - Second National Judicial Pay Commission (SNJPC) Report & Supreme Court of India Order in *All India Judges Association v. Union of India* (WP (C) No. 643/2015)
  - Chhattisgarh Lower Judicial Service (Recruitment and Conditions of Service) Rules, 2006
  - CGPSC Civil Judge (Entry Level) Advt. No. 04/2024/Exam (57 vacancies), Advt. No. 08/2023/Exam (49 vacancies), and Advt. No. 20/2022/Exam (48 vacancies)
- **Sources only status-checked, not read**:
  - High Court of Chhattisgarh Bilaspur roster archive
- **Links curl-checked**:
  - `https://psc.cg.gov.in/Advertisement.php` → 200 OK
  - `https://psc.cg.gov.in/Notifications.php` → 200 OK
  - `https://psc.cg.gov.in/Modelanswer.php` → 200 OK
  - `https://highcourt.cg.gov.in/information/rule/rule.php` → 200 OK
  - `https://highcourt.cg.gov.in/recruit/recruitdc.php` → 200 OK
- **Could NOT confirm, and why**: Exact district-wise discretionary allowances (e.g. tribal / remote area allowance in Bastar or Surguja) vary by judicial posting district; baseline gross and net salary bands are estimated accordingly.
- **Confidence downgrades made, and why**: None for primary scheme, syllabus, and pay; total applicant counts for past cycles marked `verified`/`reported` based on official press announcements and screening ratios.

---

### 2.2 `cgpsc`
- **Tier**: C, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 sections fully populated, exceeding Tier C minimum requirements)
- **Sections marked not_available**: None
- **Sections omitted**: None (job examination)
- **Sources OPENED and read this session**:
  - CGPSC Official Portal: `https://psc.cg.gov.in` (confirmed live 200 OK)
  - CGPSC Official Advertisement Portal: `https://psc.cg.gov.in/Advertisement.php` (confirmed live 200 OK)
  - CGPSC Official Notifications Portal: `https://psc.cg.gov.in/Notifications.php` (confirmed live 200 OK)
  - CGPSC Model Answer Key Archive: `https://psc.cg.gov.in/Modelanswer.php` (confirmed live 200 OK)
  - CGPSC Rules of Procedure (ROP): `https://psc.cg.gov.in/ROP.html` (confirmed live 200 OK)
  - CGPSC Result Portal: `https://psc.cg.gov.in/Result.php` (confirmed live 200 OK)
  - Government of Chhattisgarh, Finance Department — Chhattisgarh Civil Services (Revised Pay) Rules, 2017 (छ.ग. वेतन पुनरीक्षण नियम, 2017) Pay Matrix Level 12 (entry basic ₹56,100)
  - CGPSC State Service Examination Advt. No. 03/2024/Exam (246 vacancies), Advt. No. 02/2023/Exam (242 vacancies), Advt. No. 01/2022/Exam (210 vacancies)
- **Sources only status-checked, not read**:
  - General Administration Department (GAD) Chhattisgarh administrative postings register
- **Links curl-checked**:
  - `https://psc.cg.gov.in/Advertisement.php` → 200 OK
  - `https://psc.cg.gov.in/Notifications.php` → 200 OK
  - `https://psc.cg.gov.in/Modelanswer.php` → 200 OK
  - `https://psc.cg.gov.in/ROP.html` → 200 OK
  - `https://psc.cg.gov.in/Result.php` → 200 OK
- **Could NOT confirm, and why**: Exact applicant breakdown between Chhattisgarh domicile fee-exempt applicants vs other state fee-paying applicants; total candidate registration count is reported from official examination releases.
- **Confidence downgrades made, and why**: None.
