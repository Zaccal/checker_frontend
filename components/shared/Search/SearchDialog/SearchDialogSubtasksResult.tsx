'use client'

import React from 'react'
import { useSearch } from '@/hooks'
import { searchStateStore } from './store'
import { SearchDialogSekeleton } from './Skeleton'
import { SearchDialogFallback } from './Fallback'

export function SearchDialogSubtasksResult() {
  const query = searchStateStore.use(state => state.searchQuery)
  const { data, isPending, isError } = useSearch(query)

  if (isPending) return <SearchDialogSekeleton />
  if (isError) return <SearchDialogFallback />

  const { subtasks } = data

  if (!subtasks.length) {
    searchStateStore.set({
      notFoundSubtasks: true,
    })
  } else {
    searchStateStore.set({
      notFoundSubtasks: false,
    })
  }

  return (
    <>
      {subtasks.map(subtask => (
        <p key={subtask.id}>{subtask.title}</p>
      ))}
    </>
  )
}
