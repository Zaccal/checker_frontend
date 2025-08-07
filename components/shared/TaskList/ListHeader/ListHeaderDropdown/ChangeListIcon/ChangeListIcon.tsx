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
import { useUpdateList } from '@/hooks/use-mutate-lists'
import { type ControlledDialog } from '@/lib/types/components.type'
import { useState } from 'react'

interface ChangeListIconProps extends ControlledDialog {
	listId: string
}

const ChangeListIcon = ({
	listId,
	onOpenChange,
	open,
}: ChangeListIconProps) => {
	const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
	const { mutate: updateList, isPending } = useUpdateList(listId, () => {
		onOpenChange(false)
		setSelectedIcon(null)
	})

	const changeHandle = () => {
		if (!selectedIcon) return

		updateList({
			icon: selectedIcon,
		})
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
					disabled={isPending}
					variant={iconName =>
						iconName === selectedIcon ? 'default' : 'outline'
					}
					onIconSelect={iconName => {
						if (iconName === selectedIcon) setSelectedIcon('')
						else setSelectedIcon(iconName)
					}}
				/>
				<DialogFooter>
					<DialogClose disabled={isPending} className="outline-btn">
						Close
					</DialogClose>
					<Button onClick={changeHandle} disabled={!selectedIcon || isPending}>
						Change
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default ChangeListIcon
