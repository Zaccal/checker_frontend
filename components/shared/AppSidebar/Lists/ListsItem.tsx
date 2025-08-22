'use client'

import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { TodoList } from 'checker_shared'
import ActiveLink from '../../Common/ActiveLink'
import DynamicIcon from '../../Common/DynamicIcon'
import cutTextByLength from '@/lib/cutTextByWordCount'

interface ListsItemProps {
  data: TodoList
}

const ListsItem = ({ data }: ListsItemProps) => {
  const { setOpenMobile } = useSidebar()

  return (
    <SidebarMenuItem
      onClick={() => {
        setOpenMobile(false)
      }}
    >
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
  )
}

export default ListsItem
