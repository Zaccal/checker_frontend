import { Input } from '@/components/ui/input'
import { type CreateTask } from '@/lib/schemas/CreateTask.schema'
import { type ControllerRenderProps } from 'react-hook-form'

interface CreateTaskDialogTimeProps {
	field: ControllerRenderProps<CreateTask, 'expirationTime'>
}

const CreateTaskDialogTime = ({ field }: CreateTaskDialogTimeProps) => {
	return (
		<div className="flex flex-col gap-3">
			<Input
				type="time"
				id="time-picker"
				step="60"
				className="text-center bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
				{...field}
			/>
		</div>
	)
}

export default CreateTaskDialogTime
