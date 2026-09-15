# Research Log: Unit 19 (u019) — Major State Public Service Commissions — Gujarat

- **Unit ID**: `u019`
- **Batch ID**: `batch-4-state-psc--gujarat`
- **Label**: `Major State Public Service Commissions (State Administrative Services) — Gujarat`
- **Timestamp**: 2026-09-11T23:28:00+05:30
- **Status**: Completed (1/1 exam researched, written, and validated)
- **Reviewer**: Antigravity IDE Autonomous Agent

---

## 1. Summary of Unit Execution
Unit 19 covers the flagship Combined Competitive Examination conducted by the Gujarat Public Service Commission (GPSC):
- `gpsc-class-1-2`: Gujarat Public Service Commission Class 1-2 Services (Gujarat Administrative Service, Class-1, Gujarat Civil Services, Class-1 & Class-2 and Gujarat Municipal Chief Officer Service, Class-2) — **Tier B**

The dossier has been authored in strict compliance with `RESEARCH-GUIDE.md` and `EXECUTION-PLAN.md`:
- **State Pay Matrix Structure**: Governed by the Government of Gujarat, Finance Department — Gujarat Civil Services (Revision of Pay) Rules, 2016 (ગુજરાત મુલ્કી સેવા (પગાર સુધારણા) નિયમો, ૨૦૧૬).
  - Class-1 administrative posts (Junior Scale / Deputy Collector / Assistant Commissioner of State Tax / DySP) start at Gujarat Pay Matrix Level 10 (PB-3 ₹15,600–₹39,100 + GP ₹5,400) with entry basic pay ₹56,100 (scale ₹56,100 - ₹1,77,500).
  - Class-2 posts (Mamlatdar / Taluka Development Officer / Section Officer) start at Level 8 (PB-2 ₹9,300–₹34,800 + GP ₹4,400) with entry basic pay ₹44,900 (scale ₹44,900 - ₹1,42,400).
  - Strictly avoids central 7th CPC civilian matrix transposition.
- **Exam Scheme**:
  - *Preliminary Examination*: 2 objective screening papers of 200 marks each (400 marks total; 180 minutes each). Negative marking is 0.33 mark (1/3rd penalty for wrong answers or unencoded options). Both papers count toward merit to determine the shortlist for the Main Written Examination.
  - *Main Examination*: 2 qualifying language papers of 300 marks each (Paper I Gujarati, Paper II English) requiring minimum 25% qualifying threshold (75/300 marks; grammar sections utilize OMR answer sheets with 0.6 penalty for wrong answers). Five merit-based descriptive papers of 250 marks each (Paper III Essay, Paper IV GS-I, Paper V GS-II, Paper VI GS-III, Paper VII GS-IV; 1,250 marks total).
  - *Personality Test*: 150 marks viva-voce board interview at GPSC Bhavan, Gandhinagar.
  - *Final Merit*: Prepared out of 1,400 marks (1,250 written + 150 interview).
- **Competition Benchmarks**:
  - Advt. No. 240/2024-25: 244 vacancies, ~1.95 lakh applicants, ~97,000 appeared in Prelims on 20-04-2025, 6,893 candidates provisionally qualified for Mains on 05-07-2025.
  - Advt. No. 20/2022-23: 102 vacancies, ~1.65 lakh applicants, 3,806 candidates initially shortlisted for Mains (revised to 5,422).
  - Advt. No. 30/2021-22: 183 vacancies, ~1.8 lakh applicants, 5,315 candidates initially shortlisted for Mains (revised to 5,706).
- **Validation**: Passed `node scripts/data-sourcing/validate-details.mjs` with **0 errors** and **0 warnings**.

| Exam ID | Title | Tier | Jurisdiction | Entry Basic Pay | Primary Cycle | Validation |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| `gpsc-class-1-2` | Gujarat Public Service Commission Class 1-2 Services | B | Gujarat | Gujarat Level 10 (₹56,100) | 244 (2024-25 Cycle) | **PASS** |

---

## 2. Detailed Exam Log

### 2.1 `gpsc-class-1-2`
- **Tier**: B, **Exam Type**: job
- **Sections populated**: `career_ladder`, `exam_scheme`, `financial_package`, `competition_benchmarks`, `official_downloads` (all 5 sections fully populated, exceeding Tier B minimum requirements of `exam_scheme` and `official_downloads`)
- **Sections marked not_available**: None
- **Sections omitted**: None (job examination)
- **Sources OPENED and read this session**:
  - GPSC Official Web Portal: `https://gpsc.gujarat.gov.in` (confirmed live 200 OK)
  - GPSC Advertisements Dashboard: `https://gpsc.gujarat.gov.in/dashboard?stage=Advertisement` (confirmed live 200 OK)
  - GPSC Examination Syllabus Repository: `https://gpsc.gujarat.gov.in/StageDocument?name=syllabus` (confirmed live 200 OK)
  - GPSC Examination Results & Selection Lists Dashboard: `https://gpsc.gujarat.gov.in/dashboard?stage=Result` (confirmed live 200 OK)
  - GPSC Online Job Application System (OJAS Portal): `https://gpsc-ojas.gujarat.gov.in` (confirmed live 200 OK)
  - GPSC Class 1-2 Main Written Examination Revised Scheme & Syllabus PDF: `https://gpsc.gujarat.gov.in/Documents/AdvertismentDocument/SY-MWE-240-202425.pdf` (confirmed live 200 OK; 280,630 bytes; downloaded and parsed via `pdftotext`)
  - GPSC Class 1-2 Preliminary Examination Syllabus PDF: `https://gpsc.gujarat.gov.in/Documents/AdvertismentDocument/SLBEG-240-202425.pdf` (confirmed live 200 OK; 1,082,670 bytes)
  - Government of Gujarat, Finance Department — Gujarat Civil Services (Revision of Pay) Rules, 2016 (Schedule I, Pay Matrix Level 10 entry basic ₹56,100; Level 8 entry basic ₹44,900)
  - GPSC Preliminary Exam Result Notification & Merit List for Advt. No. 240/2024-25 (05-07-2025; 6,893 candidates qualified for Mains)
  - GPSC Recruitment Advertisements: Advt. No. 5/2026-27 (213 vacancies), Advt. No. 240/2024-25 (244 vacancies), Advt. No. 20/2022-23 (102 vacancies), Advt. No. 30/2021-22 (183 vacancies)
- **Sources only status-checked, not read**:
  - Gujarat General Administration Department (GAD) cadre strength registers
- **Links curl-checked**:
  - `https://gpsc.gujarat.gov.in` → 200 OK
  - `https://gpsc.gujarat.gov.in/dashboard?stage=Advertisement` → 200 OK
  - `https://gpsc.gujarat.gov.in/StageDocument?name=syllabus` → 200 OK
  - `https://gpsc.gujarat.gov.in/dashboard?stage=Result` → 200 OK
  - `https://gpsc-ojas.gujarat.gov.in` → 200 OK
  - `https://gpsc.gujarat.gov.in/Documents/AdvertismentDocument/SY-MWE-240-202425.pdf` → 200 OK
  - `https://gpsc.gujarat.gov.in/Documents/AdvertismentDocument/SLBEG-240-202425.pdf` → 200 OK
- **Could NOT confirm, and why**: Exact discretionary field allowances (e.g. mobile allowances, special judicial allowances if assigned to revenue courts) vary by district collectorate posting; basic pay and DA components are verified.
- **Confidence downgrades made, and why**: None.
