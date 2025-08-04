import { z } from 'zod'

// TODO: Separate tag schema to its own file

const tagSchema = z.object({
	id: z.string(),
	name: z.string(),
	color: z.string(),
	isLocal: z.boolean().optional(),
})

export type TagSchema = z.infer<typeof tagSchema>

// TODO: Create a complite option for subtasks
// TODO: Seperate subtask schema to its own file
export const subtaskSchema = z.object({
	id: z.string(),
	title: z.string().min(1),
})

export type SubtaskSchema = z.infer<typeof subtaskSchema>

export const createTaskSchema = z
	.object({
		title: z.string().min(2),
		expirationDate: z.date().optional(),
		expirationTime: z.string().optional(),
		tags: z.array(tagSchema).optional(),
		subtasks: z.array(subtaskSchema).optional(),
	})
	.superRefine(data => {
		if (!data.expirationDate && data.expirationTime) {
			data.expirationDate = new Date()
		}
	})

export type CreateTask = z.infer<typeof createTaskSchema>
