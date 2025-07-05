'use client'

import { useOtpTimer } from '@/hooks/use-otp-timer'
import OtpForm from '@/components/shared/AuthForms/OtpForm'
import { useOtpVerifySubmit } from '@/hooks/use-otp-verify-submit'

const page = () => {
	const { isRunTimer, timeLeft, startTimer, resetTimer } = useOtpTimer(120)
	const { handleSubmit } = useOtpVerifySubmit({
		callback: startTimer,
		onSuccess: () => {
			resetTimer()
		},
	})

	return (
		<div className="w-full h-screen flex items-center justify-center">
			<div className="">
				<OtpForm
					onSubmit={handleSubmit}
					isRunTimer={isRunTimer}
					timeLeft={timeLeft}
				/>
			</div>
		</div>
	)
}

export default page
