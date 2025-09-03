export function getTimeFromDate(value?: Date | string | null): string {
  if (!value) return '--:--'

  const date = new Date(value)

  if (isNaN(date.getTime())) return '--:--'

  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}
