# AI tool prompts — applying data you have already verified

Created 2026-09-20.

Companion to `ANTIGRAVITY-BATCHES.md`. That file's prompt is for **research** — sending a tool
out to find a figure. This file's prompts are for **application** — taking a figure you have
already checked against the conducting body's own notification and getting it into the repo
correctly.

The distinction matters, and it is the whole safety model of this project:

| | Research prompt | Application prompt |
|---|---|---|
| Who decides the figure is real? | nobody yet — output is a lead | **you, before you paste this** |
| What it may write | nothing | one specific file, one specific shape |
| What it must never do | invent a figure | invent a figure, **or** decide whether one belongs |

Everything below assumes the verification already happened. If it did not, use
`ANTIGRAVITY-BATCHES.md` first.

**The rule that survives every one of these prompts:** a tool may type, it may not judge.
Where a judgement is required — does this exam belong, is this figure the right one — the
prompt stops and asks. See `INCLUSION-POLICY.md` and the audits in `HANDOFF.md` §4 for what
happens when that line is crossed.

---

## 1. Cut-offs and vacancies for an existing exam

Writes to the dossier, `public/exam-details/<exam-id>.json`. **Never to `src/data/exams.json`** —
that file's `vacancies` field is calculated, and anything written there by hand is overwritten
the next time `npm run derive-vacancies` runs (`HANDOFF.md` §2).

```
In /Users/surajvadhya/Projects/indian-exams-dashboard, add a verified benchmark row.

File: public/exam-details/<exam-id>.json
Block: competition_benchmarks.years[]

Add one row in exactly this shape, changing nothing else in the file:

{
  "year": <cycle year, a number>,
  "vacancies": <number only, no commas, no "Posts">,
  "applicants": null,
  "shortlisted_for_mains": null,
  "selectivity_ratio": null,
  "cutoff_marks": <number or null>,
  "confidence": "verified",
  "as_of": "<date printed on the document, YYYY-MM-DD>",
  "source_url": "<direct link to the notification or PDF, not a homepage>",
  "source_label": "<advert number and what the figure covers>"
}

Rules:
- Do NOT touch src/data/exams.json. That file is calculated from this one.
- Do NOT invent, estimate or infer any value. If I have not given you a
  number, write null. A null is correct and useful; a guess is not.
- source_url must point at an actual document. A bare homepage is rejected
  by the rollup script and the row will never reach the site.
- If competition_benchmarks.status is "unavailable", change it to "available".
- If a row for this year already exists, show me both and ask before replacing.

Then tell me to run: npm run derive-vacancies
```

For several exams at once, append:

```
Do all of the above for each exam listed below. Report a one-line summary per
exam at the end: exam-id, figure written, and whether the file already had a
row for that year.
```

### Why each rule is there

- **`confidence: "verified"` is what makes a figure public.** `src/utils/provenance.js` withholds
  anything weaker. Never let a tool set it on a figure you have not personally seen in the source.
- **A bare homepage is not a citation.** `derive-vacancy-summary.mjs` checks the URL path and
  blocks rows that cite no document — 165 of 541 verified rows currently fail this test.
- **`npm run derive-vacancies` is not optional.** The dossier is the truth; the summary figures
  and charts only refresh when that script runs. Skipping it is how the two layers drifted apart
  before (`HANDOFF.md` §2).
- **Two active notifications are two rows**, not one merged number. If they may cover the same
  posts, set `exclude_from_rollup: true` on one of them by hand.

---

## 2. Adding a new exam you have decided belongs

The inclusion decision is yours and is not delegated. This prompt covers only the typing, after
you have tested the candidate against `INCLUSION-POLICY.md` §2 yourself.

The script is the safety net: it rejects missing fields, rejects a `track` that contradicts
`exam_type`, and skips duplicates by id or acronym. Do not let a tool bypass it by editing
`exams.json` directly.

```
In /Users/surajvadhya/Projects/indian-exams-dashboard, add a new exam I have
already verified. Do NOT edit any file by hand — use the script, which has
the validation.

Run this first with --dry-run, show me the output, and wait for my go-ahead
before running it for real:

node scripts/automation/sync-exams.mjs --add \
  --id "<lowercase-hyphenated-id>" \
  --name "<full official exam name>" \
  --acronym "<short form>" \
  --body "<conducting body>" \
  --domain "<one of the 20 existing domains — see below>" \
  --jurisdiction "<central | state>" \
  --state "<state name, only if jurisdiction is state>" \
  --type "<job | entrance>" \
  --track "<R | A | Q>" \
  --website "<official notification page, not a coaching or news site>" \
  --min-qualification "<e.g. Bachelor's Degree>" \
  --frequency "<e.g. Annual>"

Rules:
- Nothing is defaulted and nothing may be guessed. If you do not have a value
  from an official source, stop and ask me. A guessed conducting body, domain,
  website or qualification is the exact fabrication this script exists to stop.
- track and type must agree: R pairs with job; A and Q pair with entrance.
  The script rejects any other combination.
- --domain must be one already in use. Run the script with --add and no other
  arguments; it prints the current list. Do not invent a new one.
- Check src/data/exams.json first for an existing entry under a different
  name or acronym. The script catches exact duplicates, not near-misses.

Afterwards: run npm run validate and show me the result. Then update the
row's Status in data-sourcing/DISCOVERY-QUEUE.md to
"ADDED — see <id> in the registry, <today's date>".
```

### What to expect

- **An email on every real add**, from `notify.mjs` — your receipt that it happened.
- **The exam enters as a stub**, `record_tier: "registry"`, showing a "REGISTRY ENTRY" badge on
  the site until a full dossier exists. That is deliberate: you verified *what the exam is*, not
  its salary, scheme or vacancy history.
- **`--acronym` is optional but worth giving.** Omitted, it defaults to the id in capitals, which
  reads badly on the site.
- **Near-miss duplicates are your check, not the script's.** It catches an exact id or acronym
  clash; an exam already present under different wording will pass straight through. The
  discovery queue's matching is deliberately loose for the same reason — see `discover-exams.mjs`.

---

## 3. Triaging a discovery lead — assessment only, no writes

For when you want the research effort without handing over the decision.

```
Read data-sourcing/INCLUSION-POLICY.md, then assess this candidate
against all six conditions, one by one, with your reasoning for each:

<paste the lead from DISCOVERY-QUEUE.md>

Do not add anything to any file. If it passes, print the exact
sync-exams.mjs --add command for me to run, with all ten arguments
filled in from the official source. If it fails, say which condition
and why.
```

You run the printed command yourself. Prompt 2 then applies.

---

## Choosing the tool

Any tool used with these prompts must be able to **read the repo** — `INCLUSION-POLICY.md` and
`HANDOFF.md` encode rules that are not guessable from the code alone. A file-access tool
(Antigravity, as already used for the batches) is fine. A chat-only tool that cannot read the
repo will confidently produce rows in the wrong shape, and the shape is the part that matters.

Whatever the tool, the same three checks close the loop:

1. `npm run validate` — 509 checked, 0 errors.
2. `git diff` — confirm only the files you expected were touched.
3. For a vacancy change, `npm run derive-vacancies` — or the site still shows the old figure.
