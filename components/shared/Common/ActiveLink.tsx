'use client'

import Link from 'next/link'
import type { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

interface ActiveLinkProps extends LinkProps {
  children: ReactNode | ReactNode[]
  className?: string
  classNameeActive?: string
}

const ActiveLink = ({
  children,
  className,
  classNameeActive,
  href,
  ...props
}: ActiveLinkProps) => {
  const pathname = usePathname()
  const hrefPath = typeof href === 'string' ? href : (href.pathname ?? '')
  const isActive = pathname === hrefPath

  const activedClassname = isActive
    ? `${classNameeActive ?? ''} ${className ?? ''}`.trim()
    : className

  return (
    <Link className={activedClassname} href={href} {...props}>
      {children}
    </Link>
  )
}

export default ActiveLink
