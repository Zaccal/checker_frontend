import { mutateTask } from '@/lib/actions'
import { queryClient } from '@/provider/ReactQueryProvider'
import { useMutation } from '@tanstack/react-query'
import { Todo } from 'checker_shared'
import { toast } from 'sonner'

// Type for the transformed update data that matches server expectations
interface UpdateTaskData {
  title: string
  tags: (string | { name: string })[]
  subtasks: { id: string; title: string; completed?: boolean }[]
  expiresAt: string | undefined
}

function useCreateTask(onSuccess?: () => void) {
  return useMutation({
    mutationFn: (data: unknown) => mutateTask(data, 'POST'),
    onSuccess: () => {
      onSuccess?.()
      queryClient.invalidateQueries({ queryKey: ['tags'] })
      queryClient.invalidateQueries({ queryKey: ['search'] })
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

function useUpdateTodo(id: string, onSuccess?: (data: Todo) => void) {
  return useMutation({
    mutationFn: (data: UpdateTaskData) => mutateTask(data, 'PATCH', id),
    onSuccess: data => {
      onSuccess?.(data)
      queryClient.invalidateQueries({
        queryKey: ['tasks', 'tags'],
      })
      queryClient.invalidateQueries({
        queryKey: ['search'],
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

function useDeleteTask(id: string, onSuccess?: () => void) {
  return useMutation({
    mutationFn: () => mutateTask(null, 'DELETE', id),
    onSuccess: () => {
      onSuccess?.()
      toast.success('Task deleted successfully!')
    },
    onError: error => {
      toast.error('Task deletion failed', {
        description: error.message,
      })
    },
  })
}

function useCompliteTask(id: string, onError?: () => void) {
  return useMutation({
    mutationFn: (state: boolean) =>
      mutateTask({ completed: state }, 'PATCH', id, 'completed'),
    onError: error => {
      toast.error('Task complite failed, try again', {
        description: error.message,
      })
      onError?.()
    },
  })
}

export { useCreateTask, useUpdateTodo, useDeleteTask, useCompliteTask }
