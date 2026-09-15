# Execution plan — enriching the remaining 514 exam dossiers

**Status:** ready to hand off. **Generated:** 2026-09-11.

This is the complete, self-contained plan for getting the remaining exam
dossiers researched by an external AI, reviewed, and published.

Everything needed to execute is either in this document or in the three
files it points at:

| File | What it is |
|---|---|
| `data-sourcing/work-queue.json` | **The queue.** All 514 remaining exams, pre-assigned to 113 numbered units with per-exam tier and required sections. |
| `data-sourcing/RESEARCH-GUIDE.md` | **The quality standard.** Binding on the researcher. |
| `public/exam-details/upsc-cse.json` | **The reference implementation.** Defines the schema by example. |

---

## 0. Roles

| Role | Who | Does |
|---|---|---|
| **Researcher** | External AI, one session per unit | Researches the unit's exams, returns draft `<id>.json` files + a research log. Touches nothing else. |
| **Reviewer** | Claude Code, in this repo | Validates schema, audits citations, re-checks links, incorporates, updates trackers, builds. |
| **Owner** | You | Resolves the pre-flight decisions (§1), approves each unit, triggers publish. |

The split exists because a researcher cannot grade its own work. The failure
mode this project cares most about — a confident-looking invented number — is
invisible to the model that produced it. Review is a separate pass against
the cited sources.

---

## 1. Pre-flight — resolve before assigning any unit

### 1.1 — 28 suspected duplicate exam records **(blocking)**

`work-queue.json` → `review_flags` lists 28 pairs where two records share a
conducting body and one's acronym or target role is a subset of the other's.
Researching these as-is wastes effort and, worse, pressures the researcher
into *inventing* differences to justify two separate dossiers.

Three kinds are in there:

- **Genuine duplicates — merge.** `ongc-gt` / `ongc-graduate-trainee`,
  `nabard-da` / `nabard-development-assistant`, `bpcl-et` /
  `bpcl-management-trainee`, `ecil-et` / `ecil-technical-officer`, `hpcl-et` /
  `hpcl-officer-engineer`, `bhel-et` / `bhel-engineer-trainee`.
- **Same exam, split across cycles — collapse to one.** `nda`,
  `upsc-nda-na`, `nda-na-ii` are all the UPSC NDA & NA examination. UPSC runs
  it twice a year (NDA I and II); that is one examination with two cycles,
  not two examinations.
- **Generic parent vs specific posts — keep both, but differentiate.**
  `dsssb` alongside `dsssb-prt-tgt` / `dsssb-warder` / etc.; `mpsc` alongside
  `mpsc-sti` / `mpsc-subordinate-psi`. These are legitimately different
  recruitments — but decide whether the bare parent record should exist at
  all, or the specific ones should carry the whole load.

Decide each, edit `src/data/exams.json`, then re-run:

```bash
node scripts/data-sourcing/build-work-queue.mjs
```

### 1.2 — Confirm the tier policy

Depth is assigned per exam, because 515 exams × 5 fully-cited sections is not
a realistic uniform target — and forcing uniform depth is exactly what
pressures a researcher into inventing data for obscure postings that publish
nothing.

| Tier | Assigned to | Count | Required |
|---|---|---|---|
| **A — Full** | `very_high` popularity, plus everything in Batch 1 | 188 | Every applicable section, researched and cited. The `upsc-cse.json` bar. |
| **B — Core** | `high` popularity, plus Batches 2–3 floors | 210 | `exam_scheme` + `official_downloads` required. Others best-effort. |
| **C — Links** | `medium` / `low` popularity | 116 | `official_downloads` required. Others best-effort. |

"Best-effort" means: populate if the official source publishes it readily;
otherwise mark `not_available` with an honest reason. **Tier C is not
corner-cutting.** For a state subordinate clerk post with no published
vacancy history and no formal promotion ladder, `not_available` *is* the
accurate answer, and the UI already renders it properly.

A **tier floor** overrides popularity for the premier recruiters (Batch 1 →
A, Batches 2–3 → B), because UPSC IFS and CAPF AC aren't tagged `very_high`
but shipping them links-only would leave a hole on the site's most
prestigious exams. Change the floors in
`scripts/data-sourcing/build-work-queue.mjs` (`TIER_FLOOR_BY_BATCH`) and
re-run if you disagree.

### 1.3 — Pick the canonical deploy target

`netlify.toml` targets Netlify; `.github/workflows/deploy.yml` deploys to
**GitHub Pages**. Both are live in this repo. Decide which is canonical
before the first unit ships, so the site you check is the one that updated.

---

## 2. The prime directive

> **Never invent a plausible number.** If you cannot find a real source for a
> fact, that section gets `"status": "not_available"` with a one-sentence
> `note` explaining why — not a guessed figure.

A unit returning 6 populated exams and 2 honestly-blank sections is a
**success**. A unit returning 8 fully-populated exams where 2 were quietly
guessed is a **failure**, and §7 is designed to catch exactly that.

---

## 3. Capability gate — check before assigning

The Researcher must have all three, or it cannot do this work:

1. **Live web access** — fetch and read arbitrary URLs.
2. **Shell access** — `curl` for link liveness, `pdftotext` (poppler) for
   reading PDFs.
3. **Ability to return files.**

Without these, nothing can honestly be marked `verified`, and output degrades
into exactly the invented data this project must not publish. **Do not assign
a unit to a model that cannot browse.** If it can browse but cannot run
`pdftotext`, it must downgrade PDF-sourced figures from `verified` to
`reported` and say so in the log.

---

## 4. The work queue

`data-sourcing/work-queue.json` — regenerate any time `exams.json` changes.

**One unit = one researcher session.** Units are sized by research *weight*,
not exam count (a Tier A dossier is several times a Tier C one), capped at
the point where citation discipline measurably degrades. **Do not merge
units.** Beyond ~8 Tier A exams in a session, researchers start
pattern-matching instead of reading sources — which is precisely how invented
data enters.

| Batch family | Units | Exams | A | B | C |
|---|---:|---:|---:|---:|---:|
| `batch-1-central-commissions` (UPSC) | 2 | 11 | 11 | 0 | 0 |
| `batch-2-ssc-railways` | 3 | 25 | 14 | 11 | 0 |
| `batch-3-banking-insurance` | 3 | 31 | 11 | 20 | 0 |
| `batch-4-state-psc--*` | 29 | 66 | 20 | 31 | 15 |
| `batch-5-subordinate-police-boards--*` | 25 | 71 | 34 | 26 | 11 |
| `batch-6a-national-entrance-tests` | 3 | 43 | 9 | 15 | 19 |
| `batch-6b-defence-direct-entry` | 2 | 20 | 8 | 8 | 4 |
| `batch-6c-research-premier-institutes` | 2 | 28 | 8 | 7 | 13 |
| `batch-6d-medical-health` | 1 | 14 | 2 | 7 | 5 |
| `batch-6e-judiciary-regulators-professional` | 2 | 19 | 11 | 5 | 3 |
| `batch-6f-central-psus` | 6 | 71 | 17 | 31 | 23 |
| `batch-7-state-other--*` | 35 | 115 | 43 | 49 | 23 |
| **Total** | **113** | **514** | **188** | **210** | **116** |

Work units in ascending `order`. The ordering front-loads the
highest-traffic, best-documented exams, so reusable research (the central pay
matrix, SSC/RRB common patterns) is established before the long tail. State
units within Batches 4/5/7 lead with UP, Bihar, Maharashtra, Tamil Nadu,
Rajasthan and MP, then run alphabetically.

Each exam in the queue already carries everything the Researcher needs:

```json
{
  "id": "nda",
  "name": "National Defence Academy Examination",
  "exam_type": "entrance",
  "jurisdiction": "central",
  "conducting_body": "UPSC",
  "official_website": "https://upsc.gov.in",
  "tier": "A",
  "sections_required": ["exam_scheme", "competition_benchmarks", "official_downloads"],
  "sections_best_effort": [],
  "omit_sections": ["career_ladder", "financial_package"]
}
```

---

## 5. The schema — frozen

`public/exam-details/upsc-cse.json` **is** the schema. Copy its structure
exactly. Do not add, rename, or "improve" keys: the renderer
(`src/hooks/useExamDetail.js` + `src/components/exam-detail/*`) reads these
exact names, and a renamed key renders **blank**, not an error — so schema
drift fails silently and ships.

```
id                     string, must equal the filename and the exams.json id
schema_version         1
last_reviewed          ISO date

career_ladder          { status, note, steps[] }            job exams only
  steps[]              { designation, pay_level, years,
                         confidence, as_of, source_url, source_label }

exam_scheme            { status, note, stages[] }
  stages[]             { stage_name, stage_order, confidence, as_of,
                         source_url, source_label, papers[] }
  papers[]             { paper_name, marks, duration_minutes,
                         negative_marking, qualifying_only,
                         qualifying_threshold }

financial_package      { status, note, pay_level, entry_basic_pay,   job only
                         pay_confidence, pay_as_of, pay_source_url,
                         pay_source_label, da_percent_as_of_review,
                         da_as_of, gross_range_estimate {min,max},
                         in_hand_range_estimate {min,max},
                         estimate_confidence, estimate_note,
                         official_perks[], perks_confidence }

competition_benchmarks { status, note, years[] }
  years[]              { year, applicants, vacancies,
                         shortlisted_for_mains, selectivity_ratio,
                         confidence, as_of, source_url, source_label }

official_downloads     { status, note, links[] }
  links[]              { label, url, type, cycle_label?,
                         confidence, as_of }
```

**Enumerations — no other values permitted:**

- `status`: `"available"` | `"not_available"`
  — `not_applicable` is expressed by **omitting the whole section key**
- `confidence`: `"verified"` | `"reported"` | `"estimate"`
- `links[].type`: `"notification"` | `"syllabus"` | `"pyq"` | `"other"`

### 5.1 Confidence tiers — the distinction is audited

| Tier | Means |
|---|---|
| `verified` | You personally opened the document and read this number. **A URL returning 200 is not verification.** |
| `reported` | A specific, real figure from a named official source you could not personally open this session (PIB and some UPSC pages block automated fetches). **Not** a guess — do not call it `estimate`. |
| `estimate` | A value you computed or derived yourself, e.g. a salary range from a pay level and DA%. |

Split confidence *within* a section when fields have different evidentiary
bases — `upsc-cse.json`'s `competition_benchmarks` is the worked example.

### 5.2 DA% is a fixed project constant

Every dossier must use the identical DA figure, or in-hand salary estimates
become mutually inconsistent across the site:

```json
"da_percent_as_of_review": 58,
"da_as_of": "2025-07-01"
```

Do not research your own DA figure. When DA revises (each Jan/Jul) it is
swept across all dossiers at once, not drip-fed per exam.

### 5.3 State posts are not on the central 7th CPC matrix

Batches 4, 5 and 7 are state-jurisdiction exams. Most states run their own
pay commissions, matrices and DA cycles. Applying a central 7th CPC level to
a state post produces confidently wrong salary data. Cite the **state's own**
pay order, or mark `financial_package` `not_available` saying so. Never
substitute the central figure. **Bank pay (Batch 3) is IBA-negotiated, not
7th CPC** — same rule applies.

### 5.4 Entrance exams

`exam_type: "entrance"` (123 exams) **omit** `career_ladder` and
`financial_package` entirely — absent keys, not empty objects. An entrance
exam has no recruitment ladder or salary. The queue states this per exam in
`omit_sections`.

---

## 6. The Researcher's loop

For each exam in the assigned unit:

1. **Read its queue entry** — `tier`, `exam_type`, `sections_required`,
   `omit_sections`, `official_website`.
2. **Find the official source.** Start from `official_website`. Prefer the
   conducting body's own domain. **Aggregators, coaching sites and news
   articles are never citable.**
3. **Research each required section**, classify confidence honestly (§5.1),
   cite a `source_url` + `as_of` for every populated fact.
4. **Check every link is really alive:**
   ```bash
   curl -sI --max-time 10 -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) \
     AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36" "<url>" | head -5
   ```
   Reject: redirects landing on a homepage (the document is gone), and
   `.pdf` URLs that actually serve HTML (soft 404 — government CMSs do this
   instead of a clean 404). Tag cycle-specific PDFs with `cycle_label`;
   prefer evergreen pages (syllabus hubs, PYQ archives) which don't rot on
   the same schedule.
5. **Read PDFs for real** where a figure will be marked `verified`:
   ```bash
   curl -sL --max-time 20 -A "<same UA>" "<url>" -o /tmp/doc.pdf
   file /tmp/doc.pdf            # confirm it's a PDF, not an HTML soft-404
   pdftotext -layout /tmp/doc.pdf -
   ```
6. **Write `<id>.json`**, filename exactly the queue `id`; set
   `last_reviewed`.
7. **Log what could not be verified** (§7).

**Do not modify** `progress.json`, `work-queue.json`, `exams.json`, anything
in `src/`, or any other repo file. Detail files and the log only. Trackers
are updated at review time so they record *reviewed* work, not *claimed*
work.

---

## 7. Handoff format — what comes back

**7.1 Dossier files** — one `<exam-id>.json` per exam, filename exactly
matching the queue id.

**7.2 A research log** — `<unit_id>-research-log.md`, per exam:

```markdown
### <exam-id>   (tier A|B|C, exam_type job|entrance)
- Sections populated:
- Sections marked not_available (+ the reason given):
- Sections omitted (entrance only):
- Sources OPENED and read this session:
- Sources only status-checked, not read:
- Links curl-checked: <url> → 200 | 301→homepage (rejected) | soft-404
- Could NOT confirm, and why:
- Confidence downgrades made, and why:
```

The log is not bureaucracy — it is what makes review take minutes instead of
hours, and it is where an honest researcher surfaces its own weak spots
rather than burying them.

---

## 8. Review gate (performed in-repo, per unit)

**8.1 Automated** — `scripts/data-sourcing/validate-details.mjs`, written at
first incorporation, checking:

- Valid JSON; `id` matches filename and exists in `exams.json`
- No unknown keys; all required keys present per §5
- `status` / `confidence` / `links[].type` within their enumerations
- Every populated numeric fact has a non-empty `source_url` **and** `as_of`
- Every `not_available` section has a non-empty `note`
- Entrance exams carry no `career_ladder` / `financial_package` key
- `da_percent_as_of_review` identical across every dossier (§5.2)
- Every section named in the unit's `sections_required` is present
- `last_reviewed` present and valid

**8.2 Manual audit** — the part that catches invented data:

- **Citation spot-check:** re-fetch 2–3 cited URLs per unit and confirm the
  cited number is genuinely in the document. Priority: anything marked
  `verified`, and anything suspiciously round.
- **Confidence honesty:** anything `verified` that the log admits wasn't
  actually opened → downgraded to `reported`.
- **Link liveness:** independent `curl -I` on every `official_downloads`
  link.
- **State pay trap (§5.3):** any state exam citing a central 7th CPC figure
  is rejected.
- **Smell test:** figures like "approx. 10,00,000+" with no `as_of` or source
  are rejected outright.

**8.3 Outcome** — each exam lands `verified`, `partial`, or is bounced back
to the Researcher with specific corrections. Bounced exams are **re-run, not
patched in-repo**, so the correction is made against the sources.

---

## 9. Incorporation & publish

1. Place approved files in `public/exam-details/`.
2. Update `data-sourcing/progress.json` per exam — `detail_file_exists`,
   `overall_status`, per-section `status` / `citations` / `last_updated` /
   `updated_by` — and recompute `totals`.
3. Mark the unit `complete` in `work-queue.json`.
4. `npm run build` — must exit clean.
5. Smoke-test (`npm run dev`): open 2–3 of the unit's exams, confirm every
   tab renders, **including a deliberately `not_available` section** showing
   the `DataUnavailable` state rather than a blank panel.
6. Commit — one commit per unit, message naming the unit and exam count, so a
   bad unit reverts cleanly.
7. **Publish** — push to `main`.
   - The SPA catch-all (`/* → /index.html`, 200) means a missing detail file
     returns the HTML shell, not a 404. `useExamDetail.js` already handles
     this by content-type sniffing, so unresearched exams degrade correctly.
     **Don't "fix" that redirect.**
   - `site.zip` is the manual drag-drop path only. If it stays in use,
     regenerate it at publish time — it's hand-maintained and will silently
     go stale.

---

## 10. Phase 2 — automated notification scraper (after enrichment)

Sequenced last deliberately: the scraper maintains `official_downloads` and
application dates, worth automating only once those fields exist broadly.

1. `scripts/scrape_exam_notifications.py` — monitors `upsc.gov.in`,
   `ssc.gov.in`, `ibps.in`, `nta.ac.in` with rate limiting and a real
   user-agent; detects new notification PDFs and revised application windows.
2. `.github/workflows/update_exams_cron.yml` — weekly cron (`0 4 * * 1`).

**Two decisions before building it:**

- **Open a PR; do not push to `main`.** An unreviewed scrape auto-deploying
  can silently replace a good link with a soft-404. A PR keeps the automation
  and adds a human gate.
- **Fail loudly.** Government sites restructure without notice and some serve
  JS-rendered content. A scraper that quietly writes nothing looks identical
  to one that correctly found no updates — so it must fail the job or open an
  issue rather than committing empty results.

---

## Appendix A — the Researcher prompt

Fill in the three bracketed values from `work-queue.json`. Give the model
read access to `data-sourcing/RESEARCH-GUIDE.md`,
`public/exam-details/upsc-cse.json`, and `data-sourcing/work-queue.json`.

```
You are researching official examination data for a public Indian-exams
reference dashboard. Accuracy matters more than completeness or speed.

FIRST, read these in full before doing anything:
  1. data-sourcing/RESEARCH-GUIDE.md   — the quality standard. Binding.
  2. public/exam-details/upsc-cse.json — the reference implementation.
     This file IS the schema. Copy its structure exactly. Do not add,
     rename, or "improve" any key. The UI reads these exact field names,
     and a renamed key renders BLANK rather than erroring — so schema
     drift fails silently and ships broken.

YOUR ASSIGNMENT
  Unit: [UNIT_ID]
  Find it in data-sourcing/work-queue.json under `units`. Every exam in it
  carries its own `tier`, `sections_required`, `sections_best_effort`,
  `omit_sections`, `exam_type`, `conducting_body` and `official_website`.
  Research exactly those sections for exactly those exams.

THE ONE RULE
Never invent a plausible number. If you cannot find a real source for a
fact, that section gets "status": "not_available" with a one-sentence note
explaining why. An honestly-blank section is a CORRECT deliverable and will
be accepted. A guessed figure is the worst possible outcome and will be
caught: every unit has its citations independently re-fetched and checked
against the source document before anything is published.

CONFIDENCE TIERS — use precisely
  verified — you personally opened the document and read this number.
             A URL returning 200 is NOT verification.
  reported — a specific real figure from a named official source you could
             not personally open this session (PIB/UPSC often block
             automated fetches). This is NOT "estimate".
  estimate — a value you computed or derived yourself (e.g. a salary range
             from a pay level and DA%).
Split confidence WITHIN a section when fields have different evidentiary
bases — see upsc-cse.json's competition_benchmarks for the pattern.

HARD RULES
- Respect `omit_sections`. Entrance exams OMIT career_ladder and
  financial_package entirely — absent keys, not empty objects.
- DA is a fixed project constant. Use exactly:
      "da_percent_as_of_review": 58, "da_as_of": "2025-07-01"
  Do not research your own DA figure.
- State-jurisdiction posts are NOT on the central 7th CPC matrix, and bank
  pay is IBA-negotiated, not 7th CPC. Cite the state's own pay order (or
  the IBA settlement), or mark financial_package not_available saying so.
  Never substitute a central figure for a state or bank post.
- Cite only the conducting body's own domain. Never an aggregator,
  coaching site, or news article.
- curl-check every official_downloads link live:
    curl -sI --max-time 10 -A "Mozilla/5.0 (Macintosh; Intel Mac OS X
    10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36"
    "<url>" | head -5
  Reject redirects that land on a homepage, and .pdf URLs that actually
  serve HTML (soft 404s). Tag cycle-specific PDFs with cycle_label; prefer
  evergreen pages (syllabus/PYQ hubs) where they exist.
- For anything you mark `verified`, actually open the document:
    curl -sL --max-time 20 -A "<same UA>" "<url>" -o /tmp/doc.pdf
    file /tmp/doc.pdf && pdftotext -layout /tmp/doc.pdf -

TIER MEANINGS
  A — every applicable section researched and cited.
  B — sections_required fully; sections_best_effort only if the official
      source publishes them readily, else not_available with a reason.
  C — sections_required fully; everything else not_available with a reason.

DELIVERABLES
  1. One <exam-id>.json per exam, filename exactly matching the queue id.
  2. <unit_id>-research-log.md with, per exam: tier, sections populated,
     sections marked not_available + reason, sections omitted, which
     sources you actually OPENED vs only status-checked, curl result per
     link, anything you could not confirm, and every confidence downgrade
     you made and why.

DO NOT modify progress.json, work-queue.json, src/data/exams.json, anything
in src/, or any other repo file. Detail files and your log only.

Tell me honestly at the end what you were unable to verify. That is the
most useful part of your output, not a failure.
```

---

## Appendix B — definition of done, per unit

- [ ] Every assigned exam has a file, or a logged reason it has none
- [ ] Validator passes (§8.1)
- [ ] Citation spot-check passes (§8.2)
- [ ] Every download link independently re-checked live
- [ ] `progress.json` updated, `totals` recomputed
- [ ] Unit marked `complete` in `work-queue.json`
- [ ] `npm run build` clean
- [ ] Smoke test: tabs render, `not_available` renders correctly
- [ ] Committed as one unit-scoped commit
- [ ] Owner approval before publish
