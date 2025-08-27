import { ScrollArea } from '@/components/ui/scroll-area'

interface TaskListProps {
  children?: React.ReactNode | React.ReactNode[]
}

const TodoList = ({ children }: TaskListProps) => {
  return (
    <ScrollArea className="h-[83vh] w-full">
      <div className="mt-8 space-y-3">{children}</div>
    </ScrollArea>
  )
}

export default TodoList
