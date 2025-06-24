export function formatExpireDate(dateString: string | Date): string {
	const now = new Date()
	const date = new Date(dateString)
	const diff = date.setHours(0, 0, 0, 0) - now.setHours(0, 0, 0, 0)
	const oneDay = 24 * 60 * 60 * 1000

	if (diff < 0) {
		return 'Expired'
	}
	if (diff === 0) {
		return 'Today'
	}
	if (diff === oneDay) {
		return 'Tomorrow'
	}

	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	})
}

export function expireDateColor(dateString: string | Date) {
	const now = new Date()
	const date = new Date(dateString)
	const diff = date.setHours(0, 0, 0, 0) - now.setHours(0, 0, 0, 0)
	const oneDay = 24 * 60 * 60 * 1000

	if (diff < 0) {
		return '#ef4444'
	}
	if (diff === 0) {
		return '#6366f1'
	}
	if (diff === oneDay) {
		return '#cc8754'
	}

	return '#6b7280'
}
