# Research Log: Unit 71 (u071) — Other State-Jurisdiction Recruiters — Sikkim

- **Unit ID**: `u071`
- **Batch ID**: `batch-7-state-other--sikkim`
- **Label**: `Other state-jurisdiction recruiters not matched above (universities, boards, CET cells, PSUs, high courts — proposed addition, flag for confirmation) — Sikkim`
- **Timestamp**: 2026-09-13T14:56:00+05:30
- **Status**: Completed (1/1 exam researched, written, and validated)
- **Reviewer**: Antigravity Autonomous Agent

---

## 1. Summary of Unit Execution

Unit 71 covers the statutory teacher eligibility and certification examination for the State of Sikkim:
1. `sikkim-tet`: Examination Section, Education Department, Government of Sikkim — Sikkim Teacher Eligibility Test (STET) — **Tier C (Entrance)**

All facts, exam structures, and qualification benchmarks were obtained directly from official primary sources published by the Examination Section, Education Department, Government of Sikkim, Tashiling Secretariat, Gangtok, the State Council of Educational Research and Training (SCERT), Sikkim, and the Sikkim State Teachers' Recruitment Board (SSTRB) on `https://education.sikkim.gov.in` and `https://tet.sikkim.gov.in`:

- **Statutory Framework & Curriculum Revamp**:
  - Conducted in strict compliance with Section 23(1) of the Right of Children to Free and Compulsory Education (RTE) Act, 2009 and statutory notification norms established by the National Council for Teacher Education (NCTE) dated 23rd August 2010 and 29th December 2011.
  - The State of Sikkim has conducted STET since 2013 (initially using CTET syllabus). In alignment with the National Education Policy (NEP) 2020 recommendations, SCERT Sikkim, with academic support from Azim Premji University, revamped the STET syllabus, item banking, and assessment frameworks to contextualize pedagogical requirements to the mountainous state.
- **Cadre & Stage Architecture**:
  - **Paper I (Primary Stage)**: Eligibility for appointment as Primary Teacher (PRT / Level 1) for Classes I to V.
  - **Paper II (Elementary / Graduate Stage)**: Eligibility for appointment as Graduate Teacher Arts (GTA / Level 2) or Graduate Teacher Science (GTS / Level 2) for Classes VI to VIII.
  - Teachers are subsequently recruited and regularized through the **Sikkim State Teachers' Recruitment Board (SSTRB)** (constituted vide Notification No. 933/HRDD, 2015, Upper Syari, Gangtok) and Education Department.
- **Entrance Exam Specifications (Section Omissions)**:
  - Per `RESEARCH-GUIDE.md` and repository guidelines, `career_ladder` and `financial_package` are omitted completely from `sikkim-tet.json` as STET is a statutory eligibility entrance certification without direct recruitment appointment or civil pay scales.
- **Validation**:
  - Validated via `scripts/data-sourcing/validate-details.mjs`: **PASS (0 errors, 0 warnings)** across all 278 dossiers in the repository.
  - Build verified clean via `npm run build` (Vite production build completed in 263ms).

| Exam ID | Title | Tier | Type | Exam Structure Summary | Primary Benchmark / Cycle | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `sikkim-tet` | Sikkim Teacher Eligibility Test (STET) | C | entrance | OMR: Paper I (150m, 150 mins) & Paper II (150m, 150 mins), no negative marking | 2024: 823 qualified (428 PRT, 254 GTA, 141 GTS); 2025: held 31.08.2025; 2026: Special Educator | **PASS** |

---

## 2. Detailed Exam Log

### `sikkim-tet` (Tier C, entrance)
- **Sections populated**: `exam_scheme`, `competition_benchmarks`, `official_downloads` (exceeds Tier C minimum requirement of `official_downloads` by populating all three applicable sections directly from primary government documents).
- **Sections marked not_available**: None.
- **Sections omitted**: `career_ladder`, `financial_package` (statutory entrance/eligibility certification test per `RESEARCH-GUIDE.md`).
- **Sources OPENED and read this session**:
  - **Education Department Sikkim STET-2025 Official Information Bulletin** (`STET-INFORMATION BULLETIN-1.pdf`, Ref. No. `79/Exam/Edn./25` dated 26.06.2025, read via `pdftotext` confirming online portal on `tet.sikkim.gov.in`, exam date 31.08.2025 across Gangtok and Namchi centres, application fee ₹500, eligibility under NCTE norms, structure of Paper I [150 MCQs, 150 marks: CDP 30, Language I English 30, Language II Vernacular 30, Maths 30, EVS 30], structure of Paper II [150 MCQs, 150 marks: CDP 30, Language I English 30, Language II Vernacular 30, Subject Core Math & Science 60 or Social Studies 60], 150 minutes duration, no negative marking, qualifying thresholds of 60% for UR and 55% for SC/ST/Central & State OBC, and certificate lifetime validity).
  - **SCERT Sikkim Comprehensive STET Syllabus & Curriculum Document** (`STET SYLLABUS.pdf`, 57 pages, read via `pdftotext` confirming collaboration with Azim Premji University, NEP 2020 contextualization, detailed content frameworks for CDP, Language I, Vernacular Languages [Nepali, Bhutia, Lepcha, Limboo, Hindi], Mathematics, EVS, Science, and Social Studies).
  - **Government of Sikkim Education Department Statutory Notification** (`STET notification .pdf`, No. `191/EDN/2022` dated 03.06.2022, signed by R. Telang, IAS, Principal Secretary, read via Apple Vision OCR confirming mandatory STET under NCTE norms, online application via Sikkim Single Sign-On [SSO], coordination with SCERT, and credential verification protocol).
  - **Education Department Sikkim STET-2025 Final Corrected Answer Key** (`ANSWER KEY 2025.pdf`, read via `pdftotext` confirming 150 questions across PRT, GTA, and GTS for Nepali, Bhutia, Lepcha, Limboo, and Hindi).
  - **Education Department Sikkim STET-2024 Result of Qualified Candidates** (`150250.pdf`, Notice dated 24.10.2024, 4 pages, read via `pdftotext` confirming 823 total qualified candidates across PRT [428 candidates, roll range 1003–2024], GTA [254 candidates, roll range 3628–4260], and GTS [141 candidates, roll range 6001–6167]).
  - **Education Department Sikkim STET-September 2024 Answer Key & Challenge Form** (`150245.pdf`, Notice dated 22.09.2024, read via `pdftotext` confirming exam date 22.09.2024 and 150 questions distribution).
  - **Education Department Sikkim Notice No. 231/Exams/Edn/26** (`150270.pdf`, Notice dated 12.01.2026, read via Apple Vision OCR confirming State Teacher Eligibility Test-2026 for Special Educators scheduled for 14.02.2026).
  - **Sikkim State Teachers' Recruitment Board (SSTRB) Notice** (`150238.pdf`, Memo No. `708/SSTRB/ADM` dated 06.09.2023, read via `pdftotext` confirming certificate submission requirements for teacher regularization and direct recruitment).
  - **Government of Sikkim Teachers Statutory Recruitment Rules 1991** (`34.pdf`, Gazette No. 34, read via `pdftotext` confirming cadre hierarchy and educational prerequisites).
- **Sources only status-checked, not read**:
  - `https://education.sikkim.gov.in` (HTTP/2 200 OK)
  - `https://tet.sikkim.gov.in` (HTTP/2 200 OK)
- **Links curl-checked (all returned HTTP 200 OK)**:
  - `https://tet.sikkim.gov.in/Uploads/Notice/STET-INFORMATION%20BULLETIN-1.pdf` -> HTTP/2 200 OK (218,752 bytes)
  - `https://tet.sikkim.gov.in/Uploads/Notice/STET%20SYLLABUS.pdf` -> HTTP/2 200 OK (961,937 bytes)
  - `https://tet.sikkim.gov.in/Uploads/Notice/STET%20notification%20.pdf` -> HTTP/2 200 OK (390,896 bytes)
  - `https://tet.sikkim.gov.in/Uploads/Notice/ANSWER%20KEY%202025.pdf` -> HTTP/2 200 OK (1,177,382 bytes)
  - `https://education.sikkim.gov.in/GeneralSection/UploadedFiles/NoticeBoard/150270.pdf` -> HTTP/2 200 OK (269,794 bytes)
  - `https://education.sikkim.gov.in/GeneralSection/UploadedFiles/NoticeBoard/150250.pdf` -> HTTP/2 200 OK (1,353,896 bytes)
  - `https://education.sikkim.gov.in/GeneralSection/UploadedFiles/NoticeBoard/150245.pdf` -> HTTP/2 200 OK (464,384 bytes)
  - `https://education.sikkim.gov.in/GeneralSection/UploadedFiles/NoticeBoard/150238.pdf` -> HTTP/2 200 OK (250,703 bytes)
  - `https://education.sikkim.gov.in/GeneralSection/UploadedFiles/Gazette/34.pdf` -> HTTP/2 200 OK (533,158 bytes)
  - `https://education.sikkim.gov.in` -> HTTP/2 200 OK
  - `https://tet.sikkim.gov.in` -> HTTP/2 200 OK
- **Could NOT confirm, and why**:
  - Total registered applicants count for STET-2024 and STET-2025 (Education Department publishes roll-number lists of qualified candidates, but does not publish aggregate registration/appearance counts in public press notes; left as `null` rather than estimated).
- **Confidence downgrades made, and why**: None.
