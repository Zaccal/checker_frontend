import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'
import { CircleCheckBig } from 'lucide-react'
import Link from 'next/link'

const AppSidebarHeader = () => {
	return (
		<>
			<SidebarMenu>
				<SidebarMenuItem>
					{' '}
					<SidebarMenuButton>
						<Link href={'/dashboard'} className="flex gap-1 items-center">
							<CircleCheckBig className="!size-6" />
							<span className="text-base font-semibold">Checker.</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</>
	)
}

export default AppSidebarHeader
