import { axiosClient } from '@/lib/axiosClient'
import { useQuery } from '@tanstack/react-query'
import { TodoList } from 'checker_shared'

export const useGetLists = () => {
  return useQuery({
    queryKey: ['lists'],
    queryFn: () => axiosClient.get<TodoList[]>('/lists'),
    select: data => data.data,
  })
}
