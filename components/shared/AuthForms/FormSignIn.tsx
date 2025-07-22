'use client'

import { Form } from '@/components/ui/form'
import { signInSchema, type SignInSchema } from '@/lib/schemas/signIn.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useLoginSubmit } from '@/hooks/use-login-submit'
import SignInFormFields from './SignInFormFields'
import SignInFormHeader from './SignInFormHeader'

const FormSignIn = () => {
	const form = useForm<SignInSchema>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			emailOrUsername: '',
			password: '',
			rememberMe: false,
		},
	})

	const { handleSubmit } = useLoginSubmit()

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<SignInFormHeader />
				<SignInFormFields form={form} />
			</form>
		</Form>
	)
}

export default FormSignIn
