'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { magicLink } from '@/lib/auth'
import SvgSpinnersBlocksShuffle30 from './Common/SvgSpinnersBlocksShuffle30'

const MagicLinkContent = () => {
	const searchParams = useSearchParams()
	const router = useRouter()

	const token = searchParams.get('token')
	const callbackUrl = searchParams.get('callbackURL')

	useEffect(() => {
		if (!token || !callbackUrl) {
			router.push('/')
			toast.error('Invalid or missing magic link parameters.')
			return
		}

		const verifyHandler = async () => {
			const { error } = await magicLink.verify({
				query: {
					token: token,
					callbackURL: callbackUrl,
				},
			})

			if (error) {
				router.push('/')
				toast.error('Something went wrong, try again', {
					description:
						error.message ??
						'Please try again or contact support if the problem',
				})
			}
		}

		void verifyHandler()
	}, [token, callbackUrl, router])

	return (
		<div className="w-full h-screen flex items-center justify-center">
			<div className="flex flex-col items-center justify-center">
				<SvgSpinnersBlocksShuffle30 className="w-8 h-8 mb-2 text-primary" />
				<p className="text-sm text-muted-foreground">Verifying...</p>
			</div>
		</div>
	)
}

export default MagicLinkContent
