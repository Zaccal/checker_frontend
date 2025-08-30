import { fetchWithCookies } from '@/lib/actions'
import type { TodoList as TypeTodoList } from 'checker_shared'
import { notFound } from 'next/navigation'
import {
  Todo,
  TodoCheckboxItem,
  TodoHeader,
  TodoOptions,
  TodoEditOption,
  TodoSubTasks,
  TodoFooter,
  TodoSubtasksAccordionTrigger,
  TodoDropdown,
  TodoDeleteOption,
  TodoList,
} from '@/components/shared/Todo/index'
import {
  List,
  ListChangeIconOption,
  ListDeleteOption,
  ListDropdown,
  ListHeader,
  ListRenameOption,
  ListTitle,
} from '@/components/shared/List/index'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Filter } from 'lucide-react'
import CreateTask from '@/components/shared/CreateTask/CreateTask'

interface ListIdPageProps {
  params: Promise<{ id: string }>
}

const page = async ({ params }: ListIdPageProps) => {
  const { id: todoListId } = await params
  const response = await fetchWithCookies(`/lists/${todoListId}`)

  if (response.status === 404) return notFound()

  if (!response.ok) throw new Error('Failed to fetch list')

  const list = (await response.json()) as TypeTodoList
  const todos = list.todos

  return (
    <div className="container">
      <List list={list}>
        <ListHeader>
          <ListTitle />
          <ListDropdown>
            <ListDeleteOption />
            <ListRenameOption />
            <ListChangeIconOption />
          </ListDropdown>
          <Separator className="my-4" />
          <div className="flex items-center gap-3">
            <CreateTask listId={list.id} />
            <Button variant={'outline'}>
              <Filter /> Filter
            </Button>
          </div>
        </ListHeader>
        <TodoList>
          {todos.map(todo => (
            <Todo key={todo.id} todo={todo}>
              <TodoHeader>
                <TodoCheckboxItem />
                <TodoOptions>
                  <TodoSubtasksAccordionTrigger />
                  <TodoDropdown>
                    <TodoDeleteOption />
                    <TodoEditOption />
                  </TodoDropdown>
                </TodoOptions>
              </TodoHeader>
              <TodoSubTasks />
              <TodoFooter />
            </Todo>
          ))}
        </TodoList>
      </List>
    </div>
  )
}

export default page
