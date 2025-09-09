'use client'

import React from 'react'
import { useSearch } from '@/hooks'
import { searchStateStore } from './store'
import { SearchDialogSekeleton } from './Skeleton'
import { SearchDialogFallback } from './Fallback'

export function SearchDialogTodosResult() {
  const query = searchStateStore.use(state => state.searchQuery)
  const { data, isPending, isError } = useSearch(query)

  if (isPending) return <SearchDialogSekeleton />
  if (isError) return <SearchDialogFallback />

  const { todos } = data

  if (!todos.length) {
    searchStateStore.set({
      notFoundTodos: true,
    })
  } else {
    searchStateStore.set({
      notFoundTodos: false,
    })
  }

  return (
    <>
      {todos.map(todo => (
        <p key={todo.id}>{todo.title}</p>
      ))}
    </>
  )
}
