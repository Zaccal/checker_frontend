'use server'

import { cookies } from 'next/headers'

export async function fetchWithCookies(input: RequestInfo, init?: RequestInit) {
	const cookie = (await cookies()).toString()
	return fetch(input, {
		...init,
		headers: {
			...init?.headers,
			Cookie: cookie,
		},
	})
}
