import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CreateListConrolType } from '@/lib/types/components.type'

interface CreateListDialogFirstSlideProps {
	control: CreateListConrolType
	disabled?: boolean
}

const CreateListDialogFirstSlide = ({
	control,
	disabled,
}: CreateListDialogFirstSlideProps) => {
	return (
		<div className="">
			<FormField
				control={control}
				name="title"
				render={({ field }) => (
					<FormItem>
						<FormMessage />
						<FormControl>
							<Input
								autoFocus
								disabled={disabled}
								{...field}
								placeholder="List's name"
							/>
						</FormControl>
					</FormItem>
				)}
			/>

			<p className="text-xs text-muted-foreground mt-2">
				Example: "Groceries", "Work Tasks", "Reading List"
			</p>
		</div>
	)
}

export default CreateListDialogFirstSlide
