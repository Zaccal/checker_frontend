import Comfirm from '@/components/shared/Common/Comfirm'
import { useDeleteList } from '@/hooks/use-mutate-lists'

interface DeleteListProps {
	listTitle: string
	isOpen: boolean
	setOpen: (state: boolean) => void
	listId: string
}

const DeleteList = ({
	isOpen,
	setOpen,
	listTitle,
	listId,
}: DeleteListProps) => {
	const COMFIRM_TITLE = `Are you sure you want to delete "${listTitle}"?`
	const COMFIRM_DESCRIPTION = `This action cannot be undone. This will permanently delete the list "${listTitle}" and all of its tasks.`

	const { mutate: deleteList } = useDeleteList(listId, () => {
		setOpen(false)
	})

	const handleDeleteList = () => {
		deleteList()
	}

	return (
		<>
			<Comfirm
				open={isOpen}
				confirmText="Delete"
				onOpenChange={setOpen}
				description={COMFIRM_DESCRIPTION}
				title={COMFIRM_TITLE}
				onConfirm={handleDeleteList}
			/>
		</>
	)
}

export default DeleteList
