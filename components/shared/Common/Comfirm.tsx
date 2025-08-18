import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useId } from 'react'

interface ComfirmProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onConfirm: () => void
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  disabled?: boolean
}

const Comfirm = ({
  onOpenChange,
  onConfirm,
  open,
  title,
  cancelText,
  confirmText,
  description,
  disabled,
}: ComfirmProps) => {
  const id = useId()
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm border-t-destructive">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Checkbox id={id} disabled={disabled} />
          <Label htmlFor={id}>Don&apos;t ask again</Label>
        </div>
        <DialogFooter className="grid grid-cols-2">
          <Button
            variant={'outline'}
            onClick={() => {
              if (onOpenChange) onOpenChange(false)
            }}
            disabled={disabled}
          >
            {cancelText ?? 'Cancel'}
          </Button>
          <Button
            disabled={disabled}
            variant={'destructive'}
            onClick={onConfirm}
          >
            {confirmText ?? 'Confirm'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Comfirm
