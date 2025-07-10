import { Suspense } from 'react'
import Fallback from '@/components/shared/Common/Fallback'
import MagicLinkContent from '@/components/shared/MagicLinkContent'

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
