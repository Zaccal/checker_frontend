'use client'

import { Badge } from '@/components/ui/badge'
import { todoContext } from './Todo'

const TodoTags = () => {
  const { tags } = todoContext.useSelect(state => state)
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

export default TodoTags
