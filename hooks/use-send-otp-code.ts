import { emailOtp } from '@/lib/auth'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

export const useSendOtpCode = (
	pushVerifyPage: boolean = true,
	callBack?: () => void
) => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const emailParam = searchParams.get('email')

	const sendOtpCode = async (emailProps?: string) => {
		callBack?.()
		const email = emailParam ?? emailProps ?? ''
		if (email) {
			await emailOtp.sendVerificationOtp(
				{ email, type: 'sign-in' },
				{
					onSuccess: () => {
						if (pushVerifyPage) {
							router.push(
								`auth/otp-code/verify?email=${encodeURIComponent(email)}`
							)
							toast.success('OTP code sent', {
								description: 'We have sent a verification code to your email.',
							})
						}
					},
				}
			)
		} else {
			toast.error('Email is missing', {
				description: 'Email is missing from the URL',
			})
		}
	}

	return { sendOtpCode }
}
