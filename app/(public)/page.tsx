import FormHeader from '@/components/shared/AuthForms/ui/FormHeader'
import FormWrapper from '@/components/shared/AuthForms/ui/FormWrapper'
import FormSignUp from '@/components/shared/AuthForms/FormSignUp'
import FormSeparator from '@/components/shared/AuthForms/ui/FormSeparator'
import FormSocial from '@/components/shared/AuthForms/FormSocial'

const page = () => {
	return (
		<>
			<FormHeader link="/login" title="Login" />

			<FormWrapper>
				<FormSignUp /> <FormSeparator /> <FormSocial />
			</FormWrapper>
		</>
	)
}

export default page
