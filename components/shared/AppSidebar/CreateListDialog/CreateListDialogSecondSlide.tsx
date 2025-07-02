import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { CreateListConrolType } from '@/lib/types/components.type'
import IconSelect from '../../Common/IconSelect'

interface CreateListDialogSecondSlideProps {
	control: CreateListConrolType
	disabled?: boolean
	currentState?: string | null
}

const CreateListDialogSecondSlide = ({
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
								className="items-center"
								disabled={disabled}
								variant={iconName =>
									field.value === iconName ? 'default' : 'outline'
								}
								onIconSelect={iconName =>
									field.onChange(iconName === currentState ? null : iconName)
								}
								type="button"
							/>
						</FormControl>
					</FormItem>
				)}
			/>
		</div>
	)
}

export default CreateListDialogSecondSlide
