'use client'

import { useBoolean } from '@/hooks'
import { todoContext } from './Todo'
import { useDeleteTask } from '@/hooks/use-mutate-task'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Trash } from 'lucide-react'
import Comfirm from '../Common/Comfirm'

export function TodoDeleteOption() {
  const [open, toggle] = useBoolean()
  const { id: todoId } = todoContext.useSelect(state => state)
  const { mutateAsync: deleteTask, isPending } = useDeleteTask(todoId)

  const deleteHadnler = async () => {
    await deleteTask()
    toggle(false)
  }

  return (
    <>
      <DropdownMenuItem
        onClick={e => {
          e.preventDefault()
          toggle()
        }}
        variant="destructive"
      >
        <Trash />
        Delete
      </DropdownMenuItem>
      <Comfirm
        open={open}
        onOpenChange={toggle}
        onConfirm={deleteHadnler}
        title="Are you sure you want to delete this task?"
        description="This action cannot be undone."
        confirmText={'Delete'}
        cancelText="Cancel"
        disabled={isPending}
      />
    </>
  )
}
