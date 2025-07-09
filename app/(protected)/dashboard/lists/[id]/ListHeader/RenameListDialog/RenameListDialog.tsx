import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
} from '@/components/ui/dialog'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { revalidateLists } from '@/lib/actions'
import Axios from '@/lib/axios'
import { RenameDialogSchema } from '@/lib/schemas/RenameDialog.schema'
import type { RenameDialogSchemaType } from '@/lib/schemas/RenameDialog.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface RenameListDialogProps {
	open?: boolean
	onOpenChange: (open: boolean) => void
	listTitle: string
	listId: string
}

const RenameListDialog = ({
	onOpenChange,
	open,
	listTitle,
	listId,
}: RenameListDialogProps) => {
	const form = useForm({
		resolver: zodResolver(RenameDialogSchema),
		defaultValues: {
			newTitle: listTitle,
		},
	})

	const submitHandler = async ({ newTitle }: RenameDialogSchemaType) => {
		if (newTitle === listTitle) {
			onOpenChange(false)
			return
		}

		try {
			await Axios.patch(`/lists/${listId}`, {
				title: newTitle,
			})
			onOpenChange(false)
			await revalidateLists()
		} catch (error) {
			toast.error('Failed to rename list', {
				description: axios.isAxiosError(error)
					? error.message
					: 'An error occurred while trying to rename the list.',
			})
		}
	}
	const { isSubmitting } = form.formState

	return (
		<Dialog
			open={open}
			onOpenChange={openPar => {
				onOpenChange(openPar)
				form.reset({
					newTitle: listTitle,
				})
			}}
		>
			<DialogContent>
				<DialogTitle>Rename List</DialogTitle>
				<DialogDescription>
					Enter a new title for the list &quot;{listTitle}&quot;.
				</DialogDescription>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(submitHandler)}
						className="space-y-4"
					>
						<FormField
							control={form.control}
							name="newTitle"
							render={({ field }) => (
								<FormItem>
									<FormMessage />
									<Input
										placeholder="New list title"
										{...field}
										className="w-full"
									/>
								</FormItem>
							)}
						/>
						<DialogFooter>
							<DialogClose
								className="outline-btn"
								type="button"
								disabled={isSubmitting}
							>
								Cancel
							</DialogClose>
							<Button disabled={isSubmitting} type="submit">
								Rename
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

export default RenameListDialog
