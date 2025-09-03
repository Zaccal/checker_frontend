import type { SubtaskFromList } from '../lib/types/API.type'

export function getDefualtSubtasks(subtasks: SubtaskFromList[]) {
  return subtasks.map(subtask => ({
    id: subtask.id,
    title: subtask.title,
    completed: subtask.completed,
  }))
}
