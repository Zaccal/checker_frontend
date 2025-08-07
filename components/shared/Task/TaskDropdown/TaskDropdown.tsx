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
import { useBoolean } from '@/hooks'
import TaskDropdownDelete from './TaskDropdownDelete/TaskDropdownDelete'

interface TaskDropdownProps {
	taskId: string
}

const TaskDropdown = ({ taskId }: TaskDropdownProps) => {
	const [comfirm, toggleComfirm] = useBoolean()

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
			<TaskDropdownDelete
				onOpenChange={toggleComfirm}
				open={comfirm}
				taskId={taskId}
			/>
		</>
	)
}

export default TaskDropdown
