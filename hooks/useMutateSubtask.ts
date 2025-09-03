import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { axiosClient } from '@/lib/axiosClient'

export const useUpdateSubtask = (id: string, onError?: () => void) => {
  return useMutation({
    mutationFn: (data: { title?: string; completed?: boolean }) =>
      axiosClient.patch(`/subtasks/${id}`, data),
    onError: error => {
      toast.error('Failed to update subtask', {
        description: error.message,
      })
      onError?.()
    },
  })
}
