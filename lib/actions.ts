'use server'

import { TodoList } from 'checker_shared'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { Mutate } from './types/API.type'

export async function mutateList<T = TodoList>(
	data: unknown,
	method: Mutate,
	id?: string
): Promise<T> {
	const url = `/lists${id ? `/${id}` : ''}`

	const response = await fetchWithCookies(
		url,
		{
			method: method,
		},
		data
	)

	if (!response.ok) {
		const errorText = await response.text()
		throw new Error(`Request failed: ${response.status} - ${errorText}`)
	}

	const responseData: T = await response.json()

	revalidateTag('lists')
	return responseData
}

export async function fetchWithCookies(
	input: RequestInfo,
	init?: RequestInit,
	data?: unknown
) {
	const cookie = (await cookies()).toString()
	const apiUrl = process.env.NEXT_PUBLIC_API_URL

	if (!apiUrl) throw new Error('API URL is not defined')

	const urlPath = typeof input === 'string' ? input : input.url

	const response = await fetch(`${apiUrl}${urlPath}`, {
		...(init ?? {}),
		headers: {
			...(init?.headers ?? {}),
			Cookie: cookie,
			'Content-Type': 'application/json',
		},
		body: data ? JSON.stringify(data) : undefined,
	})

	return response
}
