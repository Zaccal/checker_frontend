import { BriefcaseBusiness, Calendar, House, Inbox } from 'lucide-react'
import { AppSidebar } from '@/lib/types/components.type'

export const SIDEBAR_ITEMS_DEFAULT: AppSidebar[] = [
	{
		title: 'Inbox',
		icon: Inbox,
		url: '/inbox',
		id: 1,
	},
	{
		title: 'Journal',
		icon: Calendar,
		url: '/journal',
		id: 2,
	},
]

export const SIDEBAR_ITEMS: AppSidebar[] = [
	{
		title: 'Work',
		icon: BriefcaseBusiness,
		url: '/work',
		id: 1,
	},
	{
		title: 'House deals',
		icon: House,
		url: '/house',
		id: 2,
	},
]

export const ICON_RENDER_LIMIT = 128

export const SIDEBAR_STATE_KEY = 'sidebar:state'
