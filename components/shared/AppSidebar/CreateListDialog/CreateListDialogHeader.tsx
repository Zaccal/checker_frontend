import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface CreateListDialogHeaderProps {
  isFirst: boolean
}

const CreateListDialogHeader = ({ isFirst }: CreateListDialogHeaderProps) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {isFirst ? 'Enter a name for your list' : 'Choose an Icon (Optinal)'}
        </DialogTitle>
        <DialogDescription>
          {isFirst
            ? 'Give your list a short and descriptive name. You can change it later.'
            : 'You can select an icon to represent your list, or skip this step and press Create to continue without one.'}
        </DialogDescription>
      </DialogHeader>
    </>
  )
}

export default CreateListDialogHeader
