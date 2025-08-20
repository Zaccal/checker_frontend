import { mutateSubTask } from '@/lib/actions'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

function useUpdateSubtask(id: string, onSuccess?: () => void) {
  return useMutation({
    mutationFn: (data: { title?: string; completed?: boolean }) =>
      mutateSubTask(data, 'PATCH', id),
    onSuccess,
    onError: error => {
      toast.error('Failed to update subtask', {
        description: error.message,
      })
    },
  })
}

export { useUpdateSubtask }
