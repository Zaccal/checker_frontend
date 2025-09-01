import { useQuery } from '@tanstack/react-query'
import qs from 'qs'
import { clientFetchJSON } from '@/lib/clientFetch'
import { Todo } from 'checker_shared'
import { Subtask } from 'checker_shared'

export function useSearch(query: string) {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => {
      const params = qs.stringify({
        query,
        limit: 5,
      })
      const todosPromise = clientFetchJSON<Todo[]>(`/todos/search?${params}`)
      const subtasksPromise = clientFetchJSON<Subtask[]>(
        `/subtasks/search?${params}`,
      )

      return Promise.all([todosPromise, subtasksPromise])
    },
  })
}
