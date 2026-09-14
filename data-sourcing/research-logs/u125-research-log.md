# Research Log: Unit 125 (u125) — National Entrance Tests (NTA & Academic Admissions)

- **Unit ID**: `u125`
- **Batch ID**: `batch-6a-national-entrance-tests`
- **Label**: National entrance tests (NTA & academic admissions)
- **Session Date**: 2026-09-14
- **Operator**: Antigravity IDE Autonomous Agent
- **Exams Processed (14)**:
  1. `dse-mcom` — Delhi School of Economics Master of Commerce Entrance Examination (Assigned Tier: A)
  2. `clat` — Common Law Admission Test (Assigned Tier: B)
  3. `nid-dat` — National Institute of Design - Design Aptitude Test (Assigned Tier: B)
  4. `nift` — National Institute of Fashion Technology Entrance (Assigned Tier: B)
  5. `csir-net` — Council of Scientific and Industrial Research NET (Assigned Tier: B)
  6. `cuet-pg` — Common University Entrance Test (PG) (Assigned Tier: B)
  7. `kvs-pgt-tgt` — Kendriya Vidyalaya Sangathan Teacher Recruitment (Assigned Tier: B)
  8. `du-entrance` — Delhi University Entrance Test (Assigned Tier: B)
  9. `ntse` — National Talent Search Examination (Assigned Tier: B)
  10. `cusat-cat` — Cochin University of Science and Technology Common Admission Test (Assigned Tier: B)
  11. `atma` — AIMS Test for Management Admissions (Assigned Tier: B)
  12. `aiapget` — All India AYUSH Post Graduate Entrance Test (Assigned Tier: B)
  13. `icar-aice-jrf-srf` — ICAR All India Competitive Examination for JRF/SRF (PhD) (Assigned Tier: B)
  14. `nibm-pgdm` — National Institute of Bank Management PGDM (Banking & Financial Services) (Assigned Tier: B)
- **Status**: ✅ Approved & Verified (All 14 dossiers pass `validate-details.mjs` clean)

---

## 1. Statutory Authorities & Testing Bodies

The 14 examinations in Unit `u125` span premier national academic entrance tests, professional design/law gateways, research fellowship assessments, and central school teaching recruitment:

### A. National Testing Agency (NTA) & Higher Education Bodies
- **Statutory Authority**: Registered autonomous society under the Department of Higher Education, Ministry of Education, Government of India.
- **Examinations Covered**:
  - `cuet-pg`: Centralized gateway for postgraduate admissions across 190+ central, state, deemed, and private universities (revised 2024 scheme: 75 domain-specific MCQs, 105 minutes, 300 marks).
  - `csir-net`: Joint CSIR-UGC NET for JRF and Lectureship eligibility across Chemical, Earth, Life, Mathematical, and Physical Sciences (200 marks, 180 minutes, 3 parts).
  - `aiapget`: National single-window entrance for MD/MS/PG Diploma across Ayurveda, Unani, Siddha, and Homeopathy on behalf of Ministry of AYUSH, NCISM, and NCH (120 MCQs, 480 marks, 120 minutes).
  - `icar-aice-jrf-srf`: National entrance test for Ph.D. admissions and award of ICAR JRF/SRF across 72 disciplines in Agricultural Universities (120 MCQs, 480 marks, 120 minutes).
  - `nift`: Jointly administered with NIFT for B.Des, B.F.Tech, and PG admissions (GAT CBT + CAT drawing test + Situation Test).
  - `dse-mcom` & `du-entrance`: Delhi University transitioned all PG/UG admissions to CUET-PG and CUET-UG; DSE M.Com admissions are governed by Paper Code COQP08 under DU's Common Seat Allocation System (CSAS).

### B. Specialized Statutory & Consortium Bodies
- **Consortium of National Law Universities (`clat`)**: Association of 24 NLUs constituted under state enactments for admissions to 5-year integrated law and LL.M. programmes (120 MCQs based on reading passages, 120 marks, 120 minutes, -0.25 negative marking).
- **National Institute of Design (`nid-dat`)**: Institute of National Importance under the Ministry of Commerce & Industry (DPIIT) (Two-stage DAT: Prelims written test + Mains studio test).
- **National Council of Educational Research and Training (`ntse`)**: Apex school education body under Ministry of Education (Two-stage scholarship: MAT 100 marks + SAT 100 marks; 2,000 national scholarships).
- **Cochin University of Science and Technology (`cusat-cat`)**: State university of Kerala established by legislative enactment (Test 101 for B.Tech: 225 MCQs, 675 marks, 180 minutes; +3, -1).
- **Association of Indian Management Schools (`atma`)**: AICTE and Ministry of Education recognized national management entrance test (6 timed sections, 180 MCQs, 180 marks, 180 minutes).
- **National Institute of Bank Management (`nibm-pgdm`)**: Autonomous apex institute established by the Reserve Bank of India (RBI) and Public Sector Banks (Admission via CAT/XAT/CMAT scores + WAT & PI).

### C. School Education Recruitment Body (Job Postings)
- **Kendriya Vidyalaya Sangathan (`kvs-pgt-tgt`)**: Autonomous organization under the Ministry of Education, Government of India.
- **Pay Matrix**: Central 7th CPC Pay Matrix applies directly. PGT (Pay Level 8: ₹47,600 – ₹1,51,100), TGT (Pay Level 7: ₹44,900 – ₹1,42,400), and PRT (Pay Level 6: ₹35,400 – ₹1,12,400).
- **Project Canonical Constant**: Standard 58% DA constant as of 2025-07-01 applied.

---

## 2. Dossier Summaries

### 2.1 `dse-mcom`
- **Exam Title**: Delhi School of Economics Master of Commerce Entrance Examination
- **Assigned Tier**: A (entrance exam — career_ladder and financial_package omitted per schema rules)
- **Sections Required**: `exam_scheme`, `competition_benchmarks`, `official_downloads`
- **Sections Populated**: All 3 required sections fully populated
- **Exam Architecture**: Administered via NTA CUET-PG (Paper Code: COQP08 - Commerce). 75 domain MCQs, 300 marks, 105 minutes. Marking: +4 correct, -1 wrong. Seat allocation via DU CSAS PG (50% Category 1 DU B.Com merit, 50% Category 2 open).
- **Competition Benchmarks**: ~38,200 test-takers in COQP08; ~348 approved intake across DSE Department of Commerce; ~1 in 35 selectivity among DU aspirants.

### 2.2 `clat`
- **Exam Title**: Common Law Admission Test
- **Assigned Tier**: B (entrance exam — career_ladder and financial_package omitted)
- **Sections Required**: `exam_scheme`, `official_downloads`
- **Sections Best Effort**: `competition_benchmarks` (populated)
- **Exam Architecture**: Offline pen-and-paper OMR test; 120 MCQs based on reading passages across 5 sections (English 24, Current Affairs/GK 30, Legal Reasoning 30, Logical Reasoning 24, Quantitative Techniques 12); 120 marks, 120 minutes, -0.25 negative marking.
- **Competition Benchmarks**: CLAT 2025: ~68,500 candidates appeared for ~3,200 undergraduate seats across 24 NLUs (~1 in 21 selectivity).

### 2.3 `nid-dat`
- **Exam Title**: National Institute of Design - Design Aptitude Test
- **Assigned Tier**: B (entrance exam — career_ladder and financial_package omitted)
- **Sections Required**: `exam_scheme`, `official_downloads`
- **Sections Best Effort**: `competition_benchmarks` (populated)
- **Exam Architecture**: Stage 1: DAT Prelims (100 marks, 180 minutes; Part I objective 30 marks + Part II subjective drawing 70 marks). Stage 2: DAT Mains (Studio Test 100 marks, material handling, observation). Composite weightage: 40% Prelims + 60% Mains.
- **Competition Benchmarks**: 425 total B.Des seats across 5 campuses (Ahmedabad 125, AP 75, Haryana 75, MP 75, Assam 75); ~31,000 applicants (~1 in 73 overall).

### 2.4 `nift`
- **Exam Title**: National Institute of Fashion Technology Entrance
- **Assigned Tier**: B (entrance exam — career_ladder and financial_package omitted)
- **Sections Required**: `exam_scheme`, `official_downloads`
- **Sections Best Effort**: `competition_benchmarks` (populated)
- **Exam Architecture**: Stage 1: GAT (CBT, 100 MCQs, 120 mins, +1/-0.25) + CAT (Paper-based drawing, 100 marks, 180 mins). Stage 2: Situation Test (hands-on 3D prototyping, 100 marks, 120 mins). Composite weightage: CAT 50% + GAT 30% + Situation Test 20%.
- **Competition Benchmarks**: ~4,500 seats across 18 campuses out of ~42,000 appeared candidates (~1 in 9.3 selectivity).

### 2.5 `csir-net`
- **Exam Title**: Council of Scientific and Industrial Research NET
- **Assigned Tier**: B (entrance exam — career_ladder and financial_package omitted)
- **Sections Required**: `exam_scheme`, `official_downloads`
- **Sections Best Effort**: `competition_benchmarks` (populated)
- **Exam Architecture**: Single paper CBT, 200 marks, 180 minutes. Part A (General Science & Aptitude, 15 of 20 questions, 30 marks), Part B (Subject MCQs, 70 marks), Part C (Higher-order analytical, 100 marks). 25% negative marking.
- **Competition Benchmarks**: ~1.63 lakh candidates appeared; ~2,800 qualified for JRF and ~4,200 for Lectureship (~4.3% qualification rate).

### 2.6 `cuet-pg`
- **Exam Title**: Common University Entrance Test (PG)
- **Assigned Tier**: B (entrance exam — career_ladder and financial_package omitted)
- **Sections Required**: `exam_scheme`, `official_downloads`
- **Sections Best Effort**: `competition_benchmarks` (populated)
- **Exam Architecture**: Computer Based Test (CBT), 105 minutes duration, 75 domain-specific MCQs, 300 marks (+4 for correct, -1 for incorrect, 0 for unattempted). Gateway for 190+ central, state, deemed, and private universities.
- **Competition Benchmarks**: 4,62,603 unique registered candidates (7.68 lakh test choices); 5.77 lakh test appearances across 157 subject codes.

### 2.7 `kvs-pgt-tgt`
- **Exam Title**: Kendriya Vidyalaya Sangathan Teacher Recruitment
- **Assigned Tier**: B (JOB EXAM — all 5 sections required and populated)
- **Cadre & Pay**: Central 7th CPC Pay Matrix. PGT (Level 8: basic ₹47,600 – ₹1,51,100), TGT (Level 7: basic ₹44,900 – ₹1,42,400), PRT (Level 6: basic ₹35,400 – ₹1,12,400). Standard 58% DA (₹27,608 for PGT), 30% metro HRA, TPTA. Gross: ₹72,000–₹96,000; In-hand: ₹64,000–₹86,000.
- **Career Ladder**: PRT (Level 6) -> TGT (Level 7) -> PGT (Level 8) -> Vice Principal (Level 10) -> Principal (Level 12) -> Assistant Commissioner (Level 13).
- **Exam Architecture**: CBT (180 MCQs, 180 marks, 180 mins: Part I Languages 20, Part II General Awareness & Computers 20, Part III Perspectives on Education 40/60, Part IV Subject Specific 100/80; no negative marking) + Professional Competency Test (Demo 30 + Interview 30; 60 marks). Final merit: 70% CBT + 30% Professional Competency.
- **Competition Benchmarks**: Advt 15/2022 & 16/2022: 13,404 vacancies (PGT 1,409; TGT 3,176; PRT 6,414) out of >22 lakh applicants (~1 in 164 overall).

### 2.8 `du-entrance`
- **Exam Title**: Delhi University Entrance Test
- **Assigned Tier**: B (entrance exam — career_ladder and financial_package omitted)
- **Sections Required**: `exam_scheme`, `official_downloads`
- **Sections Best Effort**: `competition_benchmarks` (populated)
- **Exam Architecture**: Formerly DUET; fully integrated into CUET-UG and CUET-PG under DU's Common Seat Allocation System (CSAS). UG candidates take domain/language/general tests (+5/-1); PG candidates take 75 domain MCQs (+4/-1).
- **Competition Benchmarks**: ~71,000 undergraduate seats across 68 colleges; >3.1 lakh registered applicants on DU CSAS (~1 in 4.3 overall; <1 in 40 for North Campus colleges).

### 2.9 `ntse`
- **Exam Title**: National Talent Search Examination
- **Assigned Tier**: B (entrance exam — career_ladder and financial_package omitted)
- **Sections Required**: `exam_scheme`, `official_downloads`
- **Sections Best Effort**: `competition_benchmarks` (populated)
- **Exam Architecture**: Stage 1 (State/UT level) and Stage 2 (National level by NCERT). Paper 1: MAT (100 MCQs, 100 marks, 120 mins). Paper 2: SAT (100 MCQs: Science 40, Maths 20, Social Science 40; 100 marks, 120 mins). No negative marking.
- **Competition Benchmarks**: ~14 lakh initial Class 10 test-takers across India; ~8,500 qualify for Stage 2; exactly 2,000 national scholarships awarded (~1 in 700 selectivity).

### 2.10 `cusat-cat`
- **Exam Title**: Cochin University of Science and Technology Common Admission Test
- **Assigned Tier**: B (entrance exam — career_ladder and financial_package omitted)
- **Sections Required**: `exam_scheme`, `official_downloads`
- **Sections Best Effort**: `competition_benchmarks` (populated)
- **Exam Architecture**: CBT Test 101 for B.Tech engineering. 225 MCQs, 675 marks, 180 minutes. Mathematics (90 MCQs, 270 marks), Physics (75 MCQs, 225 marks), Chemistry (60 MCQs, 180 marks). Marking: +3 for correct, -1 for incorrect.
- **Competition Benchmarks**: ~1,250 B.Tech seats across Thrikkakara and Kuttanad campuses out of ~42,500 appeared candidates (~1 in 34 selectivity).

### 2.11 `atma`
- **Exam Title**: AIMS Test for Management Admissions
- **Assigned Tier**: B (entrance exam — career_ladder and financial_package omitted)
- **Sections Required**: `exam_scheme`, `official_downloads`
- **Sections Best Effort**: `competition_benchmarks` (populated)
- **Exam Architecture**: Computer Based Test administered 4–5 times annually. 180 MCQs, 180 marks, 180 minutes across 6 timed sections (30 minutes each, 30 questions each: Analytical Reasoning 1 & 2, Quantitative Skills 1 & 2, Verbal Skills 1 & 2). Marking: +1 correct, -0.25 incorrect. Accepted by 500+ b-schools.
- **Competition Benchmarks**: ~45,000 test-takers across testing cycles annually.

### 2.12 `aiapget`
- **Exam Title**: All India AYUSH Post Graduate Entrance Test
- **Assigned Tier**: B (entrance exam — career_ladder and financial_package omitted)
- **Sections Required**: `exam_scheme`, `official_downloads`
- **Sections Best Effort**: `competition_benchmarks` (populated)
- **Exam Architecture**: Single CBT for MD/MS in Ayurveda, Unani, Siddha, and Homeopathy. 120 MCQs, 480 marks, 120 minutes. Marking: +4 correct, -1 incorrect. Bilingual test papers for respective disciplines.
- **Competition Benchmarks**: ~4,500 total MD/MS seats across AYUSH systems out of ~38,000 appeared candidates (~1 in 8.4 selectivity).

### 2.13 `icar-aice-jrf-srf`
- **Exam Title**: ICAR All India Competitive Examination for JRF/SRF (PhD)
- **Assigned Tier**: B (entrance exam — career_ladder and financial_package omitted)
- **Sections Required**: `exam_scheme`, `official_downloads`
- **Sections Best Effort**: `competition_benchmarks` (populated)
- **Exam Architecture**: Single CBT across 72 agricultural subjects. 120 MCQs, 480 marks, 120 minutes. Section A (20 questions General Agriculture, 80 marks), Section B (50 questions Core Group, 200 marks), Section C (50 questions Specialized Sub-subject, 200 marks). Marking: +4 correct, -1 incorrect.
- **Competition Benchmarks**: ~1,850 doctoral seats and ~300 ICAR JRF/SRF fellowships awarded out of 14,200 test-takers (~1 in 7.6 for admission; ~1 in 47 for fellowship).

### 2.14 `nibm-pgdm`
- **Exam Title**: National Institute of Bank Management PGDM (Banking & Financial Services)
- **Assigned Tier**: B (entrance exam — career_ladder and financial_package omitted)
- **Sections Required**: `exam_scheme`, `official_downloads`
- **Sections Best Effort**: `competition_benchmarks` (populated)
- **Exam Architecture**: Multi-stage admission process: Stage 1 National Entrance Score Screening (CAT/XAT/CMAT); Stage 2 Written Ability Test (WAT) and Personal Interview (PI). Composite merit: Test Score (35%), PI (25%), WAT (25%), Academics (10%), Diversity/WorkEx (5%).
- **Competition Benchmarks**: Approved intake of 150 students; ~7,200 applicants (~1 in 48 selectivity); 100% placement with average CTC of ₹14–15 LPA in premier banks and financial institutions.

---

## 3. Validation & Quality Audit

1. **Automated Schema Validation**:
   - Ran `node scripts/data-sourcing/validate-details.mjs`.
   - All 14 files (`dse-mcom.json`, `clat.json`, `nid-dat.json`, `nift.json`, `csir-net.json`, `cuet-pg.json`, `kvs-pgt-tgt.json`, `du-entrance.json`, `ntse.json`, `cusat-cat.json`, `atma.json`, `aiapget.json`, `icar-aice-jrf-srf.json`, `nibm-pgdm.json`) evaluated with **PASS (0 errors, 0 warnings)**.
2. **Confidence Grading Policy Audit**:
   - Primary official regulatory documents, syllabus notifications, and recruitment advertisements personally verified were assigned `confidence: "verified"`.
   - Official appearance and registration statistics from official press releases and result notifications were assigned `confidence: "reported"`.
   - Salary ranges computed from pay level, canonical 58% DA constant, and HRA rules were assigned `confidence: "estimate"`.
3. **Link Liveness Verification**:
   - Official portals independently verified with HTTP status checks (`200 OK` / valid redirects).
   - Only official conducting bodies' domains cited (`nta.ac.in`, `exams.nta.ac.in`, `consortiumofnlus.ac.in`, `admissions.nid.edu`, `nift.ac.in`, `kvsangathan.nic.in`, `du.ac.in`, `admission.uod.ac.in`, `ncert.nic.in`, `admissions.cusat.ac.in`, `atmaaims.com`, `nibmindia.org`, `commercedu.com`).
