import FormSignIn from '@/components/shared/AuthForms/FormSignIn'
import FormSocial from '@/components/shared/AuthForms/FormSocial'
import FormHeader from '@/components/shared/AuthForms/ui/FormHeader'
import FormSeparator from '@/components/shared/AuthForms/ui/FormSeparator'
import FormWrapper from '@/components/shared/AuthForms/ui/FormWrapper'
import { Suspense } from 'react'
import Fallback from '@/components/shared/Common/Fallback'

const page = () => {
	return (
		<>
			<Suspense fallback={<Fallback />}>
				<FormHeader
					description="Don't have an account?"
					link="/"
					title="Sign-up"
				/>
				<FormWrapper>
					<FormSignIn />
					<FormSeparator />
					<FormSocial />
				</FormWrapper>
			</Suspense>
		</>
	)
}

export default page
