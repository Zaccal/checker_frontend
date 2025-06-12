import FormLogin from '@/components/shared/AuthForms/FormLogin'
import FormSocial from '@/components/shared/AuthForms/FormSocial'
import FormHeader from '@/components/shared/AuthForms/ui/FormHeader'
import FormSeparator from '@/components/shared/AuthForms/ui/FormSeparator'
import FormWrapper from '@/components/shared/AuthForms/ui/FormWrapper'

const page = () => {
	return (
		<>
			<FormHeader link="/" title="Sign up" />
			<FormWrapper>
				<FormLogin />
				<FormSeparator />
				<FormSocial />
			</FormWrapper>
		</>
	)
}

export default page
