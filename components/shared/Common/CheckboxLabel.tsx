import { Checkbox, CheckboxProps } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface CheckboxLabelProps extends CheckboxProps {
  label: string
  labelClassName?: string
  id: string
}

export default function CheckboxLabel({
  label,
  labelClassName,
  id,
  ...props
}: CheckboxLabelProps) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox {...props} id={id} />
      <Label className={labelClassName} htmlFor={id}>
        {label}
      </Label>
    </div>
  )
}
