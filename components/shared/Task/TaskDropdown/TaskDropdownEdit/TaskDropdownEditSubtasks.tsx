import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { type ControllerRenderProps } from 'react-hook-form'
import { useState } from 'react'
import Subtask from '@/components/shared/Subtask/Subtask'
import { type EditTaskSchema } from '@/lib/schemas/editTask.schema'

interface TaskDropdownEditSubtasksProps {
  field: ControllerRenderProps<EditTaskSchema, 'subtasks'>
  disabled?: boolean
}

const TaskDropdownEditSubtasks = ({
  field,
  disabled,
}: TaskDropdownEditSubtasksProps) => {
  const [value, setValue] = useState('')

  const handleAddSubtask = () => {
    const title = value.trim()
    if (!title) return
    const newSubtask = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    }

    field.onChange([...field.value, newSubtask])
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

  const handleToggleSubtask = (id: string) => {
    field.onChange(
      field.value.map(subtask =>
        subtask.id === id
          ? { ...subtask, completed: !subtask.completed }
          : subtask,
      ),
    )
  }

  const handleUpdateSubtaskTitle = (id: string, newTitle: string) => {
    field.onChange(
      field.value.map(subtask =>
        subtask.id === id ? { ...subtask, title: newTitle } : subtask,
      ),
    )
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
                  id={subtask.id}
                  title={subtask.title}
                  completed={subtask.completed ?? false}
                  onRemove={() => {
                    handleRemoveSubtask(subtask.id)
                  }}
                  onToggle={() => {
                    handleToggleSubtask(subtask.id)
                  }}
                  onUpdateTitle={(id: string, newTitle: string) => {
                    handleUpdateSubtaskTitle(id, newTitle)
                  }}
                  editable={true}
                />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <p className="text-sm text-muted-foreground text-center">
            No subtasks yet
          </p>
        )}
      </div>
    </div>
  )
}

export default TaskDropdownEditSubtasks
