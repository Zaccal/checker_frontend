import { Badge } from '@/components/ui/badge'
import { Tag } from 'checker_shared/dist/generated/prisma/client'

interface TaskTagsProps {
	tags: Tag[]
}

const TaskTags = ({ tags }: TaskTagsProps) => {
	return (
		<>
			<div className="flex gap-2">
				{tags.map(tag => (
					<Badge key={tag.id} className="mt-2 text-xs">
						{tag.name}
					</Badge>
				))}
			</div>
		</>
	)
}

export default TaskTags
