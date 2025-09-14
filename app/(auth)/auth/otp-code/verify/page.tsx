import { Suspense } from 'react'
import Fallback from '@/components/common/Fallback'
import OtpContent from '@/components/common/verification/OtpContent'

const Page = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <OtpContent />
    </Suspense>
  )
}

export default Page
