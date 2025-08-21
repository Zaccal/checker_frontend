import { expireDateColor, formatExpireDate } from '@/lib/formatExpireDate'

interface TaskExpireDateProps {
  expiresAt: Date | string
  completed?: boolean
}

const TaskExpireDate = ({ expiresAt, completed }: TaskExpireDateProps) => {
  return (
    <>
      <span
        style={{
          color: completed ? '#26a843' : expireDateColor(expiresAt),
        }}
        className="text-sm"
      >
        {completed ? 'Completed' : formatExpireDate(expiresAt)}
      </span>
    </>
  )
}

export default TaskExpireDate
