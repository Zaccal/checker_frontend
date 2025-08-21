import type { SubtaskFromList } from '@/lib/types/API.type'
import TodoCheckbox from '../Common/todoCheckbox'
import { Progress } from '@/components/ui/progress'

interface SubTaskAccordionContentProps {
  subtasks: SubtaskFromList[]
}

const SubTaskAccordionContent = ({
  subtasks,
}: SubTaskAccordionContentProps) => {
  const completedSubtasks = subtasks.filter(subtask => subtask.completed).length
  const total = subtasks.length
  const progress = (completedSubtasks / total) * 100

  return (
    <div className="py-2 pl-6 space-y-4">
      <div className="space-y-2">
        {subtasks.map(subtask => (
          <div key={subtask.id}>
            <TodoCheckbox
              size="lg"
              initialState={subtask.completed}
              id={subtask.id}
              label={subtask.title}
              typeData="subtask"
            />
          </div>
        ))}
      </div>
      <Progress
        showPercentage
        percentagePosition="follow"
        className="h-5.5"
        value={progress}
      />
    </div>
  )
}

export default SubTaskAccordionContent
