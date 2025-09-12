'use client'

import React from 'react'
import { useDidUpdate, useSearch } from '@/hooks'
import { searchStateStore } from './store'
import { SearchDialogSkeleton } from './Skeleton'
import { SearchDialogFallback } from './Fallback'
import { SearchDialogItemTodo } from './SearchDialogItem'

export function SearchDialogTodosResult() {
  const query = searchStateStore.use(state => state.searchQuery)
  const { data, isPending, isError } = useSearch(query)
  const todos = data?.todos ?? []

  useDidUpdate(() => {
    if (!todos.length) {
      searchStateStore.set({
        notFoundTodos: true,
      })
    } else {
      searchStateStore.set({
        notFoundTodos: false,
      })
    }
  }, [todos])

  if (isPending) return <SearchDialogSkeleton />
  if (isError) return <SearchDialogFallback />

  return (
    <>
      {todos.map(todo => (
        <SearchDialogItemTodo key={todo.id} todo={todo} />
      ))}
    </>
  )
}
