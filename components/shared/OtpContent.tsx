'use client'

import { useOtpTimer } from '@/hooks/use-otp-timer'
import { useOtpVerify } from '@/hooks/use-otp-verify'
import OtpForm from '@/components/shared/AuthForms/OtpForm'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { otpCodeFormSchema } from '@/lib/schemas/otpCodeForm.schema'

const OtpContent = () => {
	const { isRunTimer, resetTimer, startTimer, timeLeft } = useOtpTimer()
	const { handleSubmit } = useOtpVerify({
		onSuccess: () => {
			resetTimer()
		},
	})
	const form = useForm({
		resolver: zodResolver(otpCodeFormSchema),
		defaultValues: {
			code: '',
		},
	})

	return (
		<div className="w-full h-screen flex items-center justify-center">
			<div className="">
				<OtpForm
					form={form}
					startTimer={startTimer}
					isRunTimer={isRunTimer}
					timeLeft={timeLeft}
					onSubmit={handleSubmit}
				/>
			</div>
		</div>
	)
}

export default OtpContent
