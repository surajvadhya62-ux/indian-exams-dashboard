# Research Log: Unit 83 (u083) — Other State-Jurisdiction Recruiters — Madhya Pradesh

- **Unit ID**: `u083`
- **Batch ID**: `batch-7-state-other--madhya-pradesh`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts — proposed addition, flag for confirmation) — Madhya Pradesh`
- **Timestamp**: 2026-09-13T15:05:00+05:30
- **Status**: Completed (10/10 exams researched, written, verified, and validated)
- **Reviewer**: Antigravity Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 83 covers 10 premier non-MPPSC state-jurisdiction recruitment and eligibility examination bodies of Madhya Pradesh across subordinate services, law enforcement, subordinate judiciary, prison administration, technical engineering, women & child development, and agricultural admissions:

1. `mpesb-patwari`: MPESB Patwari & Combined Group-2 Sub-Group-4 Examination — **Tier A (Job)**
2. `mpesb-van-rakshak`: MPESB Van Rakshak (Forest Guard) & Kshetra Rakshak Exam — **Tier A (Job)**
3. `mp-police-constable`: Madhya Pradesh Police Constable (GD & Radio) Examination — **Tier A (Job)**
4. `mp-police-si`: Madhya Pradesh Police Sub-Inspector (Subedar & Platoon Commander) Exam — **Tier A (Job)**
5. `mp-judicial-service`: Madhya Pradesh Civil Judge (Junior Division) Examination — **Tier A (Job — High Court of MP)**
6. `mp-pat`: Madhya Pradesh Pre Agriculture Test — **Tier B (Entrance)**
7. `mpesb-jail-prahari`: MPESB Jail Prahari (Prison Warder) Examination — **Tier B (Job)**
8. `mpesb-sub-engineer`: MPESB Sub-Engineer Group-3 (Civil/Electrical/Mechanical) Exam — **Tier B (Job)**
9. `mpesb-mahila-supervisor`: MPESB Mahila Paryavekshak (Women Supervisor) Examination — **Tier B (Job)**
10. `mpesb-group-4`: MPESB Group-4 Assistant Grade-3, Steno & Typist Examination — **Tier B (Job)**

### Statutory Framework & Pay Architecture Standards:
- **Madhya Pradesh Civil Services (Revision of Pay) Rules, 2017 (7th Pay Commission Level Matrix)**:
  - All salary, compensation, and pay scales strictly derive from the **Madhya Pradesh Civil Services (Revision of Pay) Rules, 2017** and the **Second National Judicial Pay Commission (SNJPC)**:
    - **Level 4 (Pay Band ₹19,500 – ₹62,000, Entry Basic: ₹19,500)**: Police Constable, Van Rakshak (Forest Guard), Kshetra Rakshak, Jail Prahari, Assistant Grade-3, and Steno-Typist.
    - **Level 6 (Pay Band ₹25,300 – ₹80,500, Entry Basic: ₹25,300)**: Patwari (Department of Revenue) and Mahila Paryavekshak (Directorate of Women & Child Development).
    - **Level 8 (Pay Band ₹32,800 – ₹1,03,600, Entry Basic: ₹32,800)**: Sub-Engineer Group-3 (Civil / Electrical / Mechanical across PWD, WRD, PHE, RES, and Mandi Board).
    - **Level 9 (Pay Band ₹36,200 – ₹1,14,800, Entry Basic: ₹36,200)**: Police Sub-Inspector (District Executive Force, Special Armed Force, Subedar, and Technical SI).
    - **SNJPC Level J-1 (Pay Band ₹77,840 – ₹1,36,520, Entry Basic: ₹77,840)**: Civil Judge (Junior Division) / Judicial Magistrate First Class (JMFC) under the High Court of Madhya Pradesh.
- **Academic Entrance Omission**:
  - In strict compliance with Schema §5.4 and `RESEARCH-GUIDE.md`, `career_ladder` and `financial_package` are omitted entirely from `mp-pat.json` as it is an academic entrance test for university admissions (JNKVV Jabalpur and RVSKVV Gwalior).
- **Standardized Project Constants**:
  - All job dossiers enforce the repository-wide canonical constant of **58% DA** as of `2025-07-01` (`da_percent_as_of_review: 58`, `da_as_of: "2025-07-01"`).
  - Applicable state HRA tiers (8% to 16% of basic pay) and standard duty allowances (field allowances, stationery, uniform allowances, risk allowances) are modeled consistently across all cadres.

---

## 2. Examination Overview Table

| Exam ID | Title | Tier | Type | Conducting Body | Pay Level (Entry Basic) | Exam Pattern Summary | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :--- | :---: |
| `mpesb-patwari` | MPESB Patwari & Combined Group-2 SG-4 | A | job | MPESB | Level 6 (₹25,300) | Single CBT: Part A (100m) + Part B (100m) = 200 marks, 180 mins | **PASS** |
| `mpesb-van-rakshak` | MPESB Van Rakshak & Kshetra Rakshak | A | job | MPESB | Level 4 (₹19,500) | CBT (100m) + Physical Walking Test (Men 25km, Women 14km / 4 hrs) | **PASS** |
| `mp-police-constable` | MP Police Constable (GD & Radio) | A | job | MPESB | Level 4 (₹19,500) | Stage 1 CBT (100m) + Stage 2 PPT (100m: Run, Shot Put, Long Jump) | **PASS** |
| `mp-police-si` | MP Police Sub-Inspector & Subedar | A | job | MPESB | Level 9 (₹36,200) | Prelims (100m) + Mains CBT (600m) + PPT (100m) + Interview (50m) | **PASS** |
| `mp-judicial-service` | MP Civil Judge (Junior Division) | A | job | High Court of MP | SNJPC J-1 (₹77,840) | Prelims CBT (150m) + Mains 4 Papers (400m) + Viva-Voce (50m) | **PASS** |
| `mp-pat` | MP Pre Agriculture Test (PAT) | B | entrance | MPESB | N/A (Entrance) | Single CBT: 200 MCQs (Science or Agriculture streams), 180 mins | **PASS** |
| `mpesb-jail-prahari` | MPESB Jail Prahari (Prison Warder) | B | job | MPESB | Level 4 (₹19,500) | CBT (100m) + Physical Efficiency Test (800m Run + Shot Put) | **PASS** |
| `mpesb-sub-engineer` | MPESB Sub-Engineer Group-3 | B | job | MPESB | Level 8 (₹32,800) | Single CBT: Khand A General (100m) + Khand B Technical (100m) | **PASS** |
| `mpesb-mahila-supervisor` | MPESB Mahila Paryavekshak | B | job | MPESB | Level 6 (₹25,300) | Single CBT: 200 MCQs across 4 Sections (Nutrition, GK, Mgmt, Infant Care) | **PASS** |
| `mpesb-group-4` | MPESB Group-4 Assistant Grade-3 | B | job | MPESB | Level 4 (₹19,500) | Single CBT (100m) + CPCT Typing / Steno Skill Practical Test | **PASS** |

---

## 3. Detailed Exam Research Log

### 1. `mpesb-patwari` (Tier A, job)
- **Conducting Body**: Madhya Pradesh Employees Selection Board (MPESB / म.प्र. कर्मचारी चयन मंडल) (`https://esb.mp.gov.in`).
- **Target Cadre**: Patwari (Department of Revenue, Govt of MP) & Subordinate Staff under Group-2 Sub-Group-4.
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`.
- **Career Ladder**: Patwari (Level 6: ₹25,300 – ₹80,500) → Revenue Inspector / RI (Level 7: ₹28,700 – ₹91,300) → Naib Tehsildar (Level 9: ₹36,200 – ₹1,14,800) → Tehsildar (Level 10: ₹42,700 – ₹1,35,100) → Superintendent of Land Records (SLR) / Deputy Collector (Level 12: ₹56,100 – ₹1,77,500).
- **Exam Pattern**: Single combined written examination (CBT/OMR) with 200 questions (200 marks, 180 minutes):
  - Part A (100 marks): General Science (25), General Hindi (25), General English (25), General Mathematics (25).
  - Part B (100 marks): General Knowledge & Aptitude (25), Computer Knowledge (25), Reasoning Ability (25), General Management (25).
  - Followed by Stage 2: Document Verification & District Cadre Allocation.
- **Financial Package**: Level 6 (₹25,300 – ₹80,500). Entry Basic Pay: ₹25,300. DA: 58% (₹14,674). Gross estimate: ₹43,000 – ₹47,000. In-hand estimate: ₹37,000 – ₹41,000.
- **Competition Benchmarks**:
  - 2026 Cycle: 9,073 vacancies announced under Combined Group-2 Sub-Group-4 (including 6,755 Patwari posts).
  - 2023 Cycle: 9,735 vacancies; 12,79,000 applicants; 9,78,000 appeared. Cut-offs: UR Open 165.74, OBC Open 162.88, EWS Open 161.45, SC Open 153.21, ST Open 141.65.
- **Official Downloads Cited**:
  - MPESB Group-2 Sub-Group-4 & Patwari Recruitment Test 2026 Rulebook (`Group2_SG4_Patwari_rect_test_2026_Rulebook_04082026_v2.pdf`)

### 2. `mpesb-van-rakshak` (Tier A, job)
- **Conducting Body**: MPESB on behalf of the Madhya Pradesh Forest Department (`https://esb.mp.gov.in`).
- **Target Cadre**: Van Rakshak (Forest Guard) & Kshetra Rakshak.
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`.
- **Career Ladder**: Van Rakshak / Kshetra Rakshak (Level 4: ₹19,500 – ₹62,000) → Head Forest Guard / Vanpal (Level 5: ₹22,100 – ₹70,000) → Deputy Ranger / Up-Kshetrapal (Level 7: ₹28,700 – ₹91,300) → Forest Range Officer / Ranger (Level 9: ₹36,200 – ₹1,14,800) → Assistant Conservator of Forests / ACF (Level 12: ₹56,100 – ₹1,77,500).
- **Exam Pattern**:
  - Stage 1: Written Examination (CBT): 100 MCQs, 100 marks, 120 minutes (GK 20, Hindi 20, English 20, Maths 20, Science 20).
  - Stage 2: Physical Standard Test (PST) & Physical Efficiency Test (PET - Walking Test): Men must walk 25 km in 4 hours; Women must walk 14 km in 4 hours. Qualifying in nature.
  - Stage 3: Document Verification & Medical Examination.
- **Financial Package**: Level 4 (₹19,500 – ₹62,000). Entry Basic Pay: ₹19,500. DA: 58% (₹11,310). Gross estimate: ₹33,000 – ₹36,000. In-hand estimate: ₹28,000 – ₹31,000.
- **Competition Benchmarks**:
  - 2026 Cycle: 2,112 total vacancies across Van Rakshak and Kshetra Rakshak.
  - 2023 Cycle: 1,912 vacancies; 6,52,000 applicants; 4,80,000 appeared.
- **Official Downloads Cited**:
  - MPESB Van Rakshak, Kshetra Rakshak & Jail Prahari Recruitment Rulebook 2026 (`JAIL_VAN_2026_RuleBook_05032026.pdf`)
  - MPESB Van Rakshak & Jail Prahari 2023 Final Result Note (`Jail_van_2023_REsultNote_Final.pdf`)

### 3. `mp-police-constable` (Tier A, job)
- **Conducting Body**: MPESB for the Madhya Pradesh Police Department (`https://esb.mp.gov.in`).
- **Target Cadre**: Police Constable (General Duty / GD & Special Armed Force / SAF / Radio).
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`.
- **Career Ladder**: Constable GD/Radio (Level 4: ₹19,500 – ₹62,000) → Head Constable (Level 6: ₹25,300 – ₹80,500) → Assistant Sub-Inspector / ASI (Level 7: ₹28,700 – ₹91,300) → Sub-Inspector / SI (Level 9: ₹36,200 – ₹1,14,800) → Inspector / TI (Level 10: ₹42,700 – ₹1,35,100) → Deputy Superintendent of Police / DSP (Level 12: ₹56,100 – ₹1,77,500).
- **Exam Pattern**: Two-stage selection framework:
  - Stage 1: Written CBT (100 MCQs, 100 marks, 120 mins): General Knowledge & Reasoning (40m), Intellectual Ability & Mental Aptitude (30m), Science & Simple Arithmetic (30m).
  - Stage 2: Physical Proficiency Test (PPT) (100 marks): 800m Run (40m) + Shot Put (30m) + Long Jump (30m). Final merit is determined out of aggregate 200 marks (100 CBT + 100 PPT).
  - Stage 3: Physical Standard Test (PST) & Document Verification.
- **Financial Package**: Level 4 (₹19,500 – ₹62,000). Entry Basic Pay: ₹19,500. DA: 58% (₹11,310). Police Special Allowance and Kit Allowance included. Gross: ₹33,000 – ₹36,000. In-hand: ₹28,000 – ₹31,000.
- **Competition Benchmarks**:
  - 2026 Cycle: 7,500 vacancies (6,800 DEF/Radio + 700 SAF).
  - 2023 Cycle: 7,411 vacancies; 8,78,000 applicants; 6,45,000 appeared. Cut-off: UR Male 147.24 / 200 (CBT+PPT combined), OBC Male 143.56.
- **Official Downloads Cited**:
  - MPESB Police Constable (GD) Recruitment Test 2026 Rulebook (`PCRT_GD_2026_RuleBook_09092026.pdf`)
  - MP Police Constable Recruitment Test 2023 Final Result Note (`PCRT_Final2023_ResultNote.pdf`)
  - MP Police Constable Recruitment Test 2023 Final Cut-Off Marks (`PCRT_2023_Final_Cutoff.pdf`)

### 4. `mp-police-si` (Tier A, job)
- **Conducting Body**: MPESB for the Madhya Pradesh Police Department (`https://esb.mp.gov.in`).
- **Target Cadre**: Sub-Inspector (District Executive Force), Subedar, Platoon Commander (SAF), and Technical SI.
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`.
- **Career Ladder**: Sub-Inspector / Subedar / Platoon Commander (Level 9: ₹36,200 – ₹1,14,800) → Inspector of Police / TI (Level 10: ₹42,700 – ₹1,35,100) → Deputy Superintendent of Police / DSP (Level 12: ₹56,100 – ₹1,77,500) → Additional Superintendent of Police / Addl. SP (Level 13: ₹67,300 – ₹2,06,900) → Superintendent of Police / SP (Level 13A / 14).
- **Exam Pattern**: 4-stage selection procedure:
  - Stage 1: Preliminary Screening CBT: 100 MCQs, 100 marks, 120 minutes.
  - Stage 2: Main Written Examination (CBT, 600 marks): Paper I General Studies & Science (300 marks) + Paper II Language (Hindi 150m, English 100m) & Analytical Reasoning (50m) = 300 marks.
  - Stage 3: Physical Proficiency Test (PPT): 100 marks (800m Run, Long Jump, Shot Put with graded point tables).
  - Stage 4: Personal Interview: 50 marks. Final merit out of aggregate 750 marks (Mains 600 + PPT 100 + Interview 50).
- **Financial Package**: Level 9 (₹36,200 – ₹1,14,800). Entry Basic Pay: ₹36,200. DA: 58% (₹20,996). Police Executive Uniform & Investigation Allowance included. Gross: ₹61,000 – ₹66,000. In-hand: ₹53,000 – ₹57,000.
- **Competition Benchmarks**:
  - 2026 Cycle: 507 vacancies (Subedar 81, SI DEF 312, Platoon Commander 69, Technical 45).
  - 2025 Cycle: 480 vacancies; 2,15,000 applicants; 5,113 qualified for Stage 3 PPT.
- **Official Downloads Cited**:
  - MPESB Police Sub-Inspector & Subedar Recruitment Test 2026 Rulebook (`SI_Rulebook-2026_updated_09092026.pdf`)
  - MP Police Sub-Inspector & Subedar 2025 Final Result Note (`SI_Subedar_2025_ResultNote_Final.pdf`)

### 5. `mp-judicial-service` (Tier A, job)
- **Conducting Body**: Examination Cell, High Court of Madhya Pradesh (`https://mphc.gov.in`).
- **Target Cadre**: Civil Judge (Junior Division) / Judicial Magistrate First Class (JMFC).
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`.
- **Career Ladder**: Civil Judge (Junior Division) / JMFC (SNJPC J-1: ₹77,840 – ₹1,36,520) → Civil Judge (Senior Division) / CJM (SNJPC J-3: ₹1,11,000 – ₹1,63,030) → District Judge (Entry Level) (SNJPC J-5: ₹1,44,840 – ₹1,94,660) → District Judge (Selection Grade) (SNJPC J-6: ₹1,63,030 – ₹2,19,090) → Principal District & Sessions Judge (Super Time Scale) (SNJPC J-7: ₹1,99,100 – ₹2,24,100) → Elevated as Judge, High Court of Madhya Pradesh.
- **Exam Pattern**: Three-stage judicial selection framework:
  - Stage 1: Preliminary Online CBT (150 MCQs, 150 marks, 120 mins): Law subjects (105m), GK/Current Affairs (20m), Computer Knowledge (10m), English (15m). Qualifying threshold: 60% (90m) UR/OBC, 55% (82.5m) SC/ST.
  - Stage 2: Main Written Examination (4 Descriptive Papers over 2 days, 400 marks total): Paper I Civil Law & Procedure (100m), Paper II Writing, Translation & Framing of Issues (100m), Paper III Criminal Law & Procedure (100m), Paper IV Judgment Writing (Civil & Criminal) (100m).
  - Stage 3: Viva-Voce / Personal Interview: 50 marks. Final merit out of aggregate 450 marks (Mains 400 + Interview 50).
- **Financial Package**: Second National Judicial Pay Commission (SNJPC) Scale J-1 (₹77,840 – ₹1,36,520). Entry Basic Pay: ₹77,840. Judicial DA: 58% (₹45,147). Judicial allowances include Sumptuary Allowance, Robe Allowance, Electricity/Water allowance, and official vehicle/driver facility. Gross: ₹1,35,000 – ₹1,45,000. In-hand: ₹1,15,000 – ₹1,25,000.
- **Competition Benchmarks**:
  - 2022/2024 Cycle: 191 vacancies (60 regular + 131 backlog); 18,500 candidates appeared in Prelims; 1,842 qualified for Mains. Cut-off marks for Prelims: UR 123/150, OBC 118/150, SC 106/150, ST 88/150.
- **Official Downloads Cited**:
  - High Court of MP Civil Judge 2022 Final Result and Notification (`CJ Final Result-2022 along with notification.pdf`)
  - High Court of MP Civil Judge 2022 Online Preliminary Examination Result (`CJ Pre Result-2022.pdf`)

### 6. `mp-pat` (Tier B, entrance)
- **Conducting Body**: Madhya Pradesh Employees Selection Board (MPESB) (`https://esb.mp.gov.in`).
- **Target Course**: Admission to 4-Year B.Sc. (Hons) Agriculture, B.Sc. (Hons) Horticulture, B.Sc. (Hons) Forestry, and B.Tech (Agricultural Engineering) at Jawaharlal Nehru Krishi Vishwavidyalaya (JNKVV), Jabalpur and Rajmata Vijayaraje Scindia Krishi Vishwavidyalaya (RVSKVV), Gwalior.
- **Sections Populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`.
- **Sections Omitted**: `career_ladder`, `financial_package` (Entrance exam rule).
- **Exam Pattern**:
  - Single-stage Computer Based Test (CBT): 200 MCQs, 200 marks, 180 minutes duration. No negative marking.
  - Candidates choose between Science Stream (Physics 50, Chemistry 50, Mathematics 100 or Biology 100) or Agriculture Stream (Elements of Science & Mathematics useful for Agriculture / AG-1 100m, Crop Production & Horticulture / AG-2 50m, Animal Husbandry & Poultry Farming / AG-3 50m).
  - Stage 2: Centralized State Counseling & Seat Allotment based on normalized PAT merit.
- **Competition Benchmarks**:
  - 2026 Cycle: 1,220 total seats across constituent agriculture colleges; 16,725 admit cards issued, 12,550 appeared (4,175 absent).
- **Official Downloads Cited**:
  - MPESB Pre Agriculture Test (PAT) 2026 Official Rulebook (`PAT_2026_RULEBOOK_18032026.pdf`)
  - MPESB Pre Agriculture Test (PAT) 2026 Result Press Note (`PAT_2026_ResultNote.pdf`)

### 7. `mpesb-jail-prahari` (Tier B, job)
- **Conducting Body**: MPESB for the Jail Department, Government of Madhya Pradesh (`https://esb.mp.gov.in`).
- **Target Cadre**: Jail Prahari (Prison Warder / Executive Cadre).
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`.
- **Career Ladder**: Jail Prahari (Level 4: ₹19,500 – ₹62,000) → Head Warder / Mukhya Prahari (Level 6: ₹25,300 – ₹80,500) → Assistant Jailor (Level 7: ₹28,700 – ₹91,300) → Deputy Jailor (Level 9: ₹36,200 – ₹1,14,800) → Superintendent of District/Central Jail (Level 12: ₹56,100 – ₹1,77,500).
- **Exam Pattern**:
  - Stage 1: Written CBT: 100 MCQs, 100 marks, 120 mins across 5 sections (GK, Hindi, English, Maths, Science; 20 marks each).
  - Stage 2: Physical Efficiency Test (PET): 800m Run (Men 2m50s, Women 3m58s) and Shot Put (Men 20 ft with 7.26 kg ball, Women 16 ft with 4 kg ball).
  - Stage 3: Document Verification & Medical Board Examination.
- **Financial Package**: Level 4 (₹19,500 – ₹62,000). Entry Basic Pay: ₹19,500. DA: 58% (₹11,310). Gross: ₹33,000 – ₹36,000. In-hand: ₹28,000 – ₹31,000.
- **Competition Benchmarks**:
  - 2026 Cycle: 200 vacancies announced under combined advertisement with Forest Department.
  - 2023 Cycle: 200 vacancies; 3,84,000 applicants; 2,75,000 appeared.
- **Official Downloads Cited**:
  - MPESB Jail Prahari, Van Rakshak & Kshetra Rakshak Recruitment Rulebook 2026 (`JAIL_VAN_2026_RuleBook_05032026.pdf`)
  - MPESB Jail Prahari & Van Rakshak 2023 Final Result Note (`Jail_van_2023_REsultNote_Final.pdf`)

### 8. `mpesb-sub-engineer` (Tier B, job)
- **Conducting Body**: MPESB for various State Engineering Departments (PWD, WRD, PHE, RES, Mandi Board) (`https://esb.mp.gov.in`).
- **Target Cadre**: Sub-Engineer Group-3 (Civil, Electrical, Mechanical).
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`.
- **Career Ladder**: Sub-Engineer / Up-Yantri (Level 8: ₹32,800 – ₹1,03,600) → Assistant Engineer / SDO (Level 12: ₹56,100 – ₹1,77,500) → Executive Engineer / EE (Level 13: ₹67,300 – ₹2,06,900) → Superintending Engineer / SE (Level 14: ₹1,18,500 – ₹2,14,100) → Chief Engineer / E-in-C (Level 15/16).
- **Exam Pattern**:
  - Single Stage Written CBT: 200 MCQs, 200 marks, 180 minutes:
    - Khand A (100 marks): GK, Hindi, English, Mathematics, Reasoning, Science, Computer Knowledge.
    - Khand B (100 marks): Relevant Technical Engineering Domain (Civil, Mechanical, or Electrical).
  - Stage 2: Document Verification and Department Cadre Allocation.
- **Financial Package**: Level 8 (₹32,800 – ₹1,03,600). Entry Basic Pay: ₹32,800. DA: 58% (₹19,024). Gross: ₹55,000 – ₹60,000. In-hand: ₹48,000 – ₹52,000.
- **Competition Benchmarks**:
  - 2026 Cycle: 850 vacancies across civil, electrical, and mechanical disciplines.
  - 2024 Cycle: 483 vacancies; 25,022 admit cards; 18,310 appeared (6,712 absent).
- **Official Downloads Cited**:
  - MPESB Group-3 Sub-Engineer Recruitment Test 2026 Rulebook (`Group03_2026_Updated_27082026.pdf`)
  - MPESB Group-3 Sub-Engineer 2024 Result Press Note (`G3_2024_ResultNote.pdf`)

### 9. `mpesb-mahila-supervisor` (Tier B, job)
- **Conducting Body**: MPESB for Directorate of Women and Child Development (WCD), Government of MP (`https://esb.mp.gov.in`).
- **Target Cadre**: Mahila Paryavekshak (Women Supervisor / Direct & Anganwadi Quotas).
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`.
- **Career Ladder**: Mahila Paryavekshak (Level 6: ₹25,300 – ₹80,500) → Child Development Project Officer / CDPO (Level 9: ₹36,200 – ₹1,14,800) → District Programme Officer / DPO (Level 12: ₹56,100 – ₹1,77,500) → Joint Director / Deputy Director (Level 13: ₹67,300 – ₹2,06,900).
- **Exam Pattern**: Single stage written CBT: 200 MCQs, 200 marks, 180 mins:
  - Khand 1: Nutrition & Health (50m)
  - Khand 2: General Knowledge & Reasoning (50m)
  - Khand 3: Management Skills & Communication (50m)
  - Khand 4: Infant Care & Pre-school Education (50m)
- **Financial Package**: Level 6 (₹25,300 – ₹80,500). Entry Basic Pay: ₹25,300. DA: 58% (₹14,674). Field inspection allowance included. Gross: ₹43,000 – ₹47,000. In-hand: ₹37,000 – ₹41,000.
- **Competition Benchmarks**:
  - 2024 Cycle: 457 vacancies (Direct 228, Anganwadi Worker promotion 229); 1,82,400 applicants; 1,38,000 appeared. Cut-off: UR Open 154.21, OBC Open 149.85.
- **Official Downloads Cited**:
  - MPESB Mahila Paryavekshak 2024 Result Press Note (`Parvekshsk_2024_Resultnote.pdf`)
  - MPESB Mahila Paryavekshak 2024 Cut-Off Marks Summary (`Parvekshak_2024_cutoff.pdf`)

### 10. `mpesb-group-4` (Tier B, job)
- **Conducting Body**: MPESB for various State Govt Departments, Collectorates & Directorates (`https://esb.mp.gov.in`).
- **Target Cadre**: Assistant Grade-3, Steno-Typist, Stenographer, Data Entry Operator.
- **Sections Populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`.
- **Career Ladder**: Assistant Grade-3 / Steno-Typist (Level 4: ₹19,500 – ₹62,000) → Assistant Grade-2 (Level 6: ₹25,300 – ₹80,500) → Assistant Grade-1 / ASO (Level 7: ₹28,700 – ₹91,300) → Section Officer / SO (Level 9: ₹36,200 – ₹1,14,800) → Under Secretary / Avar Sachiv (Level 12: ₹56,100 – ₹1,77,500).
- **Exam Pattern**:
  - Stage 1: Written CBT: 100 MCQs, 100 marks, 120 mins (GK, Hindi, English, Maths, Computer, Aptitude).
  - Stage 2: Typing Skill Test & Stenography Practical Test (via MAP-IT CPCT scorecard validation and practical dictation).
  - Stage 3: Document Verification & Department Cadre Allocation.
- **Financial Package**: Level 4 (₹19,500 – ₹62,000). Entry Basic Pay: ₹19,500. DA: 58% (₹11,310). Gross: ₹33,000 – ₹36,000. In-hand: ₹28,000 – ₹31,000.
- **Competition Benchmarks**:
  - 2024 Cycle: 3,047 vacancies; 52,874 admit cards issued; 33,540 appeared (19,334 absent).
- **Official Downloads Cited**:
  - MPESB Group-4 Assistant Grade-3 2024 Result Press Note (`Group4_AG3_2024_Resultnote.pdf`)
  - MPESB Group-4 Assistant Grade-3 2024 Post-wise Cut-Off Marks (`Group4_AG3_2024_cutoff.pdf`)

---

## 4. Official Downloads & Liveness Audit

All official download documents were audited live during session review via HTTP requests:

| Exam ID | Document Type | URL | Status | Liveness |
| :--- | :--- | :--- | :---: | :---: |
| `mpesb-patwari` | Notification | `https://esb.mp.gov.in/Rulebooks/RB_2026/Group2_SG4_Patwari_rect_test_2026_Rulebook_04082026_v2.pdf` | **206/200** | Live |
| `mpesb-van-rakshak` | Notification | `https://esb.mp.gov.in/Rulebooks/RB_2026/JAIL_VAN_2026_RuleBook_05032026.pdf` | **206/200** | Live |
| `mpesb-van-rakshak` | Result Note | `https://esb.mp.gov.in/results/RESULT_23/JAIL_VAN_RES23/FINAL_RESULT/Jail_van_2023_REsultNote_Final.pdf` | **206/200** | Live |
| `mp-police-constable` | Notification | `https://esb.mp.gov.in/Rulebooks/RB_2026/PCRT_GD_2026_RuleBook_09092026.pdf` | **206/200** | Live |
| `mp-police-constable` | Result Note | `https://esb.mp.gov.in/results/RESULT_23/PCRT_RES23/FINAL_RESULT/PCRT_Final2023_ResultNote.pdf` | **206/200** | Live |
| `mp-police-constable` | Cut-Off | `https://esb.mp.gov.in/results/RESULT_23/PCRT_RES23/FINAL_RESULT/PCRT_2023_Final_Cutoff.pdf` | **206/200** | Live |
| `mp-police-si` | Notification | `https://esb.mp.gov.in/Rulebooks/RB_2026/SI_Rulebook-2026_updated_09092026.pdf` | **206/200** | Live |
| `mp-police-si` | Result Note | `https://esb.mp.gov.in/results/RESULT_25/SI_SUBEDAR_RES25/FINAL_RESULT/SI_Subedar_2025_ResultNote_Final.pdf` | **206/200** | Live |
| `mp-judicial-service` | Final Result | `https://mphc.gov.in/storage/PDF/web_pdf/RC/CJ%20Final%20Result-2022%20along%20with%20notification.pdf` | **206/200** | Live |
| `mp-judicial-service` | Prelims Result | `https://mphc.gov.in/storage/PDF/web_pdf/RC/CJ%20Pre%20Result-2022.pdf` | **206/200** | Live |
| `mp-pat` | Notification | `https://esb.mp.gov.in/Rulebooks/RB_2026/PAT_2026_RULEBOOK_18032026.pdf` | **206/200** | Live |
| `mp-pat` | Result Note | `https://esb.mp.gov.in/results/RESULT_26/PAT_RES26/PAT_2026_ResultNote.pdf` | **206/200** | Live |
| `mpesb-jail-prahari` | Notification | `https://esb.mp.gov.in/Rulebooks/RB_2026/JAIL_VAN_2026_RuleBook_05032026.pdf` | **206/200** | Live |
| `mpesb-jail-prahari` | Result Note | `https://esb.mp.gov.in/results/RESULT_23/JAIL_VAN_RES23/FINAL_RESULT/Jail_van_2023_REsultNote_Final.pdf` | **206/200** | Live |
| `mpesb-sub-engineer` | Notification | `https://esb.mp.gov.in/Rulebooks/RB_2026/Group03_2026_Updated_27082026.pdf` | **206/200** | Live |
| `mpesb-sub-engineer` | Result Note | `https://esb.mp.gov.in/results/RESULT_24/Group3_SUBENG_RES24/G3_2024_ResultNote.pdf` | **206/200** | Live |
| `mpesb-mahila-supervisor` | Result Note | `https://esb.mp.gov.in/results/RESULT_24/Parvekshak_MBV_RES24/Parvekshsk_2024_Resultnote.pdf` | **206/200** | Live |
| `mpesb-mahila-supervisor` | Cut-Off | `https://esb.mp.gov.in/results/RESULT_24/Parvekshak_MBV_RES24/Parvekshak_2024_cutoff.pdf` | **206/200** | Live |
| `mpesb-group-4` | Result Note | `https://esb.mp.gov.in/results/RESULT_24/Group4_AG3_Res24/Group4_AG3_2024_Resultnote.pdf` | **206/200** | Live |
| `mpesb-group-4` | Cut-Off | `https://esb.mp.gov.in/results/RESULT_24/Group4_AG3_Res24/Group4_AG3_2024_cutoff.pdf` | **206/200** | Live |

---

## 5. Verification and Sanity Checklist

- [x] All 10 dossiers exist at `public/exam-details/<id>.json`.
- [x] All top-level keys conform strictly to schema v1 (`id`, `schema_version`, `last_reviewed`, `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`).
- [x] All confidence and status enumerations conform to allowed values (`available`, `not_available`, `verified`, `reported`, `estimate`).
- [x] Academic entrance exam (`mp-pat`) correctly omits `career_ladder` and `financial_package`.
- [x] Job examinations feature complete career progression chains and explicit Level / Pay Group definitions.
- [x] Standardized 58% DA constant as of 2025-07-01 enforced on all job exams.
- [x] Ran `node scripts/data-sourcing/validate-details.mjs`: **PASS (0 errors, 0 warnings)**.
- [x] Production build `npm run build` executed and succeeded cleanly.
