'use client'

import DynamicIcon from '@/components/shared/Common/DynamicIcon'
import RenameList from './RenameList/RenameList'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { EllipsisVertical, Pen, Trash } from 'lucide-react'
import ChangeListIcon from './ChangeListIcon/ChangeListIcon'
import { useBoolean } from '@/hooks'
import DeleteList from './DeleteList/DeleteList'
import { useListContext } from '@/hooks/useListContext'

const ListHeaderDropdown = () => {
  const { icon } = useListContext()
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useBoolean()
  const [isOpenRenameDialog, setIsOpenRenameDialog] = useBoolean()
  const [isOpenChangeIconDialog, setIsOpenChangeIconDialog] = useBoolean()

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={'icon'} variant={'ghost'}>
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-38" align="center">
          <DropdownMenuLabel>List&apos;s options</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                setIsOpenDeleteDialog()
              }}
              variant="destructive"
            >
              Delete List
              <Trash />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setIsOpenRenameDialog()
              }}
            >
              Rename List
              <Pen />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setIsOpenChangeIconDialog()
              }}
            >
              Icon Change
              <DynamicIcon iconName={icon} />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteList
        open={isOpenDeleteDialog}
        onOpenChange={setIsOpenDeleteDialog}
      />
      <RenameList
        open={isOpenRenameDialog}
        onOpenChange={setIsOpenRenameDialog}
      />
      <ChangeListIcon
        onOpenChange={setIsOpenChangeIconDialog}
        open={isOpenChangeIconDialog}
      />
    </div>
  )
}

export default ListHeaderDropdown
