import { z } from 'zod'
import { tagSchema } from './tag.schema'
import { subtaskSchema } from './subtask.schema'

export const createTaskSchema = z
  .object({
    title: z.string().min(2),
    expirationDate: z.date().optional(),
    expirationTime: z.string().optional(),
    tags: z.array(tagSchema),
    subtasks: z.array(subtaskSchema),
  })
  .superRefine((data, ctx) => {
    if (
      data.expirationTime &&
      data.expirationTime !== '--:--' &&
      !data.expirationDate
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Date is required when a specific time is specified',
        path: ['expirationDate'],
      })
    }
  })

export type CreateTask = z.infer<typeof createTaskSchema>
