'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  signUpSchema,
  type TypeSingUpSchema,
} from '@/lib/schemas/signUp.schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUp } from '@/lib/auth'
import { toast } from 'sonner'
import InputPasswordField from '@/components/shared/Common/InputPasswordField'
import { useRouter } from 'next/navigation'

const FormSignUp = () => {
  const form = useForm<TypeSingUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
  })
  const { isSubmitting } = form.formState
  const router = useRouter()

  async function onSubmit({ email, password, username }: TypeSingUpSchema) {
    await signUp.email(
      {
        email,
        password,
        name: username,
        username: username,
      },
      {
        onError: ({ error }) => {
          toast.error('Something went wrong, try again', {
            description: error.message,
          })
        },
        onSuccess: () => {
          router.push(`auth/otp-code/verify?email=${encodeURIComponent(email)}`)
          toast.success('OTP code sent', {
            description: 'We have sent a verification code to your email.',
          })
        },
      },
    )
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <h1 className="text-center font-bold text-2xl">Create an account</h1>
          <p className="text-center text-muted-foreground mt-2">
            Enter your email below to create your account
          </p>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormMessage />
                <FormControl>
                  <Input
                    {...field}
                    disabled={isSubmitting}
                    placeholder="Username"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormMessage />
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    {...field}
                    type="email"
                    placeholder="name@example.com"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormMessage />
                <FormControl>
                  <InputPasswordField
                    disabled={isSubmitting}
                    password={field.value}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            disabled={isSubmitting}
            type="submit"
            className="w-full mt-3 font-bold"
          >
            Create account
          </Button>
        </form>
      </Form>
    </>
  )
}

export default FormSignUp
