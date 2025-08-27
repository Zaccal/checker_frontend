import Comfirm from '@/components/shared/Common/Comfirm'
import { useDeleteList } from '@/hooks/use-mutate-lists'
import { type ControlledDialog } from '@/lib/types/components.type'
import { listContext } from '@/provider/ListProvider'

const DeleteList = ({ open, onOpenChange }: ControlledDialog) => {
  const { title, id: listId } = listContext.useSelect(state => state)
  const COMFIRM_TITLE = `Are you sure you want to delete "${title}"?`
  const COMFIRM_DESCRIPTION = `This action cannot be undone. This will permanently delete the list "${title}" and all of its tasks.`

  const { mutate: deleteList, isPending } = useDeleteList(listId, () => {
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
        disabled={isPending}
      />
    </>
  )
}

export default DeleteList
