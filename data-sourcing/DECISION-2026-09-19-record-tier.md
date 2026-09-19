# Decision — the two-tier registry/dossier model, as a schema

**Date:** 2026-09-19
**Status:** decided, not yet implemented
**Decides:** the open schema question in `HANDOFF.md` §10 step 5 and §13, and
`INCLUSION-POLICY.md` §4 ("two tiers, declared on the site")
**Audience:** whoever implements this next — the decision is made, this is the spec

---

## The decision, in one line

A new field **`record_tier`** on each `src/data/exams.json` record, values
**`"registry"`** or **`"dossier"`**, **calculated by a script** from the dossier's actual
contents — never hand-edited.

---

## 1. Its own field, not a new value on an existing one

`exam_type` was nearly repurposed for `track` and it would have been a mistake: three
scripts read it as a strict `job`/`entrance` two-way switch, so a third value would have
broken them silently. `track` was added as its own field instead, and that was right.
Same reasoning applies here, so the same answer.

**The name matters more than usual here.** `tier` is already taken in this repo:
`scripts/data-sourcing/build-work-queue.mjs` uses `tier: A | B | C` to mean *how much
research depth an exam is owed*, driven by popularity, and `validate-details.mjs` reads
`sections_required` off that. Those are two completely unrelated ideas. A bare `tier`
field would put both meanings of one word in one codebase.

- Use `record_tier`. Not `tier`, not `status` (collides with the per-section
  `available`/`not_available` status), not `completeness` (implies a percentage).
- If the work-queue's A/B/C is ever renamed, rename *it* — `research_depth` — rather than
  freeing up `tier` for this.

## 2. On the `exams.json` record, not in the dossier

The badge has to appear on the **exam card and in list views**, which render from
`exams.json` alone. The dossier is fetched lazily, only when a modal opens
(`src/hooks/useExamDetail.js`). A flag stored in the dossier could not be read at the
moment the card is drawn — which is exactly the "visitor discovers it's a stub after three
clicks" problem this is meant to fix.

## 3. Calculated, not hand-maintained

This is the §2 lesson of `HANDOFF.md`, applied before the mistake rather than after it.
`exams.json.vacancies` was hand-maintained beside the dossier, the two drifted, and a
verified figure was written to a field no visitor could see. `record_tier` has the same
shape of risk: a value on the summary record describing something that actually lives in
the dossier.

So it is derived on every run, by the same pattern as
`scripts/automation/derive-vacancy-summary.mjs`:

**The rule, in order:**
1. **No dossier file at `public/exam-details/<id>.json`** → `registry`.
2. **A dossier exists, but no section has `status: "available"`** → `registry`. This is a
   stub in substance regardless of how many keys it has, and it is exactly what
   `sync-exams.mjs --add` now produces for a newly discovered exam (every section written
   as `not_available` with an honest note). Such a record labels itself correctly the
   moment it is created, with no extra step for whoever added it.
3. **Otherwise** → `dossier`.

**Measured baseline, 2026-09-19:** of the 499 dossiers, 493 have every section available
and 6 are partially filled; **none** has zero available sections. So the first run
classifies **all 499 as `dossier` and 0 as `registry`**. The change is purely additive and
carries no reclassification risk — a useful property, since it means the field can ship
and be reviewed before it ever changes what a visitor sees.

**Rule 2 deliberately does not grade partial dossiers.** The six partially-filled records
are `dossier`, not some middle tier. Two tiers was the policy decision
(`INCLUSION-POLICY.md` §4); a three-way split is a different decision and is not being
made here by the back door. Per-section honesty already exists — each tab renders
"Extended dossier not yet compiled for this exam" on its own.

## 4. What the registry minimum is, and who enforces it

`INCLUSION-POLICY.md` §4 already specifies it: name, conducting body, track, minimum
qualification, frequency, official link, and the criterion E source citation.

**Nothing enforces it today, and this is the real blocker.** `npm run validate` walks the
dossier *files* in `public/exam-details/` and never reads `exams.json` at all — see
`validate-details.mjs`'s `run()`. A record sitting in `exams.json` with nothing behind it
is invisible to the check. That gap has to close before any discovery pipeline is allowed
to add a record, or the two-tier model is a label with no control behind it.

## 5. What implementing this involves

In rough dependency order:

1. **Extend `npm run validate` with a pass over `exams.json`** — every record has the
   seven registry-minimum fields; every record has a valid `record_tier`; every
   `dossier`-tier record has a file in `public/exam-details/`. This is the prerequisite,
   not the last step.
2. **`scripts/automation/derive-record-tier.mjs`** (`npm run derive-tiers`, with
   `--dry-run`), applying §3's rule. Consider folding it into the same invocation as
   `derive-vacancies` — both are "recalculate the summary from the dossier", both are
   currently manual steps that go stale silently if forgotten, and `HANDOFF.md` §13
   already flags that as a problem for the one that exists.
3. **A badge on the card and in the detail modal header**, via the existing
   `src/utils/trackLabels.js`-style shared helper rather than inline string comparisons —
   the `track` work established that pattern and the reason for it.
4. **Honest counts in `StatsOverview`** — "499 exams" must not silently become "499
   exams" when 200 of them are stubs. Show the split.
5. **`sync-exams.mjs --add` writes `record_tier: "registry"`** explicitly, and validation
   catches it if it doesn't.

## 6. Explicitly not decided here

- **Promotion from registry to dossier** — `INCLUSION-POLICY.md` §4 says demand-driven
  (candidate volume, search interest, owner's judgement). No mechanism is specified and
  none is needed until there are stubs to promote.
- **Whether the Wizard and Analytics get a third bucket for track Q** — still open, still
  a product decision (`HANDOFF.md` §3), unrelated to this.
- **Whether registry entries are excluded from any coverage claim** on the site. Worth
  deciding before the first stub ships, not before this field does.
