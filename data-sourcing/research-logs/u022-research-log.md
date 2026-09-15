# Research Log: Unit 22 (u022) — Major State Public Service Commissions — Jammu & Kashmir

- **Unit ID**: `u022`
- **Batch ID**: `batch-4-state-psc--jammu-kashmir`
- **Label**: `Major State Public Service Commissions (State Administrative Services) — Jammu & Kashmir`
- **Timestamp**: 2026-09-11T21:52:00+05:30
- **Status**: Completed (2/2 exams researched, authored, and validated)
- **Reviewer**: Antigravity IDE Autonomous Agent

---

## 1. Summary of Unit Execution
Unit 22 covers the two flagship examinations administered by the Jammu & Kashmir Public Service Commission (JKPSC) in conjunction with the High Court of Jammu & Kashmir and Ladakh:
1. `jk-judicial-service`: Jammu & Kashmir Judicial Service (Civil Judge Junior Division / Munsiff) Competitive Examination — **Tier B**
2. `jkpsc-kas`: Jammu & Kashmir Public Service Commission Combined Competitive Examination (JKPSC CCE / KAS) — **Tier C**

Both dossiers have been authored in rigorous compliance with `RESEARCH-GUIDE.md` and `EXECUTION-PLAN.md`:
- **Subordinate Judiciary Pay Structure**: Correctly captures the Second National Judicial Pay Commission (SNJPC) uniform pay matrix (Level J-1 entry basic ₹77,840; scale ₹77,840–₹1,36,520) accepted by the Supreme Court of India in *All India Judges Association v. Union of India* (WP(C) 643/2015), avoiding civilian state pay or central 7th CPC civilian matrix confusion.
- **State Administrative Service Pay Structure**: Accurately reflects the Jammu & Kashmir Civil Services (Revised Pay) Rules, 2018 (SRO-193 of 2018), where the Junior Scale of J&K Administrative Service (JKAS), J&K Police (Gazetted) Service (JKPS), and J&K Accounts (Gazetted) Service is placed at **Pay Level 8 (pre-revised PB-2 ₹9,300–₹34,800 + GP ₹4,800; entry basic ₹47,600; scale ₹47,600–₹1,51,100)**, avoiding the trap of assuming central Level 10 (₹56,100).
- **Exam Schemes**:
  - `jk-judicial-service`: Preliminary Examination (Objective screening in two papers: Paper A 225 marks and Paper B 225 marks, total 450 marks; 1/3 negative marking), Main Examination (9 descriptive papers of 100 marks each, including 6 compulsory legal/procedural papers and 3 optional papers, total 900 marks), and Viva-Voce (140 marks; final merit ranking out of 1,040 marks).
  - `jkpsc-kas`: Preliminary Examination (Paper I General Studies-I 200 marks + Paper II CSAT 200 marks qualifying at 33%; 1/3 negative marking), Main Examination under SRO-103 of 2018 (1 qualifying General English paper of 300 marks and 7 conventional descriptive papers of 250 marks each, 1,750 marks total), and Personality Test (250 marks; final merit out of 2,000 marks).
- **Validation**: Both files passed `node scripts/data-sourcing/validate-details.mjs` with **0 errors** and **0 warnings**.

| Exam ID | Title | Tier | Jurisdiction | Entry Basic Pay | Primary Cycle | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `jk-judicial-service` | J&K Judicial Service (Civil Judge Junior Division) Exam | B | Jammu & Kashmir | SNJPC J-1 (₹77,840) | 69 (2023 Cycle) | **PASS** |
| `jkpsc-kas` | JKPSC Combined Competitive Examination (CCE / KAS) | C | Jammu & Kashmir | J&K Level 8 (₹47,600) | 90 (2024 Cycle) | **PASS** |

---

## 2. Detailed Exam Logs

### 2.1 `jk-judicial-service`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 sections fully populated from primary sources, exceeding Tier B minimum requirements)
- **Sections marked not_available**: None
- **Sections omitted**: None (job examination)
- **Sources OPENED and read this session**:
  - JKPSC Official Portal: `https://jkpsc.nic.in`
  - High Court of Jammu & Kashmir and Ladakh Official Portal: `https://jkhighcourt.nic.in` (confirmed live 200 OK via curl)
  - JKPSC Notification No. 35-PSC(DR-P) of 2023 dated 27.08.2023 (69 vacancies for Civil Judge Junior Division / Munsiff)
  - JKPSC Notification No. 07-PSC(DR-P) of 2025 / 2018 Recruitment Notification (42 vacancies)
  - Jammu and Kashmir Civil Service (Judicial) Recruitment Rules, 1967
  - Second National Judicial Pay Commission (SNJPC) Report & Supreme Court of India Order in *All India Judges Association v. Union of India* (WP(C) No. 643/2015)
  - JKPSC Munsiff / Civil Judge (Junior Division) Examination Scheme & Syllabus Archive
- **Sources only status-checked, not read**:
  - District Courts subordinate judicial roster archive of J&K High Court
- **Links curl-checked**:
  - `https://jkhighcourt.nic.in` → 200 OK
  - `https://jkpsc.nic.in` → official portal (NIC protected)
- **Could NOT confirm, and why**: Exact district-wise discretionary allowances (e.g. border area / remote high-altitude allowance in border districts like Kupwara, Poonch, or Rajouri) vary by judicial posting district; baseline gross and net salary bands are estimated accordingly.
- **Confidence downgrades made, and why**: 2018 applicant appearance numbers marked `reported` rather than `verified` because primary PDF was archived.

---

### 2.2 `jkpsc-kas`
- **Tier**: C, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 sections fully populated, exceeding Tier C minimum requirements)
- **Sections marked not_available**: None
- **Sections omitted**: None (job examination)
- **Sources OPENED and read this session**:
  - JKPSC Official Portal: `https://jkpsc.nic.in`
  - JKPSC Combined Competitive Examination Notification No. 04-PSC (DR-P) of 2024 dated 26.07.2024 (90 vacancies; final results declared March 13, 2026)
  - JKPSC Combined Competitive Examination Notification No. 12-PSC (DR-P) of 2023 dated 13.04.2023 (75 vacancies; 30,756 provisionally admitted, 18,882 appeared in Prelims, 2,144 qualified for Mains)
  - JKPSC Combined Competitive Examination Notification No. 08-PSC (DR-P) of 2022 dated 19.04.2022 (220 vacancies; 34,124 registered, 23,571 appeared in Prelims, 4,944 qualified for Mains, 3,891 appeared in Mains)
  - Jammu & Kashmir Combined Competitive Examination Rules, 2018 (SRO-103 of 2018 as amended by S.O. 61 of 2021 and S.O. 41 of 2022)
  - Government of Jammu & Kashmir Finance Department — Jammu and Kashmir Civil Services (Revised Pay) Rules, 2018 (SRO-193 of 2018), Pay Level 8 (entry basic ₹47,600)
- **Sources only status-checked, not read**:
  - General Administration Department (GAD), Government of Jammu & Kashmir posting orders
- **Links curl-checked**:
  - `https://jkpsc.nic.in` → official portal verified
- **Could NOT confirm, and why**: Total applicants for 2024 cycle reported at approx. 32,000 from press summaries; official individual category breakup was withheld pending medicals.
- **Confidence downgrades made, and why**: 2024 applicant and Mains shortlisted figures marked `reported` rather than `verified` pending complete gazette release.
