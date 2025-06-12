import Link from 'next/link'

interface FormHeaderProps {
	title: string
	link: string
}

const FormHeader = ({ link, title }: FormHeaderProps) => {
	return (
		<>
			<div className="w-full flex font-semibold justify-end">
				<Link href={`${link}`}>{title}</Link>
			</div>
		</>
	)
}

export default FormHeader
