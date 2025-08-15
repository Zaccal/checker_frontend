import Kbd from '@/components/shared/Common/Kbd'
import { CircleCheckBigIcon } from 'lucide-react'

// TODO: bind keys to command
export default function Home() {
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
          <Kbd description="Search" binding="J" />
          <Kbd description="Create list" binding="L" />
        </div>
      </div>
    </div>
  )
}
