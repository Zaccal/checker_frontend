import Link from 'next/link'

const FormFooter = () => {
	return (
		<>
			<p className="leading-6 text-sm text-muted-foreground  mt-8 text-center">
				By Clicking continue, you agree to our{' '}
				<Link href={'/terms'} className="underline">
					Terms <br /> of Service
				</Link>{' '}
				and{' '}
				<Link href={'/privacy'} className="underline">
					Privacy Policy
				</Link>
			</p>
		</>
	)
}

export default FormFooter
