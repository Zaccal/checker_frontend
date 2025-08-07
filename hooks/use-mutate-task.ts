import { mutateTask } from '@/lib/actions'
import { CreateTask } from '@/lib/schemas/CreateTask.schema'
import { UpdateTaskTitleSchema } from '@/lib/schemas/UpdateTask.schema'
import { queryClient } from '@/provider/ReactQueryProvider'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

function useCreateTask(onSuccess?: () => void) {
	return useMutation({
		mutationFn: (data: unknown) => mutateTask(data, 'POST'),
		onSuccess: () => {
			onSuccess?.()
			queryClient.invalidateQueries({
				queryKey: ['tags'],
			})
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

function useUpdateTaskTitle(id: string, onSuccess?: () => void) {
	return useMutation({
		mutationFn: (data: UpdateTaskTitleSchema) => mutateTask(data, 'PATCH', id),
		onSuccess,
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

export { useCreateTask, useUpdateTaskTitle, useDeleteTask }
