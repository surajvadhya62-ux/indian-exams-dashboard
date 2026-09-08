export function getDomainColor(domain) {
  const colors = {
    'Engineering': '#3b82f6',
    'Medical': '#f43f5e',
    'Law': '#f59e0b',
    'Management': '#8b5cf6',
    'Defence': '#10b981',
    'Government Services': '#06b6d4',
    'Research & Academia': '#14b8a6',
    'Banking': '#f97316',
    'Design': '#ec4899',
    'Education': '#a78bfa',
    'Finance': '#fbbf24',
    'Agriculture': '#22c55e',
    'General': '#64748b',
    'Architecture': '#e879f9',
    'Hospitality': '#fb923c',
    'Maritime': '#38bdf8',
    'Social Sciences': '#c084fc',
    'Insurance': '#34d399',
  }
  return colors[domain] || '#64748b'
}

export function getMonthExams(exams) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const result = months.map(month => ({
    month,
    exams: [],
    applications: [],
  }))

  exams.forEach(exam => {
    months.forEach((month, idx) => {
      if (exam.exam_month && exam.exam_month.toLowerCase().includes(month.toLowerCase())) {
        result[idx].exams.push(exam)
      }
      if (exam.application_period && exam.application_period.toLowerCase().includes(month.toLowerCase())) {
        result[idx].applications.push(exam)
      }
    })
  })

  return result
}
