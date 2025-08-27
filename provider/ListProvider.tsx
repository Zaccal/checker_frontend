'use client'

import { createContext } from '@/hooks'
import { type TodoList } from 'checker_shared'

interface ListProviderProps {
  initialValue: TodoList
  children?: React.ReactNode | React.ReactNode[]
}

export const listContext = createContext<TodoList>()

const ListProvider = ({ initialValue, children }: ListProviderProps) => {
  return (
    <listContext.Provider initialValue={initialValue}>
      {children}
    </listContext.Provider>
  )
}

export default ListProvider
