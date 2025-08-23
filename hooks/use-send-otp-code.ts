import { emailOtp } from '@/lib/auth'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

export const useSendOtpCode = (callBack?: () => void) => {
  const searchParams = useSearchParams()
  const emailParam = searchParams.get('email')

  const sendOtpCode = async (emailProps?: string, onSuccess?: () => void) => {
    callBack?.()
    const email = emailProps ?? emailParam ?? ''
    if (email) {
      await emailOtp.sendVerificationOtp(
        { email, type: 'sign-in' },
        {
          onError: () => {
            toast.error('Error sending OTP code', {
              description: 'Please try again.',
            })
          },
          onSuccess,
        },
      )
    } else {
      toast.error('Email is missing', {
        description: 'Email is missing from the URL',
      })
    }
  }

  return { sendOtpCode }
}
