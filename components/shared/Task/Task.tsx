import TaskExpireDate from './TaskExpireDate'
import TaskSubtaskCount from './TaskSubtaskCount'
import TaskTags from './TaskTags'
import type { TodoFromList } from '@/lib/types/API.type'
import TodoCheckbox from '../Common/todoCheckbox'
import TaskDropdown from './TaskDropdown'

interface TaskProps {
	task: TodoFromList
}

const Task = ({ task }: TaskProps) => {
	return (
		<div className=" border-border border rounded-lg px-4 py-5 space-y-3">
			<div className="flex items-center justify-between">
				<TodoCheckbox id={task.id} label={task.title} />
				<TaskDropdown taskId={task.id} />
			</div>
			<div className="flex flex-col gap-1.5 items-start">
				<div className="flex items-center gap-4">
					{task.expiresAt && <TaskExpireDate expiresAt={task.expiresAt} />}
					{task.subTasks.length > 0 && (
						<TaskSubtaskCount count={task.subTasks.length} />
					)}

					{task.tags.length > 0 && <TaskTags tags={task.tags} />}
				</div>
			</div>
		</div>
	)
}

export default Task
