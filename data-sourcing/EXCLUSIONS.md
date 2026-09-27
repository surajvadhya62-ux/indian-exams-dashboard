# Exclusions register

Candidates evaluated against [INCLUSION-POLICY.md](INCLUSION-POLICY.md) and **not** admitted to
the database.

Keeping this is the equivalent of retaining the working papers for items scoped out of an
audit: it shows what was considered, on what ground it was set aside, and what would have to
change for the decision to be revisited. Without it, every discovery run re-evaluates the same
rejected candidates from scratch, because aggregator sites keep re-listing them.

---

## How to use it

**Before admitting any candidate, check here first.** If it is already listed, the decision has
been made — do not re-evaluate unless the "revisit when" column has actually come true.

**When rejecting a candidate**, add a row. Name the single criterion it failed first; if it
fails several, record the one that is cheapest to check, since that is the one a future run
will reach first.

The criteria, from the policy §2:

| Code | Criterion |
|---|---|
| A | The conducting body is public |
| B | Open to public application |
| C | It is a consequential gate |
| D | It recurs |
| E | There is a primary source |
| F | Notified at national or state level |
| U | Not a distinct exam — an edition or duplicate of one already recorded (policy §3) |

`U` is expected to be the most common rejection by a wide margin once aggregator-based
discovery starts, because aggregators list every notification separately, including each
district's share of a single state-level exam.

---

## Register

| Date | Candidate | Conducting body | Failed | Note | Revisit when |
|---|---|---|---|---|---|
| 2026-09-19 | Tripura Public Service Commission Civil Service Examination (`tpsc-tcs`) | TPSC | U | Duplicate of `tpsc-cce` — same recruitment (TCS Grade-II, Pay Matrix Level 14, ₹54,000 entry, same 2018 pay rules citation, same IAS induction path); both added in the same original bulk-generation commit (`d16afc3`). `tpsc-cce` is the more complete record (it also covers TPS Grade-II, the police half of the same combined exam) and was kept; `tpsc-tcs` removed from `exams.json`, its dossier file, `authorities.json`'s `tpsc` entry, and its `news.json` dispatch stub. Its 2025 benchmark row had already been caught and removed in the 2026-09-18 fabricated-benchmarks audit, and its `exams.json.vacancies` was still on the "480 Posts" 16-exam-wide placeholder — a second-generation cleanup on an entry that never had real data behind it. | Only if TPSC ever splits TCS and TPS into genuinely separate competitive exams (not just separate cadres within one combined exam) |
| 2026-09-27 | UP Anganwadi Worker/Helper and ECCE Educator recruitment, any district (discovery leads: `anganwadi-up-worker`, `anganwadi-bharti-helper-shahjahanpur-up`, `anganwadi-bharti-gonda-up-worker`, `agra-ecce-educator-up`, `ecce-educator-mainpuri-up`, `ecce-educator-nagar-siddharth-up`, `83-azamgarh-ecce-educator-for-up`, `azamgarh-ecce-educator-up`, `ecce-educator-moradabad-up`) | District Programme Officer (DPO), ICDS, Uttar Pradesh | C | Verified there is no written exam at all — selection is a straight merit list from existing Class 10/12 board marks, run independently by each district's DPO (confirmed via multiple current UP Anganwadi Bharti 2026 notices). No test, syllabus, or cut-off exists to have a dossier about; it also fails F in substance, since there is no common state-level exam underlying the district notices, only a shared hiring scheme. Owner ruled 2026-09-27: reject the whole family in one pass rather than re-litigating per district. Two of the nine (`83-azamgarh-ecce-educator-for-up` and `azamgarh-ecce-educator-up`) were also the same Azamgarh posting picked up twice by the aggregator under different wording. | Only if any state formally introduces a written qualifying exam for this cadre |
| 2026-09-27 | UKSSSC Group C Scaler Online Form 2026 (`group-scaler-uksssc`) | UKSSSC | U | Not a separate exam — "Scaler" refers to the score-normalization method for a multi-shift CBT, and UKSSSC's Group C recruitment is already tracked as `uksssc-graduate-level` and `uksssc-intermediate-level`. | Only if UKSSSC ever runs a genuinely distinct Group C exam that doesn't fold into either existing record |
| 2026-09-27 | UP DELED Online Counselling 2026 (`counselling-deled-up`) | Pariksha Niyamak Pradhikari (PNP), Prayagraj | U | Counselling is the post-result seat-allotment stage of the UP D.El.Ed entrance exam, not a separate exam. The underlying entrance test itself was a genuine gap — added the same day as `up-deled-entrance` (Bachelor's degree entry, PNP Prayagraj, `updeled.gov.in`, annual). | N/A — resolved by adding the entrance exam itself |
| 2026-09-27 | NIELIT CCC (Course on Computer Concepts) and MP CPCT (Madhya Pradesh Computer Proficiency Certification Test) (discovery leads: `ccc-nielit`, `cpct-mp`) | NIELIT / MeitY; MP state government | C | Neither confers a job (R), a seat (A), or a professional right-to-practise (Q) on its own — both are mandatory computer-literacy eligibility certificates that other government recruitments require as one item on a checklist, not exams in themselves. Same structural bucket as the already-flagged NISM Regulatory Certifications (`nism-certifications`). Owner ruling 2026-09-27: reject both. | Only if either is ever restructured into an exam that itself confers a job, seat or professional designation |
