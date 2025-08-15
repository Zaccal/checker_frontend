import { Badge, type BadgeProps } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export default function BadgeSelect({
  selected,
  className,
  ...props
}: BadgeProps & { selected?: boolean }) {
  return (
    <Badge
      {...props}
      className={cn(
        className,
        selected
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted text-muted-foreground',
      )}
    />
  )
}
