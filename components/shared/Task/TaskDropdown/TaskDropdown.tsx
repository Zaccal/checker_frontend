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
import { EllipsisVertical, Pen, Trash } from 'lucide-react'
import { useBoolean } from '@/hooks'
import TaskDropdownDelete from './TaskDropdownDelete/TaskDropdownDelete'
import { type TodoFromList } from '@/lib/types/API.type'
import TaskDropdownRename from './TaskDropdownRename/TaskDropdownRename'

interface TaskDropdownProps {
	task: TodoFromList
}

const TaskDropdown = ({ task }: TaskDropdownProps) => {
	const [comfirm, toggleComfirm] = useBoolean()
	const [rename, toggleRename] = useBoolean()

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
							<Trash /> Delete
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => {
								toggleRename()
							}}
						>
							<Pen /> Rename
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			<TaskDropdownDelete
				onOpenChange={toggleComfirm}
				open={comfirm}
				taskId={task.id}
			/>
			<TaskDropdownRename
				open={rename}
				onOpenChange={toggleRename}
				task={task}
			/>
		</>
	)
}

export default TaskDropdown
