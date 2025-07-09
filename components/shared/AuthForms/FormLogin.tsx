'use client'

import { Form } from '@/components/ui/form'
import { logInSchema, type TypeLoginSchema } from '@/lib/schemas/logIn.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useLoginSubmit } from '@/hooks/use-login-submit'
import LoginFormHeader from './LoginFormHeader'
import LoginFormFields from './LoginFormFields'

const FormLogin = () => {
	const form = useForm<TypeLoginSchema>({
		resolver: zodResolver(logInSchema),
		defaultValues: {
			emailOrUsername: '',
			password: '',
		},
	})

	const { handleSubmit } = useLoginSubmit()

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<LoginFormHeader />
				<LoginFormFields form={form} />
			</form>
		</Form>
	)
}

export default FormLogin
