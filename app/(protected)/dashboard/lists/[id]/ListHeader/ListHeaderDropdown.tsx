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
import { revalidateLists } from '@/lib/actions'
import Axios from '@/lib/axios'
import axios from 'axios'
import { EllipsisVertical, Pen, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import ChangeListIcon from './ChangeListIcon/ChangeListIcon'

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

	const router = useRouter()
	const [isOpenDeleteComfirm, setIsOpenDeleteComfirm] = useState(false)
	const [isOpenRenameDialog, setIsOpenRenameDialog] = useState(false)
	const [isOpenChangeIconDialog, setIsOpenChangeIconDialog] = useState(false)

	const handleDeleteList = async () => {
		try {
			await Axios.delete(`/lists/${listId}`)
			await revalidateLists()

			setIsOpenDeleteComfirm(false)
			toast.success('List deleted successfully')
			router.push('/dashboard')
		} catch (error) {
			toast.error('List deletion failed', {
				description: axios.isAxiosError(error)
					? error.message
					: 'An error occurred while trying to delete the list.',
			})
		}
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
					<DropdownMenuLabel>List's options</DropdownMenuLabel>
					<DropdownMenuGroup>
						<DropdownMenuItem
							onClick={() => setIsOpenDeleteComfirm(true)}
							variant="destructive"
						>
							Delete List
							<Trash />
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setIsOpenRenameDialog(true)}>
							Rename List
							<Pen />
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setIsOpenChangeIconDialog(true)}>
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
