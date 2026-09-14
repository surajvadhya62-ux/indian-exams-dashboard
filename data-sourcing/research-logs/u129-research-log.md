# Research Log: Unit 129 (u129) — Premier Institutes & National Research Bodies

- **Unit ID**: `u129`
- **Batch ID**: `batch-6c-research-premier-institutes`
- **Label**: Premier institutes & national research bodies
- **Session Date**: 2026-09-14
- **Operator**: Antigravity IDE Autonomous Agent
- **Exams Processed (8)**:
  1. `jee-advanced` — Joint Entrance Examination Advanced (Assigned Tier: A)
  2. `cat` — Common Admission Test (Assigned Tier: A)
  3. `gate` — Graduate Aptitude Test in Engineering (Assigned Tier: A)
  4. `isro-scientist` — ISRO Scientist / Engineer Recruitment (Assigned Tier: A)
  5. `aiims-nursing` — AIIMS B.Sc Nursing Entrance Exam (Assigned Tier: A)
  6. `jgeebils` — Joint Graduate Entrance Examination for Biology and Interdisciplinary Life Sciences (Assigned Tier: A)
  7. `aiims-norcet` — AIIMS Nursing Officer Recruitment Common Eligibility Test (Assigned Tier: A)
  8. `nielit-scientist-b` — NIELIT Scientist 'B' & Scientific Assistant 'A' Examination (Assigned Tier: A)
- **Status**: ✅ Approved & Verified (All 8 dossiers pass `validate-details.mjs` clean)

---

## 1. Statutory Authorities & Conducting Bodies

The 8 examinations in Unit `u129` represent India's most prestigious competitive gateways across engineering, management, space research, medical sciences, biological research, and electronics/IT:

### A. Premier Autonomous & Academic Consortia (Entrance Gateways)
- **Joint Admission Board (JAB) / Indian Institutes of Technology (`jee-advanced`)**:
  - Rotating IIT (IIT Madras 2024, IIT Kanpur 2025). The premier undergraduate engineering gateway to 23 IITs for the top ~2,50,000 JEE (Main) rank-holders. Two mandatory 3-hour CBT papers covering Physics, Chemistry, and Mathematics on the same day.
  - *Schema Rule*: Entrance examination — `career_ladder` and `financial_package` strictly omitted.
- **Indian Institutes of Management (`cat`)**:
  - Rotational convener IIM (IIM Calcutta 2024, IIM Lucknow 2023). Apex national management admission test for MBA/PGP programmes across 21 IIMs and major national business schools. 120-minute CBT with strict 40-minute non-switchable sectional limits (VARC 24, DILR 20, QA 22; 66 questions, 198 marks).
  - *Schema Rule*: Entrance examination — `career_ladder` and `financial_package` strictly omitted.
- **National Coordination Board (NCB)-GATE / IITs & IISc (`gate`)**:
  - Administered by IISc and 7 zonal IITs on behalf of the Ministry of Education. 30 test papers in engineering, science, and humanities; 3-hour CBT consisting of 65 questions (15 marks General Aptitude + 85 marks Core Discipline). Valid for M.Tech/Ph.D. admissions and PSU recruitment.
  - *Schema Rule*: Entrance examination — `career_ladder` and `financial_package` strictly omitted.
- **All India Institute of Medical Sciences, New Delhi (`aiims-nursing`)**:
  - Examination Section, AIIMS New Delhi. Single-window entrance for 4-year B.Sc (Hons) Nursing across AIIMS New Delhi and all state AIIMS institutes. 120-minute CBT with 100 MCQs (Physics 30, Chemistry 30, Biology 30, GK 10; -1/3 negative marking).
  - *Schema Rule*: Entrance examination — `career_ladder` and `financial_package` strictly omitted.
- **Tata Institute of Fundamental Research / NCBS (`jgeebils`)**:
  - TIFR Nationwide Graduate School Admissions (GS) in collaboration with NCBS Bangalore and ~20 participating national biology research institutes (IISERs, ACTREC, NII, InStem, CDFD, SINP, RGCB, ILS). 3-hour CBT testing foundational and analytical reasoning in General Science/Math (30 marks), Physics (30 marks), Chemistry (30 marks), and Biology (60 marks). Qualifying candidates are invited for institutional faculty interviews.
  - *Schema Rule*: Entrance examination — `career_ladder` and `financial_package` strictly omitted.

### B. Premier Scientific & Central Health Recruitment Bodies (Job Postings)
- **Indian Space Research Organisation / Department of Space (`isro-scientist`)**:
  - ISRO Centralised Recruitment Board (ICRB). Recruits Scientist/Engineer 'SC' (Group 'A' Gazetted, Level 10 entry basic ₹56,100). Written CBT (Part A: 80 marks Discipline, Part B: 20 marks Aptitude) + Interview (100 marks, shortlisting ratio 1:5).
  - *Pay & Compensation*: 7th CPC Level 10, canonical 58% DA constant (2025-07-01), gross estimate ₹98,000–₹1,18,000, in-hand estimate ₹86,000–₹1,04,000. Entitled to Contributory Health Service Scheme (CHSS), PRIS incentive scheme, and campus housing.
- **All India Institute of Medical Sciences (`aiims-norcet`)**:
  - Nursing Officer Recruitment Common Eligibility Test conducted by AIIMS New Delhi for direct recruitment of Nursing Officers (Group 'B' Non-Gazetted, Level 7 entry basic ₹44,900) across all AIIMS institutes and central hospitals. Two-stage examination: Stage I (NORCET Prelims qualifying CBT, 100 MCQs, 5x vacancy shortlisting) and Stage II (NORCET Mains merit CBT, 100 MCQs on clinical competencies and patient management).
  - *Pay & Compensation*: 7th CPC Level 7, canonical 58% DA constant (2025-07-01), gross estimate ₹78,000–₹92,000, in-hand estimate ₹68,000–₹80,000. Entitled to ₹7,200/month Nursing Allowance and ₹21,600/year Uniform Allowance.
- **National Institute of Electronics and Information Technology (`nielit-scientist-b`)**:
  - NIELIT on behalf of Ministry of Electronics and Information Technology (MeitY) and attached organizations (NIC, STQC). Recruits Scientist 'B' (Group 'A' Gazetted, Level 10 entry basic ₹56,100). Written test (120 MCQs: 35% Generic, 65% Technical Computer Science/IT; 85% weightage) + Personal Interview (15% weightage, shortlisting 1:3).
  - *Pay & Compensation*: 7th CPC Level 10, canonical 58% DA constant (2025-07-01), gross estimate ₹98,000–₹1,18,000, in-hand estimate ₹86,000–₹1,04,000. Entitled to Flexible Complementing Scheme (FCS) time-bound scientific promotions.

---

## 2. Dossier Summaries

### 2.1 `jee-advanced`
- **Assigned Tier**: A
- **Type**: Entrance
- **Sections Populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`
- **Sections Omitted**: `career_ladder`, `financial_package` (Strict schema adherence)
- **Sources Opened/Verified**: `https://jeeadv.ac.in/` (HTTP/2 200 OK), IIT Madras 2024 Press Release, JoSAA Seat Matrix 2024.
- **Benchmarks**: 2024: 17,740 seats across 23 IITs, 1,86,584 registered, 1,80,200 appeared, 48,248 qualified. 2023: 17,385 seats, 1,80,372 appeared, 43,773 qualified.

### 2.2 `cat`
- **Assigned Tier**: A
- **Type**: Entrance
- **Sections Populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`
- **Sections Omitted**: `career_ladder`, `financial_package`
- **Sources Opened/Verified**: `https://iimcat.ac.in/` (HTTP 200 OK after 302 canonical redirect), IIM Calcutta CAT 2024 Press Release, IIM Lucknow CAT 2023 Summary.
- **Benchmarks**: 2024: ~5,500 IIM seats, ~3.29 lakh registered, ~2.93 lakh appeared. 2023: ~5,300 IIM seats, ~3.28 lakh registered, ~2.88 lakh appeared.

### 2.3 `gate`
- **Assigned Tier**: A
- **Type**: Entrance
- **Sections Populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`
- **Sections Omitted**: `career_ladder`, `financial_package`
- **Sources Opened/Verified**: `https://gate2025.iitr.ac.in/` (HTTP/1.1 200 OK), IISc GATE 2024 Result Notification, IIT Kanpur GATE 2023 Statistics.
- **Benchmarks**: 2024: 1,29,268 candidates qualified out of 6,53,292 appeared across 30 papers (~19.78% qualifying rate). 2023: ~1,00,000 qualified out of 5,17,000 appeared.

### 2.4 `isro-scientist`
- **Assigned Tier**: A
- **Type**: Job
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections Omitted**: None
- **Sources Opened/Verified**: `https://www.isro.gov.in/Careers.html` (HTTP/2 200 OK), ICRB Advt. 02(EMC):2023, Department of Space Merit Promotion Scheme.
- **Career Ladder**: Level 10 (Scientist/Engineer 'SC', ₹56,100) → Level 11 ('SD', ₹67,700) → Level 12 ('SE', ₹78,800) → Level 13 ('SF', ₹1,18,500) → Level 13A ('SG', ₹1,31,100) → Level 14 ('H' / Outstanding Scientist, ₹1,44,200) → Level 15 (Distinguished Scientist, ₹1,82,200).
- **Financial**: Level 10 basic ₹56,100, DA 58% (₹32,538), HRA 10–30% (₹5,610–₹16,830), TA ₹7,200+DA (₹11,376). Gross ₹98,000–₹1,18,000; In-hand ₹86,000–₹104,000.
- **Benchmarks**: 2023: 303 vacancies, 1,85,000 applicants, 1,515 shortlisted for interview. 2019: 327 vacancies, 1,60,000 applicants.

### 2.5 `aiims-nursing`
- **Assigned Tier**: A
- **Type**: Entrance
- **Sections Populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`
- **Sections Omitted**: `career_ladder`, `financial_package`
- **Sources Opened/Verified**: `https://www.aiimsexams.ac.in/` (HTTP/2 200 OK), AIIMS B.Sc (Hons) Nursing 2024 Prospectus and Seat Matrix.
- **Benchmarks**: 2024: 1,231 seats across 17 AIIMS institutes, ~1,20,000 applicants appeared (~1 seat per 97 candidates). 2023: 1,046 seats across 16 AIIMS, ~95,000 appeared.

### 2.6 `jgeebils`
- **Assigned Tier**: A
- **Type**: Entrance
- **Sections Populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`
- **Sections Omitted**: `career_ladder`, `financial_package`
- **Sources Opened/Verified**: `https://www.tifr.res.in/~academics/gs_admissions.php` (HTTP/1.1 200 OK), TIFR Graduate Studies Admission Bulletin, NCBS Academic Admissions.
- **Benchmarks**: 2024: ~220 fellowship positions across ~20 participating national institutes from ~24,500 test-takers (~1 in 110 selectivity). 2023: ~200 fellowships from ~22,800 candidates.

### 2.7 `aiims-norcet`
- **Assigned Tier**: A
- **Type**: Job
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections Omitted**: None
- **Sources Opened/Verified**: `https://www.aiimsexams.ac.in/` (HTTP/2 200 OK), AIIMS NORCET-6 & NORCET-7 Official Notices, AIIMS Nursing Cadre Restructuring Rules.
- **Career Ladder**: Level 7 (Nursing Officer, ₹44,900) → Level 8 (Senior Nursing Officer / Sister Gr-I, ₹47,600) → Level 10 (ANS, ₹56,100) → Level 11 (DNS, ₹67,700) → Level 12 (NS, ₹78,800) → Level 13 (Chief Nursing Officer, ₹1,18,500).
- **Financial**: Level 7 basic ₹44,900, DA 58% (₹26,042), HRA 10–30% (₹4,490–₹13,470), TA ₹3,600+DA (₹5,688), Nursing Allowance ₹7,200/mo, Uniform Allowance ₹1,800/mo. Gross ₹78,000–₹92,000; In-hand ₹68,000–₹80,000.
- **Benchmarks**: 2024: ~3,500 vacancies across AIIMS, ~1,65,000 applicants, ~18,200 shortlisted for NORCET Mains (~1 in 47 selectivity). 2023: 3,020 vacancies, ~1,52,000 applicants, ~15,500 shortlisted.

### 2.8 `nielit-scientist-b`
- **Assigned Tier**: A
- **Type**: Job
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections Omitted**: None
- **Sources Opened/Verified**: `https://www.nielit.gov.in/recruitments` (HTTP/1.1 200 OK), NIELIT Advt. NIELIT/NIC/2023/1, MeitY Flexible Complementing Scheme (FCS).
- **Career Ladder**: Level 10 (Scientist 'B', ₹56,100) → Level 11 (Scientist 'C', ₹67,700) → Level 12 (Scientist 'D', ₹78,800) → Level 13 (Scientist 'E', ₹1,18,500) → Level 13A (Scientist 'F', ₹1,31,100) → Level 14 (Scientist 'G' / Senior Director, ₹1,44,200).
- **Financial**: Level 10 basic ₹56,100, DA 58% (₹32,538), HRA 10–30% (₹5,610–₹16,830), TA ₹7,200+DA (₹11,376). Gross ₹98,000–₹1,18,000; In-hand ₹86,000–₹104,000.
- **Benchmarks**: 2023: 598 vacancies (Scientist 'B': 71, Scientific Officer 'SB': 196, Scientific Assistant 'A': 331), ~1,42,000 applicants, ~213 shortlisted for Scientist 'B' interview (~1 in 237 selectivity). 2020: 495 vacancies, ~1,20,000 applicants.

---

## 3. Verification & Compliance Checklist

- [x] Schema integrity validated using `scripts/data-sourcing/validate-details.mjs` (0 errors, 0 warnings across all 8 files).
- [x] Entrance exams (`jee-advanced`, `cat`, `gate`, `aiims-nursing`, `jgeebils`) strictly omit `career_ladder` and `financial_package`.
- [x] Job exams (`isro-scientist`, `aiims-norcet`, `nielit-scientist-b`) strictly include all 5 required sections with complete 7th CPC pay progression and canonical 58% DA constants.
- [x] All official download links tested and verified live with HTTP 200 responses.
- [x] Competition benchmarks sourced from official organizing committee reports, result declarations, and seat matrices.
