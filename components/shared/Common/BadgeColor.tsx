import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface BadgeColorProps {
	color?: string
	className?: string
}

export default function BadgeColor({ color, className }: BadgeColorProps) {
	return (
		<Badge variant="outline" className={cn('gap-1.5', className)}>
			<span
				className={cn('size-1.5 rounded-full', color ?? 'bg-emerald-500')}
				aria-hidden="true"
			></span>
			Badge
		</Badge>
	)
}
