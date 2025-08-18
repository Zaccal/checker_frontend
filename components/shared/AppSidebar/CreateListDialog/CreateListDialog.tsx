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
import CreateListDialogCarousel from './CreateListDialogCarousel'
import CreateListDialogHeader from './CreateListDialogHeader'
import CreateListDialogFirstSlide from './CreateListDialogFirstSlide'
import CreateListDialogSecondSlide from './CreateListDialogSecondSlide'
import { useCreateList } from '@/hooks/use-mutate-lists'
import { useBoolean, useStep } from '@/hooks'
interface CreateListDialogProps {
  children?: ReactNode
}

const CreateListDialog = ({ children }: CreateListDialogProps) => {
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
  const { mutate: createList, isPending } = useCreateList(() => {
    setOpen(false)
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
        <CreateListDialogHeader step={step.currentStep} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CreateListDialogCarousel
              stepProps={step}
              disabled={isDisabledCarusel}
            >
              <CreateListDialogFirstSlide
                control={form.control}
                disabled={isPending}
              />
              <CreateListDialogSecondSlide
                currentState={iconInput}
                control={form.control}
                disabled={isPending}
              />
            </CreateListDialogCarousel>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateListDialog
