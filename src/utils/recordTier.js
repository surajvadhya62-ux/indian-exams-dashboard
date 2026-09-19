// Single source of truth for the `record_tier` field (see
// data-sourcing/DECISION-2026-09-19-record-tier.md). Calculated by
// scripts/automation/derive-record-tier.mjs — never set by hand, and never
// read via a raw `=== 'registry'` string comparison scattered across
// components; that's exactly the trap `exam_type` fell into (see
// src/utils/trackLabels.js and INCLUSION-POLICY.md §3).

export function isRegistryTier(recordTier) {
  return recordTier === 'registry'
}

export function getRecordTierLabel(recordTier) {
  return isRegistryTier(recordTier) ? 'Registry Entry' : 'Full Dossier'
}
