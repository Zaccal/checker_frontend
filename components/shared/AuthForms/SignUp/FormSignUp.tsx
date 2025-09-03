'use client'

import { Form } from '@/components/ui/form'
import {
  signUpSchema,
  type TypeSingUpSchema,
} from '@/lib/schemas/signUp.schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import FormSignUpFields from './FormSignUpFields'
import { useSignUpSubmit } from '@/hooks/index'
import FormSignUpHeader from './FormSignUpHeader'

const FormSignUp = () => {
  const form = useForm<TypeSingUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
  })
  const { handler: signUpHandler } = useSignUpSubmit()

  async function onSubmit(data: TypeSingUpSchema) {
    await signUpHandler(data)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormSignUpHeader />
          <FormSignUpFields form={form} />
        </form>
      </Form>
    </>
  )
}

export default FormSignUp
