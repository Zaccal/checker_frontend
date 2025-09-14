import Fallback from '@/components/common/Fallback'
import ResetPasswordFormFields from '@/components/shared/AuthForms/ResetPasswordFormFields'
import { RectangleEllipsis } from 'lucide-react'
import { Suspense } from 'react'

const page = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <div className="container px-4 h-screen flex items-center justify-center">
        <div className="max-w-md">
          <div className="flex flex-col items-center gap-5">
            <div className="p-2 w-fit border border-border rounded-lg">
              <RectangleEllipsis />
            </div>
            <div className="text-center space-y-3">
              <h1 className="text-2xl font-bold">Reset your password</h1>
              <p className="text-muted-foreground">
                Please enter your new password below. Make sure to remember it
                for future logins.
              </p>
            </div>
          </div>
          <ResetPasswordFormFields />
        </div>
      </div>
    </Suspense>
  )
}

export default page
