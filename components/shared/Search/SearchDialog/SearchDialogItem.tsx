import { TodoFromList } from '@/lib/types/API.type'
import TodoCheckbox from '../../Common/todoCheckbox'

interface SearchDialogItemTodo {
  todo: TodoFromList
}

export function SearchDialogItemTodo({ todo }: SearchDialogItemTodo) {
  return (
    <div className="flex items-center justify-between bg-foreground rounded-lg shadow-sm">
      <TodoCheckbox id={todo.id} label="" />
    </div>
  )
}
