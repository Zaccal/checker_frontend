import { fetchAlias } from '@/lib/actions'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = (await req.json()) as { newEmail: string; oldEmail: string }

  const response = await fetchAlias('/auth-custom/email-otp/change-email', {
    method: 'POST',
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    return NextResponse.json(response.error, { status: response.status })
  }

  return NextResponse.json(response.data)
}
