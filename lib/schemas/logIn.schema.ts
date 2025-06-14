import { z } from 'zod'
import { isEmail } from '../isEmail'

export const logInSchema = z
	.object({
		emailOrUsername: z.string().min(3),
		password: z.string().optional(),
	})
	.superRefine((data, ctx) => {
		if (!isEmail(data.emailOrUsername)) {
			if (!data.password) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Password is required when using username',
					path: ['password'],
				})
			}
		}
	})

export type TypeLoginSchema = z.infer<typeof logInSchema>
