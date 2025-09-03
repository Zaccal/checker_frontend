import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'

interface SidebarListsLoadingFallbackProps {
  title: string
  countSkeleton?: number
}

const SidebarListsLoadingFallback = ({
  title,
  countSkeleton = 3,
}: SidebarListsLoadingFallbackProps) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarContent>
        <SidebarMenu>
          {Array.from({ length: countSkeleton }).map((_, index) => (
            <SidebarMenuItem key={index}>
              <Skeleton className="w-full h-7.5 rounded-md" />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </SidebarGroup>
  )
}

export default SidebarListsLoadingFallback
