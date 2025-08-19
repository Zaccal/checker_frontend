'use client'

import { type CheckboxProps } from '@/components/ui/checkbox'
import CheckboxLabel from './CheckboxLabel'
import { useBoolean, useDebounceCallback } from '@/hooks'
import { useCompliteTask } from '@/hooks/use-mutate-task'

interface TodoCheckboxProps extends CheckboxProps {
  id: string
  label: string
  initialState: boolean
}

export default function TodoCheckbox({
  id,
  label,
  initialState,
  ...props
}: TodoCheckboxProps) {
  const [check, toggleCheck] = useBoolean(initialState)
  const { mutate: compliteTask } = useCompliteTask(id, () => {
    toggleCheck(initialState)
  })

  const debounceCompliteTaskHandler = useDebounceCallback((state: boolean) => {
    if (state === initialState) return
    compliteTask(state)
  }, 350)

  return (
    <CheckboxLabel
      labelClassName="font-bold peer-data-[state=checked]:line-throgh after:bg-muted-foreground peer-data-[state=checked]:text-muted-foreground relative after:absolute after:top-1/2 after:left-0 after:h-px after:w-full after:origin-bottom after:-translate-y-1/2 after:scale-x-0 after:transition-transform after:ease-in-out peer-data-[state=checked]:after:origin-bottom peer-data-[state=checked]:after:scale-x-100"
      id={id}
      className="rounded-full"
      checked={check}
      onCheckedChange={state => {
        debounceCompliteTaskHandler(state === true)
        toggleCheck(state === true)
      }}
      size="lg"
      {...props}
      label={label}
    />
  )
}
