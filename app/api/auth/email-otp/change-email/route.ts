export async function POST(req: Request) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  if (!apiUrl) {
    return new Response(JSON.stringify({ title: 'API URL is not defined' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const body = (await req.json()) as { newEmail: string; oldEmail: string }

  const response = await fetch(`${apiUrl}/auth-custom/email-otp/change-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  return response
}
