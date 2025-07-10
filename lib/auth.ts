import { createAuthClient } from 'better-auth/react'
import {
	emailOTPClient,
	magicLinkClient,
	usernameClient,
} from 'better-auth/client/plugins'

export const authClient = createAuthClient({
	baseURL: `${process.env.NEXT_PUBLIC_API_URL ?? ''}/auth`,
	plugins: [magicLinkClient(), usernameClient(), emailOTPClient()],
})

export const { signIn, signUp, signOut, magicLink, useSession, emailOtp } =
	authClient
