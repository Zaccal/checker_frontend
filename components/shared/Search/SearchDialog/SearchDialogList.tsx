'use client'

import React from 'react'

interface SearchDialogChildren {
  children?: React.ReactNode[] | React.ReactNode
}

export function SearchDialogList({ children }: SearchDialogChildren) {
  return <div className="flex flex-col gap-5">{children}</div>
}
