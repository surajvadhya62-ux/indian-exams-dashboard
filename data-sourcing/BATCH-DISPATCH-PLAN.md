# Batch Dispatch & Incorporation Plan — all remaining units

**Status:** ready to execute as a repeating loop  
**Total units to process:** 20, numbered `u117`–`u136` (units `u114`, `u115`, `u116`, `u137`, `u138` were removed on 2026-09-14 — an audit found those 52 exams already had complete, cited research files sitting on disk from an earlier session; they were just never marked verified. The first 113 units, `u001`–`u113`, are already done — see `data-sourcing/research-logs/`. Do not reuse any of these numbers.)  
**Total exams remaining:** 165 queued, 339 already verified → **504 total**

---

## Overview: the repeating unit loop

For each unit from `work-queue.json`:

```
┌─────────────────────────────────────┐
│ 1. DISPATCH to external AI researcher
│    (read: RESEARCH-GUIDE.md, upsc-cse.json, work-queue.json)
│    (return: <exam-id>.json × n, <unit_id>-research-log.md)
├─────────────────────────────────────┤
│ 2. REVIEW in-repo (Claude Code)
│    (validate schema, spot-check citations, check links)
│    (outcome: approved, or bounced for re-run)
├─────────────────────────────────────┤
│ 3. INCORPORATE & PUBLISH
│    (move files, update progress.json, build, smoke-test, commit, push)
└─────────────────────────────────────┘
```

**Per-unit cycle time:** ~15–20 minutes (dispatch) + ~5–10 minutes (review) + ~10 minutes (incorporate).  
**No unit waits on another.** Dispatch the next unit while review/incorporation of the previous one is running.

---

## 1. DISPATCH — Give to external AI researcher

### Pre-dispatch checklist

- [ ] External AI has **live web access** (can fetch URLs)
- [ ] External AI has **shell access** (`curl`, `pdftotext` from poppler)
- [ ] External AI can **return files** (JSON + markdown)
- [ ] You have read access to `data-sourcing/work-queue.json`, `public/exam-details/upsc-cse.json`, `data-sourcing/RESEARCH-GUIDE.md`

### Files to provide

Give the researcher read-only access to:
1. `data-sourcing/RESEARCH-GUIDE.md`
2. `public/exam-details/upsc-cse.json`
3. `data-sourcing/work-queue.json`

### Prompt template

Fill in `[UNIT_ID]` (e.g., `u117`, `u118`, etc. — the remaining units run `u117`–`u136`, never `u001`–`u116` or `u137`–`u138`, all of which are already done) and use this verbatim:

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

### Expected return

- **`<exam-id>.json`** for each exam in the unit (e.g., `ibps-po.json`, `sbi-po.json`)
  - Filename must exactly match the `id` in work-queue.json
  - Schema: copy `upsc-cse.json` structure exactly
  - Every numeric fact cited with `source_url` + `as_of`
  - Entrance exams omit `career_ladder` and `financial_package` entirely

- **`<unit_id>-research-log.md`** (e.g., `u117-research-log.md`)
  - Per-exam summary: tier, sections populated, sections not_available, sources opened vs checked, curl results, what could not be verified

---

## 2. REVIEW — in-repo validation & auditing

Once files are received, run in this order:

### 2.1 Automated schema validation

```bash
cd /Users/surajvadhya/Documents/kimi/workspace/indian-exams-dashboard
node scripts/data-sourcing/validate-details.mjs
```

**Exits 0?** → proceed. **Non-zero?** → bounce back to Researcher with the specific errors.

Catches:
- JSON syntax errors
- Missing or unknown keys
- Invalid `status`/`confidence`/`links[].type` enums
- Missing `source_url` or `as_of` on populated facts
- `not_available` sections without a `note`
- Entrance exams with forbidden keys (`career_ladder`, `financial_package` present)
- DA constant mismatch (must be exactly `58` and `2025-07-01`)
- Tier A exams missing required sections

### 2.2 Manual citation spot-check

Pick 2–3 cited URLs per unit (prioritize anything marked `verified` and anything suspiciously round):

```bash
# Example: check a claimed vacancy figure from a UPSC press note
curl -sL --max-time 20 \
  -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36" \
  "https://upsc.gov.in/..." -o /tmp/doc.pdf

file /tmp/doc.pdf            # Confirm it's a PDF, not an HTML soft-404
pdftotext -layout /tmp/doc.pdf - | grep "vacancies\|applicants"  # Find the exact number
```

**Mismatch?** → downgrade to `reported` (if source is real but you couldn't verify) or bounce back to Researcher.

### 2.3 Link liveness check

Independent `curl -I` on every `official_downloads` link:

```bash
curl -sI --max-time 10 \
  -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36" \
  "<url>" | head -5
```

**Outcome:**
- `200` → OK
- `301`/`302`/`307` to homepage → reject (document gone)
- HTML response on a `.pdf` URL → reject (soft 404)
- Anything else → bounce back

### 2.4 State pay trap (§EXECUTION-PLAN 5.3)

For any state-jurisdiction exam (check `jurisdiction: "state"` in exams.json):

- **Never cite central 7th CPC.** Reject any state post using central pay figures.
- Researcher should cite the **state's own pay order** or mark `financial_package` `not_available`.

### 2.5 Outcome decision

- **APPROVED** → all checks pass, proceed to 3. Incorporate
- **BOUNCED** → specific failures → return to Researcher with exact corrections, repeat 2. Review on re-run
- **PARTIAL** → some exams approved, some bounced → run approved into 3. Incorporate, re-run bounced

---

## 3. INCORPORATE & PUBLISH

### 3.1 Move files into the repo

```bash
# Assuming the researcher returned files in /tmp/u117-files/ or similar
cp /tmp/u117-files/*.json public/exam-details/
```

### 3.2 Update progress tracker

`data-sourcing/progress.json` — for each exam in the unit:

```json
"<exam-id>": {
  "detail_file_exists": true,
  "overall_status": "verified",  // or "partial" if some sections are not_available
  "career_ladder": {"status": "available", "citations": 2, "last_updated": "2026-09-14", "updated_by": "external-ai-u117"},
  "exam_scheme": {"status": "available", "citations": 3, ...},
  "financial_package": {"status": "available", ...},
  "competition_benchmarks": {"status": "available", ...},
  "official_downloads": {"status": "available", ...}
}
```

Recompute `totals`:
```json
"totals": {
  "verified": <count of overall_status="verified">,
  "partial": <count of overall_status="partial">,
  "not_started": <count of detail_file_exists=false>
}
```

### 3.3 Mark unit complete in work-queue

`data-sourcing/work-queue.json`, find the unit and set:

```json
"status": "complete"
```

### 3.4 Build & smoke-test

```bash
npm run build
# Must exit 0

npm run dev
# Open localhost:5173
# Search 2–3 of the unit's exams
# Click Details
# Verify all tabs render correctly
# Specifically: click an exam you know has a deliberately "not_available" section
#   and confirm it renders via DataUnavailable (not blank)
```

### 3.5 Commit (one per unit)

```bash
git add public/exam-details/ data-sourcing/progress.json data-sourcing/work-queue.json
git commit -m "$(cat <<'EOF'
Unit u117 (Subordinate Boards — Andhra Pradesh): 2 exams researched and verified

- IBPS PO, SBI PO, RBI Assistant, SBI Clerk, SIDBI Grade A, PFRDA Grade A, ECGC PO, RBI Grade B (DEPR)
- All Tier A: every section researched and cited from official sources
- Updated progress.json totals, marked unit complete

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
EOF
)"
```

### 3.6 Push to canonical deploy target

**First, clarify with owner: which is canonical, Netlify or GitHub Pages?**

Once decided:

```bash
git push origin main
```

Verify on the live site (check whichever target was chosen in 3.6) that the exams appear in search and render correctly.

---

## Parallel workflow (recommended for speed)

Don't queue units sequentially. While review/incorporation for unit N is happening, dispatch unit N+1:

```
14:00  dispatch u117
14:15  dispatch u118  (u117 review starts in parallel)
14:30  dispatch u119  (u117 incorporation starts in parallel)
14:45  u117 published; dispatch u120
...
```

This keeps the researcher AI busy and the repo in constant progress without waiting.

---

## Checklist for each unit — print and tick as you go

- [ ] **Dispatch**: researcher given RESEARCH-GUIDE.md, upsc-cse.json, work-queue.json, unit id
- [ ] **Files received**: all `<exam-id>.json` + `<unit_id>-research-log.md` in hand
- [ ] **Schema valid**: `node scripts/data-sourcing/validate-details.mjs` exits 0
- [ ] **Citation spot-check**: 2–3 URLs independently re-fetched, numbers match
- [ ] **Link liveness**: all official_downloads links curl-checked, none are soft-404s or redirects to homepage
- [ ] **State pay check**: no state exams citing central 7th CPC
- [ ] **Review outcome**: APPROVED (proceed) vs BOUNCED (re-run)
- [ ] **Files moved**: `public/exam-details/` has all `<exam-id>.json`
- [ ] **progress.json updated**: totals recomputed, each exam has `detail_file_exists: true`
- [ ] **work-queue.json updated**: unit marked `status: "complete"`
- [ ] **Build clean**: `npm run build` exits 0
- [ ] **Smoke-test**: `npm run dev` → 2–3 exams render, `not_available` sections show correctly
- [ ] **Commit**: unit + exam count in message
- [ ] **Push**: to canonical deploy target

---

## Reference

| File | Purpose |
|---|---|
| `data-sourcing/EXECUTION-PLAN.md` | The complete, authoritative flow (this is a checklist version) |
| `data-sourcing/RESEARCH-GUIDE.md` | Binding quality standard for researchers |
| `data-sourcing/work-queue.json` | Current unit queue (20 units, 165 exams) |
| `public/exam-details/upsc-cse.json` | Schema reference (freeze this structure exactly) |
| `scripts/data-sourcing/validate-details.mjs` | Automated schema validator |
| `data-sourcing/progress.json` | Live tracker of verified/partial/not_started exams |
