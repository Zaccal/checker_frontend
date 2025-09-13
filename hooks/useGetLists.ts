import { axiosClient } from '@/lib/axiosClient'
import { useQuery } from '@tanstack/react-query'
import { TodoList } from 'checker_shared'
import { LISTS_QUERY_KEY } from '@/lib/constants/constants'

export const useGetLists = () => {
  return useQuery({
    queryKey: [LISTS_QUERY_KEY],
    queryFn: () =>
      axiosClient.get<TodoList[]>('/lists').then(data => data.data),
  })
}
