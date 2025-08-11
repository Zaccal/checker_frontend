interface SelectTagsFallbackProps {
	error: Error | null
}

const SelectTagsFallback = ({ error }: SelectTagsFallbackProps) => {
	return (
		<div className="bg-destructive text-destructive-foreground px-3 py-2 rounded-md text-sm">
			Error loading tags: {error?.message}
		</div>
	)
}

export default SelectTagsFallback
