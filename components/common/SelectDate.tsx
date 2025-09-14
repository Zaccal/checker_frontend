'use client'

import { useBoolean } from '@/hooks'
import { ChevronDownIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import type { FieldValues, Path, ControllerRenderProps } from 'react-hook-form'
import type { ButtonHTMLAttributes } from 'react'

interface SelectDateProps<T extends FieldValues = FieldValues>
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  field: ControllerRenderProps<T, Path<T>>
}

export default function SelectDate<T extends FieldValues>({
  field,
  ...props
}: SelectDateProps<T>) {
  const [open, setOpen] = useBoolean()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="justify-between font-normal w-full"
          type="button"
          {...props}
        >
          {field.value
            ? new Date(field.value).toLocaleDateString()
            : 'Select date'}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        disablePortal
        className="w-auto overflow-hidden p-0"
        align="center"
      >
        <Calendar
          mode="single"
          selected={field.value ? new Date(field.value) : undefined}
          captionLayout="dropdown"
          onSelect={date => {
            field.onChange(date)
            setOpen()
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
