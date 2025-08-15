import Task from '@/components/shared/Task/Task'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { TodoFromList } from '@/lib/types/API.type'

interface TaskListProps {
  todos: TodoFromList[]
}

const TaskList = ({ todos }: TaskListProps) => {
  return (
    <ScrollArea className="h-[83vh] w-full">
      <div className="mt-8">
        {todos.map(data => (
          <Task key={data.id} task={data} />
        ))}
      </div>
    </ScrollArea>
  )
}

export default TaskList
