import type { LucideProps } from 'lucide-react'
import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import type { Control } from 'react-hook-form'

export interface AppSidebar {
	title: string
	url: string
	icon: ForwardRefExoticComponent<
		Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
	>
	id: string | number
}

export type CreateListConrolType = Control<
	{
		title: string
		icon?: string | null
	},
	unknown,
	{
		title: string
		icon?: string | null
	}
>
