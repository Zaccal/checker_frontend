import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useBoolean } from '@/hooks'
import { Trash } from 'lucide-react'
import { listContext } from '../List'
import { useDeleteList } from '@/hooks/use-mutate-lists'
import Comfirm from '../../Common/Comfirm'

export const ListDeleteOption = () => {
  const [open, toggle] = useBoolean()
  const { title, id: listId } = listContext.useSelect(state => state)
  const COMFIRM_TITLE = `Are you sure you want to delete "${title}"?`
  const COMFIRM_DESCRIPTION = `This action cannot be undone. This will permanently delete the list "${title}" and all of its tasks.`

  const { mutate: deleteList, isPending } = useDeleteList(listId, () => {
    toggle(false)
  })

  const handleDeleteList = () => {
    deleteList()
  }

  return (
    <>
      <DropdownMenuItem
        onClick={e => {
          e.preventDefault()
          toggle()
        }}
        variant="destructive"
      >
        Delete List
        <Trash />
      </DropdownMenuItem>
      <Comfirm
        open={open}
        confirmText="Delete"
        onOpenChange={handleDeleteList}
        description={COMFIRM_DESCRIPTION}
        title={COMFIRM_TITLE}
        onConfirm={handleDeleteList}
        disabled={isPending}
      />
    </>
  )
}
