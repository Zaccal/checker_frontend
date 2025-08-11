import { z } from 'zod'
import { tagSchema } from './tag.schema'
import { subtaskSchema } from './subtask.schema'

export const updateTaskTitleSchema = z.object({
	title: z.string().min(2),
})

export type UpdateTaskTitleSchema = z.infer<typeof updateTaskTitleSchema>

export const editTaskSchema = z
	.object({
		title: z.string().min(2),
		expirationDate: z.date().optional(),
		expirationTime: z.string(),
		tags: z.array(tagSchema),
		subtasks: z.array(subtaskSchema),
	})
	.superRefine((data, ctx) => {
		if (data.expirationTime !== '--:--' && !data.expirationDate) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Date is required when a specific time is specified',
				path: ['expirationDate'],
			})
		}
	})

export type EditTaskSchema = z.infer<typeof editTaskSchema>
