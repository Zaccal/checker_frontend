'use client'

import { Button } from '@/components/ui/button'
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { isEmail } from '@/lib/isEmail'
import type { UseFormReturn } from 'react-hook-form'
import { type TypeLoginSchema } from '@/lib/schemas/logIn.schema'

interface LoginFormFieldsProps {
	form: UseFormReturn<TypeLoginSchema>
}

const SignInFormFields = ({ form }: LoginFormFieldsProps) => {
	const { isSubmitting } = form.formState
	const emailOrUsernameInput = form.watch('emailOrUsername')

	return (
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
	)
}

export default SignInFormFields
