import { fetchWithCookies } from '@/lib/actions'
import { TodoList } from 'checker_shared'
import { notFound } from 'next/navigation'
import ListHeader from './ListHeader'
import Task from '@/components/shared/Task/Task'

interface ListIdPageProps {
	params: Promise<{ id: string }>
}

const page = async ({ params }: ListIdPageProps) => {
	const { id: todoListId } = await params
	const response = await fetchWithCookies(
		`${process.env.NEXT_PUBLIC_API_URL}/lists/${todoListId}`
	)

	if (response.status === 404) return notFound()

	if (!response.ok) throw new Error('Faild to fetch list')

	const list: TodoList = await response.json()
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
