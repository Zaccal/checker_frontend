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
import { signIn } from '@/lib/auth'
import {
	otpCodeFormSchema,
	otpCodeFormSchemaType,
} from '@/lib/schemas/otpCodeForm.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const page = () => {
	const form = useForm({
		resolver: zodResolver(otpCodeFormSchema),
		defaultValues: {
			code: '',
		},
	})
	const searchParams = useSearchParams()
	const email = searchParams.get('email')
	const router = useRouter()

	const handleSubmit = async ({ code }: otpCodeFormSchemaType) => {
		if (email) {
			await signIn.emailOtp(
				{
					email,
					otp: code,
				},
				{
					onSuccess: () => {
						router.push('/dashboard')
						toast.success('Welcome!', {
							description:
								'You have successfully signed in with your OTP code.',
						})
					},
					onError: error => {
						console.log(error)

						toast.error('Something went wrong', {
							description:
								error instanceof Error
									? error.message
									: 'An unexpected error occurred while verifying your OTP code. Please try again.',
						})
					},
				}
			)
		} else {
			toast.error(
				'Email is missing from the URL. Please try again or request a new OTP link.'
			)
			router.back()
		}
	}

	const { isSubmitting } = form.formState

	return (
		<div className="w-full h-screen flex items-center justify-center">
			<div className="">
				<Form {...form}>
					<form
						className="space-y-5"
						onSubmit={form.handleSubmit(handleSubmit)}
					>
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
										Please enter the one-time password sent to your email.
									</FormDescription>
								</FormItem>
							)}
						/>
						<Button disabled={isSubmitting} type="submit">
							Submit
						</Button>
					</form>
				</Form>
			</div>
		</div>
	)
}

export default page
