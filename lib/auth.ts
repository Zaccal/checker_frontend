import { createAuthClient } from 'better-auth/client'
import { magicLinkClient } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
	baseURL: process.env.NEXT_PUBLIC_API_URL + '/auth',
	plugins: [magicLinkClient()],
})

export const { signIn, signUp, signOut, useSession } = authClient
