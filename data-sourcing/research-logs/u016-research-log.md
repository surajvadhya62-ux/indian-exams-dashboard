# Research Log: Unit 16 (u016) — Major State Public Service Commissions — Assam

- **Unit ID**: `u016`
- **Batch ID**: `batch-4-state-psc--assam`
- **AI Instance ID**: `Instance-u016 (Assam State Public Service Commission Worker)`
- **Timestamp**: 2026-09-11T21:40:00+05:30
- **Status**: Completed (1/1 exams researched, written, and validated)
- **Reviewer**: Antigravity IDE Autonomous Agent

---

## 1. Summary of Unit Execution
Unit 16 covers the premier state civil services examination conducted by the Assam Public Service Commission (APSC):
1. `apsc-cce`: Assam Public Service Commission Combined Competitive Examination — **Tier A (Full)**

The dossier has been authored in strict compliance with `RESEARCH-GUIDE.md` and `EXECUTION-PLAN.md`:
- **State Pay Commission Compliance (§5.3)**: Correctly avoids the central 7th CPC civilian matrix trap. Compensation is anchored directly in the **Assam Services (Revision of Pay) Rules, 2017** (Assam ROP Rules 2017) and Clause 3 of APSC Advt. No. 12/2025: Pay Band 4 (PB-4: ₹30,000 – ₹1,10,000) with Grade Pay of ₹13,300, establishing an entry basic pay of ₹43,300 for Assam Civil Service (Junior Grade) and Assam Police Service (Junior Grade).
- **Exam Scheme & Abolition of Optional Papers**: Accurately captures the revised pattern established by the Assam Public Services Combined Competitive Examination (Amendment) Rules, 2019 through 2023:
  - Preliminary Examination (400 marks across GS-I and qualifying GS-II CSAT at 33% threshold; 30%-35% compulsory Assam-specific questions in GS-I; negative marking of 0.25 of marks assigned per question).
  - Main Examination (6 conventional written descriptive papers of 250 marks each = 1,500 marks; optional subjects eliminated and replaced by Assam-focused General Subject Paper / GS-V).
  - Interview / Personality Test (180 marks with no qualifying minimum).
  - Final Ranking Aggregate: 1,680 marks.
- **Link Liveness**: All 6 official URLs independently tested and verified returning HTTP 200 OK.
- **Validation**: Passed `node scripts/data-sourcing/validate-details.mjs` with **0 errors** and **0 warnings**.

| Exam ID | Title | Tier | Jurisdiction | Entry Basic Pay | Primary Cycle | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `apsc-cce` | Assam Public Service Commission Combined Competitive Examination | A | Assam | Assam PB-4 + GP ₹13,300 (₹43,300) | CCE 2024 (262 posts) / CCE 2023 (235 posts) | **PASS** |

---

## 2. Detailed Exam Log

### 2.1 `apsc-cce`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections marked not_available**: None (all 5 required sections fully enriched from official primary sources)
- **Sections omitted**: None (job examination)
- **Sources OPENED and read this session**:
  - APSC Official Website: `https://apsc.nic.in` (confirmed live 200 OK)
  - APSC Dedicated CCE Examination Hub: `https://apsc.nic.in/cce.html` (read full scheme, stage marks, and syllabus structure; 200 OK)
  - APSC CCE 2024 Advertisement (Advt. No. 12/2025 dtd 23-03-2025): `https://apsc.nic.in/advt_2025/cce_2024_12_2025.pdf` (downloaded and read via Apple Vision OCR across pages 1–8: verified 262 vacancies across 16 cadres, pay scale PB-4 ₹30,000–₹1,10,000 with GP ₹13,300, negative marking rules, prelims syllabus, and 6 mains papers)
  - APSC CCE 2023 Advertisement (Advt. No. 02/2024 dtd 12-01-2024): `https://apsc.nic.in/advt_2024/Advt_No_02_2024_CCE-2023_12012024.pdf` (confirmed 235 vacancies; 200 OK)
  - Assam Public Services Combined Competitive Examination Consolidated Amendment Rules: `https://apsc.nic.in/misc_2025/CCE_Amendment_Rules_ALL.pdf` (downloaded and read via pdftotext: verified 2020 and 2022 amendments, substitution of Schedule I/II cadres, elimination of optional subjects, introduction of Assam GS paper, and interview weightage)
  - APSC Online Application Portal: `https://apscrecruitment.in` (confirmed live 200 OK)
  - Assam Services (Revision of Pay) Rules, 2017 (Finance Department, Government of Assam): verified PB-4 running pay band and grade pay structure
  - APSC Official Preliminary Result Notification for CCE 2023 (dated 9 May 2024): confirmed 67,251 registered applicants, 50,750 appeared, and 2,898 shortlisted for Mains
  - APSC CCE 2022 Final Result Notification (dated 17 January 2024): confirmed 913 final recommendations from 10,148 Prelims qualified candidates and 2,736 interviewees
- **Sources only status-checked, not read**:
  - Personnel (A) Department, Government of Assam administrative circulars on ACS/APS cadre reviews
- **Links curl-checked**:
  - `https://apsc.nic.in` → 200 OK
  - `https://apsc.nic.in/cce.html` → 200 OK
  - `https://apscrecruitment.in` → 200 OK
  - `https://apsc.nic.in/advt_2025/cce_2024_12_2025.pdf` → 200 OK
  - `https://apsc.nic.in/advt_2024/Advt_No_02_2024_CCE-2023_12012024.pdf` → 200 OK
  - `https://apsc.nic.in/misc_2025/CCE_Amendment_Rules_ALL.pdf` → 200 OK
- **Could NOT confirm, and why**: Exact city-wise variable allowances across non-capital Assam sub-divisions (HRA ranges between 7% and 10% depending on municipal grade); captured within conservative estimated salary bands.
- **Confidence downgrades made, and why**: Career progression steps beyond Junior Grade marked `reported` because seniority-cum-merit promotion timelines and induction into the IAS depend on State DPC review and central DoPT vacancy allocations.
