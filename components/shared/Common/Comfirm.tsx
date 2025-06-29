import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'

interface ComfirmProps {
	open?: boolean
	onOpenChange?: (open: boolean) => void
	onConfirm: () => void
	title: string
	description?: string
	confirmText?: string
	cancelText?: string
}

const Comfirm = ({
	onOpenChange,
	onConfirm,
	open,
	title,
	cancelText,
	confirmText,
	description,
}: ComfirmProps) => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-sm">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose className="outline-btn">
						{cancelText || 'Cancel'}
					</DialogClose>
					<Button variant={'destructive'} onClick={onConfirm}>
						{confirmText && 'Confirm'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default Comfirm
