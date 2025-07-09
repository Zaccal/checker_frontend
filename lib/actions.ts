'use server'

import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

export async function fetchWithCookies(input: RequestInfo, init?: RequestInit) {
	const cookie = (await cookies()).toString()
	const apiUrl = process.env.NEXT_PUBLIC_API_URL

	if (!apiUrl) throw new Error('API URL is not defined')

	const urlPath = typeof input === 'string' ? input : input.url

	return fetch(`${apiUrl}${urlPath}`, {
		...(init ?? {}),
		headers: {
			...(init?.headers ?? {}),
			Cookie: cookie,
		},
	})
}

// @typescript-eslint/no-misused-spread
export async function revalidateLists() {
	// @typescript-eslint/require-await
	revalidateTag('lists')
}
