'use client'

import React from 'react'
import { useDidUpdate, useSearch } from '@/hooks'
import { searchStateStore } from './store'
import { SearchDialogSkeleton } from './Skeleton'
import { SearchDialogFallback } from './Fallback'
import { SearchDialogItemTodo } from './SearchDialogItem'

export function SearchDialogSubtasksResult() {
  const query = searchStateStore.use(state => state.searchQuery)
  const { data, isPending, isError } = useSearch(query)
  const subtasks = data?.subtasks ?? []

  useDidUpdate(() => {
    if (!subtasks.length) {
      searchStateStore.set({
        notFoundSubtasks: true,
      })
    } else {
      searchStateStore.set({
        notFoundSubtasks: false,
      })
    }
  }, [subtasks])

  if (isPending) return <SearchDialogSkeleton />
  if (isError) return <SearchDialogFallback />

  return (
    <>
      {subtasks.map(subtask => (
        <SearchDialogItemTodo
          key={subtask.id}
          todo={subtask}
          typeData="subtask"
        />
      ))}
    </>
  )
}
