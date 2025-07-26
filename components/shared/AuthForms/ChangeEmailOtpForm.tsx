import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'

interface ChangeEmailOtpFormProps {
	email: string | null
}

const ChangeEmailOtpForm = ({ email }: ChangeEmailOtpFormProps) => {
	return (
		<>
			<Button variant={'link'}>
				{email}
				<Pencil />
			</Button>
		</>
	)
}

export default ChangeEmailOtpForm
