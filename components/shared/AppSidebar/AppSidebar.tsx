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
import IncomingLists from './Lists/IncomingLists/IncomingLists'
import AppSidebarHeader from './AppSidebarHeader'
import SidebarLists from './Lists/SidebarList/SidebarLists'
import { CreateListDialogComponent } from './CreateListDialog/CreateListDialogComponent'

const AppSidebar = () => {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <AppSidebarHeader />
      </SidebarHeader>
      <SidebarContent>
        <IncomingLists />
        <SidebarLists />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <CreateListDialogComponent>
                  <SidebarMenuButton>
                    <Plus />
                    <span>Add List</span>
                  </SidebarMenuButton>
                </CreateListDialogComponent>
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
