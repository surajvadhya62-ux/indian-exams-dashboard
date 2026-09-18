#!/usr/bin/env node

/**
 * connectivity-probe.mjs
 *
 * One-off diagnostic: can a CI runner actually reach the authority portals listed in
 * sources-config.json? Answers the open question of whether Indian government sites
 * respond to GitHub's US-based runners, and distinguishes a real page from an HTTP 200
 * that returns an empty JS shell.
 *
 * Writes a human-readable report to connectivity-report.md at the repo root.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, '../..')
const SOURCES_CONFIG_PATH = path.join(__dirname, 'sources-config.json')
const REPORT_PATH = path.join(ROOT_DIR, 'connectivity-report.md')

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
const TIMEOUT_MS = 20000
const CONCURRENCY = 5
const BLANK_TEXT_THRESHOLD = 500

function htmlToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function classify({ ok, status, textLen }) {
  if (!ok) return 'UNREACHABLE'
  if (status >= 400) return 'HTTP_ERROR'
  if (textLen < BLANK_TEXT_THRESHOLD) return 'BLANK_SHELL'
  return 'OK'
}

async function probe(target) {
  const started = Date.now()
  try {
    const res = await fetch(target.url, {
      headers: { 'User-Agent': UA, 'Accept-Language': 'en-IN,en;q=0.9' },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      redirect: 'follow'
    })
    const html = await res.text()
    const text = htmlToText(html)
    const ms = Date.now() - started
    return {
      ...target,
      ok: true,
      status: res.status,
      ms,
      htmlLen: html.length,
      textLen: text.length,
      hasNotifWords: /(recruitment|notification|advertis|examination|vacan|what'?s new|apply online)/i.test(text),
      verdict: classify({ ok: true, status: res.status, textLen: text.length }),
      error: null
    }
  } catch (err) {
    const ms = Date.now() - started
    const code = err.cause?.code || err.name || 'UNKNOWN'
    return {
      ...target,
      ok: false,
      status: null,
      ms,
      htmlLen: 0,
      textLen: 0,
      hasNotifWords: false,
      verdict: 'UNREACHABLE',
      error: `${code}: ${(err.cause?.message || err.message || '').slice(0, 120)}`
    }
  }
}

async function runPool(targets) {
  const results = []
  let cursor = 0
  const workers = Array.from({ length: Math.min(CONCURRENCY, targets.length) }, async () => {
    while (cursor < targets.length) {
      const target = targets[cursor++]
      const result = await probe(target)
      console.log(
        `${result.verdict.padEnd(12)} ${String(result.status ?? 'ERR').padEnd(5)} ` +
          `${String(result.ms + 'ms').padEnd(8)} text=${String(result.textLen).padEnd(7)} ${result.label}`
      )
      results.push(result)
    }
  })
  await Promise.all(workers)
  return results
}

async function detectRunnerLocation() {
  try {
    const res = await fetch('https://ipinfo.io/json', { signal: AbortSignal.timeout(8000) })
    if (!res.ok) return 'unknown (lookup returned ' + res.status + ')'
    const info = await res.json()
    return `${info.city || '?'}, ${info.region || '?'}, ${info.country || '?'} (${info.org || 'unknown network'})`
  } catch (err) {
    return `unknown (lookup failed: ${err.message})`
  }
}

function buildReport(results, runnerLocation) {
  const byVerdict = (v) => results.filter((r) => r.verdict === v)
  const ok = byVerdict('OK')
  const blank = byVerdict('BLANK_SHELL')
  const httpErr = byVerdict('HTTP_ERROR')
  const dead = byVerdict('UNREACHABLE')

  const pct = (n) => `${Math.round((n / results.length) * 100)}%`

  const lines = []
  lines.push('# Authority Portal Connectivity Report')
  lines.push('')
  lines.push(`**Run at:** ${new Date().toISOString()}`)
  lines.push(`**Runner location:** ${runnerLocation}`)
  lines.push(`**Portals tested:** ${results.length}`)
  lines.push('')
  lines.push('## Summary')
  lines.push('')
  lines.push('| Outcome | Count | Share | Meaning |')
  lines.push('|---|---:|---:|---|')
  lines.push(`| Usable | ${ok.length} | ${pct(ok.length)} | Real page content returned; can be read automatically |`)
  lines.push(`| Blank shell | ${blank.length} | ${pct(blank.length)} | Responded "OK" but delivered no readable text — needs a browser engine |`)
  lines.push(`| HTTP error | ${httpErr.length} | ${pct(httpErr.length)} | Server refused or errored |`)
  lines.push(`| Unreachable | ${dead.length} | ${pct(dead.length)} | Timed out, DNS failure, or certificate rejected |`)
  lines.push('')
  lines.push('## Full results')
  lines.push('')
  lines.push('| Authority | Outcome | HTTP | Time | Readable text (chars) | Notice keywords | Error |')
  lines.push('|---|---|---:|---:|---:|---|---|')
  for (const r of results.sort((a, b) => a.label.localeCompare(b.label))) {
    lines.push(
      `| ${r.label} | ${r.verdict} | ${r.status ?? '—'} | ${r.ms}ms | ${r.textLen} | ` +
        `${r.hasNotifWords ? 'yes' : 'no'} | ${r.error ? '`' + r.error + '`' : ''} |`
    )
  }
  lines.push('')
  lines.push('## Notes')
  lines.push('')
  lines.push('- `BLANK_SHELL` is the dangerous category: the request succeeds, so naive code records a')
  lines.push('  successful check while having learned nothing. These portals render content via JavaScript.')
  lines.push('- Certificate rejections usually mean the site serves an incomplete chain, not that it is unsafe.')
  lines.push('- Compare the outcome here against the same URLs fetched from an Indian IP to detect geo-blocking.')
  lines.push('')

  return lines.join('\n') + '\n'
}

async function main() {
  const config = JSON.parse(fs.readFileSync(SOURCES_CONFIG_PATH, 'utf-8'))
  const targets = []

  for (const auth of config.axes.authorities_by_jurisdiction.central || []) {
    targets.push({ label: `${auth.name} (${auth.id.toUpperCase()})`, url: auth.url })
  }
  for (const st of config.axes.authorities_by_jurisdiction.states || []) {
    targets.push({ label: `${st.state} — ${st.psc}`, url: st.url })
  }

  console.log(`Probing ${targets.length} authority portals...\n`)
  const runnerLocation = await detectRunnerLocation()
  console.log(`Runner location: ${runnerLocation}\n`)

  const results = await runPool(targets)
  fs.writeFileSync(REPORT_PATH, buildReport(results, runnerLocation), 'utf-8')

  const usable = results.filter((r) => r.verdict === 'OK').length
  console.log(`\nWrote report to connectivity-report.md — ${usable}/${results.length} portals usable.`)
}

main().catch((err) => {
  console.error('Probe failed:', err)
  process.exit(1)
})
