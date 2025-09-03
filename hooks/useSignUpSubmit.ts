import { signUp } from '@/lib/auth'
import type { TypeSingUpSchema } from '@/lib/schemas/signUp.schema'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useSendOtpCode } from './useSendOtpCode'

export const useSignUpSubmit = () => {
  const router = useRouter()
  const { sendOtpCode } = useSendOtpCode()

  const handler = async ({ email, password, username }: TypeSingUpSchema) => {
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
          toast.info('Navigating to OTP code verification...')
          sendOtpCode(email, () => {
            router.push(
              `auth/otp-code/verify?email=${encodeURIComponent(email)}`,
            )
            toast.success('OTP code sent', {
              description: 'We have sent a verification code to your email.',
            })
          })
        },
      },
    )
  }

  return { handler }
}
