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
import { combineTimeDate } from '@/utils/combineTimeDate'
import { useBoolean, useCreateTodo } from '@/hooks/index'
import { TAGS_QUERY_KEY } from '@/lib/constants/constants'
import { ScrollArea } from '@/components/ui/scroll-area'
import CreateTaskFormFields from './CreateTaskFormFields/CreateTaskFormFields'
import { getFormattedTags } from '@/utils'
import { useQueryClient } from '@tanstack/react-query'

interface CreateTaskProps {
  listId: string
}

const CreateTask = ({ listId }: CreateTaskProps) => {
  const queryClient = useQueryClient()
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
  const { mutateAsync: createTask, isPending } = useCreateTodo({
    onSuccess: () => {
      toggleOpen(false)
      form.reset()
    },
  })

  const onSubmit = async (data: CreateTask) => {
    const taskDate = combineTimeDate(data.expirationDate, data.expirationTime)
    const formattedTags = getFormattedTags(data.tags)

    await createTask({
      title: data.title,
      tags: formattedTags,
      subtasks: data.subtasks,
      expiresAt: taskDate,
      taskListId: listId,
    })

    // ? If the user creates a new tag, then invalidate "tags" too
    if (formattedTags.find(data => typeof data !== 'string')) {
      await queryClient.invalidateQueries({
        queryKey: [TAGS_QUERY_KEY],
      })
    }
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
              <CreateTaskFormFields disabled={isPending} form={form} />
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default CreateTask
