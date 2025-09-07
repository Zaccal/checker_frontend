import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/components/ui/sidebar'
import IncomingErrorFallback from './IncomingListsErrorFallback'
import type { TodoList } from 'checker_shared'
import ListsItem from '../ListsItem'
import { fetchAlias } from '@/lib/actions'

const IncomingLists = async () => {
  const response = await fetchAlias<TodoList[]>('lists/protected', {
    cache: 'force-cache',
    next: { tags: ['protected-lists'] },
  })
  const lists = response.data

  if (!response.ok) {
    return <IncomingErrorFallback />
  }

  if (!lists) {
    return <IncomingErrorFallback />
  }

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

export default IncomingLists
