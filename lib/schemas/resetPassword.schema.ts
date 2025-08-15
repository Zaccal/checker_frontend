import { z } from 'zod'

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8),
    comfirmPassword: z.string(),
  })
  .refine(data => data.password === data.comfirmPassword, {
    message: 'Passwords do not match',
    path: ['comfirmPassword'],
  })

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
