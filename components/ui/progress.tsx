'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'

import { cn } from '@/utils/utils'

interface ProgressProps
  extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  showPercentage?: boolean
  percentagePosition?: 'inside' | 'outside' | 'right' | 'follow'
  percentageClassName?: string
}

function Progress({
  className,
  value,
  showPercentage = false,
  percentagePosition = 'right',
  percentageClassName,
  ...props
}: ProgressProps) {
  const percentage = Math.round(value || 0)

  const percentageElement = showPercentage && (
    <span
      className={cn(
        'text-sm font-medium',
        percentagePosition === 'inside' &&
          'absolute inset-0 flex items-center justify-center text-white z-10',
        percentagePosition === 'outside' &&
          'absolute -top-6 left-0 text-muted-foreground',
        percentagePosition === 'right' && 'ml-2 text-muted-foreground',
        percentagePosition === 'follow' &&
          'absolute right-2 top-1/6 text-primary-foreground z-10 text-xs font-semibold transition-all duration-300 ease-out',
        percentageClassName,
      )}
    >
      {percentage === Infinity ? 100 : percentage}%
    </span>
  )

  return (
    <div className="flex items-center">
      <ProgressPrimitive.Root
        data-slot="progress"
        className={cn(
          'bg-primary/20 relative h-2 w-full overflow-hidden rounded-full',
          showPercentage && percentagePosition === 'inside' && 'h-6',
          className,
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className="bg-primary h-full w-full flex-1 transition-all relative"
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        >
          {percentagePosition === 'follow' && percentageElement}
        </ProgressPrimitive.Indicator>
        {percentagePosition === 'inside' && percentageElement}
        {percentagePosition === 'outside' && percentageElement}
      </ProgressPrimitive.Root>
      {percentagePosition === 'right' && percentageElement}
    </div>
  )
}

export { Progress }
