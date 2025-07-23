import FormHeader from '@/components/shared/AuthForms/ui/FormHeader'
import FormWrapper from '@/components/shared/AuthForms/ui/FormWrapper'
import FormSignUp from '@/components/shared/AuthForms/FormSignUp'
import FormSeparator from '@/components/shared/AuthForms/ui/FormSeparator'
import FormSocial from '@/components/shared/AuthForms/FormSocial'
import { Suspense } from 'react'
import Fallback from '@/components/shared/Common/Fallback'

const page = () => {
	return (
		<Suspense fallback={<Fallback />}>
			<FormHeader
				description="Already have an account?"
				link="/login"
				title="Log-in"
			/>

			<FormWrapper>
				<FormSignUp /> <FormSeparator /> <FormSocial />
			</FormWrapper>
		</Suspense>
	)
}

export default page
