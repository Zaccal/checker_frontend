import { z } from 'zod'

export const renameListSchema = z.object({
  newTitle: z
    .string()
    .min(2, 'Title is required')
    .max(50, 'Title must be less than 50 characters'),
})

export type RenameListSchema = z.infer<typeof renameListSchema>
