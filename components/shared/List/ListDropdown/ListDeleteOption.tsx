'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Trash } from 'lucide-react'
import { listContext } from '../List'
import { useDeleteList } from '@/hooks/useMutateLists'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPersistent,
  AlertDialogStore,
  AlertDialogTitle,
} from '@/components/ui/Alert'
import { useBoolean } from '@/hooks'

export const ListDeleteOption = () => {
  const { title, id: listId } = listContext.useSelect(state => state)
  const alertDialogState = AlertDialogStore.use(state => state.state)
  const [open, toggle] = useBoolean()

  const COMFIRM_TITLE = `Are you sure you want to delete "${title}"?`
  const COMFIRM_DESCRIPTION = `This action cannot be undone. This will permanently delete the list "${title}" and all of its tasks.`

  const { mutate: deleteList } = useDeleteList(listId)

  return (
    <>
      <DropdownMenuItem
        onClick={e => {
          if (alertDialogState) {
            e.preventDefault()
          } else {
            deleteList()
          }

          toggle()
        }}
        variant="destructive"
      >
        Delete List
        <Trash />
      </DropdownMenuItem>
      <AlertDialog open={open} onOpenChange={toggle}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{COMFIRM_TITLE}</AlertDialogTitle>
            <AlertDialogDescription>
              {COMFIRM_DESCRIPTION}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogPersistent />
          <AlertDialogFooter>
            <AlertDialogCancel>Cancle</AlertDialogCancel>
            <AlertDialogAction onAction={deleteList} variant={'destructive'}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
