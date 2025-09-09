'use client'

import React from 'react'
import { searchStateStore } from './store'

interface SearchDialogChildren {
  children?: React.ReactNode[] | React.ReactNode
}

export function SearchDialogEmpty({ children }: SearchDialogChildren) {
  const notFoundTodos = searchStateStore.use(state => state.notFoundTodos)
  const notFoundSubtasks = searchStateStore.use(state => state.notFoundSubtasks)

  if (!notFoundTodos || !notFoundSubtasks) return null

  return (
    <span className="text-muted-foreground text-center mt-8">{children}</span>
  )
}
