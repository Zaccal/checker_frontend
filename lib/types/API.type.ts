export interface TodoList {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  icon: string
}

export interface SubtaskFromList {
  id: string
  title: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
  todoId: string
}

export interface TagFromList {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  color: string
}

export interface TodoFromList {
  id: string
  title: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
  expiresAt: Date | null
  subTasks: SubtaskFromList[]
  tags: TagFromList[]
}

export type Mutate = 'POST' | 'PATCH' | 'PUT' | 'DELETE'
export interface CreateTodoData {
  title: string
  tags: (string | { name: string })[]
  subtasks: { id: string; title: string; completed?: boolean }[]
  expiresAt: string | undefined
  taskListId: string
}

export type UpdateTodoData = Omit<CreateTodoData, 'taskListId'>

export interface UpdateListData {
  title?: string
  icon?: string
}

export interface UpdateSubtaskData {
  title?: string
  completed?: boolean
}
