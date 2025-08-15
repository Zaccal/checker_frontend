import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { type SubtaskSchema } from '@/lib/schemas/subtask.schema'
import { Edit, Trash } from 'lucide-react'
import { useState } from 'react'

interface SubtaskProps extends SubtaskSchema {
  onRemove: (id: string) => void
  onToggle?: (id: string) => void
  onUpdateTitle?: (id: string, newTitle: string) => void
  editable?: boolean
}

const Subtask = ({
  id,
  title,
  onRemove,
  completed = false,
  onToggle,
  onUpdateTitle,
  editable = false,
}: SubtaskProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(title)

  const handleToggle = () => {
    if (onToggle) {
      onToggle(id)
    }
  }

  const handleEdit = () => {
    if (editable) {
      setIsEditing(true)
    }
  }

  const handleSaveEdit = () => {
    if (onUpdateTitle && editTitle.trim()) {
      onUpdateTitle(id, editTitle.trim())
      setIsEditing(false)
    }
  }

  const handleCancelEdit = () => {
    setEditTitle(title)
    setIsEditing(false)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSaveEdit()
    } else if (event.key === 'Escape') {
      handleCancelEdit()
    }
  }

  return (
    <div className="border border-border rounded-md flex items-center justify-between p-3">
      <div className="flex items-center gap-3 flex-1">
        <Checkbox
          size="lg"
          checked={completed}
          onCheckedChange={handleToggle}
        />
        {isEditing ? (
          <Input
            value={editTitle}
            onChange={e => {
              setEditTitle(e.target.value)
            }}
            onKeyDown={handleKeyDown}
            onBlur={handleSaveEdit}
            className="flex-1"
          />
        ) : (
          <p
            className={`text-sm flex-1 ${
              completed ? 'line-through text-muted-foreground' : ''
            }`}
          >
            {title}
          </p>
        )}
      </div>
      <div className="flex items-center gap-1">
        {editable && !isEditing && (
          <Button onClick={handleEdit} size={'icon'} variant={'ghost'}>
            <Edit className="h-4 w-4" />
          </Button>
        )}
        <Button
          onClick={() => {
            onRemove(id)
          }}
          size={'icon'}
          variant={'destructive'}
        >
          <Trash />
        </Button>
      </div>
    </div>
  )
}

export default Subtask
