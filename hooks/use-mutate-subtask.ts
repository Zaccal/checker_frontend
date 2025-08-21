import { mutateSubTask } from '@/lib/actions'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

function useUpdateSubtask(id: string, onError?: () => void) {
  return useMutation({
    mutationFn: (data: { title?: string; completed?: boolean }) =>
      mutateSubTask(data, 'PATCH', id),
    onError: error => {
      toast.error('Failed to update subtask', {
        description: error.message,
      })
      onError?.()
    },
  })
}

export { useUpdateSubtask }
