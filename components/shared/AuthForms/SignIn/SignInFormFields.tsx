'use client'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { isEmail } from '@/lib/isEmail'
import type { UseFormReturn } from 'react-hook-form'
import { type SignInSchema } from '@/lib/schemas/signIn.schema'
import CheckboxLabel from '@/components/shared/Common/CheckboxLabel'
import Link from 'next/link'

interface SignInFormFieldsProps {
  form: UseFormReturn<SignInSchema>
}

const SignInFormFields = ({ form }: SignInFormFieldsProps) => {
  const { isSubmitting } = form.formState
  const emailOrUsernameInput = form.watch('emailOrUsername')

  return (
    <div className="mt-6 space-y-4">
      <FormField
        control={form.control}
        name="emailOrUsername"
        render={({ field }) => (
          <FormItem>
            <FormMessage />
            <FormControl>
              <Input
                disabled={isSubmitting}
                {...field}
                placeholder="Username or email"
              />
            </FormControl>
          </FormItem>
        )}
      />

      {!isEmail(emailOrUsernameInput) && (
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormMessage />
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  {...field}
                  type="password"
                  placeholder="Password"
                />
              </FormControl>
            </FormItem>
          )}
        />
      )}

      <div className="flex items-center justify-between">
        <FormField
          control={form.control}
          name="rememberMe"
          render={({ field }) => (
            <FormItem>
              <FormMessage />
              <FormControl>
                <CheckboxLabel
                  id="remember-me"
                  label="Remember me"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSubmitting}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Link className="text-sm" href={'/auth/forgot-password'}>
          Forgot-password?
        </Link>
      </div>

      <Button
        disabled={isSubmitting}
        type="submit"
        className="w-full mt-3 font-bold"
      >
        Log in
      </Button>
    </div>
  )
}

export default SignInFormFields
