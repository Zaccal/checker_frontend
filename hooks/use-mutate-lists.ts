import { mutateList } from '@/lib/actions'
import { CreateListSchemaType } from '@/lib/schemas/createList.schema'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

function useCreateList(onSuccess?: () => void) {
	const router = useRouter()

	return useMutation({
		mutationFn: (data: CreateListSchemaType) => mutateList(data, 'POST'),
		onSuccess: data => {
			onSuccess?.()
			toast.success('List created successfully!', {
				description: 'Your new list has been created.',
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

function useUpdateList(id: string, onSuccess?: () => void) {
	return useMutation({
		mutationFn: (data: { title?: string; icon?: string }) =>
			mutateList(data, 'PATCH', id),
		onSuccess,
		onError: error => {
			toast.error('Failed to rename list', {
				description: error.message,
			})
		},
	})
}

function useDeleteList(id: string, onSuccess?: () => void) {
	const router = useRouter()
	return useMutation({
		mutationFn: () => mutateList(null, 'DELETE', id),
		onSuccess: () => {
			onSuccess?.()
			router.push('/dashboard')
		},
		onError: error => {
			toast.error('List deletion failed', {
				description: error.message,
			})
		},
	})
}

export { useCreateList, useUpdateList, useDeleteList }
