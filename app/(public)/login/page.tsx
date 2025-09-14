import FormSignIn from '@/components/shared/AuthForms/SignIn/FormSignIn'
import FormSocial from '@/components/shared/AuthForms/FormSocial'
import FormHeader from '@/components/shared/AuthForms/FormUI/FormHeader'
import FormSeparator from '@/components/shared/AuthForms/FormUI/FormSeparator'
import FormWrapper from '@/components/shared/AuthForms/FormUI/FormWrapper'
import { Suspense } from 'react'
import Fallback from '@/components/common/Fallback'

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
