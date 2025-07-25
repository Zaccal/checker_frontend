'use client'

import { useForm } from 'react-hook-form'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import {
	resetPasswordSchema,
	type ResetPasswordSchema,
} from '@/lib/schemas/resetPassword.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { resetPassword } from '@/lib/auth'
import { useRouter } from 'next/navigation'

const ResetPasswordFormFields = () => {
	const form = useForm<ResetPasswordSchema>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			comfirmPassword: '',
			password: '',
		},
	})
	const { isSubmitting } = form.formState
	const router = useRouter()
	const params = useSearchParams()
	const token = params.get('token')
	const error = params.get('error')

	const submitHandler = async ({
		password: newPassword,
	}: ResetPasswordSchema) => {
		if (!token) {
			toast.error('Invalid or expired reset link', {
				description:
					error ??
					'The password reset link is invalid or has expired. Please request a new password reset email.',
			})
		} else {
			await resetPassword(
				{
					newPassword,
					token,
				},
				{
					onSuccess: () => {
						form.reset()
						toast.success('Password has changed successfully!')
						router.push('/login')
					},
					onError: ({ error }) => {
						toast.error('Something went wrong!', {
							description: error.message,
						})
					},
				}
			)
		}
	}

	return (
		<div className="mt-7">
			<Form {...form}>
				<form className="space-y-4" onSubmit={form.handleSubmit(submitHandler)}>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormMessage />
								<FormControl>
									<Input
										type="password"
										placeholder="Enter a new password"
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="comfirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Comfirm password</FormLabel>
								<FormMessage />
								<FormControl>
									<Input
										{...field}
										type="password"
										placeholder="Comfirm new password"
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<Button
						disabled={isSubmitting}
						type="submit"
						className="font-semibold w-full mt-4"
					>
						Reset password
					</Button>
				</form>
			</Form>
		</div>
	)
}

export default ResetPasswordFormFields
