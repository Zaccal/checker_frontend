import { Button } from '@/components/ui/button'
import { LucideGithub } from 'lucide-react'
import FormFooter from './ui/FormFooter'

const FormSocial = () => {
	return (
		<>
			<form>
				<Button variant={'outline'} className="w-full font-bold ">
					<LucideGithub />
					Github
				</Button>

				<FormFooter />
			</form>
		</>
	)
}

export default FormSocial
