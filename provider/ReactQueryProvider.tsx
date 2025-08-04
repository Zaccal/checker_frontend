'use client'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

import { ReactNode } from 'react'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 3,
			staleTime: 1000 * 60 * 5,
		},
	},
})

const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}

export default ReactQueryProvider
