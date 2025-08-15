import SelectDate from '@/components/shared/Common/SelectDate'
import SelectTime from '@/components/shared/Common/SelectTime'
import SelectTags from '@/components/shared/Common/SelectTags/SelectTags'
import TaskDropdownEditSubtasks from './TaskDropdownEditSubtasks'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { type EditTaskSchema } from '@/lib/schemas/editTask.schema'
import { type UseFormReturn } from 'react-hook-form'

interface TaskDropdownEditFormFieldsProps {
  form: UseFormReturn<EditTaskSchema>
  disabled?: boolean
}

const TaskDropdownEditFormFields = ({
  form,
  disabled,
}: TaskDropdownEditFormFieldsProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormMessage />
            <FormControl>
              <Input disabled={disabled} placeholder="Enter title" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <div className="grid grid-cols-4 gap-3">
        <FormField
          control={form.control}
          name="expirationDate"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormLabel>Expiration date</FormLabel>
              <FormControl>
                <SelectDate disabled={disabled} field={field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="expirationTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expiration Time</FormLabel>
              <FormMessage />
              <FormControl>
                <SelectTime disabled={disabled} field={field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="tags"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tags</FormLabel>
            <FormMessage />
            <FormControl>
              <SelectTags
                disabled={disabled}
                value={field.value}
                onValueChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="subtasks"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Subtasks</FormLabel>
            <FormMessage />
            <FormControl>
              <TaskDropdownEditSubtasks disabled={disabled} field={field} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  )
}

export default TaskDropdownEditFormFields
