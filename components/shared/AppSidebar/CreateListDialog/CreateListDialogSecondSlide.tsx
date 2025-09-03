import { FormControl, FormField, FormItem } from '@/components/ui/form'
import type { CreateListConrolType } from '@/lib/types/components.type'
import IconSelect from '../../Common/IconSelect'

interface CreateListDialogSecondSlideProps {
  control: CreateListConrolType
  disabled?: boolean
  currentState?: string | null
}

export const CreateListDialogSecondSlide = ({
  control,
  disabled,
  currentState,
}: CreateListDialogSecondSlideProps) => {
  return (
    <div>
      <FormField
        control={control}
        name="icon"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <IconSelect
                disabled={disabled}
                variant={iconName =>
                  field.value === iconName ? 'default' : 'outline'
                }
                onIconSelect={iconName => {
                  field.onChange(iconName === currentState ? null : iconName)
                }}
                type="button"
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  )
}
