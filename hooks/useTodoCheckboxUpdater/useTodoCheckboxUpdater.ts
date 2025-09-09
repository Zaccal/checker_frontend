import { useCompleteTodo, useUpdateSubtask } from '@/hooks/index'
import { todoContext } from '@/components/shared/Todo/Todo'
import { useDebounceCallback } from '@/hooks'
import { TodoFromList } from '@/lib/types/API.type'

type UseTodoCheckboxUpdaterProps = {
  id: string
  typeData?: 'task' | 'subtask'
  onSuccess?: (data: any) => void
  onError?: () => void
}

export function useTodoCheckboxUpdater({
  id,
  typeData = 'task',
  onSuccess,
  onError,
}: UseTodoCheckboxUpdaterProps) {
  const { set: setTodo, value: todo } = todoContext.useSelect()

  const { mutate: completeTodo } = useCompleteTodo(
    id,
    data => {
      if (data)
        setTodo({
          ...data,
          dropdownOpen: false,
        })
      onSuccess?.(data)
    },
    onError,
  )

  const { mutate: updateSubtask } = useUpdateSubtask(
    id,
    data => {
      const updatedTodo: TodoFromList = {
        ...todo!,
        subTasks: todo!.subTasks.map(subtask => {
          if (subtask.id === id) {
            return {
              ...subtask,
              completed: data.completed,
            }
          }
          return subtask
        }),
      }
      setTodo({
        ...updatedTodo,
        dropdownOpen: false,
      })
      onSuccess?.(data)
    },
    onError,
  )

  const debounceUpdateHandler = useDebounceCallback((state: boolean) => {
    if (typeData === 'task') {
      completeTodo(state)
    } else {
      updateSubtask({ completed: state })
    }
  }, 200)

  return { debounceUpdateHandler }
}
