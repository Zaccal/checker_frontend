'use client'

import { useBoolean } from '@/hooks'
import { todoContext } from './Todo'
import { useDeleteTodo } from '@/hooks/useMutateTodo'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Trash } from 'lucide-react'
import Comfirm, { comfirmStore } from '../Common/Comfirm'

export function TodoDeleteOption() {
  const [open, toggle] = useBoolean()
  const todoId = todoContext.useSelect(state => state.id)
  const { mutateAsync: deleteTodo, isPending } = useDeleteTodo(todoId)
  const isHideComfirm = comfirmStore.use(state => state.isHideComfirm)

  const deleteHadnler = async () => {
    await deleteTodo()
    toggle(false)
  }

  return (
    <>
      <DropdownMenuItem
        onClick={e => {
          if (!isHideComfirm) {
            e.preventDefault()
          }

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
        disabled={isPending}
        confirmText="Delete"
      />
    </>
  )
}
