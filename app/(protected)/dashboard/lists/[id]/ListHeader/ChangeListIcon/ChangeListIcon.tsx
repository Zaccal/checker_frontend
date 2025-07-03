import IconSelect from '@/components/shared/Common/IconSelect'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
} from '@/components/ui/dialog'
import { revalidateLists } from '@/lib/actions'
import Axios from '@/lib/axios'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'sonner'

interface ChangeListIconProps {
	open?: boolean
	onOpenChange: (open: boolean) => void
	listId: string
}

const ChangeListIcon = ({
	listId,
	onOpenChange,
	open,
}: ChangeListIconProps) => {
	const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	const changeHandle = async () => {
		if (!selectedIcon) return

		setIsLoading(true)
		try {
			await Axios.patch(`/lists/${listId}`, {
				icon: selectedIcon,
			})
			onOpenChange(false)
			setSelectedIcon(null)
			await revalidateLists()
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast.error('Failed to change the list icon', {
					description: error.message,
				})
			} else {
				toast.error('Failed to change the list icon', {
					description: 'unkown',
				})
			}
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Dialog
			open={open}
			onOpenChange={state => {
				setSelectedIcon(null)
				onOpenChange(state)
			}}
		>
			<DialogContent>
				<DialogTitle>Change List Icon</DialogTitle>
				<DialogDescription>
					Select a new icon for your list from the options below.
				</DialogDescription>
				<IconSelect
					disabled={isLoading}
					variant={iconName =>
						iconName === selectedIcon ? 'default' : 'outline'
					}
					onIconSelect={iconName => {
						if (iconName === selectedIcon) setSelectedIcon('')
						else setSelectedIcon(iconName)
					}}
				/>
				<DialogFooter>
					<DialogClose disabled={isLoading} className="outline-btn">
						Close
					</DialogClose>
					<Button onClick={changeHandle} disabled={!selectedIcon || isLoading}>
						Change
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default ChangeListIcon
