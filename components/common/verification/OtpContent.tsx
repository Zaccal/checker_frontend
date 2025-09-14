'use client'

import OtpForm from '@/components/shared/AuthForms/OtpForm'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { otpCodeFormSchema } from '@/lib/schemas/otpCodeForm.schema'
import { useTimer, useOtpVerify } from '@/hooks'
import ChangeEmailOtpForm from '../../shared/AuthForms/ChangeEmailOtpForm'
import { useSearchParams } from 'next/navigation'

const OtpContent = () => {
  const { minutes, seconds, start, active, clear } = useTimer(120, {
    immediately: false,
  })
  const timeLeft = `${String(minutes).padStart(2, '0')}:${String(
    seconds,
  ).padStart(2, '0')}`
  const { handleSubmit } = useOtpVerify({
    onSuccess: () => {
      clear()
    },
  })
  const search = useSearchParams()
  const form = useForm({
    resolver: zodResolver(otpCodeFormSchema),
    defaultValues: {
      code: '',
    },
  })

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="">
        <div className="space-y-1 mb-12 text-center">
          <h1 className="text-2xl font-bold">We just sent an OTP code</h1>
          <p className="text-muted-foreground">
            Enter the security code we sent to:
          </p>
          <ChangeEmailOtpForm email={search.get('email')} />
        </div>
        <OtpForm
          form={form}
          startTimer={start}
          isRunTimer={active}
          timeLeft={timeLeft}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}

export default OtpContent
