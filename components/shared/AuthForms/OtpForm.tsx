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
import { formatSecondsToMinutes } from '@/lib/formatSecondsToMinute'
import {
	otpCodeFormSchema,
	otpCodeFormSchemaType,
} from '@/lib/schemas/otpCodeForm.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

interface OtpFormProps {
	onSubmit: (data: otpCodeFormSchemaType) => Promise<void>
	isSubmitting?: boolean
	isRunTimer?: boolean
	timeLeft?: number
}

const OtpForm = ({
	onSubmit,
	isSubmitting = false,
	isRunTimer = false,
	timeLeft = 0,
}: OtpFormProps) => {
	const form = useForm({
		resolver: zodResolver(otpCodeFormSchema),
		defaultValues: {
			code: '',
		},
	})

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
				<Button disabled={isSubmitting || isRunTimer} type="submit">
					Submit
				</Button>
			</form>
		</Form>
	)
}

export default OtpForm
