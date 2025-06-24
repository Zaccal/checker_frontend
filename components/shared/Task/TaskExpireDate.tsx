import { expireDateColor, formatExpireDate } from '@/lib/formatExpireDate'
import { Calendar } from 'lucide-react'

interface TaskExpireDateProps {
	expiresAt: Date | string
}

const TaskExpireDate = ({ expiresAt }: TaskExpireDateProps) => {
	return (
		<>
			<div
				style={{
					color: expireDateColor(expiresAt),
				}}
				className="text-sm flex items-center gap-2"
			>
				<Calendar size={17} />
				<span>{formatExpireDate(expiresAt)}</span>
			</div>
		</>
	)
}

export default TaskExpireDate
