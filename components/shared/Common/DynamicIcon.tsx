import { formatStringToIcon } from '@/lib/formatStringToIcon'
import { TypeIcons } from '@/types/icons.type'
import { type FC } from 'react'
import * as Icons from 'lucide-react'

interface DynamicIconProps {
	iconName: string | null
	size?: number
	color?: string
}

const DynamicIcon: FC<DynamicIconProps> = ({ iconName, size = 24, color }) => {
	const iconKey = formatStringToIcon(iconName)
	const LucideIcon = Icons[iconKey as TypeIcons] as FC<{
		size?: number
		color?: string
	}>

	if (!LucideIcon) {
		return null
	}

	return <LucideIcon size={size} color={color} />
}

export default DynamicIcon
