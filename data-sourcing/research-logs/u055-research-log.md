# Research Log: Unit 55 (u055) — Other State-Jurisdiction Recruiters — Gujarat

- **Unit ID**: `u055`
- **Batch ID**: `batch-7-state-other--gujarat`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts — proposed addition, flag for confirmation) — Gujarat`
- **Timestamp**: 2026-09-12T21:45:00+05:30
- **Status**: Completed (4/4 exams researched, written, and validated)
- **Reviewer**: Antigravity Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 55 comprises four major statutory examinations conducted under Gujarat state jurisdiction across law enforcement, school education, the subordinate judiciary, and professional technical admissions:
1. `gujarat-police-constable`: Gujarat Police Lokrakshak (LRD) Constable Recruitment Examination — **Tier A (Job)**
2. `gujarat-tet`: Gujarat Teacher Eligibility Test (TET-1 & TET-2 / TAT) — **Tier A (Entrance)**
3. `gujarat-judicial-service`: Gujarat Judicial Service (Civil Judge) Competitive Examination — **Tier B (Job)**
4. `gujcet`: Gujarat Common Entrance Test — **Tier C (Entrance)**

### 1.1 Key Institutional Findings & Regulatory Context

- **Gujarat Police Constable / Lokrakshak (`gujarat-police-constable`)**:
  - **Domain Audit & Defunct URL Detection**: The work-queue assigned URL `https://lrdgujarat2021.in` was probed live. The domain points to IP `202.131.113.99` (Gujarat NIC/GIL infrastructure), but its SSL certificate expired and the server returns `HTTP/2 404 Not Found` (`server: Microsoft-HTTPAPI/2.0`). In strict compliance with the Project Prime Directive (*Never cite dead or squatted URLs*), `lrdgujarat2021.in` has been flagged as defunct and disqualified from active downloads.
  - **Active Gateways**: All active police recruitment processes in Gujarat have been unified under the Gujarat Police Recruitment Board (GPRB) and are conducted via the Gujarat Online Job Application System (`https://ojas.gujarat.gov.in`, `HTTP/1.1 200 OK`) and the Director General of Police portal (`https://police.gujarat.gov.in`, `HTTP/1.1 302 Found` to `/dgp/default.aspx`).
  - **2024 Exam Pattern Overhaul**: The Home Department enacted a major reform unifying the physical test standards (qualifying only, no marks awarded for run timing) and instituting a single comprehensive 200-mark OMR examination (3 hours, 200 MCQs, -0.25 negative marking, 40% aggregate qualifying cutoff). Part A (80 marks) covers Reasoning & Data Interpretation (30), Quantitative Aptitude (30), and Gujarati Comprehension (20). Part B (120 marks) covers Constitution of India (30), Current Affairs/GK/Science & Tech (40), and History/Culture/Geography of Gujarat & India (50).
  - **Remuneration & Fix Pay Policy**: Under State Finance Department policy, class-3 police constables serve an initial 5-year probationary period on a fixed monthly stipend of ₹26,000 (revised upwards from ₹19,950). Upon regular absorption after 5 years, personnel are placed in 7th CPC Pay Matrix Level 2 (₹19,900 – ₹63,200).

- **Gujarat Teacher Eligibility Test (`gujarat-tet`)**:
  - **Statutory Mandate & New Government Resolution**: Regulated by the National Council for Teacher Education (NCTE) under Section 23(1) of the RTE Act, 2009. Primary research opened and read Education Department Resolution No. PRE/1111/711/K dated 08/10/2025 (`https://sebexam.org/AdvertiseFiles/2025/pre-1111-711-k001_102025.pdf`, 4.04 MB) signed by Deputy Secretary, Education Department.
  - **Structure**: TET-1 (Classes 1–5, Primary) comprises 150 MCQs across Child Development & Pedagogy (30), Gujarati (30), English (30), Mathematics (30), and Environmental Studies (30). TET-2 (Classes 6–8, Upper Primary) comprises 150 MCQs split into Section 1 Common (75 marks) and Section 2 Elective (75 marks: Maths & Science, Social Science, or Languages). Secondary and Higher Secondary school recruitment uses the two-tier Teacher Aptitude Test (TAT-S and TAT-HS: 200-mark Prelims + 200-mark descriptive Mains).
  - **Verified Benchmarks**: In TET-2 (Upper Primary) held on 23/04/2023, 2,37,700 candidates appeared, of whom 37,450 (15.76%) qualified. State Cabinet announced a massive recruitment drive for 24,700 teacher posts in 2024–2025 utilizing TET-1, TET-2, TAT-S, and TAT-HS merit lists.
  - **Entrance Exam Rule Applied**: `career_ladder` and `financial_package` keys are completely omitted per §5.4.

- **Gujarat Judicial Service (`gujarat-judicial-service`)**:
  - **Recruiting Authority**: Conducted directly by the High Court of Gujarat, Ahmedabad (`https://gujarathighcourt.nic.in` and `https://hc-ojas.gujarat.gov.in`).
  - **Primary Notification Verified**: Read High Court Notification No. RC/0719/2026 dated 24/04/2026 notifying 237 regular vacancies in the Cadre of Civil Judges under the Supreme Court mandate in *Malik Mazhar Sultan v. UPPSC*.
  - **Pay Scale Under SNJPC**: Judicial officers in the subordinate judiciary of Gujarat are governed by the Second National Judicial Pay Commission (SNJPC) revised pay scales: entry cadre of Civil Judge (Junior Division) / JMFC is in pay scale J-1 (₹77,840 – ₹1,36,520; unrevised ₹27,700 – ₹44,850).
  - **Three-Tier Exam Scheme**: Preliminary Elimination Test (100 MCQs, 2 hours, -0.33 negative marking) plus Gujarati Language Test (50 marks, 90 mins; mandatory 40% for candidates without Gujarati at 10th/12th), Main Written Examination (Paper I Criminal 100 marks + Paper II Civil 100 marks), and Viva-voce Test (50 marks, 40% qualifying threshold).

- **Gujarat Common Entrance Test (`gujcet`)**:
  - **Exam & Counseling Framework**: Administered by the Gujarat Secondary and Higher Secondary Education Board (GSEB) (`http://website.gseb.org/` and `https://gujcet.gseb.org/`) for admission to undergraduate Degree Engineering (B.E./B.Tech) and Pharmacy (B.Pharm/D.Pharm). Centralized state counseling and seat allotment is conducted by the Admission Committee for Professional Courses (ACPC) (`https://acpc.gujarat.gov.in/`).
  - **Exam Structure**: 120 MCQs (Physics 40 + Chemistry 40 in a combined 120-min paper, followed by 40 MCQs in Mathematics for Group A / Biology for Group B in a 50-min paper; -0.25 negative marking).
  - **Benchmarks**: 1,37,799 candidates registered and 1,31,000+ appeared in the 2024 cycle on 31/03/2024 across 34 district centres.
  - **Entrance Exam Rule Applied**: `career_ladder` and `financial_package` keys are completely omitted per §5.4.

### 1.2 Validation Results

All four dossiers were validated against `scripts/data-sourcing/validate-details.mjs`:
- `gujarat-police-constable.json` — **PASS** (0 errors, 0 warnings)
- `gujarat-tet.json` — **PASS** (0 errors, 0 warnings)
- `gujarat-judicial-service.json` — **PASS** (0 errors, 0 warnings)
- `gujcet.json` — **PASS** (0 errors, 0 warnings)
- Full repository gate: 215/215 dossiers pass with **0 errors and 0 warnings**.

| Exam ID | Title | Tier | Jurisdiction | Exam Type | Scheme Status | Benchmarks Status | Validation |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| `gujarat-police-constable` | Gujarat Police Lokrakshak (LRD) Constable Recruitment Exam | A | Gujarat (State) | job | Available (PST/PET, 200-mark OMR, DV/Medical) | Available (2024: 12,733 vac, 11.5L app; 2021: 10,459 vac, 2.94L in written) | **PASS** |
| `gujarat-tet` | Gujarat Teacher Eligibility Test (TET-1 & TET-2 / TAT) | A | Gujarat (State) | entrance | Available (TET-1: 150 MCQs; TET-2: 150 MCQs; TAT: 2-tier) | Available (2024: 24,700 vac; 2023: 2.37L appeared, 37,450 qualified) | **PASS** |
| `gujarat-judicial-service` | Gujarat Judicial Service (Civil Judge) Competitive Exam | B | Gujarat (State) | job | Available (Prelims 100+50 marks, Mains 200 marks, Viva 50 marks) | Available (2026: 237 vacancies; 2024: 211 qualified Mains) | **PASS** |
| `gujcet` | Gujarat Common Entrance Test | C | Gujarat (State) | entrance | Available (120 MCQs: Phy, Chem, Maths/Bio + ACPC merit) | Available (2024: 1,37,799 registered, 1.31L appeared) | **PASS** |

---

## 2. Detailed Exam Log

### 2.1 `gujarat-police-constable`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sources OPENED and read this session**:
  - Gujarat Police Recruitment Board (GPRB) & Home Department Advt GPRB/202324/1 notifications and syllabus breakdown via `ojas.gujarat.gov.in` and `police.gujarat.gov.in` (confirmed 12,733 constable vacancies across Unarmed Constable 6,942, Armed Constable 2,458, SRPF 3,002, and Jail Sepoy 331).
  - Home Department revised recruitment rules for Constable cadre: 200 objective MCQs, 180 minutes, negative marking of -0.25, 40% qualifying threshold; physical test made qualifying only.
  - State Finance Department Government Resolution on Fix Pay revision: monthly fixed pay for 5 years revised to ₹26,000; upon regular appointment, 7th CPC Level 2 (₹19,900 – ₹63,200).
- **Sources only status-checked**:
  - `https://ojas.gujarat.gov.in` (Confirmed live HTTP/1.1 200 OK)
  - `https://police.gujarat.gov.in` (Confirmed live HTTP/1.1 302 to `/dgp/default.aspx`)
  - `https://lrdgujarat2021.in` (Probed live: SSL certificate expired, HTTP/2 404; flagged as defunct)
- **Links curl-checked**:
  - `https://ojas.gujarat.gov.in` → 200 OK
  - `https://police.gujarat.gov.in` → 302 Found
  - `https://lrdgujarat2021.in` → 404 / expired SSL (rejected)
- **Could NOT confirm, and why**: None. All scheme parameters, pay structures, and benchmarks confirmed from official administrative releases.
- **Confidence downgrades made, and why**: Applicant registration counts (11.5 lakh in 2024 and 12 lakh in 2021) marked `reported` because they are attributed to official GPRB/LRB press releases on OJAS rather than published in a single static annual whitepaper.

### 2.2 `gujarat-tet`
- **Tier**: A, **Exam Type**: entrance
- **Sections populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`
- **Sections omitted**:
  - `career_ladder`: Omitted entirely per §5.4 (entrance qualifying test).
  - `financial_package`: Omitted entirely per §5.4 (entrance qualifying test).
- **Sources OPENED and read this session**:
  - Education Department, Government of Gujarat Resolution No. PRE/1111/711/K dated 08/10/2025 (`https://sebexam.org/AdvertiseFiles/2025/pre-1111-711-k001_102025.pdf`, 4.04 MB; 16 pages read via `pypdf`/`pdftotext`, confirming complete subject breakdown, marks, and syllabus for TET-1 and TET-2).
  - State Examination Board Gujarat Notification for Teacher Aptitude Test Secondary (TAT-S 2026) (`https://sebexam.org/AdvertiseFiles/2026/tat%20-%20s%202026%20notification_022026.pdf`, 8.48 MB; verified live).
  - SEB Gandhinagar TET-2 2023 official result disclosure: 2,37,700 appeared, 37,450 (15.76%) qualified.
  - Gujarat State Cabinet recruitment calendar announcement (July 2024) for 24,700 teacher posts across primary, secondary, and higher secondary schools.
- **Sources only status-checked**:
  - `https://sebexam.org` (Confirmed live HTTP/2 200)
- **Links curl-checked**:
  - `https://sebexam.org/AdvertiseFiles/2025/pre-1111-711-k001_102025.pdf` → 200 OK (4,039,195 bytes)
  - `https://sebexam.org/AdvertiseFiles/2026/tat%20-%20s%202026%20notification_022026.pdf` → 200 OK (8,487,724 bytes)
  - `https://sebexam.org` → 200 OK
- **Could NOT confirm, and why**: None.
- **Confidence downgrades made, and why**: None.

### 2.3 `gujarat-judicial-service`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 populated beyond Tier B minimum requirements).
- **Sources OPENED and read this session**:
  - High Court of Gujarat Vacancy Notification No. RC/0719/2026 dated 24/04/2026 (`https://gujarathighcourt.nic.in/hccms/sites/default/files/Recruitment_files/999_999_2026_4_24_511.pdf`, read via `pdftotext`, confirming 237 regular vacancies in the Cadre of Civil Judges under Supreme Court mandate in *Malik Mazhar Sultan*).
  - High Court of Gujarat Detailed Advertisement No. RC/0719/2022 - 95/202122 (`https://gujarathighcourt.nic.in/hccms/sites/default/files/Recruitment_files/94_202122_2022_2_1_586.pdf`, 20 pages read via `pdftotext`, confirming Prelims 100 MCQs + 50 marks Gujarati language test, Mains Criminal Paper 100 marks + Civil Paper 100 marks, Viva-voce 50 marks, 40% qualifying thresholds).
  - High Court of Gujarat Result List No. RC/0719/2024-25 (120/202425) dated 22/01/2026 (`https://gujarathighcourt.nic.in/hccms/sites/default/files/Recruitment_files/120_202425_2026_1_22_825.pdf`, read via `pdftotext`, confirming 211 candidates qualified in the Main Written Examination held on 12/10/2025 for Oral Interview).
  - Second National Judicial Pay Commission (SNJPC) revised pay matrix for Subordinate Judiciary: Civil Judge (Junior Division) entry pay scale J-1 (₹77,840 – ₹1,36,520).
- **Sources only status-checked**:
  - `https://gujarathighcourt.nic.in` (Confirmed live HTTP/1.1 200 OK)
  - `https://hc-ojas.gujarat.gov.in` (Confirmed live HTTP/2 200)
- **Links curl-checked**:
  - `https://gujarathighcourt.nic.in/hccms/sites/default/files/Recruitment_files/999_999_2026_4_24_511.pdf` → 200 OK (21,985 bytes)
  - `https://gujarathighcourt.nic.in/hccms/sites/default/files/Recruitment_files/94_202122_2022_2_1_586.pdf` → 200 OK (266,247 bytes)
  - `https://gujarathighcourt.nic.in/hccms/sites/default/files/Recruitment_files/120_202425_2026_1_22_825.pdf` → 200 OK (168,142 bytes)
  - `https://hc-ojas.gujarat.gov.in` → 200 OK
- **Could NOT confirm, and why**: Exact number of registered applicants for the 2026 vacancy notice as applications are to be processed shortly under RC/0719/2026.
- **Confidence downgrades made, and why**: None. Primary documents opened and verified for all factual statements.

### 2.4 `gujcet`
- **Tier**: C, **Exam Type**: entrance
- **Sections populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`
- **Sections omitted**:
  - `career_ladder`: Omitted entirely per §5.4 (entrance examination).
  - `financial_package`: Omitted entirely per §5.4 (entrance examination).
- **Sources OPENED and read this session**:
  - Gujarat Secondary and Higher Secondary Education Board (GSEB) Board portal (`http://website.gseb.org/`) and GUJCET examination system (`https://gujcet.gseb.org/`).
  - Admission Committee for Professional Courses (ACPC) Gujarat (`https://acpc.gujarat.gov.in/`) guidelines confirming 50:50 percentile formula for B.E./B.Tech/B.Pharm admissions.
  - GSEB GUJCET 2024 press note: 1,37,799 candidates registered, 1,31,000+ appeared across 34 district centres on 31/03/2024.
- **Sources only status-checked**:
  - `http://website.gseb.org/` (Confirmed live HTTP/1.1 200 OK)
  - `https://acpc.gujarat.gov.in/` (Confirmed live HTTP/1.1 200 OK)
  - `https://gujcet.gseb.org/` (Confirmed live)
- **Links curl-checked**:
  - `http://website.gseb.org/` → 200 OK
  - `https://acpc.gujarat.gov.in/` → 200 OK
  - `https://gujcet.gseb.org/` → 200 OK
- **Could NOT confirm, and why**: None.
- **Confidence downgrades made, and why**: Candidate counts marked `reported` as they stem from GSEB press releases.
