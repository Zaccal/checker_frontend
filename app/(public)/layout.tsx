import Github from '@/components/common/primitives/Github'
import { CircleCheckBigIcon } from 'lucide-react'
import type { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full, h-screen md:grid grid-rows-1 grid-cols-2">
      <div className="bg-primary md:h-full w-full flex justify-center items-center md:items-start md:flex-col md:justify-between px-10 py-10">
        <div className="flex items-center gap-2 text-primary-foreground">
          <CircleCheckBigIcon className="size-8" />
          <span className="font-bold text-xl">Checker</span>
        </div>

        <div className="text-primary-foreground  w-full hidden md:block">
          <p className="text-xl font-semibold mb-3">
            The secret of getting ahead is getting started. Don&apos;t just
            dream about it, do it. Your future is created by what you do today.
          </p>
          <a
            className="flex items-center gap-2 text-lg font-semibold underline-offset-4 cursor-pointer underline"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/Zaccal"
          >
            <Github className="size-6" color="white" /> My Gitub
          </a>
        </div>
      </div>

      <div className="px-10 py-10 w-full">{children}</div>
    </div>
  )
}

export default layout
