'use client'

import Comfirm from '@/components/shared/Common/Comfirm'
import DynamicIcon from '@/components/shared/Common/DynamicIcon'
import RenameListDialog from './RenameListDialog/RenameListDialog'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { EllipsisVertical, Pen, Trash } from 'lucide-react'
import ChangeListIcon from './ChangeListIcon/ChangeListIcon'
import { useBoolean } from '@/hooks'
import { useDeleteList } from '@/hooks/use-mutate-lists'

interface ListHeaderDropdownProps {
	listId: string
	listTitle: string
	icon: string | null
}

const ListHeaderDropdown = ({
	listId,
	listTitle,
	icon,
}: ListHeaderDropdownProps) => {
	const COMFIRM_TITLE = `Are you sure you want to delete "${listTitle}"?`
	const COMFIRM_DESCRIPTION = `This action cannot be undone. This will permanently delete the list "${listTitle}" and all of its tasks.`

	const { mutate: deleteList } = useDeleteList(listId, () => {
		setIsOpenDeleteComfirm(false)
	})
	const [isOpenDeleteComfirm, setIsOpenDeleteComfirm] = useBoolean()
	const [isOpenRenameDialog, setIsOpenRenameDialog] = useBoolean()
	const [isOpenChangeIconDialog, setIsOpenChangeIconDialog] = useBoolean()

	const handleDeleteList = () => {
		deleteList()
	}

	return (
		<div className="mr-5">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button size={'icon'} variant={'ghost'}>
						<EllipsisVertical />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-38" align="start">
					<DropdownMenuLabel>List&apos;s options</DropdownMenuLabel>
					<DropdownMenuGroup>
						<DropdownMenuItem
							onClick={() => {
								setIsOpenDeleteComfirm()
							}}
							variant="destructive"
						>
							Delete List
							<Trash />
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => {
								setIsOpenRenameDialog()
							}}
						>
							Rename List
							<Pen />
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => {
								setIsOpenChangeIconDialog()
							}}
						>
							Icon Change
							<DynamicIcon iconName={icon} />
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			<Comfirm
				open={isOpenDeleteComfirm}
				confirmText="Delete"
				onOpenChange={setIsOpenDeleteComfirm}
				description={COMFIRM_DESCRIPTION}
				title={COMFIRM_TITLE}
				onConfirm={handleDeleteList}
			/>
			<RenameListDialog
				listId={listId}
				listTitle={listTitle}
				open={isOpenRenameDialog}
				onOpenChange={setIsOpenRenameDialog}
			/>
			<ChangeListIcon
				listId={listId}
				onOpenChange={setIsOpenChangeIconDialog}
				open={isOpenChangeIconDialog}
			/>
		</div>
	)
}

export default ListHeaderDropdown
