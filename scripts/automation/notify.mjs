#!/usr/bin/env node

/**
 * notify.mjs
 *
 * Sends an email whenever sync-exams.mjs actually adds a new exam to the database —
 * a standing owner requirement, not tied to any one feature. Fires only on a real
 * add (never on --dry-run, and never just because a candidate showed up in
 * data-sourcing/DISCOVERY-QUEUE.md — that queue is leads, this is confirmed action).
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
  } else {
    console.log('Usage: node scripts/automation/notify.mjs --test')
  }
}
