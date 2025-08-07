import { z } from 'zod'

export const updateTaskTitleSchema = z.object({
	title: z.string().min(2),
})

export type UpdateTaskTitleSchema = z.infer<typeof updateTaskTitleSchema>
