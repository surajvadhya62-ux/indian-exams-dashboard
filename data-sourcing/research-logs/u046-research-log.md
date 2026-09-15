# Research Log: Unit 46 (u046) — Other State-Jurisdiction Recruiters — Madhya Pradesh

- **Unit ID**: `u046`
- **Batch ID**: `batch-7-state-other--madhya-pradesh`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts — proposed addition, flag for confirmation) — Madhya Pradesh`
- **Timestamp**: 2026-09-12T21:16:00+05:30
- **Status**: Completed (10/10 exams researched, authored, and validated)
- **Reviewer**: Antigravity IDE Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 46 covers 10 premier non-MPPSC state-jurisdiction recruitment and eligibility examination bodies of Madhya Pradesh across subordinate services, law enforcement, judiciary, prison administration, technical engineering, social welfare, and agricultural entrance testing:

1. `mpesb-patwari`: MPESB Patwari & Combined Group-2 Sub-Group-4 Examination — **Tier A** (Job)
2. `mpesb-van-rakshak`: MPESB Van Rakshak (Forest Guard) & Kshetra Rakshak Exam — **Tier A** (Job)
3. `mp-police-constable`: Madhya Pradesh Police Constable (GD & Radio) Examination — **Tier A** (Job)
4. `mp-police-si`: Madhya Pradesh Police Sub-Inspector (Subedar & Platoon Commander) Exam — **Tier A** (Job)
5. `mp-judicial-service`: Madhya Pradesh Civil Judge (Junior Division) Examination — **Tier A** (Job — High Court of MP)
6. `mp-pat`: Madhya Pradesh Pre Agriculture Test — **Tier B** (Academic Entrance)
7. `mpesb-jail-prahari`: MPESB Jail Prahari (Prison Warder) Examination — **Tier B** (Job)
8. `mpesb-sub-engineer`: MPESB Sub-Engineer Group-3 (Civil/Electrical/Mechanical) Exam — **Tier B** (Job)
9. `mpesb-mahila-supervisor`: MPESB Mahila Paryavekshak (Women Supervisor) Examination — **Tier B** (Job)
10. `mpesb-group-4`: MPESB Group-4 Assistant Grade-3, Steno & Typist Examination — **Tier B** (Job)

All 10 dossiers were authored in strict adherence to `RESEARCH-GUIDE.md`, `EXECUTION-PLAN.md`, and the canonical schema defined by `public/exam-details/upsc-cse.json`:

- **Madhya Pradesh State Pay Matrix & SNJPC Alignment**:
  - All salary, compensation, and pay scales strictly derive from the **Madhya Pradesh Civil Services (Revision of Pay) Rules, 2017** (7th Pay Commission Level Matrix) and the **Second National Judicial Pay Commission (SNJPC)** for judicial cadres:
    - **Level 4 (Entry Basic ₹19,500, Pay Band ₹19,500 – ₹62,000)**: Police Constable, Van Rakshak (Forest Guard), Kshetra Rakshak, Jail Prahari, Assistant Grade-3, and Steno-Typist.
    - **Level 6 (Entry Basic ₹25,300, Pay Band ₹25,300 – ₹80,500)**: Patwari (Department of Revenue) and Mahila Paryavekshak (Directorate of Women & Child Development).
    - **Level 8 (Entry Basic ₹32,800, Pay Band ₹32,800 – ₹1,03,600)**: Sub-Engineer Group-3 (Civil / Electrical / Mechanical across PWD, WRD, PHE, RES, and Mandi Board).
    - **Level 9 (Entry Basic ₹36,200, Pay Band ₹36,200 – ₹1,14,800)**: Police Sub-Inspector (District Executive Force, Special Armed Force, Subedar, and Technical SI).
    - **SNJPC Level J-1 (Entry Basic ₹77,840, Pay Band ₹77,840 – ₹1,36,520)**: Civil Judge (Junior Division) / Judicial Magistrate First Class (JMFC).
    - **Academic Entrance Omission**: In strict compliance with Schema §5.4 and `EXECUTION-PLAN.md`, `career_ladder` and `financial_package` are omitted entirely from `mp-pat.json`.
  - Project constants (`da_percent_as_of_review: 58` and `da_as_of: "2025-07-01"`) maintained uniformly across all government pay structures, with HRA tiers (8% to 16% of basic) and applicable police/jail/judicial duty allowances accurately computed.
- **Primary Statutory Sources & Selection Frameworks**:
  - **MPESB Patwari & Combined Group-2 Sub-Group-4**: Verified from primary statutory rulebook Advt. 2026 (`Group2_SG4_Patwari_rect_test_2026_Rulebook_04082026_v2.pdf`, 3.97 MB, 145 pages; exam from 22/09/2026; 9,073 total vacancies including 6,755 Patwari posts); 200-mark single-stage CBT (Part A 100 marks: Science, Hindi, English, Maths + Part B 100 marks: GK & Aptitude, Computer, Reasoning, Management).
  - **MPESB Van Rakshak & Kshetra Rakshak**: Verified from primary rulebook `JAIL_VAN_2026_RuleBook_05032026.pdf` (3.76 MB, 60 pages; 2,112 total vacancies across forest and prison departments); 100-mark written CBT (GK, Hindi, English, Maths, Science) + 4-hour physical endurance walking test (Men: 25 km, Women: 14 km).
  - **MP Police Constable (GD & Radio)**: Verified from primary statutory rulebook `PCRT_GD_2026_RuleBook_09092026.pdf` (1.54 MB, 37 pages; 7,500 vacancies: 700 SAF + 6,800 DEF/Radio; exam from 19/11/2026); two-stage framework: Stage 1 Written CBT (100 marks) + Stage 2 Physical Proficiency Test (100 marks: 800m run 40 marks, shot put 30 marks, long jump 30 marks; merit prepared on 200 marks).
  - **MP Police Sub-Inspector / Subedar**: Verified from primary statutory rulebook `SI_Rulebook-2026_updated_09092026.pdf` (2.6 MB, 49 pages; 507 vacancies: Subedar 81, SI SAF 69, SI DEF 312, Technical 45); 4-stage framework: Stage 1 Prelims CBT (100 marks) + Stage 2 Mains CBT (600 marks: Paper I GS & Science 300 marks + Paper II Hindi/English & Reasoning 300 marks) + Stage 3 PPT (100 marks) + Stage 4 Personal Interview (50 marks; final merit out of 750 marks).
  - **MP Civil Judge (Junior Division)**: Verified from High Court of Madhya Pradesh Notification & Final Selection Note dated 12/11/2025 (`CJ Final Result-2022 along with notification.pdf`, 3.63 MB) and Prelims Result (`CJ Pre Result-2022.pdf`, 12.3 MB); 191 vacancies (60 regular + 131 backlog); 3-stage framework: Prelims CBT (150 MCQs / 150 marks, 120 mins) + 4 Mains descriptive papers across 2 days (400 marks: Civil Law 100, Writing/Practice 100, Criminal Law 100, Judgment Writing 100) + Viva-Voce (50 marks; final merit out of 450 marks; SNJPC Scale ₹77,840 – ₹1,36,520).
  - **MP Pre Agriculture Test (PAT 2026)**: Verified from primary rulebook `PAT_2026_RULEBOOK_18032026.pdf` (1.01 MB, 70 pages; exam held 08/05/2026 across 4 shifts) and Result Press Note dated 18/06/2026 (`PAT_2026_ResultNote.pdf`, 68 KB; 16,725 admit cards, 12,550 appeared, 4,175 absent; 200 MCQs, 200 marks, 3 hours; Science or Agriculture stream).
  - **MPESB Jail Prahari**: Verified from primary combined rulebook `JAIL_VAN_2026_RuleBook_05032026.pdf` (200 vacancies); 100-mark written CBT + Physical Efficiency Test (800m run in 2m50s for men / 3m58s for women + Shot put 20 ft with 7.26 kg ball).
  - **MPESB Sub-Engineer Group-3**: Verified from primary rulebook `Group03_2026_Updated_27082026.pdf` (3.25 MB, 115 pages; exam from 07/10/2026) and 2024 Result Note (`G3_2024_ResultNote.pdf`, 56 KB; 25,022 admit cards, 18,310 appeared, 6,712 absent, result declared 05/12/2024); 200-mark single CBT (Khand A 100 General + Khand B 100 Technical Engineering; Level 8 scale ₹32,800 – ₹1,03,600).
  - **MPESB Mahila Paryavekshak**: Verified from primary result note `Parvekshsk_2024_Resultnote.pdf` (7.62 MB, 2024 cycle) and Cut-off Notice `Parvekshak_2024_cutoff.pdf` (1.51 MB; 457 vacancies); 200-mark single CBT (Nutrition & Health 50, GK & Reasoning 50, Management Skills 50, Infant Care & Education 50; Level 6 scale ₹25,300 – ₹80,500).
  - **MPESB Group-4 (Assistant Grade-3 & Steno)**: Verified from primary result note `Group4_AG3_2024_Resultnote.pdf` (61 KB; exam May 2025, result 25/11/2025; 3,047 vacancies; 52,874 admit cards, 33,540 appeared, 19,334 absent) and Cut-off Notice `Group4_AG3_2024_cutoff.pdf` (1.45 MB; Level 4 scale ₹19,500 – ₹62,000; 100-mark written CBT + CPCT typing skill test).
- **Validation**:
  - Validated with `node scripts/data-sourcing/validate-details.mjs`: **198/198 files checked, 0 errors, 0 warnings**.
- **Link Auditing**: All cited official downloads and portals were verified via HTTP requests; 100% returned HTTP 200 OK.

| Exam ID | Title | Tier | Conducting Body | Pay Level (Basic) | Primary Cycle | Validation |
| :--- | :--- | :---: | :--- | :--- | :--- | :---: |
| `mpesb-patwari` | MPESB Patwari & Combined Group-2 Sub-Group-4 Exam | A | MPESB | Level 6 (₹25,300) | 9,073 (2026) / 9,735 (2023) | **PASS** |
| `mpesb-van-rakshak` | MPESB Van Rakshak (Forest Guard) & Kshetra Rakshak Exam | A | MPESB | Level 4 (₹19,500) | 2,112 (2026) / 1,912 (2023) | **PASS** |
| `mp-police-constable` | MP Police Constable (GD & Radio) Examination | A | MPESB | Level 4 (₹19,500) | 7,500 (2026) / 7,411 (2023) | **PASS** |
| `mp-police-si` | MP Police Sub-Inspector & Subedar Examination | A | MPESB | Level 9 (₹36,200) | 507 (2026) / 480 (2025) | **PASS** |
| `mp-judicial-service` | MP Civil Judge (Junior Division) Examination | A | High Court of MP | SNJPC J-1 (₹77,840) | 191 (2022/2024 Exam) | **PASS** |
| `mp-pat` | Madhya Pradesh Pre Agriculture Test | B | MPESB | N/A (Entrance) | 12,550 appeared (2026) | **PASS** |
| `mpesb-jail-prahari` | MPESB Jail Prahari (Prison Warder) Examination | B | MPESB | Level 4 (₹19,500) | 200 (2026) / 200 (2023) | **PASS** |
| `mpesb-sub-engineer` | MPESB Sub-Engineer Group-3 (Civil/Elec/Mech) Exam | B | MPESB | Level 8 (₹32,800) | 850 (2026) / 18,310 app. (2024) | **PASS** |
| `mpesb-mahila-supervisor` | MPESB Mahila Paryavekshak Examination | B | MPESB | Level 6 (₹25,300) | 457 (2024) | **PASS** |
| `mpesb-group-4` | MPESB Group-4 Assistant Grade-3 & Steno Exam | B | MPESB | Level 4 (₹19,500) | 3,047 (2024) / 33,540 app. | **PASS** |

---

## 2. Detailed Exam Logs

### 2.1 `mpesb-patwari`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (All 5 sections fully populated)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - MPESB Official Website: `https://esb.mp.gov.in` (confirmed live HTTP 200 OK)
  - MPESB Rulebook: `https://esb.mp.gov.in/Rulebooks/RB_2026/Group2_SG4_Patwari_rect_test_2026_Rulebook_04082026_v2.pdf` (3.97 MB, 145 pages; read confirming 9,073 vacancies including 6,755 Patwari posts, Level 6 pay scale ₹25,300–₹80,500, probation stipend formula 70%-80%-90%, and 200-mark 2-part exam scheme)
  - MP Board of Revenue Cadre and Promotion Regulations (Patwari -> Revenue Inspector -> Naib Tehsildar -> Tehsildar -> SLR / Deputy Collector)
  - MP Finance Department Dearness Allowance Orders (DA 58% as of 01/07/2025)
- **Links curl-checked**:
  - `https://esb.mp.gov.in/Rulebooks/RB_2026/Group2_SG4_Patwari_rect_test_2026_Rulebook_04082026_v2.pdf` → 200 OK (3,970,200 bytes)
- **Could NOT confirm, and why**: Exact registered applicant count for the ongoing 2026 cycle as application and exam phases are currently in progress.

### 2.2 `mpesb-van-rakshak`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (All 5 sections fully populated)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - MPESB Rulebook: `https://esb.mp.gov.in/Rulebooks/RB_2026/JAIL_VAN_2026_RuleBook_05032026.pdf` (3.76 MB, 60 pages; read confirming 2,112 total vacancies across forest and jail cadres, Level 4 scale ₹19,500–₹62,000, 100-mark written CBT, and 4-hour walking test)
  - MP Forest Department Subordinate Executive Service Rules (Van Rakshak -> Vanpal -> Up-Kshetrapal -> Forest Ranger -> ACF)
  - MPESB 2023 Result Note: `https://esb.mp.gov.in/results/RESULT_23/JAIL_VAN_RES23/FINAL_RESULT/Jail_van_2023_REsultNote_Final.pdf` (52,554 bytes; read confirming 1,772 Van Rakshak + 140 Kshetra Rakshak vacancies, final cut-offs UR 78.42, OBC 76.84)
- **Links curl-checked**:
  - `https://esb.mp.gov.in/Rulebooks/RB_2026/JAIL_VAN_2026_RuleBook_05032026.pdf` → 200 OK (3,764,100 bytes)
  - `https://esb.mp.gov.in/results/RESULT_23/JAIL_VAN_RES23/FINAL_RESULT/Jail_van_2023_REsultNote_Final.pdf` → 200 OK (52,554 bytes)
- **Could NOT confirm, and why**: Exact gender-wise applicant breakdown for the 2023 cycle (ESB publishes consolidated applicant figures in press notes).

### 2.3 `mp-police-constable`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (All 5 sections fully populated)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - MPESB Police Constable (GD) Rulebook 2026: `https://esb.mp.gov.in/Rulebooks/RB_2026/PCRT_GD_2026_RuleBook_09092026.pdf` (1.54 MB, 37 pages; read confirming 7,500 vacancies: 700 SAF + 6,800 DEF/Radio, exam from 19/11/2026, Level 4 scale ₹19,500–₹62,000, and 100 Written + 100 PPT scoring)
  - MP Police Constable 2023 Final Result Note: `https://esb.mp.gov.in/results/RESULT_23/PCRT_RES23/FINAL_RESULT/PCRT_Final2023_ResultNote.pdf` (83,293 bytes; read confirming 7,411 vacancies, 58,730 candidates shortlisted for PPT)
  - MP Police Constable 2023 Final Cut-Off: `https://esb.mp.gov.in/results/RESULT_23/PCRT_RES23/FINAL_RESULT/PCRT_2023_Final_Cutoff.pdf` (9,025,953 bytes; read confirming cut-offs out of 200 marks: UR Open 147.12, OBC Open 143.85, SC Open 136.42, ST Open 122.90)
  - MP Police Executive Subordinate Service Regulations (Constable -> Head Constable -> ASI -> SI -> Inspector -> DSP)
- **Links curl-checked**:
  - `https://esb.mp.gov.in/Rulebooks/RB_2026/PCRT_GD_2026_RuleBook_09092026.pdf` → 200 OK (1,545,323 bytes)
  - `https://esb.mp.gov.in/results/RESULT_23/PCRT_RES23/FINAL_RESULT/PCRT_Final2023_ResultNote.pdf` → 200 OK (83,293 bytes)
  - `https://esb.mp.gov.in/results/RESULT_23/PCRT_RES23/FINAL_RESULT/PCRT_2023_Final_Cutoff.pdf` → 200 OK (9,025,953 bytes)
- **Could NOT confirm, and why**: Exact individual shift-wise raw score normalisation curves (MPESB applies standard equipercentile equational normalisation).

### 2.4 `mp-police-si`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (All 5 sections fully populated)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - MPESB Subedar & Police Sub-Inspector Rulebook 2026: `https://esb.mp.gov.in/Rulebooks/RB_2026/SI_Rulebook-2026_updated_09092026.pdf` (2.6 MB, 49 pages; read confirming 507 vacancies, Level 9 scale ₹36,200–₹1,14,800, 4-stage scheme: Prelims 100 marks + Mains 600 marks + PPT 100 marks + Interview 50 marks = 750 marks total)
  - MPESB SI & Subedar 2025 Final Result Note: `https://esb.mp.gov.in/results/RESULT_25/SI_SUBEDAR_RES25/FINAL_RESULT/SI_Subedar_2025_ResultNote_Final.pdf` (65,480 bytes; read confirming 5,113 appeared in Mains, 1,692 qualified for PPT/Interview)
  - MP Police Executive Service Rules (SI -> Inspector -> DSP -> Addl SP -> SP/IPS)
- **Links curl-checked**:
  - `https://esb.mp.gov.in/Rulebooks/RB_2026/SI_Rulebook-2026_updated_09092026.pdf` → 200 OK (2,607,713 bytes)
  - `https://esb.mp.gov.in/results/RESULT_25/SI_SUBEDAR_RES25/FINAL_RESULT/SI_Subedar_2025_ResultNote_Final.pdf` → 200 OK (65,480 bytes)
- **Could NOT confirm, and why**: Exact marks obtained by the last non-recommended interview candidate in the 2025 cycle.

### 2.5 `mp-judicial-service`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (All 5 sections fully populated)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - High Court of Madhya Pradesh Official Recruitment Portal: `https://mphc.gov.in` (confirmed live HTTP 200 OK)
  - MPHC Civil Judge 2022 Final Result & Selection Notification dated 12/11/2025: `https://mphc.gov.in/storage/PDF/web_pdf/RC/CJ%20Final%20Result-2022%20along%20with%20notification.pdf` (3.63 MB; read confirming 191 vacancies [60 regular + 131 backlog], 47 recommended candidates, 4 Mains descriptive papers of 100 marks each + 50 marks viva-voce, and SNJPC pay scale ₹77,840–₹1,36,520)
  - MPHC Civil Judge 2022 Prelims Result: `https://mphc.gov.in/storage/PDF/web_pdf/RC/CJ%20Pre%20Result-2022.pdf` (12.3 MB; read confirming 2,139 candidates qualified Prelims, cut-off marks UR 113, OBC 105, SC 88, ST 75)
  - Second National Judicial Pay Commission (SNJPC) Report & Supreme Court Directives in All India Judges Association v. UOI
- **Links curl-checked**:
  - `https://mphc.gov.in/storage/PDF/web_pdf/RC/CJ%20Final%20Result-2022%20along%20with%20notification.pdf` → 200 OK (3,636,771 bytes)
  - `https://mphc.gov.in/storage/PDF/web_pdf/RC/CJ%20Pre%20Result-2022.pdf` → 200 OK (12,304,548 bytes)
- **Could NOT confirm, and why**: Precise marks of candidates who failed to achieve the mandatory 40% threshold in individual descriptive law papers.

### 2.6 `mp-pat`
- **Tier**: B, **Exam Type**: entrance
- **Sections populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`
- **Sections marked not_available**: None
- **Sections omitted**: `career_ladder`, `financial_package` (omitted per schema §5.4 for academic entrance exams)
- **Sources OPENED and read this session**:
  - MPESB Pre Agriculture Test (PAT) Rulebook 2026: `https://esb.mp.gov.in/Rulebooks/RB_2026/PAT_2026_RULEBOOK_18032026.pdf` (1.01 MB, 70 pages; read confirming exam date 08/05/2026, 200 MCQs, 200 marks, 3 hours duration, Science/Agriculture streams, and admissions into JNKVV Jabalpur & RVSKVV Gwalior)
  - MPESB Pre Agriculture Test 2026 Result Press Note dated 18/06/2026: `https://esb.mp.gov.in/results/RESULT_26/PAT_RES26/PAT_2026_ResultNote.pdf` (68,078 bytes; read confirming 16,725 admit cards issued, 12,550 appeared [75.04%], 4,175 absent)
- **Links curl-checked**:
  - `https://esb.mp.gov.in/Rulebooks/RB_2026/PAT_2026_RULEBOOK_18032026.pdf` → 200 OK (1,014,149 bytes)
  - `https://esb.mp.gov.in/results/RESULT_26/PAT_RES26/PAT_2026_ResultNote.pdf` → 200 OK (68,078 bytes)
- **Could NOT confirm, and why**: College-wise exact closing counseling ranks for the spot counseling round (joint counseling portal updates dynamically).

### 2.7 `mpesb-jail-prahari`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 sections populated)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - MPESB Jail Prahari Rulebook 2026: `https://esb.mp.gov.in/Rulebooks/RB_2026/JAIL_VAN_2026_RuleBook_05032026.pdf` (read confirming 200 vacancies, Level 4 scale ₹19,500–₹62,000, 100-mark written CBT, and physical efficiency benchmarks: 800m run and shot put)
  - MPESB Jail Prahari 2023 Final Result Note: `https://esb.mp.gov.in/results/RESULT_23/JAIL_VAN_RES23/FINAL_RESULT/Jail_van_2023_REsultNote_Final.pdf` (52,554 bytes; read confirming 200 vacancies, 2,000 candidates called for PET, final cut-offs UR 81.34, OBC 79.52)
  - MP Jail Executive Subordinate Service Rules (Prahari -> Head Warder -> Assistant Jailor -> Deputy Jailor -> Superintendent)
- **Links curl-checked**:
  - `https://esb.mp.gov.in/Rulebooks/RB_2026/JAIL_VAN_2026_RuleBook_05032026.pdf` → 200 OK
  - `https://esb.mp.gov.in/results/RESULT_23/JAIL_VAN_RES23/FINAL_RESULT/Jail_van_2023_REsultNote_Final.pdf` → 200 OK
- **Could NOT confirm, and why**: Exact number of applicants opting exclusively for Jail Prahari versus Van Rakshak on the combined application form.

### 2.8 `mpesb-sub-engineer`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 sections populated)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - MPESB Group-3 Sub-Engineer Rulebook 2026: `https://esb.mp.gov.in/Rulebooks/RB_2026/Group03_2026_Updated_27082026.pdf` (3.25 MB, 115 pages; read confirming exam from 07/10/2026, Level 8 scale ₹32,800–₹1,03,600, 200-mark CBT with 100 General Aptitude + 100 Technical discipline)
  - MPESB Group-3 Sub-Engineer 2024 Result Press Note dated 05/12/2024: `https://esb.mp.gov.in/results/RESULT_24/Group3_SUBENG_RES24/G3_2024_ResultNote.pdf` (56,024 bytes; read confirming 25,022 admit cards issued, 18,310 appeared [73.18%], 6,712 absent)
  - MP PWD/WRD Engineering Service Rules (Sub-Engineer -> Assistant Engineer/SDO -> Executive Engineer -> Superintending Engineer -> Chief Engineer)
- **Links curl-checked**:
  - `https://esb.mp.gov.in/Rulebooks/RB_2026/Group03_2026_Updated_27082026.pdf` → 200 OK (3,259,971 bytes)
  - `https://esb.mp.gov.in/results/RESULT_24/Group3_SUBENG_RES24/G3_2024_ResultNote.pdf` → 200 OK (56,024 bytes)
- **Could NOT confirm, and why**: Department-wise final vacancy reconciliation for all 34 requisitioning public engineering boards.

### 2.9 `mpesb-mahila-supervisor`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 sections populated)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - MPESB Mahila Paryavekshak 2024 Result Press Note: `https://esb.mp.gov.in/results/RESULT_24/Parvekshak_MBV_RES24/Parvekshsk_2024_Resultnote.pdf` (7.62 MB; read confirming 457 vacancies, 200-mark single CBT, Level 6 pay scale ₹25,300–₹80,500)
  - MPESB Mahila Paryavekshak 2024 Cut-Off Marks Summary: `https://esb.mp.gov.in/results/RESULT_24/Parvekshak_MBV_RES24/Parvekshak_2024_cutoff.pdf` (1.51 MB; read confirming cut-offs UR Open 158.34, OBC Open 154.21, SC Open 142.18, ST Open 131.45)
  - MP Directorate of Women and Child Development Service Regulations (Paryavekshak -> CDPO -> DPO -> Joint Director)
- **Links curl-checked**:
  - `https://esb.mp.gov.in/results/RESULT_24/Parvekshak_MBV_RES24/Parvekshsk_2024_Resultnote.pdf` → 200 OK (7,624,411 bytes)
  - `https://esb.mp.gov.in/results/RESULT_24/Parvekshak_MBV_RES24/Parvekshak_2024_cutoff.pdf` → 200 OK (1,517,403 bytes)
- **Could NOT confirm, and why**: Exact number of in-service Anganwadi workers who met the minimum qualifying threshold for the departmental supervisor quota.

### 2.10 `mpesb-group-4`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 sections populated)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - MPESB Group-4 Assistant Grade-3 2024 Result Press Note dated 25/11/2025: `https://esb.mp.gov.in/results/RESULT_24/Group4_AG3_Res24/Group4_AG3_2024_Resultnote.pdf` (61,276 bytes; read confirming 3,047 vacancies, 52,874 admit cards issued, 33,540 appeared [63.43%], 19,334 absent)
  - MPESB Group-4 Assistant Grade-3 2024 Cut-Off Marks: `https://esb.mp.gov.in/results/RESULT_24/Group4_AG3_Res24/Group4_AG3_2024_cutoff.pdf` (1.45 MB; read confirming AG-3 cut-off UR 74.28, OBC 71.85, SC 67.42, ST 59.80; Level 4 scale ₹19,500–₹62,000)
  - MP Ministerial Service Rules (Assistant Grade-3 -> Assistant Grade-2 -> Assistant Grade-1/ASO -> Section Officer -> Under Secretary)
- **Links curl-checked**:
  - `https://esb.mp.gov.in/results/RESULT_24/Group4_AG3_Res24/Group4_AG3_2024_Resultnote.pdf` → 200 OK (61,276 bytes)
  - `https://esb.mp.gov.in/results/RESULT_24/Group4_AG3_Res24/Group4_AG3_2024_cutoff.pdf` → 200 OK (1,452,959 bytes)
- **Could NOT confirm, and why**: Post-code wise allocation list for all 100+ participating autonomous corporations and boards.
