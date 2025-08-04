import { TagSchema } from '@/lib/schemas/CreateTask.schema'
import { useQuery } from '@tanstack/react-query'
import type { Tag } from 'checker_shared'

function useGetTags() {
	return useQuery<Tag[]>({
		queryKey: ['tags'],
		queryFn: async () => {
			const url = process.env.NEXT_PUBLIC_API_URL + '/tags'
			const res = await fetch(url, {
				credentials: 'include',
			})
			if (!res.ok) {
				throw new Error('Failed to fetch tags')
			}

			return res.json()
		},
	})
}

function useGetTagsSimplified() {
	const query = useGetTags()
	return {
		...query,
		data: query.data?.map(tag => ({
			id: tag.id,
			name: tag.name,
			color: tag.color,
			isLocal: false, // Assuming tags fetched from the server are not local
		})) as TagSchema[],
	}
}

export { useGetTags, useGetTagsSimplified }
