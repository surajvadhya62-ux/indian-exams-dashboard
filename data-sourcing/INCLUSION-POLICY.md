# Inclusion Policy — what belongs in this database

**Status:** **in force.** Scope questions settled by the owner on 2026-09-18 (§8).
Nothing has yet been added to or removed from the database on its strength — the remediation
of the existing 500 (§6) and the schema change it depends on (§5) are still outstanding.
**Date:** 2026-09-18
**Applies to:** `src/data/exams.json` and the dossiers in `public/exam-details/`

---

## Why this document exists

The stated goal is to cover Indian exams *exhaustively*. "Exhaustive" is not a
measurable claim until someone writes down what the population is. Without that
boundary there is no way to say how complete the database is, no way to settle whether a
borderline exam belongs, and no way for two different people (or two different sessions)
to make the same call on the same candidate.

This is the scoping memo. It defines the population first, so that coverage can afterwards
be stated as a fraction of something real rather than as an adjective.

A second purpose: a boundary is also a defence. The moment the site claims to be
exhaustive, every omission is a defect. A published inclusion rule converts most
omissions from "you missed one" into "that one is out of scope, here is why".

---

## 1. The three tracks

The database already contains three different kinds of exam, and they were never
distinguished. They answer different questions for the student and they cannot share one
set of rules.

| Track | What passing it gets you | In the current 500 |
|---|---|---|
| **R — Recruitment** | A job. A specific post in government, a PSU, a bank or a statutory body. | 379 |
| **A — Admission** | A seat. Entry to a course at a government or government-funded institution. | ~117 |
| **Q — Qualification** | A professional entitlement. The right to practise or to hold a designation. | 4 (CA, CS, CMA, AIBE) |

All three stay in scope. A student deciding what to do after graduation weighs a
government job against a professional qualification against a postgraduate seat; a site
that carried only one of the three would be answering a narrower question than the one
students actually ask.

But the track must be **recorded on each exam and shown on the site**, because the fields
that matter differ by track. A vacancy count is meaningful for track R and meaningless for
tracks A and Q. (Today all 121 admission exams carry a "Posts" figure — see §6.)

**Action required:** the current `exam_type` field has two values, `job` and `entrance`, and
it puts CA, CS, CMA and AIBE under `entrance`. That is wrong — they admit you to a
profession, not to a course. Track Q needs to be separated from track A.

---

## 2. The inclusion test

An exam is in scope only if **all six** conditions hold. If you cannot establish one of
them, the exam does not go in — an unestablished criterion is a fail, not a maybe.

### A. The conducting body is public

Conducted by one of:
- a Union or state government ministry, department, commission or subordinate office
- a constitutional or statutory body (UPSC, the State PSCs, RBI, SEBI, and similar)
- a public sector undertaking, public sector bank, or other government-owned entity
- a statutory professional institute created by an Act (ICAI, ICSI, ICMAI, Bar Council)
- a government or government-funded university, board or testing agency, **where the exam
  is a common gateway to more than one institution** (NTA, the state CET cells)
- an **autonomous body created by an Act, a government resolution, or as a government
  society or company** — the IITs, IIMs, ISRO, DRDO, BARC, ICAR, AIIMS, KVS, NVS, NCERT

**Out:** private companies, private universities' own entrance tests, coaching-institute
scholarship tests, and tests run by private certification vendors. A single private
institution's admission test is out even when it is well known.

**Out:** privately founded, privately governed institutions that merely *receive* government
aid. A grant does not make a body public.

**The test is creation and ownership, not autonomy.** In Indian administrative usage
"autonomous" describes how a body governs itself internally, not who owns it — the IITs,
ISRO, DRDO and KVS are all created by government and funded from the public purse. Reading
autonomy as a reason to exclude would drop 52 of the current 500 exams, including 16 of the
176 marked `very_high`: JEE Advanced, CAT, GATE, CUET, UGC-NET, CSIR-NET, ISRO Scientist,
DRDO CEPTAM, BARC, the KVS and NVS teacher recruitments, ESIC, EPFO and AIIMS Nursing
Officer. The line belongs at *aided*, not at *autonomous*.

### B. Open to public application

Any person meeting the published eligibility can apply directly, without already holding a
post or a sponsorship.

**Out:** internal departmental promotion exams and limited departmental competitive
examinations. A student cannot sit them, so they cannot appear on a student's shortlist.

### C. It is a consequential gate

Passing confers a defined outcome — a post, a seat, or a professional entitlement — under
a published selection process.

Note this is deliberately not "competitive". Some qualification exams (CA Final, for
instance) are pass/fail against a fixed standard rather than ranked against a vacancy
count. They are still gates and still in scope.

**Out:** practice tests, mock exams, eligibility screening with no consequence of its own,
and awareness or scholarship quizzes.

### D. It recurs

Held at a stated or observable cadence, **and** either held at least twice already, or
formally notified as a first edition with a stated recurrence.

**Out:** one-off recruitment drives. This is the criterion that protects the database's
value: the site's worth is that it holds history and lets a student plan forward. A drive
that happens once and never again carries neither.

### E. There is a primary source

An official notification or an official page from the conducting body, which can be cited
and dated.

This is the vouching rule, and it is the one that the database currently cannot satisfy —
there is no field to record a source in. See §5.

**Out:** anything known only from a news report, a coaching site, or an aggregator listing.
Those are leads for the discovery pipeline, not entries. An aggregator tells you where to
look; it is not itself the evidence.

### F. It is notified at national or state level

The exam is notified by a body with national or state-wide remit, even where the resulting
postings are district-wise.

**Out:** individual district or office-level notifications issued under a common state-level
exam. Those are *editions* of an exam already in the database, not separate exams. Without
this rule the population runs to many thousands of near-duplicates and "exhaustive" becomes
unattainable by construction.

---

## 3. The unit of record — one exam, or two?

More entries are wrongly created by splitting than by any other mistake. The rule:

**One record per distinct selection process.** Two exams are the same record when they
share a syllabus, a selection process and an outcome, and differ only in year, cycle,
sitting, region or notification number.

Separate records when **any** of these differ:
- the syllabus or the paper structure
- the qualification required to sit
- the outcome (a different post, cadre, or course)
- the conducting body

Worked examples, following the convention the database already uses:
- JEE Main Paper 1 (B.E./B.Tech) and Paper 2 (B.Arch) → **two records.** Different syllabus,
  different outcome. The existing data already splits these correctly.
- UPSC CSE 2025 and UPSC CSE 2026 → **one record.** Different editions of one exam.
- Kerala PSC and Tamil Nadu PSC equivalents → **separate records.** Different conducting body.
- A constable recruitment notified by a state police board, with vacancies allotted across
  districts → **one record**, not one per district.

---

## 4. Two tiers, declared on the site

Not every in-scope exam justifies a full dossier, and 1,500 half-empty dossiers would be
worth less than 500 complete ones. Two tiers, with the tier shown to the visitor:

**Registry entry** — the minimum for an exam to exist in the database at all:
name, conducting body, track, minimum qualification, frequency, official link, and the
source citation from criterion E.

**Full dossier** — everything currently in `public/exam-details/`: career ladder, salary,
exam scheme, cutoffs, vacancies, the lot.

Promotion from registry to dossier is driven by demand rather than by whoever is doing the
data entry that week — candidate volume, or search interest, or the owner's judgement.

The honesty point matters more than the mechanics: a visitor should be able to see at a
glance that an entry is a stub, rather than discovering it after three clicks. Labelling a
thin entry as thin costs nothing and is the difference between a database that is
incomplete and one that is misleading.

---

## 5. What the policy needs that the schema does not have

Criterion E is unenforceable today. Every one of the 500 records carries the same 23
fields, and **none of them records where a fact came from or when it was last verified.**
There is an `official_website` for the exam, but no citation attached to any individual
figure.

**Implemented 2026-09-18.** Each record now carries a `provenance` object keyed by field
name, so that cutoffs can join it later without another migration:

```json
"provenance": {
  "vacancies": {
    "source_url": null,
    "source_date": null,
    "verified_on": null,
    "confidence": "placeholder",
    "note": "Default value: \"650 Posts\" appears on 92 exams, so it was not researched for this one."
  }
}
```

`confidence` does the real work, on a five-point scale defined in `src/utils/provenance.js`:

| Level | Meaning |
|---|---|
| `not_applicable` | the field is meaningless for this kind of exam |
| `placeholder` | a default value, never researched |
| `unverified` | possibly right, but no source recorded |
| `reported` | sourced to a secondary report, not to the notification |
| `verified` | checked against the conducting body's own document |

**Only `verified` figures are shown to a student.** Everything weaker stays in the database
and stays off the page. Displaying an unverified number with a caveat beside it does not
work: the caveat is read once, the number is what gets remembered and planned around.

---

## 6. How the current 500 stand against this policy

Measured, not estimated:

1. **The `vacancies` field does not survive criterion E.** All 500 records carry a figure,
   but there are only 242 distinct values among them. 92 exams all say "650 Posts". 33 say
   "500 Posts". 307 of the 500 share a figure with at least one other exam. These are
   defaults, not researched numbers.
2. **All 121 admission exams carry a "Posts" figure**, which is a category error — JEE Main
   is recorded as "1,200 Posts", NEET-UG as "1,500 Posts". Admission exams have seats, and
   the seat count belongs to the institutions, not to the exam.
3. **CA, CS, CMA and AIBE are classified as `entrance`**, which misdescribes what they are
   (§1, track Q).
4. **No record carries a source.** Criterion E cannot currently be evidenced for any of the
   500 — including the ones that are entirely correct.

**Remediated 2026-09-18** for points 1, 2 and 4. Every record was classified on the evidence
available for its vacancy figure:

| Classification | Records | Basis |
|---|---|---|
| `not_applicable` | 121 | admission or qualification exam; the figure was removed |
| `placeholder` | 228 | the figure appears on at least one other exam, so it was never researched |
| `unverified` | 151 | unique to this exam, but carries no citation |
| `verified` | **0** | nothing has yet been checked against a notification |

No data was deleted except the "Posts" counts on the 121 admission and qualification exams,
where the unit itself was wrong. The 379 recruitment figures are retained and marked.

**Point 3 remediated 2026-09-18.** A new `track` field (`R` / `A` / `Q`, per §1) was added to
all 500 records: 379 `R`, 117 `A`, 4 `Q` (CA, CS, CMA, AIBE). `exam_type` was left untouched —
ten site files read it as a strict two-way switch (`=== 'job'` / `=== 'entrance'`) with no
branch for a third value, so repurposing it would be a UI redesign, not a data fix. `track`
sits alongside it, unread by the UI for now. Surfacing it on the site (filters, badges) and
retiring `exam_type` in its favour is separate, larger work, not yet started.

**The sequencing consequence is the important part.** Adding exams before this existed would
have meant every new exam inheriting the same defect, with the cost of retrofitting sources
growing as the database grew. Doing it at 500 records was cheap; at 1,500 it would not have been.

---

## 7. Applying this to a discovery candidate

When the discovery pipeline proposes a new exam, in order:

1. **F first** — is this a distinct exam, or an edition or district notification of one
   already held? Most rejections happen here, and it is the cheapest test to run.
2. **A** — is the conducting body public?
3. **B** — can a member of the public apply?
4. **C** — does passing confer a post, a seat or an entitlement?
5. **D** — has it been held before, or is a recurrence stated?
6. **E** — find the primary source and record it. No source, no entry.

If it passes, it enters as a **registry entry** with its citation. It is promoted to a full
dossier later, on demand. Nothing goes straight to dossier from an automated discovery run.

---

## 8. Rulings by the owner

Settled 2026-09-18. These are decisions, not proposals — apply them as written.

1. **Postgraduate and doctoral admission tests are in scope**, as track A. NEET-PG, GATE as an
   admission route, UGC-NET, CSIR-NET and the 49 postgraduate-level entries all stand.
2. **State CET cells are in scope.** The conducting body is public and the test is a common
   gateway, so it qualifies under criterion A even though some of the seats it gates are at
   private colleges. The character of the *exam* governs, not the character of every seat.
3. **Autonomous bodies are in scope; government-*aided* private institutions are not.**
   The owner's initial instinct was to exclude both. On the evidence it was narrowed: excluding
   autonomous bodies would have removed 52 exams, 16 of them in the top popularity tier,
   including JEE Advanced, CAT, GATE, ISRO, DRDO, BARC and the KVS/NVS teacher recruitments —
   because "autonomous" in Indian usage describes internal governance, not ownership. Criterion A
   now draws the line at creation and funding instead. The exclusion the instinct was reaching
   for — privately founded bodies that merely receive a government grant — is kept.
4. **Out-of-scope exams are recorded**, in an exclusions register — see §9.

---

## 9. The exclusions register

Kept at `data-sourcing/EXCLUSIONS.md`. Every candidate rejected by the inclusion test is
recorded with its name, its conducting body, the criterion it failed, and the date.

Two purposes. It stops the same rejected candidate being re-evaluated by every future
discovery run, which otherwise happens indefinitely because aggregators keep re-listing it.
And it is the working-paper trail for the scope decision: a reader can see what was
considered and set aside, rather than having to infer scope from what happens to be present.

A rejection is not permanent. If an exam is excluded under criterion D (held only once) and is
then held a second time, it is re-evaluated and admitted. The register records the reason
precisely so that the conditions for revisiting it are visible.
