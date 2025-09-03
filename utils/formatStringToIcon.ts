export function formatStringToIcon(str: string | null) {
  if (str) {
    const cleaned = str.replace(/[^a-z0-9]/gi, '')
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1)
  }
  return 'ChevronRight'
}
