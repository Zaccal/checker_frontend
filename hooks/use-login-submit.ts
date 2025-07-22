import { signIn } from '@/lib/auth'
import { VERIFICATION_AUTH_CODE } from '@/lib/constants/constants'
import { isEmail } from '@/lib/isEmail'
import { TypeLoginSchema } from '@/lib/schemas/logIn.schema'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

export const useLoginSubmit = () => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

	const handleSubmit = async ({
		emailOrUsername,
		password,
	}: TypeLoginSchema) => {
		if (!isEmail(emailOrUsername) && password) {
			await signIn.username(
				{
					username: emailOrUsername,
					password,
				},
				{
					onSuccess: () => {
						router.push(callbackUrl)
						toast.success('Welcome back!')
					},
					onError: ({ error }) => {
						if (error.code === VERIFICATION_AUTH_CODE) {
							toast.info('Email not verified', {
								description: 'You have to use a email for log in.',
							})
						} else {
							toast.error('Opss, somthing wrong, try again', {
								description: error.message || 'Somthing is wrong',
							})
						}
					},
				}
			)
		} else {
			await signIn.magicLink(
				{
					email: emailOrUsername,
					callbackURL: `${window.location.origin}${callbackUrl}`,
				},
				{
					onSuccess: () => {
						toast.success('Magic link sent', {
							description: 'Check your email for a login link.',
						})
					},
					onError: ({ error }) => {
						toast.error('Failed to send magic link', {
							description:
								error.message || 'There was a problem sending the magic link',
						})
					},
				}
			)
		}
	}

	return {
		handleSubmit,
	}
}
