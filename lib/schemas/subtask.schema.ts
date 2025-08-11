import { z } from 'zod'

export const subtaskSchema = z.object({
	id: z.string(),
	title: z.string().min(1),
	completed: z.boolean().optional(),
})

export type SubtaskSchema = z.infer<typeof subtaskSchema>
