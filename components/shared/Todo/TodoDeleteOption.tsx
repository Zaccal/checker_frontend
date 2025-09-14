'use client'

import { useBoolean } from '@/hooks'
import { todoContext } from './Todo'
import { useDeleteTodo } from '@/hooks/useMutateTodo'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Trash } from 'lucide-react'
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

export function TodoDeleteOption() {
  const [open, toggle] = useBoolean()
  const todoId = todoContext.useSelect(state => state.id)
  const { mutate: deleteTodo } = useDeleteTodo(todoId)
  const alertState = AlertDialogStore.use(state => state.state)

  return (
    <>
      <DropdownMenuItem
        onClick={e => {
          if (alertState) {
            e.preventDefault()
          } else {
            deleteTodo()
          }

          toggle()
        }}
        variant="destructive"
      >
        <Trash />
        Delete
      </DropdownMenuItem>
      <AlertDialog open={open} onOpenChange={toggle}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this task?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogPersistent />
          <AlertDialogFooter>
            <AlertDialogCancel>Cancle</AlertDialogCancel>
            <AlertDialogAction variant={'destructive'} onAction={deleteTodo}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
