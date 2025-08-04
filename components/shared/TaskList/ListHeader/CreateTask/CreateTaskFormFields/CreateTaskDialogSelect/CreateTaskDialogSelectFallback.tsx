import { Skeleton } from '@/components/ui/skeleton'
import { type TagSchema } from '@/lib/schemas/CreateTask.schema'
import { type ReactNode } from 'react'

interface CreateTaskDialogSelectFallbackProps {
	isLoading: boolean
	error: Error | null
	data: TagSchema[] | undefined
	children?: ReactNode
}

const CreateTaskDialogSelectFallback = ({
	error,
	isLoading,
	data,
	children,
}: CreateTaskDialogSelectFallbackProps) => {
	if (error)
		return (
			<div className="bg-destructive text-destructive-foreground px-3 py-2 rounded-md text-sm">
				Error loading tags
			</div>
		)
	if (isLoading || !data) return <Skeleton className="w-full h-8 rounded-md" />

	return children
}

export default CreateTaskDialogSelectFallback
