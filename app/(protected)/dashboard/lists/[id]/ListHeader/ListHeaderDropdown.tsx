'use client'

import Comfirm from '@/components/shared/Common/Comfirm'
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

interface ListHeaderDropdownProps {
	listId: string
	listTitle: string
}

const ListHeaderDropdown = ({ listId, listTitle }: ListHeaderDropdownProps) => {
	const COMFIRM_TITLE = `Are you sure you want to delete "${listTitle}"?`
	const COMFIRM_DESCRIPTION = `This action cannot be undone. This will permanently delete the list "${listTitle}" and all of its tasks.`

	const router = useRouter()
	const [isOpen, setIsOpen] = useState(false)

	const handleDeleteList = async () => {
		try {
			await Axios.delete(`/lists/${listId}`)
			await revalidateLists()

			setIsOpen(false)
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
							onClick={() => setIsOpen(true)}
							variant="destructive"
						>
							Delete List
							<Trash />
						</DropdownMenuItem>
						<DropdownMenuItem>
							Rename List
							<Pen />
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			<Comfirm
				open={isOpen}
				confirmText="Delete"
				onOpenChange={open => setIsOpen(open)}
				description={COMFIRM_DESCRIPTION}
				title={COMFIRM_TITLE}
				onConfirm={handleDeleteList}
			/>
		</div>
	)
}

export default ListHeaderDropdown
