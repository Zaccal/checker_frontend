import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/components/ui/sidebar'
import IncomingErrorFallback from './IncomingErrorFallback'
import type { TodoList } from 'checker_shared'
import { fetchWithCookies } from '@/lib/actions'
import ListsItem from '../ListsItem'

export const Incoming = async () => {
  const response = await fetchWithCookies(`/lists/protected`, {
    next: {
      revalidate: 60,
    },
  })

  if (!response.ok) {
    return <IncomingErrorFallback />
  }

  const lists = (await response.json()) as TodoList[]

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel className="font-bold">Incoming</SidebarGroupLabel>
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
