export function isEmail(str: string): boolean {
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return emailPattern.test(str)
}
