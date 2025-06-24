import { icons, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { InputIcon } from '../../Common/InputIcon'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ICON_RENDER_LIMIT } from '@/lib/constants/constants'
import { CreateListConrolType } from '@/lib/types'

interface CreateListDialogSecondSlideProps {
	control: CreateListConrolType
	disabled?: boolean
	currentState?: string | null
}

const iconNames = Object.keys(icons).filter(name => name !== 'default')

const CreateListDialogSecondSlide = ({
	control,
	disabled,
	currentState,
}: CreateListDialogSecondSlideProps) => {
	const [search, setSearch] = useState('')

	const filteredIconNames = useMemo(() => {
		const s = search.trim().toLowerCase()
		if (!s) return iconNames
		return iconNames.filter(name => name.toLowerCase().includes(s))
	}, [search])
	const visibleIcons = filteredIconNames.slice(0, ICON_RENDER_LIMIT)

	return (
		<div>
			<InputIcon
				value={search}
				onChange={event => setSearch(event.target.value)}
				icon={<Search />}
				placeholder="Search"
				disabled={disabled}
			/>
			<FormField
				control={control}
				name="icon"
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<ScrollArea className="h-52 w-full mt-4">
								<div className="grid grid-cols-8  gap-3">
									{visibleIcons.map(iconName => {
										const Icon = icons[iconName as keyof typeof icons]
										return (
											<Button
												className="items-center"
												disabled={disabled}
												variant={
													field.value === iconName ? 'default' : 'outline'
												}
												size={'icon'}
												onClick={() =>
													field.onChange(
														iconName === currentState ? null : iconName
													)
												}
												key={iconName}
												type="button"
											>
												<Icon />
											</Button>
										)
									})}
								</div>
								{search.length === 0 && (
									<p className="text-muted-foreground text-center mt-3">
										Showing {ICON_RENDER_LIMIT} icons. <br /> Search for more or
										adjust the limit in <code>settings</code>.
									</p>
								)}
								{visibleIcons.length === 0 && (
									<p className="text-muted-foreground text-center mt-3">
										No icons found for "<code>{search}</code>".{' '}
									</p>
								)}
							</ScrollArea>
						</FormControl>
					</FormItem>
				)}
			/>
		</div>
	)
}

export default CreateListDialogSecondSlide
