'use client'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { EllipsisVertical, Trash } from 'lucide-react'
import Comfirm from '../Common/Comfirm'
import { useBoolean } from '@/hooks'
import { useDeleteTask } from '@/hooks/use-mutate-task'

interface TaskDropdownProps {
	taskId: string
}

const TaskDropdown = ({ taskId }: TaskDropdownProps) => {
	const [comfirm, toggleComfirm] = useBoolean()
	const { mutateAsync: deleteTask, isPending } = useDeleteTask(taskId)

	const deleteHadnler = async () => {
		await deleteTask()

		toggleComfirm()
	}

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button size={'icon'} variant={'ghost'}>
						<EllipsisVertical />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-38">
					<DropdownMenuLabel>Task&apos;s options</DropdownMenuLabel>
					<DropdownMenuGroup>
						<DropdownMenuItem
							onClick={() => {
								toggleComfirm()
							}}
							variant="destructive"
						>
							<Trash /> Delete the task
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			<Comfirm
				disabled={isPending}
				onConfirm={deleteHadnler}
				open={comfirm}
				onOpenChange={toggleComfirm}
				title="Are you sure you want to delete this task?"
				description="This action cannot be undone. The task will be permanently deleted."
			/>
		</>
	)
}

export default TaskDropdown
