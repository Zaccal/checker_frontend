import { axiosClient } from '@/lib/axiosClient'
import { useQuery } from '@tanstack/react-query'
import { TodoList } from 'checker_shared'

export const LISTS_QUERY_KEY = 'lists'

export const useGetLists = () => {
  return useQuery({
    queryKey: [LISTS_QUERY_KEY],
    queryFn: () =>
      axiosClient.get<TodoList[]>('/lists').then(data => data.data),
  })
}
