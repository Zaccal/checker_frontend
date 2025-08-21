import TaskExpireDate from './TaskExpireDate'
import TaskSubtaskCount from './TaskSubtaskCount'
import TaskTags from './TaskTags'
import type { TodoFromList } from '@/lib/types/API.type'
import TodoCheckbox from '../Common/todoCheckbox'
import TaskDropdown from './TaskDropdown/TaskDropdown'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import SubTaskAccordionContent from './SubTaskAccordionContent'

interface TaskProps {
  task: TodoFromList
}

const Task = ({ task }: TaskProps) => {
  const countOfComplitedSubTasks = task.subTasks.filter(
    subTaskData => !subTaskData.completed,
  ).length
  const isSubtasksExist = task.subTasks.length > 0

  return (
    <div className=" border-border border rounded-lg px-4 py-5">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <div className="flex items-center justify-between">
            <TodoCheckbox
              initialState={task.completed}
              id={task.id}
              label={task.title}
            />
            <div className="flex items-center gap-2">
              {isSubtasksExist && <AccordionTrigger></AccordionTrigger>}
              <TaskDropdown task={task} />
            </div>
          </div>
          <AccordionContent>
            {isSubtasksExist && (
              <>
                <SubTaskAccordionContent subtasks={task.subTasks} />
              </>
            )}
          </AccordionContent>
          <div className="flex flex-col gap-2 mt-3 items-start">
            <div className="flex items-center gap-2">
              <TaskExpireDate
                completed={task.completed}
                expiresAt={task.expiresAt}
                isSubtasksComplited={Boolean(countOfComplitedSubTasks)}
              />
              {countOfComplitedSubTasks && task.expiresAt ? (
                <span className="dot"></span>
              ) : null}
              <TaskSubtaskCount count={countOfComplitedSubTasks} />
              {task.tags.length && countOfComplitedSubTasks ? (
                <span className="dot"></span>
              ) : null}
              <TaskTags tags={task.tags} />
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default Task
