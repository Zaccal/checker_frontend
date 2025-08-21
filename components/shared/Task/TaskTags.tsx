import { Badge } from '@/components/ui/badge'
import type { TagFromList } from '@/lib/types/API.type'

interface TaskTagsProps {
  tags: TagFromList[]
}

const TaskTags = ({ tags }: TaskTagsProps) => {
  if (tags.length === 0) return null

  return (
    <>
      <div className="flex gap-2">
        {tags.map(tag => (
          <Badge key={tag.id} className="text-xs">
            {tag.name}
          </Badge>
        ))}
      </div>
    </>
  )
}

export default TaskTags
