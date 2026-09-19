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
