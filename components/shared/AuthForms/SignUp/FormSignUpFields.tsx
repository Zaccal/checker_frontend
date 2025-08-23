import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import InputPasswordField from '../../Common/InputPasswordField'
import { Button } from '@/components/ui/button'
import { UseFormReturn } from 'react-hook-form'
import { TypeSingUpSchema } from '@/lib/schemas/signUp.schema'

interface FormSignUpFieldsProps {
  form: UseFormReturn<TypeSingUpSchema>
}

const FormSignUpFields = ({ form }: FormSignUpFieldsProps) => {
  const { isSubmitting } = form.formState

  return (
    <>
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
    </>
  )
}

export default FormSignUpFields
