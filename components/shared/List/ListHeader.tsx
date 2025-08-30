'use client'

interface ListHeaderProps {
  children?: React.ReactNode | React.ReactNode[]
}

export const ListHeader = ({ children }: ListHeaderProps) => {
  return (
    <>
      <div className="flex justify-between items-center">{children}</div>
    </>
  )
}
