import { Button } from '@/components/ui/button'
import Github from '../Common/Github'
import FormFooter from './ui/FormFooter'

const FormSocial = () => {
	return (
		<>
			<form>
				<Button variant={'outline'} className="w-full font-bold ">
					<Github size={28} /> Github
				</Button>

				<FormFooter />
			</form>
		</>
	)
}

export default FormSocial
