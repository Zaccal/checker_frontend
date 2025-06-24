'use client'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import {
	CreateListSchema,
	CreateListSchemaType,
} from '@/lib/schemas/CreateList.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'
import CreateListDialogCarousel from './CreateListDialogCarousel'
import CreateListDialogHeader from './CreateListDialogHeader'
import CreateListDialogFirstSlide from './CreateListDialogFirstSlide'
import CreateListDialogSecondSlide from './CreateListDialogSecondSlide'

interface CreateListDialogProps {
	children?: ReactNode
}

const CreateListDialog = ({ children }: CreateListDialogProps) => {
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
	const { isSubmitting } = form.formState

	const isDisabled = isSubmitting || titleInput.length < 2

	const onSubmit = (data: CreateListSchemaType) => {
		console.log(data)
	}

	return (
		<Dialog
			onOpenChange={() => {
				form.reset()
				setStep(0)
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
