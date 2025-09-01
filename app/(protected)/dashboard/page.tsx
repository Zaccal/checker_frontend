import { getPlatformShortcut } from '@/lib/getPlatformShortcut'
import { CircleCheckBigIcon } from 'lucide-react'

// TODO: bind keys to command
export default function Home() {
  const { label } = getPlatformShortcut()

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="">
        <div className="w-fit mx-auto mb-4">
          <CircleCheckBigIcon className="size-20 text-muted-foreground" />
        </div>
        <h1 className="mb-6 text-center font-bold text-muted-foreground text-3xl">
          Welcome!
        </h1>

        <div className="flex flex-col items-center gap-3">
          <div className="space-x-2 w-fit text-sm text-muted-foreground">
            <span>Search</span>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">{label}</span>
            </kbd>
          </div>
        </div>
      </div>
    </div>
  )
}
