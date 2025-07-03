'use client'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signUpSchema, TypeSingUpSchema } from '@/lib/schemas/signUp.schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { emailOtp, signUp } from '@/lib/auth'
import { useState } from 'react'
import {
	getPasswordStrength,
	getPasswordStrengthColor,
} from '@/lib/getPasswordStrength'
import { TriangleAlert } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const FormSignUp = () => {
	const [passwordStrength, setPasswordStrength] = useState('')
	const form = useForm<TypeSingUpSchema>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			confirmPassword: '',
			email: '',
			password: '',
		},
	})
	const { isSubmitting } = form.formState
	const router = useRouter()

	async function onSubmit({ email, password, username }: TypeSingUpSchema) {
		const { error } = await signUp.email(
			{
				email,
				password,
				name: username,
				username: username,
			},
			{
				onError: ({ error }) => {
					toast.error('Something went wrong, try again', {
						description: error.message,
					})
				},
			}
		)

		if (!error) {
			await emailOtp.sendVerificationOtp({ email, type: 'sign-in' })
			router.push(`auth/otp-code/verify?email=${encodeURIComponent(email)}`)
			toast.success('OTP code sent', {
				description: 'We have sent a verification code to your email.',
			})
		}
	}

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<h1 className="text-center font-bold text-2xl">Create an account</h1>
					<p className="text-center text-muted-foreground mt-2">
						Enter your email below to create your account
					</p>
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormMessage />
								<FormControl>
									<Input
										disabled={isSubmitting}
										{...field}
										placeholder="Username"
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormMessage />
								<FormControl>
									<Input
										disabled={isSubmitting}
										{...field}
										placeholder="name@example.com"
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormMessage />
								<FormControl>
									<Input
										{...field}
										disabled={isSubmitting}
										onChange={event => {
											field.onChange(event)
											setPasswordStrength(
												getPasswordStrength(event.target.value)
											)
										}}
										placeholder="Password"
										type="password"
									/>
								</FormControl>
								{field.value && (
									<FormDescription>
										<span
											className={cn(
												'flex items-center gap-1',
												getPasswordStrengthColor(passwordStrength)
											)}
										>
											{passwordStrength !== 'Hard' && (
												<TriangleAlert className="size-4" />
											)}
											Password strength: {passwordStrength}
										</span>
									</FormDescription>
								)}
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormMessage />
								<FormControl>
									<Input
										{...field}
										disabled={isSubmitting}
										placeholder="Comfirm password"
										type="password"
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<Button
						disabled={isSubmitting}
						type="submit"
						className="w-full font-bold"
					>
						Create account
					</Button>
				</form>
			</Form>
		</>
	)
}

export default FormSignUp
