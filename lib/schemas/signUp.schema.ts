import { z } from 'zod'

export const signUpSchema = z
	.object({
		email: z.string().email(),
		username: z
			.string()
			.min(2)
			.max(20)
			.regex(/^[a-zA-Z0-9_]+$/, {
				message: 'Username can only contain letters, numbers, and underscores',
			}),
		password: z.string().min(8),
		confirmPassword: z.string().min(8),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	})

export type TypeSingUpSchema = z.infer<typeof signUpSchema>
