import { Checkbox } from '@/components/ui/checkbox'
import { Todo } from 'checker_shared'
import TaskExpireDate from './TaskExpireDate'
import TaskSubtaskCount from './TaskSubtaskCount'
import TaskTags from './TaskTags'

interface TaskProps {
	task: Todo
}

const Task = ({ task }: TaskProps) => {
	return (
		<div className=" border-border border rounded-lg px-4 py-5 flex items-start gap-3">
			<Checkbox size="lg" className="mt-0.5" />
			<div className="flex flex-col gap-1.5 items-start">
				<p className="text-md font-semibold">{task.title}</p>
				<div className="flex gap-4">
					{task.expiresAt && <TaskExpireDate expiresAt={task.expiresAt} />}
					{task.subTasks.length > 0 && (
						<TaskSubtaskCount count={task.subTasks.length} />
					)}
				</div>

				{task.tags.length > 0 && <TaskTags tags={task.tags} />}
			</div>
		</div>
	)
}

export default Task
