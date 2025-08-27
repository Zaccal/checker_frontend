interface TodoHeaderProps {
  children?: React.ReactNode | React.ReactNode[]
}

export function TodoHeader({ children }: TodoHeaderProps) {
  return <div className="flex items-center justify-between">{children}</div>
}
