import type { SubtaskFromList, TodoFromList } from '@/lib/types/API.type'
import TodoCheckbox from '../../../common/todoCheckbox'

interface SearchDialogItemTodo {
  todo: TodoFromList | SubtaskFromList
  typeData?: 'task' | 'subtask'
}

export function SearchDialogItemTodo({
  todo,
  typeData = 'task',
}: SearchDialogItemTodo) {
  return (
    <div className="flex items-center justify-between px-3 py-4 border-border border rounded-lg shadow-sm">
      <TodoCheckbox
        initialState={todo.completed}
        typeData={typeData}
        id={todo.id}
        label={todo.title}
      />
    </div>
  )
}
