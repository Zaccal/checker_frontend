import { signIn } from '@/lib/auth'
import { otpCodeFormSchemaType } from '@/lib/schemas/otpCodeForm.schema'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

interface UseOtpVerifyParams {
	onSuccess?: () => void
}

export const useOtpVerify = ({ onSuccess }: UseOtpVerifyParams) => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const email = searchParams.get('email')

	const handleSubmit = async ({ code }: otpCodeFormSchemaType) => {
		if (email) {
			await signIn.emailOtp(
				{
					email,
					otp: code,
				},
				{
					onSuccess: () => {
						onSuccess?.()
						router.push('/dashboard')
						toast.success('Welcome!', {
							description: "You're logged in now",
						})
					},
					onError: ({ error }) => {
						toast.error('Something went wrong', {
							description: error.message || 'Invalid OTP',
						})
					},
				}
			)
		} else {
			toast.error('Email is missing', {
				description: 'Email is missing from the URL',
			})
		}
	}

	return {
		handleSubmit,
	}
}
