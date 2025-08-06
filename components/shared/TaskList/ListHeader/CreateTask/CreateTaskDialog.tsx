'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import {
	type CreateTask,
	createTaskSchema,
} from '@/lib/schemas/CreateTask.schema'
import CreateTaskDialogFormFields from './CreateTaskFormFields/CreateTaskDialogFormFields'
import { combineTimeDate } from '@/lib/combineTimeDate'

interface CreateTaskDialogProps {
	listId: string
}

const CreateTaskDialog = ({ listId }: CreateTaskDialogProps) => {
	const form = useForm<CreateTask>({
		resolver: zodResolver(createTaskSchema),
		defaultValues: {
			title: '',
			expirationDate: undefined,
			tags: [],
			subtasks: [],
			expirationTime: '00:00',
		},
	})

	const onSubmit = (data: CreateTask) => {
		const taskDate = combineTimeDate(data.expirationDate, data.expirationTime)
		console.log(listId, taskDate)
	}

	return (
		<Dialog
			onOpenChange={state => {
				if (!state) form.reset()
			}}
		>
			<DialogTrigger asChild>
				<Button>
					<Plus /> New Task
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create New Task</DialogTitle>
					<DialogDescription>
						Enter the details for your new task below.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<CreateTaskDialogFormFields form={form} />
						<Button type="submit" className="w-full">
							Create
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

export default CreateTaskDialog
