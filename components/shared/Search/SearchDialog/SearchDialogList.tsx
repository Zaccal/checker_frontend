'use client'

import React from 'react'
import { searchStateStore } from './store'

interface SearchDialogChildren {
  children?: React.ReactNode[] | React.ReactNode
}

export function SearchDialogList({ children }: SearchDialogChildren) {
  const query = searchStateStore.use(state => state.searchQuery)

  if (!query) return null

  return <div className="flex flex-col gap-5">{children}</div>
}
