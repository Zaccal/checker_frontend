'use client'

import React, { type InputHTMLAttributes, useState } from 'react'
import { InputIcon } from '@/components/shared/Common/InputIcon'
import { Search } from 'lucide-react'
import { useDebounceCallback } from '@/hooks'
import { searchStateStore } from './store'

export function SearchDialogInput(
  props: InputHTMLAttributes<HTMLInputElement>,
) {
  const searchQuery = searchStateStore.use(state => state.searchQuery)
  const [value, setValue] = useState(searchQuery)

  const changeSearchQueryHandler = useDebounceCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.value) {
        searchStateStore.set({
          notFoundSubtasks: false,
          notFoundTodos: false,
        })
      }

      searchStateStore.set({
        searchQuery: e.target.value,
      })
    },
    500,
  )

  return (
    <InputIcon
      value={value}
      onChange={e => {
        setValue(e.target.value)
        changeSearchQueryHandler(e)
      }}
      className="w-full"
      icon={<Search />}
      {...props}
    />
  )
}
