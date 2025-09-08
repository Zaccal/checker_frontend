'use client'

import { todoContext } from './Todo'
import TodoStatus from './TodoStatus'
import TodoTags from './TodoTags'

export function TodoFooter() {
  const { subTasks, tags } = todoContext.useSelect(state => state)
  const subTasksNotComplitedLength = subTasks.filter(
    data => !data.completed,
  ).length
  const hasSteps = subTasks.length > 0
  const hasTags = tags.length > 0

  return (
    <>
      <div className="flex flex-col gap-2 mt-3 items-start">
        <div className="flex items-center gap-2">
          <TodoStatus />
          {(hasSteps || hasTags) && <div className="dot" />}
          {hasSteps && (
            <span className="text-sm text-muted-foreground">
              {subTasksNotComplitedLength} Steps
            </span>
          )}
          {hasSteps && hasTags && <div className="dot" />}
          {hasTags && <TodoTags />}
        </div>
      </div>
    </>
  )
}
