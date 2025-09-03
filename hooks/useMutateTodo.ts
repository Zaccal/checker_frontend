import { queryClient } from '@/lib/query'
import { useMutation } from '@tanstack/react-query'
import { Todo } from 'checker_shared'
import { toast } from 'sonner'
import { axiosClient } from '@/lib/axiosClient'
import { invalidateTag } from '@/lib/actions'

interface UpdateTodoData {
  title: string
  tags: (string | { name: string })[]
  subtasks: { id: string; title: string; completed?: boolean }[]
  expiresAt: string | undefined
}

export const useCreateTodo = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: (data: unknown) => axiosClient.post('/todos', data),
    onSuccess: () => {
      onSuccess?.()
      invalidateTag('list-id')
      queryClient.invalidateQueries({ queryKey: ['tags', 'search'] })
      toast.success('Task created successfully!', {
        description: 'Your new task has been created.',
      })
    },
    onError: error => {
      toast.error('Something went wrong!', {
        description: error.message,
      })
    },
  })
}

export function useUpdateTodo(
  id: string,
  onSuccess?: (data: Todo) => void,
  listId?: string,
) {
  return useMutation({
    mutationFn: (data: UpdateTodoData) =>
      axiosClient.patch(`/todos/${id}`, data),
    onSuccess: ({ data }) => {
      onSuccess?.(data)
      invalidateTag('list-id')
      queryClient.invalidateQueries({
        queryKey: ['search', 'tags'],
      })

      toast.success('Task updated successfully!', {
        description: 'Your task has been updated.',
      })
    },
    onError: error => {
      toast.error('Failed to update task', {
        description: error.message,
      })
    },
  })
}

export function useDeleteTodo(id: string, onSuccess?: () => void) {
  return useMutation({
    mutationFn: () => axiosClient.delete(`/todos/${id}`),
    onSuccess: () => {
      onSuccess?.()
      toast.success('Task deleted successfully!')
      invalidateTag('list-id')
    },
    onError: error => {
      toast.error('Task deletion failed', {
        description: error.message,
      })
    },
  })
}

export function useCompliteTodo(id: string, onError?: () => void) {
  return useMutation({
    mutationFn: (state: boolean) =>
      axiosClient.patch(`/todos/${id}`, { completed: state }),
    onSuccess: () => {
      invalidateTag('list-id')
    },
    onError: error => {
      toast.error('Task complite failed, try again', {
        description: error.message,
      })
      onError?.()
    },
  })
}
