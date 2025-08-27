interface TodoOptionsProps {
  children?: React.ReactNode | React.ReactNode[]
}

export function TodoOptions({ children }: TodoOptionsProps) {
  return <div className="flex items-center gap-2">{children}</div>
}
