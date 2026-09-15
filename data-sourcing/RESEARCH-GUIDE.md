# Research standard for exam dossiers

Read this before researching any exam's `public/exam-details/<id>.json`. It
exists because getting this wrong the first time (on UPSC Civil Services
Examination, the pilot/gate exam) taught real lessons the hard way. Follow
it exactly rather than re-deriving a process from scratch.

## The one rule everything else follows from

**Never invent a plausible number.** If you can't find a real source for a
fact, the section gets `"status": "not_available"` with a one-sentence
`note` explaining why, not a guessed figure. A blank, honestly-labeled field
is correct. A confident-looking invented one is the single worst outcome
this project can produce, because the dashboard presents itself as a
factual registry.

## The three confidence tiers — use the right one

Every populated fact carries a `confidence`:

- **`verified`** — you personally read this number in a primary source
  this session, ideally with a quote you can point to. Reading a PDF's
  headers or confirming a URL returns `200` is NOT verification — you have
  to actually open the document and see the number. Use `pdftotext` (via
  Bash) on downloaded PDFs; don't rely on `curl -I` alone.
- **`reported`** — a specific, real, non-computed figure attributed to a
  named official source (a PIB release, a UPSC press note), but you could
  not personally open that primary page this session. This is common:
  pib.gov.in and some upsc.gov.in pages return 401/403 to automated
  fetches. Do not call this "estimated" — it isn't a guess, it's a real
  number you just can't personally re-derive right now. Do not call it
  "verified" either — be precise about what you actually did.
- **`estimate`** — a genuinely computed or derived approximation with no
  single source (e.g. a salary range computed from a pay level and an
  assumed DA%). Reserve this tier only for things that are actually
  computed, not for facts you merely couldn't independently open.

If in doubt which tier applies, ask: "did I personally read this exact
number in a document I opened myself?" Yes → verified. "Is it a specific
real figure from a named source I just couldn't open?" → reported. "Did I
calculate this myself from other numbers?" → estimate.

## Checking a link is actually alive

Before citing any URL, check it, don't assume a search result is current:

```bash
curl -sI --max-time 10 -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36" "<url>" | head -5
```

- `200` — likely live. Still worth a real read for anything you'll mark
  `verified` (see above).
- `307`/`301`/`302` redirecting to a homepage or generic page — the
  document is gone. This happened to the first UPSC CSE notification link
  in this project; it silently redirected to `www.upsc.gov.in`. Don't ship
  a link like this.
- A `.pdf`-looking URL that actually serves HTML (check with `file` after
  downloading, or look for `<!DOCTYPE html>` in the first bytes) — a soft
  404. This happened with a supposedly-official 2024 UPSC press note URL
  in this project. Government CMSs do this instead of a clean 404.
- Cycle-specific documents (a single year's notification PDF) rot fast —
  UPSC removes the old one the moment a new cycle's notification goes up.
  Always tag these with a `cycle_label` (e.g. `"CSP-2026"`) so staleness
  is at least detectable later, and prefer an evergreen page (a syllabus
  or "previous year questions" hub) when one exists, since those don't rot
  on the same schedule.

## Reading a PDF for real

Some primary documents are worth actually opening, not just confirming
they exist:

```bash
curl -sL --max-time 20 -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36" "<url>" -o /tmp/doc.pdf
file /tmp/doc.pdf          # confirm it's actually a PDF, not an HTML soft-404
pdftotext -layout /tmp/doc.pdf -    # read it
```

`poppler` (for `pdftotext`) is installed via Homebrew on this machine. This
is how the 7th CPC Pay Matrix's exact basic-pay figures were confirmed for
UPSC CSE, and how a supposedly-2025 vacancy figure was found to actually
live inside the 2026 press note's own retrospective sentence rather than
the document originally (wrongly) cited for it. Re-check your own citation
against what you actually read — it's easy to grab the right number from
the wrong document when several similar press notes exist.

## What NOT to do

- Don't cite a URL you haven't checked returns something real.
- Don't invent a career ladder, exam scheme, or benchmark figure for an
  exam that plausibly has none published (many small state-subordinate
  postings genuinely have no public applicant/vacancy data, no formal
  promotion ladder). Mark the section `not_available` with a real reason.
- Don't apply a pay level to an academic entrance exam (`exam_type ===
  "entrance"`) — entrance exams have no recruitment career ladder or
  salary. That's `not_applicable`, handled client-side by the UI, not a
  data question — do not write career_ladder/financial_package content
  for entrance exams at all.
- Don't round or approximate a real reported figure "for cleanliness" —
  use the exact number from the source.
- Don't badge a whole row/section one confidence when different fields
  within it actually have different evidentiary bases — split them (see
  `public/exam-details/upsc-cse.json`'s `competition_benchmarks` for the
  pattern: some fields verified, others not, in the same section).

## The worked example

`public/exam-details/upsc-cse.json` is the reference implementation —
every section, every confidence tier, every citation shape used correctly.
When in doubt about the schema, copy its structure exactly rather than
inventing a new shape.

## Before marking an exam done

1. Every populated numeric fact has a `source_url` (or is honestly
   `not_available`/`not_applicable`).
2. Every `official_downloads` link has been checked live with `curl -I`
   this session — not assumed from a search result.
3. `career_ladder` and `financial_package` are omitted (not empty arrays —
   actually absent per the `not_applicable` convention) for entrance exams.
4. The file's `last_reviewed` date is set.
5. Update `data-sourcing/progress.json` for this exam id: set
   `detail_file_exists: true`, `overall_status` to `verified` if every
   section that should have data does, or `partial` if some sections are
   still `not_started`, and fill in each section's `status`/citations.
