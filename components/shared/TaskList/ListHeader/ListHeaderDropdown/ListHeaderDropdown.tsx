'use client'

import DynamicIcon from '@/components/shared/Common/DynamicIcon'
import RenameList from './RenameList/RenameList'
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
import DeleteList from './DeleteList/DeleteList'

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
	const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useBoolean()
	const [isOpenRenameDialog, setIsOpenRenameDialog] = useBoolean()
	const [isOpenChangeIconDialog, setIsOpenChangeIconDialog] = useBoolean()

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
								setIsOpenDeleteDialog()
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
			<DeleteList
				isOpen={isOpenDeleteDialog}
				setOpen={setIsOpenDeleteDialog}
				listId={listId}
				listTitle={listTitle}
			/>
			<RenameList
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
