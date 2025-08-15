import type { BetterFetchError } from 'better-auth/react'
import { AlertTriangle } from 'lucide-react'

const UserNavigationErrorFallback = ({
  error,
}: {
  error: BetterFetchError
}) => {
  return (
    <div className="flex items-center gap-2 p-4 text-destructive-foreground bg-destructive rounded">
      <AlertTriangle className="w-5 h-5" />
      <span className="text-sm">
        Something went wrong: <br />{' '}
        <span className="text-xs"> {error.message}</span>{' '}
      </span>
    </div>
  )
}

export default UserNavigationErrorFallback
