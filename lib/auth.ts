import { createAuthClient } from 'better-auth/react'
import { magicLinkClient, usernameClient } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
	baseURL: process.env.NEXT_PUBLIC_API_URL + '/auth',
	plugins: [magicLinkClient(), usernameClient()],
})

export const { signIn, signUp, signOut, magicLink, useSession } = authClient
