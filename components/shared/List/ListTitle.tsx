'use client'

import { listContext } from './List'

export const ListTitle = () => {
  const title = listContext.useSelect(state => state.title)
  return <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
}
