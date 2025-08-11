import { z } from 'zod'

export const tagSchema = z.object({
	id: z.string(),
	name: z.string(),
	isLocal: z.boolean(),
})

export type TagSchema = z.infer<typeof tagSchema>
