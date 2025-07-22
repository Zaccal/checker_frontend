'use client'

import { Button } from '@/components/ui/button'
import Github from '../Common/Github'
import FormFooter from './ui/FormFooter'
import { signIn } from '@/lib/auth'
import { toast } from 'sonner'
import { useState } from 'react'

const FormSocial = () => {
	const [isLoading, setIsLoading] = useState(false)

	const handleGithubSign = async () => {
		setIsLoading(true)
		await signIn.social(
			{
				provider: 'github',
				callbackURL: `${window.location.origin}/dashboard`,
			},
			{
				onError: ({ error }) => {
					toast.error('Github sign in failed', {
						description: error.message,
					})
				},
				onResponse: () => {
					setIsLoading(false)
				},
			}
		)
	}

	return (
		<div>
			<Button
				onClick={handleGithubSign}
				disabled={isLoading}
				variant={'outline'}
				className="w-full font-bold "
			>
				<Github size={28} /> Github
			</Button>

			<FormFooter />
		</div>
	)
}

export default FormSocial
