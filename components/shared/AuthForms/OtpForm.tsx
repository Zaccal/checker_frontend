'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { useIsMobile } from '@/hooks/useMobile'
import { useSendOtpCode } from '@/hooks/useSendOtpCode'
import { type otpCodeFormSchemaType } from '@/lib/schemas/otpCodeForm.schema'
import { type OtpFormComponent } from '@/lib/types/otpform.type'

interface OtpFormProps {
  onSubmit: (data: otpCodeFormSchemaType) => Promise<void>
  isRunTimer?: boolean
  timeLeft?: string
  startTimer?: () => void
  form: OtpFormComponent
}

const OtpForm = ({
  onSubmit,
  isRunTimer = false,
  startTimer,
  timeLeft,
  form,
}: OtpFormProps) => {
  const { sendOtpCode } = useSendOtpCode(startTimer)
  const { isSubmitting } = form.formState
  const isMobile = useIsMobile()

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormMessage />
              <FormControl>
                <InputOTP
                  containerClassName="w-fit justify-self-center"
                  disabled={isSubmitting}
                  maxLength={6}
                  {...field}
                >
                  <InputOTPGroup>
                    <InputOTPSlot size={isMobile ? 'lg' : 'md'} index={0} />
                    <InputOTPSlot size={isMobile ? 'lg' : 'md'} index={1} />
                    <InputOTPSlot size={isMobile ? 'lg' : 'md'} index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot size={isMobile ? 'lg' : 'md'} index={3} />
                    <InputOTPSlot size={isMobile ? 'lg' : 'md'} index={4} />
                    <InputOTPSlot size={isMobile ? 'lg' : 'md'} index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="space-y-5">
          <Button
            disabled={isSubmitting}
            className="font-semibold w-full"
            type="submit"
            size={isMobile ? 'lg' : 'default'}
          >
            Verify
          </Button>
          <div className="flex flex-col items-center ">
            <p className="text-sm text-muted-foreground ">
              Didn&apos;t receive code?
            </p>
            <Button
              type="button"
              disabled={isRunTimer || isSubmitting}
              onClick={() => sendOtpCode()}
              variant={'link'}
            >
              Send again {isRunTimer && `- ${timeLeft ?? ''}`}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default OtpForm
