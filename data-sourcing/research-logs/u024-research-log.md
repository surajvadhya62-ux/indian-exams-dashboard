# Research Log: Unit 24 (u024) — Major State Public Service Commissions — Karnataka

- **Unit ID**: `u024`
- **Batch ID**: `batch-4-state-psc--karnataka`
- **Label**: `Major State Public Service Commissions (State Administrative Services) — Karnataka`
- **Timestamp**: 2026-09-11T23:30:00+05:30
- **Status**: Completed (3/3 exams researched, written, and validated)
- **Reviewer**: Antigravity IDE Autonomous Agent

---

## 1. Summary of Unit Execution
Unit 24 covers the three premier examinations administered by the Karnataka Public Service Commission (KPSC):
1. `kpsc-fda`: KPSC First Division Assistant (FDA) Recruitment Examination — **Tier A**
2. `kpsc-sda`: KPSC Second Division Assistant (SDA) Recruitment Examination — **Tier B**
3. `kpsc`: Karnataka Public Service Commission KAS (Gazetted Probationers) — **Tier C**

All three dossiers have been authored in strict compliance with `RESEARCH-GUIDE.md` and `EXECUTION-PLAN.md`:
- **State Pay Matrix (Avoided Central 7th CPC civilian trap)**: Accurately reflected the Karnataka Civil Services (Revised Pay) Rules under the Karnataka State Pay Commission:
  - FDA (Group C Degree Level): Pay Scale ₹27,650 - ₹52,650 (Entry Basic ₹27,650; gross ₹46k–₹54k, in-hand ₹41k–₹48k).
  - SDA (Group C Below Degree Level): Pay Scale ₹21,400 - ₹42,000 (Entry Basic ₹21,400; gross ₹36k–₹42k, in-hand ₹32k–₹37.5k).
  - KAS / Gazetted Probationers (Group A Junior Scale / Assistant Commissioner): Pay Scale ₹52,650 - ₹97,100 (Entry Basic ₹52,650; gross ₹88k–₹108k, in-hand ₹76k–₹92k).
  - Maintained project constant DA at 58% effective 2025-07-01 across all three packages.
- **KPSC Examination Schemes**:
  - FDA & SDA: 3-paper scheme including Paper 1 Compulsory Kannada (150 marks, 90 minutes, qualifying 35% minimum 50 marks, with SSLC exemption), Paper 2 General English/Kannada (100 marks, -0.25 negative marking), and Paper 3 General Knowledge (100 marks, -0.25 negative marking).
  - KAS / Gazetted Probationers: 3-stage structure including Preliminary Examination (2 objective papers of 200 marks each, 400 marks total, -0.25 negative marking), Main Examination (2 qualifying language papers + 5 compulsory descriptive papers of 250 marks each totaling 1250 marks), and Personality Test (Interview revised to 50 marks under 2020/2022 amendment rules to eliminate scoring skew).
- **Benchmark & Vacancy Statistics**:
  - KAS: 319 Group A & B vacancies verified from primary Notification No. PSC 01 RTB-1/2026-27 dated 31-07-2026 (application window extended to 07-09-2026); historical 2024 cycle with 384 posts (Mains corrigendum dated 13-02-2025); 2018 cycle with 106 posts.
  - FDA: 1,114 vacancies in 2020-21 cycle (3.25 lakh applicants appeared); 507 vacancies in 2017-19 cycle.
  - SDA: 1,279 vacancies in 2020-21 cycle (4.53 lakh applicants appeared); 1,058 vacancies in 2017-18 cycle.
- **Validation**: Passed `node scripts/data-sourcing/validate-details.mjs` with **0 errors** and **0 warnings**.

| Exam ID | Title | Tier | Jurisdiction | Pay Level / Entry Basic | Primary Cycle | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `kpsc-fda` | KPSC First Division Assistant (FDA) | A | Karnataka | Scale ₹27,650–₹52,650 (Basic ₹27,650) | 1,114 vacancies | **PASS** |
| `kpsc-sda` | KPSC Second Division Assistant (SDA) | B | Karnataka | Scale ₹21,400–₹42,000 (Basic ₹21,400) | 1,279 vacancies | **PASS** |
| `kpsc` | KPSC Gazetted Probationers (KAS) | C | Karnataka | Group A Scale ₹52,650–₹97,100 (Basic ₹52,650) | 319 vacancies (2026-27) | **PASS** |

---

## 2. Detailed Exam Log

### 2.1 `kpsc-fda`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 required sections fully populated)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - KPSC Official Portal: `https://kpsc.kar.nic.in` (confirmed live 200 OK)
  - KPSC Group-C Degree Level Syllabus & Examination Scheme: `https://kpsc.kar.nic.in/Syllabus%20Group-C%20Degree%20Level%20Posts%20KCSR%202021.pdf` (confirmed live 200 OK; read directly via pdftotext; confirmed Paper 1 Compulsory Kannada 150 marks, Paper 2 & 3 100 marks each, 0.25 negative marking)
  - KPSC Notification Archive Portal: `https://kpsc.kar.nic.in/notification.html` (confirmed live 200 OK)
  - KPSC Syllabus Hub: `https://kpsc.kar.nic.in/syllabus.html` (confirmed live 200 OK)
  - KPSC Key Answers Archive: `https://kpsc.kar.nic.in/keyanswers.html` (confirmed live 200 OK)
  - Karnataka Civil Services (Revised Pay) Rules, Finance Department, Government of Karnataka (Group C Degree Level Scale ₹27,650–₹52,650)
- **Sources only status-checked, not read**:
  - DPAR Karnataka Secretariat Service Cadre & Recruitment Rules
- **Links curl-checked**:
  - `https://kpsc.kar.nic.in/Syllabus%20Group-C%20Degree%20Level%20Posts%20KCSR%202021.pdf` -> 200 OK
  - `https://kpsc.kar.nic.in/notification.html` -> 200 OK
  - `https://kpsc.kar.nic.in/syllabus.html` -> 200 OK
  - `https://kpsc.kar.nic.in/keyanswers.html` -> 200 OK
- **Could NOT confirm, and why**: Exact departmental vacancy split between Vidhana Soudha Karnataka Government Secretariat vs district subordinate directorates for subsequent cycles; aggregated total state vacancy numbers cited from primary recruitment orders.
- **Confidence downgrades made, and why**: Promotion ladder steps above FDA marked `reported` because promotions depend on seniority quotas and departmental exam clearances.

### 2.2 `kpsc-sda`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 sections populated, exceeding Tier B minimum requirements of exam_scheme + official_downloads)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - KPSC Official Portal: `https://kpsc.kar.nic.in` (confirmed live 200 OK)
  - KPSC Below Degree Level Syllabus & Examination Scheme: `https://kpsc.kar.nic.in/Syllabus%20Group-C%20Below%20Degree%20level%20Posts%20KCSR%202021.pdf` (confirmed live 200 OK; read directly; confirmed Paper 1 Compulsory Kannada 150 marks, Paper 2 & 3 100 marks each, 0.25 negative marking)
  - KPSC Notification Archive: `https://kpsc.kar.nic.in/notification.html` (confirmed live 200 OK)
  - KPSC Key Answers Archive: `https://kpsc.kar.nic.in/keyanswers.html` (confirmed live 200 OK)
  - Karnataka Civil Services (Revised Pay) Rules (Group C Below Degree Level Scale ₹21,400–₹42,000)
- **Sources only status-checked, not read**:
  - Karnataka Ministerial Service Rules for promotion quota
- **Links curl-checked**:
  - `https://kpsc.kar.nic.in/Syllabus%20Group-C%20Below%20Degree%20level%20Posts%20KCSR%202021.pdf` -> 200 OK
  - `https://kpsc.kar.nic.in/notification.html` -> 200 OK
  - `https://kpsc.kar.nic.in/syllabus.html` -> 200 OK
  - `https://kpsc.kar.nic.in/keyanswers.html` -> 200 OK
- **Could NOT confirm, and why**: Domicile fee waiver statistics for SC/ST/Cat-I applicants; gross registration numbers cited.
- **Confidence downgrades made, and why**: None.

### 2.3 `kpsc`
- **Tier**: C, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 sections fully populated, exceeding Tier C minimum requirements of official_downloads)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - KPSC Official Portal: `https://kpsc.kar.nic.in` (confirmed live 200 OK)
  - KPSC Gazetted Probationers 2026-27 Notification: `https://kpsc.kar.nic.in/GP%202026-27%20Final%20Notification%20with%20PH%20Schedules%20HOSTED%20ON%2031-07-2026.pdf` (confirmed live 200 OK; 9,042,011 bytes; read via pdftotext; confirmed 319 Group A & B posts, Assistant Commissioner pay scale ₹52,650–₹97,100, application deadline)
  - KPSC Gazetted Probationers Corrigendum: `https://kpsc.kar.nic.in/corrigendum%20notification%20GP-2026.pdf` (confirmed live 200 OK; confirmed application extension till 07-09-2026)
  - KPSC Gazetted Probationers Examination Scheme & Syllabus: `https://kpsc.kar.nic.in/syll_GP.pdf` (confirmed live 200 OK; 7,671,056 bytes; confirmed Paper 1 & 2 Prelims structure, 200 marks each, 0.25 negative marking)
  - KPSC Main Exam Rules & Syllabus: `https://kpsc.kar.nic.in/GP%20RULES%2024-11-2014.pdf` (confirmed live 200 OK; confirmed 2 qualifying papers + 5 compulsory merit papers of 250 marks each = 1250 marks)
  - KPSC Personality Test Amendment Rules: `https://kpsc.kar.nic.in/GPRULES%204-6-2020.pdf` (confirmed live 200 OK; confirmed interview marks revised from 200 to 50)
  - KPSC GP 2023-24 Mains Corrigendum: `https://kpsc.kar.nic.in/2023-24%20GP%20Mains%20corrigendum%20notification.pdf` (confirmed live 200 OK; confirmed 384 posts)
  - KPSC Rules & Archive Portal: `https://kpsc.kar.nic.in/KAS1.html` (confirmed live 200 OK)
- **Sources only status-checked, not read**:
  - IAS (Appointment by Promotion) Regulations for Karnataka Cadre
- **Links curl-checked**:
  - `https://kpsc.kar.nic.in/GP%202026-27%20Final%20Notification%20with%20PH%20Schedules%20HOSTED%20ON%2031-07-2026.pdf` -> 200 OK
  - `https://kpsc.kar.nic.in/corrigendum%20notification%20GP-2026.pdf` -> 200 OK
  - `https://kpsc.kar.nic.in/syll_GP.pdf` -> 200 OK
  - `https://kpsc.kar.nic.in/GP%20RULES%2024-11-2014.pdf` -> 200 OK
  - `https://kpsc.kar.nic.in/GPRULES%204-6-2020.pdf` -> 200 OK
  - `https://kpsc.kar.nic.in/2023-24%20GP%20Mains%20corrigendum%20notification.pdf` -> 200 OK
  - `https://kpsc.kar.nic.in/KAS1.html` -> 200 OK
- **Could NOT confirm, and why**: Exact caste/category cut-off marks for recent 2024 Prelims (exam pending / under legal scrutiny); prior cycle benchmarks cited.
- **Confidence downgrades made, and why**: Career ladder steps beyond Selection Grade KAS (IAS induction, Principal Secretary) marked `reported` as they depend on central DoPT vacancy releases and state recommendation committees.
