'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { EllipsisVertical } from 'lucide-react'
import { todoContext } from './Todo'

interface TodoDropdownProps {
  children?: React.ReactNode | React.ReactNode[]
}

export function TodoDropdown({ children }: TodoDropdownProps) {
  const { value, set } = todoContext.useSelect()

  return (
    <DropdownMenu
      open={value?.dropdownOpen}
      onOpenChange={state => {
        if (value) {
          set({ ...value, dropdownOpen: state })
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button size={'icon'} variant={'ghost'}>
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-38">
        <DropdownMenuLabel>Task&apos;s options</DropdownMenuLabel>
        <DropdownMenuGroup>{children}</DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
