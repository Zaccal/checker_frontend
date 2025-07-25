'use client'

import {
	forgotPasswordSchema,
	type ForgotPasswordSchema,
} from '@/lib/schemas/forgotPassword.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const ForgotPasswordFormFields = () => {
	const form = useForm<ForgotPasswordSchema>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: '',
		},
	})
	const { isSubmitting } = form.formState

	const submitHandler = () => {
		console.log(true)
	}

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(submitHandler)} className="mt-7">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email address</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Enter your email"
										type="email"
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<div className="mt-8 space-y-3 flex flex-col items-center">
						<Button
							disabled={isSubmitting}
							type="submit"
							className="font-semibold w-full"
						>
							Reset password
						</Button>
						<Button
							disabled={isSubmitting}
							type="button"
							asChild
							variant="link"
						>
							<Link href="/login">
								<ArrowLeft /> Back to login
							</Link>
						</Button>
					</div>
				</form>
			</Form>
		</>
	)
}

export default ForgotPasswordFormFields
