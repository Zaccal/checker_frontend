import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { TodoList } from 'checker_shared'
import { Filter, Plus } from 'lucide-react'

const ListHeader = ({ list }: { list: TodoList }) => {
	return (
		<>
			<h1 className="text-3xl font-bold">{list.title}</h1>
			<Separator className="my-4" />
			<div className="flex items-center gap-3">
				<Button>
					<Plus /> New Task
				</Button>
				<Button variant={'outline'}>
					<Filter /> Filter
				</Button>
			</div>
		</>
	)
}

export default ListHeader
