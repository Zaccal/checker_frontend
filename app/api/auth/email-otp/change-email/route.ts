import { fetchAlias } from '@/lib/actions'

export async function POST(req: Request) {
  const body = (await req.json()) as { newEmail: string; oldEmail: string }

  const response = await fetchAlias('/auth-custom/email-otp/change-email', {
    method: 'POST',
    body: JSON.stringify(body),
  })

  return response.data
}
