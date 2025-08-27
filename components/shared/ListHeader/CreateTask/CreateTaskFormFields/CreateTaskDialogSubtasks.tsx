import Subtask from '@/components/shared/Subtask/Subtask'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { type CreateTask } from '@/lib/schemas/createTask.schema'
import { useState } from 'react'
import { type ControllerRenderProps } from 'react-hook-form'

interface CreateTaskDialogSubtasksProps {
  field: ControllerRenderProps<CreateTask, 'subtasks'>
  disabled?: boolean
}

const CreateTaskDialogSubtasks = ({
  field,
  disabled,
}: CreateTaskDialogSubtasksProps) => {
  const [value, setValue] = useState('')

  const handleAddSubtask = () => {
    const title = value.trim()
    if (!title) return
    const newSubtask = {
      id: crypto.randomUUID(),
      title,
    }

    field.onChange([newSubtask, ...field.value])
    setValue('')
  }

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleAddSubtask()
    }
  }

  const handleRemoveSubtask = (id: string) => {
    field.onChange(field.value.filter(subtask => subtask.id !== id))
  }

  return (
    <div>
      <Input
        value={value}
        onChange={event => {
          setValue(event.target.value)
        }}
        onKeyDown={handleInputKeyDown}
        id="subtask-input"
        placeholder="Press Enter to add a subtask"
        disabled={disabled}
      />
      <div className="mt-4">
        {field.value.length ? (
          <ScrollArea className="h-40 w-full">
            <div className="space-y-3">
              {field.value.map(subtask => (
                <Subtask
                  key={subtask.id}
                  onRemove={() => {
                    handleRemoveSubtask(subtask.id)
                  }}
                  {...subtask}
                />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <p className="text-sm text-muted-foreground text-center">
            Not subtask yet
          </p>
        )}
      </div>
    </div>
  )
}

export default CreateTaskDialogSubtasks
