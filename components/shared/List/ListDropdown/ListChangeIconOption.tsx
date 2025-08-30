'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import DynamicIcon from '../../Common/DynamicIcon'
import { listContext } from '../List'
import { useState } from 'react'
import { useUpdateList } from '@/hooks/use-mutate-lists'
import { useBoolean } from '@/hooks'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog'
import IconSelect from '../../Common/IconSelect'
import { Button } from '@/components/ui/button'

export const ListChangeIconOption = () => {
  const { icon, id: listId } = listContext.useSelect(state => state)
  const [open, toggle] = useBoolean()
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const { mutate: updateList, isPending } = useUpdateList(listId, () => {
    toggle(false)
    setSelectedIcon(null)
  })

  const changeHandle = () => {
    if (!selectedIcon) return

    updateList({
      icon: selectedIcon,
    })
  }

  return (
    <>
      <DropdownMenuItem>
        Change Icon
        <DynamicIcon iconName={icon} />
      </DropdownMenuItem>
      <Dialog
        open={open}
        onOpenChange={state => {
          setSelectedIcon(null)
          toggle(state)
        }}
      >
        <DialogContent>
          <DialogTitle>Change List Icon</DialogTitle>
          <DialogDescription>
            Select a new icon for your list from the options below.
          </DialogDescription>
          <IconSelect
            disabled={isPending}
            variant={iconName =>
              iconName === selectedIcon ? 'default' : 'outline'
            }
            onIconSelect={iconName => {
              if (iconName === selectedIcon) setSelectedIcon('')
              else setSelectedIcon(iconName)
            }}
          />
          <DialogFooter>
            <DialogClose disabled={isPending} className="outline-btn">
              Close
            </DialogClose>
            <Button
              onClick={changeHandle}
              disabled={!selectedIcon || isPending}
            >
              Change
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
