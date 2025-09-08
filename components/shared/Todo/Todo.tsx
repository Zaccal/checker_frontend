'use client'

import { Accordion, AccordionItem } from '@/components/ui/accordion'
import { createContext } from '@/hooks'
import type { TodoFromList } from '@/lib/types/API.type'
import { useId } from 'react'

interface TodoProps {
  todo: TodoFromList
  children?: React.ReactNode | React.ReactNode[]
}

interface TodoContextType extends TodoFromList {
  dropdownOpen: boolean
}

export const todoContext = createContext<TodoContextType>()

export function Todo({ todo, children }: TodoProps) {
  const id = useId()

  return (
    <todoContext.Provider initialValue={{ ...todo, dropdownOpen: false }}>
      <Accordion type="single" collapsible>
        <AccordionItem value={`item-${id}`}>
          <div className="border-border border rounded-lg px-4 py-5">
            {children}
          </div>
        </AccordionItem>
      </Accordion>
    </todoContext.Provider>
  )
}
