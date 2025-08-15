import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {
  editTaskSchema,
  type EditTaskSchema,
} from '@/lib/schemas/editTask.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import TaskDropdownEditFormFields from './TaskDropdownEditFormFields'
import { type TodoFromList } from '@/lib/types/API.type'
import { useUpdateTask } from '@/hooks/use-mutate-task'
import {
  combineTimeDate,
  getDefualtSubtasks,
  getDefualtTags,
  getFormattedTags,
  getTimeFromDate,
} from '@/lib/index'

interface TaskDropdownEditProps {
  open: boolean
  onOpenChange: (state?: boolean) => void
  task: TodoFromList
}

const TaskDropdownEdit = ({
  task,
  open,
  onOpenChange,
}: TaskDropdownEditProps) => {
  const { mutate: updateTask, isPending } = useUpdateTask(task.id, () => {
    onOpenChange(false)
  })

  const form = useForm<EditTaskSchema>({
    resolver: zodResolver(editTaskSchema),
    defaultValues: {
      title: task.title,
      expirationDate: task.expiresAt ?? undefined,
      expirationTime: getTimeFromDate(task.expiresAt),
      tags: getDefualtTags(task.tags),
      subtasks: getDefualtSubtasks(task.subTasks),
    },
  })

  const handleSubmit = (data: EditTaskSchema) => {
    const taskDate = combineTimeDate(data.expirationDate, data.expirationTime)

    const formattedTags = getFormattedTags(data.tags)
    const updateData = {
      title: data.title,
      tags: formattedTags,
      subtasks: data.subtasks,
      expiresAt: taskDate,
    }

    updateTask(updateData)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={state => {
        onOpenChange(state)
        form.reset()
      }}
    >
      <DialogContent className="max-w-md">
        <DialogTitle>Edit Task Details</DialogTitle>
        <DialogDescription>
          Update the task&apos;s title, expiration date, tags, and subtasks
          below.
        </DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <TaskDropdownEditFormFields disabled={isPending} form={form} />
            <Button disabled={isPending} type="submit" className="w-full">
              Edit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default TaskDropdownEdit
