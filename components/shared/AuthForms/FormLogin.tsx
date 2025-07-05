'use client'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signIn } from '@/lib/auth'
import { VERIFICATION_AUTH_CODE } from '@/lib/constants/constants'
import { isEmail } from '@/lib/isEmail'
import { logInSchema, TypeLoginSchema } from '@/lib/schemas/logIn.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const FormLogin = () => {
	const form = useForm<TypeLoginSchema>({
		resolver: zodResolver(logInSchema),
		defaultValues: {
			emailOrUsername: '',
			password: '',
		},
	})
	const router = useRouter()
	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

	const { isSubmitting } = form.formState
	const emailOrUsernameInput = form.watch('emailOrUsername')

	async function onSubmit({ emailOrUsername, password }: TypeLoginSchema) {
		if (!isEmail(emailOrUsername) && password) {
			await signIn.username(
				{
					username: emailOrUsername,
					password,
				},
				{
					onSuccess() {
						router.push(callbackUrl)
						toast.success('Welcome back!')
					},
					onError: ({ error }) => {
						if (error.code === VERIFICATION_AUTH_CODE) {
							toast.info('Email not verified', {
								description: 'You have to use a email for log in.',
							})
						} else {
							toast.error('Opss, somthing wrong, try again', {
								description: error.error.message || 'Somthing is wrong',
							})
						}
					},
				}
			)
		} else {
			await signIn.magicLink(
				{
					email: emailOrUsername,
					callbackURL: `${window.location.origin}${callbackUrl}`,
				},
				{
					onSuccess: () => {
						toast.success('Magic link sent', {
							description: 'Check your email for a login link.',
						})
						form.reset()
					},
					onError: ({ error }) => {
						toast.error('Failed to send magic link', {
							description:
								error.message || 'There was a problem sending the magic link',
						})
					},
				}
			)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<h1 className="text-center font-bold text-2xl">Welcome back! ✌️</h1>
				<p className="text-center text-muted-foreground mt-2">
					Enter your email and password to log in to your account.
				</p>

				<div className="mt-6 space-y-4">
					<FormField
						control={form.control}
						name="emailOrUsername"
						render={({ field }) => (
							<FormItem>
								<FormMessage />
								<FormControl>
									<Input
										disabled={isSubmitting}
										{...field}
										placeholder="Username or email"
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					{!isEmail(emailOrUsernameInput) && (
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormMessage />
									<FormControl>
										<Input
											disabled={isSubmitting}
											{...field}
											type="password"
											placeholder="Password"
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					)}
					<Button
						disabled={isSubmitting}
						type="submit"
						className="w-full font-bold"
					>
						Log in
					</Button>
				</div>
			</form>
		</Form>
	)
}

export default FormLogin
