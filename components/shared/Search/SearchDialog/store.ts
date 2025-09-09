'use client'

import { createStore } from '@/hooks'

export const DEFAULT_VALUE = {
  openSearch: false,
  searchQuery: '',
  notFoundTodos: false,
  notFoundSubtasks: false,
}

export const searchStateStore = createStore(() => DEFAULT_VALUE)
