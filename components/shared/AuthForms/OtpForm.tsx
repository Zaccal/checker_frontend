'use client'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '@/components/ui/input-otp'
import { useSendOtpCode } from '@/hooks/use-send-otp-code'
import { formatSecondsToMinutes } from '@/lib/formatSecondsToMinute'
import { type otpCodeFormSchemaType } from '@/lib/schemas/otpCodeForm.schema'
import { type OtpFormComponent } from '@/lib/types/otpform.type'

interface OtpFormProps {
	onSubmit: (data: otpCodeFormSchemaType) => Promise<void>
	isRunTimer?: boolean
	timeLeft?: number
	startTimer?: () => void
	form: OtpFormComponent
}

const OtpForm = ({
	onSubmit,
	isRunTimer = false,
	startTimer,
	timeLeft = 0,
	form,
}: OtpFormProps) => {
	const { sendOtpCode } = useSendOtpCode(false, startTimer)
	const { isSubmitting } = form.formState

	return (
		<Form {...form}>
			<form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="code"
					render={({ field }) => (
						<FormItem>
							<FormLabel>One-Time Password</FormLabel>
							<FormMessage />
							<FormControl>
								<InputOTP disabled={isSubmitting} maxLength={6} {...field}>
									<InputOTPGroup>
										<InputOTPSlot index={0} />
										<InputOTPSlot index={1} />
										<InputOTPSlot index={2} />
									</InputOTPGroup>
									<InputOTPSeparator />
									<InputOTPGroup>
										<InputOTPSlot index={3} />
										<InputOTPSlot index={4} />
										<InputOTPSlot index={5} />
									</InputOTPGroup>
								</InputOTP>
							</FormControl>
							<FormDescription>
								{isRunTimer
									? `Please wait for ${formatSecondsToMinutes(
											timeLeft
									  )} before submitting again.`
									: 'Please enter the one-time password sent to your email.'}
							</FormDescription>
						</FormItem>
					)}
				/>
				<div className="space-x-2">
					<Button disabled={isSubmitting} type="submit">
						Verify
					</Button>
					<Button
						type="button"
						disabled={isRunTimer || isSubmitting}
						onClick={() => sendOtpCode()}
						variant={'link'}
					>
						Send again
					</Button>
				</div>
			</form>
		</Form>
	)
}

export default OtpForm
