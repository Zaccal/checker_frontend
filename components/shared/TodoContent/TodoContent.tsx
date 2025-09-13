'use client'

import { useGetTodos } from '@/hooks'
import { Todo } from '../Todo'
import type { TodoFromList } from '@/lib/types/API.type'

interface TodoContentProps {
  initialData?: TodoFromList[]
  listId: string
}

const TodoContent = ({ initialData, listId }: TodoContentProps) => {
  const {
    data: todos,
    isError,
    error,
  } = useGetTodos({
    listId,
    initialData,
  })

  if (isError) throw new Error(error.message)

  return (
    <>
      <Todo.List>
        {todos?.map(todo => (
          <Todo.Root key={todo.id} todo={todo}>
            <Todo.Header>
              <Todo.CheckboxItem />
              <Todo.Options>
                <Todo.SubtasksAccordionTrigger />
                <Todo.Dropdown>
                  <Todo.DeleteOption />
                  <Todo.EditOption />
                </Todo.Dropdown>
              </Todo.Options>
            </Todo.Header>
            <Todo.SubTasks />
            <Todo.Footer />
          </Todo.Root>
        ))}
      </Todo.List>
    </>
  )
}

export default TodoContent
