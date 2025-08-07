import Comfirm from '@/components/shared/Common/Comfirm'
import { useDeleteTask } from '@/hooks/use-mutate-task'

interface TaskDropdownDeleteProps {
	open: boolean
	onOpenChange: (stete?: boolean) => void
	taskId: string
}

const TaskDropdownDelete = ({
	onOpenChange,
	open,
	taskId,
}: TaskDropdownDeleteProps) => {
	const { mutateAsync: deleteTask, isPending } = useDeleteTask(taskId)

	const deleteHadnler = async () => {
		await deleteTask()
		onOpenChange()
	}

	return (
		<>
			<Comfirm
				disabled={isPending}
				onConfirm={deleteHadnler}
				open={open}
				onOpenChange={onOpenChange}
				title="Are you sure you want to delete this task?"
				description="This action cannot be undone. The task will be permanently deleted."
			/>
		</>
	)
}

export default TaskDropdownDelete
