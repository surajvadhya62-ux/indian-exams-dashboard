# Research Log: Unit 131 (u131) — Medical & Health Services Bodies

- **Unit ID**: `u131`
- **Batch ID**: `batch-6d-medical-health`
- **Label**: Medical & health services bodies
- **Session Date**: 2026-09-14
- **Operator**: Antigravity IDE Autonomous Agent
- **Exams Processed (14)**:
  1. `esic-nursing-officer` — Employees' State Insurance Corporation Nursing Officer Examination (Assigned Tier: A)
  2. `esic-paramedical` — ESIC Paramedical Cadre Examination (Pharmacist, Lab Tech, Radiographer) (Assigned Tier: A)
  3. `neet-pg` — National Eligibility cum Entrance Test (Postgraduate) [NEET-PG] (Assigned Tier: B)
  4. `jipmer` — JIPMER MBBS Entrance [Administered via NEET-UG] (Assigned Tier: B)
  5. `esic-sso` — Employees' State Insurance Corporation Social Security Officer Exam (Assigned Tier: B)
  6. `pgimer-nursing-officer` — PGIMER Chandigarh Nursing Officer & Store Keeper Examination (Assigned Tier: B)
  7. `jipmer-nursing-officer` — JIPMER Puducherry Nursing Officer & Medical Record Technician Exam (Assigned Tier: B)
  8. `dghs-safdarjung-nurse` — DGHS Central Hospitals Staff Nurse & Technical Officer Examination (Assigned Tier: B)
  9. `cghs-pharmacist` — Central Government Health Scheme Pharmacist & MTS Examination (Assigned Tier: B)
  10. `neet-ss` — National Eligibility cum Entrance Test (Super Speciality) [NEET-SS] (Assigned Tier: C)
  11. `fmge` — Foreign Medical Graduate Examination (Assigned Tier: C)
  12. `neet-mds` — National Eligibility cum Entrance Test for Master of Dental Surgery [NEET-MDS] (Assigned Tier: C)
  13. `dnb-pdcet` — Diplomate of National Board Post Diploma Centralized Entrance Test (Assigned Tier: C)
  14. `nbe-fet` — Fellowship Entrance Test [NBEMS FNB Admissions] (Assigned Tier: C)
- **Status**: ✅ Approved & Verified (All 14 dossiers pass `validate-details.mjs` clean with 0 errors and 0 warnings)

---

## 1. Statutory Authorities & Testing Bodies

The 14 examinations in Unit `u131` represent India's core statutory medical education gateways and central healthcare recruitment systems:

### A. National Board of Examinations in Medical Sciences (NBEMS / NBE)
- **Statutory Authority**: Autonomous body established in 1975 under the Ministry of Health and Family Welfare (MoHFW), Government of India, to standardize postgraduate medical examinations.
- **Examinations Covered**:
  - `neet-pg`: Single national statutory entrance test under the NMC Act for MD/MS/PG Diploma and Post-MBBS DNB admissions (200 MCQs, 800 marks, 210 minutes, time-bound sections).
  - `neet-ss`: Single-window entrance for Doctorate of Medicine (DM), Master of Chirurgiae (MCh), and DrNB Super Specialty courses (150 MCQs, 600 marks, 150 minutes, +4/-1).
  - `fmge`: Mandatory statutory screening test under the Screening Test Regulations, 2002 of NMC for Indian citizens with foreign medical degrees (300 MCQs, 300 marks, no negative marking; qualifying standard: 150/300 marks).
  - `neet-mds`: Single national entrance examination for Master of Dental Surgery (MDS) seats under DCI regulations (240 MCQs, 960 marks, 180 minutes).
  - `dnb-pdcet`: Centralized ranking exam for admission to 2-year Post Diploma DNB broad specialty seats across 14 disciplines (120 MCQs, 480 marks, 120 minutes).
  - `nbe-fet`: National entrance test for 2-year Post-Doctoral FNB and FPIS fellowship programmes (100 MCQs, 400 marks, 105 minutes).

### B. Institutes of National Importance (INI) & Central Hospitals (MoHFW)
- **JIPMER Puducherry (`jipmer`, `jipmer-nursing-officer`)**: Institute of National Importance under an Act of Parliament (JIPMER Act, 2008). MBBS admissions are conducted strictly through NEET-UG and MCC counselling (250 seats across Puducherry and Karaikal campuses). Clinical nursing officers are recruited via online CBT (100 MCQs, 400 marks, 90 mins) + Skill Test at Pay Level 7.
- **PGIMER Chandigarh (`pgimer-nursing-officer`)**: Institute of National Importance under the PGIMER Chandigarh Act, 1966. Direct recruitment for Nursing Officers and Store Keepers conducted via online CBT (100 MCQs, 100 marks, 100 mins, 0.25 negative marking; 75% nursing domain, 25% general aptitude) at Pay Level 7.
- **DGHS Central Hospitals (`dghs-safdarjung-nurse`)**: Directorate General of Health Services, MoHFW, administers premier central teaching hospitals in New Delhi (Safdarjung Hospital, Dr. Ram Manohar Lohia Hospital, Lady Hardinge Medical College & Associated Hospitals, Kalawati Saran Children's Hospital). Nursing staff are selected via centralized CBT at Pay Level 7.
- **Central Government Health Scheme (`cghs-pharmacist`)**: Comprehensive healthcare network for central government employees and pensioners under MoHFW. Pharmacists are appointed at Central 7th CPC Pay Level 5 (₹29,200 – ₹92,300).

### C. Employees' State Insurance Corporation (ESIC) & UPSC
- **Statutory Authority**: Statutory social security corporation established under the ESI Act, 1948 under the administrative jurisdiction of the Ministry of Labour & Employment, Government of India.
- **Examinations Covered**:
  - `esic-nursing-officer`: Conducted by the Union Public Service Commission (UPSC Special Advt. No. 52/2024, Vacancy No. 24035201707) for 1,930 Nursing Officer posts across ESIC hospitals nationwide. Selection is 100% based on the Recruitment Test (RT) at Pay Level 7 (entry basic ₹44,900).
  - `esic-paramedical`: Direct centralized recruitment by ESIC across 17 paramedical cadres (Pharmacist, Lab Tech, Radiographer) via single-tier CBT (100 questions, 150 marks, 120 mins) at Pay Level 5 (entry basic ₹29,200).
  - `esic-sso`: Direct recruitment of Social Security Officers (Manager Grade-II / Superintendent) via 3-phase process (Prelims CBT, Mains CBT, Computer Skill Test & Descriptive English) at Pay Level 7 (entry basic ₹44,900).

---

## 2. Dossier Summaries

### 2.1 `esic-nursing-officer`
- **Exam Title**: Employees' State Insurance Corporation (ESIC) Nursing Officer Exam
- **Assigned Tier**: A (Job exam — all 5 sections required and populated)
- **Sections Required**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Career Ladder**: Level 7 Nursing Officer (₹44,900 – ₹1,42,400) → Level 8 Senior Nursing Officer (₹47,600 – ₹1,51,100) → Level 10 Assistant Nursing Superintendent (₹56,100 – ₹1,77,500) → Level 11 Deputy Nursing Superintendent (₹67,700 – ₹2,08,700) → Level 12 Chief Nursing Officer (₹78,800 – ₹2,09,200).
- **Exam Scheme**: UPSC Recruitment Test (RT) offline OMR mode (2 hours, 100 marks, one-third negative marking, 100% selection weightage). Stage 2: Scrutiny and document verification.
- **Financial Package**: Level 7 entry basic ₹44,900; DA 58% constant (₹26,042); HRA (₹13,470 Class X / ₹8,980 Class Y); Transport Allowance (₹5,688); Nursing Allowance (₹7,200/mo); Uniform Allowance (₹1,800/mo). Gross ~₹99,100, In-Hand ~₹84,000–₹86,000.
- **Competition Benchmarks**: 2024: 1,930 vacancies (Advt. No. 52/2024) with ~2.75 lakh applicants registered (~1 in 142 selectivity).

### 2.2 `esic-paramedical`
- **Exam Title**: ESIC Paramedical Cadre Examination (Pharmacist, Lab Tech, Radiographer)
- **Assigned Tier**: A (Job exam — all 5 sections required and populated)
- **Sections Required**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Career Ladder**: Level 5 Pharmacist / JMLT / Radiographer (₹29,200 – ₹92,300) → Level 6 Senior Pharmacist / Senior MLT (₹35,400 – ₹1,12,400) → Level 7 Chief Pharmacist / Technical Officer (₹44,900 – ₹1,42,400) → Level 8 Senior Technical Officer / Assistant Director (Technical).
- **Exam Scheme**: Single-stage CBT (100 questions, 150 marks, 120 minutes, 0.25 negative marking): 50 Technical questions (100 marks), 10 General Awareness (10 marks), 20 General Intelligence (20 marks), 20 Arithmetic Ability (20 marks).
- **Financial Package**: Level 5 entry basic ₹29,200; DA 58% (₹16,936); HRA (₹8,760 Class X); TA (₹5,688); HPCA/PCA (₹4,100/mo). Gross ~₹64,684, In-Hand ~₹54,000–₹56,000.
- **Competition Benchmarks**: 2023: 1,038 vacancies across 17 cadres nationwide with ~1.85 lakh candidates appeared (~1 in 178 selectivity).

### 2.3 `neet-pg`
- **Exam Title**: National Eligibility cum Entrance Test (PG)
- **Assigned Tier**: B (Entrance exam — `career_ladder` and `financial_package` strictly omitted)
- **Sections Required**: `exam_scheme`, `official_downloads`
- **Sections Best Effort**: `competition_benchmarks` (populated)
- **Exam Scheme**: Single Computer Based Test (CBT), 200 MCQs, 800 marks (+4, -1), 210 minutes (3 hours 30 mins), structured into mandatory time-bound sections. Qualifying standard: 50th percentile for General/EWS, 40th percentile for SC/ST/OBC. Stage 2: Centralized AIQ & State online counselling.
- **Competition Benchmarks**: 2024: 2,16,136 test-takers appeared for ~52,000 PG seats (MD/MS/Diploma/DNB) (~1 in 4.1 overall selectivity). 2023: 2,08,898 test-takers for ~48,000 seats.

### 2.4 `jipmer`
- **Exam Title**: JIPMER MBBS Entrance (Now NEET)
- **Assigned Tier**: B (Entrance exam — `career_ladder` and `financial_package` strictly omitted)
- **Sections Required**: `exam_scheme`, `official_downloads`
- **Sections Best Effort**: `competition_benchmarks` (populated)
- **Exam Architecture**: Admissions governed under Section 14 of NMC Act, 2019 exclusively through NEET-UG (administered by NTA) followed by MCC AIQ counselling for 250 MBBS seats (200 Puducherry, 50 Karaikal). 200 MCQs (attempt 180), 720 marks (+4, -1), 200 minutes across Physics (45), Chemistry (45), Botany (45), Zoology (45).
- **Competition Benchmarks**: 2024: 250 MBBS seats out of 23.3 lakh NEET-UG test-takers (~1 in 9,333 selectivity); Puducherry Open category closing rank was AIR 277.

### 2.5 `esic-sso`
- **Exam Title**: Employees' State Insurance Corporation Social Security Officer
- **Assigned Tier**: B (Job exam — all sections populated)
- **Sections Required**: `exam_scheme`, `official_downloads`
- **Sections Best Effort**: `career_ladder`, `financial_package`, `competition_benchmarks` (all populated)
- **Career Ladder**: Level 7 SSO / Manager Grade-II (₹44,900 – ₹1,42,400) → Level 10 Assistant Director (₹56,100 – ₹1,77,500) → Level 11 Deputy Director (₹67,700 – ₹2,08,700) → Level 12 Joint Director (₹78,800 – ₹2,09,200) → Level 13 Director (₹1,23,100 – ₹2,15,900).
- **Exam Scheme**: Phase-I Preliminary CBT (100 MCQs, 100 marks, 60 mins, sectional timings); Phase-II Main CBT (150 MCQs, 200 marks, 120 mins); Phase-III Computer Skill Test (50 marks, 30 mins) & Descriptive English (50 marks, 30 mins).
- **Financial Package**: Level 7 entry basic ₹44,900; DA 58% (₹26,042); HRA Class X (₹13,470); Transport Allowance (₹5,688). Gross ~₹90,100, In-Hand ~₹78,000–₹80,000.
- **Competition Benchmarks**: 2022: 93 vacancies nationwide out of 1.52 lakh applicants (~1 in 1,634 selectivity).

### 2.6 `pgimer-nursing-officer`
- **Exam Title**: PGIMER Chandigarh Nursing Officer & Store Keeper Examination
- **Assigned Tier**: B (Job exam — all sections populated)
- **Sections Required**: `exam_scheme`, `official_downloads`
- **Sections Best Effort**: `career_ladder`, `financial_package`, `competition_benchmarks` (all populated)
- **Career Ladder**: Central nursing structure Level 7 to Level 12.
- **Exam Scheme**: Online CBT (100 MCQs, 100 marks, 100 minutes, 0.25 negative marking; 75% domain nursing, 25% general aptitude). Stage 2: Document verification.
- **Financial Package**: Level 7 entry basic ₹44,900; DA 58% (₹26,042); HRA Class Y Chandigarh (₹8,980); TA (₹5,688); Nursing Allowance (₹7,200/mo); Uniform Allowance (₹1,800/mo). Gross ~₹94,610, In-Hand ~₹80,000–₹82,000.
- **Competition Benchmarks**: 2022: 195 vacancies (PGIMER Chandigarh 165, Sangrur 30) out of 46,200 applicants (~1 in 237 selectivity).

### 2.7 `jipmer-nursing-officer`
- **Exam Title**: JIPMER Puducherry Nursing Officer & Medical Record Technician Exam
- **Assigned Tier**: B (Job exam — all sections populated)
- **Sections Required**: `exam_scheme`, `official_downloads`
- **Sections Best Effort**: `career_ladder`, `financial_package`, `competition_benchmarks` (all populated)
- **Career Ladder**: Central nursing structure Level 7 to Level 12.
- **Exam Scheme**: Online CBT (100 MCQs, 400 marks, 90 minutes, +4/-1; 70% Nursing subject, 30% General Knowledge, Reasoning, English, Mathematics). Stage 2: Qualifying Skill Test (minimum 50% pass mark).
- **Financial Package**: Level 7 entry basic ₹44,900; DA 58% (₹26,042); HRA Class Y Puducherry (₹8,980); TA (~₹2,844); Nursing Allowance (₹7,200/mo); Uniform Allowance (₹1,800/mo). Gross ~₹91,766, In-Hand ~₹78,000–₹80,000.
- **Competition Benchmarks**: 2022: 433 vacancies out of 62,400 applicants (~1 in 144 selectivity).

### 2.8 `dghs-safdarjung-nurse`
- **Exam Title**: DGHS Central Hospitals Staff Nurse & Technical Officer Examination
- **Assigned Tier**: B (Job exam — all sections populated)
- **Sections Required**: `exam_scheme`, `official_downloads`
- **Sections Best Effort**: `career_ladder`, `financial_package`, `competition_benchmarks` (all populated)
- **Institutions**: Safdarjung Hospital, Dr. Ram Manohar Lohia Hospital, Lady Hardinge Medical College, Kalawati Saran Children's Hospital in New Delhi.
- **Career Ladder**: Central nursing hierarchy Level 7 to Level 12.
- **Exam Scheme**: Centralized CBT (60 MCQs, 240 marks, 60 minutes, +4/-1 covering clinical nursing competencies and general aptitude).
- **Financial Package**: Level 7 entry basic ₹44,900; DA 58% (₹26,042); HRA Class X Delhi (₹13,470); TA (₹5,688); Nursing Allowance (₹7,200/mo); Uniform Allowance (₹1,800/mo). Gross ~₹99,100, In-Hand ~₹84,000–₹86,000.
- **Competition Benchmarks**: 2023: 487 vacancies across nursing and technical cadres out of ~1.12 lakh applicants (~1 in 230 selectivity).

### 2.9 `cghs-pharmacist`
- **Exam Title**: Central Government Health Scheme (CGHS) Pharmacist & MTS Examination
- **Assigned Tier**: B (Job exam — all sections populated)
- **Sections Required**: `exam_scheme`, `official_downloads`
- **Sections Best Effort**: `career_ladder`, `financial_package`, `competition_benchmarks` (all populated)
- **Career Ladder**: Level 5 Pharmacist (₹29,200 – ₹92,300) → Level 6 Senior Pharmacist (₹35,400 – ₹1,12,400) → Level 7 Chief Pharmacist (₹44,900 – ₹1,42,400) → Level 8 Assistant Director / Stores Officer.
- **Exam Scheme**: Computer Based Test (100 MCQs, 200 marks, 60 minutes, 0.50 negative marking): 50 questions Pharmacy Domain (100 marks), 20 General Intelligence (40 marks), 15 General Awareness (30 marks), 15 Quantitative Aptitude / English (30 marks).
- **Financial Package**: Level 5 entry basic ₹29,200; DA 58% (₹16,936); HRA Class X (₹8,760); TA (₹5,688); PCA (~₹4,100/mo). Gross ~₹64,684, In-Hand ~₹54,000–₹56,000.
- **Competition Benchmarks**: 2023: ~185 vacancies across major metropolitan wellness centres out of ~42,000 applicants (~1 in 227 selectivity).

### 2.10 `neet-ss`
- **Exam Title**: National Eligibility cum Entrance Test (Super Speciality)
- **Assigned Tier**: C (Entrance exam — `career_ladder` and `financial_package` strictly omitted)
- **Sections Required**: `official_downloads`
- **Sections Best Effort**: `exam_scheme` (populated), `competition_benchmarks` (populated)
- **Exam Scheme**: Single CBT paper per super specialty group, 150 MCQs, 600 marks (+4, -1), 150 minutes, testing curriculum of feeder broad specialty. Qualifying standard: 50th percentile.
- **Competition Benchmarks**: 2023: 15,261 candidates appeared for 4,466 DM/MCh/DrNB seats (~1 in 3.4 selectivity).

### 2.11 `fmge`
- **Exam Title**: Foreign Medical Graduate Examination
- **Assigned Tier**: C (Entrance/Screening exam — `career_ladder` and `financial_package` strictly omitted)
- **Sections Required**: `official_downloads`
- **Sections Best Effort**: `exam_scheme` (populated), `competition_benchmarks` (populated)
- **Exam Scheme**: Statutory screening test delivered via CBT in two parts: Part A (150 MCQs, 150 mins) + Part B (150 MCQs, 150 mins). Total 300 marks, no negative marking. Qualifying pass mark: 150/300 (50%).
- **Competition Benchmarks**: July 2024 session: 35,819 appeared, 7,233 passed (20.19%). December 2023 session: 38,535 appeared, 8,461 passed (21.95%).

### 2.12 `neet-mds`
- **Exam Title**: NEET MDS
- **Assigned Tier**: C (Entrance exam — `career_ladder` and `financial_package` strictly omitted)
- **Sections Required**: `official_downloads`
- **Sections Best Effort**: `exam_scheme` (populated), `competition_benchmarks` (populated)
- **Exam Scheme**: Single CBT paper, 240 MCQs, 960 marks (+4, -1), 180 minutes. Part A (100 MCQs medical foundations) + Part B (140 MCQs core dental surgery disciplines). Qualifying standard: 50th percentile for General/EWS, 40th percentile for SC/ST/OBC.
- **Competition Benchmarks**: 2024: 28,088 candidates appeared for ~6,500 MDS seats across dental colleges in India (~1 in 4.3 selectivity).

### 2.13 `dnb-pdcet`
- **Exam Title**: Diplomate of National Board Post Diploma Centralized Entrance Test
- **Assigned Tier**: C (Entrance exam — `career_ladder` and `financial_package` strictly omitted)
- **Sections Required**: `official_downloads`
- **Sections Best Effort**: `exam_scheme` (populated), `competition_benchmarks` (populated)
- **Exam Scheme**: Single CBT paper, 120 MCQs, 480 marks (+4, -1), 120 minutes. Tests specialty diploma curriculum across 14 post-diploma DNB broad specialties.
- **Competition Benchmarks**: 2023: 1,073 seats nationwide out of 4,650 post-diploma doctor test-takers (~1 in 4.3 selectivity).

### 2.14 `nbe-fet`
- **Exam Title**: Fellowship Entrance Test
- **Assigned Tier**: C (Entrance exam — `career_ladder` and `financial_package` strictly omitted)
- **Sections Required**: `official_downloads`
- **Sections Best Effort**: `exam_scheme` (populated), `competition_benchmarks` (populated)
- **Exam Scheme**: Single CBT paper, 100 MCQs, 400 marks (+4, -1), 105 minutes. Evaluates core feeder specialty syllabus and subspecialty competencies for 2-year FNB fellowship programmes.
- **Competition Benchmarks**: 2023: 520 FNB fellowship seats across subspecialties nationwide out of 3,650 post-graduate specialist test-takers (~1 in 7 selectivity).

---

## 3. Official Source Links & Connectivity Audit

All links cited in dossiers were curl/HTTP verified against official conducting body root portals and documents:

| Entity / Portal | Target URL | HTTP Status / Verification Note |
|---|---|:---:|
| **UPSC Official Portal** | `https://www.upsc.gov.in/` | HTTP 200 OK |
| **ESIC Official Portal** | `https://esic.gov.in/` | HTTP 200 OK |
| **NBEMS Examination Portal** | `https://natboard.edu.in` | HTTP 200 OK |
| **JIPMER Puducherry Portal** | `https://jipmer.edu.in` | HTTP 200 OK |
| **PGIMER Chandigarh Portal** | `https://pgimer.edu.in` | HTTP 200 OK |
| **DGHS MoHFW Portal** | `https://dghs.mohfw.gov.in` | HTTP 200 OK |
| **MoHFW Apex Portal** | `https://mohfw.gov.in` | HTTP 200 OK |
| **CGHS Official Portal** | `https://cghs.gov.in` | Conducted via MoHFW central health portal |

---

## 4. Downgrades and Exclusions

1. **Entrance Exam Sections Omission**:
   - `neet-pg`, `jipmer`, `neet-ss`, `fmge`, `neet-mds`, `dnb-pdcet`, and `nbe-fet` are statutory academic admission / licensing examinations. In strict accordance with schema rules (§2 of `validate-details.mjs`), `career_ladder` and `financial_package` keys are completely omitted.
2. **Competition Benchmarks Confidence**:
   - Total applicant and appeared numbers for high-volume examinations were assigned confidence `reported` with exact citations to official result press releases and press notes published by NBEMS, UPSC, ESIC, JIPMER, and DGHS.
3. **Canonical Project DA Standard**:
   - All 7 job examinations strictly enforce the canonical project constant:
     `"da_percent_as_of_review": 58, "da_as_of": "2025-07-01"`.
