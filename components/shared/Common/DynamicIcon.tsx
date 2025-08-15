import { formatStringToIcon } from '@/lib/formatStringToIcon'
import type { TypeIcons } from '@/lib/types/icons.type'
import type { FC } from 'react'
import * as Icons from 'lucide-react'

interface DynamicIconProps {
  iconName: string | null
  size?: number
  color?: string
}

const DynamicIcon: FC<DynamicIconProps> = ({ iconName, size = 24, color }) => {
  if (!iconName) {
    return <Icons.List size={size} color={color} />
  }

  const iconKey = formatStringToIcon(iconName)
  const LucideIcon = Icons[iconKey as TypeIcons] as FC<{
    size?: number
    color?: string
  }>

  return <LucideIcon size={size} color={color} />
}

export default DynamicIcon
