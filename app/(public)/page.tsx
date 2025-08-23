import FormHeader from '@/components/shared/AuthForms/FormUI/FormHeader'
import FormWrapper from '@/components/shared/AuthForms/FormUI/FormWrapper'
import FormSignUp from '@/components/shared/AuthForms/SignUp/FormSignUp'
import FormSeparator from '@/components/shared/AuthForms/FormUI/FormSeparator'
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
