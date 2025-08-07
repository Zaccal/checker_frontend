import { expireDateColor, formatExpireDate } from '@/lib/formatExpireDate'

interface TaskExpireDateProps {
	expiresAt: Date | string
}

const TaskExpireDate = ({ expiresAt }: TaskExpireDateProps) => {
	return (
		<>
			<span
				style={{
					color: expireDateColor(expiresAt),
				}}
				className="text-sm"
			>
				{formatExpireDate(expiresAt)}
			</span>
		</>
	)
}

export default TaskExpireDate
