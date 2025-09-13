'use client'

import React from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { useHotkeys } from '@/hooks'
import { getPlatformShortcut } from '@/utils/getPlatformShortcut'
import { searchStateStore } from './store'

interface SearchDialogRootProps {
  children?: React.ReactNode[] | React.ReactNode
}

export function SearchDialogRoot({ children }: SearchDialogRootProps) {
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
