'use client'

import { todoContext } from './Todo'
import TodoStatus from './TodoStatus'
import TodoTags from './TodoTags'

export function TodoFooter() {
  const { subTasks, expiresAt, tags } = todoContext.useSelect(state => state)
  const isEverySubtaskComplited = subTasks.every(subtask => subtask.completed)
  const subTasksNotComplitedLength = subTasks.filter(
    data => !data.completed,
  ).length

  return (
    <>
      <div className="flex flex-col gap-2 mt-3 items-start">
        <div className="flex items-center gap-2">
          <TodoStatus />
          {isEverySubtaskComplited && expiresAt ? (
            <span className="dot"></span>
          ) : null}
          {subTasks.length && (
            <span className="text-sm text-muted-foreground">
              {subTasksNotComplitedLength} Steps
            </span>
          )}
          {tags.length && isEverySubtaskComplited ? (
            <span className="dot"></span>
          ) : null}
          <TodoTags />
        </div>
      </div>
    </>
  )
}
