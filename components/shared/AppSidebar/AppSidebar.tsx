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
import UserNaigation from './UserNavigation/UserNavigation'
import { Plus } from 'lucide-react'
import { Incoming } from './Lists/Incoming/Incoming'
import Lists from './Lists/Lists'
import AppSidebarHeader from './AppSidebarHeader'
import CreateListDialog from './CreateListDialog/CreateListDialog'

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
								<CreateListDialog>
									<SidebarMenuButton>
										<Plus />
										<span>Add List</span>
									</SidebarMenuButton>
								</CreateListDialog>
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
