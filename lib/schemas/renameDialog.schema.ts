import { z } from 'zod'

export const renameDialogSchema = z.object({
	newTitle: z
		.string()
		.min(2, 'Title is required')
		.max(50, 'Title must be less than 50 characters'),
})

export type RenameDialogSchema = z.infer<typeof renameDialogSchema>
