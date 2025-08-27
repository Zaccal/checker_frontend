import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import useEmblaCarousel from 'embla-carousel-react'
import { useEffect, type ReactNode } from 'react'

interface StepProps {
  currentStep: number
  next: () => void
  back: () => void
  isFirst: boolean
  isLast: boolean
}

interface CreateListDialogCarouselProps {
  children?: ReactNode[]
  disabled?: boolean
  stepProps: StepProps
}

const CreateListDialogCarousel = ({
  children,
  disabled = false,
  stepProps,
}: CreateListDialogCarouselProps) => {
  const { currentStep, back, isFirst, next, isLast } = stepProps
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    watchDrag: false,
    duration: 20,
  })

  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(currentStep - 1)
    }
  }, [currentStep, emblaApi])

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
        {isLast && (
          <Button disabled={disabled} variant="secondary" onClick={back}>
            Back
          </Button>
        )}
        {isLast && (
          <Button disabled={disabled} type="submit">
            Create
          </Button>
        )}
        {isFirst && (
          <Button disabled={disabled} onClick={next}>
            Next
          </Button>
        )}
      </DialogFooter>
    </>
  )
}

export default CreateListDialogCarousel
