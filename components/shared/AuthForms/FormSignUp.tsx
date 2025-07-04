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
import { authClient, signUp } from '@/lib/auth'
import { useState } from 'react'
import {
	getPasswordStrength,
	getPasswordStrengthColor,
} from '@/lib/getPasswordStrength'
import { TriangleAlert } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
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
	const searchParams = useSearchParams()
	const router = useRouter()
	const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

	async function onSubmit({ email, password, username }: TypeSingUpSchema) {
		await signUp.email(
			{
				email,
				password,
				name: username,
			},
			{
				onSuccess: () => {
					router.push(callbackUrl)
					toast.success('Welcome!', {
						description: 'You have successfully signed up.',
						position: 'top-center',
					})
				},
				onError: ({ error }) => {
					toast.error('Something went wrong, try again', {
						description: error.message,
						position: 'top-center',
					})
				},
			}
		)
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
										{...field}
										disabled={isSubmitting}
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
										{...field}
										disabled={isSubmitting}
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
										onChange={event => {
											field.onChange(event)
											setPasswordStrength(
												getPasswordStrength(event.target.value)
											)
										}}
										placeholder="Password"
										type="password"
										disabled={isSubmitting}
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
										placeholder="Comfirm password"
										disabled={isSubmitting}
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
