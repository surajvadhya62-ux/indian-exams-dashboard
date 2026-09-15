# Research Log: Unit 15 (u015) — Major State Public Service Commissions — Arunachal Pradesh

- **Unit ID**: `u015`
- **Batch ID**: `batch-4-state-psc--arunachal-pradesh`
- **AI Instance ID**: `Instance-u015 (Arunachal Pradesh State PSC Worker)`
- **Timestamp**: 2026-09-12T01:30:00+05:30
- **Status**: Completed (1/1 exam researched, written, and validated)
- **Reviewer**: Antigravity IDE Autonomous Agent

---

## 1. Summary of Unit Execution
Unit 15 covers the flagship combined civil services examination for the State of Arunachal Pradesh administered by the Arunachal Pradesh Public Service Commission (APPSC), Itanagar:
1. `appsc-cce`: Arunachal Pradesh Public Service Commission Combined Competitive Exam (APPSCCE) — **Tier B**

The dossier has been authored in strict compliance with `RESEARCH-GUIDE.md` and `EXECUTION-PLAN.md`.
- **Primary Source Documents**: Downloaded and verified directly against primary official PDF: **ADVERTISEMENT-No. 5/2026** (No. PSC-R/13/2026 dated Itanagar, 7th September, 2026, signed by P. Priytarshny, IAS, Secretary, APPSC).
- **Exam Scheme**: Complete 3-stage scheme captured from Schedule-II of the APPSCCE Rules, 2019 (as amended up to March 2024):
  - Preliminary Examination (Objective Type Screening): Paper I General Studies (200 marks, 120 mins; determines Mains qualification shortlist in ~1:12 ratio) and Paper II CSAT (200 marks, 120 mins; qualifying at 33%); 1/3 negative marking.
  - Main Examination: 8 papers comprising 1 Compulsory Qualifying English paper (300 marks, 33% threshold) + 7 Merit Papers (Essay, GS I, GS II, GS III, GS IV, Optional Paper 1, Optional Paper 2 — each 250 marks; total 1,750 merit marks; minimum 20% per subject and 33% aggregate required).
  - Interview / Personality Test (Viva-Voce): 275 marks (shortlisted in 1:3 ratio), yielding a grand final merit total of 2,025 marks.
- **Pay Structure**: The Government of Arunachal Pradesh adheres to the 7th Central Pay Commission (7th CPC) Pay Matrix for state civil servants under the Arunachal Pradesh Civil Services (Revised Pay) Rules. Entry Grade APCS / APPS officers are placed in Pay Matrix Level 10 (₹56,100 – ₹1,77,500; corresponding to pre-revised PB-3 ₹15,600–39,100 + GP ₹5,400). Standard project DA of 58% (effective 2025-07-01) plus Special Duty Allowance (SDA @ 10% of basic pay for North East region postings) and HRA/remote locality allowances are modeled.
- **Benchmarks**: 135 vacancies advertised across 13 services/departments for the 2026 cycle (Prelims on 06.12.2026; application window 16.09.2026 to 20.10.2026); 140 posts in 2024 cycle; 111 posts in 2020 cycle (26,454 applicants, 1,332 shortlisted for Mains).
- **Validation**: File passed `node scripts/data-sourcing/validate-details.mjs` with **0 errors** and **0 warnings**.

| Exam ID | Title | Tier | Jurisdiction | Entry Basic Pay | Primary Cycle | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `appsc-cce` | Arunachal Pradesh Public Service Commission Combined Competitive Exam | B | Arunachal Pradesh | Level 10 (₹56,100) | 135 vacancies (2026 Cycle) | **PASS** |

---

## 2. Detailed Exam Log: `appsc-cce`

- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 sections populated)
- **Sections marked not_available**: None
- **Sections omitted**: None (job examination)
- **Sources OPENED and read this session**:
  - APPSC Official Portal: `https://appsc.gov.in` (confirmed live HTTP 303 → 200 OK)
  - APPSC Advertisements Hub: `https://appsc.gov.in/Index/sub_page/doc2195/Advertisements` (confirmed live 200 OK)
  - APPSC Official Advertisement 2026: `https://appsc.gov.in/upload/RECINS001/APPSCCE_2026_ADVERTISEMENT.pdf` (5,053,461 bytes; downloaded, converted to PNG via `pdftoppm`, and verified all 12 pages)
  - APPSC Syllabus Portal & Document: `https://appsc.gov.in/upload/RECINS001/SYLLABUS_APPSCCE_2026.pdf` (23,366,158 bytes; confirmed live 200 OK)
  - APPSC Previous Year Questions Hub: `https://appsc.gov.in/Index/common_sub_page/doc41138/Previous_Year_Questions` (confirmed live 200 OK)
  - Arunachal Pradesh Public Service Combined Competitive Examination Rules, 2019 (Schedule-II Part-A, Part-B, Part-C) and amendment notification No. PERS-36/2/2022 dated 13th March, 2024
  - Government of Arunachal Pradesh 7th CPC Revised Pay Matrix (Level 10 entry ₹56,100) & Special Duty Allowance (SDA) regulations for North Eastern Region
- **Sources only status-checked, not read**:
  - IAS (Appointment by Promotion) Regulations for Arunachal Pradesh (AGMUT Cadre)
- **Links curl-checked**:
  - `https://appsc.gov.in/upload/RECINS001/APPSCCE_2026_ADVERTISEMENT.pdf` → HTTP 200 OK (Content-Type: application/pdf, 5053461 bytes)
  - `https://appsc.gov.in/upload/RECINS001/SYLLABUS_APPSCCE_2026.pdf` → HTTP 200 OK (Content-Type: application/pdf, 23366158 bytes)
  - `https://appsc.gov.in/Index/sub_page/doc2195/Advertisements` → HTTP 200 OK
  - `https://appsc.gov.in/Index/common_sub_page/doc41138/Previous_Year_Questions` → HTTP 200 OK
- **Could NOT confirm, and why**: Exact applicant count for 2026 cycle is not yet known as the online application window opens on 16th September, 2026 and closes on 20th October, 2026; field left as null with verified vacancy count of 135 posts.
- **Confidence downgrades made, and why**: Career progression steps above Level 10 marked `reported` because promotion timelines in APCS depend on Departmental Promotion Committee (DPC) meetings, vacancy availability, and AGMUT cadre induction quotas.
