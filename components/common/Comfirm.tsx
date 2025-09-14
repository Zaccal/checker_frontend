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
import { createStore, useDidUpdate, useLocalStorage } from '@/hooks'
import { useId } from 'react'

export const comfirmStore = createStore({
  isHideComfirm: false,
})

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
  const { value: isHideComfirm, set: setIsHideComfirm } = useLocalStorage(
    'hideComfirm',
    false,
  )
  useDidUpdate(() => {
    comfirmStore.set({
      isHideComfirm,
    })
    if (isHideComfirm && open && onOpenChange) {
      onConfirm()
      onOpenChange(false)
    }
  }, [isHideComfirm, onConfirm, open, onOpenChange])

  if (isHideComfirm) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dialog-adaptive border-t-destructive">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={isHideComfirm}
            onCheckedChange={state => {
              setIsHideComfirm(state === true)
            }}
            id={id}
            disabled={disabled}
          />
          <Label htmlFor={id}>Don&apos;t ask again</Label>
        </div>
        <DialogFooter className="grid sm:grid-cols-2">
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
