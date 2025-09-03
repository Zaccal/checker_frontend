import { type TagSchema } from '@/lib/schemas/tag.schema'
import { useQuery } from '@tanstack/react-query'
import type { Tag } from 'checker_shared'
import { axiosClient } from '@/lib/axiosClient'

const useGetTags = () => {
  return useQuery({
    queryKey: ['tags'],
    queryFn: () => axiosClient.get<Tag[]>('/tags'),
    select: data => data.data,
  })
}

const useGetTagsFormatted = () => {
  const query = useGetTags()
  return {
    ...query,
    data: query.data?.map(tag => ({
      id: tag.id,
      name: tag.name,
      isLocal: false, // Assuming tags fetched from the server are not local
    })) as TagSchema[],
  }
}

export { useGetTags, useGetTagsFormatted }
