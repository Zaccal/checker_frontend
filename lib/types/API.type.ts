export interface TodoList {
	id: string
	title: string
	createdAt: string
	updatedAt: string
	icon: string
}

export interface SubtaskFromList {
	id: string
	title: string
	completed: boolean
	createdAt: Date
	updatedAt: Date
	todoId: string
}

export interface TagFromList {
	id: string
	createdAt: Date
	updatedAt: Date
	name: string
	color: string
}

export type TodoFromList = {
	id: string
	title: string
	completed: boolean
	createdAt: Date
	updatedAt: Date
	expiresAt: Date | null
	subTasks: SubtaskFromList[]
	tags: TagFromList[]
}
