#!/usr/bin/env node

/**
 * notify.mjs
 *
 * The three emails this project sends. All of them report; none of them decide.
 *
 *   notifyExamAdded            an exam was actually added to the database by
 *                              sync-exams.mjs --add. Fires only on a real add — never on
 *                              --dry-run, and never just because a candidate showed up in
 *                              DISCOVERY-QUEUE.md (that queue is leads, this is action).
 *   notifyNewDiscoveryCandidates  the weekly discover-exams.mjs run found titles not
 *                              already in the database. Leads, unchecked.
 *   notifyBenchmarkNotices     the daily portal-watch.mjs run saw a new notice mentioning
 *                              a cut-off or vacancy figure. Links, unread.
 *
 * The first two report on OUR data changing, which is always something we did. The third
 * reports on the SOURCES changing, which is the one nobody is present for — added
 * 2026-09-20 because a cut-off could be published and sit unread in PORTAL-CHANGE-LOG.md
 * indefinitely, and the daily watch had no way to say so.
 *
 * None of them sends on a quiet run. An email always means there is something to look at.
 *
 * Credentials live in scripts/automation/notify-config.json, gitignored (matches
 * `scripts/automation/*.json` in .gitignore) — never committed. Copy
 * notify-config.example.json to notify-config.json and fill in the real values;
 * see that file for what's needed and how to generate a Gmail app password.
 *
 * If the config file is missing or incomplete, this fails LOUD but never blocks the
 * actual exam add — a missing notification is an inconvenience; refusing to add a
 * verified exam because an email couldn't be sent would be a worse failure mode.
 * sync-exams.mjs calls this and logs whatever it reports, but doesn't exit on it.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import nodemailer from 'nodemailer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CONFIG_PATH = path.join(__dirname, 'notify-config.json')

function loadConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    return { ok: false, reason: `No notify-config.json at ${CONFIG_PATH}. Copy notify-config.example.json to notify-config.json and fill in real values.` }
  }
  let cfg
  try {
    cfg = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'))
  } catch (err) {
    return { ok: false, reason: `notify-config.json is not valid JSON: ${err.message}` }
  }
  const required = ['senderEmail', 'senderAppPassword', 'recipientEmail']
  const missing = required.filter((k) => !cfg[k] || cfg[k].includes('goes here'))
  if (missing.length) {
    return { ok: false, reason: `notify-config.json is missing or has placeholder values for: ${missing.join(', ')}` }
  }
  return { ok: true, cfg }
}

/**
 * @param {{id: string, name: string, conducting_body: string, track: string, official_website: string}} exam
 * @returns {Promise<{sent: boolean, reason?: string}>}
 */
export async function notifyExamAdded(exam) {
  const loaded = loadConfig()
  if (!loaded.ok) {
    return { sent: false, reason: loaded.reason }
  }
  const { senderEmail, senderAppPassword, recipientEmail } = loaded.cfg

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: senderEmail, pass: senderAppPassword },
  })

  const subject = `New exam added: ${exam.name}`
  const text = [
    `A new exam was just added to the India Exams Dashboard database.`,
    ``,
    `Name: ${exam.name}`,
    `ID: ${exam.id}`,
    `Conducting body: ${exam.conducting_body}`,
    `Track: ${exam.track}`,
    `Official link: ${exam.official_website}`,
    ``,
    `This was added as a "registry" entry (a stub — name, body and link only, no full`,
    `dossier yet). It will show a "REGISTRY ENTRY" badge on the site until someone`,
    `builds out the full career ladder / exam scheme / vacancy history for it.`,
    ``,
    `— sent automatically by sync-exams.mjs --add`,
  ].join('\n')

  try {
    await transporter.sendMail({
      from: senderEmail,
      to: recipientEmail,
      subject,
      text,
    })
    return { sent: true }
  } catch (err) {
    return { sent: false, reason: `sendMail failed: ${err.message}` }
  }
}

/**
 * Sent when a scheduled discover-exams.mjs run finds candidates genuinely new since
 * the last run — not on every run, only when there's actually something to look at.
 * See discover-exams.mjs's own comments for why this is a summary count and links,
 * not a verdict: nothing here has been checked against INCLUSION-POLICY.md yet.
 *
 * @param {{source: string, title: string, url: string}[]} candidates
 * @returns {Promise<{sent: boolean, reason?: string}>}
 */
export async function notifyNewDiscoveryCandidates(candidates) {
  const loaded = loadConfig()
  if (!loaded.ok) {
    return { sent: false, reason: loaded.reason }
  }
  const { senderEmail, senderAppPassword, recipientEmail } = loaded.cfg

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: senderEmail, pass: senderAppPassword },
  })

  const subject = `${candidates.length} new discovery candidate(s) to review`
  const lines = candidates.map((c) => `- [${c.source}] ${c.title}\n  ${c.url}`)
  const text = [
    `discover-exams.mjs's weekly run found ${candidates.length} title(s) that don't`,
    `match anything already in the database.`,
    ``,
    ...lines,
    ``,
    `Nothing here is confirmed — these are leads, same as every other row in`,
    `data-sourcing/DISCOVERY-QUEUE.md. Check each against INCLUSION-POLICY.md's`,
    `six-condition test before adding anything.`,
    ``,
    `Full queue: data-sourcing/DISCOVERY-QUEUE.md`,
    ``,
    `— sent automatically by discover-exams.mjs`,
  ].join('\n')

  try {
    await transporter.sendMail({ from: senderEmail, to: recipientEmail, subject, text })
    return { sent: true }
  } catch (err) {
    return { sent: false, reason: `sendMail failed: ${err.message}` }
  }
}

/**
 * Sent when a scheduled portal-watch.mjs run finds new notices that mention a cut-off or a
 * vacancy figure — the two fields that go stale on the site without anyone causing it.
 *
 * The other two notifications in this file report on OUR database changing, which is always
 * something we did. This one reports on the sources changing underneath it, which is the
 * failure nobody is present for: a cut-off published in October sitting unread in
 * PORTAL-CHANGE-LOG.md until December.
 *
 * Same rule as the rest: this mails LINKS, never figures. Nothing in this email has been
 * opened, read or checked, and nothing it describes has touched exams.json or any dossier.
 * A figure still reaches the site only the way INCLUSION-POLICY.md §5 requires — a person
 * comparing it to the conducting body's own notification.
 *
 * @param {{label: string, notices: {text: string, href: string}[]}[]} groups  by authority
 * @returns {Promise<{sent: boolean, reason?: string}>}
 */
export async function notifyBenchmarkNotices(groups) {
  const loaded = loadConfig()
  if (!loaded.ok) {
    return { sent: false, reason: loaded.reason }
  }
  const { senderEmail, senderAppPassword, recipientEmail } = loaded.cfg

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: senderEmail, pass: senderAppPassword },
  })

  const total = groups.reduce((n, g) => n + g.notices.length, 0)
  const subject = `${total} cut-off / vacancy notice(s) posted — ${groups.length} authority(ies)`

  const lines = []
  for (const g of groups) {
    lines.push(`${g.label}`)
    for (const n of g.notices) lines.push(`  - ${n.text}\n    ${n.href}`)
    lines.push('')
  }

  const text = [
    `Today's portal watch found ${total} new notice(s) mentioning a cut-off, merit list or`,
    `vacancy figure, across ${groups.length} authority(ies).`,
    ``,
    ...lines,
    `Nothing here has been read or verified, and nothing has been written to the database —`,
    `these are links to go and look at. To record a vacancy figure, enter it in the exam's`,
    `dossier against this notification, then re-run: npm run derive-vacancies`,
    ``,
    `Every notice found today, including the ones not listed above:`,
    `data-sourcing/PORTAL-CHANGE-LOG.md`,
    ``,
    `— sent automatically by portal-watch.mjs`,
  ].join('\n')

  try {
    await transporter.sendMail({ from: senderEmail, to: recipientEmail, subject, text })
    return { sent: true }
  } catch (err) {
    return { sent: false, reason: `sendMail failed: ${err.message}` }
  }
}

/**
 * The weekly "still alive" note for the portal watcher, added 2026-09-20.
 *
 * THIS IS THE ONE EMAIL THAT ALWAYS SENDS. Every other notification here stays silent on a
 * quiet run, on the principle that an email should mean something happened. This one inverts
 * that on purpose, because it exists to answer the question the others cannot:
 *
 *   No cut-off email this week — did nothing get published, or did the watcher not run?
 *
 * Silence is ambiguous, and a missed run is invisible: it leaves no log entry, and no entry
 * looks exactly like a quiet day. That is not hypothetical — Sun 2026-09-20's 09:00 run was
 * skipped because the Mac was powered off, and nothing said so. A note that arrives every
 * week, saying plainly which days ran, is the only thing that makes the absence visible.
 *
 * @param {{date: string, weekday: string, status: 'OK'|'FAILED'|'MISSED', notices: number|null, time: string|null}[]} days
 * @returns {Promise<{sent: boolean, reason?: string}>}
 */
export async function notifyWatchHeartbeat(days) {
  const loaded = loadConfig()
  if (!loaded.ok) {
    return { sent: false, reason: loaded.reason }
  }
  const { senderEmail, senderAppPassword, recipientEmail } = loaded.cfg

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: senderEmail, pass: senderAppPassword },
  })

  // Days before the watcher was installed are listed for completeness but are not counted
  // against it — see buildWindow() in portal-watch-heartbeat.mjs.
  const expected = days.filter((d) => d.status !== 'NOT_SCHEDULED_YET')
  const ok = expected.filter((d) => d.status === 'OK')
  const missed = expected.filter((d) => d.status === 'MISSED')
  const failed = expected.filter((d) => d.status === 'FAILED')
  const totalNotices = ok.reduce((n, d) => n + (d.notices || 0), 0)

  const allWell = missed.length === 0 && failed.length === 0
  const subject = allWell
    ? `Portal watch: all ${expected.length} day(s) ran OK`
    : `Portal watch: ${ok.length} of ${expected.length} day(s) ran — ${missed.length} missed, ${failed.length} failed`

  const mark = { OK: 'ran', FAILED: 'FAILED', MISSED: 'DID NOT RUN', NOT_SCHEDULED_YET: 'not set up yet' }
  const rows = days.map((d) => {
    const when = d.time ? ` at ${d.time}` : ''
    const found = d.status === 'OK' ? ` — ${d.notices} new notice(s)` : ''
    return `  ${d.weekday.padEnd(9)} ${d.date}   ${mark[d.status].padEnd(11)}${when}${found}`
  })

  const text = [
    `Weekly status of the daily portal watch. This note is sent every week whether or not`,
    `anything happened, so that a week with no cut-off email can be told apart from a week`,
    `where the watcher never ran.`,
    ``,
    ...rows,
    ``,
    `${ok.length} of ${expected.length} scheduled day(s) ran. ${totalNotices} new notice(s) seen in total.`,
    ``,
    ...(missed.length
      ? [
          `A day marked DID NOT RUN usually means the Mac was powered off at 09:00 — launchd`,
          `replays a missed job after sleep, but not after a shutdown. The job now also runs`,
          `at startup to catch up, so an occasional miss should self-correct the same day.`,
          `Several in a row means the schedule is genuinely broken; check with:`,
          `  launchctl list | grep indiaexams`,
          ``,
        ]
      : []),
    ...(failed.length
      ? [`A day marked FAILED has its error in data-sourcing/portal-watch.log.`, ``]
      : []),
    `Full log: data-sourcing/portal-watch.log`,
    ``,
    `— sent automatically by portal-watch-heartbeat.mjs`,
  ].join('\n')

  try {
    await transporter.sendMail({ from: senderEmail, to: recipientEmail, subject, text })
    return { sent: true }
  } catch (err) {
    return { sent: false, reason: `sendMail failed: ${err.message}` }
  }
}

// Allow calling this file directly for a one-off connectivity test:
//   node scripts/automation/notify.mjs --test
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  if (process.argv.includes('--test')) {
    const result = await notifyExamAdded({
      id: 'test-exam',
      name: 'Test Notification Exam',
      conducting_body: 'Test Body',
      track: 'R',
      official_website: 'https://example.gov.in',
    })
    console.log(result)
  } else if (process.argv.includes('--test-benchmarks')) {
    // Sends one sample cut-off/vacancy email so the format can be checked in the inbox
    // without waiting for a portal to actually publish something.
    const result = await notifyBenchmarkNotices([
      {
        label: 'Union Public Service Commission (UPSC)',
        notices: [
          { text: 'Cut-off Marks — Civil Services (Preliminary) Examination 2026', href: 'https://upsc.gov.in/sites/default/files/example-cutoff.pdf' },
        ],
      },
      {
        label: 'Staff Selection Commission (SSC)',
        notices: [
          { text: 'Corrigendum: revised vacancy position — 1,538 Posts, CHSL 2026', href: 'https://ssc.nic.in/example-corrigendum.pdf' },
        ],
      },
    ])
    console.log(result)
  } else {
    console.log('Usage: node scripts/automation/notify.mjs [--test | --test-benchmarks]')
  }
}
