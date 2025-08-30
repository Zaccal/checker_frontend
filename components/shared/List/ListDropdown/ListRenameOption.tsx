import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useBoolean } from '@/hooks'
import { Pen } from 'lucide-react'
import { listContext } from '../List'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  type RenameListSchema,
  renameListSchema,
} from '@/lib/schemas/renameList.schema'
import { useUpdateList } from '@/hooks/use-mutate-lists'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog'
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export const ListRenameOption = () => {
  const [open, toggle] = useBoolean()
  const { set: setList, value: list } = listContext.useSelect()
  if (!list) throw new Error('List not found')

  const title = list.title
  const listId = list.id

  const form = useForm({
    resolver: zodResolver(renameListSchema),
    defaultValues: {
      newTitle: title,
    },
  })
  const { mutate: updateList, isPending } = useUpdateList(
    listId,
    updatedList => {
      toggle(false)
      setList({
        ...list,
        title: updatedList.title,
      })
    },
  )

  const submitHandler = ({ newTitle }: RenameListSchema) => {
    if (newTitle === title) {
      toggle(false)
      return
    }

    updateList({
      title: newTitle,
    })
  }

  return (
    <>
      <DropdownMenuItem
        onClick={e => {
          e.preventDefault()
          toggle()
        }}
      >
        Rename
        <Pen />
      </DropdownMenuItem>

      <Dialog
        open={open}
        onOpenChange={openPar => {
          toggle(openPar)
          form.reset({
            newTitle: title,
          })
        }}
      >
        <DialogContent>
          <DialogTitle>Rename List</DialogTitle>
          <DialogDescription>
            Enter a new title for the list &quot;{title}&quot;.
          </DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submitHandler)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="newTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormMessage />
                    <Input
                      placeholder="New list title"
                      {...field}
                      className="w-full"
                    />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose
                  className="outline-btn"
                  type="button"
                  disabled={isPending}
                >
                  Cancel
                </DialogClose>
                <Button disabled={isPending} type="submit">
                  Rename
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
