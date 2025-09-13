import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { axiosClient } from '@/lib/axiosClient'
import type { Subtask } from 'checker_shared'
import { queryClient } from '@/lib/query'
import { TODO_QUERY_KEY } from './useGetTodos'
import { UpdateSubtaskData } from '@/lib/types/API.type'
import { UseMutationOptions } from '@tanstack/react-query'

export const useUpdateSubtask = (
  id: string,
  options: UseMutationOptions<Subtask, Error, UpdateSubtaskData>,
) => {
  return useMutation({
    ...options,
    mutationFn: (data: UpdateSubtaskData) =>
      axiosClient
        .patch<Subtask>(`/subtasks/${id}`, data)
        .then(data => data.data),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [TODO_QUERY_KEY] })
      options.onSuccess?.(data, variables, context)
    },
    onError: (error, variables, context) => {
      toast.error('Failed to update subtask', {
        description: error.message,
      })
      options.onError?.(error, variables, context)
    },
  })
}
