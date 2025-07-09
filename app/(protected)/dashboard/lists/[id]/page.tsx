import { fetchWithCookies } from '@/lib/actions'
import type { TodoList } from 'checker_shared'
import { notFound } from 'next/navigation'
import ListHeader from './ListHeader/ListHeader'
import Task from '@/components/shared/Task/Task'

interface ListIdPageProps {
	params: Promise<{ id: string }>
}

const page = async ({ params }: ListIdPageProps) => {
	const { id: todoListId } = await params
	const response = await fetchWithCookies(`/lists/${todoListId}`)

	if (response.status === 404) return notFound()

	if (!response.ok) throw new Error('Faild to fetch list')

	const list = (await response.json()) as TodoList
	const todos = list.todos

	return (
		<div className="container">
			<ListHeader list={list} />
			<div className="mt-8">
				{todos.map(data => (
					<Task key={data.id} task={data} />
				))}
			</div>
		</div>
	)
}

export default page
