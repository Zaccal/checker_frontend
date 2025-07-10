import { SvgSpinners180RingWithBg } from './SvgSpinners180RingWithBg'

const Fallback = () => {
	return (
		<div className="w-full h-screen flex items-center justify-center">
			<div className="flex flex-col items-center justify-center">
				<SvgSpinners180RingWithBg className="w-8 h-8 mb-2 text-primary" />
				<p className="text-sm text-muted-foreground">Loading page...</p>
			</div>
		</div>
	)
}

export default Fallback
