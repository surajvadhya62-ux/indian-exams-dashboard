/**
 * Live exam-news fetcher (browser side).
 *
 * Pulls the latest Google News headlines through public RSS-to-JSON converters
 * (browsers can't read Google News directly). The daily stored list
 * (public/news/all.json, built by scripts/automation/refresh-news.mjs) covers
 * the past week; this adds whatever has appeared since that morning's run.
 *
 * Headlines are labelled with src/utils/newsMatch.js — the same rules the daily
 * job uses — and a headline that names no tracked exam or authority is dropped.
 * These are news reports, not official notices, and nothing here says otherwise.
 */

import examsData from '../data/exams.json'
import authoritiesData from '../data/authorities.json'
import { buildMatcher, detectTypeCode, storyId } from './newsMatch'

export function getRelativeTime(pubDateStr) {
  try {
    const pub = new Date(pubDateStr)
    const now = new Date()
    const diffSec = Math.floor((now - pub) / 1000)

    if (diffSec < 60) return 'Just now'
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`
    if (diffSec < 86400) {
      const hours = Math.floor(diffSec / 3600)
      // Check if it was yesterday
      if (now.getDate() !== pub.getDate()) {
        return `Yesterday (${hours}h ago)`
      }
      return `${hours}h ago`
    }
    if (diffSec < 172800) return 'Yesterday'
    if (diffSec < 604800) return `${Math.floor(diffSec / 86400)}d ago`
    return pub.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return 'Recent'
  }
}

const matchStory = buildMatcher(examsData, authoritiesData)

// In-memory cache for fast tab navigation
const memoryCache = new Map()

export async function fetchLiveExamNews(authorityName = '', examKeyword = '', forceRefresh = false) {
  const authClean = (authorityName && authorityName !== 'all') ? authorityName.trim() : ''
  const kwClean = (examKeyword && examKeyword.trim()) ? examKeyword.trim() : ''
  const cacheKey = `news_live_v2_${authClean || 'all'}_${kwClean || 'none'}`

  // If not forcing refresh, check caches
  if (!forceRefresh) {
    // Check in-memory cache (3 min TTL)
    const cachedMem = memoryCache.get(cacheKey)
    if (cachedMem && (Date.now() - cachedMem.timestamp < 180000)) {
      return { success: true, items: cachedMem.items, source: 'memory_cache', timestamp: new Date(cachedMem.timestamp) }
    }

    // Check localStorage cache (5 min TTL)
    try {
      const rawLocal = localStorage.getItem(cacheKey)
      if (rawLocal) {
        const parsed = JSON.parse(rawLocal)
        if (Date.now() - parsed.timestamp < 300000 && parsed.items?.length > 0) {
          memoryCache.set(cacheKey, parsed)
          return { success: true, items: parsed.items, source: 'local_cache', timestamp: new Date(parsed.timestamp) }
        }
      }
    } catch {
      // Ignore localStorage read errors
    }
  }

  // Build targeted search query
  let query = ''
  if (authClean) {
    // Targeted search for specific conducting authority (e.g. "UPPSC")
    query = `"${authClean}" (exam OR result OR notification OR "admit card" OR recruitment)`
  } else {
    // Broad national examination query covering central commissions, UPPSC, BPSC, State PSCs
    query = '(UPPSC OR UPSC OR SSC OR BPSC OR NTA OR IBPS OR "State PSC") (result OR exam OR notification OR "admit card" OR recruitment)'
  }

  if (kwClean) {
    query += ` ${kwClean}`
  }

  const googleRssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-IN&gl=IN&ceid=IN:en`

  // Strategy 1: api.rss2json.com (High uptime, direct JSON, open CORS header)
  // Strategy 2: feed2json.org / toptal.com (JSON converter with open CORS)
  // Strategy 3: Vite dev proxy (/api/rss)
  let rawItems = null
  let lastError = null

  // 1. Try rss2json
  try {
    const r2jUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(googleRssUrl)}`
    const res = await fetch(r2jUrl, { signal: AbortSignal.timeout(6000) })
    if (res.ok) {
      const data = await res.json()
      if (data.status === 'ok' && Array.isArray(data.items) && data.items.length > 0) {
        rawItems = data.items.map(item => ({
          rawTitle: item.title,
          link: item.link,
          pubDate: item.pubDate,
          rawDesc: item.description || item.content || '',
          sourceName: item.author || ''
        }))
      }
    }
  } catch (err) {
    lastError = err
  }

  // 2. Fallback to feed2json if rss2json didn't yield items
  if (!rawItems || rawItems.length === 0) {
    try {
      const f2jUrl = `https://feed2json.org/convert?url=${encodeURIComponent(googleRssUrl)}`
      const res = await fetch(f2jUrl, { signal: AbortSignal.timeout(6000) })
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data.items) && data.items.length > 0) {
          rawItems = data.items.map(item => ({
            rawTitle: item.title,
            link: item.url || item.link,
            pubDate: item.date_published || new Date().toISOString(),
            rawDesc: item.content_html || item.summary || '',
            sourceName: item.authors?.[0]?.name || ''
          }))
        }
      }
    } catch (err) {
      lastError = err
    }
  }

  // 3. Fallback to Vite Dev Proxy if available
  if (!rawItems || rawItems.length === 0) {
    try {
      const devPath = `/api/rss/search?q=${encodeURIComponent(query)}&hl=en-IN&gl=IN&ceid=IN:en`
      const res = await fetch(devPath, { signal: AbortSignal.timeout(5000) })
      if (res.ok) {
        const xmlText = await res.text()
        if (xmlText && xmlText.includes('<rss') && xmlText.includes('<item>')) {
          const parser = new DOMParser()
          const xmlDoc = parser.parseFromString(xmlText, 'text/xml')
          const nodes = Array.from(xmlDoc.querySelectorAll('item'))
          if (nodes.length > 0) {
            rawItems = nodes.map(node => ({
              rawTitle: node.querySelector('title')?.textContent || 'Statutory Wire Dispatch',
              link: node.querySelector('link')?.textContent || '#',
              pubDate: node.querySelector('pubDate')?.textContent || new Date().toISOString(),
              rawDesc: node.querySelector('description')?.textContent || '',
              sourceName: node.querySelector('source')?.textContent || ''
            }))
          }
        }
      }
    } catch (err) {
      lastError = err
    }
  }

  if (!rawItems || rawItems.length === 0) {
    // If all upstream networks fail, try serving stale localStorage cache if any exists
    try {
      const staleLocal = localStorage.getItem(cacheKey)
      if (staleLocal) {
        const parsed = JSON.parse(staleLocal)
        if (parsed.items?.length > 0) {
          return { success: true, items: parsed.items, source: 'stale_cache', timestamp: new Date(parsed.timestamp) }
        }
      }
    } catch {
      // ignore
    }

    return {
      success: false,
      items: [],
      error: lastError?.message || 'Unable to fetch real-time news stream from upstream endpoints'
    }
  }

  // Process & enrich the raw items
  try {
    const parsedItems = []
    for (const item of rawItems.slice(0, 16)) {
      let rawTitle = item.rawTitle || ''
      const link = item.link || '#'
      const pubDate = item.pubDate || new Date().toISOString()

      // Extract publisher source from trailing " - Source" if present
      let extractedSource = item.sourceName || ''
      if (rawTitle.includes(' - ')) {
        const parts = rawTitle.split(' - ')
        const tail = parts.pop().trim()
        if (!extractedSource) extractedSource = tail
        rawTitle = parts.join(' - ').trim()
      }
      if (!rawTitle) continue

      const match = matchStory(rawTitle)
      if (!match) continue // not about an exam or authority we track

      const published = new Date(pubDate)
      parsedItems.push({
        id: storyId(link, rawTitle),
        exam_id: match.exam_id,
        exam_acronym: match.exam_acronym,
        title: rawTitle,
        source: extractedSource || 'News report',
        authority_full: match.authority_full,
        date: published.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        published_at: published.toISOString(),
        type_code: detectTypeCode(rawTitle).code,
        category: match.category,
        link,
        portal_url: match.portal_url,
        is_live: true,
      })
    }

    // Store in memory and localStorage cache
    const cachePayload = { timestamp: Date.now(), items: parsedItems }
    memoryCache.set(cacheKey, cachePayload)
    try {
      localStorage.setItem(cacheKey, JSON.stringify(cachePayload))
    } catch {
      // Ignore storage quota limits
    }

    return {
      success: true,
      items: parsedItems,
      query: query,
      timestamp: new Date()
    }
  } catch (err) {
    return {
      success: false,
      items: [],
      error: err.message
    }
  }
}

/**
 * Running archive of live stories.
 *
 * The upstream converter returns only the latest 10 stories per request, so
 * each sync used to *replace* the previous 10 — new stories pushed old ones
 * out and the feed's total never moved. The archive keeps every live story seen
 * in this browser for ARCHIVE_DAYS, so the count grows as news actually arrives.
 */
const ARCHIVE_KEY = 'news_live_archive_v2'
// Same window as the daily stored list
const ARCHIVE_DAYS = 7
const ARCHIVE_MAX = 300

export function loadArchive() {
  try {
    const raw = localStorage.getItem(ARCHIVE_KEY)
    const items = raw ? JSON.parse(raw) : []
    return Array.isArray(items) ? pruneArchive(items) : []
  } catch {
    return []
  }
}

function pruneArchive(items) {
  const cutoff = Date.now() - ARCHIVE_DAYS * 86400000
  return items
    .filter(item => item.published_at && new Date(item.published_at).getTime() >= cutoff)
    .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
    .slice(0, ARCHIVE_MAX)
}

/** Returns the merged archive and how many of `incoming` were not already in it. */
export function mergeIntoArchive(existing, incoming) {
  const byId = new Map(existing.map(item => [item.id, item]))
  for (const item of incoming) {
    if (item.published_at) byId.set(item.id, item)
  }
  const merged = pruneArchive([...byId.values()])
  const before = new Set(existing.map(item => item.id))
  const added = merged.filter(item => !before.has(item.id)).length
  try {
    localStorage.setItem(ARCHIVE_KEY, JSON.stringify(merged))
  } catch {
    // Ignore storage quota limits — the in-memory list still works this session
  }
  return { items: merged, added }
}
