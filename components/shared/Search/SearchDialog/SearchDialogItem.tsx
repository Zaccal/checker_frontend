import { TodoFromList } from '@/lib/types/API.type'
import TodoCheckbox from '../../Common/todoCheckbox'

interface SearchDialogItemTodo {
  todo: TodoFromList
}

export function SearchDialogItemTodo({ todo }: SearchDialogItemTodo) {
  return (
    <div className="flex items-center justify-between bg-foreground rounded-lg shadow-sm">
      <TodoCheckbox
        initialState={todo.completed}
        id={todo.id}
        label={todo.title}
      />
    </div>
  )
}
