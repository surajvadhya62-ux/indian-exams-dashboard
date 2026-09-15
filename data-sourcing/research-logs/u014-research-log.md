# Research Log: Unit 14 (u014) — Major State Public Service Commissions — Andhra Pradesh

- **Unit ID**: `u014`
- **Batch ID**: `batch-4-state-psc--andhra-pradesh`
- **Label**: Major State Public Service Commissions (State Administrative Services) — Andhra Pradesh
- **Timestamp**: 2026-09-11T21:48:00+05:30
- **Status**: Completed (6/6 exams researched, written, and validated)
- **Reviewer**: Antigravity IDE Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 14 encompasses the 6 major statutory public examinations administered in Andhra Pradesh by the Andhra Pradesh Public Service Commission (APPSC) and the Andhra Pradesh State Council of Higher Education (APSCHE):

1. `ap-icet`: Andhra Pradesh Integrated Common Entrance Test (conducted by Andhra University on behalf of APSCHE) — **Tier B** (Entrance)
2. `appsc-group-4`: APPSC Group-4 Junior Assistant cum Computer Assistant Exam (in Revenue Department) — **Tier B** (Job)
3. `ap-eamcet`: Andhra Pradesh Engineering, Agriculture and Medical Common Entrance Test (AP EAPCET, conducted by JNTU Kakinada on behalf of APSCHE) — **Tier C** (Entrance)
4. `appsc`: Andhra Pradesh Public Service Commission Group-1 Services Examination — **Tier C** (Job)
5. `ap-ecet`: Andhra Pradesh Engineering Common Entrance Test for Diploma Holders and B.Sc. Maths (conducted by JNTU Anantapur on behalf of APSCHE) — **Tier C** (Entrance)
6. `ap-lawcet`: Andhra Pradesh Law Common Entrance Test & AP PGLCET (conducted by Sri Padmavati Mahila Visvavidyalayam on behalf of APSCHE) — **Tier C** (Entrance)

### Adherence to Standards:
- **State Pay Trap Avoided (§5.3)**: State posts are compensated under the Andhra Pradesh Revised Pay Scales (RPS) 2022 (11th Pay Revision Commission, implemented via G.O.Ms.No.1 Finance (PC-TA) Dept dt 17.01.2022) with verified entry scales:
  - `appsc` (Group-1): Scale 21 (₹61,960 - ₹1,51,370) with entry basic ₹61,960.
  - `appsc-group-4`: Scale 7 (₹25,220 - ₹80,910, pre-revised ₹16,400 - ₹49,870) with entry basic ₹25,220.
- **Project DA Constant (§5.2)**: All job dossiers apply `da_percent_as_of_review: 58` and `da_as_of: "2025-07-01"`.
- **Entrance Exam Rules (§5.4)**: `ap-icet`, `ap-eamcet`, `ap-ecet`, and `ap-lawcet` omit `career_ladder` and `financial_package` entirely as absent keys.
- **Primary PDF Verification**: Primary documents for all 6 exams were downloaded via curl and inspected directly via `pdftotext`:
  - `/tmp/apicet_booklet.pdf` (8 pages, 826 KB)
  - `/tmp/appsc_23_2021.pdf` (26 pages, 522 KB)
  - `/tmp/eapcet_booklet.pdf` (20 pages, 1.3 MB)
  - `/tmp/appsc_group1_notfn.pdf` (6 pages, 279 KB) & `/tmp/appsc_group1_details.pdf` (26 pages)
  - `/tmp/ecet_booklet.pdf` (9 pages, 290 KB)
  - `/tmp/lawcet_booklet.pdf` (11 pages, 889 KB)
- **Validation**: All 6 files pass `node scripts/data-sourcing/validate-details.mjs` with **0 errors** and **0 warnings**.

| Exam ID | Title | Tier | Type | Entry Basic Pay / Intake | Primary Cycle | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `ap-icet` | Andhra Pradesh Integrated Common Entrance Test | B | entrance | MBA & MCA admissions | 2026 Cycle | **PASS** |
| `appsc-group-4` | APPSC Group-4 Junior Assistant cum Computer Assistant | B | job | AP Scale 7 (₹25,220) | Notif 23/2021 (670 posts) | **PASS** |
| `ap-eamcet` | AP Engineering, Agriculture & Medical CET (EAPCET) | C | entrance | B.Tech / B.Pharm admissions | 2026 Cycle | **PASS** |
| `appsc` | APPSC Group-1 Services Examination | C | job | AP Scale 21 (₹61,960) | Notif 12/2023 (81 posts) | **PASS** |
| `ap-ecet` | AP Engineering Common Entrance Test (Lateral Entry) | C | entrance | 2nd Year B.Tech / B.Pharm | 2026 Cycle | **PASS** |
| `ap-lawcet` | AP Law Common Entrance Test (3-Yr / 5-Yr LLB & LLM) | C | entrance | LL.B / LL.M admissions | 2026 Cycle | **PASS** |

---

## 2. Detailed Exam Logs

### 2.1 `ap-icet`
- **Tier**: B, **Exam Type**: entrance
- **Sections populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`
- **Sections marked not_available**: None
- **Sections omitted**: `career_ladder`, `financial_package` (per §5.4 for entrance exams)
- **Sources OPENED and read this session**:
  - `https://cets.apsche.ap.gov.in/ICET/PDF/APICET2026_InstructionBooklet_V2.pdf` — downloaded to `/tmp/apicet_booklet.pdf` and read with `pdftotext`. Verified 200 multiple-choice questions (75 Analytical, 70 Communication, 55 Mathematical), 150 minutes duration, zero negative marking, 25% qualifying mark for OC/BC (50/200), and no minimum qualifying mark for SC/ST.
  - `https://cets.apsche.ap.gov.in/ICET/ICET/ICET_HomePage.aspx` — verified navigation links, important dates (exam date: 02-05-2026), syllabus links, and master question paper links.
- **Sources only status-checked, not read**:
  - APSCHE Main Portal (`https://cets.apsche.ap.gov.in`)
- **Links curl-checked**:
  - `https://cets.apsche.ap.gov.in/ICET/PDF/APICET2026_InstructionBooklet_V2.pdf` → 200 OK (GET) / 401 (HEAD — APSCHE server blocks HEAD method)
  - `https://cets.apsche.ap.gov.in/ICET/ICET/ICET_HomePage.aspx` → 200 OK (GET)
  - `https://cets.apsche.ap.gov.in/ICET/ICET/ICET_ExamPapersKeys.aspx` → 200 OK (GET)
- **Could NOT confirm, and why**: Exact seat vacancy count for MBA/MCA across all participating state universities varies every year depending on university council affiliations and AICTE seat approvals; noted in benchmarks note.
- **Confidence downgrades made, and why**: Benchmark statistics (48,828 registered, 44,446 appeared in 2024; 49,162 registered, 44,343 appeared in 2023) marked `reported` because they are attributed to official APSCHE post-result press releases.

---

### 2.2 `appsc-group-4`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections marked not_available**: None
- **Sections omitted**: None (job examination)
- **Sources OPENED and read this session**:
  - `https://psc.ap.gov.in/Documents/NotificationDocuments/23_2021.pdf` — downloaded to `/tmp/appsc_23_2021.pdf` (26 pages) and read with `pdftotext`. Verified Notification No. 23/2021 dated 28/12/2021 for 670 posts across 13 districts, pre-revised pay scale ₹16,400 - ₹49,870, two-stage exam scheme (Screening: 150 questions/150 marks; Mains: 300 questions/300 marks; Computer Proficiency Test: 50 marks/30 mins), and 1/3rd negative marking under G.O.Ms.No.235 Finance.
  - Andhra Pradesh Revised Pay Scales 2022 (G.O.Ms.No.1 Finance Department dated 17.01.2022) — confirmed conversion of Junior Assistant scale to Scale 7 (₹25,220 - ₹80,910).
  - `https://portal-psc.ap.gov.in/HomePages/JuniorAsst_Cum_ComputerAsst_232021_MarksList` — verified district results portal and mark lists for Notification No. 23/2021.
- **Sources only status-checked, not read**:
  - AP Ministerial Service Rules 1998
- **Links curl-checked**:
  - `https://psc.ap.gov.in/Documents/NotificationDocuments/23_2021.pdf` → 200 OK (GET) / 302 (HEAD)
  - `https://portal-psc.ap.gov.in/HomePages/JuniorAsst_Cum_ComputerAsst_232021_MarksList` → 200 OK (GET)
  - `https://portal-psc.ap.gov.in/HomePages/RecruitmentNotifications` → 200 OK (GET)
- **Could NOT confirm, and why**: Exact allowance rates for mandal-level postings vary by rural/urban categorisation (HRA 8% vs 16%); estimated range covers typical district classifications.
- **Confidence downgrades made, and why**: Benchmark statistics (2,11,341 candidates appeared for screening test on 31-07-2022; 11,574 qualified for Mains) marked `reported` based on official APPSC result releases.

---

### 2.3 `ap-eamcet`
- **Tier**: C, **Exam Type**: entrance
- **Sections populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`
- **Sections marked not_available**: None
- **Sections omitted**: `career_ladder`, `financial_package` (per §5.4 for entrance exams)
- **Sources OPENED and read this session**:
  - `https://cets.apsche.ap.gov.in/EAPCET/PDF/APEAPCET2026_Instruction_Booklet_Engineering_V4.pdf` — downloaded to `/tmp/eapcet_booklet.pdf` (20 pages) and read with `pdftotext`. Verified 160 questions (80 Maths, 40 Physics, 40 Chemistry), 180 minutes duration, zero negative marking, 25% qualifying mark for General/BC (40/160), no minimum qualifying marks for SC/ST, and 75:25 ranking formula (75% EAPCET + 25% Inter group marks).
  - `https://cets.apsche.ap.gov.in/EAPCET/` — verified official portal, notification dates (04-02-2026), and engineering syllabus stream documents.
- **Sources only status-checked, not read**:
  - Board of Intermediate Education, AP syllabus archives
- **Links curl-checked**:
  - `https://cets.apsche.ap.gov.in/EAPCET/PDF/APEAPCET2026_Instruction_Booklet_Engineering_V4.pdf` → 200 OK (GET)
  - `https://cets.apsche.ap.gov.in/EAPCET/` → 200 OK (GET)
- **Could NOT confirm, and why**: Vacancies are not applicable for entrance exams; college seat matrix is governed by annual APSCHE convenor/management quota web counseling.
- **Confidence downgrades made, and why**: Benchmark candidate registration and appearance counts (2,74,213 registered and 2,58,374 appeared in Engineering in 2024; 2,38,180 registered and 2,24,724 appeared in 2023) marked `reported` from official APSCHE result declarations.

---

### 2.4 `appsc`
- **Tier**: C, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections marked not_available**: None
- **Sections omitted**: None (job examination)
- **Sources OPENED and read this session**:
  - `https://psc.ap.gov.in/Documents/NotificationDocuments/Notfn_Group_I_2023%20with%20Syllabus_122023_08122023.pdf` — downloaded to `/tmp/appsc_group1_notfn.pdf` (6 pages) and read with `pdftotext`. Verified Notification No. 12/2023 dated 08/12/2023 for 81 posts, 3-stage examination scheme (Prelims: Paper I 120 marks + Paper II 120 marks, 1/3rd negative marking; Mains: Telugu qualifying 150m, English qualifying 150m, Papers I to V 150m each = 750m; Interview: 75m; Total: 825m).
  - `https://psc.ap.gov.in/Documents/NotificationDocuments/Details_for_Group_1_Notfn_2023_122023_27122023.pdf` — downloaded to `/tmp/appsc_group1_details.pdf` (26 pages) and read with `pdftotext`. Verified Post Codes 01 to 03 (Deputy Collector, Assistant Commissioner State Tax, DSP) pay scale: ₹61,960 - ₹1,51,370 (AP PRC 2022 Scale 21, entry basic ₹61,960).
- **Sources only status-checked, not read**:
  - APPSC Notification No. 28/2022 (previous Group-1 cycle)
- **Links curl-checked**:
  - `https://psc.ap.gov.in/Documents/NotificationDocuments/Notfn_Group_I_2023%20with%20Syllabus_122023_08122023.pdf` → 200 OK (GET) / 302 (HEAD)
  - `https://psc.ap.gov.in/Documents/NotificationDocuments/Details_for_Group_1_Notfn_2023_122023_27122023.pdf` → 200 OK (GET) / 302 (HEAD)
  - `https://portal-psc.ap.gov.in/HomePages/RecruitmentNotifications` → 200 OK (GET)
- **Could NOT confirm, and why**: Exact date of Mains examination for 12/2023 was revised by commission notifications; noted in scheme stages.
- **Confidence downgrades made, and why**: Benchmark statistics (1,48,881 registered, 91,463 appeared on 17-03-2024, 4,496 shortlisted for Mains) marked `reported` based on official APPSC press statements.

---

### 2.5 `ap-ecet`
- **Tier**: C, **Exam Type**: entrance
- **Sections populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`
- **Sections marked not_available**: None
- **Sections omitted**: `career_ladder`, `financial_package` (per §5.4 for entrance exams)
- **Sources OPENED and read this session**:
  - `https://cets.apsche.ap.gov.in/ECET/PDF/APECET2026_InstructionBooklet_V6.pdf` — downloaded to `/tmp/ecet_booklet.pdf` (9 pages) and read with `pdftotext`. Verified 200 objective questions (Maths 50, Physics 25, Chemistry 25, Engineering branch subject 100), 180 minutes duration, zero negative marking, 25% qualifying mark for General/BC (50/200), and lateral entry intake (10% over and above sanctioned intake).
  - `https://cets.apsche.ap.gov.in/ECET/` — verified official portal and convener details (JNTU Anantapur on behalf of APSCHE).
- **Sources only status-checked, not read**:
  - State Board of Technical Education and Training (SBTET) AP curriculum
- **Links curl-checked**:
  - `https://cets.apsche.ap.gov.in/ECET/PDF/APECET2026_InstructionBooklet_V6.pdf` → 200 OK (GET)
  - `https://cets.apsche.ap.gov.in/ECET/` → 200 OK (GET)
- **Could NOT confirm, and why**: Lateral intake seats depend on the 10% supernumerary quota in individual engineering institutes; vacancies field set to null as standard for entrance tests.
- **Confidence downgrades made, and why**: 2024 (36,369 appeared) and 2023 (38,181 registered, 34,503 appeared) benchmark figures marked `reported` based on official convener press announcements.

---

### 2.6 `ap-lawcet`
- **Tier**: C, **Exam Type**: entrance
- **Sections populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`
- **Sections marked not_available**: None
- **Sections omitted**: `career_ladder`, `financial_package` (per §5.4 for entrance exams)
- **Sources OPENED and read this session**:
  - `https://cets.apsche.ap.gov.in/LAWCET/PDF/APLAWCET2026_IntructionsBooklet_V2.pdf` — downloaded to `/tmp/lawcet_booklet.pdf` (11 pages) and read with `pdftotext`. Verified 120 multiple choice questions (Part A GK & Mental Ability 30, Part B Current Affairs 30, Part C Aptitude for Study of Law 60), 90 minutes duration, zero negative marking, 35% qualifying marks for General/BC (42/120), no minimum for SC/ST, and conducting body (Sri Padmavati Mahila Visvavidyalayam, Tirupati on behalf of APSCHE).
  - `https://cets.apsche.ap.gov.in/LAWCET/` — verified official portal and important dates (examination: 04-05-2026).
- **Sources only status-checked, not read**:
  - Bar Council of India (BCI) Law Education Rules
- **Links curl-checked**:
  - `https://cets.apsche.ap.gov.in/LAWCET/PDF/APLAWCET2026_IntructionsBooklet_V2.pdf` → 200 OK (GET)
  - `https://cets.apsche.ap.gov.in/LAWCET/` → 200 OK (GET)
- **Could NOT confirm, and why**: Vacancies are not applicable for entrance examinations; admissions depend on university law department and affiliated private law college counseling.
- **Confidence downgrades made, and why**: 2024 (19,224 appeared, 17,117 qualified) and 2023 (19,014 appeared, 13,402 qualified) benchmark figures marked `reported` based on official APSCHE result statements.
