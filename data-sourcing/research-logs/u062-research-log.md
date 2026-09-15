# Research Log: Unit 62 (u062) — Other State-Jurisdiction Recruiters — Ladakh

- **Unit ID**: `u062`
- **Batch ID**: `batch-7-state-other--ladakh`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts — proposed addition, flag for confirmation) — Ladakh`
- **Timestamp**: 2026-09-13T11:10:00+05:30
- **Status**: Completed (2/2 exams researched, written, and validated)
- **Reviewer**: Antigravity Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 62 covers public subordinate and graduate recruitment examinations conducted across the Union Territory of Ladakh by the Ladakh Subordinate Services Recruitment Board (LAHDC Leh SSRB / Kargil DSSRB) and the Staff Selection Commission (SSC Selection Posts Ladakh):

1. `ladakh-ssrb-matric`: Ladakh Subordinate Services Recruitment Board (SSRB) Matric Level Exam — **Tier B (Job)**
2. `ladakh-ssrb-graduate`: Ladakh Administration SSRB Graduate Level Executive & Clerical Exam — **Tier B (Job)**

Both exams were researched in depth using primary notifications, statutory rules, syllabus documents, official answer keys, and empirical selection/counselling lists published across official government domains (`ladakh.gov.in`, `lahdssrb.in`, `leh.nic.in`, and `kargil.nic.in`):

- **Institutional Cadre & Dual-Track Recruitment Architecture**:
  - District Cadre posts are recruited directly by the autonomous District Subordinate Services Recruitment Boards (DSSRB) established under the Ladakh Autonomous Hill Development Council Acts:
    - **Leh District**: Leh Autonomous Hill Development–Subordinate Services Recruitment Board (LAHD-SSRB, `www.lahdssrb.in` / `leh.nic.in`).
    - **Kargil District**: Kargil Subordinate Services Recruitment Board (LAHDC-KSSRB / DSSRB Kargil, `kargil.nic.in`).
  - Divisional and UT-Cadre posts are recruited under a formal institutional MoU by the **Staff Selection Commission (SSC)** via the "Selection Posts / Ladakh" examinations (categorized into Matriculation Level, 10+2 Level, and Graduate & Above Level).
  - All posts are strictly reserved for permanent residents of the Union Territory of Ladakh, mandating a valid **Resident Certificate** / Domicile Certificate issued under the Ladakh Civil Services Decentralization and Recruitment Rules.

- **Pay Architecture & 7th CPC Alignment**:
  - Following the J&K Reorganisation Act, 2019, UT Ladakh civil posts follow the Central 7th CPC pay structure adopted by the UT Administration of Ladakh:
    - Subordinate staff (`ladakh-ssrb-matric`):
      - Entry Level SL-1: ₹14,800 – ₹47,100 (Basic ₹14,800) for Orderly, Peon, Attendant, Chowkidar, Safaiwala, Farash.
      - Entry Level 2: ₹19,900 – ₹63,200 (Basic ₹19,900) for Driver Grade-II, Wildlife Guard, Forest Guard.
    - Graduate executive and clerical cadres (`ladakh-ssrb-graduate`):
      - Entry Level 4: ₹25,500 – ₹81,100 (Basic ₹25,500) for Junior Assistant, Patwari, Wasil Baqi Nawis (WBN), Auditor Induscos.
      - Entry Level 5: ₹29,200 – ₹92,300 (Basic ₹29,200) for Panchayat Account Assistant, Accounts Assistant, Junior Statistical Assistant.
      - Entry Level 6B: ₹35,600 – ₹1,12,800 (Basic ₹35,600) for Statistical Assistant, Junior Stenographer.
      - Entry Level 6E: ₹35,900 – ₹1,13,500 (Basic ₹35,900) for Naib Tehsildar, Legal Assistant, Prosecuting Officer.
  - Standardized Dearness Allowance of **58%** as of `2025-07-01` (`da_percent_as_of_review: 58`, `da_as_of: "2025-07-01"`) applied uniformly across both dossiers.
  - Distinctive UT of Ladakh compensation packages include Special Compensatory (Remote Locality) Allowance (SCRLA) / Special Duty Allowance (SDA), High Altitude Allowance, heating allowance / winter subsidy, and 10% HRA (Class Z category for Leh/Kargil).

- **Examination Scheme & Standardization**:
  - Standardized single-tier objective examination (OMR-based by LAHD-SSRB; Computer Based Test / CBE by SSC) consisting of 4 parts:
    1. Part A: General Intelligence (25 questions)
    2. Part B: General Awareness (25 questions)
    3. Part C: Quantitative Aptitude (25 questions — Basic Arithmetic for Matric; Advanced Mathematics for Graduate)
    4. Part D: English Language (25 questions — Basic Knowledge for Matric; Advanced Comprehension/Grammar for Graduate)
  - LAHD-SSRB: 100 questions, 100 marks, 90 minutes (1 hour 30 min), negative marking of -0.25.
  - SSC Selection Posts Ladakh: 100 questions, 200 marks, 60 minutes, negative marking of -0.50.
  - Qualifying Skill/Trade Tests where prescribed (35 wpm typing on computer for Junior Assistant; 65/35 wpm for Steno; practical driving test for Driver; 25 km in 4 hours walking endurance test for Forest/Wildlife Guards).
  - Document Verification shortlisting ratio: 1:20 (vacancies <= 5) and 1:10 (vacancies > 5, minimum 100).

- **Validation**:
  - Executed `scripts/data-sourcing/validate-details.mjs`: **PASS (0 errors, 0 warnings)** across all 244 dossier files in the repository.

| Exam ID | Title | Tier | Type | Entry Basic Pay | Primary Cycle | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `ladakh-ssrb-matric` | Ladakh SSRB Matric Level Exam | B | job | ₹14,800 (Scale SL-1 ₹14,800–₹47,100) / ₹19,900 (Level 2) | Advt 01/2025: 346 Vacancies / ~9,380 Applicants | **PASS** |
| `ladakh-ssrb-graduate` | Ladakh SSRB Graduate Level Executive & Clerical Exam | B | job | ₹25,500 (Level 4 ₹25,500–₹81,100) / ₹35,900 (Level 6E) | Advt 01/2025: 112 Vacancies / ~6,260 Applicants | **PASS** |

---

## 2. Detailed Exam Logs

### `ladakh-ssrb-matric` (Tier B, job)
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 sections populated from primary statutory notifications and official releases, exceeding the Tier B minimum).
- **Sections marked not_available**: None.
- **Sections omitted**: None.
- **Sources OPENED and read this session**:
  - LAHD-SSRB Advertisement Notice No. 01 of 2025 PDF (`AdvertisementNoticeNo01OF2025dated16072025-a8110b238ef30d419ea49503c58129ae.pdf`, F.No. SECY/LAHD-SSRB/2025/520-48 dated 16-07-2025; read 38 pages, verified Section 11 Scheme of Examination: 100 questions, 100 marks, 90 minutes, 0.25 negative marking; verified Annexure-XVI post list: Orderly SL-1 ₹14,800–₹47,100, Driver Grade-II Level 2 ₹19,900–₹63,200, Wildlife Guard Level 2, Safaiwala SL-1).
  - LAHD-SSRB Provisional Select List for 346 Matric Level Posts PDF (`ProvisionalSelectlistofcandidatesandallocationofDepartmentagainstthe346MatricLevelpostsadvertisedvideAdvertisementNoticeNo01of2025dated16072025Reg-e811de06c6bd49922716b3bdd2332236.pdf`, F.No. SECY/LAHD-SSRB/ADV01/25/Prov-Select-List/222-54 dated 22-01-2026; confirmed written exam held on 30-11-2025, 581 candidates shortlisted for counselling, roll numbers spanning 1050004 to 1059379).
  - LAHD-SSRB Matric Level Examination Official Answer Key PDF (`TentativeAnswerKeysforMatricLevelExaminationheldon07052023-c1c8e62bbf3ec9b9a98d54e587d4a134.pdf`; confirmed 100 questions objective structure).
  - UT Administration of Ladakh SSC Corner (`https://ladakh.gov.in/ssc-corner/`; confirmed categorization into Matriculation, 10+2, and Graduate & Above, 797 posts breakdown, pay level structure, and syllabus).
  - LAHD-SSRB Indicative Syllabus page (`https://www.lahdssrb.in/syllabus`; verified exact syllabus components for Matriculation level).
- **Sources only status-checked, not read**:
  - `https://ladakh.gov.in` (HTTP 200 OK).
  - `https://ladakh.gov.in/recruitment-corner/` (HTTP 200 OK).
  - `https://www.lahdssrb.in` (HTTP 200 OK).
  - `https://leh.nic.in` (HTTP 200 OK).
  - `https://kargil.nic.in` (HTTP 200 OK).
- **Links curl-checked**:
  - `https://ladakh.gov.in` -> HTTP 200 OK
  - `https://ladakh.gov.in/recruitment-corner/` -> HTTP 200 OK
  - `https://ladakh.gov.in/ssc-corner/` -> HTTP 200 OK
  - `https://www.lahdssrb.in` -> HTTP 200 OK
  - `https://www.lahdssrb.in/syllabus` -> HTTP 200 OK
  - `https://leh.nic.in` -> HTTP 200 OK
  - `https://kargil.nic.in` -> HTTP 200 OK
  - `https://www.lahdssrb.in/file_uploads/advertisement/attachment/AdvertisementNoticeNo01OF2025dated16072025-a8110b238ef30d419ea49503c58129ae.pdf` -> HTTP 200 OK
  - `https://www.lahdssrb.in/file_uploads/selectionlist/attachment/ProvisionalSelectlistofcandidatesandallocationofDepartmentagainstthe346MatricLevelpostsadvertisedvideAdvertisementNoticeNo01of2025dated16072025Reg-e811de06c6bd49922716b3bdd2332236.pdf` -> HTTP 200 OK
  - `https://www.lahdssrb.in/file_uploads/notices/attachment/TentativeAnswerKeysforMatricLevelExaminationheldon07052023-c1c8e62bbf3ec9b9a98d54e587d4a134.pdf` -> HTTP 200 OK
- **Could NOT confirm, and why**: Exact individual category-wise applicant count breakdown across all individual village blocks of Zanskar and Changthang (aggregate applicant pool verified via candidate roll numbering).
- **Confidence downgrades made, and why**: Historical 2022 applicant pool marked `reported` due to lack of a unified single-sheet applicant release across both LAHDSSRB and SSC.

---

### `ladakh-ssrb-graduate` (Tier B, job)
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 sections populated from primary statutory notifications and official releases, exceeding the Tier B minimum).
- **Sections marked not_available**: None.
- **Sections omitted**: None.
- **Sources OPENED and read this session**:
  - LAHD-SSRB Advertisement Notice No. 01 of 2025 PDF (`AdvertisementNoticeNo01OF2025dated16072025-a8110b238ef30d419ea49503c58129ae.pdf`; verified 112 Graduate Level posts: Junior Assistant Level 4 ₹25,500–₹81,100, Patwari Level 4, Wasil Baqi Nawis Level 4, Panchayat Account Assistant Level 5 ₹29,200–₹92,300, Steno-Typist Level 4, Wildlife Forester Level 5).
  - LAHD-SSRB Provisional Select List for 112 Graduate Level Posts PDF (`ProvisionalSelectlistofcandidatesandallocationofDepartmentagainstthe112GraduateLevelpostsadvertisedvideAdvertisementNoticeNo01of2025dated16072025Reg-e4fb72c83105b973170a523d19e81985.pdf`, F.No. SECY/LAHD-SSRB/ADV01/25/Prov-Select-List/1655-77 dated 18-07-2026; confirmed written exam held on 19-04-2026, typing test held on 02-06-2026 at NIELIT Leh, 235 candidates shortlisted for counselling, roll numbers spanning 1550007 to 1556268).
  - LAHD-SSRB Graduate Level Examination Official Answer Key PDF (`TentativeAnswerKeysforGraduationLevelExaminationheldon14052023-be5527ba422edf03ed72cc291c5fcf80.pdf`; confirmed 100 questions objective structure held on 14.05.2023).
  - UT Administration of Ladakh SSC Corner (`https://ladakh.gov.in/ssc-corner/`; verified Graduate Level posts including Junior Assistant Level 4, Statistical Assistant Level 6B ₹35,600–₹1,12,800, Naib Tehsildar Level 6E ₹35,900–₹1,13,500, Prosecuting Officer Level 6E, Accounts Assistant Level 5).
  - LAHD-SSRB Indicative Syllabus page (`https://www.lahdssrb.in/syllabus`; verified exact syllabus components for Graduation & above level).
- **Sources only status-checked, not read**:
  - `https://ladakh.gov.in` (HTTP 200 OK).
  - `https://ladakh.gov.in/recruitment-corner/` (HTTP 200 OK).
  - `https://www.lahdssrb.in` (HTTP 200 OK).
  - `https://leh.nic.in` (HTTP 200 OK).
  - `https://kargil.nic.in` (HTTP 200 OK).
- **Links curl-checked**:
  - `https://ladakh.gov.in` -> HTTP 200 OK
  - `https://ladakh.gov.in/recruitment-corner/` -> HTTP 200 OK
  - `https://ladakh.gov.in/ssc-corner/` -> HTTP 200 OK
  - `https://www.lahdssrb.in` -> HTTP 200 OK
  - `https://www.lahdssrb.in/syllabus` -> HTTP 200 OK
  - `https://leh.nic.in` -> HTTP 200 OK
  - `https://kargil.nic.in` -> HTTP 200 OK
  - `https://www.lahdssrb.in/file_uploads/advertisement/attachment/AdvertisementNoticeNo01OF2025dated16072025-a8110b238ef30d419ea49503c58129ae.pdf` -> HTTP 200 OK
  - `https://www.lahdssrb.in/file_uploads/selectionlist/attachment/ProvisionalSelectlistofcandidatesandallocationofDepartmentagainstthe112GraduateLevelpostsadvertisedvideAdvertisementNoticeNo01of2025dated16072025Reg-e4fb72c83105b973170a523d19e81985.pdf` -> HTTP 200 OK
  - `https://www.lahdssrb.in/file_uploads/notices/attachment/TentativeAnswerKeysforGraduationLevelExaminationheldon14052023-be5527ba422edf03ed72cc291c5fcf80.pdf` -> HTTP 200 OK
- **Could NOT confirm, and why**: Exact division of applicants between Leh and Kargil examination sub-centres for UT cadre Selection Posts.
- **Confidence downgrades made, and why**: 2022 applicant pool marked `reported` due to lack of a unified single-sheet applicant publication.
