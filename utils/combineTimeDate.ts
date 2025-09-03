export function combineTimeDate(date?: Date, time?: string) {
  if (!date && !time) return undefined
  if (!date) return undefined

  const settingDate = new Date(date)
  const settingTime = time && time !== '--:--' ? time : '00:00'

  const current = new Date(settingDate)
  const [hours, minutes] = settingTime.split(':').map(Number) as [
    number,
    number,
  ]

  current.setHours(hours, minutes)
  return current.toISOString()
}
