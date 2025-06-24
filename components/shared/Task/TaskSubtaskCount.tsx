import { ClipboardCheck } from 'lucide-react'

const TaskSubtaskCount = ({ count }: { count: number }) => {
	return (
		<div className="text-sm text-muted-foreground flex items-center gap-2">
			<ClipboardCheck size={17} />
			<span>{count}</span>
		</div>
	)
}

export default TaskSubtaskCount
