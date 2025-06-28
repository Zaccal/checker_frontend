import { LucideProps } from 'lucide-react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'
import { Control } from 'react-hook-form'

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
	any,
	{
		title: string
		icon?: string | null
	}
>
