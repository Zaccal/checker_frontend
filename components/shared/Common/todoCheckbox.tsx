'use client'

import { type CheckboxProps } from '@/components/ui/checkbox'
import CheckboxLabel from './CheckboxLabel'
import { useBoolean, useDebounceCallback } from '@/hooks'
import { useCompliteTodo, useUpdateSubtask } from '@/hooks/index'

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
  // ! Fix a bug, when I refresh page, checkbox state is not updated
  const [check, toggleCheck] = useBoolean(initialState)
  const { mutate: compliteTodo } = useCompliteTodo(id, () => {
    toggleCheck(initialState)
    onErrorHandler?.()
  })
  const { mutate: updateSubtask } = useUpdateSubtask(id, () => {
    toggleCheck(initialState)
    onErrorHandler?.()
  })

  const debounceCompliteHandler = useDebounceCallback((state: boolean) => {
    if (state === initialState) return
    if (typeData === 'task') {
      compliteTodo(state)
    } else {
      updateSubtask({ completed: state })
    }
  }, 350)

  return (
    <CheckboxLabel
      labelClassName="font-bold peer-data-[state=checked]:line-throgh after:bg-muted-foreground peer-data-[state=checked]:text-muted-foreground relative after:absolute after:top-1/2 after:left-0 after:h-px after:w-full after:origin-bottom after:-translate-y-1/2 after:scale-x-0 after:transition-transform after:ease-in-out peer-data-[state=checked]:after:origin-bottom peer-data-[state=checked]:after:scale-x-100"
      id={id}
      className="rounded-full"
      checked={check}
      onCheckedChange={state => {
        toggleCheck(state === true)
        debounceCompliteHandler(state === true)
        onChangeChecker?.(state === true)
      }}
      size="lg"
      {...props}
      label={label}
    />
  )
}
