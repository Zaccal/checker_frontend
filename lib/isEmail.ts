export function isEmail(str: string): boolean {
	const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i
	return emailPattern.test(str)
}
