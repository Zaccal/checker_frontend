import Comfirm from '@/components/shared/Common/Comfirm'
import { useDeleteList } from '@/hooks/use-mutate-lists'
import { useListContext } from '@/hooks/useListContext'
import { type ControlledDialog } from '@/lib/types/components.type'

const DeleteList = ({ open, onOpenChange }: ControlledDialog) => {
  const { title, id: listId } = useListContext()
  const COMFIRM_TITLE = `Are you sure you want to delete "${title}"?`
  const COMFIRM_DESCRIPTION = `This action cannot be undone. This will permanently delete the list "${title}" and all of its tasks.`

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
