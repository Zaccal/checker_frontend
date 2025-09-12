'use client'

import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { searchStateStore } from '../Search/SearchDialog/store'

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
