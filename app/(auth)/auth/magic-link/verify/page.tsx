import { Suspense } from 'react'
import Fallback from '@/components/common/Fallback'
import MagicLinkContent from '@/components/common/verification/MagicLinkContent'

const Page = () => {
  return (
    <>
      <Suspense fallback={<Fallback />}>
        <MagicLinkContent />
      </Suspense>
    </>
  )
}

export default Page
