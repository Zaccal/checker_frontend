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
import { listContext } from '../List'

interface ListDropdownProps {
  children?: React.ReactNode | React.ReactNode[]
}

export const ListDropdown = ({ children }: ListDropdownProps) => {
  const isProtected = listContext.useSelect(state => state.protected)

  if (isProtected) return null

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={'icon'} variant={'ghost'}>
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-38" align="center">
          <DropdownMenuLabel>List&apos;s options</DropdownMenuLabel>
          <DropdownMenuGroup>{children}</DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
