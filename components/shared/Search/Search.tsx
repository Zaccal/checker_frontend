'use client'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

import { createStore } from '@/hooks'

const DEFAULT_VALUE = {
  openSearch: false,
}

export const searchStateStore = createStore(() => DEFAULT_VALUE)

export function SearchDialog() {
  const open = searchStateStore.use(state => state.openSearch)

  function handleSearchState(state: boolean) {
    searchStateStore.set({
      openSearch: state,
    })
  }

  return (
    <CommandDialog open={open} onOpenChange={handleSearchState}>
      <CommandInput placeholder="Type a command to search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Todos">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>.
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
