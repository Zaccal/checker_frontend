import { signIn } from '@/lib/auth'
import { otpCodeFormSchemaType } from '@/lib/schemas/otpCodeForm.schema'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

interface UseOtpVerifySubmitParams {
	callback?: () => void
	onSuccess?: () => void
}

export const useOtpVerifySubmit = ({
	callback,
	onSuccess,
}: UseOtpVerifySubmitParams) => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const email = searchParams.get('email')

	const handleSubmit = async ({ code }: otpCodeFormSchemaType) => {
		if (email) {
			callback?.()
			await signIn.emailOtp(
				{
					email,
					otp: code,
				},
				{
					onSuccess: () => {
						onSuccess?.()
						router.push('/dashboard')
						toast.success('Welcome back!', {
							description: "You're logged in now",
						})
					},
					onError: ({ error }) => {
						toast.error('Something went wrong', {
							description: error.message || 'Invalid OTP',
						})
					},
					redirect: 'manual',
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
