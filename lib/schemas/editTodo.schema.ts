import { z } from 'zod'
import { tagSchema } from './tag.schema'
import { subtaskSchema } from './subtask.schema'

export const updateTodoTitleSchema = z.object({
  title: z.string().min(2),
})

export type UpdateTodoTitleSchema = z.infer<typeof updateTodoTitleSchema>

export const editTodoSchema = z
  .object({
    title: z.string().min(2),
    expirationDate: z.date().optional(),
    expirationTime: z.string(),
    tags: z.array(tagSchema),
    subtasks: z.array(subtaskSchema),
  })
  .superRefine((data, ctx) => {
    if (data.expirationTime !== '--:--' && !data.expirationDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Date is required when a specific time is specified',
        path: ['expirationDate'],
      })
    }
  })

export type EditTodoSchema = z.infer<typeof editTodoSchema>
