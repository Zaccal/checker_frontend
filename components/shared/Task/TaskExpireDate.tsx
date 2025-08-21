import { expireDateColor } from '@/lib/formatExpireDate'
import { getTaskStatus } from '@/lib/getTaskStatus'

interface TaskExpireDateProps {
  expiresAt: Date | string
  completed?: boolean
  isSubtasksComplited?: boolean
}

const TaskExpireDate = ({
  expiresAt,
  completed,
  isSubtasksComplited,
}: TaskExpireDateProps) => {
  const status = getTaskStatus({ expiresAt, completed, isSubtasksComplited })
  const color = getTaskStatus({
    expiresAt,
    completed,
    isSubtasksComplited,
    customValue: {
      onExpired: expireDateColor(expiresAt),
      onCompleted: '#2ba545',
      onSubtasksNotCompleted: '#ffbd20',
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

export default TaskExpireDate
