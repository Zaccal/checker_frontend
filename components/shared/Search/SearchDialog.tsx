'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import React, { type InputHTMLAttributes, useState } from 'react'
import { InputIcon } from '../Common/InputIcon'
import { Search } from 'lucide-react'
import {
  createStore,
  useDebounceCallback,
  useHotkeys,
  useSearch,
} from '@/hooks'
import { getPlatformShortcut } from '@/utils/getPlatformShortcut'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/utils/utils'

const DEFAULT_VALUE = {
  openSearch: false,
  notFound: false,
  searchQuery: '',
}

export const searchStateStore = createStore(() => DEFAULT_VALUE)

interface SearchDialogChildren {
  children?: React.ReactNode[] | React.ReactNode
}

export function SearchDialog({ children }: SearchDialogChildren) {
  const { hotkey } = getPlatformShortcut()
  const open = searchStateStore.use(state => state.openSearch)

  useHotkeys(hotkey, () => {
    searchStateStore.set({
      openSearch: !open,
    })
  })

  function openChangeHandler(state: boolean) {
    searchStateStore.set({
      openSearch: state,
    })
  }

  return (
    <Dialog open={open} onOpenChange={openChangeHandler}>
      <DialogContent
        className="px-2 py-2 border-t-none"
        showCloseButton={false}
        aria-describedby=""
      >
        <DialogTitle className="sr-only">Search</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export function SearchDialogInput(
  props: InputHTMLAttributes<HTMLInputElement>,
) {
  const searchQuery = searchStateStore.use(state => state.searchQuery)
  const [value, setValue] = useState(searchQuery)

  const changeSearchQueryHandler = useDebounceCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
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

export function SearchDialogEmpty({ children }: SearchDialogChildren) {
  const notFound = searchStateStore.use(state => state.notFound)

  if (!notFound) return null

  return (
    <span className="text-muted-foreground text-center mt-8">{children}</span>
  )
}

export function SearchDialogList({ children }: SearchDialogChildren) {
  return <div className="flex flex-col gap-5">{children}</div>
}

interface SearchDialogGroupProps extends SearchDialogChildren {
  heading?: string
}

export function SearchDialogGroup({
  heading,
  children,
}: SearchDialogGroupProps) {
  const notFound = searchStateStore.use(state => state.notFound)

  return (
    <div className={cn('block', notFound && 'hidden')}>
      <p className="font-bold text-sm text-muted-foreground">{heading}</p>
      <div className="space-y-2 mt-2">{children}</div>
    </div>
  )
}

export function SearchDialogTodosResult() {
  const query = searchStateStore.use(state => state.searchQuery)
  const { data, isPending, isError } = useSearch(query)

  if (isPending) return <SearchDialogSekeleton />

  if (isError) return <SearchDialogFallback />

  const { todos } = data

  if (!todos.length) {
    searchStateStore.set({
      notFound: true,
    })

    return null
  }

  searchStateStore.set({
    notFound: false,
  })

  return (
    <>
      {todos.map(todo => (
        <p key={todo.id}>{todo.title}</p>
      ))}
    </>
  )
}

function SearchDialogFallback() {
  return (
    <p className="text-center text-destructive mt-8">Something went wrong</p>
  )
}

function SearchDialogSekeleton() {
  return new Array(3)
    .fill(0)
    .map((_, index) => <Skeleton key={index} className="w-full h-8" />)
}
