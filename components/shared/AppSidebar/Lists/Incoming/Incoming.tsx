import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'
import ActiveLink from '../../../Common/ActiveLink'
import IncomingErrorFallback from './IncomingErrorFallback'
import type { TodoList } from 'checker_shared'
import DynamicIcon from '@/components/shared/Common/DynamicIcon'
import { fetchWithCookies } from '@/lib/actions'

export const Incoming = async () => {
	const response = await fetchWithCookies(
		`${process.env.NEXT_PUBLIC_API_URL}/lists/protected`,
		{
			next: {
				revalidate: 60,
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
										href={`/dashboard/lists/${data.id}`}
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
