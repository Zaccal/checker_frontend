'use client'

import { createContext } from '@/hooks'
import { type TodoList } from 'checker_shared'

interface ListProps {
  list: TodoList
  children?: React.ReactNode | React.ReactNode[]
}

export const listContext = createContext<TodoList>()

export const List = ({ list, children }: ListProps) => {
  return (
    <listContext.Provider initialValue={list}>{children}</listContext.Provider>
  )
}
