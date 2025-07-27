'use client'

import { Button } from '@/components/ui/button'
import Github from '../Common/Github'
import FormFooter from './ui/FormFooter'
import { signIn } from '@/lib/auth'
import { toast } from 'sonner'
import { useState } from 'react'
import Image from 'next/image'

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

	const handleGoogleSign = async () => {
		setIsLoading(true)
		await signIn.social(
			{
				provider: 'google',
				callbackURL: `${window.location.origin}/dashboard`,
			},
			{
				onError: ({ error }) => {
					toast.error('Google sign in failed', {
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
		<div className="space-y-4">
			<Button
				onClick={handleGoogleSign}
				disabled={isLoading}
				variant={'outline'}
				className="w-full font-bold"
			>
				<Image src={'/google.png'} alt="Google" width={16} height={16} />
				Google
			</Button>

			<Button
				onClick={handleGithubSign}
				disabled={isLoading}
				variant={'outline'}
				className="w-full font-bold "
			>
				<Github size={24} /> Github
			</Button>

			<FormFooter />
		</div>
	)
}

export default FormSocial
