'use client'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import {
  CreateListSchema,
  type CreateListSchemaType,
} from '@/lib/schemas/createList.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { CreateListDialog } from './index'
import { useBoolean, useStep } from '@/hooks'
import { useCreateList } from '@/hooks/useMutateLists'
interface CreateListDialogProps {
  children?: ReactNode
}

export const CreateListDialogComponent = ({
  children,
}: CreateListDialogProps) => {
  const [open, setOpen] = useBoolean()
  const form = useForm<CreateListSchemaType>({
    resolver: zodResolver(CreateListSchema),
    defaultValues: {
      title: '',
      icon: null,
    },
  })
  const step = useStep({
    initial: 1,
    max: 2,
  })
  const { mutate: createList, isPending } = useCreateList({
    onSuccess: () => {
      setOpen(false)
    },
  })

  const titleInput = form.watch('title')
  const iconInput = form.watch('icon')
  const { errors } = form.formState

  const isDisabledCarusel = isPending || titleInput.length < 2

  useEffect(() => {
    if (step.isLast && !isPending) step.reset()
  }, [errors])

  const onSubmit = (data: CreateListSchemaType) => {
    createList(data)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={open => {
        setOpen(open)
        step.reset()
        form.reset()
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <CreateListDialog.Header isFirst={step.isFirst} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CreateListDialog.Carousel
              stepProps={step}
              disabled={isDisabledCarusel}
            >
              <CreateListDialog.FirstSlide
                control={form.control}
                disabled={isPending}
              />
              <CreateListDialog.SecondSlide
                currentState={iconInput}
                control={form.control}
                disabled={isPending}
              />
            </CreateListDialog.Carousel>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
