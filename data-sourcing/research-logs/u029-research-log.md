# Research Log: Unit 29 (u029) — Major State Public Service Commissions — Nagaland

- **Unit ID**: `u029`
- **Batch ID**: `batch-4-state-psc--nagaland`
- **Label**: `Major State Public Service Commissions (State Administrative Services) — Nagaland`
- **Timestamp**: 2026-09-12T02:18:00+05:30
- **Status**: Completed (1/1 exams researched, authored, and validated)
- **Reviewer**: Antigravity IDE Autonomous Agent

---

## 1. Summary of Unit Execution
Unit 29 covers the premier administrative, police, and executive gazetted recruitment examination conducted by the **Nagaland Public Service Commission (NPSC)**:
1. `npsc-cce`: Nagaland Public Service Commission Combined Civil Services Examination (NCS, NPS & Allied Services Examination) — **Tier B**

The dossier has been authored in strict compliance with `RESEARCH-GUIDE.md` and project standards:
- **Tier Coverage**: While designated as Tier B (requiring `exam_scheme` and `official_downloads`), all five sections (`career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, and `official_downloads`) were researched and populated using primary official sources.
- **Pay Matrix Compliance**: Cites the Government of Nagaland Services (Revision of Pay) Rules, 2017 (Notification No. `FIN/ESTT-2/11/VII CPC/16` dated 16.12.2017) and Finance Department notifications, avoiding generic Central 7th CPC level names:
  - Extra Assistant Commissioner (EAC) / Junior Grade (Class-I Gazetted): Nagaland ROP 2017 Pay Level-13 (₹56,100 – ₹1,77,500), entry basic pay ₹56,100.
- **DA Constant**: Maintained strictly at **58%** as of `2025-07-01` (confirmed via Nagaland Finance Department OM `FIN/ROP/4/84/(Vol-II)` which maintained 58% up to 31.12.2025 prior to a 2% hike on 01.01.2026).
- **Exam Scheme Overhaul**: Accurately reflects the brand-new revised syllabus and examination scheme notified by NPSC on **23 June 2026** (`https://npsc.nagaland.gov.in/storage/cms/media/2026/178220303767926.pdf`), updating the legacy pattern to 6 conventional descriptive papers of 200 marks each (1,200 total merit marks) covering GS-1, GS-2, GS-3, GS-4 (Ethics), GS-Nagaland, and English Comprehension & Essay, alongside a 200-mark General Studies screening Prelims (100 MCQs, 33% negative marking) and a 70-mark Personality Test (Viva-Voce).
- **Validation**: Passed `node scripts/data-sourcing/validate-details.mjs` with **0 errors** and **0 warnings**.

| Exam ID | Title | Tier | Jurisdiction | Entry Basic Pay | Primary Cycle | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `npsc-cce` | Nagaland Public Service Commission Combined Civil Services Examination | B | Nagaland | Nagaland ROP 2017 Level-13 (₹56,100) | Advt. No. NPSC-2/NCS-2025 (96 vac) | **PASS** |

---

## 2. Detailed Exam Log

### 2.1 `npsc-cce`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 populated)
- **Sections marked not_available**: None
- **Sections omitted**: None
- **Sources OPENED and read this session**:
  - NPSC Official Web Portal: `https://npsc.nagaland.gov.in` (confirmed HTTP 200)
  - NPSC Revised Scheme & Syllabus Notification (notified 23.06.2026): `https://npsc.nagaland.gov.in/storage/cms/media/2026/178220303767926.pdf` (downloaded and rendered to scratch; extracted all 5 pages)
  - NPSC Official Syllabus Archive: `https://npsc.nagaland.gov.in/syllabus/178220309832593` (confirmed HTTP 200)
  - NPSC NCS, NPS & Allied Services 2025 Recruitment Advertisement (Advt. No. NPSC-2/NCS-2025 dated 28.10.2025): `https://npsc.nagaland.gov.in/advertisement/176163778915978`
  - NPSC NCS 2025 Prelims Result (Notification dated 09.02.2026): `https://npsc.nagaland.gov.in/results/177063261661754`
  - NPSC NCS 2025 Mains Result (Notification dated 06.07.2026): `https://npsc.nagaland.gov.in/results/178332605070120`
  - NPSC NCS 2025 Final Recommendation Result (Notification dated 10.08.2026): `https://npsc.nagaland.gov.in/results/178636104968395`
  - NPSC NCS 2024 Final Recommendation Result (Notification dated 03.09.2025): `https://npsc.nagaland.gov.in/results/175691216717529`
  - NPSC NCS 2023 Final Recommendation Result (Notification dated 30.08.2024): `https://npsc.nagaland.gov.in/results/172502818568955`
  - NPSC Conduct of Examinations Rules, 2008: `https://npsc.nagaland.gov.in/storage/cms/regulation/165882384512026.pdf` (Rules 14 & 18 on shortlisting multipliers and viva-voce marks)
  - NPSC (Conduct of Examinations) Tenth Amendment Rules, 2022: `https://npsc.nagaland.gov.in/storage/cms/media/2024/172068326046603.pdf` (Annual recruitment calendar)
  - NPSC Question Bank / PYQ Archive: `https://npsc.nagaland.gov.in/question-bank/162814923360679`
  - Nagaland Services (Revision of Pay) Rules, 2017: `https://finance.nagaland.gov.in/Content/Files/9E306C01-F69D-4CEA-8873-34A9A917E8A3.pdf`
  - Nagaland Finance Department Dearness Allowance Orders: `https://finance.nagaland.gov.in/Content/Files/0A71093F-9A1B-47B4-B48A-E270A56CA239.pdf`
  - Department of Personnel & Administrative Reforms (DP&AR) Nagaland Civil Service Cadre Schedules: `https://dpar.nagaland.gov.in/ncs/`
- **Links curl-checked (all confirmed live with HTTP 200)**:
  - `https://npsc.nagaland.gov.in` → HTTP/2 200
  - `https://npsc.nagaland.gov.in/storage/cms/media/2026/178220303767926.pdf` → HTTP/2 200
  - `https://npsc.nagaland.gov.in/syllabus/178220309832593` → HTTP/2 200
  - `https://npsc.nagaland.gov.in/advertisement/176163778915978` → HTTP/2 200
  - `https://npsc.nagaland.gov.in/results/178636104968395` → HTTP/2 200
  - `https://npsc.nagaland.gov.in/results/178332605070120` → HTTP/2 200
  - `https://npsc.nagaland.gov.in/results/177063261661754` → HTTP/2 200
  - `https://npsc.nagaland.gov.in/results/175691216717529` → HTTP/2 200
  - `https://npsc.nagaland.gov.in/question-bank/162814923360679` → HTTP/2 200
  - `https://npsc.nagaland.gov.in/storage/cms/media/2024/172068326046603.pdf` → HTTP/2 200
  - `https://dpar.nagaland.gov.in/ncs/` → HTTP/1.1 200
- **Competition Benchmarks Verified**:
  - **2025 Cycle** (Advt. No. NPSC-2/NCS-2025): 96 vacancies, 926 candidates shortlisted for Mains (Rule 14(12)), 285 candidates called for Viva-Voce (Rule 14(13)), 96 final recommended candidates.
  - **2024 Cycle** (Advt. No. NPSC-4/NCS-2024): 140 vacancies, 1,452 candidates shortlisted for Mains, 418 candidates called for Viva-Voce, 140 final recommended candidates.
  - **2023 Cycle** (Advt. No. NPSC/EXAM-19/2023): 89 vacancies, 960 candidates shortlisted for Mains, 276 candidates called for Viva-Voce, 89 final recommended candidates.
- **Confidence downgrades made, and why**: None. All core figures are directly extracted from official commission notifications.

---

## 3. Verification and Quality Audit
- `node scripts/data-sourcing/validate-details.mjs public/exam-details/npsc-cce.json` executed:
  - 1 checked, 0 errors, 0 warnings.
- Full suite validation (`validate-details.mjs` across all 114 dossiers) executed:
  - 114 checked, 0 errors, 0 warnings.
