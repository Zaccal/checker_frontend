import type { ComponentProps } from 'react'
import type { Checkbox as CheckboxPrimitive } from 'radix-ui'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface CheckboxLabelProps
	extends ComponentProps<typeof CheckboxPrimitive.Root> {
	label: string
	id: string
}

export default function CheckboxLabel({
	label,
	id,
	...props
}: CheckboxLabelProps) {
	return (
		<div className="flex items-center gap-2">
			<Checkbox {...props} id={id} />
			<Label htmlFor={id}>{label}</Label>
		</div>
	)
}
