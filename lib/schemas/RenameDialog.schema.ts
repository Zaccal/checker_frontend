import { z } from 'zod'

export const RenameDialogSchema = z.object({
	newTitle: z
		.string()
		.min(2, 'Title is required')
		.max(50, 'Title must be less than 50 characters'),
})

export type RenameDialogSchemaType = z.infer<typeof RenameDialogSchema>
