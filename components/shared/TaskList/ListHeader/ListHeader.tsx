'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Filter } from 'lucide-react'
import ListHeaderDropdown from './ListHeaderDropdown/ListHeaderDropdown'
import CreateTaskDialog from './CreateTask/CreateTaskDialog'
import { useListContext } from '@/hooks/useListContext'

const ListHeader = () => {
  const { title, protected: isListProtected } = useListContext()

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{title}</h1>
        {!isListProtected && <ListHeaderDropdown />}
      </div>
      <Separator className="my-4" />
      <div className="flex items-center gap-3">
        <CreateTaskDialog />
        <Button variant={'outline'}>
          <Filter /> Filter
        </Button>
      </div>
    </>
  )
}

export default ListHeader
