'use client'

import { ICON_RENDER_LIMIT } from '@/lib/constants/constants'
import { icons, Search } from 'lucide-react'
import { ButtonHTMLAttributes, useMemo, useState } from 'react'
import { InputIcon } from './InputIcon'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import DynamicIcon from './DynamicIcon'

const iconNames = Object.keys(icons).filter(name => name !== 'default')

interface IconSelectProps
	extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
	variant?: (iconName: string) => 'outline' | 'default'
	onIconSelect?: (iconName: string) => void
}

const IconSelect = ({ onIconSelect, variant, ...props }: IconSelectProps) => {
	const [search, setSearch] = useState('')

	const filteredIconNames = useMemo(() => {
		const s = search.trim().toLowerCase()
		if (!s) return iconNames
		return iconNames.filter(name => name.toLowerCase().includes(s))
	}, [search])
	const visibleIcons = filteredIconNames.slice(0, ICON_RENDER_LIMIT)

	return (
		<>
			<InputIcon
				icon={<Search />}
				placeholder="Search"
				value={search}
				onChange={event => setSearch(event.target.value)}
			/>
			<ScrollArea className="h-52 w-full mt-4">
				<div className="grid grid-cols-8 gap-4">
					{visibleIcons.map(iconData => (
						<Button
							key={iconData}
							{...props}
							size={'icon'}
							variant={variant ? variant(iconData) : 'default'}
							onClick={() => onIconSelect && onIconSelect(iconData)}
						>
							<DynamicIcon iconName={iconData} />
						</Button>
					))}
				</div>
				{search.length === 0 && (
					<p className="text-muted-foreground text-center mt-3">
						Showing {ICON_RENDER_LIMIT} icons. <br /> Search for more or adjust
						the limit in <code>settings</code>.
					</p>
				)}
				{visibleIcons.length === 0 && (
					<p className="text-muted-foreground text-center mt-3">
						No icons found for "<code>{search}</code>".{' '}
					</p>
				)}
			</ScrollArea>
		</>
	)
}

export default IconSelect
