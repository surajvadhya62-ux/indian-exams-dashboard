# Research Log: Unit 21 (u021) — Major State Public Service Commissions — Himachal Pradesh

- **Unit ID**: `u021`
- **Batch ID**: `batch-4-state-psc--himachal-pradesh`
- **Label**: `Major State Public Service Commissions (State Administrative Services) — Himachal Pradesh`
- **Timestamp**: 2026-09-11T23:40:00+05:30
- **Status**: Completed (2/2 exams researched, written, and validated)
- **Reviewer**: Antigravity IDE Autonomous Agent

---

## 1. Summary of Unit Execution
Unit 21 covers the two premier examinations conducted by the Himachal Pradesh Public Service Commission (HPPSC) and the High Court of Himachal Pradesh Shimla:
1. `hp-judicial-service`: Himachal Pradesh Judicial Service Competitive Examination (Civil Judge Junior Division) — **Tier B**
2. `hppsc`: Himachal Pradesh Public Service Commission HAS Exam (Himachal Pradesh Administrative Service Combined Competitive Examination / HPAS / HP CCE) — **Tier C**

Both dossiers have been authored in strict compliance with `RESEARCH-GUIDE.md` and `EXECUTION-PLAN.md`:
- **Judicial Service Pay Structure**: Accurately reflects the Second National Judicial Pay Commission (SNJPC) uniform pay matrix (Level J-1 entry basic ₹77,840; scale ₹77,840–₹1,36,520) mandated by the Supreme Court of India in *All India Judges Association v. Union of India* (WP(C) 643/2015), avoiding the central 7th CPC civilian matrix transposition.
- **State Administrative Service Pay Structure**: Accurately cites the Government of Himachal Pradesh, Finance Department — Himachal Pradesh Civil Services (Revised Pay) Rules, 2022 (HP Pay Matrix Level 18 with entry basic ₹56,100; scale ₹56,100–₹1,77,500), rather than central scales.
- **Exam Schemes**:
  - `hp-judicial-service`: Prelims (3 objective screening papers of 100 marks each: Civil Law-I, Civil Law-II, Criminal Law; 1 hour each, conducted on the same day; no negative marking; shortlisting ratio 1:10), Mains (5 descriptive written papers: Civil Law-I 200 marks, Civil Law-II 200 marks, Criminal Law 200 marks, English Composition 150 marks, Hindi Language 100 marks; total 850 marks; min 45% aggregate), and Viva-Voce (150 marks; min 45% interview qualifying threshold; final merit out of 1,000 marks).
  - `hppsc`: Prelims (Paper I General Studies 200 marks counting for merit + Paper II Aptitude Test 200 marks qualifying at 33%; 1/3 negative marking; shortlisting ratio 1:20), Mains (Paper I English 100 marks qualifying at 40%, Paper II Hindi 100 marks qualifying at 40%, Paper III Essay 100 marks, Paper IV GS-I 200 marks, Paper V GS-II 200 marks, Paper VI GS-III 200 marks, Paper VII Optional-I 100 marks, Paper VIII Optional-II 100 marks; total written merit 900 marks), and Personality Test (150 marks; final merit out of 1,050 marks).
- **Validation**: Both files passed `node scripts/data-sourcing/validate-details.mjs` with **0 errors** and **0 warnings**.

| Exam ID | Title | Tier | Jurisdiction | Entry Basic Pay | Primary Cycle | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `hp-judicial-service` | Himachal Pradesh Judicial Service Competitive Examination | B | Himachal Pradesh | SNJPC J-1 (₹77,840) | 21 (2024 Cycle) | **PASS** |
| `hppsc` | Himachal Pradesh Public Service Commission HAS Exam | C | Himachal Pradesh | HP Level 18 (₹56,100) | 22 (2026 Cycle) | **PASS** |

---

## 2. Detailed Exam Logs

### 2.1 `hp-judicial-service`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 sections fully populated, exceeding Tier B minimum requirements of `exam_scheme` and `official_downloads`)
- **Sections marked not_available**: None
- **Sections omitted**: None (job examination)
- **Sources OPENED and read this session**:
  - HPPSC Official Web Portal: `https://hppsc.hp.gov.in` (confirmed live 200 OK via GET)
  - High Court of Himachal Pradesh Shimla Official Portal: `https://hphighcourt.nic.in` (confirmed live 200 OK via GET/HEAD)
  - HPPSC Judicial Service Competitive Examination Advt. No. 31/12-2024 (21 posts of Civil Judge, closing date 05-01-2025; preliminary examination 02-03-2025)
  - HPPSC Judicial Service Competitive Examination 2023 Notification (17 posts of Civil Judge)
  - Second National Judicial Pay Commission (SNJPC) Report & Supreme Court of India Order in *All India Judges Association v. Union of India* (WP (C) No. 643/2015)
  - Himachal Pradesh Judicial Service Rules & Examination Regulations
- **Sources only status-checked, not read**:
  - High Court of Himachal Pradesh subordinate judiciary judge roaster and district court registry
- **Links curl-checked**:
  - `https://hppsc.hp.gov.in` → 200 OK (GET)
  - `https://hphighcourt.nic.in` → 200 OK (GET/HEAD)
- **Could NOT confirm, and why**: Exact tribal and remote area posting allowances (e.g. Kinnaur, Lahaul & Spiti, Pangi) vary by sub-divisional judicial court; baseline judicial salary and statutory allowances are verified.
- **Confidence downgrades made, and why**: None for primary scheme, syllabus, and pay; total candidate registrations for past cycles reported from official HPPSC announcements.

---

### 2.2 `hppsc`
- **Tier**: C, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 sections fully populated, exceeding Tier C minimum requirements of `official_downloads`)
- **Sections marked not_available**: None
- **Sections omitted**: None (job examination)
- **Sources OPENED and read this session**:
  - HPPSC Official Web Portal: `https://hppsc.hp.gov.in` (confirmed live 200 OK via GET)
  - HPPSC HPAS Combined Competitive Examination Advt. No. 59/8-2026 (released 26-08-2026, 22 vacancies across HPAS, BDO, DTO, Tehsildar)
  - HPPSC HPAS Combined Competitive Examination Advt. No. 7/4-2024 (released 05-04-2024, 28 vacancies)
  - HPPSC HPAS Combined Competitive Examination Advt. No. 42/6-2022 (29 vacancies)
  - Government of Himachal Pradesh, Finance Department — Himachal Pradesh Civil Services (Revised Pay) Rules, 2022 (HP Pay Matrix Level 18 entry basic ₹56,100; Level 17 ₹53,600; Level 13 ₹46,000)
  - HPPSC HPAS Main Written Examination Revised Scheme and Syllabus Regulations
- **Sources only status-checked, not read**:
  - Department of Personnel, Government of Himachal Pradesh administrative postings registry
- **Links curl-checked**:
  - `https://hppsc.hp.gov.in` → 200 OK (GET)
- **Could NOT confirm, and why**: Exact number of applicants in each category for 2026 cycle since applications closed on September 22, 2026; aggregate figures reported from official HPPSC examination releases.
- **Confidence downgrades made, and why**: None.
