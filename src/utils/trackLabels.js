// Single source of truth for the R/A/Q track field (see data-sourcing/INCLUSION-POLICY.md §1).
// `exam_type` ('job'/'entrance') stays on every record but is being phased out of the UI in
// favour of `track`, which distinguishes Q (professional qualification) from A (admission).
export function getTrackLabel(track) {
  if (track === 'R') return 'Job Recruitment'
  if (track === 'Q') return 'Professional Qualification'
  return 'Admission Exam'
}

export function isJobTrack(track) {
  return track === 'R'
}
