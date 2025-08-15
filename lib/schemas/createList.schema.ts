import { z } from 'zod'

export const CreateListSchema = z.object({
  title: z
    .string()
    .min(2, 'Title is required')
    .max(50, 'Title must be less than 50 characters'),
  icon: z.string().nullable().optional(),
})

export type CreateListSchemaType = z.infer<typeof CreateListSchema>
