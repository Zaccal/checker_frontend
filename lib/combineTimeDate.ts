export function combineTimeDate(date?: Date, time?: string) {
	if ((!date && !time) || time === '00:00') return undefined

	const settingDate = date ? new Date(date) : new Date()
	const settingTime = time ? time : '00:00'

	const current = new Date(settingDate)
	const [hours, minutes] = settingTime.split(':').map(Number) as [
		number,
		number
	]

	current.setHours(hours, minutes)
	return current.toISOString()
}
