import { useState, useEffect, useCallback, useRef } from 'react'

export function useStateLocalStorage<T>(
	key: string,
	initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
	const [storedValue, setStoredValue] = useState<T>(() => {
		if (typeof window === 'undefined') {
			return initialValue
		}

		try {
			const item = window.localStorage.getItem(key)
			return item ? JSON.parse(item) : initialValue
		} catch (error) {
			console.error(`Error reading localStorage key "${key}":`, error)
			return initialValue
		}
	})

	const valueRef = useRef(storedValue)
	valueRef.current = storedValue

	const setValue = useCallback(
		(value: T | ((prev: T) => T)) => {
			try {
				const valueToStore =
					value instanceof Function ? value(valueRef.current) : value

				setStoredValue(valueToStore)

				if (typeof window !== 'undefined') {
					window.localStorage.setItem(key, JSON.stringify(valueToStore))
				}
			} catch (error) {
				console.error(`Error setting localStorage key "${key}":`, error)
			}
		},
		[key]
	)

	useEffect(() => {
		if (typeof window === 'undefined') {
			return
		}

		const handleStorageChange = (e: StorageEvent) => {
			if (e.key === key && e.newValue !== null) {
				try {
					setStoredValue(JSON.parse(e.newValue))
				} catch (error) {
					console.error(
						`Error parsing localStorage value for key "${key}":`,
						error
					)
				}
			}
		}

		window.addEventListener('storage', handleStorageChange)
		return () => window.removeEventListener('storage', handleStorageChange)
	}, [key])

	return [storedValue, setValue]
}
