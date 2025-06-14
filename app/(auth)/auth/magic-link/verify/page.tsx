'use client'

import { SvgSpinners180RingWithBg } from '@/components/shared/Common/SvgSpinners180RingWithBg'
import { magicLink } from '@/lib/auth'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

const page = () => {
	const searchParams = useSearchParams()
	const router = useRouter()

	const token = searchParams.get('token')
	const callbackUrl = searchParams.get('callbackURL')

	useEffect(() => {
		const verifyHandler = async () => {
			const { error } = await magicLink.verify({
				query: {
					token: token!,
					callbackURL: callbackUrl!,
				},
			})

			if (error) {
				router.push('/')
				toast.error('Something went wrong, try again', {
					description:
						error.message ||
						'Please try again or contact support if the problem',
				})
			}
		}

		verifyHandler()
	})

	return (
		<div className="w-full h-screen flex items-center justify-center">
			<div className="flex items-center  flex-col">
				<SvgSpinners180RingWithBg className="text-2xl mb-2" />
				<h1>Loading...</h1>
				<p className="text-muted-foreground text-sm">please wait...</p>
			</div>
		</div>
	)
}

export default page
