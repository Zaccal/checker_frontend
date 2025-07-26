import ForgotPasswordFormFields from '@/components/shared/AuthForms/ForgotPasswordFormFields'
import { RotateCcwKey } from 'lucide-react'

const page = () => {
	return (
		<div className="container px-4 h-screen flex items-center justify-center">
			<div className="max-w-md">
				<div className="flex flex-col items-center gap-5">
					<div className="p-2 w-fit border border-border rounded-lg">
						<RotateCcwKey />
					</div>
					<div className="text-center space-y-3">
						<h1 className="text-2xl font-bold">Forgot your password?</h1>
						<p className="text-muted-foreground">
							We’ll send you a link to your email address to reset your
							password.
						</p>
					</div>
				</div>
				<ForgotPasswordFormFields />
			</div>
		</div>
	)
}

export default page
