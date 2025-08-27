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

interface TodoDropdownProps {
  children?: React.ReactNode | React.ReactNode[]
}

export function TodoDropdown({ children }: TodoDropdownProps) {
  return (
    <DropdownMenu>
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
