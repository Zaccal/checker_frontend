import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { axiosClient } from '@/lib/axiosClient'
import { Subtask } from 'checker_shared'
import { invalidateTag } from '@/lib/actions'

export const useUpdateSubtask = (
  id: string,
  onSuccess: (data: Subtask) => void,
  onError?: () => void,
) => {
  return useMutation({
    mutationFn: (data: { title?: string; completed?: boolean }) =>
      axiosClient.patch(`/subtasks/${id}`, data),
    onSuccess: ({ data }) => {
      invalidateTag('list-id')
      onSuccess(data)
    },
    onError: error => {
      toast.error('Failed to update subtask', {
        description: error.message,
      })
      onError?.()
    },
  })
}
