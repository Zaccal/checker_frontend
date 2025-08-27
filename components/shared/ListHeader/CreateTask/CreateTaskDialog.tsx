'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import {
  type CreateTask,
  createTaskSchema,
} from '@/lib/schemas/createTask.schema'
import CreateTaskDialogFormFields from './CreateTaskFormFields/CreateTaskDialogFormFields'
import { combineTimeDate } from '@/lib/combineTimeDate'
import { useCreateTask } from '@/hooks/use-mutate-task'
import { useBoolean } from '@/hooks'
import { useListContext } from '@/hooks/useListContext'
import { ScrollArea } from '@/components/ui/scroll-area'

const CreateTaskDialog = () => {
  const { id: listId } = useListContext()

  const form = useForm<CreateTask>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: '',
      expirationDate: undefined,
      tags: [],
      subtasks: [],
      expirationTime: '--:--',
    },
  })
  const [open, toggleOpen] = useBoolean()
  const { mutateAsync: createTask, isPending } = useCreateTask(() => {
    toggleOpen(false)
    form.reset()
  })

  const onSubmit = async (data: CreateTask) => {
    const taskDate = combineTimeDate(data.expirationDate, data.expirationTime)

    const formattedTags = data.tags.map(tag => {
      if (tag.isLocal) {
        return {
          name: tag.name,
        }
      }
      return tag.id
    })

    const newTodo = {
      title: data.title,
      tags: formattedTags,
      subtasks: data.subtasks,
      expiresAt: taskDate,
      taskListId: listId,
    }

    await createTask(newTodo)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={state => {
        if (!state) form.reset()
        toggleOpen(state)
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus /> New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="dialog-adaptive">
        <ScrollArea className="max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>
              Enter the details for your new task below.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <CreateTaskDialogFormFields disabled={isPending} form={form} />
              <Button disabled={isPending} type="submit" className="w-full">
                Create
              </Button>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default CreateTaskDialog
