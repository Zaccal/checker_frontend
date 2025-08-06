import { z } from 'zod'

// TODO: Separate tag schema to its own file

const tagSchema = z.object({
	id: z.string(),
	name: z.string(),
	isLocal: z.boolean().optional(),
})

export type TagSchema = z.infer<typeof tagSchema>

// TODO: Create a complete option for subtasks
// TODO: Separate subtask schema to its own file
export const subtaskSchema = z.object({
	id: z.string(),
	title: z.string().min(1),
})

export type SubtaskSchema = z.infer<typeof subtaskSchema>

export const createTaskSchema = z
	.object({
		title: z.string().min(2),
		expirationDate: z.date().optional(),
		expirationTime: z.string(),
		tags: z.array(tagSchema),
		subtasks: z.array(subtaskSchema),
	})
	.superRefine((data, ctx) => {
		if (
			data.expirationTime &&
			data.expirationTime !== '00:00' &&
			!data.expirationDate
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Date is required when time is specified',
				path: ['expirationDate'],
			})
		}
	})

export type CreateTask = z.infer<typeof createTaskSchema>
