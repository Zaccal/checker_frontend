import { Button } from '@/components/ui/button'
import FormFooter from './ui/FormFooter'
import Github from '../Common/Github'

const FormSocial = () => {
	return (
		<>
			<form>
				<Button variant={'outline'} className="w-full font-bold ">
					<Github />
				</Button>

				<FormFooter />
			</form>
		</>
	)
}

export default FormSocial
