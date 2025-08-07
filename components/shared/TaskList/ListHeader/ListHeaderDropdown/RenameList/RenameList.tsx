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
import { useUpdateList } from '@/hooks/use-mutate-lists'
import { renameDialogSchema } from '@/lib/schemas/RenameDialog.schema'
import type { RenameDialogSchema } from '@/lib/schemas/RenameDialog.schema'
import { type ControlledDialog } from '@/lib/types/components.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

interface RenameListDialogProps extends ControlledDialog {
	listTitle: string
	listId: string
}

const RenameList = ({
	onOpenChange,
	open,
	listTitle,
	listId,
}: RenameListDialogProps) => {
	const form = useForm({
		resolver: zodResolver(renameDialogSchema),
		defaultValues: {
			newTitle: listTitle,
		},
	})
	const { mutate: updateList, isPending } = useUpdateList(listId, () => {
		onOpenChange(false)
	})

	const submitHandler = ({ newTitle }: RenameDialogSchema) => {
		if (newTitle === listTitle) {
			onOpenChange(false)
			return
		}

		updateList({
			title: newTitle,
		})
	}

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
								disabled={isPending}
							>
								Cancel
							</DialogClose>
							<Button disabled={isPending} type="submit">
								Rename
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

export default RenameList
