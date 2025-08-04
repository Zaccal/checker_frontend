import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { type SubtaskSchema } from '@/lib/schemas/CreateTask.schema'
import { Trash } from 'lucide-react'

interface SubtaskProps extends SubtaskSchema {
	onRemove: (id: string) => void
}

const Subtask = ({ id, title, onRemove }: SubtaskProps) => {
	return (
		<div className="border border-border rounded-md flex items-center justify-between p-3">
			<div className="flex items-center gap-3">
				<Checkbox size="lg" />
				<p className="text-sm">{title}</p>
			</div>
			<Button
				onClick={() => {
					onRemove(id)
				}}
				size={'icon'}
				variant={'destructive'}
			>
				<Trash />
			</Button>
		</div>
	)
}

export default Subtask
