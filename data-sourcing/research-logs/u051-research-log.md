# Research Log: Unit 51 (u051) — Other State-Jurisdiction Recruiters — Assam

- **Unit ID**: `u051`
- **Batch ID**: `batch-7-state-other--assam`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts — proposed addition, flag for confirmation) — Assam`
- **Timestamp**: 2026-09-12T21:30:00+05:30
- **Status**: Completed (3/3 exams researched, written, and validated)
- **Reviewer**: Antigravity Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 51 encompasses three examinations from the state of Assam spanning three distinct domains — teacher eligibility, judicial services, and engineering entrance:

1. `assam-tet`: Assam Special Teacher Eligibility Test (ATET) — **Tier A (Entrance)**
2. `assam-gauhati-judicial`: Assam Judicial Service Grade-III (Civil Judge cum JMFC) Exam — **Tier B (Job)**
3. `assam-cee`: Assam Combined Entrance Examination — **Tier C (Entrance)**

### 1.1 Official Portals Probed & Confirmed

All official source portals were live-probed via HTTP status checks:

| Portal | URL | Status |
| :--- | :--- | :---: |
| Samagra Shiksha Assam (SSA) | `https://ssa.assam.gov.in` | 200 OK |
| Board of Secondary Education, Assam (SEBA) | `https://site.sebaonline.org` | 200 OK |
| SEBA Exam Portal (SEBAMIS) | `https://sebamis.sebaonline.org` | 200 OK |
| Directorate of Elementary Education (DEE) Assam | `https://dee.assam.gov.in` | 200 OK |
| Gauhati High Court | `https://ghconline.gov.in` | 200 OK |
| Assam Science and Technology University (ASTU) | `https://astu.ac.in` | 200 OK |
| ASTU CEE Application Portal | `https://astu.formsrec.in` | 200 OK |
| DTE Assam Counseling Portal | `https://dte.assam.gov.in` | 200 OK |

### 1.2 Validation

- Executed `node scripts/data-sourcing/validate-details.mjs`:
  - `assam-tet.json` — **PASS** (0 errors, 0 warnings)
  - `assam-gauhati-judicial.json` — **PASS** (0 errors, 0 warnings)
  - `assam-cee.json` — **PASS** (0 errors, 0 warnings)
  - All 215 total dossier files in the repository pass with **0 errors** and **0 warnings**.

| Exam ID | Title | Tier | Jurisdiction | Exam Type | Scheme | Career Ladder | Financial Package | Benchmarks | Downloads | Validation |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `assam-tet` | Assam Special TET (ATET) | A | Assam (State) | entrance | ✅ populated | ⊘ omitted | ⊘ omitted | ✅ populated | ✅ populated | **PASS** |
| `assam-gauhati-judicial` | Assam Judicial Service Grade-III | B | Assam (State) | job | ✅ populated | ✅ populated | ✅ populated | ✅ populated | ✅ populated | **PASS** |
| `assam-cee` | Assam Combined Entrance Exam | C | Assam (State) | entrance | ✅ populated | ⊘ omitted | ⊘ omitted | ✅ populated | ✅ populated | **PASS** |

---

## 2. Detailed Exam Logs

### 2.1 `assam-tet` — Assam Special Teacher Eligibility Test (ATET)

- **Tier**: A, **Exam Type**: entrance
- **Conducting Body**: Department of School Education, Government of Assam / SSA Assam / SEBA
- **Sections populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`
- **Sections omitted**:
  - `career_ladder`: Omitted per §5.4 (entrance examination — teacher eligibility certification, not a recruitment post).
  - `financial_package`: Omitted per §5.4 (entrance examination — no direct salaried appointment).

#### Exam Scheme Details
- **Paper-I** (Lower Primary, Classes I–V): 150 MCQs, 150 marks, 150 minutes across 5 subjects — Child Development & Pedagogy (30), Language I (30, choice of Assamese/Bengali/Bodo/Hindi/Garo/Manipuri/Hmar/Nepali), Language II English (30), Mathematics (30), Environmental Studies (30). No negative marking.
- **Paper-II** (Upper Primary, Classes VI–VIII): 150 MCQs, 150 marks, 150 minutes across 4 subjects — Child Development & Pedagogy (30), Language I (30), Language II English (30), Subject Specialization in Mathematics & Science OR Social Studies (60). No negative marking.
- **Qualifying Standard**: 60% aggregate (90/150) for General; 55% (83/150) for SC/ST(P)/ST(H)/OBC/MOBC/PwD. Language-I minimum: 60% (18/30) for General, 50% (15/30) for reserved categories.
- **TET Validity**: Lifetime validity per NCTE amendment 2021.

#### Competition Benchmarks
- **2021 ATET cycle**: 3,74,656 appeared → 66,907 qualified (17.9% overall pass rate). Paper-I: 52,895 qualified / 2,18,464 appeared (24.2%); Paper-II: 14,012 qualified / 1,56,192 appeared (9.0%).
- **2024 DEE recruitment**: 5,550 vacancies (3,800 LP + 1,750 UP) advertised requiring ATET/CTET qualification.
- **2026 DEE recruitment**: 4,500 regular Assistant Teachers appointed across LP and UP schools (final select list March 2026). TET scores carry 85% merit weightage in direct recruitment.

#### Sources Opened and Read
- SEBA TET 2026 Official Advertisement (Notification No. 740235/1562055 dated 06.01.2026): `https://sebamis.sebaonline.org/spltet2026/uploads/STET_06012026_Advertisement.pdf`
- DEE Assam Advertisement-A for 3,800 LP Teacher vacancies (26.12.2023): `https://dee.assam.gov.in/sites/default/files/.../advertisement-a_3800_26_12_2023__0.pdf`
- DEE Assam Final Results Notice for 4,500 Teachers (No. E-573006/697): `https://dee.assam.gov.in/sites/default/files/.../notice_regarding_final_result_4500_0.pdf`
- DEE Assam Final Cut-off Marks LPS 4,500: `https://dee.assam.gov.in/sites/default/files/.../final_cut-off_lps_4500.pdf`
- SEBA TET 2026 Paper-I syllabus, question papers (Set A), and final answer keys

#### Links Curl-Checked
- `https://sebamis.sebaonline.org/spltet2026/uploads/STET_06012026_Advertisement.pdf` → 200 OK
- `https://sebamis.sebaonline.org/spltet2026/Paper_I_LPT/Paper_I_LPT_SET_A.pdf` → 200 OK
- `https://sebamis.sebaonline.org/spltet2026/Paper_II_UPT/Paper_II_UPT_SET_A.pdf` → 200 OK
- `https://sebamis.sebaonline.org/spltet2026/uploads/STET_25082026_Final_Answer_Key_LPT_Paper_I.pdf` → 200 OK
- `https://dee.assam.gov.in/sites/default/files/.../advertisement-a_3800_26_12_2023__0.pdf` → 200 OK
- `https://dee.assam.gov.in/sites/default/files/.../notice_regarding_final_result_4500_0.pdf` → 200 OK
- `https://ssa.assam.gov.in` → 200 OK
- `https://site.sebaonline.org` → 200 OK

- **Confidence downgrades**: 2021 ATET statistics marked as `reported` (sourced from SSA press note rather than individually page-verified result portal).

---

### 2.2 `assam-gauhati-judicial` — Assam Judicial Service Grade-III Exam

- **Tier**: B, **Exam Type**: job
- **Conducting Body**: Gauhati High Court (High Court of Assam, Nagaland, Mizoram & Arunachal Pradesh)
- **Sections populated**: `exam_scheme`, `career_ladder`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **All 5 sections fully populated (best-effort sections also completed)**

#### Exam Scheme Details
Three-stage examination process:
1. **Preliminary Examination** (Screening): 100-mark objective test covering GK, Aptitude, English, Constitution, CPC, CrPC, Transfer of Property, Contract, IPC, Evidence, Torts (90 marks) + Assamese Proficiency (10 marks). 2 hours. Qualifying: 60% minimum; 1:10 shortlisting ratio.
2. **Main Written Examination**: 5 papers (Paper I–IV of 100 marks each + Paper V qualifying Assamese paper of 50 marks). Each paper 3 hours except Paper V (2 hours). Papers cover English, GK, Law I (Constitution/CPC/TP Act/Contract), Law II (IPC/CrPC/Evidence/Torts). Individual paper minimum: 45% (40% for SC/ST); aggregate across Papers I–IV: 60% (50% for SC/ST). 1:3 shortlisting for interview.
3. **Viva-Voce / Interview**: 50 marks. Minimum 60% (30/50) required. Final merit on aggregate of Mains Papers I–IV (400) + Interview (50) = 450 marks total.

#### Career Ladder
5-step judicial career progression under SNJPC scales:
- Grade-III: Civil Judge (JD) / JMFC — SNJPC J-1 (₹77,840–₹1,36,520) — 0–5 yrs
- Grade-II: CJ(SD) / CJM / ASJ — SNJPC J-3 (₹1,11,000–₹1,63,030) — 5–10 yrs
- Grade-I: District & Sessions Judge / ADJ — SNJPC J-5 (₹1,44,840–₹1,94,660) — 10–15 yrs
- Selection Grade: DJ (Selection Grade) — SNJPC J-6 (₹1,63,030–₹2,19,090) — 15–20 yrs
- Super Time Scale: Principal DJ — SNJPC J-7 (₹1,99,100–₹2,24,100) — 20+ yrs

#### Financial Package
- Entry basic pay: ₹77,840/month (SNJPC J-1)
- DA: 58% (as of July 2025)
- Gross estimate: ₹1,35,000–₹1,55,000/month
- In-hand estimate: ₹1,15,000–₹1,35,000/month (after NPS 10%, GIS, professional tax)
- Perks: designated judicial quarters/HRA, official vehicle with driver & fuel, sumptuary allowance, robe allowance, telecom reimbursements, comprehensive medical facilities, LTC

#### Competition Benchmarks
- **2026 cycle** (Advt dated 07-02-2025): 46 candidates qualified in Main Written and called for Interview/Viva-Voce (August 2026).
- **2023 cycle**: 33 vacancies advertised (18 UR, 4 SC, 3 ST-P, 8 ST-H) with 1:10 shortlisting for mains and 1:3 for interview.
- **2022 result** (Advt dated 02-06-2021): 22 candidates recommended in final merit list.

#### Sources Opened and Read
- Gauhati HC Recruitment Advertisement dated 06.02.2023 (No. HC.XXXVII-03/2023/39/R.Cell): `https://ghconline.gov.in/Recruitment/Notification-06-02-2023-1.pdf`
- Gauhati HC Addendum dated 14.03.2023: `https://ghconline.gov.in/Recruitment/Notification-14-03-2023.pdf`
- Gauhati HC Main Written Result & Interview Schedule 25.06.2026: `https://ghconline.gov.in/Recruitment/Notification-25-06-2026.pdf`
- Gauhati HC Final Result & Merit 21.12.2022: `https://ghconline.gov.in/Recruitment/Notification-21-12-2022.pdf`
- Gauhati HC Final Marks List 21.12.2022: `https://ghconline.gov.in/Recruitment/Notification-21-12-2022-Mark.pdf`
- Gauhati HC Judicial Officers Recruitment Portal: `https://ghconline.gov.in/index.php/recruitment-judicial-officer/`

#### Links Curl-Checked
- `https://ghconline.gov.in/Recruitment/Notification-06-02-2023-1.pdf` → 200 OK
- `https://ghconline.gov.in/Recruitment/Notification-14-03-2023.pdf` → 200 OK
- `https://ghconline.gov.in/Recruitment/Notification-25-06-2026.pdf` → 200 OK
- `https://ghconline.gov.in/Recruitment/Notification-21-12-2022.pdf` → 200 OK
- `https://ghconline.gov.in/Recruitment/Notification-21-12-2022-Mark.pdf` → 200 OK
- `https://ghconline.gov.in` → 200 OK

- **Confidence downgrades**: Grade-I and above career steps marked `reported` (derived from SNJPC national norms and Assam Judicial Service Rules framework rather than individually identified Gauhati HC circulars).

---

### 2.3 `assam-cee` — Assam Combined Entrance Examination

- **Tier**: C, **Exam Type**: entrance
- **Conducting Body**: Assam Science and Technology University (ASTU)
- **Sections populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`
- **Sections omitted**:
  - `career_ladder`: Omitted per §5.4 (engineering entrance examination — no recruitment career ladder).
  - `financial_package`: Omitted per §5.4 (engineering entrance examination — no salary package).

#### Exam Scheme Details
- Single offline OMR-based paper: 120 MCQs, 3 hours (180 minutes), maximum 480 marks.
- Subject breakdown: Mathematics (40 MCQs, 160 marks), Physics (40 MCQs, 160 marks), Chemistry (40 MCQs, 160 marks).
- Marking: +4 for correct, -1 for incorrect (negative marking applies).
- Bilingual question papers (English + Assamese).
- Tie-breaking priority: Mathematics → Physics → Chemistry → Date of Birth (older first).
- Syllabus: Higher Secondary syllabus of ASSEB Division-II.

#### Competition Benchmarks
- **2026 CEE cycle**: ~14,200 registered applicants, ~13,100 appeared, ~2,150 seats across state engineering colleges (Assam Engineering College Guwahati, Jorhat Engineering College, JIST Jorhat, Bineswar Brahma EC Kokrajhar, Barak Valley EC Karimganj, Golaghat EC, Dhemaji EC).
- **2025 CEE cycle**: ~13,800 registered applicants, ~2,050 government engineering seats.

#### Sources Opened and Read
- ASTU CEE-2026 Official Information Brochure: `https://astu.formsrec.in/pdf/Final%20Brochure%20CEE-2026.pdf`
- ASTU CEE-2026 Official Final Answer Key: `https://astu.ac.in/wp-content/uploads/Combined-Entrance-Examination-CEE-2026-Answer-Key.pdf`
- ASTU CEE-2026 Extension Notice: `https://astu.ac.in/wp-content/uploads/Extension-notice.pdf`
- ASTU CEE-2026 Rank Card & OMR Photocopy Notice: `https://astu.ac.in/wp-content/uploads/CEE-2026-Rank-Card-and-Photocopy-of-OMR.pdf`
- ASTU CEE News & Notifications page: `https://astu.ac.in/?page_id=40088`

#### Links Curl-Checked
- `https://astu.formsrec.in/pdf/Final%20Brochure%20CEE-2026.pdf` → 200 OK
- `https://astu.ac.in/wp-content/uploads/Combined-Entrance-Examination-CEE-2026-Answer-Key.pdf` → 200 OK
- `https://astu.ac.in/wp-content/uploads/Extension-notice.pdf` → 200 OK
- `https://astu.ac.in/wp-content/uploads/CEE-2026-Rank-Card-and-Photocopy-of-OMR.pdf` → 200 OK
- `https://astu.ac.in` → 200 OK
- `https://astu.formsrec.in/` → 200 OK
- `https://dte.assam.gov.in` → 200 OK

- **Confidence downgrades**: 2026 and 2025 applicant counts marked `reported` (aggregated from ASTU press announcements and news portal rather than official statistical disclosure with exact per-branch breakdown). Seat count (2,150/2,050) marked `reported` (derived from counseling seat matrices announced across listed state engineering colleges).
- **Could NOT confirm, and why**: Exact year-wise branch-level seat fill statistics and last-rank closing marks per category — ASTU publishes aggregate seat matrices during counseling rounds but does not maintain a permanent archival portal of historical closing-rank statistics.
