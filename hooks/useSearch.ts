import { useQuery } from '@tanstack/react-query'
import qs from 'qs'
import { Todo } from 'checker_shared'
import { Subtask } from 'checker_shared'
import { axiosClient } from '@/lib/axiosClient'

export const useSearch = (query: string) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      const params = qs.stringify({
        query,
        limit: 5,
      })
      const todosPromise = axiosClient.get<Todo[]>(`/todos/search?${params}`)
      const subtasksPromise = axiosClient.get<Subtask[]>(
        `/subtasks/search?${params}`,
      )

      const result = await Promise.all([todosPromise, subtasksPromise])

      return {
        todos: result[0].data,
        subtasks: result[1].data,
      }
    },
  })
}
