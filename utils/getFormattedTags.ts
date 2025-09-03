import type { TagSchema } from '../lib/schemas/tag.schema'

export function getFormattedTags(tags: TagSchema[]) {
  return tags.map(tag => {
    if (tag.isLocal) {
      return {
        name: tag.name,
      }
    }
    return tag.id
  })
}
