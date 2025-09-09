'use client'

import React from 'react'
import { cn } from '@/utils/utils'
import { searchStateStore } from './store'

interface SearchDialogChildren {
  children?: React.ReactNode[] | React.ReactNode
}

interface SearchDialogGroupProps extends SearchDialogChildren {
  heading?: string
  type: 'todos' | 'subtasks'
}

export function SearchDialogGroup({
  heading,
  children,
  type,
}: SearchDialogGroupProps) {
  const notFoundTodos = searchStateStore.use(state => state.notFoundTodos)
  const notFoundSubtasks = searchStateStore.use(state => state.notFoundSubtasks)

  const notFound = type === 'todos' ? notFoundTodos : notFoundSubtasks

  return (
    <div className={cn('block', notFound && 'hidden')}>
      <p className="font-bold text-sm text-muted-foreground">{heading}</p>
      <div className="space-y-2 mt-2">{children}</div>
    </div>
  )
}
