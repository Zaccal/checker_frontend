import { ReactNode } from 'react'

const FormWrapper = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<div className="h-full flex items-center justify-center">
				{' '}
				<div className="max-w-md w-full">{children}</div>
			</div>
		</>
	)
}

export default FormWrapper
