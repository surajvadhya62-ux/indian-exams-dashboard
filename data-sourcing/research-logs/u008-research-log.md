# Research Log: Unit 8 (u008) — Major State Public Service Commissions — Uttar Pradesh

- **Unit ID**: `u008`
- **Batch ID**: `batch-4-state-psc--uttar-pradesh`
- **AI Instance ID**: `Instance-u008 (Uttar Pradesh State PSC & Judiciary Worker)`
- **Timestamp**: 2026-09-11T20:41:00+05:30
- **Status**: Completed (2/2 exams researched, written, and validated)
- **Reviewer**: Antigravity IDE Autonomous Agent

---

## 1. Summary of Unit Execution
Unit 8 covers the two flagship examinations administered by the Uttar Pradesh Public Service Commission (UPPSC):
1. `up-pcs-j`: Uttar Pradesh Judicial Service Civil Judge (Junior Division) Examination (administered in consultation with the High Court of Judicature at Allahabad) — **Tier A**
2. `uppsc-pcs`: Uttar Pradesh Public Service Commission Provincial Civil Service (Combined State / Upper Subordinate Services Examination) — **Tier B**

Both dossiers have been authored in compliance with `RESEARCH-GUIDE.md` and `EXECUTION-PLAN.md`. In particular:
- **Judicial Service Pay Structure**: Accurately reflects the Second National Judicial Pay Commission (SNJPC) uniform pay matrix (Level J-1 entry basic ₹77,840) mandated by the Supreme Court of India in *All India Judges Association v. Union of India*, avoiding the central 7th CPC civilian matrix trap.
- **State Civil Service Pay Structure**: Correctly cites the Government of Uttar Pradesh Finance Department Revised Pay Rules, 2016 (Pay Matrix Level 10, PB-3 ₹15,600–39,100 with GP ₹5,400, entry basic ₹56,100).
- **Mains Syllabus Evolution**: Accurately reflects the elimination of optional subjects from UPPSC PCS Mains and the introduction of UP Special General Studies Papers V and VI (200 marks each).
- **Validation**: Both files passed `node scripts/data-sourcing/validate-details.mjs` with **0 errors** and **0 warnings**.

| Exam ID | Title | Tier | Jurisdiction | Entry Basic Pay | Primary Cycle | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `up-pcs-j` | UP Judicial Service Civil Judge (Junior Division) | A | Uttar Pradesh | SNJPC J-1 (₹77,840) | 303 (2022 Cycle) | **PASS** |
| `uppsc-pcs` | UP Combined State / Upper Subordinate Services (PCS) | B | Uttar Pradesh | UP Level 10 (₹56,100) | 947 (2024 Cycle) | **PASS** |

---

## 2. Detailed Exam Logs

### 2.1 `up-pcs-j`
- **Tier**: A, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads`
- **Sections marked not_available**: None (all sections fully populated from primary sources)
- **Sections omitted**: None (job examination)
- **Sources OPENED and read this session**:
  - UPPSC Official Portal: `https://uppsc.up.nic.in` (confirmed live 200 OK)
  - UPPSC Candidate Notifications Portal: `https://uppsc.up.nic.in/CandidatePages/Notifications.aspx` (confirmed live 200 OK)
  - UPPSC Post-Wise Syllabus Portal: `https://uppsc.up.nic.in/CandidatePages/Syllabus/Syllabus_PostWise.aspx?ID=4` (confirmed live 200 OK)
  - UPPSC Annual Exam Details & Calendar: `https://uppsc.up.nic.in/PublicPages/Examinations_Details.aspx?ID=EC` (confirmed live 200 OK)
  - UPPSC Document Download Portal: `https://uppsc.up.nic.in/CandidatePages/Advertismentwise_DownloadDocument.aspx?inptprmtr=ac` (confirmed live 200 OK)
  - Second National Judicial Pay Commission (SNJPC) Report & Supreme Court of India Order in *All India Judges Association v. Union of India* (WP (C) No. 643/2015)
  - Uttar Pradesh Judicial Service Rules, 2001 (as amended regarding separation of English/Hindi language papers into 100 marks each)
  - UPPSC Advt. No. A-5/E-1/2022 notification and result press notes (303 vacancies)
- **Sources only status-checked, not read**:
  - High Court of Judicature at Allahabad Service Rules archive
- **Links curl-checked**:
  - `https://uppsc.up.nic.in` → 200 OK
  - `https://uppsc.up.nic.in/CandidatePages/Notifications.aspx` → 200 OK
  - `https://uppsc.up.nic.in/CandidatePages/Syllabus/Syllabus_PostWise.aspx?ID=4` → 200 OK
  - `https://uppsc.up.nic.in/PublicPages/Examinations_Details.aspx?ID=EC` → 200 OK
  - `https://uppsc.up.nic.in/CandidatePages/Advertismentwise_DownloadDocument.aspx?inptprmtr=ac` → 200 OK
- **Could NOT confirm, and why**: Exact district-wise discretionary allowances (e.g. hill allowance in remote districts) vary by judicial district, so estimates specify base gross and net salary bands with perks noted.
- **Confidence downgrades made, and why**: None for primary scheme, syllabus, and pay; 2018 benchmark applicant count marked `reported` because it was cited from retrospective commission press releases.

---

### 2.2 `uppsc-pcs`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (enriched all 5 sections, exceeding Tier B minimum requirements)
- **Sections marked not_available**: None
- **Sections omitted**: None (job examination)
- **Sources OPENED and read this session**:
  - UPPSC Official Portal: `https://uppsc.up.nic.in` (confirmed live 200 OK)
  - UPPSC Candidate Notifications Portal: `https://uppsc.up.nic.in/CandidatePages/Notifications.aspx` (confirmed live 200 OK)
  - UPPSC Post-Wise Syllabus Portal: `https://uppsc.up.nic.in/CandidatePages/Syllabus/Syllabus_PostWise.aspx?ID=4` (confirmed live 200 OK)
  - Government of Uttar Pradesh, Finance Department — U.P. Revised Pay Rules 2016 (Pay Matrix Level 10 entry ₹56,100)
  - UPPSC Advt. No. A-1/E-1/2024 notification and final vacancy release (947 vacancies, 5.76 lakh registered candidates, 13,776 appeared in Mains)
  - UPPSC Advt. No. A-1/E-1/2023 notification and final result release (254 vacancies, 5.65 lakh registered candidates)
- **Sources only status-checked, not read**:
  - IAS (Appointment by Promotion) Regulations for UP Cadre induction quota
- **Links curl-checked**:
  - `https://uppsc.up.nic.in` → 200 OK
  - `https://uppsc.up.nic.in/CandidatePages/Notifications.aspx` → 200 OK
  - `https://uppsc.up.nic.in/CandidatePages/Syllabus/Syllabus_PostWise.aspx?ID=4` → 200 OK
  - `https://uppsc.up.nic.in/PublicPages/Examinations_Details.aspx?ID=EC` → 200 OK
  - `https://uppsc.up.nic.in/CandidatePages/Advertismentwise_DownloadDocument.aspx?inptprmtr=ac` → 200 OK
- **Could NOT confirm, and why**: Exact municipal corporation HRA variance across Class A (27-30%), Class B (18-20%), and Class C (9-10%) districts; captured as min-max salary ranges.
- **Confidence downgrades made, and why**: Promotion steps from Selection Grade onwards marked `reported` because IAS cadre review and induction depend on central DoPT vacancy quotas.
