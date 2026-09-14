# Research Log: Unit 126 (u126) — National Entrance Tests (NTA & Academic Admissions)

- **Unit ID**: `u126`
- **Batch ID**: `batch-6a-national-entrance-tests`
- **Label**: National entrance tests (NTA & academic admissions)
- **Session Date**: 2026-09-14
- **Operator**: Antigravity IDE Autonomous Agent
- **Exams Processed (21)**:
  1. `mse-msc-finance` — Madras School of Economics M.Sc Finance / Financial Economics (Assigned Tier: B)
  2. `nvs-tgt-pgt` — Navodaya Vidyalaya Samiti TGT/PGT Examination (Assigned Tier: B)
  3. `ailet` — All India Law Entrance Test (Assigned Tier: C)
  4. `mat` — Management Aptitude Test (Assigned Tier: C)
  5. `cmat` — Common Management Admission Test (Assigned Tier: C)
  6. `icar-aieea` — ICAR All India Entrance Examination for Admission (Assigned Tier: C)
  7. `iift` — Indian Institute of Foreign Trade MBA Entrance (Assigned Tier: C)
  8. `cmi-entrance` — Chennai Mathematical Institute Entrance (Assigned Tier: C)
  9. `nata` — National Aptitude Test in Architecture (Assigned Tier: C)
  10. `gpat` — Graduate Pharmacy Aptitude Test (Assigned Tier: C)
  11. `imu-cet` — Indian Maritime University Common Entrance Test (Assigned Tier: C)
  12. `tissnet` — Tata Institute of Social Sciences National Entrance Test (Assigned Tier: C)
  13. `jnu-entrance` — Jawaharlal Nehru University Entrance Examination (Assigned Tier: C)
  14. `pet-bhu` — Banaras Hindu University PET (Assigned Tier: C)
  15. `nchm-jee` — National Council for Hotel Management Joint Entrance Exam (Assigned Tier: C)
  16. `jee-main-arch` — JEE Main Paper 2 (B.Arch / B.Planning) (Assigned Tier: C)
  17. `amu-entrance` — Aligarh Muslim University Entrance Test (Assigned Tier: C)
  18. `jamia-entrance` — Jamia Millia Islamia Entrance Exam (Assigned Tier: C)
  19. `iiit-allahabad` — IIIT Allahabad Entrance (Through JEE Main) (Assigned Tier: C)
  20. `fddi-aist` — Footwear Design & Development Institute All India Selection Test (Assigned Tier: C)
  21. `nta-ncet` — National Common Entrance Test (Assigned Tier: C)
- **Status**: ✅ Approved & Verified (All 21 dossiers pass `validate-details.mjs` clean)

---

## 1. Statutory Authorities & Testing Frameworks

The 21 examinations in Unit `u126` comprise prestigious national academic admission tests, central university entrance examinations, specialized institutes of national importance, and autonomous central school cadre recruitment:

### A. National Testing Agency (NTA) & Higher Education Gateways
- **Statutory Authority**: Autonomous society registered under the Societies Registration Act, 1860, Department of Higher Education, Ministry of Education, Government of India.
- **Examinations Covered**:
  - `cmat`: National management entrance test for AICTE-approved MBA/PGDM colleges (100 MCQs, 400 marks, 180 minutes, +4/-1).
  - `icar-aieea`: National entrance test for PG agriculture admissions (AIEEA-PG) and award of ICAR-PG Scholarship / NTS (120 MCQs, 480 marks, 120 minutes).
  - `nchm-jee`: Joint entrance exam for 3-year B.Sc. in Hospitality & Hotel Administration across Central, State, and Private IHMs (200 MCQs, 800 marks, 180 minutes).
  - `jee-main-arch`: JEE Main Paper 2A (B.Arch) and Paper 2B (B.Planning) for NITs, IIEST Shibpur, and SPAs (Mathematics CBT 100 marks + Aptitude CBT 200 marks + Drawing offline 100 marks = 400 marks).
  - `nta-ncet`: National Common Entrance Test for 4-Year Integrated Teacher Education Programme (ITEP) across IITs, NITs, RIEs, and Central Universities (160 MCQs, 640 marks, 120 minutes).
  - `jnu-entrance` & `pet-bhu`: Central university master's degree admissions transitioned to NTA CUET-PG (75 domain MCQs, 300 marks, 105 minutes). JNU applies statutory Deprivation Points; BHU allocates seats via CAP-PG.
  - `iiit-allahabad`: Admissions to B.Tech in IT and ECE conducted through NTA JEE Main Paper 1 (300 marks CBT) followed by JoSAA/CSAB centralized counseling.

### B. Premier Specialized Institutes of National Importance & Autonomous Bodies
- **Navodaya Vidyalaya Samiti (`nvs-tgt-pgt`)**: Autonomous organization under the Department of School Education and Literacy, Ministry of Education. Recruits teachers under the Central 7th CPC Pay Matrix (PGT Level 8: ₹47,600 – ₹1,51,100; TGT Level 7: ₹44,900 – ₹1,42,400). Residential JNV duty includes 10% special allowance, free lodging/boarding on campus, CGHS/medical coverage, and standard canonical DA 58% as of 2025-07-01.
- **National Law University, Delhi (`ailet`)**: Apex national law university established under Delhi Act No. 1 of 2008 (150 MCQs, 150 marks, 120 minutes, -0.25 negative marking for B.A. LL.B. Hons).
- **All India Management Association (`mat`)**: National testing service conducting MAT four times annually in CBT, PBT, and IBT modes (150 MCQs, 150 marks, 120 minutes).
- **Council of Architecture (`nata`)**: Statutory authority under the Architects Act, 1972, regulating architectural qualifications (200 marks: Part A Drawing 80 marks offline + Part B Online Aptitude 120 marks).
- **National Board of Examinations in Medical Sciences (`gpat`)**: Conducts GPAT for M.Pharm admissions and PCI/AICTE post-graduate pharmacy scholarship awards (125 MCQs, 500 marks, 180 minutes, +4/-1).
- **Chennai Mathematical Institute (`cmi-entrance`)**: Premier center for mathematical sciences offering B.Sc. (Hons.) in Mathematics & Computer Science/Physics (Part A Objective 40 marks screening + Part B Subjective Proofs 60 marks).
- **Indian Maritime University (`imu-cet`)**: Central University under the Ministry of Ports, Shipping and Waterways (200 MCQs, 200 marks, 180 minutes, +1/-0.25).
- **Tata Institute of Social Sciences (`tissnet`)**: Deemed University under MoE; classical TISS-NET CBT (100 MCQs, 100 marks), with current PG admissions transitioning to CUET-PG and CAT (HRM&LR).
- **Indian Institute of Foreign Trade (`iift`)**: Autonomous institution under Ministry of Commerce and Industry; flagship MBA (IB) admitting via CAT followed by WAT, Extempore, and Personal Interview.
- **Aligarh Muslim University (`amu-entrance`)**: Central University of National Importance; departmental and engineering entrance tests (AMUEEE: 150 MCQs, 150 marks, 180 minutes).
- **Jamia Millia Islamia (`jamia-entrance`)**: Central University; comprehensive entrance examinations administered by the Office of the Controller of Examinations (100 MCQs, 100 marks, 105 minutes).
- **Footwear Design & Development Institute (`fddi-aist`)**: Institute of National Importance under Ministry of Commerce and Industry (150 Qs, 200 marks, 150 minutes, no negative marking).
- **Madras School of Economics (`mse-msc-finance`)**: Premier institute for quantitative economics and finance; 5 two-year M.Sc. programmes admitting via NTA CUET-PG (Paper Code COQP10) and CUTN allocation.

---

## 2. Dossier Summaries

### 2.1 `mse-msc-finance`
- **Exam Title**: Madras School of Economics M.Sc Finance / Financial Economics
- **Assigned Tier**: B (entrance exam — career_ladder and financial_package omitted per schema rules)
- **Sections Required**: `exam_scheme`, `official_downloads`
- **Sections Best Effort**: `competition_benchmarks` (populated)
- **Exam Architecture**: Administered via NTA CUET-PG (Paper Code: COQP10 - Economics). 75 domain MCQs, 300 marks, 105 minutes. Marking: +4 correct, -1 wrong. Seat allocation via Central University of Tamil Nadu (CUTN) and MSE direct admissions.
- **Competition Benchmarks**: ~14,500 candidates opted for MSE M.Sc. courses in CUET-PG for an aggregate approved intake of ~230 seats across 5 M.Sc. disciplines (~46 seats in M.Sc Financial Economics; ~1 in 63 selectivity).

### 2.2 `nvs-tgt-pgt`
- **Exam Title**: Navodaya Vidyalaya Samiti TGT/PGT Examination
- **Assigned Tier**: B (job exam — all sections populated)
- **Sections Required**: `exam_scheme`, `official_downloads`
- **Sections Best Effort**: `career_ladder`, `financial_package`, `competition_benchmarks` (all populated)
- **Career Ladder**: TGT Level 7 (₹44,900 – ₹1,42,400) → PGT Level 8 (₹47,600 – ₹1,51,100) → Vice Principal Level 10 (₹56,100 – ₹1,77,500) → Principal Level 12 (₹78,800 – ₹2,09,200) → Assistant Commissioner Level 13 (₹1,23,100 – ₹2,15,900).
- **Financial Package**: 7th CPC Level 8 entry for PGT (basic ₹47,600) / Level 7 for TGT (basic ₹44,900); canonical DA 58% as of 2025-07-01; gross range ~₹75,000–₹98,000, in-hand range ~₹67,000–₹88,000. Full residential perks: mandatory rent-free residential quarters inside JNV campus, free dining mess boarding, 10% residential special allowance, CGHS/medical, NPS (14%), CEA, and full vacations.
- **Exam Architecture**: Two-stage selection: Stage 1 CBT (150 Qs, 180 mins; Parts I-V 130 marks evaluated + Part VI Language Competency 20 marks qualifying only with 40% in each language; -0.25 negative marking) + Stage 2 Personal Interview (20% weightage in final composite selection).
- **Competition Benchmarks**: Direct Recruitment 2022: 2,216 vacancies filled across PGT/TGT/Misc cadres from over 5.8 lakh applicants (~1 in 261 selectivity).

### 2.3 `ailet`
- **Exam Title**: All India Law Entrance Test
- **Assigned Tier**: C (entrance exam)
- **Sections Required**: `official_downloads`
- **Sections Best Effort**: `exam_scheme`, `competition_benchmarks` (both populated)
- **Exam Architecture**: Offline pen-and-paper OMR test; 150 MCQs across English (50), Current Affairs/GK (30), and Logical Reasoning (70); 150 marks, 120 minutes, -0.25 negative marking.
- **Competition Benchmarks**: ~18,900 candidates appeared for 123 seats in B.A. LL.B. (Hons.) at NLU Delhi (~1 in 153 selectivity).

### 2.4 `mat`
- **Exam Title**: Management Aptitude Test
- **Assigned Tier**: C (entrance exam)
- **Sections Required**: `official_downloads`
- **Sections Best Effort**: `exam_scheme`, `competition_benchmarks` (both populated)
- **Exam Architecture**: Administered 4 times yearly in CBT, PBT, and IBT modes; 150 MCQs (150 marks, 120 mins) across 5 sections (Language, Intelligence/Reasoning, Math, Data Analysis, and Indian/Global Environment); scaled composite score 200–800.
- **Competition Benchmarks**: ~82,000 candidates tested across all 4 cycles annually for admission into 600+ AICTE-approved business schools.

### 2.5 `cmat`
- **Exam Title**: Common Management Admission Test
- **Assigned Tier**: C (entrance exam)
- **Sections Required**: `official_downloads`
- **Sections Best Effort**: `exam_scheme`, `competition_benchmarks` (both populated)
- **Exam Architecture**: Single paper CBT, 180 minutes (3 hours), 100 MCQs (400 marks) across 5 sections (Quantitative Techniques 20, Logical Reasoning 20, Language 20, GK 20, Innovation & Entrepreneurship 20); marking: +4, -1.
- **Competition Benchmarks**: 76,160 registered and 65,127 appeared candidates across 186 cities nationwide for admission to 1,000+ AICTE institutions.

### 2.6 `icar-aieea`
- **Exam Title**: ICAR All India Entrance Examination for Admission (AIEEA-PG)
- **Assigned Tier**: C (entrance exam)
- **Sections Required**: `official_downloads`
- **Sections Best Effort**: `exam_scheme`, `competition_benchmarks` (both populated)
- **Exam Architecture**: Single paper CBT, 120 minutes, 120 MCQs (480 marks) across 20 Major Subject Groups; marking: +4, -1.
- **Competition Benchmarks**: ~38,500 candidates appeared for ~3,200 ICAR quota master's seats and ~600 ICAR PG scholarships across agricultural universities nationwide (~1 in 12 selectivity).

### 2.7 `iift`
- **Exam Title**: Indian Institute of Foreign Trade MBA Entrance
- **Assigned Tier**: C (entrance exam)
- **Sections Required**: `official_downloads`
- **Sections Best Effort**: `exam_scheme`, `competition_benchmarks` (both populated)
- **Exam Architecture**: Two-stage selection: Stage 1 screening via CAT (Quantitative, VARC, DILR; 198 marks, 120 mins) + Stage 2 Written Assessment Test (WAT), Extempore, and Personal Interview (PI; 25% weightage).
- **Competition Benchmarks**: ~42,000 applicants applied for ~550 MBA (IB) seats across Delhi and Kolkata campuses (~1 in 76 selectivity; 2,800 shortlisted for Stage 2).

### 2.8 `cmi-entrance`
- **Exam Title**: Chennai Mathematical Institute Entrance
- **Assigned Tier**: C (entrance exam)
- **Sections Required**: `official_downloads`
- **Sections Best Effort**: `exam_scheme`, `competition_benchmarks` (both populated)
- **Exam Architecture**: Pen-and-paper test, 180 minutes, 100 marks. Part A (Objective screening, 40 marks, negative marking applied) + Part B (Subjective analytical proof-based problems, 60 marks).
- **Competition Benchmarks**: ~8,400 applicants competed for ~60 undergraduate seats in B.Sc. Mathematics & Computer Science/Physics (~1 in 140 selectivity).

### 2.9 `nata`
- **Exam Title**: National Aptitude Test in Architecture
- **Assigned Tier**: C (entrance exam)
- **Sections Required**: `official_downloads`
- **Sections Best Effort**: `exam_scheme`, `competition_benchmarks` (both populated)
- **Exam Architecture**: Two parts: Part A Offline Drawing and Composition (3 questions, 80 marks, 90 mins) + Part B Online CBT Aptitude (45 questions, 120 marks, 90 mins). Aggregate qualifying score: 70 out of 200.
- **Competition Benchmarks**: ~48,200 test appearances across weekend sessions for ~22,500 sanctioned B.Arch seats across ~450 CoA-approved architecture colleges nationwide.

### 2.10 `gpat`
- **Exam Title**: Graduate Pharmacy Aptitude Test
- **Assigned Tier**: C (entrance exam)
- **Sections Required**: `official_downloads`
- **Sections Best Effort**: `exam_scheme`, `competition_benchmarks` (both populated)
- **Exam Architecture**: Single paper CBT administered by NBEMS; 125 MCQs, 500 marks, 180 minutes. Subjects: Pharm Chemistry (38), Pharmaceutics (38), Pharmacology (28), Pharmacognosy (10), Other (11); +4/-1 marking.
- **Competition Benchmarks**: ~64,800 registered and 61,200 appeared candidates; 4,920 qualified for M.Pharm admissions and monthly AICTE/PCI scholarship awards (~1 in 12.4).

### 2.11 `imu-cet`
- **Exam Title**: Indian Maritime University Common Entrance Test
- **Assigned Tier**: C (entrance exam)
- **Sections Required**: `official_downloads`
- **Sections Best Effort**: `exam_scheme`, `competition_benchmarks` (both populated)
- **Exam Architecture**: Online CBT, 180 minutes, 200 MCQs, 200 marks. Subjects: Physics (50), Mathematics (50), Chemistry (20), English (40), General Aptitude (40); marking: +1, -0.25.
- **Competition Benchmarks**: ~27,500 candidates appeared for ~3,400 undergraduate marine engineering and nautical science seats across 6 IMU campuses and 21 affiliated institutes (~1 in 8 selectivity).

### 2.12 `tissnet`
- **Exam Title**: Tata Institute of Social Sciences National Entrance Test
- **Assigned Tier**: C (entrance exam)
- **Sections Required**: `official_downloads`
- **Sections Best Effort**: `exam_scheme`, `competition_benchmarks` (both populated)
- **Exam Architecture**: Classical TISS-NET CBT: 100 MCQs in 100 minutes (General Awareness 40, English 30, Math/Reasoning 30; no negative marking), followed by Extempore and Personal Interview (30% weightage). Current admission via CUET-PG and CAT (HRM&LR/ODCL).
- **Competition Benchmarks**: ~44,500 candidates applied across 54 Master's degree courses for ~1,250 seats across Mumbai, Tuljapur, Hyderabad, and Guwahati campuses (~1 in 36 selectivity).

### 2.13 `jnu-entrance`
- **Exam Title**: Jawaharlal Nehru University Entrance Examination
- **Assigned Tier**: C (entrance exam)
- **Sections Required**: `official_downloads`
- **Sections Best Effort**: `exam_scheme`, `competition_benchmarks` (both populated)
- **Exam Architecture**: Administered via NTA CUET-PG (75 domain MCQs, 300 marks, 105 mins CBT, +4/-1). JNU uniquely computes composite ranks adding up to 12 statutory Deprivation Points for regional/gender equity.
- **Competition Benchmarks**: Over 1.65 lakh student preferences registered for JNU PG courses in CUET-PG for ~2,650 sanctioned seats (~1 in 62 selectivity; School of International Studies / School of Social Sciences selectivity exceeds 1 in 100).

### 2.14 `pet-bhu`
- **Exam Title**: Banaras Hindu University PET
- **Assigned Tier**: C (entrance exam)
- **Sections Required**: `official_downloads`
- **Sections Best Effort**: `exam_scheme`, `competition_benchmarks` (both populated)
- **Exam Architecture**: Administered via NTA CUET-PG (75 domain MCQs, 300 marks, 105 mins CBT, +4/-1). Central seat counseling handled via BHU Central Admission Portal (CAP PG).
- **Competition Benchmarks**: Over 2.25 lakh course preferences submitted for BHU post-graduate courses in CUET-PG for ~6,500 approved seats across faculties and affiliated colleges (~1 in 34 selectivity).

### 2.15 `nchm-jee`
- **Exam Title**: National Council for Hotel Management Joint Entrance Exam
- **Assigned Tier**: C (entrance exam)
- **Sections Required**: `official_downloads`
- **Sections Best Effort**: `exam_scheme`, `competition_benchmarks` (both populated)
- **Exam Architecture**: Single paper CBT, 180 minutes, 200 MCQs, 800 marks across 5 sections (Numerical 30, Reasoning 30, GK 30, English 60, Service Aptitude 50); marking: +4, -1.
- **Competition Benchmarks**: ~34,200 candidates appeared for 11,965 sanctioned B.Sc. HHA seats across 21 Central IHMs, 29 State IHMs, 1 PSU IHM, and 26 Private IHMs nationwide (~1 in 2.8 selectivity; premier IHMs like Pusa/Mumbai exceed 1 in 10).

### 2.16 `jee-main-arch`
- **Exam Title**: JEE Main Paper 2 (B.Arch / B.Planning)
- **Assigned Tier**: C (entrance exam)
- **Sections Required**: `official_downloads`
- **Sections Best Effort**: `exam_scheme`, `competition_benchmarks` (both populated)
- **Exam Architecture**: Total 400 marks, 180 minutes. Part I Mathematics (20 MCQs + 5/10 Numerical, 100 marks CBT), Part II Aptitude Test (50 MCQs, 200 marks CBT), and Part III Drawing Test (2 questions, 100 marks offline on drawing sheets).
- **Competition Benchmarks**: 73,645 unique candidates appeared across Sessions 1 and 2 for ~1,120 architecture and planning seats across NITs, IIEST Shibpur, and SPAs (Delhi, Bhopal, Vijayawada) in JoSAA/CSAB counseling (~1 in 66 selectivity).

### 2.17 `amu-entrance`
- **Exam Title**: Aligarh Muslim University Entrance Test
- **Assigned Tier**: C (entrance exam)
- **Sections Required**: `official_downloads`
- **Sections Best Effort**: `exam_scheme`, `competition_benchmarks` (both populated)
- **Exam Architecture**: Pen-and-paper OMR test. Engineering (AMUEEE): 150 MCQs (50 Physics, 50 Chemistry, 50 Math), 150 marks, 180 minutes, -0.25 negative marking. General admission tests: 100 MCQs, 100 marks, 120 minutes.
- **Competition Benchmarks**: Over 1.85 lakh candidates applied across all university entrance courses for ~8,200 seats; B.Tech received ~34,500 applicants for ~450 seats (~1 in 76 selectivity).

### 2.18 `jamia-entrance`
- **Exam Title**: Jamia Millia Islamia Entrance Exam
- **Assigned Tier**: C (entrance exam)
- **Sections Required**: `official_downloads`
- **Sections Best Effort**: `exam_scheme`, `competition_benchmarks` (both populated)
- **Exam Architecture**: Offline pen-and-paper OMR test; 100 MCQs, 100 marks, 105 minutes duration. Marking scheme: +1 for correct, -0.25 for incorrect. Minimum 15% qualifying score in objective test.
- **Competition Benchmarks**: 1,52,000 applications received across all university entrance programmes for ~7,200 sanctioned seats (~1 in 21 selectivity; law, media, and computer science exceed 1 in 50).

### 2.19 `iiit-allahabad`
- **Exam Title**: IIIT Allahabad Entrance (Through JEE Main)
- **Assigned Tier**: C (entrance exam)
- **Sections Required**: `official_downloads`
- **Sections Best Effort**: `exam_scheme`, `competition_benchmarks` (both populated)
- **Exam Architecture**: Admissions to B.Tech in IT, IT-BI, and ECE purely determined by All India Rank (AIR) in NTA JEE Main Paper 1 (300 marks CBT, 75 Qs evaluated out of 90 across Physics, Chemistry, Math; +4/-1) followed by JoSAA/CSAB centralized counseling.
- **Competition Benchmarks**: 375 sanctioned B.Tech seats filled through JoSAA from over 14.15 lakh JEE Main examinees; General Open category cutoff closed between AIR 2,150 and AIR 5,480 (top 0.38% percentile selectivity).

### 2.20 `fddi-aist`
- **Exam Title**: Footwear Design & Development Institute All India Selection Test
- **Assigned Tier**: C (entrance exam)
- **Sections Required**: `official_downloads`
- **Sections Best Effort**: `exam_scheme`, `competition_benchmarks` (both populated)
- **Exam Architecture**: Computer or paper-based test; 150 questions, 200 marks, 150 minutes across Quantitative (25), Verbal (30), GK (30), Business Aptitude (25), and Design Aptitude (40 Qs, 90 marks). No negative marking.
- **Competition Benchmarks**: 14,200 candidates applied for ~2,450 design seats across 12 FDDI campuses (~1 in 5.8 selectivity overall; Noida design campus exceeds 1 in 15).

### 2.21 `nta-ncet`
- **Exam Title**: National Common Entrance Test
- **Assigned Tier**: C (entrance exam)
- **Sections Required**: `official_downloads`
- **Sections Best Effort**: `exam_scheme`, `competition_benchmarks` (both populated)
- **Exam Architecture**: Single window CBT for 4-Year Integrated Teacher Education Programme (ITEP); 160 MCQs (from 181), 640 marks, 120 minutes. Section 1 Languages (40 Qs, 160 marks), Section 2 Domains (75 Qs, 300 marks), Section 3 General Test (25 Qs, 100 marks), and Section 4 Teaching Aptitude (20 Qs, 80 marks); +4/-1 marking.
- **Competition Benchmarks**: 40,233 registered candidates appeared for ~3,950 approved 4-Year ITEP seats across 64 participating institutions including IIT Kharagpur, NIT Calicut, RIEs, and Central Universities (~1 in 10 selectivity).

---

## 3. Link Liveness & Primary Source Auditing

All URLs cited across all 21 dossier files have been verified:
- `https://www.mse.ac.in/`: HTTP 200
- `https://navodaya.gov.in/`: HTTP 200
- `https://nludelhi.ac.in/`: HTTP 200
- `https://mat.aima.in/`: HTTP 200
- `https://exams.nta.ac.in/`: HTTP 200
- `https://nta.ac.in/`: HTTP 200
- `https://icar.org.in/`: HTTP 200
- `https://www.iift.ac.in/`: HTTP 200
- `https://www.cmi.ac.in/`: HTTP 200
- `https://nata.in/`: HTTP 200
- `https://www.coa.gov.in/`: HTTP 200
- `https://natboard.edu.in/`: HTTP 200
- `https://www.imu.edu.in/`: HTTP 200
- `https://admissions.tiss.edu/`: HTTP 200
- `https://www.tiss.edu/`: HTTP 200
- `https://www.jnu.ac.in/`: HTTP 200
- `https://www.bhu.ac.in/`: HTTP 200
- `https://nchm.gov.in/`: HTTP 200
- `https://jeemain.nta.nic.in/`: HTTP 200
- `https://www.amucontrollerexams.com/`: HTTP 200
- `https://www.amu.ac.in/`: HTTP 200
- `https://jmicoe.in/`: HTTP 200
- `https://www.jmi.ac.in/`: HTTP 200
- `https://www.iiita.ac.in/`: HTTP 200
- `https://www.fddiindia.com/`: HTTP 200
- `https://ncte.gov.in/`: HTTP 200

## 4. Verification Check

All 21 dossier files were independently validated against `validate-details.mjs` and passed with 0 errors and 0 warnings.
