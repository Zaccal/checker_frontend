import type { TagFromList } from '../lib/types/API.type'

export function getDefualtTags(tags: TagFromList[]) {
  return tags.map(tag => ({
    id: tag.id,
    name: tag.name,
    isLocal: false,
  }))
}
