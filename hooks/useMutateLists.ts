import { axiosClient } from '@/lib/axiosClient'
import { queryClient } from '@/lib/query'
import { CreateListSchemaType } from '@/lib/schemas/createList.schema'
import { useMutation } from '@tanstack/react-query'
import { TodoList } from 'checker_shared'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { LISTS_QUERY_KEY } from '@/lib/constants/constants'
import type { UseMutationOptions } from '@tanstack/react-query'
import { UpdateListData } from '@/lib/types/API.type'

export const useCreateList = (
  options?: UseMutationOptions<TodoList, Error, CreateListSchemaType>,
) => {
  const router = useRouter()

  return useMutation({
    ...options,
    mutationFn: (data: CreateListSchemaType) =>
      axiosClient.post('/lists', data).then(data => data.data),
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: [LISTS_QUERY_KEY],
      })
      options?.onSuccess?.(data, variables, context)
      toast.success('List created successfully!', {
        description: 'Your new list has been created.',
      })
      router.push(`/dashboard/lists/${data.id}`)
    },
    onError: (error, variables, context) => {
      toast.error('Something went wrong!', {
        description: error.message,
      })
      options?.onError?.(error, variables, context)
    },
  })
}

export const useUpdateList = (
  id: string,
  options?: UseMutationOptions<TodoList, Error, UpdateListData>,
) => {
  return useMutation({
    ...options,
    mutationFn: (data: UpdateListData) =>
      axiosClient.patch<TodoList>(`/lists/${id}`, data).then(data => data.data),
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context)
      queryClient.invalidateQueries({
        queryKey: [LISTS_QUERY_KEY],
      })
    },
    onError: (error, variables, context) => {
      toast.error('Failed to rename list', {
        description: error.message,
      })
      options?.onError?.(error, variables, context)
    },
  })
}

export const useDeleteList = (
  id: string,
  options?: UseMutationOptions<TodoList, Error>,
) => {
  const router = useRouter()
  return useMutation({
    ...options,
    mutationFn: () =>
      axiosClient.delete<TodoList>(`/lists/${id}`).then(data => data.data),
    onSuccess: async (data, variables, context) => {
      options?.onSuccess?.(data, variables, context)
      await queryClient.invalidateQueries({
        queryKey: [LISTS_QUERY_KEY],
      })

      router.push('/dashboard')
    },
    onError: (error, variables, context) => {
      toast.error('List deletion failed', {
        description: error.message,
      })
      options?.onError?.(error, variables, context)
    },
  })
}
