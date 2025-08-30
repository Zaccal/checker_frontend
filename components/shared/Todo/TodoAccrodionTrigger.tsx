'use client'

import { AccordionTrigger } from '@/components/ui/accordion'
import { todoContext } from './Todo'

export function TodoSubtasksAccordionTrigger() {
  const { subTasks } = todoContext.useSelect(state => state)
  return subTasks.length > 0 ? <AccordionTrigger /> : null
}
