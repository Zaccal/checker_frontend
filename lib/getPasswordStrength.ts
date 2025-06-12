export function getPasswordStrength(password: string) {
	let score = 0
	if (password.length >= 8) score++
	if (/[A-Z]/.test(password)) score++
	if (/[a-z]/.test(password)) score++
	if (/[0-9]/.test(password)) score++
	if (/[^A-Za-z0-9]/.test(password)) score++

	if (score <= 2) return 'Easy'
	if (score === 3 || score === 4) return 'Medium'
	if (score === 5) return 'Hard'
	return ''
}

export function getPasswordStrengthColor(password: string) {
	switch (password) {
		case 'Easy':
			return 'text-destructive'
		case 'Medium':
			return 'text-yellow-500'
		default:
			return 'text-green-600'
	}
}
