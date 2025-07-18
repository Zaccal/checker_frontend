'use client'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import {
	CreateListSchema,
	type CreateListSchemaType,
} from '@/lib/schemas/CreateList.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import CreateListDialogCarousel from './CreateListDialogCarousel'
import CreateListDialogHeader from './CreateListDialogHeader'
import CreateListDialogFirstSlide from './CreateListDialogFirstSlide'
import CreateListDialogSecondSlide from './CreateListDialogSecondSlide'
import Axios from '@/lib/axios'
import { toast } from 'sonner'
import { revalidateLists } from '@/lib/actions'
import { useRouter } from 'next/navigation'
import type { TodoList } from 'checker_shared'
interface CreateListDialogProps {
	children?: ReactNode
}

const CreateListDialog = ({ children }: CreateListDialogProps) => {
	const [open, setOpen] = useState(false)
	const router = useRouter()
	const form = useForm<CreateListSchemaType>({
		resolver: zodResolver(CreateListSchema),
		defaultValues: {
			title: '',
			icon: null,
		},
	})
	const [step, setStep] = useState(0)
	const titleInput = form.watch('title')
	const iconInput = form.watch('icon')
	const { isSubmitting, errors } = form.formState

	const isDisabled = isSubmitting || titleInput.length < 2

	useEffect(() => {
		if (Object.keys(errors).length > 0) {
			setStep(0)
		}
	}, [errors])

	const onSubmit = async (data: CreateListSchemaType) => {
		try {
			const { data: newList } = await Axios.post<TodoList>('/lists', data)
			setOpen(false)
			toast.success('List created successfully!', {
				description: 'Your new list has been created.',
			})
			await revalidateLists()
			router.push(`/dashboard/lists/${newList.id}`)
		} catch (error) {
			toast.error('Failed to create list', {
				description: error instanceof Error ? error.message : 'Unknown error',
			})
		}
	}

	return (
		<Dialog
			open={open}
			onOpenChange={open => {
				setOpen(open)
				setStep(0)
				form.reset()
			}}
		>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<CreateListDialogHeader step={step} />
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<CreateListDialogCarousel
							step={step}
							setStep={setStep}
							disabled={isDisabled}
						>
							<CreateListDialogFirstSlide
								control={form.control}
								disabled={isSubmitting}
							/>
							<CreateListDialogSecondSlide
								currentState={iconInput}
								control={form.control}
								disabled={isSubmitting}
							/>
						</CreateListDialogCarousel>
					</form>
				</Form>
			</DialogContent>{' '}
		</Dialog>
	)
}

export default CreateListDialog
