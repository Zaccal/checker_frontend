import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'
import ActiveLink from '../../../Common/ActiveLink'
import { cookies } from 'next/headers'
import IncomingErrorFallback from './IncomingErrorFallback'
import type { TodoList } from 'checker_shared'
import DynamicIcon from '@/components/shared/Common/DynamicIcon'

export const Incoming = async () => {
	const cookie = (await cookies()).toString()
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/lists/protected`,
		{
			headers: {
				Cookie: cookie,
			},
		}
	)

	if (!response.ok) {
		return <IncomingErrorFallback />
	}

	const lists: TodoList[] = await response.json()

	return (
		<>
			<SidebarGroup>
				<SidebarGroupLabel className="font-bold">Incoming</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						{lists.map(data => (
							<SidebarMenuItem key={data.id}>
								<SidebarMenuButton asChild>
									<ActiveLink
										classNameeActive="bg-sidebar-accent"
										href={`dashboard/lists/${data.id}`}
									>
										<DynamicIcon iconName={data.icon} />
										<span>{data.title}</span>
									</ActiveLink>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>
		</>
	)
}
