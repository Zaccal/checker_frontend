import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { useSendOtpCode } from './use-send-otp-code'

const useChangeEmailOtp = (onSuccess?: () => void | Promise<void>) => {
	const search = useSearchParams()
	const router = useRouter()
	const { sendOtpCode } = useSendOtpCode(onSuccess)

	const changeEmailOtpHadnler = async (email: string) => {
		const response = await fetch('/api/auth/email-otp/change-email', {
			method: 'POST',
			body: JSON.stringify({
				oldEmail: search.get('email'),
				newEmail: email,
			}),
		})

		if (response.ok) {
			toast.success('We have changed email', {
				description: 'we sent an OTP code',
			})

			router.replace(`?email=${encodeURIComponent(email)}`)
			await sendOtpCode(email)
		} else {
			const errorMessage = await response.text()
			toast.error('Something went wrong', {
				description: errorMessage,
			})
		}
	}

	return { changeEmailOtpHadnler }
}

export default useChangeEmailOtp
