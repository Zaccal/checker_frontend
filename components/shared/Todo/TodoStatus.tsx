'use client'

import { expireDateColor } from '@/utils/formatExpireDate'
import { getTaskStatus } from '@/utils/getTaskStatus'
import { todoContext } from './Todo'

const TodoStatus = () => {
  const { expiresAt, completed, subTasks } = todoContext.useSelect(
    state => state,
  )
  const isEverySubtasksComplited = subTasks.every(subtask => subtask.completed)
  const status = getTaskStatus({
    expiresAt,
    completed,
    isEverySubtasksComplited,
  })
  const color = getTaskStatus({
    expiresAt,
    completed,
    isEverySubtasksComplited,
    customValue: {
      onExpired: expireDateColor(expiresAt),
      onCompleted: '#2ba545',
      onEverySubtasksNotCompleted: '#ffbd20',
    },
  })

  return (
    <>
      <span
        style={{
          color: color,
        }}
        className="text-sm"
      >
        {status}
      </span>
    </>
  )
}

export default TodoStatus
