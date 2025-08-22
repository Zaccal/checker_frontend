import AppSidebar from '@/components/shared/AppSidebar/AppSidebar'
import SidebarMenuBtn from '@/components/shared/SidebarMenuBtn/SidebarMenuBtn'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { SIDEBAR_STATE_KEY } from '@/lib/constants/constants'
import { cookies } from 'next/headers'
import { type ReactNode } from 'react'

const layout = async ({ children }: { children: ReactNode }) => {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get(SIDEBAR_STATE_KEY)?.value !== 'false'

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
      <SidebarMenuBtn />
    </SidebarProvider>
  )
}

export default layout
