'use client'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/components/ui/sidebar'
import ListsErrorFallback from './ListsErrorFallback'
import ListsItem from '../ListsItem'
import { useGetLists } from '@/hooks/index'
import SidebarListLoadingFallback from '../SidbarListsLoadingFallback'

const SidebarLists = () => {
  const { data: lists, isLoading, isError } = useGetLists()

  if (isLoading) {
    return <SidebarListLoadingFallback title="Lists" countSkeleton={4} />
  }

  if (isError) {
    return <ListsErrorFallback />
  }

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel className="font-bold">Lists</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {lists?.map(data => (
              <ListsItem data={data} key={data.id} />
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  )
}

export default SidebarLists
