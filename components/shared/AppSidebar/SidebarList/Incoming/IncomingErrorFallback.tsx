import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const IncomingErrorFallback = () => {
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel className="font-bold">Incoming</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <span className="text-red-500">Failed to load lists.</span>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  )
}

export default IncomingErrorFallback
