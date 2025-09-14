'use client'

import TodoCheckbox from '../../common/todoCheckbox'
import { todoContext } from './Todo'

export function TodoCheckboxItem() {
  const { id: taskId, title, completed } = todoContext.useSelect(state => state)

  return <TodoCheckbox id={taskId} label={title} initialState={completed} />
}
