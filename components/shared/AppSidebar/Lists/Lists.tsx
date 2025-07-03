import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'
import ActiveLink from '../../Common/ActiveLink'
import ListsErrorFallback from './ListsErrorFallback'
import { TodoList } from 'checker_shared'
import DynamicIcon from '../../Common/DynamicIcon'
import { fetchWithCookies } from '@/lib/actions'
import cutTextByLength from '@/lib/cutTextByWordCount'

const Lists = async () => {
	const response = await fetchWithCookies(
		`${process.env.NEXT_PUBLIC_API_URL}/lists`,
		{
			next: {
				tags: ['lists'],
				revalidate: 60,
			},
		}
	)

	if (!response.ok) {
		return <ListsErrorFallback />
	}

	const lists: TodoList[] = await response.json()

	return (
		<>
			<SidebarGroup>
				<SidebarGroupLabel className="font-bold">Lists</SidebarGroupLabel>
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
										<span title={data.title.length >= 30 ? data.title : ''}>
											{cutTextByLength(data.title, 30)}
										</span>
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

export default Lists
