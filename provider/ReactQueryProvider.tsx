'use client'
import { queryClient } from '@/lib/query'
import { QueryClientProvider } from '@tanstack/react-query'

import { type ReactNode } from 'react'

const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default ReactQueryProvider
