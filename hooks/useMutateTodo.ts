import { queryClient } from '@/lib/query'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { toast } from 'sonner'
import { axiosClient } from '@/lib/axiosClient'
import type {
  TodoFromList,
  UpdateTodoData,
  CreateTodoData,
} from '@/lib/types/API.type'
import { TODO_QUERY_KEY } from '@/lib/constants/constants'

export const useCreateTodo = ({
  onSuccess,
  onError,
  ...options
}: UseMutationOptions<TodoFromList, Error, CreateTodoData>) => {
  return useMutation({
    mutationFn: (data: CreateTodoData) =>
      axiosClient.post('/todos', data).then(data => data.data),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [TODO_QUERY_KEY] })
      toast.success('Task created successfully!', {
        description: 'Your new task has been created.',
      })
      onSuccess?.(data, variables, context)
    },
    onError: (error, variables, context) => {
      toast.error('Something went wrong!', {
        description: error.message,
      })
      onError?.(error, variables, context)
    },
    ...options,
  })
}

export function useUpdateTodo(
  id: string,
  options: UseMutationOptions<TodoFromList, Error, UpdateTodoData>,
) {
  return useMutation({
    ...options,
    mutationFn: (data: UpdateTodoData) =>
      axiosClient
        .patch<TodoFromList>(`/todos/${id}`, data)
        .then(data => data.data),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [TODO_QUERY_KEY],
      })
      toast.success('Task updated successfully!', {
        description: 'Your task has been updated.',
      })
      options.onSuccess?.(data, variables, context)
    },
    onError: (error, variables, context) => {
      toast.error('Failed to update task', {
        description: error.message,
      })

      options.onError?.(error, variables, context)
    },
  })
}

export function useDeleteTodo(
  id: string,
  options?: UseMutationOptions<{ success: boolean }, Error>,
) {
  return useMutation({
    ...options,
    mutationFn: () =>
      axiosClient
        .delete<{ success: boolean }>(`/todos/${id}`)
        .then(data => data.data),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [TODO_QUERY_KEY],
      })
      options?.onSuccess?.(data, variables, context)
      toast.success('Task deleted successfully!')
    },
    onError: (error, variables, context) => {
      toast.error('Task deletion failed', {
        description: error.message,
      })
      options?.onError?.(error, variables, context)
    },
  })
}

export function useCompleteTodo(
  id: string,
  options: UseMutationOptions<TodoFromList, Error, boolean>,
) {
  return useMutation({
    mutationFn: async (state: boolean) =>
      axiosClient
        .patch<TodoFromList>(`/todos/completed/${id}`, {
          completed: state,
        })
        .then(data => data.data),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [TODO_QUERY_KEY],
      })
      options.onSuccess?.(data, variables, context)
    },
    onError: (error, variables, context) => {
      toast.error('Task complite failed, try again', {
        description: error.message,
      })
      options.onError?.(error, variables, context)
    },
    ...options,
  })
}
