'use client'

import { Button } from '@/components/ui/button'
import { searchStateStore } from '../Search/Search'
import { Search } from 'lucide-react'

const SidebarSearchBtn = () => {
  const open = searchStateStore.use(state => state.openSearch)
  return (
    <Button
      variant={'ghost'}
      size={'icon'}
      onClick={() => {
        searchStateStore.set({
          openSearch: !open,
        })
      }}
    >
      <Search />
    </Button>
  )
}

export default SidebarSearchBtn
