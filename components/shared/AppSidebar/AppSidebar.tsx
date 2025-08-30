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
import { Incoming } from './SidebarList/Incoming/Incoming'
import AppSidebarHeader from './AppSidebarHeader'
import CreateListDialog from './CreateListDialog/CreateListDialog'
import { Suspense } from 'react'
import SidebarListLoadingFallback from './SidebarList/SidbarListLoadingFallback'
import SidebarList from './SidebarList/SidebarList'

const AppSidebar = () => {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <AppSidebarHeader />
      </SidebarHeader>
      <SidebarContent>
        <Suspense
          fallback={
            <SidebarListLoadingFallback title="Incoming" countSkeleton={3} />
          }
        >
          <Incoming />
        </Suspense>
        <Suspense
          fallback={
            <SidebarListLoadingFallback title="Lists" countSkeleton={2} />
          }
        >
          <SidebarList />
        </Suspense>
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
