/**
 * Calendar Sync Utility for IndiaExams
 * Supports iCal (.ics) file generation and direct Google Calendar URL generation
 */

const MONTH_MAP = {
  January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
  July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
}

function formatDateToICS(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}${m}${d}`
}

export function generateExamDates(exam) {
  const currentYear = new Date().getFullYear()
  const examMonthName = (exam.exam_month || '').split('/')[0].trim()
  const monthIdx = MONTH_MAP[examMonthName] !== undefined ? MONTH_MAP[examMonthName] : 5

  // Default to 15th of the month
  const startDate = new Date(currentYear, monthIdx, 15)
  const endDate = new Date(currentYear, monthIdx, 16)

  return { startDate, endDate }
}

export function downloadExamIcs(exam) {
  const { startDate, endDate } = generateExamDates(exam)
  const startStr = formatDateToICS(startDate)
  const endStr = formatDateToICS(endDate)

  const summary = `Exam: ${exam.name} (${exam.acronym || exam.conducting_body})`
  const description = `National Examination Intelligence Dossier\\n\\nRole: ${exam.target_role || exam.name}\\nConducting Body: ${exam.conducting_body}\\nDomain: ${exam.domain}\\nCadre: ${exam.cadre || 'Notified'}\\nOfficial Website: ${exam.official_website || 'https://indiaexams.gov'}\\n\\nGenerated via IndiaExams Terminal`

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//IndiaExams//Examinations Terminal//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${exam.id}-${Date.now()}@indiaexams.local`,
    `DTSTAMP:${formatDateToICS(new Date())}T000000Z`,
    `DTSTART;VALUE=DATE:${startStr}`,
    `DTEND;VALUE=DATE:${endStr}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `URL:${exam.official_website || ''}`,
    'STATUS:CONFIRMED',
    'TRANSP:TRANSPARENT',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n')

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${exam.id}-schedule.ics`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function getGoogleCalendarUrl(exam) {
  const { startDate, endDate } = generateExamDates(exam)
  const startStr = formatDateToICS(startDate)
  const endStr = formatDateToICS(endDate)

  const title = encodeURIComponent(`${exam.name} Exam`)
  const details = encodeURIComponent(
    `Official Competitive Examination Tracking\n\nConducting Body: ${exam.conducting_body}\nRole: ${exam.target_role || exam.name}\nDomain: ${exam.domain}\nPortal: ${exam.official_website || ''}\n\nTracked on IndiaExams Terminal`
  )
  const location = encodeURIComponent(exam.jurisdiction === 'central' ? 'All India Centers' : `${exam.state} State Centers`)

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startStr}/${endStr}&details=${details}&location=${location}`
}

export function downloadMonthScheduleIcs(monthName, examsList) {
  const currentYear = new Date().getFullYear()
  const monthIdx = MONTH_MAP[monthName] !== undefined ? MONTH_MAP[monthName] : 5

  const events = examsList.map((exam, idx) => {
    const day = Math.min(28, 5 + (idx % 20))
    const start = new Date(currentYear, monthIdx, day)
    const end = new Date(currentYear, monthIdx, day + 1)
    const startStr = formatDateToICS(start)
    const endStr = formatDateToICS(end)

    return [
      'BEGIN:VEVENT',
      `UID:${exam.id}-${idx}-${Date.now()}@indiaexams.local`,
      `DTSTAMP:${formatDateToICS(new Date())}T000000Z`,
      `DTSTART;VALUE=DATE:${startStr}`,
      `DTEND;VALUE=DATE:${endStr}`,
      `SUMMARY:${exam.name}`,
      `DESCRIPTION:${exam.conducting_body} - ${exam.domain} (${exam.target_role || ''})\\nPortal: ${exam.official_website || ''}`,
      'STATUS:CONFIRMED',
      'END:VEVENT'
    ].join('\r\n')
  }).join('\r\n')

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//IndiaExams//Month Schedule//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    events,
    'END:VCALENDAR'
  ].join('\r\n')

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `IndiaExams-${monthName}-${currentYear}-Schedule.ics`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
