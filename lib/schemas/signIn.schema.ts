import { z } from 'zod'
import { isEmail } from '../isEmail'

export const signInSchema = z
  .object({
    emailOrUsername: z.string().min(3),
    password: z.string().optional(),
    rememberMe: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (!isEmail(data.emailOrUsername) && !data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password is required when using username',
        path: ['password'],
      })
    }
  })

export type SignInSchema = z.infer<typeof signInSchema>
