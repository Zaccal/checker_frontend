import { axiosClient } from '@/lib/axiosClient'
import { TodoFromList } from '@/lib/types/API.type'
import { useQuery } from '@tanstack/react-query'
import { TODO_QUERY_KEY } from '@/lib/constants/constants'

interface UseGetTodosOptions {
  initialData?: TodoFromList[]
  listId: string
}

export const useGetTodos = ({ listId, initialData }: UseGetTodosOptions) => {
  return useQuery({
    queryKey: [TODO_QUERY_KEY, listId],
    queryFn: () =>
      axiosClient
        .get<TodoFromList[]>(`/todos/list/${listId}`)
        .then(data => data.data),
    initialData,
  })
}
