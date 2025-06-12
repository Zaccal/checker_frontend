import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '../../ui/sidebar'
import UserNaigation from './UserNavigation'
import { Plus } from 'lucide-react'
import { Incoming } from './incoming'
import Lists from './Lists'
import AppSidebarHeader from './AppSidebarHeader'

const AppSidebar = () => {
	return (
		<Sidebar variant="inset" collapsible="icon">
			<SidebarHeader>
				<AppSidebarHeader />
			</SidebarHeader>
			<SidebarContent>
				<Incoming />
				<Lists />
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<Plus />
									<span>Add List</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<UserNaigation />
			</SidebarFooter>
		</Sidebar>
	)
}

export default AppSidebar
