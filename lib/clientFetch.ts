export async function clientFetchJSON<T>(
  path: string,
  init?: RequestInit,
  body?: unknown,
): Promise<T> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) throw new Error('API URL is not defined')

  const res = await fetch(`${apiUrl}${path}`, {
    ...(init ?? {}),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Request failed: ${res.status} - ${text}`)
  }

  return (await res.json()) as T
}
