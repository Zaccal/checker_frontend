import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useDebounceCallback } from '@/hooks'
import { useUpdateTaskTitle } from '@/hooks/use-mutate-task'
import { type TodoFromList } from '@/lib/types/API.type'
import { type ControlledDialog } from '@/lib/types/components.type'
import { useRef, useState } from 'react'

interface TaskDropdownRenameProps extends ControlledDialog {
	task: TodoFromList
}

const TaskDropdownRename = ({
	task,
	open,
	onOpenChange,
}: TaskDropdownRenameProps) => {
	const [newTitle, setNewTitle] = useState(task.title)
	const initalState = useRef(task.title)
	const { mutate: updateTask, isPending } = useUpdateTaskTitle(task.id)

	const handleUpdateTitle = useDebounceCallback(() => {
		if (newTitle.length >= 2) {
			updateTask({ title: newTitle })
		}
	}, 450)

	const handleReset = () => {
		setNewTitle(initalState.current)
		updateTask({ title: initalState.current })
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogTitle>Rename Task</DialogTitle>
				<DialogDescription>
					Enter a new name for your task below. Changes will be saved
					automatically as you type.
				</DialogDescription>

				<Input
					value={newTitle}
					onChange={event => {
						setNewTitle(event.target.value)
						handleUpdateTitle()
					}}
					placeholder="Enter a new title"
				/>
				<div className="flex justify-between items-center">
					<span className="text-muted-foreground text-sm">
						{isPending && 'Changes are applying...'}
					</span>
					<Button
						disabled={isPending}
						onClick={handleReset}
						variant={'outline'}
					>
						Reset
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default TaskDropdownRename
