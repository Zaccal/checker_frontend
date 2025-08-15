import { Checkbox, type CheckboxProps } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface TodoCheckboxProps extends CheckboxProps {
  id: string
  label: string
}

export default function TodoCheckbox({
  id,
  label,
  ...props
}: TodoCheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id={id} className="rounded-full" size="lg" {...props} />
      <Label
        htmlFor={id}
        className="font-bold peer-data-[state=checked]:line-throgh after:bg-muted-foreground peer-data-[state=checked]:text-muted-foreground relative after:absolute after:top-1/2 after:left-0 after:h-px after:w-full after:origin-bottom after:-translate-y-1/2 after:scale-x-0 after:transition-transform after:ease-in-out peer-data-[state=checked]:after:origin-bottom peer-data-[state=checked]:after:scale-x-100"
      >
        {label}
      </Label>
    </div>
  )
}
