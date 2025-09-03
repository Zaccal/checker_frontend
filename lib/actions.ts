'use server'

import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

interface FetchAliasReturn<T> {
  status: number
  ok: boolean
  data: T
}

export async function fetchAlias<T>(
  url: string,
  init?: RequestInit,
): Promise<FetchAliasReturn<T>> {
  const cookieHeader = (await cookies()).toString()
  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  if (!baseUrl) {
    throw new Error('Base URL not found')
  }

  const response = await fetch(`${baseUrl}/${url}`, {
    headers: {
      Cookie: cookieHeader,
      'Content-Type': 'application/json',
    },
    ...init,
  })
  const data = await response.json()

  return {
    status: response.status,
    ok: response.ok,
    data: data as T,
  }
}

export async function invalidateTag(tag: string) {
  revalidateTag(tag)
}
