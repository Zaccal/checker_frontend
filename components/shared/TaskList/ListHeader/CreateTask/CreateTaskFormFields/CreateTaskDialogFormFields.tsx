import SelectDate from '@/components/shared/Common/SelectDate'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { type CreateTask } from '@/lib/schemas/CreateTask.schema'
import React from 'react'
import { type UseFormReturn } from 'react-hook-form'
import CreateTaskDialogFormFieldsSelect from './CreateTaskDialogSelect/CreateTaskDialogSelect'
import CreateTaskDialogSubtasks from './CreateTaskDialogSubtasks'
import CreateTaskDialogTime from './CreateTaskDialogTime'

interface CreateTaskDialogFormFieldsProps {
	form: UseFormReturn<CreateTask>
}

const CreateTaskDialogFormFields = ({
	form,
}: CreateTaskDialogFormFieldsProps) => {
	return (
		<>
			<FormField
				control={form.control}
				name="title"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Title</FormLabel>
						<FormMessage />
						<FormControl>
							<Input placeholder="Task title" {...field} />
						</FormControl>
					</FormItem>
				)}
			/>
			<div className="grid grid-cols-4 gap-3">
				<FormField
					control={form.control}
					name="expirationDate"
					render={({ field }) => (
						<FormItem className="col-span-3">
							<FormLabel>Expiration Date</FormLabel>
							<FormMessage />
							<FormControl>
								<SelectDate field={field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="expirationTime"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Expiration Time</FormLabel>
							<FormMessage />
							<FormControl>
								<CreateTaskDialogTime field={field} />
							</FormControl>
						</FormItem>
					)}
				/>
			</div>

			<FormField
				control={form.control}
				name="tags"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Tags</FormLabel>
						<FormMessage />
						<FormControl>
							<CreateTaskDialogFormFieldsSelect field={field} />
						</FormControl>
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="subtasks"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Subtasks</FormLabel>
						<FormMessage />
						<FormControl>
							<CreateTaskDialogSubtasks field={field} />
						</FormControl>
					</FormItem>
				)}
			/>
		</>
	)
}

export default CreateTaskDialogFormFields
