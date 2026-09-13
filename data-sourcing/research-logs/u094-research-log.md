# Research Log: Unit 94 (u094) — Other State-Jurisdiction Recruiters — Himachal Pradesh

- **Unit ID**: `u094`
- **Batch ID**: `batch-7-state-other--himachal-pradesh`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts — proposed addition, flag for confirmation) — Himachal Pradesh`
- **Timestamp**: 2026-09-13T16:07:00+05:30
- **Status**: Completed (1/1 exam researched, written, verified, and validated)
- **Reviewer**: Antigravity Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 94 covers the premier statutory state-level teacher certification authority in the State of Himachal Pradesh:
1. `hptet`: Himachal Pradesh Teacher Eligibility Test (HPTET) — **Tier B (Entrance)**

Primary research and audit were conducted directly on the official portal of the Himachal Pradesh Board of School Education (HPBOSE), Dharamshala (`hpbose.org`). All populated fields have been verified against direct statutory notifications, official prospectuses, syllabus documents, and signed result declarations from the Departmental Examination Branch (DEB):

- **Statutory Authority & Framework**:
  - Conducted biannually (June and November sessions) by HPBOSE Dharamshala on behalf of the Department of School Education, Government of Himachal Pradesh, in strict compliance with Section 23(1) of the Right of Children to Free and Compulsory Education (RTE) Act, 2009, and guidelines established by the National Council for Teacher Education (NCTE).
  - Mandatory statutory qualification for appointment as teacher across primary, elementary, classical/language, and special educator cadres in Himachal Pradesh Government and local authority schools.
  - Certificate Validity: Valid for **lifetime** across all categories per NCTE and Himachal Pradesh State Government notifications. Unlimited attempts are permitted.
- **Teaching Cadres & Specializations**:
  - The examination comprehensively covers 10 distinct teacher recruitment streams:
    1. JBT (Junior Basic Training / D.El.Ed.) TET
    2. TGT Arts TET
    3. TGT Non-Medical TET
    4. TGT Medical TET
    5. TGT Hindi TET
    6. TGT Sanskrit (Shastri) TET
    7. Punjabi Language Teacher TET
    8. Urdu Language Teacher TET
    9. Special Educator TET (Pre-Primary to Class V)
    10. Special Educator TET (Classes VI to XII)
- **Examination Scheme & Structure**:
  - Standalone objective OMR-based test: 150 Multiple Choice Questions (MCQs), 150 marks, 150 minutes duration (2 hours 30 minutes).
  - Bilingual test booklet in English and Hindi (except language-specific literature/grammar components).
  - Negative Marking: **None** (no negative marking for incorrect answers).
  - Passing Standard: Minimum **60%** (90 marks out of 150) for Unreserved / General candidates; **55%** (82 marks out of 150) with a 5% relaxation for SC, ST, OBC, and Physically Handicapped (PHH) candidates belonging to Himachal Pradesh.
- **Schema §5.4 Compliance**:
  - Because `hptet` is a statutory qualifying entrance examination (`exam_type: "entrance"`), `career_ladder` and `financial_package` sections are omitted entirely (not empty objects) in strict accordance with `RESEARCH-GUIDE.md` §5.4.
- **Official Competition Benchmarks (Verified from Signed Gazettes)**:
  - **June 2026 Cycle**: 32,531 applied; 29,900 appeared; 6,744 qualified (22.55% overall pass rate). Detailed subject-wise breakdown documented from official Letter No. (37) DEB/TET Exam JUNE-2026/68866-872.
  - **November 2025 Cycle**: 36,571 applied; 33,083 appeared; 8,459 qualified (25.57% overall pass rate). Detailed subject-wise breakdown documented from official Letter No. (37) DEB/ TET Exam- Nov-2025/ 5204-5210.
  - **November 2024 Cycle**: 35,031 applied; 31,896 appeared; 11,026 qualified (34.57% overall pass rate). Detailed subject-wise breakdown documented from official Letter No. (37) DEB/ TET Exam-NOV-2024/ 43471-476.

---

## 2. Examination Overview Table

| Exam ID | Title | Tier | Type | Conducting Body | Exam Pattern Summary | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `hptet` | Himachal Pradesh Teacher Eligibility Test | B | entrance | HPBOSE Dharamshala | 6 stages / 10 streams; 150 MCQs, 150 marks, 150 mins; no negative marking; 60% UR / 55% reserved qualifying mark | **PASS** |

---

## 3. Detailed Exam Research Log

### 1. `hptet` (Tier B, entrance)
- **Conducting Body**: Himachal Pradesh Board of School Education (HPBOSE), Dharamshala (`https://hpbose.org`).
- **File**: `public/exam-details/hptet.json`.
- **Sections Populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads`.
- **Sections Omitted**: `career_ladder`, `financial_package` (entrance exam — §5.4).
- **Exam Pattern & Stages**:
  - Stage 1: Primary Stage: Junior Basic Training (JBT / D.El.Ed.) TET — 5 sections: Child Development & Pedagogy (30), English (30), Hindi (30), Mathematics (30), Social Sciences/EVS/HP GK (30). Total 150 marks, 150 mins.
  - Stage 2: Upper Primary: TGT Arts TET — 4 sections: Child Psychology & Pedagogy (30), HP GK & Current Affairs (30), English (30), Social Studies (60). Total 150 marks, 150 mins.
  - Stage 3: Upper Primary: TGT Non-Medical TET — 4 sections: Child Psychology & Pedagogy (30), HP GK & Current Affairs (30), Mathematics (30), Physics & Chemistry (60). Total 150 marks, 150 mins.
  - Stage 4: Upper Primary: TGT Medical TET — 4 sections: Child Psychology & Pedagogy (30), HP GK & Current Affairs (30), Botany & Zoology (60), Chemistry (30). Total 150 marks, 150 mins.
  - Stage 5: Language & Classical Teacher Cadres: TGT Hindi, TGT Sanskrit (Shastri), Punjabi, and Urdu TET — Subject Degree Course Content (120), HP GK & General Awareness (30). Total 150 marks, 150 mins.
  - Stage 6: Inclusive Education Cadres: Special Educator TET (Pre-Primary to Class V & Classes VI to XII) — Special Education Domain (120), General Studies & Awareness (30). Total 150 marks, 150 mins.
- **Competition Benchmarks**:
  - 2026 Cycle (June 2026): 32,531 applicants, 29,900 appeared, 6,744 qualified (22.55% pass rate).
  - 2025 Cycle (November 2025): 36,571 applicants, 33,083 appeared, 8,459 qualified (25.57% pass rate).
  - 2024 Cycle (November 2024): 35,031 applicants, 31,896 appeared, 11,026 qualified (34.57% pass rate).
- **Official Downloads Verified**:
  - HP TET November 2026 Official Notification PDF (`https://hpbose.org/Admin/Upload/Notification%20regarding%20TET.pdf`) — `%PDF-1.5` live
  - HP TET November 2026 Information Bulletin & Prospectus PDF (`https://hpbose.org/Admin/Upload/PROSPEECTUSTETNOVEMBER2026FINAL.pdf`) — `%PDF-1.5` live
  - HP TET June 2026 Official Result Notification & Pass Statistics PDF (`https://hpbose.org/Admin/Upload/RESULT%20NOTIFICATION%20TET%20JUNE-2026.pdf`) — `%PDF-1.4` live
  - HP TET June 2026 Final Answer Keys for All Subjects PDF (`https://hpbose.org/Admin/Upload/FINAL_ANS_KEY_TET_JUNE_2026.pdf`) — `%PDF-1.4` live
  - HP TET November 2025 Result Notification & Subject-wise Pass Statistics PDF (`https://hpbose.org/Admin/Upload/NOTIFICATION%20&%20PRESS%20NOTE_1.pdf`) — `%PDF-1.4` live
  - HP TET June 2025 Official Result Notification & Category Statistics PDF (`https://hpbose.org/Admin/Upload/Noti.T.R.13.08.2025.pdf`) — `%PDF-1.4` live
  - HP TET November 2024 Result Declaration Notification PDF (`https://hpbose.org/Admin/Upload/Noti.TET.13.01.2025.pdf`) — `%PDF-1.4` live
  - HP TET June 2024 Result Declaration Notification PDF (`https://hpbose.org/Admin/Upload/Noti.TET.03.09.2024.pdf`) — `%PDF-1.4` live
  - HP TET June 2026 Examination Schedule Notification PDF (`https://hpbose.org/Admin/Upload/NOTITETJUNE2026.pdf`) — `%PDF-1.4` live
  - HPBOSE Online Services TET Application Portal (`https://hpbose.org/OnlineServices/CET/TET/Instructions.aspx`) — HTTP live
  - HPBOSE Notifications & Press Releases Portal (`https://hpbose.org/Notification.aspx`) — HTTP live
  - HPBOSE Official Portal (`https://hpbose.org`) — HTTP live

---

## 4. Verification & Validation Results

```bash
node scripts/data-sourcing/validate-details.mjs public/exam-details/hptet.json
```
**Validation Output**:
```
Validating 1 dossier file(s)...
  ✓ hptet.json [PASS]

Summary: 1 checked, 0 error(s), 0 warning(s)
```

- **Liveness Audit**: 100% of links verified live. All 9 PDF documents were downloaded and verified to contain genuine `%PDF` binary streams from HPBOSE Dharamshala. Web portals verified returning active HTML responses.
- **Build Verification**: `npm run build` ran cleanly with 0 errors (vite build in 175ms).
- **Progress Tracker Updated**: `data-sourcing/progress.json` updated with `u094` review timestamp `2026-09-13`.
