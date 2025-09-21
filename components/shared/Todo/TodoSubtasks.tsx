'use client'

import { useState } from 'react'
import { todoContext } from './Todo'
import { AccordionContent } from '@/components/ui/accordion'
import TodoCheckbox from '../../common/TodoCheckbox'
import { Progress } from '@/components/ui/progress'

export function TodoSubTasks() {
  const { subTasks } = todoContext.useSelect(state => state)
  const [completedSubtasks, setCompletedSubtasks] = useState(
    subTasks.filter(subtask => subtask.completed).length,
  )
  const total = subTasks.length
  const progress = (completedSubtasks / total) * 100

  const changeHandler = (state: boolean) => {
    if (state) {
      setCompletedSubtasks(prev => prev + 1)
    } else {
      setCompletedSubtasks(prev => prev - 1)
    }
  }

  return (
    <AccordionContent>
      <div className="py-2 pl-6 space-y-4">
        <div className="space-y-2">
          {subTasks.map(subtask => (
            <div key={subtask.id}>
              <TodoCheckbox
                size="lg"
                initialState={subtask.completed}
                id={subtask.id}
                label={subtask.title}
                typeData="subtask"
                onChangeChecker={changeHandler}
                // If error occours, change state back to previous
                onErrorHandler={() => {
                  changeHandler(subtask.completed)
                }}
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
    </AccordionContent>
  )
}
