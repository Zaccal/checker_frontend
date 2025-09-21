'use client'

import { type CheckboxProps } from '@/components/ui/checkbox'
import CheckboxLabel from './primitives/CheckboxLabel'
import { useBoolean } from '@/hooks'
import { useTodoCheckboxUpdater } from '@/hooks'
import { invalidateTag } from '@/lib/actions'

interface TodoCheckboxProps extends CheckboxProps {
  id: string
  label: string
  initialState: boolean
  typeData?: 'task' | 'subtask'
  onChangeChecker?: (state: boolean) => void
  onErrorHandler?: () => void
}

export default function TodoCheckbox({
  id,
  label,
  initialState,
  typeData = 'task',
  onChangeChecker,
  onErrorHandler,
  ...props
}: TodoCheckboxProps) {
  const [check, toggleCheck] = useBoolean(initialState)
  const { debounceUpdateHandler } = useTodoCheckboxUpdater({
    id,
    typeData,
    onSuccess: () => {
      void invalidateTag('list-id')
    },
    onError: () => {
      toggleCheck(initialState)
      onErrorHandler?.()
    },
  })

  return (
    <CheckboxLabel
      labelClassName="font-bold peer-data-[state=checked]:line-throgh after:bg-muted-foreground peer-data-[state=checked]:text-muted-foreground relative after:absolute after:top-1/2 after:left-0 after:h-px after:w-full after:origin-bottom after:-translate-y-1/2 after:scale-x-0 after:transition-transform after:ease-in-out peer-data-[state=checked]:after:origin-bottom peer-data-[state=checked]:after:scale-x-100"
      id={id}
      className="rounded-full"
      checked={check}
      onCheckedChange={state => {
        const isChecked = state === true
        toggleCheck(isChecked)
        if (isChecked !== initialState) {
          debounceUpdateHandler(isChecked)
        }
        onChangeChecker?.(isChecked)
      }}
      size="lg"
      {...props}
      label={label}
    />
  )
}
