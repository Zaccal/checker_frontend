import { z } from 'zod'

export const signUpSchema = z.object({
  email: z.string().email(),
  username: z.string().min(2).max(20).regex(/^\w+$/, {
    message: 'Username can only contain letters, numbers, and underscores',
  }),
  password: z.string().min(8),
})

export type TypeSingUpSchema = z.infer<typeof signUpSchema>
