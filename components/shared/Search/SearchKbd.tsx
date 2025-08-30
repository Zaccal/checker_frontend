'use client'

import { useHotkeys } from '@/hooks'
import { searchStateStore } from '@/components/shared/Search/Search'
import { getPlatformShortcut } from '@/lib/getPlatformShortcut'

const SearchKbd = () => {
  const open = searchStateStore.use(state => state.openSearch)
  const { label, hotkey } = getPlatformShortcut()

  useHotkeys(hotkey, () => {
    searchStateStore.set({
      openSearch: !open,
    })
  })

  return (
    <>
      <div className="space-x-2 w-fit text-sm text-muted-foreground">
        <span>Search</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">{label}</span>
        </kbd>
      </div>
    </>
  )
}

export default SearchKbd
