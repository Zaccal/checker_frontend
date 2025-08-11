import { Input } from '@/components/ui/input'
import type { InputHTMLAttributes } from 'react'
import type { FieldValues, Path, ControllerRenderProps } from 'react-hook-form'

interface CreateTaskDialogTimeProps<T extends FieldValues = FieldValues>
	extends InputHTMLAttributes<HTMLInputElement> {
	field: ControllerRenderProps<T, Path<T>>
}

const SelectTime = <T extends FieldValues = FieldValues>({
	field,
	...props
}: CreateTaskDialogTimeProps<T>) => {
	return (
		<div className="flex flex-col gap-3">
			<Input
				type="time"
				id="time-picker"
				step="60"
				className="text-center bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
				{...props}
				{...field}
			/>
		</div>
	)
}

export default SelectTime
