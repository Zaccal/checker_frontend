import { formatExpireDate } from './formatExpireDate'

interface CustomValue {
  onCompleted?: string
  onEverySubtasksNotCompleted?: string
  onExpired?: string
}

interface Options {
  expiresAt: Date | string | null
  completed?: boolean
  isEverySubtasksComplited?: boolean
  customValue?: CustomValue
}

export function getTaskStatus({
  expiresAt,
  completed,
  isEverySubtasksComplited,
  customValue,
}: Options): string {
  if (completed && isEverySubtasksComplited)
    return customValue?.onCompleted || 'Completed'
  if (completed && !isEverySubtasksComplited)
    return (
      customValue?.onEverySubtasksNotCompleted || 'Subtasks are not completed'
    )
  if (!expiresAt) return ''
  return customValue?.onExpired || formatExpireDate(expiresAt)
}
