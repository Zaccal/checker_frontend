import * as React from 'react'

import { cn } from '@/lib/utils'

interface InputIconProps extends React.ComponentProps<'input'> {
  className?: string
  icon: React.ReactElement<{ size?: number; className?: string }>
}

function InputIcon({ className, icon, ...props }: InputIconProps) {
  const iconWithSize = React.isValidElement(icon)
    ? React.cloneElement(icon, { size: 18, className: 'text-muted-foreground' })
    : icon

  return (
    <div
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        'flex items-center gap-2',
      )}
    >
      {iconWithSize}
      <input
        data-slot="input"
        className={cn('focus:outline-0 w-full', className)}
        {...props}
      />
    </div>
  )
}

export { InputIcon }
