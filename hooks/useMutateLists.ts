import { axiosClient } from '@/lib/axiosClient'
import { queryClient } from '@/lib/query'
import { CreateListSchemaType } from '@/lib/schemas/createList.schema'
import { useMutation } from '@tanstack/react-query'
import { TodoList } from 'checker_shared'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const useCreateList = (onSuccess?: () => void) => {
  const router = useRouter()

  return useMutation({
    mutationFn: (data: CreateListSchemaType) =>
      axiosClient.post('/lists', data),
    onSuccess: ({ data }) => {
      onSuccess?.()
      toast.success('List created successfully!', {
        description: 'Your new list has been created.',
      })
      queryClient.invalidateQueries({
        queryKey: ['lists'],
      })
      router.push(`/dashboard/lists/${data.id}`)
    },
    onError: error => {
      toast.error('Something went wrong!', {
        description: error.message,
      })
    },
  })
}

export const useUpdateList = (
  id: string,
  onSuccess?: (data: TodoList) => void,
) => {
  return useMutation({
    mutationFn: (data: { title?: string; icon?: string }) =>
      axiosClient.patch(`/lists/${id}`, data),
    onSuccess: ({ data }) => {
      onSuccess?.(data)
      queryClient.invalidateQueries({
        queryKey: ['lists'],
      })
    },
    onError: error => {
      toast.error('Failed to rename list', {
        description: error.message,
      })
    },
  })
}

export const useDeleteList = (id: string, onSuccess?: () => void) => {
  const router = useRouter()
  return useMutation({
    mutationFn: () => axiosClient.delete(`/lists/${id}`),
    onSuccess: () => {
      onSuccess?.()
      queryClient.invalidateQueries({
        queryKey: ['lists'],
      })

      router.push('/dashboard')
    },
    onError: error => {
      toast.error('List deletion failed', {
        description: error.message,
      })
    },
  })
}
