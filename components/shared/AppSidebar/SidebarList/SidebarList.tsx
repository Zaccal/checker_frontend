import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/components/ui/sidebar'
import ListsErrorFallback from './ListsErrorFallback'
import type { TodoList } from 'checker_shared'
import { fetchWithCookies } from '@/lib/actions'
import ListsItem from './ListsItem'

const SidebarList = async () => {
  const response = await fetchWithCookies(`/lists`, {
    next: {
      tags: ['lists'],
      revalidate: 60,
    },
  })

  if (!response.ok) {
    return <ListsErrorFallback />
  }

  const lists = (await response.json()) as TodoList[]

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel className="font-bold">Lists</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {lists.map(data => (
              <ListsItem data={data} key={data.id} />
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  )
}

export default SidebarList
