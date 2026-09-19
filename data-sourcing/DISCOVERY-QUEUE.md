# Discovery queue — candidate exams not yet in the database

Titles found on public aggregators by `discover-exams.mjs`, newest first.

**Nothing here is an exam yet.** This is a lead: a title that doesn't match any acronym
already in `src/data/exams.json`. Before adding it, check it against every condition in
`data-sourcing/INCLUSION-POLICY.md` §2 — in particular:

- **Recurrence (criterion D).** A one-off hiring drive by a single institute or PSU does
  not belong, no matter how large. This is the most common way an Employment News row
  fails — see the "needs recurrence check" note on those rows below.
- **A real match can still slip through.** This script's matching is deliberately
  conservative (see the comment at the top of discover-exams.mjs) — it only suppresses a
  candidate when an existing exam's acronym is fully present in the title, or at least
  two of the exam's own name words are. That means some rows below may already be in the
  database under different wording than either of those. Check `src/data/exams.json`
  yourself before treating a row as confirmed-new.

If a candidate turns out to genuinely belong, use `sync-exams.mjs --add` — it will set
`record_tier: "registry"` automatically, so the new entry honestly shows as a stub until
a full dossier is built for it. If a candidate is rejected, delete the row and record it
in `data-sourcing/EXCLUSIONS.md` with the reason, per policy §2.

---

## Bihar STET 2026 Apply Online — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/bseb-stet-august26/
- **Status:** unreviewed
- **Key:** `Sarkari Result|bihar-stet`

## UP Anganwadi Worker Apply Online — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/up-anganwadi-worker/
- **Status:** unreviewed
- **Key:** `Sarkari Result|anganwadi-up-worker`

## UPPSC Various Post 2024 Result 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2024/uppsc-various-oct24/
- **Status:** unreviewed
- **Key:** `Sarkari Result|2024-uppsc-various`

## UP DGMHUP ANM Training Selected Candidate List / Merit List 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/up-dgmhup-anm-jul26/
- **Status:** unreviewed
- **Key:** `Sarkari Result|anm-candidate-dgmhup-selected-training-up`

## DSSSB Latest Result 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/delhi/dsssb-latest-result/
- **Status:** unreviewed
- **Key:** `Sarkari Result|dsssb`

## IOB Indian Overseas Bank Apprentice Result 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/iob-apprentice-july26/
- **Status:** unreviewed
- **Key:** `Sarkari Result|apprentice-bank-indian-iob-overseas`

## Bihar Vidhan Parishad LDC / DEO Final Result (Advt No 02/2025) — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/bihar/bihar-vidhan-02-2024/
- **Status:** unreviewed
- **Key:** `Sarkari Result|02-advt-bihar-deo-final-ldc-no-parishad-vidhan`

## UPPSC Assistant Town Planner ATP 2025 Pre Result — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/uppsc-atp-november25/
- **Status:** unreviewed
- **Key:** `Sarkari Result|assistant-atp-planner-pre-town-uppsc`

## UP TGT 2022 College Allotment Result — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2022/up-tgt-01-2022/
- **Status:** unreviewed
- **Key:** `Sarkari Result|2022-allotment-college-tgt-up`

## UPSSSC Nakshanavish and Manchitrak DV 2026 Advt. No. 11-Exam/2023 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/upsssc/upsssc-advt-11-2023/
- **Status:** unreviewed
- **Key:** `Sarkari Result|11-2023-advt-and-dv-manchitrak-nakshanavish-no-upsssc`

## DSSSB Latest Score Card / Marks 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/delhi/dsssb-latest-result/
- **Status:** unreviewed
- **Key:** `Sarkari Result|dsssb-marks-score`

## EMRS Teaching and Non Teaching Post Tier II Result 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2025/emrs-tgt-pgt-other-2025/
- **Status:** unreviewed
- **Key:** `Sarkari Result|and-emrs-ii-non-teaching-teaching-tier`

## RPSC Deputy Jailor 2024 Result — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/rpsc/rpsc-dy-jailor-04-2024/
- **Status:** unreviewed
- **Key:** `Sarkari Result|2024-deputy-jailor-rpsc`

## Indian Airforce Agniveervayu Intake 02/2027 Admit card 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/force/indian-airforce-agniveervayu-02-2027/
- **Status:** unreviewed
- **Key:** `Sarkari Result|02-agniveervayu-airforce-indian-intake`

## RRB Section Controller Application Status 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/rrb-section-controller-03-2026/
- **Status:** unreviewed
- **Key:** `Sarkari Result|application-controller-rrb-section-status`

## UPSSSC Pharmacist Ayurvedic 2024 Admit Card 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/upsssc/upsssc-pharmaceutical-01-2024/
- **Status:** unreviewed
- **Key:** `Sarkari Result|2024-ayurvedic-pharmacist-upsssc`

## UPCISB UP Cooperative Bank Various Post Admit Card 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/upcisb-various-post-may26/
- **Status:** unreviewed
- **Key:** `Sarkari Result|bank-cooperative-up-upcisb-various`

## UPESSC Principal Admit Card 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/upessc-principal-02-2026/
- **Status:** unreviewed
- **Key:** `Sarkari Result|principal-upessc`

## UPSC NDA II Admit Card 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/upsc/upsc-nda-ii-exam-2026/
- **Status:** unreviewed
- **Key:** `Sarkari Result|ii-nda-upsc`

## UPSSSC Pharmacist Ayurvedic 2024 Exam City Details 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/upsssc/upsssc-pharmaceutical-01-2024/
- **Status:** unreviewed
- **Key:** `Sarkari Result|2024-ayurvedic-city-details-pharmacist-upsssc`

## Indian Airforce Agniveervayu Intake 02/2027 Exam City / Admit Card 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/force/indian-airforce-agniveervayu-02-2027/
- **Status:** unreviewed
- **Key:** `Sarkari Result|02-agniveervayu-airforce-city-indian-intake`

## UPPSC Various Post 2024 Result 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2024/uppsc-various-oct24/
- **Status:** unreviewed
- **Key:** `Sarkari Result|2024-uppsc-various`

## UP Anganwadi Helper Bharti Shahjahanpur Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/up-anganwadi-helper-june26/
- **Status:** unreviewed
- **Key:** `Sarkari Result|anganwadi-bharti-helper-shahjahanpur-up`

## UPESSC UP PGT Teacher Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/upessc-up-pgt-teacher-sept26/
- **Status:** unreviewed
- **Key:** `Sarkari Result|pgt-teacher-up-upessc`

## MPESB Primary and Middle School Teachers MSPSTET Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/mpesb-mspstet-2026/
- **Status:** unreviewed
- **Key:** `Sarkari Result|and-middle-mpesb-mspstet-primary-school-teachers`

## UPESSC UP Assistant Professor Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/upessc-assistant-professor-04-2026/
- **Status:** unreviewed
- **Key:** `Sarkari Result|assistant-professor-up-upessc`

## UP Special TET Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/up-special-tet-exam/
- **Status:** unreviewed
- **Key:** `Sarkari Result|special-tet-up`

## UKSSSC Group C Scaler Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/uksssc-group-c-scaler-sep26/
- **Status:** unreviewed
- **Key:** `Sarkari Result|group-scaler-uksssc`

## Southern Railway RRC SR Apprentices Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/rrc-sr-apprentices-august26/
- **Status:** unreviewed
- **Key:** `Sarkari Result|apprentices-railway-rrc-southern-sr`

## Bihar STET Online Form 2026 | Date Extended — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/bseb-stet-august26/
- **Status:** unreviewed
- **Key:** `Sarkari Result|bihar-extended-stet`

## UPSSSC Veterinary Pharmacist Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/upsssc-veterinary-18-exam-2026/
- **Status:** unreviewed
- **Key:** `Sarkari Result|pharmacist-upsssc-veterinary`

## UP Anganwadi Worker Bharti Gonda Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/up-anganwadi-worker/
- **Status:** unreviewed
- **Key:** `Sarkari Result|anganwadi-bharti-gonda-up-worker`

## UKPSC Pre 2026 Online Form — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/ukpsc-pre-2026/
- **Status:** unreviewed
- **Key:** `Sarkari Result|pre-ukpsc`

## Rajasthan RSSB Computer Instructor Answer Key 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/rpsc/rssb-computer-instructor-07-2026/
- **Status:** unreviewed
- **Key:** `Sarkari Result|computer-instructor-rajasthan-rssb`

## UPSC NDA II Answer Key 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/upsc/upsc-nda-ii-exam-2026/
- **Status:** unreviewed
- **Key:** `Sarkari Result|ii-nda-upsc`

## UPSSSC Teacher Cadre JTC Revised Answer Key 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/upsssc/upsssc-teacher-03-exam-2026/
- **Status:** unreviewed
- **Key:** `Sarkari Result|cadre-jtc-revised-teacher-upsssc`

## BSF HC Ministerial and ASI Steno Answer Key 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/force/bsf-hcmin-asisteno-june24/
- **Status:** unreviewed
- **Key:** `Sarkari Result|and-asi-bsf-hc-ministerial-steno`

## Rajasthan RPSC APO Answer Key 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/rpsc-apo-june26/
- **Status:** unreviewed
- **Key:** `Sarkari Result|apo-rajasthan-rpsc`

## BSNL JTO Answer Key 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/bsnl-jto-2026/
- **Status:** unreviewed
- **Key:** `Sarkari Result|bsnl-jto`

## UPSSSC BCG Technician 2024 Final Answer Key 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/upsssc/upsssc-bcg-10exam-2024/
- **Status:** unreviewed
- **Key:** `Sarkari Result|2024-bcg-final-technician-upsssc`

## UPSSSC UP Pharmacist Mains Final Answer Key 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/upsssc/upsssc-pharmacist-01-2026/
- **Status:** unreviewed
- **Key:** `Sarkari Result|final-mains-pharmacist-up-upsssc`

## UPSSSC UP Pollution Control Board Various Post Final Answer Key 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/upsssc/upsssc-02-exam-2026/
- **Status:** unreviewed
- **Key:** `Sarkari Result|board-control-final-pollution-up-upsssc-various`

## DSSSB July 2026 Exam Answer Key — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/delhi/dsssb-admit-card-download/
- **Status:** unreviewed
- **Key:** `Sarkari Result|dsssb-july`

## UPSSSC Veterinary Pharmacist Syllabus 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/upsssc-veterinary-18-exam-2026/
- **Status:** unreviewed
- **Key:** `Sarkari Result|pharmacist-upsssc-veterinary`

## UPESSC Principal Syllabus 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/upessc-principal-02-2026/
- **Status:** unreviewed
- **Key:** `Sarkari Result|principal-upessc`

## UPSSSC Moharir 2022 Exam Syllabus — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/upsssc/upsssc-moharir-07-2022/
- **Status:** unreviewed
- **Key:** `Sarkari Result|2022-moharir-upsssc`

## UPSSSC Pharmacist Ayurvedic 2024 Syllabus — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/upsssc/upsssc-pharmaceutical-01-2024/
- **Status:** unreviewed
- **Key:** `Sarkari Result|2024-ayurvedic-pharmacist-upsssc`

## UPRTOU Ph.D Entrance Exam Admission Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/uprtou-ph-d-entrance-exam-sep26/
- **Status:** unreviewed
- **Key:** `Sarkari Result|entrance-ph-uprtou`

## NTA RIMCEE Class 8th Admissions Online Form 2027 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/nta-rimcee-class-8th-sep26/
- **Status:** unreviewed
- **Key:** `Sarkari Result|8th-admissions-class-nta-rimcee`

## Allahabad University PHd Admissions Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/university-of-allahabad-au-sep26/
- **Status:** unreviewed
- **Key:** `Sarkari Result|admissions-allahabad-phd-university`

## UP DELED Online Counselling 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/updeled-admissions-2/
- **Status:** unreviewed
- **Key:** `Sarkari Result|counselling-deled-up`

## NVS Class 6th Admissions Online Form 2027 Date Extended — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/nvs-class-6th-admission-july26/
- **Status:** unreviewed
- **Key:** `Sarkari Result|6th-admissions-class-extended-nvs`

## SAV Jamui Bihar Class VI 6th Admission Online Form 2027 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/sav-class-6th-admission-august26/
- **Status:** unreviewed
- **Key:** `Sarkari Result|6th-bihar-class-jamui-sav-vi`

## UP SCVTUP ITI Admissions Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/upiti-admission-july2026/
- **Status:** unreviewed
- **Key:** `Sarkari Result|admissions-iti-scvtup-up`

## UP ECCE Educator Agra Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/up-ecce-educator-agra-sep26/
- **Status:** unreviewed
- **Key:** `Sarkari Result|agra-ecce-educator-up`

## UP ECCE Educator Mainpuri Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/up-ecce-educator-mainpuri-sep26/
- **Status:** unreviewed
- **Key:** `Sarkari Result|ecce-educator-mainpuri-up`

## UP ECCE Educator Siddharth Nagar Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/uttar-pradesh-ecce-educator-sep26/
- **Status:** unreviewed
- **Key:** `Sarkari Result|ecce-educator-nagar-siddharth-up`

## UP Azamgarh ECCE Educator Online Form 2026 for 83 Post — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/up-azamgarh-ecce-educator-sep26/
- **Status:** unreviewed
- **Key:** `Sarkari Result|83-azamgarh-ecce-educator-for-up`

## UP ECCE Educator Azamgarh Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/up-ecce-educator-azamgarh-sept26/
- **Status:** unreviewed
- **Key:** `Sarkari Result|azamgarh-ecce-educator-up`

## UP ECCE Educator Moradabad Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/up-ecce-educator-moradabad-sept26/
- **Status:** unreviewed
- **Key:** `Sarkari Result|ecce-educator-moradabad-up`

## KGBV Kasturba Gandhi Balika Vidyalaya Shamli Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/kgbv-shamli-augut26/
- **Status:** unreviewed
- **Key:** `Sarkari Result|balika-gandhi-kasturba-kgbv-shamli-vidyalaya`

## Rajasthan Safai Karamchari Worker Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/rajasthan-sanitation-worker-jul26/
- **Status:** unreviewed
- **Key:** `Sarkari Result|karamchari-rajasthan-safai-worker`

## UP Nursing Council Registration Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2027/up-nursing-council-registration/
- **Status:** unreviewed
- **Key:** `Sarkari Result|council-nursing-registration-up`

## NIELIT CCC Exam Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/nielit-ccc-july26/
- **Status:** unreviewed
- **Key:** `Sarkari Result|ccc-nielit`

## NIELIT CCC Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/nielit-ccc-online-form/
- **Status:** unreviewed
- **Key:** `Sarkari Result|ccc-nielit`

## MP CPCT Online Form 2026 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/mp/mp-cpct-2026/
- **Status:** unreviewed
- **Key:** `Sarkari Result|cpct-mp`

## SSC OTR Online Form 2024 — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/ssc/ssc-one-time-registration-otr/
- **Status:** unreviewed
- **Key:** `Sarkari Result|2024-otr-ssc`

## UP Police Result — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/2026/up-police-constable-jan26/
- **Status:** unreviewed
- **Key:** `Sarkari Result|police-up`

## job with the IAS/IFS — via Sarkari Result

- **Seen:** 2026-09-19
- **Link:** https://www.sarkariresult.com/upsc/upsc-ias-ifs-pre-2026/
- **Status:** unreviewed
- **Key:** `Sarkari Result|ias-ifs-the-with`

## NALANDA UNIVERSITY — TEACHING POSITIONS — via Employment News ⚠️ needs recurrence check (criterion D)

- **Seen:** 2026-09-19
- **Link:** https://employmentnews.gov.in/NewEmp/Home.aspx
- **Status:** unreviewed
- **Key:** `Employment News|nalanda-positions-teaching-university`
