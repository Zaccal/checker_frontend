'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {
  editTodoSchema,
  type EditTodoSchema,
} from '@/lib/schemas/editTodo.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useUpdateTodo } from '@/hooks/useMutateTodo'
import {
  combineTimeDate,
  getDefualtSubtasks,
  getDefualtTags,
  getFormattedTags,
  getTimeFromDate,
} from '@/utils/index'
import { ScrollArea } from '@/components/ui/scroll-area'
import { todoContext } from '../Todo'
import TodoEditDialogFormFields from './TodoEditDialogFormFields'

interface TodoEditDialogProps {
  open: boolean
  onOpenChange: (state?: boolean) => void
}

const TodoEditDialog = ({ open, onOpenChange }: TodoEditDialogProps) => {
  const todo = todoContext.useSelect(state => state)
  const todoContextSet = todoContext.useSelect().set
  const { mutate: updateTodo, isPending } = useUpdateTodo(
    todo.id,
    updatedTodo => {
      onOpenChange(false)
      todoContextSet(updatedTodo)
    },
  )

  const form = useForm<EditTodoSchema>({
    resolver: zodResolver(editTodoSchema),
    defaultValues: {
      title: todo.title,
      expirationDate: todo.expiresAt ? new Date(todo.expiresAt) : undefined,
      expirationTime: getTimeFromDate(todo.expiresAt),
      tags: getDefualtTags(todo.tags),
      subtasks: getDefualtSubtasks(todo.subTasks),
    },
  })

  const handleSubmit = (data: EditTodoSchema) => {
    const todoDate = combineTimeDate(data.expirationDate, data.expirationTime)

    const formattedTags = getFormattedTags(data.tags)
    const updateData = {
      title: data.title,
      tags: formattedTags,
      subtasks: data.subtasks,
      expiresAt: todoDate,
    }

    updateTodo(updateData)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={state => {
        onOpenChange(state)
        form.reset()
      }}
    >
      <DialogContent className="dialog-adaptive">
        <ScrollArea className="max-h-[80vh]">
          <DialogTitle>Edit Todo Details</DialogTitle>
          <DialogDescription>
            Update the todo&apos;s title, expiration date, tags, and subtasks
            below.
          </DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <TodoEditDialogFormFields disabled={isPending} form={form} />
              <Button disabled={isPending} type="submit" className="w-full">
                Edit
              </Button>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default TodoEditDialog
