import { fetchWithCookies } from '@/lib/actions'
import type { TodoList as TypeTodoList } from 'checker_shared'
import { notFound } from 'next/navigation'
import ListHeader from '@/components/shared/ListHeader/ListHeader'
import ListProvider from '@/provider/ListProvider'
import {
  Todo,
  TodoCheckboxItem,
  TodoHeader,
  TodoOptions,
  TodoEditOption,
  TodoSubTasks,
  TodoFooter,
  TodoSubtasksAccroudionTriger,
  TodoDropdown,
  TodoDeleteOption,
  TodoList,
} from '@/components/shared/Todo/index'

interface ListIdPageProps {
  params: Promise<{ id: string }>
}

const page = async ({ params }: ListIdPageProps) => {
  const { id: todoListId } = await params
  const response = await fetchWithCookies(`/lists/${todoListId}`)

  if (response.status === 404) return notFound()

  if (!response.ok) throw new Error('Faild to fetch list')

  const list = (await response.json()) as TypeTodoList
  const todos = list.todos

  return (
    <div className="container">
      <ListProvider initialValue={list}>
        <ListHeader />
        <TodoList>
          {todos.map(todo => (
            <Todo key={todo.id} todo={todo}>
              <TodoHeader>
                <TodoCheckboxItem />
                <TodoOptions>
                  <TodoSubtasksAccroudionTriger />
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
      </ListProvider>
    </div>
  )
}

export default page
