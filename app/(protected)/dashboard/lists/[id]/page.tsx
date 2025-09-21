import type { TodoList as TypeTodoList } from 'checker_shared'
import { notFound } from 'next/navigation'
import { List } from '@/components/shared/List/index'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Filter } from 'lucide-react'
import CreateTask from '@/components/shared/CreateTask/CreateTask'
import { fetchAlias } from '@/lib/actions'
import TodoContent from '@/components/shared/TodoContent/TodoContent'

interface ListIdPageProps {
  params: Promise<{ id: string }>
}

const page = async ({ params }: ListIdPageProps) => {
  const { id: todoListId } = await params
  const response = await fetchAlias<TypeTodoList>(`lists/${todoListId}`, {
    next: {
      tags: ['list-id'],
    },
    cache: 'no-store',
  })

  if (response.status === 404) return notFound()

  if (!response.ok) throw new Error('Failed to fetch list')
  if (!response.data) throw new Error('Failed to fetch list')

  const list = response.data
  const todos = list.todos

  return (
    <div className="container">
      <List.Root list={list}>
        <List.Header>
          <List.Title />
          <List.Dropdown>
            <List.DeleteOption />
            <List.RenameOption />
            <List.ChangeIconOption />
          </List.Dropdown>
        </List.Header>
        <Separator className="my-4" />
        <div className="flex items-center gap-3">
          <CreateTask listId={list.id} />
          <Button variant={'outline'}>
            <Filter /> Filter
          </Button>
        </div>
        <TodoContent todos={todos} />
      </List.Root>
    </div>
  )
}

export default page
