import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import useEmblaCarousel from 'embla-carousel-react'
import { useEffect, type ReactNode } from 'react'

interface CreateListDialogCarouselProps {
	children?: ReactNode[]
	disabled?: boolean
	step: number
	setStep: (step: number) => void
}

const CreateListDialogCarousel = ({
	children,
	disabled = false,
	setStep,
	step,
}: CreateListDialogCarouselProps) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		loop: false,
		watchDrag: false,
		duration: 20,
	})

	const isFirst = step === 0

	useEffect(() => {
		if (emblaApi) {
			emblaApi.scrollTo(step)
		}
	}, [step, emblaApi])

	const handleNext = () => {
		if (children && step < children.length - 1) {
			setStep(step + 1)
			emblaApi?.scrollTo(step + 1)
		}
	}
	const handleBack = () => {
		if (step > 0) {
			setStep(step - 1)
			emblaApi?.scrollTo(step - 1)
		}
	}

	return (
		<>
			<div className="overflow-hidden" ref={emblaRef}>
				<div className="flex gap-1">
					{children?.map((child, index) => (
						<div key={index} className="min-w-0 flex-[0_0_100%]">
							{child}
						</div>
					))}
				</div>
			</div>
			<DialogFooter>
				{!isFirst && (
					<Button disabled={disabled} variant="secondary" onClick={handleBack}>
						Back
					</Button>
				)}
				{!isFirst && (
					<Button disabled={disabled} type="submit" className="w-[80px]">
						Create
					</Button>
				)}
				{isFirst && (
					<Button disabled={disabled} className="w-[80px]" onClick={handleNext}>
						Next
					</Button>
				)}
			</DialogFooter>
		</>
	)
}

export default CreateListDialogCarousel
