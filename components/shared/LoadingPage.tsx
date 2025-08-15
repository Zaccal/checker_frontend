import { SvgSpinners180RingWithBg } from '@/components/shared/Common/SvgSpinners180RingWithBg'

export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <SvgSpinners180RingWithBg className="w-8 h-8 mb-4" />
      <div className="text-lg text-muted-foreground">Loading...</div>
    </div>
  )
}
