import type { SubtaskFromList } from '@/lib/types/API.type'
import TodoCheckbox from '../Common/todoCheckbox'

interface SubTaskAccordionContentProps {
  subtasks: SubtaskFromList[]
}

const SubTaskAccordionContent = ({
  subtasks,
}: SubTaskAccordionContentProps) => {
  return (
    <div className="py-2 pl-6 space-y-2">
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
  )
}

export default SubTaskAccordionContent
