import Link from 'next/link'

interface FormHeaderProps {
	title: string
	link: string
	description: string
}

const FormHeader = ({ link, title, description }: FormHeaderProps) => {
	return (
		<>
			<div className="w-full flex font-semibold justify-center mb-7 md:justify-end">
				<p className="">
					<span className="text-muted-foreground">{description}</span>{' '}
					<Link className="text-primary" href={link}>
						{title}
					</Link>
				</p>
			</div>
		</>
	)
}

export default FormHeader
