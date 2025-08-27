'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useBoolean } from '@/hooks'
import { Pen } from 'lucide-react'
import TodoEditDialog from './TodoEditDialog'

export function TodoEditOption() {
  const [open, toggle] = useBoolean()

  return (
    <>
      <DropdownMenuItem
        onClick={e => {
          e.preventDefault()
          toggle()
        }}
      >
        <Pen />
        Edit
      </DropdownMenuItem>
      <TodoEditDialog open={open} onOpenChange={toggle} />
    </>
  )
}
