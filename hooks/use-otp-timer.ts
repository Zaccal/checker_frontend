import { useEffect } from 'react'
import { useStateLocalStorage } from './use-state-localstorage'

export const useOtpTimer = (initialTime: number = 120) => {
	const [isRunTimer, setIsRunTimer] = useStateLocalStorage('isRunTimer', true)
	const [timeLeft, setTimeLeft] = useStateLocalStorage('timeLeft', initialTime)

	useEffect(() => {
		let timeout: NodeJS.Timeout | undefined

		if (isRunTimer) {
			timeout = setInterval(() => {
				setTimeLeft(prev => {
					if (prev <= 1) {
						setIsRunTimer(false)
						return initialTime
					}
					return prev - 1
				})
			}, 1000)
		}

		return () => {
			if (timeout) {
				clearInterval(timeout)
			}
		}
	}, [isRunTimer, initialTime])

	const startTimer = () => {
		if (!isRunTimer) {
			setIsRunTimer(true)
			setTimeLeft(initialTime)
		}
	}

	const resetTimer = () => {
		setIsRunTimer(false)
		setTimeLeft(initialTime)
	}

	return {
		isRunTimer,
		timeLeft,
		startTimer,
		resetTimer,
	}
}
