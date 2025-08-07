import Comfirm from '@/components/shared/Common/Comfirm'
import { useDeleteList } from '@/hooks/use-mutate-lists'
import { type ControlledDialog } from '@/lib/types/components.type'

interface DeleteListProps extends ControlledDialog {
	listTitle: string
	listId: string
}

const DeleteList = ({
	open,
	onOpenChange,
	listTitle,
	listId,
}: DeleteListProps) => {
	const COMFIRM_TITLE = `Are you sure you want to delete "${listTitle}"?`
	const COMFIRM_DESCRIPTION = `This action cannot be undone. This will permanently delete the list "${listTitle}" and all of its tasks.`

	const { mutate: deleteList } = useDeleteList(listId, () => {
		onOpenChange(false)
	})

	const handleDeleteList = () => {
		deleteList()
	}

	return (
		<>
			<Comfirm
				open={open}
				confirmText="Delete"
				onOpenChange={onOpenChange}
				description={COMFIRM_DESCRIPTION}
				title={COMFIRM_TITLE}
				onConfirm={handleDeleteList}
			/>
		</>
	)
}

export default DeleteList
