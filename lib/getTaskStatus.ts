import { formatExpireDate } from './formatExpireDate'

interface CustomValue {
  onCompleted?: string
  onSubtasksNotCompleted?: string
  onExpired?: string
}

interface Options {
  expiresAt: Date | string | null
  completed?: boolean
  isSubtasksComplited?: boolean
  customValue?: CustomValue
}

export function getTaskStatus({
  expiresAt,
  completed,
  isSubtasksComplited,
  customValue,
}: Options): string {
  if (completed && !isSubtasksComplited)
    return customValue?.onCompleted || 'Completed'
  if (completed && isSubtasksComplited)
    return customValue?.onSubtasksNotCompleted || 'Subtasks are not completed'
  if (!expiresAt) return ''
  return customValue?.onExpired || formatExpireDate(expiresAt)
}
