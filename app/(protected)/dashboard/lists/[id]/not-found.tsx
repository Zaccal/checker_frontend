import { CircleX } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="w-full h-screen text-2xl text-muted-foreground flex items-center justify-center">
      <div className="flex flex-col items-center space-y-3">
        <CircleX size={40} />
        <span>List not found</span>
      </div>
    </div>
  )
}
