import { fetchWithCookies } from '@/lib/actions'
import type { TodoList } from 'checker_shared'
import { notFound } from 'next/navigation'
import ListHeader from '@/components/shared/TaskList/ListHeader/ListHeader'
import TaskList from '@/components/shared/TaskList/TaskList'
import ListProvider from '@/provider/ListProvider'

interface ListIdPageProps {
  params: Promise<{ id: string }>
}

const page = async ({ params }: ListIdPageProps) => {
  const { id: todoListId } = await params
  const response = await fetchWithCookies(`/lists/${todoListId}`)

  if (response.status === 404) return notFound()

  if (!response.ok) throw new Error('Faild to fetch list')

  const list = (await response.json()) as TodoList

  return (
    <div className="container">
      <ListProvider initialValue={list}>
        <ListHeader />
        <TaskList todos={list.todos} />
      </ListProvider>
    </div>
  )
}

export default page
