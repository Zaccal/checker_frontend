'use client'

import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { format } from 'url'

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
	const isAcitve = pathname === format(href)

	const activedClassname = isAcitve
		? `${classNameeActive} ${className}` || className
		: className

	return (
		<Link className={activedClassname} href={href} {...props}>
			{children}
		</Link>
	)
}

export default ActiveLink
