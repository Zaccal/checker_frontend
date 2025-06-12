import { cn } from '@/lib/utils'

interface KbdProps {
	description?: string
	binding?: string
	className?: string
}

const Kbd = ({ description = 'Press', binding, className }: KbdProps) => {
	return (
		<>
			<p className={cn(className, 'text-sm text-muted-foreground')}>
				{description}{' '}
				<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
					<span className="text-xs">Ctrl</span>+ {binding}
				</kbd>
			</p>
		</>
	)
}

export default Kbd
