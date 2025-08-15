import { Suspense } from 'react'
import Fallback from '@/components/shared/Common/Fallback'
import OtpContent from '@/components/shared/OtpContent'

const Page = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <OtpContent />
    </Suspense>
  )
}

export default Page
