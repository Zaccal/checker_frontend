import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useBoolean } from '@/hooks'
import useChangeEmailOtp from '@/hooks/use-change-email-otp'
import {
	forgotPasswordSchema,
	type ForgotPasswordSchema,
} from '@/lib/schemas/forgotPassword.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pencil } from 'lucide-react'
import { useForm } from 'react-hook-form'

interface ChangeEmailOtpFormProps {
	email: string | null
}

const ChangeEmailOtpForm = ({ email }: ChangeEmailOtpFormProps) => {
	const form = useForm<ForgotPasswordSchema>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: '',
		},
	})
	const [open, toggle] = useBoolean()
	const { changeEmailOtpHadnler } = useChangeEmailOtp(() => {
		toggle()
		form.reset()
	})

	const submitHandler = async ({ email: newEmail }: ForgotPasswordSchema) => {
		await changeEmailOtpHadnler(newEmail)
	}

	return (
		<Dialog open={open} onOpenChange={toggle}>
			<Form {...form}>
				<DialogTrigger asChild>
					<Button type="button" variant={'link'}>
						{email}
						<Pencil />
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader className="text-left">
						<DialogTitle>Edit email</DialogTitle>
						<DialogDescription>
							Edit your email if it&apos;s incorrect.
						</DialogDescription>
					</DialogHeader>
					<form
						className="space-y-4"
						onSubmit={form.handleSubmit(submitHandler)}
					>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormMessage />
									<FormControl>
										<Input
											{...field}
											type="email"
											placeholder="Enter your correct email"
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-full">
							Change email
						</Button>
					</form>
				</DialogContent>
			</Form>
		</Dialog>
	)
}

export default ChangeEmailOtpForm
