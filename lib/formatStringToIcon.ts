export function formatStringToIcon(str: string | null) {
	if (str) {
		const cleaned = str.replace(/[^a-zA-Z0-9]/g, '')
		return cleaned.charAt(0).toUpperCase() + cleaned.slice(1)
	} else {
		return 'ChevronRight'
	}
}
