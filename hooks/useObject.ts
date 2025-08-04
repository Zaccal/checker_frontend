import { useState } from 'react'

export function useObject<T>(data: T) {
	const [object, setObject] = useState<T>(data)

	const set = <K extends keyof T>(key: K, value: T[K]) => {
		setObject(prev => ({ ...prev, [key]: value }))
	}

	const get = (key: keyof T) => {
		return object[key]
	}

	const reset = () => {
		setObject(data)
	}

	return { object, set, get, reset }
}
