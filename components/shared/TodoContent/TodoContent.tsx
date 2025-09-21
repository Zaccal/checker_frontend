'use client'

import { Todo } from '../Todo'
import type { TodoFromList } from '@/lib/types/API.type'

interface TodoContentProps {
  todos?: TodoFromList[]
}

const TodoContent = ({ todos }: TodoContentProps) => {
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
