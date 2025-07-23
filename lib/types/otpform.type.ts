import { UseFormReturn } from 'react-hook-form'

export type OtpFormComponent = UseFormReturn<
	{
		code: string
	},
	unknown,
	{
		code: string
	}
>
