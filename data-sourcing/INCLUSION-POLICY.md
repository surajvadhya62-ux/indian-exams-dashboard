# Inclusion Policy — what belongs in this database

**Status:** draft for the owner's approval. Nothing has been added or removed on the strength of it yet.
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

**Out:** private companies, private universities' own entrance tests, coaching-institute
scholarship tests, and tests run by private certification vendors. A single private
institution's admission test is out even when it is well known.

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

The minimum addition, per record:

| Field | Purpose |
|---|---|
| `source_url` | the specific notification or page a fact was taken from |
| `source_date` | the date on that document |
| `verified_on` | when a human last checked it against the source |
| `confidence` | `verified` / `reported` / `placeholder` |

`confidence` is the one that does the real work. It lets an unverified figure exist in the
database while being visibly marked as unverified, rather than sitting silently beside
verified ones looking identical — which is the situation today.

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

None of this is an argument for deleting anything. Points 1 and 2 are a presentation and
verification problem: the figures should be marked `placeholder` and suppressed on the
site until verified, not silently displayed. Point 3 is a reclassification. Point 4 is the
schema change in §5.

**The sequencing consequence is the important part.** Adding exams before §5 exists means
every new exam inherits the same defect, and the cost of retrofitting sources grows with
the size of the database. The schema change is cheap now and expensive later.

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

## 8. Open questions for the owner

1. **Postgraduate and doctoral admission tests** (NEET-PG, GATE as an admission route, UGC-NET,
   the 49 postgraduate-level entries). In scope under this policy as track A. Confirm that is
   intended — it is a large share of the current database.
2. **State CET cells** conduct exams that gate admission to private colleges as well as
   government ones. Criterion A admits them, on the ground that the conducting body is public
   and the test is a common gateway. Confirm.
3. **Recruitment by autonomous bodies and government-aided institutions** — sitting on the
   edge of criterion A. Suggest in-scope where the body is majority government-funded, but the
   line is genuinely fuzzy and worth your ruling.
4. **Should out-of-scope exams be recorded anywhere?** A short exclusions list, with the reason,
   prevents the same candidate being re-evaluated by every future discovery run. Cheap to keep,
   and it is the equivalent of documenting the items you scoped out rather than silently
   dropping them.
