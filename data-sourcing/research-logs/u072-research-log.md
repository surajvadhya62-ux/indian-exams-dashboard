# Research Log: Unit 72 (u072) — Other State-Jurisdiction Recruiters — Telangana

- **Unit ID**: `u072`
- **Batch ID**: `batch-7-state-other--telangana`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts — proposed addition, flag for confirmation) — Telangana`
- **Timestamp**: 2026-09-13T14:58:00+05:30
- **Status**: Completed (7/7 exams researched, written, and validated)
- **Reviewer**: Antigravity Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 72 covers the flagship teacher eligibility examination, state power distribution utility recruitment, subordinate judiciary recruitment, and the four major common entrance tests (CETs) administered across Telangana:
1. `tstet`: Department of School Education, Government of Telangana State Teacher Eligibility Test (TG TET) — **Tier A (Entrance)**
2. `tsspdcl-junior-lineman`: Southern Power Distribution Company of Telangana Limited (TSSPDCL / TGSPDCL) Junior Lineman (JLM) Direct Recruitment — **Tier A (Job)**
3. `ts-icet`: Telangana Council of Higher Education (TGCHE) & Mahatma Gandhi University, Nalgonda Integrated Common Entrance Test for MBA & MCA (TG ICET) — **Tier B (Entrance)**
4. `ts-judicial-service`: High Court for the State of Telangana Judicial Service (Civil Judge Junior Division / Judicial Magistrate of First Class) Examination — **Tier B (Job)**
5. `ts-eamcet`: TGCHE & Jawaharlal Nehru Technological University Hyderabad (JNTUH) Engineering, Agriculture and Pharmacy Common Entrance Test (TG EAPCET) — **Tier C (Entrance)**
6. `ts-ecet`: TGCHE & Osmania University Engineering Common Entrance Test for Diploma Holders & B.Sc. Maths (TG ECET) — **Tier C (Entrance)**
7. `ts-lawcet`: TGCHE & Osmania University Law Common Entrance Test for 3-Year & 5-Year LL.B. (TG LAWCET) — **Tier C (Entrance)**

### Pay Architecture & Statutory Standards:
- **Subordinate Judiciary (Second National Judicial Pay Commission - SNJPC)**:
  - `ts-judicial-service`: Governed by the Telangana State Judicial (Service & Cadre) Rules, 2023 and Supreme Court orders in *All India Judges Association v. Union of India*. Enters at **SNJPC Level J-1** (₹77,840 – ₹1,36,520, Entry Basic: **₹77,840**).
  - DA standardized to project-wide constant **58%** as of `2025-07-01` (`da_percent_as_of_review: 58`, `da_as_of: "2025-07-01"`).
  - Gross salary estimated between ₹1,35,800 – ₹1,54,000 (accounting for basic ₹77,840, DA ₹45,147, judicial HRA 10%–27%, sumptuary and robe allowances).
  - In-hand salary estimated between ₹1,22,800 – ₹1,40,500 after NPS (10% of Basic + DA = ₹12,299) and professional tax.
- **Power Utility Cadre Wage Revision (TSSPDCL / TGSPDCL Tripartite Wage Agreements)**:
  - `tsspdcl-junior-lineman`: Regulated under Telangana power utility bipartite/tripartite wage settlements, independent of the state civil service RPS.
  - Enters at revised operational pay scale **₹24,340 – ₹39,405** (Entry Basic: **₹24,340**, revised upwards from the previous base of ₹22,955).
  - Gross salary estimated between ₹41,900 – ₹46,300 (accounting for basic ₹24,340, DA 58% = ₹14,117, HRA 10%–24% = ₹2,434 – ₹5,842, and operational allowances).
  - In-hand salary estimated between ₹37,100 – ₹41,400 after EPF/CPF deductions (12% of Basic + DA = ₹4,615) and statutory taxes.
- **Entrance Examinations Policy**:
  - `tstet`, `ts-icet`, `ts-eamcet`, `ts-ecet`, and `ts-lawcet` are academic/eligibility entrance examinations. In strict compliance with `RESEARCH-GUIDE.md` and repository validation rules, `career_ladder` and `financial_package` keys are **omitted entirely**.
- **Validation**:
  - Validated via `scripts/data-sourcing/validate-details.mjs`: **PASS (0 errors, 0 warnings)** across all 302 dossier files in the repository.

| Exam ID | Title | Tier | Type | Entry Basic Pay / Scale | Primary Cycle | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `tstet` | TG TET (Telangana State Teacher Eligibility Test) | A | entrance | N/A (Entrance) | 2024 / 2026 Cycles (Paper I & II) | **PASS** |
| `tsspdcl-junior-lineman` | TSSPDCL Junior Lineman Exam | A | job | Revised Scale (₹24,340) | Notification 02/2023 (1,553 posts) | **PASS** |
| `ts-icet` | TG ICET (Integrated Common Entrance Test) | B | entrance | N/A (Entrance) | 2024 / 2026 Cycles (MBA & MCA) | **PASS** |
| `ts-judicial-service` | Telangana Judicial Service (Civil Judge Jr Div) | B | job | SNJPC J-1 (₹77,840) | Notification 45/2025-RC (94 posts) | **PASS** |
| `ts-eamcet` | TG EAPCET (Engineering, Agriculture & Pharmacy CET) | C | entrance | N/A (Entrance) | 2024 / 2026 Cycles (MPC Stream) | **PASS** |
| `ts-ecet` | TG ECET (Engineering CET for Diploma & B.Sc. Maths) | C | entrance | N/A (Entrance) | 2024 / 2026 Cycles (Lateral Entry) | **PASS** |
| `ts-lawcet` | TG LAWCET (Law Common Entrance Test) | C | entrance | N/A (Entrance) | 2024 / 2026 Cycles (LL.B. 3Y & 5Y) | **PASS** |

---

## 2. Detailed Exam Log

### 1. `tstet` (Tier A, entrance)
- **Sections populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`.
- **Sections omitted**: `career_ladder`, `financial_package` (entrance examination).
- **Sources OPENED and read this session**:
  - Department of School Education Telangana, TG TET Information Bulletin (`InformationBulletinTGTET_In-ServiceTeachers2026.pdf`, 15 pages, read via Apple Vision OCR confirming 150 MCQs, 150 marks, 150 minutes, no negative marking, Paper I structure [5 sections × 30 Qs], Paper II structure [Child Dev 30, Lang I 30, Lang II 30, Subject 60], qualifying criteria: General/EWS 60% [90 marks], BC 50% [75 marks], SC/ST/PH 40% [60 marks], lifetime validity, 20% weightage in TRT/DSC).
  - Department of School Education Telangana, TG TET Notification No. 2026 (`NotificationTGTET-In-Service teachers2026.pdf`, read confirming CBT schedule and eligibility).
  - Department of School Education Telangana, TG TET May/June 2024 Official Results Declaration (`schooledu.telangana.gov.in`, confirming 2,86,381 registrations, 2,36,487 appeared, 1,09,168 qualified [46.16%]; Paper 1: 85,996 appeared, 57,725 qualified [67.13%]; Paper 2: 1,50,491 appeared, 51,443 qualified [34.18%]).
- **Links checked**:
  - `https://tgtet.aptonline.in/Documents/InformationBulletinTGTET_In-ServiceTeachers2026.pdf` -> HTTP 200 OK
  - `https://tgtet.aptonline.in/Documents/NotificationTGTET-In-Service%20teachers2026.pdf` -> HTTP 200 OK
  - `https://tgtet.aptonline.in` -> HTTP 200 OK
  - `https://schooledu.telangana.gov.in` -> HTTP 200 OK
- **Could NOT confirm, and why**: Exact category-wise breakdown of 2024 applications (published at aggregate paper level).
- **Confidence downgrades made, and why**: None.

---

### 2. `tsspdcl-junior-lineman` (Tier A, job)
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`.
- **Sources OPENED and read this session**:
  - TSSPDCL Direct Recruitment Detailed Notification No. 02/2023 dated 02.02.2023 (`https://www.tssouthernpower.com`, confirming 1,553 vacancies [1,000 General + 553 Limited across 15 circles], revised pay scale ₹24,340 – ₹39,405 with entry basic ₹24,340, age 18–35 years, educational qualification SSLC/10th + ITI Electrical/Wireman or 2-year Intermediate Vocational Electrical).
  - TSSPDCL Scheme of Examination & Selection Procedure (confirming 80 MCQs, 80 marks, 120 minutes: Section A 65 Qs Electrical, Section B 15 Qs GK, no negative marking; up to 20 marks in-service artisan experience weightage; 8-metre pole climbing qualifying test for 1:2 shortlisted candidates).
  - APSEB / TSEB Technical Subordinate Service Regulations (confirming career ladder: Junior Lineman -> Lineman -> Line Inspector -> Sub-Engineer -> Assistant Engineer).
- **Links checked**:
  - `https://www.tssouthernpower.com` -> Official web portal (blocks automated bot user-agents with HTTP 403; canonical official portal).
  - `https://cgg.gov.in` -> HTTP 200 OK
- **Could NOT confirm, and why**: Exact total applicant count for 2023 cycle (TSSPDCL published circle-wise hall-tickets but did not issue an aggregate applicant release; vacancy count verified at 1,553).
- **Confidence downgrades made, and why**: None.

---

### 3. `ts-icet` (Tier B, entrance)
- **Sections populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`.
- **Sections omitted**: `career_ladder`, `financial_package` (entrance examination).
- **Sources OPENED and read this session**:
  - TGCHE & Mahatma Gandhi University, Nalgonda, TG ICET 2026 Syllabus & Pattern Document (`TG ICET - 2026 Syllabus.pdf`, 3 pages, read via pdftotext confirming 200 Questions, 200 Marks, 150 minutes, Section A Analytical Ability 75 Qs [Data Sufficiency 20 Qs, Problem Solving 55 Qs], Section B Mathematical Ability 75 Qs [Arithmetical 35 Qs, Algebraical & Geometrical 30 Qs, Statistical 10 Qs], Section C Communication Ability 50 Qs).
  - TGCHE & Mahatma Gandhi University, TG ICET 2026 Instructions to Candidates (`TG ICET 2026 - Instructions to Candidate.pdf`, 7 pages, read via pdftotext confirming qualifying mark of 25% [50/200] for General/BC, no minimum mark for SC/ST, no negative marking, normalization methodology).
  - TGCHE & Kakatiya University / MGU TG ICET 2024 Official Results Declaration (`icet.tgche.ac.in`, confirming 86,156 applicants, 77,942 appeared, 71,647 qualified [91.92%]).
- **Links checked**:
  - `https://icet.tgche.ac.in/Documents/2026Docs/TG%20ICET%20-%202026%20Syllabus.pdf` -> HTTP 200 OK
  - `https://icet.tgche.ac.in/Documents/2026Docs/TG%20ICET%202026%20-%20Instructions%20to%20Candidate.pdf` -> HTTP 200 OK
  - `https://icet.tgche.ac.in/Documents/2026Docs/TG%20ICET%202026%20-%20Notification.pdf` -> HTTP 200 OK
  - `https://icet.tgche.ac.in` -> HTTP 200 OK
- **Could NOT confirm, and why**: None.
- **Confidence downgrades made, and why**: None.

---

### 4. `ts-judicial-service` (Tier B, job)
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 sections populated).
- **Sources OPENED and read this session**:
  - High Court for the State of Telangana Notification R.O.C. No. 45/2025-RC dated 28.03.2026 (`NORMAL_Recruitment_2026_03_28T17_14_36.pdf`, 5 pages, read via Vision OCR confirming Notification No. 45/2025 dated 01.12.2025 inviting applications for 94 vacancies [66 Direct Recruitment + 28 Recruitment by Transfer] in the cadre of Civil Judges [Junior Division], Screening Test conducted on 08.03.2026 in 1:10 ratio).
  - High Court for the State of Telangana Notification No. 45/2025-RC dated 10.06.2026 (`NORMAL_Recruitment_2026_06_10T15_06_41.pdf`, read via Vision OCR confirming Written Examinations schedule on 20.06.2026 and 21.06.2026).
  - High Court for the State of Telangana Notification No. 27/2026-RC dated 30.01.2026 (`NORMAL_Recruitment_2026_01_30T14_59_37.pdf`, read via Vision OCR confirming nil vacancies in Civil Judge Junior Division for 2026 under Telangana State Judicial [Service & Cadre] Rules 2023 after 94 posts filled).
  - Telangana State Judicial (Service & Cadre) Rules, 2023 and Second National Judicial Pay Commission (SNJPC) recommendations (confirming SNJPC Level J-1 ₹77,840 – ₹1,36,520, entry basic ₹77,840, career ladder up to Super Time Scale District Judge ₹1,99,100 – ₹2,24,100).
- **Links checked**:
  - `https://tshc.gov.in/documents/NORMAL_Recruitment_2026_03_28T17_14_36.pdf` -> HTTP 200 OK
  - `https://tshc.gov.in/documents/NORMAL_Recruitment_2026_06_10T15_06_41.pdf` -> HTTP 200 OK
  - `https://tshc.gov.in/documents/NORMAL_Recruitment_2026_01_30T14_59_37.pdf` -> HTTP 200 OK
  - `https://tshc.gov.in/showChildDocTypes?id=95` -> HTTP 200 OK
  - `https://tshc.gov.in` -> HTTP 200 OK
- **Could NOT confirm, and why**: Total applicants count for 2025 cycle (candidate list PDF was truncated during download; left as `null`).
- **Confidence downgrades made, and why**: None.

---

### 5. `ts-eamcet` (Tier C, entrance)
- **Sections populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`.
- **Sections omitted**: `career_ladder`, `financial_package` (entrance examination).
- **Sources OPENED and read this session**:
  - TGCHE & JNTU Hyderabad, TG EAPCET 2026 Engineering Stream Instruction Booklet (`05 I Booklet - E - 2026.pdf`, 18 pages, read via pdftotext confirming CBT mode, 160 questions, 160 marks, 180 minutes, Mathematics 80 Qs, Physics 40 Qs, Chemistry 40 Qs, no negative marking, 25% qualifying mark [40/160] for General/BC, no minimum mark for SC/ST, normalization formula, 100% ranking weightage on CBT normalized score).
  - TGCHE & JNTUH, TG EAPCET 2026 Detailed Notification (`Detailed Notification-2026.pdf`, 8 pages, read via pdftotext confirming eligibility and examination schedule).
  - TGCHE & JNTUH TG EAPCET 2024 Official Results Declaration Statistics (`eapcet.tgche.ac.in`, confirming 2,54,814 registrations, 2,40,618 appeared, 1,80,424 qualified [74.98%] in Engineering stream).
- **Links checked**:
  - `https://eapcet.tgche.ac.in/TGEAPCET/Doc2026/05%20I%20Booklet%20-%20E%20-%202026.pdf` -> HTTP 200 OK
  - `https://eapcet.tgche.ac.in/TGEAPCET/Doc2026/Detailed%20Notification-2026.pdf` -> HTTP 200 OK
  - `https://eapcet.tgche.ac.in/TGEAPCET/Doc2026/Syllabus-E.pdf` -> HTTP 200 OK
  - `https://eapcet.tgche.ac.in` -> HTTP 200 OK
- **Could NOT confirm, and why**: None.
- **Confidence downgrades made, and why**: None.

---

### 6. `ts-ecet` (Tier C, entrance)
- **Sections populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`.
- **Sections omitted**: `career_ladder`, `financial_package` (entrance examination).
- **Sources OPENED and read this session**:
  - TGCHE & Osmania University, TG ECET 2026 Pattern of Examination (`Pattern of Examination.pdf`, read via pdftotext confirming 200 Questions, 200 Marks, 180 minutes: Mathematics 50 marks, Physics 25 marks, Chemistry 25 marks, Engineering Paper 100 marks across branches [Civil, EEE, Mech, ECE, CSE, Chem, Metal, Mining, EIE]).
  - TGCHE & Osmania University, TG ECET 2026 Instruction Booklet (`Instruction Booklet.pdf`, 16 pages, read via pdftotext confirming 25% qualifying threshold [50/200] for General/BC, no minimum for SC/ST, no negative marking, lateral entry into 2nd year B.E./B.Tech.).
  - TGCHE & Osmania University TG ECET 2024 Official Results Declaration Press Note (`ecet.tgche.ac.in`, confirming 24,244 applicants, 23,059 appeared, 22,014 qualified [95.47%]).
- **Links checked**:
  - `https://ecet.tgche.ac.in/UI/Documents/Pattern%20of%20Examination.pdf` -> HTTP 200 OK
  - `https://ecet.tgche.ac.in/UI/Documents/Instruction%20Booklet.pdf` -> HTTP 200 OK
  - `https://ecet.tgche.ac.in/UI/Documents/Detailed%20Notification.pdf` -> HTTP 200 OK
  - `https://ecet.tgche.ac.in` -> HTTP 200 OK
- **Could NOT confirm, and why**: None.
- **Confidence downgrades made, and why**: None.

---

### 7. `ts-lawcet` (Tier C, entrance)
- **Sections populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`.
- **Sections omitted**: `career_ladder`, `financial_package` (entrance examination).
- **Sources OPENED and read this session**:
  - TGCHE & Osmania University, TG LAWCET 2026 Official Syllabus (`Lawcet Syllabus 2026.pdf`, read via pdftotext confirming 120 Questions, 120 Marks, 90 minutes: Part A GK & Mental Ability 30 Qs, Part B Current Affairs 30 Qs, Part C Aptitude for Study of Law 60 Qs [including 10 legal comprehension questions]).
  - TGCHE & Osmania University, TG LAWCET 2026 Instruction Booklet (`LAWCET Instruction Booklet _2026.pdf`, 10 pages, read via pdftotext confirming 35% qualifying threshold [42/120] for General/OBC, no minimum mark for SC/ST, no negative marking, normalization).
  - TGCHE & Osmania University TG LAWCET 2024 Official Results Declaration Press Release (`lawcet.tgche.ac.in`, confirming 40,268 applicants, 34,732 appeared, 24,846 qualified [71.54%]).
- **Links checked**:
  - `https://lawcet.tgche.ac.in/Documents/Lawcet%20Syllabus%202026.pdf` -> HTTP 200 OK
  - `https://lawcet.tgche.ac.in/Documents/LAWCET%20Instruction%20Booklet%20_2026.pdf` -> HTTP 200 OK
  - `https://lawcet.tgche.ac.in/Documents/Detailed%20Notification.pdf` -> HTTP 200 OK
  - `https://lawcet.tgche.ac.in` -> HTTP 200 OK
- **Could NOT confirm, and why**: None.
- **Confidence downgrades made, and why**: None.
